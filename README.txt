📘 BookSaw – Next-Gen Digital Bookstore

A modern e-commerce platform for selling books online, built as part of the IGNOU BCA Project (BCSP-064).

<!-- replace with actual screenshot path -->

🚀 Features
👤 Customer Side

Secure signup, login, update password & profile management

Browse books by category with sorting & quick preview popup

Cart management with coupon support

Checkout with delivery scheduling and payment method option

Order history with downloadable receipt

Request new books via a simple form

Modern emoji-based feedback system

🛠️ Admin Dashboard

Clean, analytics-driven dashboard (easy even for non-tech users)

Manage customers (sort, view)

Manage books (add, edit, delete)

Orders management (update status: Pending → Shipped → Delivered/Cancelled)

View requested books & feedback

Fun greeting with time-based GIFs (morning, afternoon, evening, night)

🏗️ Tech Stack

Frontend: HTML, CSS, JavaScript, EJS

Backend: Node.js, Express.js

Database: MySQL (via WebServer64)

Libraries: Multer, Chart.js, bcrypt

Version Control: Git & GitHub

📂 Project Structure
BookSaw/
│── index.js              # Main server file
│── booksaw_co.sql        # Database schema & sample data
│── public/               # CSS, JS, Images
│── views/                # EJS templates
│── package.json          # Dependencies
│── README.md             # This file

⚙️ Setup Instructions

Install WebServer64
 or any MySQL-supported stack.

Start MySQL service from WebServer64.

Open phpMyAdmin → create a database named booksaw.

Import booksaw_co.sql.

Install Node.js (v16+).

In project root, install dependencies:

npm install


Start the server:

npm start


Open in browser:

http://localhost:5050/

🔑 Test Credentials
Admin Login

Email: admin@booksaw.com

Password: admin123

Customer Login

Email: user1@gmail.com

Password: user123

📸 Screenshots

(Add 3–5 key screenshots here for GitHub viewers)

Landing Page

Browse Books

Cart & Checkout

Admin Dashboard

🔮 Future Enhancements

Migration to React frontend

Mobile apps with React Native / Flutter

AI-based book recommendations

Payment gateway integration (UPI, cards, wallets)

Wishlist & notifications

📚 References

Node.js Documentation

Express.js

MySQL Manual

Chart.js

Multer

MDN Web Docs

FreeCodeCamp

Jonas Schmedtmann – Node.js Course

Piyush Garg – Node.js & Express Tutorials

Hitesh Choudhary – Web Dev Tutorials

Web Dev Simplified

📝 License

This project is part of an academic submission for IGNOU BCA (BCSP-064).
Feel free to explore and learn, but do not submit as your own project.