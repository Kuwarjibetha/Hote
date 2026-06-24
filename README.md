# Wandermanic - Hotel booking 
A full-stack web application for listing and managing vacation rentals, built with Node.js and MongoDB.

---

## 📋 Features

### ✅ Current Features (Implemented)
- 📋 Browse all available listings
- ➕ Create new property listings
- 👁️ View detailed listing information
- ✏️ Edit existing listings
- 🗑️ Delete listings
- 📱 Responsive web interface with EJS templating
- 🎨 Professional styling with CSS

### 🚀 Upcoming Features (Planned)
- 🔐 User registration and login system
- 🛡️ Password encryption with bcryptjs
- 📍 Session management with express-session
- ✅ Role-based access control (only owners can edit/delete their listings)
- 👤 User profile management
- ⭐ Ratings & reviews system
- 🖼️ Multiple images per listing
- 🔍 Search & filtering functionality
- ❤️ Wishlist/Favorites feature
- 🗺️ Map integration for location visualization

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose ORM
- **Templating:** EJS (Embedded JavaScript), ejs-mate
- **Middleware:** 
  - express-urlencoded (form data parsing)
  - method-override (HTTP method override)

---

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)
- npm (Node Package Manager)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd MAJORPROJECT
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Ensure MongoDB is running**
   ```bash
   mongod
   ```
   (or use MongoDB Atlas for cloud database)

4. **Configure environment** (optional)
   - Update the MongoDB connection URL in `app.js` if needed:
   ```javascript
   const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"
   ```

5. **Start the server**
   - **Development mode** (with auto-restart):
     ```bash
     nodemon app.js
     ```
   - **Production mode**:
     ```bash
     npm start
     ```

6. **Access the application**
   - Open your browser and navigate to: **http://localhost:8080**

---

## 📡 API Routes

### Currently Implemented Routes ✅
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Home page - View all listings |
| GET | `/listings` | View all listings |
| GET | `/listings/new` | New listing form |
| POST | `/listings` | Create new listing |
| GET | `/listings/:id` | View listing details |
| GET | `/listings/:id/edit` | Edit listing form |
| PUT | `/listings/:id` | Update listing |
| DELETE | `/listings/:id` | Delete listing |

### Upcoming Routes 🚀
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/signup` | User registration form |
| POST | `/signup` | Register new user |
| GET | `/login` | User login form |
| POST | `/login` | Authenticate user |
| GET | `/logout` | Logout user |

---

## 📁 Project Structure

```
MAJORPROJECT/
├── app.js                    # Main application file
├── package.json              # Dependencies
├── README.md                 # This file
│
├── models/
│   └── listing.js           # Listing data model
│
├── init/
│   ├── index.js             # Database initialization script
│   └── data.js              # Sample listing data
│
├── views/
│   ├── listings/
│   │   ├── index.ejs        # All listings view
│   │   ├── show.ejs         # Single listing details view
│   │   ├── new.ejs          # Create listing form
│   │   └── edit.ejs         # Edit listing form
│   │
│   ├── includes/
│   │   ├── navbar.ejs       # Navigation bar component
│   │   └── footer.ejs       # Footer component
│   │
│   └── layouts/
│       └── boilerplate.ejs  # Main layout template
│
└── public/
    └── css/
        └── style.css        # Styling and CSS
```

### Upcoming Project Structure (After Auth Implementation)
```
├── models/
│   ├── listing.js           # Listing data model
│   └── user.js              # User data model (coming soon)
│
├── views/
│   ├── auth/                # Authentication views (coming soon)
│   │   ├── signup.ejs       # User registration form
│   │   └── login.ejs        # User login form
│   └── ...
```

---

## 🎯 How to Use

### Creating a Listing
1. Click the "Create Listing" button on the home page
2. Fill in the listing details:
   - **Title:** Property name/title
   - **Description:** Detailed description of the property
   - **Image URL:** Link to property image
   - **Price:** Nightly rate
   - **Location:** City/area name
   - **Country:** Country name
3. Click "Submit" to publish the listing
4. Your listing will appear in the gallery

### Editing a Listing
1. Click on any listing to view its details
2. Click the "Edit" button
3. Update the property information
4. Click "Update" to save changes

### Deleting a Listing
1. Open a listing detail page
2. Click "Delete" button to remove the listing from the database
3. You'll be redirected to the listings page

### Viewing Listings
1. Browse all listings on the home page
2. Click on any listing to view full details
3. See all property information, images, and pricing

---

## 🔒 Current Security Status

### Current State ⚠️
- **No authentication** - Anyone can create, edit, or delete listings
- **Public access** - All operations are unrestricted

### Planned Security Features 🔐
- User authentication with login/signup
- Password encryption using bcryptjs
- Session management with MongoDB storage
- Owner-based access control
- CSRF protection for forms
- Input validation and sanitization

---

## 🚀 Development Roadmap

### Phase 1: Authentication System (Next)
- [ ] Create User model with Mongoose
- [ ] Setup Passport.js for authentication
- [ ] Implement signup/login routes and views
- [ ] Add session management

### Phase 2: User-Based Features
- [ ] Link listings to user accounts
- [ ] Restrict edit/delete to listing owners
- [ ] Update views to show owner information

### Phase 3: Enhanced Features
- [ ] Implement ratings & reviews
- [ ] Add multiple image support
- [ ] Search and filtering
- [ ] Wishlist functionality

### Phase 4: Advanced Features
- [ ] Map integration
- [ ] Booking system
- [ ] Payment integration
- [ ] Email notifications

---

## 📝 Environment Setup

### For Development
1. Use `nodemon` to automatically restart the server on file changes
2. Keep MongoDB running in a separate terminal
3. Access the app at `http://localhost:8080`

### For Production
1. Update `const MONGO_URL` to use a production database
2. Set proper error handling and logging
3. Use HTTPS instead of HTTP
4. Deploy on a hosting platform (Heroku, AWS, etc.)

---

## 🤝 Contributing

To contribute to this project:
1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**kuwarji** - Development and maintenance

---

## 📞 Support

For issues or questions, please open an issue on the repository.

---

**Last Updated:** June 24, 2026  
**Version:** 1.0.0 (Pre-Auth)
