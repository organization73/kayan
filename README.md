# Kayan Modern

![Kayan Modern Furniture Storefront](https://raw.githubusercontent.com/organization73/kayan/backend-local-storage-file/home-main.png)

**Backend-first furniture marketplace and admin platform with a React storefront, full product workflows, and image-backed catalog management.**

---

## Why this repository

This project is built around the backend. The Node.js + Express API drives product listings, offers, reviews, image uploads, and admin controls. The React storefront is the presentation layer that renders product detail, home marketing, and about content.

The structure of this README puts the product page first, the home page second, and the about page last — matching the frontend user flow and the repository's product-focused value.

---

## 1. Product Page (Primary showcase)

![Product Page Screenshot](https://raw.githubusercontent.com/organization73/kayan/backend-local-storage-file/productPage-main.png)

The product page is the repository’s main commercial experience. It shows the catalog, product detail, stock status, and review flow.

### What this page demonstrates

- Product catalog powered by backend data
- Category filtering and scoped search
- Detail pages with price, description, highlights, and gallery images
- Review summaries and customer feedback
- Backend-driven stock and offer visibility

### Backend work behind the product page

- Product model and CRUD operations
- Category filters and product list APIs
- Image upload validation and storage via `multer`
- Input validation with `yup`
- Review submission and admin approval logic
- Server-side pagination and query handling

![Product Page Detail](https://raw.githubusercontent.com/organization73/kayan/backend-local-storage-file/home2.png)

This section is first because product management is the most important feature in this repo.

---

## 2. Home Page (Marketing and discovery)

![Home Page Screenshot](https://raw.githubusercontent.com/organization73/kayan/backend-local-storage-file/home-main.png)

The home page is the brand entry point. It highlights collections, active promotions, and trust signals while guiding users to browse product categories.

### What this page delivers

- Hero messaging and call-to-action links
- Featured collections and category cards
- Active offers and promotional banners
- Customer review highlights and business trust elements
- Responsive layout optimized for Arabic RTL presentation

### Backend support for the home page

- `GET /api/client/offers` for active promotions
- `GET /api/client/products` for featured catalog data
- Content and image assets served through backend endpoints

![Home Page Marketing](https://raw.githubusercontent.com/organization73/kayan/backend-local-storage-file/home2.png)

The home page is second because it depends on the same backend services that power product discovery.

---

## 3. About Page (Brand and service story)

![About Page Screenshot](https://raw.githubusercontent.com/organization73/kayan/backend-local-storage-file/about-main.png)

The about page is the brand-facing section of the storefront. It supports company narrative, trust messaging, and content-driven presentation.

### What this page highlights

- Brand identity and company story
- Service promises and operational detail
- Static content served alongside backend-managed assets
- Arabic-ready layout for local audiences

### Backend support for the about page

- Static or configured page content delivered via backend supply
- Image assets handled by the backend file pipeline
- Lightweight route handling and fast content presentation

![About Page Additional Image](https://raw.githubusercontent.com/organization73/kayan/backend-local-storage-file/about1.png)

---

## Control Panel (Admin)

The repository includes a full admin control panel (routes defined in `routes/admin.js`) that allows site administrators to:

- Add and manage gallery reviews and complaints
- Add products and offers via the control panel UI
- Read and resolve customer complaints
- Delete or approve gallery reviews and manage site content

Key admin routes (see `routes/admin.js`):

```
GET    /add-gallary-review
POST   /add-gallary-review
DELETE /gallary-review/:id
GET    /complains
POST   /complain
DELETE /complain/:id
GET    /
GET    /client/galary-review
```

The control panel UI screenshots are included below. Use the raw GitHub URLs so images render on GitHub and fall back to local files when viewed in the repository.

![Control Panel Screenshot](https://raw.githubusercontent.com/organization73/kayan/backend-local-storage-file/controlPanel.png)

If you prefer local references while working in the repository, the file `controlpanel.png` is included in the project root images list and will render when opening `README.md` locally in VS Code.
The about page is last because this repo prioritizes product discovery and sales workflow first.

---

## Backend-first architecture

The backend is the engine of the system. It supports both the admin console and the client storefront through the same API layer.

### Key backend technologies

- Node.js, Express, MongoDB, Mongoose
- JWT authentication and secure admin sessions
- `bcrypt` password hashing
- `multer` image file upload and validation
- Azure Blob Storage integration for media handling
- `nodemailer` email workflows for password recovery
- `node-cron` database sync and backup scheduling
- `dotenv` environment configuration

### Backend feature set

- Secure admin registration, login, and password reset
- Product catalog management and category filtering
- Offer and promotion lifecycle handling
- Review collection, approval, and moderation
- Image upload and static file serving
- Centralized error handling and authorization middleware
- Database backup and recovery utilities

---

## Project structure

```text
kayan_manager/
├── kayan_backend/                # Backend API server and admin logic
│   ├── app.js                    # Express configuration and route setup
│   ├── package.json              # Backend dependencies and scripts
│   ├── controllers/              # Business logic for auth, product, offer flows
│   ├── models/                   # Mongoose schemas for product, admin, offer, review
│   ├── routes/                   # Express route definitions for API and client
│   ├── middleware/               # Auth guards and error handling
│   ├── utilities/                # Backup, file, and domain helper modules
│   └── views/                    # EJS templates for admin and rendered pages
├── kayan/                        # React frontend app for product and brand pages
│   ├── public/                   # Static assets and metadata
│   ├── src/                      # React pages, components, and helpers
│   ├── package.json              # Frontend dependency list and scripts
│   └── tailwind.config.js        # Tailwind CSS and RTL support
└── test/                         # Scripts for image processing and data maintenance
```

````

---

## API reference

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/forget-password`
- `POST /api/auth/forget-password`
- `GET /api/auth/reset-password/:token`
- `POST /api/auth/reset-password`

### Products

- `GET /api/client/products`
- `GET /api/client/product/:productId`
- `GET /api/client/product-reviews/:productId`
- `POST /api/add-review`
- `DELETE /api/product/:productId`
- `PATCH /api/approve-product-review/:reviewId`

### Offers

- `GET /api/client/offers`
- `GET /api/client/offer/:offerId`
- `GET /api/client/offer-details/:offerId`
- `POST /api/add-offer`
- `PUT /api/edit-offer`
- `DELETE /api/offer/:offerId`

### Admin

- `GET /api/products`
- `GET /api/offers`
- `GET /api/products-reviews`

---

## Data models

### Product

```js
{
  title: String,
  price: Number,
  category: String,
  description: String,
  highlights: String,
  mainImageUrl: String,
  rating: Number,
  isOutOfStock: Boolean,
  creator: ObjectId,
  reviews: [ObjectId]
}
````

### Admin

```js
{
  userName: String,
  email: String,
  password: String,
  role: String,
  isConfirm: Boolean,
  confirmToken: String,
  resetToken: String,
  authenticationToken: String
}
```

### Review

```js
{
  productId: ObjectId,
  creator: {
    name: String,
    email: String,
    phone: String,
    image: String
  },
  rating: Number,
  review: String
}
```

---

## Setup

### Backend

```bash
cd kayan_backend
npm install
```

Create `.env` with at least:

```env
PORT=8080
LOCAL_MONGO_URI=mongodb://localhost:27017/kayan
ONLINE_MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=kayan
JWT_SECRET=your_jwt_secret_key
EMAIL_FROM=your_email@example.com
EMAIL_PASSWORD=your_email_password
AZURE_STORAGE_ACCOUNT=your_account
AZURE_STORAGE_KEY=your_key
AZURE_CONTAINER_NAME=kayan-images
```

Start locally:

```bash
npm run startdev
```

### Frontend

```bash
cd kayan
npm install
npm start
```

---

## Recruiter-ready summary

This README emphasizes backend implementation while still showcasing the frontend page flow in the preferred order:

- product page first
- home page second
- about page last
- backend models, API design, and validation logic clearly documented
- deployment-ready setup instructions included

**Kayan Modern — backend-driven furniture storefront with product-first UX and admin-grade API support.**
