// Test connection to specific database
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Nayan@1323',
  database: 'kanakku_inventory',
  port: parseInt(process.env.DB_PORT || '3306'),
};

async function testSpecificDB() {
  try {
    console.log('🔄 Testing connection to kanakku_inventory database...');
    
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to kanakku_inventory database!');
    
    // Check tables
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`📊 Found ${tables.length} tables:`);
    tables.forEach((table, index) => {
      console.log(`   ${index + 1}. ${Object.values(table)[0]}`);
    });
    
    // Check sample data
    const [products] = await connection.execute('SELECT COUNT(*) as count FROM products');
    const [customers] = await connection.execute('SELECT COUNT(*) as count FROM customers');
    const [categories] = await connection.execute('SELECT COUNT(*) as count FROM categories');
    
    console.log('📈 Data counts:');
    console.log(`   Products: ${products[0].count}`);
    console.log(`   Customers: ${customers[0].count}`);
    console.log(`   Categories: ${categories[0].count}`);
    
    await connection.end();
    console.log('🎉 Database is ready for the application!');
    
  } catch (error) {
    console.error('❌ Database connection/test failed:');
    console.error('Error:', error.message);
  }
}

testSpecificDB();
