// Simple test script to verify all API endpoints are working
const BASE_URL = 'http://localhost:3000/api';

const testEndpoints = [
  { name: 'Health Check', url: '/health' },
  { name: 'Customers', url: '/customers' },
  { name: 'Invoices', url: '/invoices' },
  { name: 'Quotations', url: '/quotations' },
  { name: 'Categories', url: '/categories' },
  { name: 'Products', url: '/products' },
  { name: 'Units', url: '/units' },
  { name: 'Dashboard Stats', url: '/dashboard/stats' }
];

async function testAPI() {
  console.log('🧪 Testing API Endpoints...\n');
  
  for (const endpoint of testEndpoints) {
    try {
      const response = await fetch(BASE_URL + endpoint.url);
      const data = await response.json();
      
      if (response.ok && data.success) {
        const dataCount = data.data ? (Array.isArray(data.data) ? data.data.length : 'object') : 0;
        console.log(`✅ ${endpoint.name}: OK (${dataCount} records)`);
      } else {
        console.log(`❌ ${endpoint.name}: FAILED - ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.log(`❌ ${endpoint.name}: CONNECTION ERROR - ${error.message}`);
    }
  }
  
  console.log('\n🏁 API Test Complete!');
}

// Run the test
testAPI();
