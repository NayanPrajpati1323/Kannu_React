import { useState, useEffect } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Package,
  DollarSign,
  BarChart3,
  TrendingUp,
  Loader2,
} from "lucide-react"
import { DataTable } from "@/components/data-table"
import { generateProductData } from "@/lib/import-export"

interface Product {
  id?: number
  name: string
  sku: string
  description: string
  category_id: number
  category_name?: string
  price: number
  cost: number
  stock_quantity: number
  min_stock_level: number
  unit: string
  barcode: string
  status: "active" | "inactive"
  created_at?: string
  updated_at?: string
  type?: "Product" | "Service"
  // ...other fields if needed...
}

interface Category {
  id: number
  name: string
  description?: string
}

interface Unit {
  id: number
  name: string
  short_name: string
  description: string
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [units, setUnits] = useState<Unit[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    type: "Product",
    status: "active",
    stock_quantity: 0,
    price: 0,
    cost: 0,
    min_stock_level: 0,
    unit: "Piece",
    barcode: "",
    category_id: 0,
    name: "",
    sku: "",
    description: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/products?limit=100')
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      if (data.success && data.data) {
        setProducts(data.data)
      } else {
        setProducts([])
      }
    } catch (error) {
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      if (data.success) {
        setCategories(data.data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  // Fetch units from API
  const fetchUnits = async () => {
    try {
      const response = await fetch('/api/units')
      const data = await response.json()
      if (data.success) {
        setUnits(data.data)
      }
    } catch (error) {
      console.error('Error fetching units:', error)
    }
  }

  // Load data on component mount
  useEffect(() => {
    fetchProducts()
    fetchCategories()
    fetchUnits()
  }, [])

  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.status === "active").length,
    lowStock: products.filter(p => p.stock_quantity < 10).length,
    totalValue: products.reduce((sum, p) => sum + ((p.price || 0) * (p.stock_quantity || 0)), 0)
  }

  const columns: ColumnDef<Product>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "sku", header: "SKU" },
    { accessorKey: "description", header: "Description" },
    { accessorKey: "category_id", header: "Category", cell: ({ row }) => {
      const cat = categories.find(c => c.id === row.original.category_id)
      return cat ? cat.name : row.original.category_id
    }},
    { accessorKey: "price", header: "Price" },
    { accessorKey: "cost", header: "Cost" },
    { accessorKey: "stock_quantity", header: "Stock Qty" },
    { accessorKey: "min_stock_level", header: "Min Stock" },
    { accessorKey: "unit", header: "Unit" },
    { accessorKey: "barcode", header: "Barcode" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "created_at", header: "Created At" },
    { accessorKey: "updated_at", header: "Updated At" },
  ]

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.sku || !newProduct.category_id) {
      alert('Please fill in all required fields')
      return
    }
    try {
      setIsSubmitting(true)
      const productData = {
        ...newProduct,
        status: (newProduct.status || "active").toLowerCase(),
        price: Number(newProduct.price) || 0,
        cost: Number(newProduct.cost) || 0,
        stock_quantity: newProduct.type === "Service" ? 0 : (Number(newProduct.stock_quantity) || 0),
        min_stock_level: Number(newProduct.min_stock_level) || 0,
        unit: newProduct.unit || "Piece",
        barcode: newProduct.barcode || "",
        category_id: Number(newProduct.category_id)
      }
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      })
      const data = await response.json()
      if (data.success) {
        alert(`${newProduct.name} has been added successfully`)
        setNewProduct({
          type: "Product",
          status: "active",
          stock_quantity: 0,
          price: 0,
          cost: 0,
          min_stock_level: 0,
          unit: "Piece",
          barcode: "",
          category_id: 0,
          name: "",
          sku: "",
          description: ""
        })
        setIsAddDialogOpen(false)
        fetchProducts()
      } else {
        alert(data.message || 'Failed to create product')
      }
    } catch (error) {
      alert('Failed to create product')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setNewProduct({
      ...product,
      status: product.status,
      type: product.type || "Product"
    })
    setIsAddDialogOpen(true)
  }

  const handleUpdateProduct = async () => {
    if (!editingProduct || !newProduct.name || !newProduct.sku || !newProduct.category_id) {
      alert('Please fill in all required fields')
      return
    }
    try {
      setIsSubmitting(true)
      const productData = {
        ...newProduct,
        status: (newProduct.status || "active").toLowerCase(),
        price: Number(newProduct.price) || 0,
        cost: Number(newProduct.cost) || 0,
        stock_quantity: newProduct.type === "Service" ? 0 : (Number(newProduct.stock_quantity) || 0),
        min_stock_level: Number(newProduct.min_stock_level) || 0,
        unit: newProduct.unit || "Piece",
        barcode: newProduct.barcode || "",
        category_id: Number(newProduct.category_id)
      }
      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      })
      const data = await response.json()
      if (data.success) {
        alert(`${newProduct.name} has been updated successfully`)
        setEditingProduct(null)
        setNewProduct({
          type: "Product",
          status: "active",
          stock_quantity: 0,
          price: 0,
          cost: 0,
          min_stock_level: 0,
          unit: "Piece",
          barcode: "",
          category_id: 0,
          name: "",
          sku: "",
          description: ""
        })
        setIsAddDialogOpen(false)
        fetchProducts()
      } else {
        alert(data.message || 'Failed to update product')
      }
    } catch (error) {
      alert('Failed to update product')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteProduct = async (product: Product) => {
    if (!confirm(`Are you sure you want to delete ${product.name}?`)) return
    try {
      const response = await fetch(`/api/products/${product.id}`, { method: 'DELETE' })
      const data = await response.json()
      if (data.success) {
        alert(`${product.name} has been deleted successfully`)
        fetchProducts()
      } else {
        alert(data.message || 'Failed to delete product')
      }
    } catch (error) {
      alert('Failed to delete product')
    }
  }

  const handleViewProduct = (product: Product) => {
    alert(`Viewing details for ${product.name}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Products & Services</h1>
        <p className="text-muted-foreground">Manage your inventory and service catalog</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Products
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Low Stock Items
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.lowStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Inventory Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalValue.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading products...</span>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={products}
          title="Products & Services"
          description="Manage your inventory and service catalog"
          searchPlaceholder="Search products..."
          onAdd={() => {
            setEditingProduct(null)
            setNewProduct({
              type: "Product",
              status: "active",
              stock_quantity: 0,
              price: 0,
              cost: 0,
              min_stock_level: 0,
              unit: "Piece",
              barcode: "",
              category_id: 0,
              name: "",
              sku: "",
              description: ""
            })
            setIsAddDialogOpen(true)
          }}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          onView={handleViewProduct}
          exportConfig={{
            filename: "products-export",
            generateExportData: generateProductData
          }}
        />
      )}

      {/* Add/Edit Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>
              {editingProduct ? "Update the product information" : "Add a new product or service to your inventory"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={newProduct.type} onValueChange={(value) => setNewProduct(prev => ({ ...prev, type: value as "Product" | "Service" }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Service">Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={newProduct.status} onValueChange={(value) => setNewProduct(prev => ({ ...prev, status: value as "active" | "inactive" }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={newProduct.name || ""}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter product name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={newProduct.sku || ""}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, sku: e.target.value }))}
                  placeholder="Enter SKU"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category_id">Category</Label>
                <Select value={String(newProduct.category_id || "")} onValueChange={(value) => setNewProduct(prev => ({ ...prev, category_id: Number(value) }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={String(category.id)}>{category.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Select value={newProduct.unit} onValueChange={(value) => setNewProduct(prev => ({ ...prev, unit: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map(unit => (
                      <SelectItem key={unit.id} value={unit.short_name}>{unit.name} ({unit.short_name})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Selling Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={newProduct.price || ""}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">Purchase Price</Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  value={newProduct.cost || ""}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, cost: parseFloat(e.target.value) || 0 }))}
                  placeholder="0.00"
                />
              </div>
              {newProduct.type !== "Service" && (
                <div className="space-y-2">
                  <Label htmlFor="stock_quantity">Stock Quantity</Label>
                  <Input
                    id="stock_quantity"
                    type="number"
                    value={newProduct.stock_quantity || ""}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, stock_quantity: parseInt(e.target.value) || 0 }))}
                    placeholder="0"
                  />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min_stock_level">Min Stock Level</Label>
                <Input
                  id="min_stock_level"
                  type="number"
                  value={newProduct.min_stock_level || ""}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, min_stock_level: parseInt(e.target.value) || 0 }))}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="barcode">Barcode</Label>
                <Input
                  id="barcode"
                  value={newProduct.barcode || ""}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, barcode: e.target.value }))}
                  placeholder="Enter barcode"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newProduct.description || ""}
                onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter product description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button
              onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
              className="w-full sm:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingProduct ? "Update Product" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
