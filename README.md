# Food Delivery Backend
This repository contains the backend code for the Food Delivery application.

## Features

- User authentication and authorization
- Restaurant and menu management
- Order processing and tracking
- Payment integration
- API endpoints for frontend consumption

## Technologies Used

- **Programming Language**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Payment Gateway**: Stripe

## Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/your-username/tomato-food-delivery-backend.git
  ```
2. Navigate to the project directory:
  ```bash
  cd food-delivery-backend
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
- The server will run on `http://localhost:5000`.

## API Documentation

Refer to the [API Documentation](docs/api.md) for detailed information about available endpoints.

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).