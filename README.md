# Wanderlust - Airbnb Clone

A full-stack web application for listing and managing vacation rentals, built with Node.js and MongoDB.

## Features

- Browse all available listings
- Create new property listings
- View detailed listing information
- Edit existing listings
- Delete listings
- Responsive web interface with EJS templating

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Templating:** EJS (Embedded JavaScript)
- **Middleware:** 
  - express-urlencoded (form data parsing)
  - method-override (HTTP method override)
  - ejs-mate (EJS layout support)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure MongoDB is running locally on port 27017

4. Start the server:
   ```bash
   npm start
   ```
   Or use nodemon for development:
   ```bash
   nodemon app.js
   ```

## Configuration

Update the MongoDB connection URL in `app.js` if needed:
```javascript
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"
```

If your database has authentication enabled, use:
```javascript
const MONGO_URL = "mongodb://user:password@127.0.0.1:27017/wanderlust"
```

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Home page |
| GET | `/listings` | View all listings |
| GET | `/listings/new` | New listing form |
| POST | `/listings` | Create new listing |
| GET | `/listings/:id` | View listing details |
| GET | `/listings/:id/edit` | Edit listing form |
| PUT | `/listings/:id` | Update listing |
| DELETE | `/listings/:id` | Delete listing |

## Project Structure

```
├── app.js                    # Main application file
├── models/
│   └── listing.js           # Listing data model
├── init/
│   ├── index.js             # Initialization script
│   └── data.js              # Sample data
├── views/
│   └── listings/
│       ├── index.ejs        # All listings view
│       ├── show.ejs         # Single listing view
│       ├── new.ejs          # Create listing form
│       └── edit.ejs         # Edit listing form
├── public/                  # Static files (CSS, JS, images)
└── package.json             # Dependencies
```

## Server

The application runs on **http://localhost:8080**

## License

This project is open source and available under the MIT License.
