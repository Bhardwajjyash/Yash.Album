YASH.ALBUM
==========

Project Overview
----------------
yash.album is a modern social media photo album application designed for sharing and showcasing photo collections in a visually immersive, dark-themed interface. The platform focuses on clean design, smooth interactions, and secure user authentication.

This project demonstrates full-stack web development using a modern React-based frontend and a scalable Node.js backend with custom authentication and real-time capabilities.

Live Application:
https://yash-album.onrender.com/


Core Features
-------------
- User registration and login with a custom authentication flow
- JWT-based authentication with secure cookie handling
- Protected routes accessible only to authenticated users
- User profile pages displaying personal information and photo albums
- Photo upload and viewing functionality
- Real-time features using WebSockets
- Modern, animated, and responsive user interface


Technology Stack
----------------

Frontend:
- React (Vite)
- React Router DOM for client-side routing
- Redux Toolkit with Redux Persist for state management
- Tailwind CSS for utility-first styling
- Framer Motion for animations
- Lucide React and React Icons for iconography
- Radix UI components for accessible UI primitives
- Particle background using tsparticles / react-particles
- Axios for API communication

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose ODM

Authentication & Media Handling:
- Custom authentication using JWT and cookies
- bcryptjs for password hashing
- Multer for file uploads
- Cloudinary for image storage and delivery
- Sharp for image processing and optimization

Real-Time Communication:
- Socket.IO for real-time features


User Interface Design
---------------------
The application uses a dark-themed, modern UI designed for clarity and visual appeal. Tailwind CSS enables consistent styling, while Framer Motion adds smooth transitions and animations. Particle effects in the background enhance the immersive experience without affecting usability.



How the Application Works
-------------------------
1. Users sign up or log in using the custom authentication system.
2. On successful authentication, a JWT is issued and stored securely in cookies.
3. Protected routes verify the JWT before granting access.
4. Users can upload photos, which are processed and stored using Cloudinary.
5. User and post data are stored in MongoDB using Mongoose schemas.
6. Real-time interactions are handled through Socket.IO where applicable.


Installation and Setup
----------------------
1. Clone the repository:
   git clone <repository-url>

2. Install backend dependencies:
   npm install

3. Install frontend dependencies:
   npm install --prefix frontend

4. Configure environment variables:
   - MongoDB connection string
   - JWT secret
   - Cloudinary credentials
   - CORS and cookie settings

5. Run the application in development mode:
   npm run dev

6. Open the application in the browser.


Use Cases
---------
- Social media photo sharing
- Personal digital photo albums
- Full-stack portfolio project
- Learning custom authentication and secure API design
- Real-time web application development


Future Enhancements
-------------------
- Like and comment system
- Follow and user interaction features
- Album privacy and access control
- Improved mobile responsiveness
- Performance optimizations and caching


Author
------
Developed by:
Yash Bhardwaj

This project demonstrates strong skills in full-stack development, secure authentication, real-time communication, and modern UI/UX design.
