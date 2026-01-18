# Premium Modern Salon Website

A full-stack salon website built with React, Node.js, and PostgreSQL.

## Features

- **Responsive Design**: Mobile-first, elegant UI with smooth animations.
- **Dynamic Content**: Services, staff, and testimonials are managed via the database.
- **Booking System**: Users can request bookings (stored in DB).
- **Contact Form**: Inquiries are stored in DB.
- **Newsletter**: Email subscription.
- **Dark Mode**: Toggleable theme.

## Tech Stack

- **Frontend**: React, Tailwind CSS, Framer Motion, React Router, React Hook Form.
- **Backend**: Express, Drizzle ORM, PostgreSQL.
- **Database**: PostgreSQL (Neon).

## API Endpoints

- `GET /api/services`: List all services.
- `GET /api/services/:id`: Get a specific service.
- `GET /api/staff`: List all staff members.
- `GET /api/testimonials`: List testimonials.
- `POST /api/bookings`: Create a new booking.
- `POST /api/contact`: Send a message.
- `POST /api/subscribe`: Subscribe to newsletter.

## Setup

1.  `npm install`
2.  `npm run db:push` (to set up the database)
3.  `npm run dev` (starts both frontend and backend)
