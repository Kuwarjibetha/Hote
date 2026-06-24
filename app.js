require("dotenv").config();                        //  must be first line!

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");


const ejsMate = require("ejs-mate");
const session = require("express-session");       // Stores user data temporarily between requests.
const flash = require("connect-flash");           // Used to show temporary messages.
const passport = require("passport");
const LocalStrategy = require("passport-local");

const Listing = require("./models/listing");
const User = require("./models/user");
const Booking = require("./models/booking");  // ← ADD THIS
const { isLoggedIn, isOwner, isHost, saveRedirectUrl } = require("./middleware");

// Data base connection 
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("✅ connected to db"))
    .catch(err => console.log(err));




app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));



//  Session 
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    }
}));

//  Flash 
app.use(flash());

//  Passport 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//  Global Locals 
// These are available in ALL your EJS views
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});





//  AUTH ROUTES

// Signup
app.get("/signup", (req, res) => {
    res.render("auth/signup");
});

app.post("/signup", async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;
        const safeRole = role === "admin" ? "guest" : (role || "guest");
        const user = new User({ username, email, role: safeRole });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", `Welcome to Wanderlust, ${username}! 🏠`);
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
});




// Login
app.get("/login", (req, res) => {
    res.render("auth/login");
});

app.post("/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    (req, res) => {
        req.flash("success", `Welcome back, ${req.user.username}! 👋`);
        const redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    }
);





// Logout
app.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "Logged out successfully. See you soon! 👋");
        res.redirect("/listings");
    });
});






//  LISTING ROUTES

// Home
app.get("/", isLoggedIn, async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});




// Index
app.get("/listings", isLoggedIn, async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});




// New Form — must be logged in + host only
app.get("/listings/new", isLoggedIn, isHost, (req, res) => {
    res.render("listings/new.ejs");
});




// Create — must be logged in + host only
app.post("/listings", isLoggedIn, isHost, async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New listing created! 🏠");
    res.redirect("/listings");
});



// Show
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listings = await Listing.findById(id).populate("owner");
    res.render("listings/show.ejs", { listings });
});




// Edit Form 
app.get("/listings/:id/edit", isLoggedIn, isOwner, async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});




// Update 
app.put("/listings/:id", isLoggedIn, isOwner, async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing);
    req.flash("success", "Listing updated! ");
    res.redirect(`/listings/${id}`);
});

// Delete \
app.delete("/listings/:id", isLoggedIn, isOwner, async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted! 🗑️");
    res.redirect("/listings");
});





//  BOOKING ROUTES

// Show Booking Form 
app.get("/listings/:id/book", isLoggedIn, async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("bookings/new.ejs", { listing });
});


// Create Booking
app.post("/listings/:id/book", isLoggedIn, async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const { checkIn, checkOut, guests } = req.body;

    // Calculate total price
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );

    // Validate dates
    if (nights <= 0) {
        req.flash("error", "Check-out must be after check-in date!");
        return res.redirect(`/listings/${req.params.id}/book`);
    }

    const totalPrice = nights * listing.price;

    const booking = new Booking({
        listing: listing._id,
        guest: req.user._id,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: guests,
        totalPrice: totalPrice,
    });

    await booking.save();

    // Redirect to confirmation page
    res.redirect(`/bookings/${booking._id}/confirmation`);
});

// Booking Confirmation Page
app.get("/bookings/:id/confirmation", isLoggedIn, async (req, res) => {
    const booking = await Booking.findById(req.params.id)
        .populate("listing")
        .populate("guest");
    res.render("bookings/confirmation.ejs", { booking });
});

// My Bookings — guest sees all their bookings
app.get("/my-bookings", isLoggedIn, async (req, res) => {
    const bookings = await Booking.find({ guest: req.user._id })
        .populate("listing");
    res.render("bookings/index.ejs", { bookings });
});

// Cancel Booking
app.delete("/bookings/:id", isLoggedIn, async (req, res) => {
    await Booking.findByIdAndDelete(req.params.id);
    req.flash("success", "Booking cancelled successfully!");
    res.redirect("/my-bookings");
});







//  Server 
app.listen(8080, () => {
    console.log("🚀 Wanderlust running on http://localhost:8080");
});
