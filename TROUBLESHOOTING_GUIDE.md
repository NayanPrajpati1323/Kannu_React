# Troubleshooting Guide: Data Not Displaying

## 🔍 **Issue Diagnosis**

Based on your screenshots showing "No results" in all pages (Customers, Invoices, Quotations), here are the most likely causes and solutions:

## 🛠️ **Step-by-Step Fix Process**

### **Step 1: Start the Server Properly**

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start the server with testing:**
   ```bash
   node start-and-test.js
   ```

3. **Or start manually:**
   ```bash
   node dist/server/node-build.mjs
   ```

4. **Verify server is running:** You should see:
   ```
   🚀 Fusion Starter server running on port 3000
   📱 Frontend: http://localhost:3000
   🔧 API: http://localhost:3000/api
   ✅ Database initialized successfully
   ✅ Sample data seeded successfully
   ```

### **Step 2: Test API Endpoints**

Run the verification script:
```bash
node verify-server-data.js
```

Expected output:
```
✅ http://localhost:3000/api/health - Status: 200 | Records: 0
✅ http://localhost:3000/api/customers - Status: 200 | Records: 5
✅ http://localhost:3000/api/invoices - Status: 200 | Records: 4  
✅ http://localhost:3000/api/quotations - Status: 200 | Records: 5
✅ http://localhost:3000/api/products - Status: 200 | Records: 5
✅ http://localhost:3000/api/categories - Status: 200 | Records: 4
✅ http://localhost:3000/api/units - Status: 200 | Records: 4
```

### **Step 3: Check Browser Console**

1. Open your browser to `http://localhost:3000`
2. Open Developer Tools (F12)
3. Go to the Console tab
4. Navigate to the Customers page
5. Look for these logs:

**✅ Success logs:**
```
🔄 Fetching customers...
📡 Response status: 200
📊 API Response: {success: true, data: [...]}
✅ Loaded 5 customers
```

**❌ Error logs:**
```
❌ Error fetching customers: TypeError: Failed to fetch
🌐 Server connection failed - make sure the server is running on port 3000
```

### **Step 4: Database Issues**

If APIs return 0 records, the database might not be seeded:

1. **Delete existing database files** (if using SQLite):
   ```bash
   rm -f *.db *.sqlite*
   ```

2. **Restart server** to recreate and seed database:
   ```bash
   node dist/server/node-build.mjs
   ```

3. **Check for database errors** in server logs

## 🔧 **Common Issues & Solutions**

### **Issue 1: Server Not Running**
**Symptoms:** 
- "Failed to fetch" errors in console
- Connection refused errors

**Solution:**
1. Ensure server is running: `node dist/server/node-build.mjs`
2. Check port 3000 is not in use by another process
3. Verify no firewall blocking port 3000

### **Issue 2: Database Not Seeded**
**Symptoms:**
- API returns `{"success": true, "data": []}`
- 0 records for all endpoints

**Solution:**
1. Check server logs for database seeding messages
2. Verify sample data insertion in `DatabaseService.seedSampleData()`
3. Restart server to re-seed data

### **Issue 3: CORS Issues**
**Symptoms:**
- CORS errors in browser console
- API calls blocked

**Solution:**
1. Verify CORS is enabled in server config
2. Check if frontend and backend are on same port

### **Issue 4: API Endpoint Routes**
**Symptoms:**
- 404 errors for API calls
- Routes not found

**Solution:**
1. Verify all routes are properly registered in `server/index.ts`
2. Check endpoint URLs match exactly

### **Issue 5: Frontend API Integration**
**Symptoms:**
- No console logs
- No API calls being made

**Solution:**
1. Verify `useEffect` is triggering data fetching
2. Check if `fetchData` functions are properly called
3. Ensure component is properly mounted

## 🧪 **Testing Commands**

### **Test Individual Endpoints:**
```bash
# Test customers API
curl http://localhost:3000/api/customers

# Test invoices API  
curl http://localhost:3000/api/invoices

# Test quotations API
curl http://localhost:3000/api/quotations
```

### **Test Database Seeding:**
```bash
# Check if server seeds data on startup
node dist/server/node-build.mjs | grep "Sample data seeded"
```

### **Test Frontend Integration:**
1. Open browser to `http://localhost:3000`
2. Navigate to each page (Customers, Invoices, Quotations)
3. Check console for API logs
4. Verify data appears in tables

## 📊 **Expected Data Structure**

### **Customers API Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "company": "Tech Corp",
      "city": "San Francisco",
      "country": "USA"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 100,
    "total": 5,
    "totalPages": 1
  }
}
```

### **Invoices API Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "number": "INV-001",
      "customer_id": 1,
      "customer_name": "John Doe",
      "customer_email": "john@example.com",
      "total": 1298.98,
      "status": "paid"
    }
  ]
}
```

## 🎯 **Quick Fix Checklist**

- [ ] Server is running and accessible
- [ ] Database is properly seeded with sample data
- [ ] API endpoints return data (test with curl/browser)
- [ ] Frontend console shows successful API calls
- [ ] No CORS or network errors
- [ ] Components are properly fetching data on mount
- [ ] Data transformation is working correctly

## 🆘 **If Still Not Working**

1. **Restart everything:**
   ```bash
   # Stop any running servers
   # Delete node_modules if needed: rm -rf node_modules
   npm install
   npm run build
   node dist/server/node-build.mjs
   ```

2. **Check logs systematically:**
   - Server startup logs
   - Database seeding logs  
   - API request/response logs
   - Browser console logs
   - Network tab in browser dev tools

3. **Verify file integrity:**
   - Ensure all files are properly saved
   - Check for any TypeScript/build errors
   - Verify imports and exports are correct

The application should work correctly with proper server startup and database seeding. The enhanced error handling will help identify specific issues in the browser console.
