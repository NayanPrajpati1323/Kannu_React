# Test if server is running
Write-Host "🧪 Testing server endpoints..." -ForegroundColor Cyan

$endpoints = @(
    "http://localhost:3000/api/health",
    "http://localhost:3000/api/customers", 
    "http://localhost:3000/api/invoices",
    "http://localhost:3000/api/quotations",
    "http://localhost:3000/api/products"
)

foreach ($endpoint in $endpoints) {
    try {
        Write-Host "Testing: $endpoint" -ForegroundColor Yellow
        $response = Invoke-RestMethod -Uri $endpoint -Method Get -TimeoutSec 5
        if ($response.success -eq $true) {
            $count = if ($response.data) { $response.data.Count } else { 0 }
            Write-Host "✅ SUCCESS - Records: $count" -ForegroundColor Green
        } else {
            Write-Host "❌ API returned failure" -ForegroundColor Red
        }
    }
    catch {
        Write-Host "❌ ERROR: $($_.Exception.Message)" -ForegroundColor Red
    }
    Write-Host ""
}

Write-Host "🔧 To start the server:" -ForegroundColor Cyan
Write-Host "   node dist/server/node-build.mjs" -ForegroundColor White
