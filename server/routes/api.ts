import { Request, Response } from 'express'
import { DatabaseService } from '../services/DatabaseService'

// Dashboard routes
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const stats = await DatabaseService.getDashboardStats()
    res.json(stats)
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch dashboard stats',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

// Customer routes
export const getCustomers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const search = req.query.search as string || ''
    
    const result = await DatabaseService.getCustomers(page, limit, search)
    res.json(result)
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch customers',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const result = await DatabaseService.createCustomer(req.body)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create customer',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

// Product routes
export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const search = req.query.search as string || ''
    
    const result = await DatabaseService.getProducts(page, limit, search)
    res.json(result)
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch products',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const result = await DatabaseService.createProduct(req.body)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create product',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const result = await DatabaseService.updateProduct(id, req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update product',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const result = await DatabaseService.updateCustomer(id, req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update customer',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const result = await DatabaseService.deleteCustomer(id)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete customer',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const result = await DatabaseService.updateCategory(id, req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update category',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const result = await DatabaseService.deleteCategory(id)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete category',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const result = await DatabaseService.deleteProduct(id)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete product',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

// Category routes
export const getCategories = async (req: Request, res: Response) => {
  try {
    const result = await DatabaseService.getCategories()
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const createCategory = async (req: Request, res: Response) => {
  try {
    const result = await DatabaseService.createCategory(req.body)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create category',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

// Invoice routes
export const getInvoices = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const search = req.query.search as string || ''
    
    const result = await DatabaseService.getInvoices(page, limit, search)
    res.json(result)
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch invoices',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const { invoice, items } = req.body
    const result = await DatabaseService.createInvoice(invoice, items)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create invoice',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

// Units routes
export const getUnits = async (req: Request, res: Response) => {
  try {
    const result = await DatabaseService.getUnits()
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch units',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const createUnit = async (req: Request, res: Response) => {
  try {
    const result = await DatabaseService.createUnit(req.body)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create unit',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const updateUnit = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const result = await DatabaseService.updateUnit(id, req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update unit',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const deleteUnit = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const result = await DatabaseService.deleteUnit(id)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete unit',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

// Health check
export const healthCheck = async (req: Request, res: Response) => {
  try {
    res.json({ 
      success: true, 
      message: 'API is working',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Health check failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
