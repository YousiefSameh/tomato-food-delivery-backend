# Tomato Food Delivery Backend
Welcome to **Tomato Food Delivery** – a modern backend service for a food delivery web application. This project is designed to provide robust and scalable APIs for frontend consumption, ensuring seamless integration and performance.

## Features

- Secure user authentication and role-based authorization
- Comprehensive restaurant and menu management
- Real-time order processing and tracking
- Payment gateway integration for smooth transactions
- Well-documented RESTful API endpoints

## Technologies Used

- **Programming Language**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Payment Gateway**: Stripe

## Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/YousiefSameh/tomato-food-delivery-backend.git
  ```
2. Navigate to the project directory:
  ```bash
  cd backend
  ```
3. Install dependencies:
  ```bash
  npm install
  ```

## Configuration

1. Create a `.env` file in the root directory.
2. Add the following environment variables:
  ```env
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  STRIPE_SECRET_KEY=your_stripe_secret_key
  ```

## Running the Application

- Start the development server:
  ```bash
  npm run dev
  ```
- The server will be accessible at `http://localhost:5000`.

## API Documentation

Detailed API documentation is available in the [API Documentation](docs/api.md).

## Contributing

We welcome contributions! Please review the [contribution guidelines](CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the [MIT License](LICENSE).