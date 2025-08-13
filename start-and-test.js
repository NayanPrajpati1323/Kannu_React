const { spawn } = require('child_process');
const http = require('http');

async function waitForServer(port = 3000, timeout = 30000) {
  const start = Date.now();
  
  return new Promise((resolve, reject) => {
    const check = () => {
      const req = http.get(`http://localhost:${port}/api/health`, (res) => {
        if (res.statusCode === 200) {
          resolve();
        } else {
          setTimeout(check, 1000);
        }
      });
      
      req.on('error', () => {
        if (Date.now() - start > timeout) {
          reject(new Error('Server startup timeout'));
        } else {
          setTimeout(check, 1000);
        }
      });
    };
    
    check();
  });
}

async function testEndpoint(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const count = parsed.data ? (Array.isArray(parsed.data) ? parsed.data.length : 1) : 0;
          resolve({ 
            url, 
            status: res.statusCode, 
            success: parsed.success,
            count: count
          });
        } catch (e) {
          resolve({ url, status: res.statusCode, success: false, error: 'Parse error' });
        }
      });
    });
    
    req.on('error', (err) => {
      resolve({ url, status: 0, success: false, error: err.message });
    });
  });
}

async function main() {
  console.log('🚀 Starting Orbit Nest Application...\n');
  
  // Start the server
  console.log('📱 Starting server...');
  const server = spawn('node', ['dist/server/node-build.mjs'], {
    stdio: 'pipe'
  });
  
  server.stdout.on('data', (data) => {
    console.log(`Server: ${data.toString().trim()}`);
  });
  
  server.stderr.on('data', (data) => {
    console.error(`Server Error: ${data.toString().trim()}`);
  });
  
  try {
    // Wait for server to start
    console.log('⏳ Waiting for server to start...');
    await waitForServer();
    console.log('✅ Server is running!\n');
    
    // Test all endpoints
    const endpoints = [
      'http://localhost:3000/api/health',
      'http://localhost:3000/api/customers',
      'http://localhost:3000/api/invoices', 
      'http://localhost:3000/api/quotations',
      'http://localhost:3000/api/products',
      'http://localhost:3000/api/categories',
      'http://localhost:3000/api/units'
    ];
    
    console.log('🧪 Testing API endpoints...\n');
    
    for (const endpoint of endpoints) {
      const result = await testEndpoint(endpoint);
      
      if (result.success && result.status === 200) {
        console.log(`✅ ${endpoint.replace('http://localhost:3000', '')} - ${result.count} records`);
      } else {
        console.log(`❌ ${endpoint.replace('http://localhost:3000', '')} - ${result.error || 'Failed'}`);
      }
    }
    
    console.log('\n🎉 Application is ready!');
    console.log('📱 Frontend: http://localhost:3000');
    console.log('🔧 API: http://localhost:3000/api');
    console.log('\n💡 Open your browser and navigate to http://localhost:3000');
    console.log('📊 Check the browser console for detailed API logs');
    console.log('\n⏹️  Press Ctrl+C to stop the server');
    
    // Keep the process running
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down...');
      server.kill();
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    server.kill();
    process.exit(1);
  }
}

main().catch(console.error);
