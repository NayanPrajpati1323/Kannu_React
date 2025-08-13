# Database Setup Guide for Kanakku Inventory System

This guide will help you set up the MySQL database for the inventory and sales management system.

## Prerequisites

Before setting up the database, make sure you have:

1. **MySQL Server** installed on your system
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Or install via package manager (e.g., `winget install MySQL.MySQL` on Windows)

2. **MySQL Workbench** (recommended for GUI management)
   - Download from: https://dev.mysql.com/downloads/workbench/

3. **Node.js** and **npm** installed
   - Download from: https://nodejs.org/

## Step 1: Install MySQL Server

### On Windows:
1. Download MySQL Community Server
2. Run the installer and follow the setup wizard
3. Set up a root password (remember this!)
4. Start MySQL service

### On macOS:
```bash
# Using Homebrew
brew install mysql
brew services start mysql
```

### On Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo mysql_secure_installation
```

## Step 2: Create the Database

### Option A: Using MySQL Command Line

1. Open MySQL command line client:
```bash
mysql -u root -p
```

2. Run the setup script:
```sql
source setup-database.sql;
```

### Option B: Using MySQL Workbench

1. Open MySQL Workbench
2. Connect to your local MySQL server
3. Open the `setup-database.sql` file
4. Execute the entire script

### Option C: Using Command Line with File

```bash
mysql -u root -p < setup-database.sql
```

## Step 3: Configure Environment Variables

The `.env` file has been updated with the following MySQL configuration:

```env
# MySQL Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=kanakku_inventory
DB_PORT=3306

# Application Configuration
PORT=3000
NODE_ENV=development
```

**Important**: Update `DB_PASSWORD` with your actual MySQL root password.

## Step 4: Install Dependencies

```bash
npm install
```

## Step 5: Start the Application

### Development Mode:
```bash
npm run dev
```

### Production Build:
```bash
npm run build
npm start
```

The application will be available at:
- Frontend: http://localhost:5173 (development) or http://localhost:3000 (production)
- API: http://localhost:3000/api

## Database Schema Overview

The system creates the following tables:

### Core Tables:
- **customers** - Customer information
- **categories** - Product categories
- **products** - Inventory items with stock tracking
- **invoices** - Sales invoices
- **invoice_items** - Individual items in invoices
- **quotations** - Sales quotations
- **quotation_items** - Individual items in quotations

### Analytics Tables:
- **inventory_transactions** - Track stock movements
- **sales_analytics** - Daily sales summaries

## Features Available

### Inventory Management:
- ✅ Add/Edit/Delete Products
- ✅ Category Management
- ✅ Stock Level Tracking
- ✅ Automatic Inventory Updates on Sales

### Sales Management:
- ✅ Customer Management
- ✅ Invoice Creation
- ✅ Quotation Management
- ✅ Sales Analytics Dashboard

### API Endpoints:

#### Products:
- `GET /api/products` - List products with pagination
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

#### Customers:
- `GET /api/customers` - List customers with pagination
- `POST /api/customers` - Create new customer

#### Categories:
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create new category

#### Invoices:
- `GET /api/invoices` - List invoices with pagination
- `POST /api/invoices` - Create new invoice (with automatic inventory update)

#### Dashboard:
- `GET /api/dashboard/stats` - Get dashboard analytics

## Testing the Setup

1. **Test Database Connection**:
   Visit http://localhost:3000/api/health to check if the API is running

2. **Test Database Data**:
   Visit http://localhost:3000/api/products to see sample products

3. **Access Frontend**:
   Go to http://localhost:5173 and navigate to:
   - `/inventory/products` - Product management
   - `/inventory/categories` - Category management
   - `/invoices` - Invoice management
   - `/customers` - Customer management

## Troubleshooting

### Connection Issues:
- Verify MySQL is running: `sudo systemctl status mysql` (Linux) or check Services (Windows)
- Check credentials in `.env` file
- Ensure database exists: `SHOW DATABASES;` in MySQL

### Permission Issues:
- Make sure MySQL user has proper privileges
- Run: `GRANT ALL PRIVILEGES ON kanakku_inventory.* TO 'root'@'localhost';`

### Port Conflicts:
- Change `PORT` in `.env` if 3000 is occupied
- Change `DB_PORT` if 3306 is occupied

## Default Sample Data

The setup script includes sample data:
- 4 Categories (Electronics, Software, Books, Office Supplies)
- 3 Customers (John Doe, Jane Smith, Bob Johnson)
- 5 Products (Laptop, Software License, Mouse, Book, Chair)

## Next Steps

1. Access the application at http://localhost:5173
2. Navigate to inventory and sales sections
3. Add your own products and customers
4. Create invoices to test the system
5. View analytics on the dashboard

The database is now fully connected and ready for production use!
