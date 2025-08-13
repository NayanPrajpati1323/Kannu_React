# Kanakku Inventory & Sales Management System - Setup Guide

A comprehensive inventory and sales management system built with React, TypeScript, Node.js, and MySQL.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [MySQL Database Setup](#mysql-database-setup)
3. [Project Installation](#project-installation)
4. [Environment Configuration](#environment-configuration)
5. [Database Initialization](#database-initialization)
6. [Running the Application](#running-the-application)
7. [Project Structure](#project-structure)
8. [Available Scripts](#available-scripts)
9. [API Endpoints](#api-endpoints)
10. [Troubleshooting](#troubleshooting)

## 🔧 Prerequisites

Before setting up this project, ensure you have the following installed on your system:

- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MySQL** (v8.0 or higher) - [Download here](https://dev.mysql.com/downloads/mysql/)
- **Git** - [Download here](https://git-scm.com/)

### Verify Installation

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check MySQL version
mysql --version

# Check Git version
git --version
```

## 🗄️ MySQL Database Setup

### 1. Install MySQL

**On Windows:**
- Download MySQL Installer from the official website
- Run the installer and follow the setup wizard
- Choose "Developer Default" setup type
- Set a root password (remember this!)

**On macOS:**
```bash
# Using Homebrew
brew install mysql

# Start MySQL service
brew services start mysql

# Secure installation
mysql_secure_installation
```

**On Linux (Ubuntu/Debian):**
```bash
# Update package index
sudo apt update

# Install MySQL server
sudo apt install mysql-server

# Secure installation
sudo mysql_secure_installation

# Start MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql
```

### 2. Create Database User (Optional but Recommended)

```sql
-- Connect to MySQL as root
mysql -u root -p

-- Create a new database
CREATE DATABASE kanakku_inventory;

-- Create a new user for the application
CREATE USER 'kanakku_user'@'localhost' IDENTIFIED BY 'your_secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON kanakku_inventory.* TO 'kanakku_user'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;

-- Exit MySQL
EXIT;
```

## 📁 Project Installation

### 1. Clone the Repository

```bash
# Clone the project
git clone <your-repository-url>
cd kanakku-inventory-system

# Or if you have the project files locally, navigate to the project directory
cd path/to/your/project
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm install

# Or if you prefer yarn
yarn install
```

This will install both frontend and backend dependencies including:
- React & TypeScript for the frontend
- Express.js for the backend
- MySQL2 for database connectivity
- Tailwind CSS for styling
- And many other packages

## ⚙️ Environment Configuration

### 1. Create Environment File

```bash
# Copy the example environment file
cp .env.example .env

# Or create a new .env file
touch .env
```

### 2. Configure Environment Variables

Edit the `.env` file with your MySQL database credentials:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=kanakku_user
DB_PASSWORD=your_secure_password
DB_NAME=kanakku_inventory
DB_PORT=3306

# Application Configuration
PING_MESSAGE=pong
PORT=8080

# Optional: For production deployment
NODE_ENV=development
```

**Important Notes:**
- Replace `your_secure_password` with your actual MySQL password
- If you're using the root user, use `root` as `DB_USER` and your root password
- If MySQL is running on a different port, update `DB_PORT`
- If using a remote MySQL server, update `DB_HOST`

## 🚀 Database Initialization

The application will automatically create all necessary database tables when you first run it. The tables include:

- `customers` - Customer information
- `categories` - Product categories
- `products` - Product/service details
- `invoices` - Invoice records
- `invoice_items` - Invoice line items
- `quotations` - Quotation records
- `quotation_items` - Quotation line items
- `inventory_transactions` - Stock movement tracking
- `sales_analytics` - Sales analytics data

### Manual Database Initialization (if needed)

If you encounter issues with automatic initialization:

```bash
# Connect to MySQL
mysql -u kanakku_user -p

# Select the database
USE kanakku_inventory;

# The application will create tables automatically on first run
# But you can also run SQL scripts manually if needed
```

## 🏃‍♂️ Running the Application

### 1. Development Mode

```bash
# Start the development server
npm run dev

# Or with yarn
yarn dev
```

This command will:
- Start the Vite development server on `http://localhost:8080`
- Start the Express backend server
- Initialize the MySQL database
- Seed sample data (customers, products, etc.)

### 2. Production Build

```bash
# Build the application
npm run build

# Start the production server
npm start
```

### 3. Access the Application

Open your web browser and navigate to:
- **Frontend**: `http://localhost:8080`
- **API**: `http://localhost:8080/api`

## 📂 Project Structure

```
kanakku-inventory-system/
├── client/                     # Frontend React application
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Base UI components (buttons, cards, etc.)
│   │   ├── dashboard-layout.tsx
│   │   ├── language-selector.tsx
│   │   └── notification-popup.tsx
│   ├── pages/                # Application pages
│   │   ├── Dashboard.tsx     # Main dashboard
│   │   ├── Invoices.tsx      # Invoice management
│   │   ├── Products.tsx      # Product management
│   │   ├── Customers.tsx     # Customer management
│   │   └── ...
│   ├── lib/                  # Utility functions
│   ├── hooks/                # Custom React hooks
│   └── App.tsx               # Main App component
├── server/                    # Backend Node.js application
│   ├── config/               # Configuration files
│   │   └── database.ts       # MySQL connection setup
│   ├── models/               # Data models and interfaces
│   ├── services/             # Business logic services
│   │   └── DatabaseService.ts
│   ├── routes/               # API route handlers
│   │   └── api.ts
│   └── index.ts              # Express server setup
├── shared/                   # Shared utilities
├── .env.example              # Environment variables template
├── package.json              # Dependencies and scripts
├── tailwind.config.ts        # Tailwind CSS configuration
├── vite.config.ts            # Vite build configuration
└── README.md                 # Project documentation
```

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run format.fix   # Format code with Prettier
npm run typecheck   # Check TypeScript types
npm test           # Run tests

# Build Commands
npm run build:client # Build frontend only
npm run build:server # Build backend only
```

## 🌐 API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Customers
- `GET /api/customers` - Get all customers (with pagination)
- `POST /api/customers` - Create new customer

### Products
- `GET /api/products` - Get all products (with pagination)
- `POST /api/products` - Create new product

### Invoices
- `GET /api/invoices` - Get all invoices (with pagination)
- `POST /api/invoices` - Create new invoice

### Example API Usage

```javascript
// Get dashboard stats
fetch('/api/dashboard/stats')
  .then(response => response.json())
  .then(data => console.log(data));

// Create a new customer
fetch('/api/customers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    company: 'Tech Corp'
  })
});
```

## 🛠️ Troubleshooting

### Common Issues and Solutions

#### 1. Database Connection Failed

**Error**: `❌ Database connection failed`

**Solutions**:
- Check MySQL service is running:
  ```bash
  # On Windows (in cmd as administrator)
  net start mysql80

  # On macOS/Linux
  sudo systemctl start mysql
  # or
  brew services start mysql
  ```
- Verify credentials in `.env` file
- Test connection manually:
  ```bash
  mysql -u kanakku_user -p
  ```

#### 2. Port Already in Use

**Error**: `Port 8080 is already in use`

**Solutions**:
- Change port in `.env` file:
  ```env
  PORT=3000
  ```
- Kill process using the port:
  ```bash
  # Find process ID
  lsof -i :8080
  
  # Kill process
  kill -9 <PID>
  ```

#### 3. NPM Installation Errors

**Error**: Various npm errors during installation

**Solutions**:
- Clear npm cache:
  ```bash
  npm cache clean --force
  ```
- Delete node_modules and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- Update Node.js to the latest LTS version

#### 4. MySQL Access Denied

**Error**: `Access denied for user`

**Solutions**:
- Reset MySQL root password:
  ```bash
  sudo mysql -u root
  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'newpassword';
  FLUSH PRIVILEGES;
  ```
- Create new user with proper privileges (see Database Setup section)

#### 5. TypeScript Compilation Errors

**Error**: TypeScript type errors

**Solutions**:
- Run type check:
  ```bash
  npm run typecheck
  ```
- Install missing type definitions:
  ```bash
  npm install @types/[package-name]
  ```

## 🔧 Development Tips

### 1. Database Management

- Use a MySQL GUI tool like:
  - MySQL Workbench (official)
  - phpMyAdmin (web-based)
  - TablePlus (macOS)
  - DBeaver (cross-platform)

### 2. API Testing

- Use tools like:
  - Postman
  - Insomnia
  - VS Code REST Client extension

### 3. Code Editor Setup

Recommended VS Code extensions:
- TypeScript Importer
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ES7+ React/Redux/React-Native snippets

## 📞 Support

If you encounter any issues:

1. Check this troubleshooting guide
2. Review the error logs in the terminal
3. Check MySQL error logs
4. Verify all environment variables are set correctly

## 🔄 Next Steps

After successful setup:

1. **Explore the Dashboard**: Navigate to the main dashboard to see analytics
2. **Add Customers**: Start by adding customer information
3. **Create Products**: Set up your product catalog
4. **Generate Invoices**: Create and manage invoices
5. **Track Inventory**: Monitor stock levels and movements
6. **Customize**: Modify the application to fit your business needs

---

**Happy coding! 🚀**

For additional help or feature requests, please refer to the project documentation or contact the development team.
