# eCart - MERN Stack Plant E-commerce Website

eCart is a full-featured e-commerce web application built using the MERN stack (MongoDB, Express.js, React, Node.js). It's an online store dedicated to selling plants, providing a complete user workflow from browsing and adding items to the cart to placing an order and viewing order history.


## 🚀 Key Features

### 🛍️ E-commerce & Product Features
* **Product Catalog:** Displays all available plants on the home page with pricing, discounts, and descriptions.
* **Product Details:** A dedicated page for each product showing detailed information, larger images, "Why You'll Love It" section, and availability.
* **Reviews and Ratings:** Users can submit reviews and star ratings for products. Existing reviews are displayed on the product details page.

### 👤 User Authentication
* **Secure Sign-up & Login:** Full authentication system using JWT (JSON Web Tokens) for secure user registration and login.
* **Protected Routes:** User-specific pages like "Cart" and "My Orders" are protected and accessible only after logging in.

### 🛒 Shopping Cart
* **Add to Cart:** Users can add/remove products from their cart.
* **Update Quantity:** Users can increase or decrease the quantity of items directly in the cart.
* **Persistent Cart:** The cart's state is saved for the logged-in user.

### 📦 Order & Checkout
* **Checkout Process:** A multi-step checkout form to collect user's address (Address, City, State, Zip) and payment mode.
* **Form Validation:** Ensures all required fields like "Zip" are filled before placing an order.
* **Order Summary:** Displays a final bill of all items in the cart before checkout.
* **My Orders Page:** A dedicated page for users to view their past orders, including Order ID, date, total amount, and a visual order status tracker (Order Placed, Shipped, Out for Delivery, Delivered).

### 📝 Additional Pages
* **About Us:** A static page detailing the company's story, values, and connection to Jalandhar, Punjab.
* **Report Issue:** A contact form for users to submit issues regarding orders, packaging, or other problems.

## 🛠️ Tech Stack

* **Frontend:** React.js, React Router
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (with Mongoose)
* **Authentication:** JSON Web Tokens (JWT)
* **State Management:** React Context API (or Redux)

## Screenshots
* Home Page (Product Listing)
* Product Details Page (with Reviews)
* Sign Up & Login
* Shopping Cart
* Checkout & Address Form
* My Orders (Order History)
* About Us Page
* Report Issue Form

## ⚙️ How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/eCart.git](https://github.com/your-username/eCart.git)
    cd eCart
    ```

2.  **Install Backend Dependencies:**
    ```bash
    cd server
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd ../client
    npm install
    ```

4.  **Set up Environment Variables:**
    * Create a `.env` file in the `server` directory.
    * Add your MongoDB connection string and a JWT secret:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    ```

5.  **Run the Application:**
    * **Run the backend (from `server` folder):**
        ```bash
        npm run dev
        ```
    * **Run the frontend (from `client` folder):**
        ```bash
        npm run dev
        ```