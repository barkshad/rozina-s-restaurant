# Rozina's Restaurant Web Application

A professional full-stack web application for **Rozina's Restaurant, Nakuru**, built with React, Vite, Tailwind CSS, Firebase, and Cloudinary.

## Features

- **Public Frontend**:
  - **Home**: Welcome page with featured sections.
  - **Menu**: Live menu fetching from Firestore with category filtering (Poussin Specials, BBQ/Tikka, Chinese, Italian, Seafood).
  - **Cart**: Persistent shopping cart with local storage.
  - **Checkout**: Order summary and M-Pesa payment integration (redirect to Lipana).
  - **About**: Restaurant story and information.

- **Admin Dashboard**:
  - **Overview**: View total orders and revenue.
  - **Order Management**: List pending orders and mark them as paid.
  - **Menu Management**: Add new dishes with image uploads via Cloudinary.

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend/Database**: Firebase Firestore
- **Image Storage**: Cloudinary
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Setup Instructions

### 1. Clone & Install

```bash
git clone <repository-url>
cd rozinas-restaurant
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`) and add your configuration:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=ds2mbrzcn
VITE_CLOUDINARY_UPLOAD_PRESET=rozina_unsigned
```

### 3. Run Locally

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Deployment to Vercel

1.  **Push to GitHub**:
    -   Initialize git: `git init`
    -   Add files: `git add .`
    -   Commit: `git commit -m "Initial commit"`
    -   Push to your repository.

2.  **Deploy**:
    -   Go to [Vercel Dashboard](https://vercel.com/dashboard).
    -   Click **Add New Project** and import your GitHub repository.
    -   In the **Environment Variables** section, add all the variables from your `.env` file.
    -   Click **Deploy**.

## Admin Usage

-   Navigate to `/admin` to access the dashboard.
-   Use the **Menu Management** tab to add initial dishes to the menu.
-   Images are uploaded to Cloudinary automatically.

## License

All rights reserved. Rozina's Restaurant, Nakuru.
