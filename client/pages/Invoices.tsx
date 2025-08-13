import { useState, useEffect } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FileText, 
  DollarSign,
  Calendar,
  Loader2
} from "lucide-react"
import { DataTable } from "@/components/data-table"
import { generateInvoiceData } from "@/lib/import-export"
import { useNavigate } from "react-router-dom"

interface Invoice {
  id: number
  number: string
  customer_id: number
  customer_name: string
  customer_email: string
  date: string
  due_date: string
  subtotal: number
  tax_rate: number
  tax_amount: number
  discount_rate: number
  discount_amount: number
  total: number
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
  notes?: string
  created_at: string
  updated_at: string
}


export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // Fetch invoices from API
  const fetchInvoices = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/invoices?limit=100')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success && data.data) {
        // Transform database data to match UI expectations
        const transformedInvoices = data.data.map((invoice: any) => ({
          ...invoice,
          date: invoice.date || new Date().toISOString().split('T')[0],
          due_date: invoice.due_date || new Date().toISOString().split('T')[0],
          subtotal: Number(invoice.subtotal) || 0,
          tax_amount: Number(invoice.tax_amount) || 0,
          discount_amount: Number(invoice.discount_amount) || 0,
          total: Number(invoice.total) || 0,
          tax_rate: Number(invoice.tax_rate) || 0,
          discount_rate: Number(invoice.discount_rate) || 0,
          customer_name: invoice.customer_name || 'Unknown Customer',
          customer_email: invoice.customer_email || ''
        }))
        setInvoices(transformedInvoices)
        console.log(`✅ Loaded ${transformedInvoices.length} invoices`)
      } else {
        console.error('API returned unsuccessful response:', data)
        setInvoices([])
      }
    } catch (error) {
      console.error('❌ Error fetching invoices:', error)
      setInvoices([])
      // Don't alert on every error, just log it
    } finally {
      setIsLoading(false)
    }
  }

  // Load data on component mount
  useEffect(() => {
    fetchInvoices()
  }, [])

  // Calculate stats from actual data
  const stats = {
    totalInvoices: invoices.length,
    totalAmount: invoices.reduce((sum, inv) => sum + inv.total, 0),
    paidAmount: invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0),
    pendingAmount: invoices.filter(inv => inv.status !== 'paid' && inv.status !== 'cancelled').reduce((sum, inv) => sum + inv.total, 0),
  }

  const getStatusColor = (status: string) => {
    const colors = {
      draft: "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400",
      sent: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
      paid: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
      overdue: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
      cancelled: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
    }
    return colors[status as keyof typeof colors] || colors.draft
  }

  const columns: ColumnDef<Invoice>[] = [
    {
      accessorKey: "number",
      header: "Invoice",
      cell: ({ row }) => (
        <span className="font-mono text-sm font-medium">{row.getValue("number")}</span>
      ),
    },
    {
      accessorKey: "customer_name",
      header: "Customer",
      cell: ({ row }) => {
        const invoice = row.original
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{invoice.customer_name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <span className="font-medium">{invoice.customer_name}</span>
              <div className="text-sm text-muted-foreground">{invoice.customer_email}</div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <span>{new Date(row.getValue("date")).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: "total",
      header: "Amount",
      cell: ({ row }) => (
        <span className="font-semibold">${(row.getValue("total") as number).toFixed(2)}</span>
      ),
    },
    {
      accessorKey: "due_date",
      header: "Due Date",
      cell: ({ row }) => (
        <span>{new Date(row.getValue("due_date")).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const invoice = row.original
        return (
          <Badge variant="secondary" className={getStatusColor(invoice.status)}>
            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
          </Badge>
        )
      },
    },
  ]

  const handleAddInvoice = () => {
    navigate("/invoices/create")
  }

  const handleEditInvoice = (invoice: Invoice) => {
    navigate(`/invoices/edit/${invoice.id}`)
  }

  const handleDeleteInvoice = async (invoice: Invoice) => {
    if (!confirm(`Are you sure you want to delete invoice ${invoice.number}?`)) {
      return
    }

    try {
      const response = await fetch(`/api/invoices/${invoice.id}`, {
        method: 'DELETE'
      })

      const data = await response.json()
      if (data.success) {
        alert(`Invoice ${invoice.number} has been deleted successfully`)
        fetchInvoices() // Refresh the list
      } else {
        alert(data.message || 'Failed to delete invoice')
      }
    } catch (error) {
      console.error('Error deleting invoice:', error)
      alert('Failed to delete invoice')
    }
  }

  const handleViewInvoice = (invoice: Invoice) => {
    navigate(`/invoices/details/${invoice.id}`)
  }



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-foreground">Invoices</h1>
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Avatar key={i} className="h-8 w-8 border-2 border-background">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>{i}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
        <p className="text-sm text-muted-foreground sm:text-right">
          Track and manage all your invoice transactions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Invoices
            </CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalInvoices}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Amount
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalAmount.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Paid Amount
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.paidAmount.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Amount
            </CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.pendingAmount.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading invoices...</span>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={invoices}
          title="Invoice Management"
          description="Track and manage all your invoice transactions"
          searchPlaceholder="Search invoices..."
          onAdd={handleAddInvoice}
          onEdit={handleEditInvoice}
          onDelete={handleDeleteInvoice}
          onView={handleViewInvoice}
          exportConfig={{
            filename: "invoices-export",
            generateExportData: generateInvoiceData
          }}
        />
      )}
    </div>
  )
}
