# E-commerce Website 🛒

This is a full-stack E-commerce website built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It includes both user and admin interfaces.
## 📁 Folder Structure
E-commerce-website/
├── backend/     # Backend (Node.js + Express + MongoDB)
├── frontend/    # Frontend (React.js)
├── admin/       # Admin panel (React)

## 🚀 Features

### User Side:
- Product listing and filtering
- Product details page
- Add to cart
- Place order
- View order history
- Login & Verification

### Admin Side:
- Admin login
- Add, edit, delete products
- View all orders
- Protected admin routes

## 🛠 Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Auth:** JWT (JSON Web Token)
- **Styling:** Tailwind CSS
- **State Management:** React Context API / Redux (if used)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Adityajain45/E-commerce-website.git
cd E-commerce-website

# Install dependencies for all parts
cd backend
npm install

cd ../frontend
npm install

cd ../admin
npm install

# Start backend
cd backend
npm run dev

# Start frontend
cd ../frontend
npm run dev

# Start admin
cd ../admin
npm run dev
