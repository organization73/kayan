# Kayan Modern - Furniture E-Commerce Platform

![Kayan Modern Showroom](./kayan_backend/images/banner.jpg)

> A modern, full-stack furniture gallery and e-commerce platform built with Node.js, Express, MongoDB, and React. Kayan Modern specializes in premium furniture solutions with an intuitive admin dashboard for inventory management.

---

## 🏢 Project Overview

**Kayan Modern** is a comprehensive furniture gallery platform that combines a robust backend API with a responsive frontend, designed to showcase and sell high-quality furniture products. The platform features complete inventory management, user authentication, product categorization, reviews, and promotional offers.

### Key Features

- **Comprehensive Product Management** - Full CRUD operations for furniture inventory
- **Multi-Category Support** - Bedroom, office, kids room, dining room, sofas, salons, and more
- **Advanced Admin Dashboard** - Powerful admin controls for product and offer management
- **User Authentication & Authorization** - Secure JWT-based authentication with email verification
- **Review & Rating System** - Customer feedback and product ratings
- **Promotional Offers** - Create and manage special deals and discounts
- **Responsive Frontend** - Modern React-based UI with RTL support (Arabic language)
- **Database Backup & Sync** - Automatic data synchronization and backup utilities
- **Image Management** - Azure Blob Storage integration for image hosting
- **Email Notifications** - Automated email communications via Nodemailer

---

## 🛠️ Tech Stack

### Backend (70%)

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) + Bcrypt
- **File Upload**: Multer
- **Cloud Storage**: Azure Blob Storage
- **Email Service**: Nodemailer (Gmail SMTP)
- **Task Scheduling**: Node-Cron
- **Validation**: Yup
- **Security**: CORS, Cookie Parser
- **Logging**: Morgan
- **Environment**: Dotenv

### Frontend (30%)

- **Library**: React 18.3
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with RTL support
- **HTTP Client**: Axios
- **Animation**: Framer Motion
- **UI Components**: Headless UI, Heroicons
- **Carousel**: Swiper
- **Build Tool**: Create React App

---

## 📁 Project Structure

```
kayan_manager/
├── kayan_backend/                 # Backend API Server
│   ├── app.js                      # Express app configuration
│   ├── package.json                # Backend dependencies
│   ├── controllers/                # Route handlers
│   │   ├── auth.js                 # Authentication logic
│   │   ├── product.js              # Product management
│   │   ├── offer.js                # Promotional offers
│   │   ├── admin.js                # Admin operations
│   │   └── error.js                # Error handling
│   ├── models/                     # MongoDB schemas
│   │   ├── admin.js                # Admin model
│   │   ├── product.js              # Product schema
│   │   ├── offer.js                # Offer schema
│   │   ├── review.js               # Review model
│   │   ├── complaint.js            # Complaint schema
│   │   └── gallery-reviews.js      # Gallery reviews
│   ├── routes/                     # API endpoints
│   │   ├── auth.js                 # Auth routes
│   │   ├── product.js              # Product routes
│   │   ├── offer.js                # Offer routes
│   │   └── admin.js                # Admin routes
│   ├── middleware/                 # Custom middleware
│   │   └── auth.js                 # Authentication middleware
│   ├── utilities/                  # Helper functions
│   │   ├── db-backups.js           # Database sync & backup
│   │   ├── domain.js               # Domain configuration
│   │   └── file.js                 # File operations
│   └── views/                      # EJS templates
│       └── auth/, shop/            # Template directories
│
├── kayan/                          # Frontend React App
│   ├── public/                     # Static assets
│   ├── src/
│   │   ├── components/             # React components
│   │   ├── pages/                  # Page components
│   │   ├── assets/                 # Images & icons
│   │   ├── utils/                  # Utility functions
│   │   ├── App.js                  # Main component
│   │   └── index.js                # Entry point
│   └── package.json                # Frontend dependencies
│
└── test/                           # Testing & utilities
    ├── image-compressor/           # Image optimization tools
    └── fix_product_images.py       # Image processing scripts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v14+ and npm/yarn
- MongoDB (Local or Atlas cloud)
- Azure Storage Account (for image hosting)
- Gmail account (for email notifications)

### Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd kayan_backend
   npm install
   ```

2. **Configure environment variables**
   Create a `.env` file in the `kayan_backend` directory:

   ```env
   PORT=8080
   LOCAL_MONGO_URI=mongodb://localhost:27017/kayan
   ONLINE_MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/kayan
   DB_NAME=kayan

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key

   # Email Configuration
   EMAIL_FROM=your_gmail@gmail.com
   EMAIL_PASSWORD=your_app_password

   # Azure Blob Storage
   AZURE_STORAGE_ACCOUNT=your_account
   AZURE_STORAGE_KEY=your_key
   AZURE_CONTAINER_NAME=kayan-images
   ```

3. **Start the backend server**

   ```bash
   # Development mode with auto-reload
   npm run startdev

   # Production mode
   npm start
   ```

   The backend will run on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd kayan
   npm install
   ```

2. **Start the development server**

   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`

3. **Build for production**
   ```bash
   npm run build
   ```

---

## 📡 API Endpoints

### Authentication Routes

```
POST   /auth/register              # Register new admin
POST   /auth/login                 # Admin login
POST   /auth/logout                # Admin logout
GET    /auth/forget-password       # Request password reset
POST   /auth/forget-password       # Submit password reset
GET    /auth/reset-password/:token # Verify reset token
POST   /auth/reset-password        # Complete password reset
```

### Product Routes

```
GET    /products                   # Get all products (paginated)
GET    /products/:id               # Get product details
POST   /products                   # Create new product (Admin)
PUT    /products/:id               # Update product (Admin)
DELETE /products/:id               # Delete product (Admin)
GET    /products/category/:cat     # Get products by category
```

### Offer Routes

```
GET    /offers                     # Get active offers
POST   /offers                     # Create new offer (Admin)
PUT    /offers/:id                 # Update offer (Admin)
DELETE /offers/:id                 # Delete offer (Admin)
```

### Admin Routes

```
GET    /admin/dashboard            # Admin dashboard
POST   /admin/complaints           # Submit complaint
GET    /admin/reports              # Get reports
```

---

## 📊 Database Schema

### Product Schema

```javascript
{
  title: String,
  category: Enum(['bedroom', 'office', 'kids-room', 'dining-room', 'sofa', 'salon', 'table', 'cabinet', 'antreeh']),
  price: Number,
  description: String,
  highlights: String,
  mainImageUrl: String,
  rating: Number,
  reviews: [ObjectId],  // References Review model
  creator: ObjectId,    // References Admin
  isOutOfStock: Boolean,
  timestamps: true
}
```

### Admin Schema

```javascript
{
  userName: String (unique),
  email: String (unique),
  password: String (hashed),
  role: String,
  isConfirm: Boolean,
  authenticationToken: String,
  authenticationTokenExpiration: Date,
  confirmToken: String,
  confirmTokenExpiration: Date,
  resetToken: String,
  resetTokenExpiration: Date,
  timestamps: true
}
```

### Review Schema

```javascript
{
  productId: ObjectId,
  creator: {
    name: String,
    email: String,
    phone: String,
    image: String
  },
  rating: Number,
  review: String,
  timestamps: true
}
```

---

## 🔐 Security Features

- **Password Encryption**: Bcrypt hashing with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **CORS Protection**: Configurable cross-origin resource sharing
- **Input Validation**: Yup schema validation for all inputs
- **Email Verification**: Token-based email confirmation
- **Password Reset**: Secure token-based password recovery
- **File Upload Filtering**: MIME type validation for images

---

## 🎨 Frontend Features

- **Responsive Design**: Mobile-first, works on all screen sizes
- **RTL Support**: Full support for Arabic language and right-to-left layouts
- **Product Showcase**: Beautiful product galleries and carousels
- **Category Navigation**: Easy browsing through furniture categories
- **Search & Filter**: Find products with advanced filtering
- **Shopping Cart**: Add to cart functionality (frontend ready)
- **Contact Form**: Get in touch section with validation

---

## 📸 Image Management

- **Multer Integration**: Handle image uploads on the backend
- **Azure Blob Storage**: Cloud-based image hosting
- **Image Compression**: Automated image optimization utilities
- **Format Support**: PNG, JPG, JPEG, WebP

---

## 🔄 Database Utilities

### Automated Features

- **Data Sync**: Synchronize data between local and online MongoDB instances
- **Scheduled Backups**: Cron jobs for automatic database backups
- **Backup Recovery**: Utilities to fetch and restore from backups
- **Collection Management**: Tools for managing database collections

---

## 📧 Email Integration

Automated email notifications for:

- User registration confirmation
- Password reset links
- Admin notifications
- Order status updates

Configuration uses Gmail SMTP with app-specific passwords for security.

---

## 🚢 Deployment

### Backend Deployment

The backend is configured for deployment with:

- Environment-based configuration
- CORS setup for multiple domains
- Production-ready error handling
- Database backup utilities for data safety

### Frontend Deployment

- React build optimization
- Static asset serving
- Environment variable management
- CDN-ready build output

---

## 📝 Environment Variables

**Backend (.env)**

```
PORT=8080
LOCAL_MONGO_URI=mongodb://localhost:27017/kayan
ONLINE_MONGO_URI=mongodb+srv://...
DB_NAME=kayan
JWT_SECRET=your_secret
EMAIL_FROM=your_email@gmail.com
EMAIL_PASSWORD=app_password
AZURE_STORAGE_ACCOUNT=account_name
AZURE_STORAGE_KEY=storage_key
AZURE_CONTAINER_NAME=container_name
```

---

## 🤝 Contributing

This project is maintained by the development team. For bug reports and feature requests, please contact the project maintainers.

---

## 📞 Support & Contact

**Kayan Modern**

- 📧 Email: support@kayan-modern.com
- 📱 WhatsApp: Contact us via the platform
- 🌐 Website: https://kayan-modern.egypts.live
- 📍 Location: Egypt

---

## ⚖️ License

All rights reserved © 2024 Kayan Modern. This project is proprietary and confidential.

---

## 📋 Project Status

**Active Development** - The platform is continuously being improved with new features and optimizations.

### Recent Additions

- Multi-database support (Local + Cloud)
- Azure Blob Storage integration
- Automated backup and recovery systems
- Email verification system
- Advanced product filtering

---

## 🎯 Future Enhancements

- [ ] Payment gateway integration
- [ ] Order tracking system
- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Inventory management system
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] AI-powered product recommendations

---

**Built with ❤️ for furniture enthusiasts**
