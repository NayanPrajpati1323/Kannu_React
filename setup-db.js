// Database setup script
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Nayan@1323',
  port: parseInt(process.env.DB_PORT || '3306'),
};

async function setupDatabase() {
  let connection;
  try {
    console.log('🔄 Connecting to MySQL server...');
    
    // Connect without specifying database
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to MySQL server!');
    
    // Create database
    console.log('📝 Creating database...');
    await connection.execute('CREATE DATABASE IF NOT EXISTS kanakku_inventory');
    console.log('✅ Database kanakku_inventory created!');
    
    // Close first connection and reconnect to the database
    await connection.end();
    
    // Reconnect with database specified
    connection = await mysql.createConnection({
      ...dbConfig,
      database: 'kanakku_inventory'
    });
    console.log('✅ Connected to kanakku_inventory database');
    
    // Create tables
    console.log('📊 Creating tables...');
    
    // Customers table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS customers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE,
        phone VARCHAR(50),
        company VARCHAR(255),
        address TEXT,
        city VARCHAR(100),
        state VARCHAR(100),
        country VARCHAR(100),
        postal_code VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    // Categories table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    // Products table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        sku VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        category_id INT,
        price DECIMAL(10, 2) NOT NULL,
        cost DECIMAL(10, 2),
        stock_quantity INT DEFAULT 0,
        min_stock_level INT DEFAULT 0,
        unit VARCHAR(50) DEFAULT 'pcs',
        barcode VARCHAR(255),
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
      )
    `);
    
    // Invoices table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS invoices (
        id INT AUTO_INCREMENT PRIMARY KEY,
        number VARCHAR(100) UNIQUE NOT NULL,
        customer_id INT NOT NULL,
        date DATE NOT NULL,
        due_date DATE,
        subtotal DECIMAL(10, 2) DEFAULT 0,
        tax_rate DECIMAL(5, 2) DEFAULT 0,
        tax_amount DECIMAL(10, 2) DEFAULT 0,
        discount_rate DECIMAL(5, 2) DEFAULT 0,
        discount_amount DECIMAL(10, 2) DEFAULT 0,
        total DECIMAL(10, 2) NOT NULL,
        status ENUM('draft', 'sent', 'paid', 'overdue', 'cancelled') DEFAULT 'draft',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
      )
    `);
    
    // Invoice items table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS invoice_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        invoice_id INT NOT NULL,
        product_id INT NOT NULL,
        description TEXT,
        quantity DECIMAL(10, 2) NOT NULL,
        unit_price DECIMAL(10, 2) NOT NULL,
        total DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);
    
    // Other tables
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS quotations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        number VARCHAR(100) UNIQUE NOT NULL,
        customer_id INT NOT NULL,
        date DATE NOT NULL,
        expiry_date DATE,
        subtotal DECIMAL(10, 2) DEFAULT 0,
        tax_rate DECIMAL(5, 2) DEFAULT 0,
        tax_amount DECIMAL(10, 2) DEFAULT 0,
        discount_rate DECIMAL(5, 2) DEFAULT 0,
        discount_amount DECIMAL(10, 2) DEFAULT 0,
        total DECIMAL(10, 2) NOT NULL,
        status ENUM('draft', 'sent', 'accepted', 'rejected', 'expired') DEFAULT 'draft',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
      )
    `);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS quotation_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        quotation_id INT NOT NULL,
        product_id INT NOT NULL,
        description TEXT,
        quantity DECIMAL(10, 2) NOT NULL,
        unit_price DECIMAL(10, 2) NOT NULL,
        total DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (quotation_id) REFERENCES quotations(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS inventory_transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        type ENUM('in', 'out', 'adjustment') NOT NULL,
        quantity DECIMAL(10, 2) NOT NULL,
        reference_type ENUM('invoice', 'purchase', 'adjustment', 'initial') NOT NULL,
        reference_id INT,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS sales_analytics (
        id INT AUTO_INCREMENT PRIMARY KEY,
        date DATE NOT NULL,
        total_sales DECIMAL(10, 2) DEFAULT 0,
        total_invoices INT DEFAULT 0,
        total_customers INT DEFAULT 0,
        total_products_sold INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_date (date)
      )
    `);
    
    console.log('✅ All tables created successfully!');
    
    // Insert sample data
    console.log('📊 Inserting sample data...');
    
    await connection.execute(`
      INSERT IGNORE INTO categories (id, name, description) VALUES 
      (1, 'Electronics', 'Electronic items and gadgets'),
      (2, 'Software', 'Software products and licenses'),
      (3, 'Books', 'Educational and reference books'),
      (4, 'Office Supplies', 'Office equipment and supplies')
    `);
    
    await connection.execute(`
      INSERT IGNORE INTO customers (id, name, email, phone, company, address, city, state, country) VALUES 
      (1, 'John Doe', 'john@example.com', '+1234567890', 'Tech Corp', '123 Tech Street', 'San Francisco', 'CA', 'USA'),
      (2, 'Jane Smith', 'jane@example.com', '+1234567891', 'Design Studio', '456 Design Ave', 'New York', 'NY', 'USA'),
      (3, 'Bob Johnson', 'bob@company.com', '+1234567892', 'Johnson Enterprises', '789 Business Blvd', 'Chicago', 'IL', 'USA')
    `);
    
    await connection.execute(`
      INSERT IGNORE INTO products (id, name, sku, category_id, price, cost, stock_quantity, min_stock_level, unit) VALUES 
      (1, 'Laptop Computer', 'LAP001', 1, 999.99, 800.00, 50, 5, 'pcs'),
      (2, 'Software License', 'SW001', 2, 199.99, 150.00, 100, 10, 'license'),
      (3, 'Wireless Mouse', 'MS001', 1, 29.99, 20.00, 200, 20, 'pcs'),
      (4, 'Programming Book', 'BK001', 3, 49.99, 30.00, 75, 5, 'pcs'),
      (5, 'Office Chair', 'CH001', 4, 299.99, 200.00, 25, 3, 'pcs')
    `);
    
    console.log('✅ Sample data inserted successfully!');
    
    // Verify setup
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`📊 Created ${tables.length} tables:`);
    tables.forEach((table, index) => {
      console.log(`   ${index + 1}. ${Object.values(table)[0]}`);
    });
    
    console.log('🎉 Database setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Database setup failed:');
    console.error('Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();
