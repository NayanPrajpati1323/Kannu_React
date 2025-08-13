# MySQL Workbench Setup Guide

## Step-by-Step Instructions for MySQL Workbench

### 1. Open MySQL Workbench
- Launch MySQL Workbench on your PC
- Connect to your local MySQL Server (usually shows as "Local instance MySQL80" or similar)
- Use your credentials: 
  - Username: `root`
  - Password: `Nayan@1323`

### 2. Execute the Database Setup

#### Option A: Copy and Paste (Recommended)
1. In MySQL Workbench, open a new SQL tab (click the SQL icon or Ctrl+T)
2. Copy ALL the content from `setup-database.sql` file
3. Paste it into the SQL editor
4. Click the "Execute" button (⚡ icon) or press Ctrl+Shift+Enter

#### Option B: Open File Directly
1. In MySQL Workbench: File → Open SQL Script
2. Navigate to your project folder: `C:\Users\Nayan\Downloads\orbit-nest (1)\`
3. Select `setup-database.sql`
4. Click "Execute" to run the entire script

### 3. Verify Database Creation
After running the script, you should see:
- A new database called `kanakku_inventory` in the left sidebar
- Multiple tables created (customers, products, categories, etc.)
- Sample data inserted automatically

### 4. Check the Results
Run this query to verify everything is working:
```sql
USE kanakku_inventory;
SELECT COUNT(*) as total_products FROM products;
SELECT COUNT(*) as total_customers FROM customers;
SELECT COUNT(*) as total_categories FROM categories;
```

You should see:
- 5 products
- 3 customers  
- 4 categories

### 5. Database is Ready!
Once you see the success message, your database is fully configured and ready to use with the application.

## Next Steps
1. Keep MySQL Workbench open (or ensure MySQL service is running)
2. Go back to your terminal/command prompt
3. Run the development server: `npm run dev`
4. Open your browser to http://localhost:5173

The application will now connect to your MySQL database and you can start adding products, customers, and creating invoices!
