
# Property Pulse - Real Estate Web App

## Overview

Property Pulse is a full-stack real estate web application built with React (TypeScript) and tailwind for the frontend, Node.js, Express, and MongoDB for the backend. The web app provides comprehensive CRUD functionality. Additionally, it supports secure authentication with JWT & Google authentication through Firebase.

## Tech Stack

- **Frontend:**
  - React (TypeScript)
  - Tailwind CSS

- **Backend:**
  - Node.js
  - Express
  - MongoDB (Database)

- **Authentication:**
  - JWT (JSON Web Tokens)
  - Google authentication using Firebase

## Features

- **User Authentication:**
  - Secure authentication using JWT (JSON Web Tokens).
  - Users can sign in and sign up with their email and password.
  - Integration of Google authentication via Firebase.

- **Listings Management:**
  - Create detailed property listings with customizable information.
  - Update and edit existing listings to keep information current.
  - Delete listings when they are no longer relevant.

- **Profile Management:**
  - Update personal information for a personalized user experience.
  - Delete the user's account when needed.

## Project Structure

The root project has `client` and `api` folders. 

- **Client:** Frontend React application.

- **API:** Backend Node.js and Express application.

## Setup
- **Clone the Repository:**
	- git clone git@github.com:ahmedwagih96/property-pulse.git

- **Install Backend Dependencies and run the server:**
	- npm install.
	- npm run dev

- **Install Frontend Dependencies and run the server:**
	- cd client 
    - npm install
	- npm run dev 

## Local Environment Setup

- **Frontend:**
Create a `.env` file in the `client` folder with the following content:
- VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID

- **Backend:**
 Create a `.env` file in the `root` folder with the following content:
- MONGODB_URI=YOUR_MONGODB_URI
- JWT_SECRET=YOUR_JWT_SECRET