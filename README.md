# Wanderlust - Hotel Booking App

Wanderlust is a full-stack hotel and vacation rental booking application built with Node.js, Express, MongoDB, EJS, Passport.js, Cloudinary, Nodemailer, and Google Gemini AI.

Guests can discover stays, book properties, manage bookings, write reviews, save wishlist items, and use AI travel tools. Hosts can create listings, upload images, manage their properties, and track booking activity from a dashboard.

## Features

- Guest and host authentication with Passport.js
- Role-based access for guests and hosts
- Host listing management with Cloudinary image uploads
- Search and filtering by title, location, country, and price range
- Booking flow with date and guest-capacity validation
- Booking confirmation and cancellation emails
- Reviews, average ratings, wishlist, and profile management
- Host dashboard with listings, bookings, revenue, guests, and recent activity
- Gemini AI description generator, review summary, trip planner, and listing chatbot

## Tech Stack

| Area | Technology |
| --- | --- |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Views | EJS, ejs-mate |
| Authentication | Passport.js |
| Uploads | Multer, Cloudinary |
| Email | Nodemailer |
| AI | Google Gemini |
| Deployment | Vercel config included |

## Setup

1. Install dependencies.

   ```bash
   npm install
   ```

2. Create a `.env` file.

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

3. Start the app.

   ```bash
   npm run dev
   ```

4. Open:

   ```text
   http://localhost:8080
   ```

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Runs the app with Node |
| `npm run dev` | Runs the app with Nodemon |

## Main Project Structure

```text
MAJORPROJECT/
├── app.js
├── middleware.js
├── config/
├── docs/
│   └── PROJECT_DOCUMENTATION.md
├── models/
├── public/
└── views/
```

## Documentation

Full project documentation is available here:

[docs/PROJECT_DOCUMENTATION.md](docs/PROJECT_DOCUMENTATION.md)

It includes architecture, user workflows, route documentation, data models, AI features, email features, deployment notes, manual testing notes, and future improvements.

## Author

Developed by `kuwarji`.
