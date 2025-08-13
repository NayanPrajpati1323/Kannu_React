// Simple database connection test
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Nayan@1323',
  port: parseInt(process.env.DB_PORT || '3306'),
};

async function testConnection() {
  try {
    console.log('🔄 Testing MySQL connection...');
    console.log(`Connecting to: ${dbConfig.host}:${dbConfig.port} as ${dbConfig.user}`);
    
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ MySQL connection successful!');
    
    // Test if database exists
    const [databases] = await connection.execute('SHOW DATABASES LIKE "kanakku_inventory"');
    if (databases.length > 0) {
      console.log('✅ Database "kanakku_inventory" exists!');
      
      // Test tables
      await connection.execute('USE kanakku_inventory');
      const [tables] = await connection.execute('SHOW TABLES');
      console.log(`✅ Found ${tables.length} tables in database`);
      
      if (tables.length > 0) {
        console.log('📊 Tables found:');
        tables.forEach((table, index) => {
          console.log(`   ${index + 1}. ${Object.values(table)[0]}`);
        });
      }
    } else {
      console.log('⚠️  Database "kanakku_inventory" not found. Please run setup-database.sql first.');
    }
    
    await connection.end();
    console.log('🎉 Database test completed successfully!');
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure MySQL Server is running');
    console.log('2. Verify password is correct in .env file');
    console.log('3. Check if MySQL is listening on port 3306');
  }
}

testConnection();
