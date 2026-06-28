# Wanderlust - Project Documentation

Wanderlust is a full-stack hotel and vacation rental booking application built with Node.js, Express, MongoDB, Mongoose, EJS, Passport.js, Cloudinary, Nodemailer, and Google Gemini AI.

The app supports two main user roles:

- Guests can discover listings, use AI travel tools, book stays, manage bookings, write reviews, and save wishlist items.
- Hosts can create and manage properties, upload images, view booking activity, and track dashboard statistics.

## Table of Contents

- [Project Overview](#project-overview)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [User Roles](#user-roles)
- [User Workflows](#user-workflows)
- [Routes Documentation](#routes-documentation)
- [Data Models](#data-models)
- [AI Features](#ai-features)
- [Email Features](#email-features)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Testing Notes](#testing-notes)
- [Future Improvements](#future-improvements)

## Project Overview

Wanderlust is inspired by property rental platforms. It lets hosts publish properties with images, price, location, nearby-place details, and guest capacity. Guests can search listings, view details, book properties, cancel bookings, review stays, and use AI tools for listing help.

The home route is role-based:

- A guest sees the welcome page.
- A host sees the dashboard with listing, booking, revenue, guest, and recent booking stats.

## Core Features

- User signup, login, logout, sessions, and flash messages
- Guest, host, and admin role support
- Role-based access control for host-only listing management
- Listing CRUD with Cloudinary image uploads
- Listing fields for location, country, nearby place, distance, price, and maximum guests
- Search and filtering by title, location, country, minimum price, and maximum price
- Guest booking flow with date validation and capacity validation
- Booking confirmation page and guest booking history
- Booking cancellation with guest and host email notifications
- Review creation, deletion, average rating display, and review author display
- Wishlist add/remove functionality
- Profile page and profile editing with avatar upload
- Host dashboard for property performance overview
- Gemini AI listing description generator
- Gemini AI review summary generator
- Gemini AI trip planner
- Gemini AI listing chatbot

## Tech Stack

| Area | Technology |
| --- | --- |
| Runtime | Node.js |
| Backend framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Views | EJS, ejs-mate |
| Authentication | Passport.js, passport-local, passport-local-mongoose |
| Sessions | express-session |
| File upload | Multer |
| Image hosting | Cloudinary, multer-storage-cloudinary |
| Email | Nodemailer with Gmail |
| AI | Google Gemini through `@google/generative-ai` |
| Utilities | dotenv, connect-flash, method-override |
| Deployment config | Vercel |

## Architecture

The project follows a traditional Express MVC-style structure:

- `app.js` defines the Express app, middleware, database connection, route handlers, authentication setup, AI routes, and server startup.
- `models/` contains Mongoose schemas for users, listings, reviews, and bookings.
- `views/` contains EJS pages grouped by feature.
- `config/` contains Cloudinary and email configuration.
- `middleware.js` contains authentication and authorization helpers.
- `public/` contains static CSS and client-side JavaScript.

### Request Flow

1. A browser sends a request to an Express route.
2. Middleware handles sessions, authentication, flash messages, static files, body parsing, and method override.
3. Route handlers read or write MongoDB data through Mongoose models.
4. Views are rendered with EJS and shared layout templates.
5. Cloudinary handles uploaded images.
6. Nodemailer sends booking and cancellation emails.
7. Gemini handles AI description, summary, itinerary, and chat generation.

## Installation

1. Clone the repository.

   ```bash
   git clone <your-repository-url>
   cd MAJORPROJECT
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root.

   ```env
   MONGO_URL=<your-mongodb-connection-string>
   SECRET=<your-session-secret>

   CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUD_API_KEY=<your-cloudinary-api-key>
   CLOUD_API_SECRET=<your-cloudinary-api-secret>

   GMAIL_USER=<your-gmail-address>
   GMAIL_PASS=<your-gmail-app-password>

   GEMINI_API_KEY=<your-gemini-api-key>
   ```

4. Start the development server.

   ```bash
   npm run dev
   ```

5. Open the app.

   ```text
   http://localhost:8080
   ```

## Environment Variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGO_URL` | Yes | MongoDB connection string |
| `SECRET` | Yes | Session secret |
| `CLOUD_NAME` | Yes | Cloudinary cloud name |
| `CLOUD_API_KEY` | Yes | Cloudinary API key |
| `CLOUD_API_SECRET` | Yes | Cloudinary API secret |
| `GMAIL_USER` | Yes for email | Gmail address used by Nodemailer |
| `GMAIL_PASS` | Yes for email | Gmail app password |
| `GEMINI_API_KEY` | Yes for AI | Google Gemini API key |

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Runs the app with Node |
| `npm run dev` | Runs the app with Nodemon |

## User Roles

### Guest

Guests can:

- View the welcome page
- Browse and filter listings
- View listing details
- Book listings
- Cancel their bookings
- Write and delete their own reviews
- Save and remove wishlist listings
- Edit their profile
- Use AI review summaries, trip planner, and listing chatbot

### Host

Hosts can:

- View the host dashboard
- Create new listings
- Upload listing images
- Edit and delete owned listings
- View bookings received on their listings
- Edit their profile and avatar
- Use AI listing description generation

### Admin

The `admin` role exists in the user schema, but public signup prevents users from creating admin accounts directly.

## User Workflows

### Guest Flow

1. Sign up or log in as a guest.
2. Land on the welcome page.
3. Search or browse `/listings`.
4. Open a listing detail page.
5. Use AI tools if needed:
   - Summarize reviews
   - Generate a trip plan
   - Ask the listing chatbot questions
6. Book the listing by entering guest details, dates, guest count, and travel type.
7. Receive a booking confirmation page and optional email.
8. View or cancel bookings from `My Bookings`.

### Host Flow

1. Sign up or log in as a host.
2. Land on the dashboard.
3. Create a listing with image, price, nearby place, country, and max guest capacity.
4. Optionally generate the listing description with Gemini AI.
5. Edit or delete owned listings.
6. View booking activity and revenue stats from dashboard/profile.

## Routes Documentation

### Home

| Method | Route | Access | Description |
| --- | --- | --- | --- |
| GET | `/` | Logged in | Shows guest welcome page or host dashboard based on role |

### Authentication

| Method | Route | Access | Description |
| --- | --- | --- | --- |
| GET | `/signup` | Public | Render signup form |
| POST | `/signup` | Public | Register user and log them in |
| GET | `/login` | Public | Render login form |
| POST | `/login` | Public | Authenticate user |
| GET | `/logout` | Logged in | Log out current user |

### Listings

| Method | Route | Access | Description |
| --- | --- | --- | --- |
| GET | `/listings` | Logged in | Show all listings with optional filters |
| GET | `/listings/new` | Host | Render new listing form |
| POST | `/listings` | Host | Create listing and upload image |
| GET | `/listings/:id` | Public/logged context | Show listing details, reviews, AI tools, and booking action |
| GET | `/listings/:id/edit` | Owner | Render edit listing form |
| PUT | `/listings/:id` | Owner | Update listing details and optionally replace image |
| DELETE | `/listings/:id` | Owner | Delete listing |

### Reviews

| Method | Route | Access | Description |
| --- | --- | --- | --- |
| POST | `/listings/:id/reviews` | Logged in | Add review to listing |
| DELETE | `/listings/:id/reviews/:reviewId` | Logged in | Delete review and remove it from listing |

### Bookings

| Method | Route | Access | Description |
| --- | --- | --- | --- |
| GET | `/listings/:id/book` | Logged in | Render booking form |
| POST | `/listings/:id/book` | Logged in | Create booking, calculate total price, send emails |
| GET | `/bookings/:id/confirmation` | Logged in | Show booking confirmation |
| GET | `/my-bookings` | Logged in | Show current guest bookings |
| DELETE | `/bookings/:id` | Logged in | Cancel booking and send cancellation emails |

### Profile and Wishlist

| Method | Route | Access | Description |
| --- | --- | --- | --- |
| GET | `/profile` | Logged in | Show profile, listings, bookings, or received bookings |
| GET | `/profile/edit` | Logged in | Render profile edit form |
| PUT | `/profile` | Logged in | Update bio and avatar |
| POST | `/wishlist/:id` | Logged in | Toggle listing in wishlist |
| GET | `/wishlist` | Logged in | Show saved listings |

### AI

| Method | Route | Access | Description |
| --- | --- | --- | --- |
| POST | `/ai/generate-description` | Logged in | Generate listing description using title, location, country, and price |
| GET | `/listings/:id/summarize-reviews` | Logged in | Summarize reviews for a listing |
| POST | `/listings/:id/trip-planner` | Logged in | Generate itinerary for selected number of days |
| POST | `/listings/:id/chat` | Logged in | Chat with AI assistant about the listing |

## Data Models

### User

| Field | Type | Notes |
| --- | --- | --- |
| `username` | String | Added by `passport-local-mongoose` |
| `email` | String | Required and unique |
| `role` | String | `guest`, `host`, or `admin` |
| `bio` | String | Optional profile text |
| `avatar.url` | String | Profile image URL |
| `avatar.filename` | String | Cloudinary filename |
| `createdAt` | Date | Account creation date |
| `wishlist` | ObjectId[] | References `Listing` |

### Listing

| Field | Type | Notes |
| --- | --- | --- |
| `title` | String | Required |
| `description` | String | Listing description |
| `image.url` | String | Cloudinary or default image URL |
| `image.filename` | String | Cloudinary filename |
| `price` | Number | Price per night |
| `location` | String | City or area |
| `country` | String | Country |
| `nearbyPlace.type` | String | Example: Airport, Metro Station, Beach |
| `nearbyPlace.name` | String | Nearby place name |
| `nearbyPlace.distance` | String | Distance from property |
| `owner` | ObjectId | References `User` |
| `maxPersons` | Number | Maximum guests allowed |
| `reviews` | ObjectId[] | References `Review` |

### Booking

| Field | Type | Notes |
| --- | --- | --- |
| `listing` | ObjectId | References `Listing` |
| `guest` | ObjectId | References `User` |
| `guestName` | String | Required |
| `guestPhone` | String | Required |
| `guestEmail` | String | Optional |
| `checkIn` | Date | Required |
| `checkOut` | Date | Required |
| `guests` | Number | Required, minimum 1 |
| `travelType` | String | `solo`, `couple`, `family`, or `bachelors` |
| `totalPrice` | Number | Calculated as nights multiplied by listing price |
| `status` | String | `pending`, `confirmed`, or `cancelled`; defaults to `confirmed` |
| `bookedAt` | Date | Booking creation date |

### Review

| Field | Type | Notes |
| --- | --- | --- |
| `comment` | String | Required |
| `rating` | Number | Required, 1 to 5 |
| `author` | ObjectId | References `User` |
| `createdAt` | Date | Review creation date |

## AI Features

The AI features use Google Gemini through `@google/generative-ai` and the `gemini-2.5-flash` model.

### Listing Description Generator

Available on the new listing page. Hosts enter title, location, country, and price, then click the AI button to generate a short property description.

### Review Summarizer

Available on listing detail pages when reviews exist. It summarizes guest reviews in a short, helpful format.

### Trip Planner

Available for guests on listing detail pages. Guests enter a number of days, and the app generates a day-by-day travel itinerary for the listing location.

### Listing Chatbot

Available for guests on listing detail pages. The chatbot answers short questions about the selected property using listing details and reviews as context.

## Email Features

The app uses Nodemailer with Gmail.

- Guest booking confirmation email
- Host new-booking notification email
- Guest booking-cancellation email
- Host booking-cancellation email

Emails require `GMAIL_USER` and `GMAIL_PASS` in `.env`. If email sending fails, the app logs the error and continues the user flow.

## Project Structure

```text
MAJORPROJECT/
├── app.js
├── middleware.js
├── package.json
├── package-lock.json
├── README.md
├── vercel.json
├── config/
│   ├── cloudinary.js
│   └── mailer.js
├── controllers/
│   └── auth.js
├── docs/
│   └── PROJECT_DOCUMENTATION.md
├── init/
│   ├── data.js
│   └── index.js
├── models/
│   ├── booking.js
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── public/
│   └── css/
│       ├── js/
│       │   └── ai.js
│       └── style.css
└── views/
    ├── auth/
    │   ├── login.ejs
    │   └── signup.ejs
    ├── bookings/
    │   ├── confirmation.ejs
    │   ├── index.ejs
    │   └── new.ejs
    ├── dashboard/
    │   └── index.ejs
    ├── includes/
    │   ├── footer.ejs
    │   └── navbar.ejs
    ├── layouts/
    │   └── boilerplate.ejs
    ├── listings/
    │   ├── edit.ejs
    │   ├── index.ejs
    │   ├── new.ejs
    │   └── show.ejs
    ├── profile/
    │   ├── edit.ejs
    │   └── show.ejs
    ├── welcome/
    │   └── index.ejs
    └── wishlist/
        └── index.ejs
```

## Important Implementation Details

- `express.urlencoded()` handles form submissions.
- `express.json()` handles JSON requests for AI endpoints.
- `method-override` supports PUT and DELETE requests from forms.
- `express-session` stores login sessions.
- `connect-flash` displays temporary success and error messages.
- `passport-local-mongoose` handles password hashing and user authentication helpers.
- `multer-storage-cloudinary` sends uploaded listing and avatar images to Cloudinary.
- `res.locals.currUser`, `res.locals.success`, and `res.locals.error` are available in all EJS views.
- Wishlist data is refreshed for logged-in users so listing cards can show saved state.

## Deployment

The project includes `vercel.json` for Vercel deployment:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "app.js"
    }
  ]
}
```

Before deployment, configure these environment variables in the hosting dashboard:

- `MONGO_URL`
- `SECRET`
- `CLOUD_NAME`
- `CLOUD_API_KEY`
- `CLOUD_API_SECRET`
- `GMAIL_USER`
- `GMAIL_PASS`
- `GEMINI_API_KEY`

## Testing Notes

There is no formal automated test suite yet. Current testing can be done manually:

- Register as guest and host.
- Log in and log out.
- Create, edit, and delete a listing as a host.
- Upload listing and avatar images.
- Search and filter listings.
- Book a listing as a guest.
- Cancel a booking.
- Add and delete reviews.
- Add and remove wishlist items.
- Test AI description generation, review summary, trip planner, and chatbot.
- Verify booking and cancellation emails.

The `testai.js` file can be used to verify Gemini API connectivity.

## Known Notes

- The app currently starts two listeners on port `8080` in `app.js`; this may need cleanup for production.
- Payment processing is not implemented.
- Admin-specific screens are not implemented.
- Email delivery depends on Gmail app-password configuration.
- AI responses depend on Gemini API availability and may fail during high-demand periods.

## Future Improvements

- Add payment integration
- Add maps and geolocation
- Add admin dashboard
- Add stronger server-side validation
- Add automated tests
- Add booking date availability checks
- Add image deletion cleanup when listings are deleted
- Add pagination for listings and bookings
- Move route handlers into separate route/controller files
- Add REST API documentation for external clients

## Author

Developed by `kuwarji`.
