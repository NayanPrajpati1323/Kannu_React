# 🏢 Kanakku - Inventory & Sales Management System

A modern, comprehensive inventory and sales management system built with React, TypeScript, Node.js, and MySQL. Perfect for businesses looking to streamline their operations with a beautiful, feature-rich dashboard.

![Dashboard Preview](https://cdn.builder.io/api/v1/image/assets%2Fb2b14d9d9af0432b82f77eecc1168878%2F70ab8ec7fe6f4b6e831e1acfff8423c4?format=webp&width=800)

## ✨ Features

### 📊 **Dashboard Analytics**
- Real-time sales analytics and revenue tracking
- Customer insights and outstanding payments
- Invoice statistics and performance metrics
- Interactive charts and visualizations
- Recent transactions monitoring

### 👥 **Customer Management**
- Complete customer database
- Contact information and company details
- Outstanding payment tracking
- Customer history and analytics

### 📦 **Inventory Management**
- Product catalog with categories
- Stock level monitoring
- Low stock alerts
- Inventory transaction history
- Barcode support

### 🧾 **Invoice & Quotation System**
- Professional invoice generation
- Quotation management
- Multiple payment methods
- Invoice templates
- Automatic calculations (tax, discounts)

### 🎨 **Modern UI/UX**
- Beautiful, responsive design
- Dark/Light theme support
- Mobile-friendly interface
- Intuitive navigation
- Multi-language support (UK, ES, FR)

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MySQL (v8.0+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd kanakku-inventory-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup MySQL database**
   ```sql
   CREATE DATABASE kanakku_inventory;
   CREATE USER 'kanakku_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON kanakku_inventory.* TO 'kanakku_user'@'localhost';
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

5. **Start the application**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: `http://localhost:8080`
   - API: `http://localhost:8080/api`

## 📖 Detailed Setup Guide

For complete setup instructions, troubleshooting, and advanced configuration, see our [**📋 PROJECT_SETUP_GUIDE.md**](./PROJECT_SETUP_GUIDE.md)

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **Recharts** - Beautiful charts and graphs
- **Lucide React** - Modern icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL2** - MySQL database driver
- **TypeScript** - Type-safe backend development

### Database
- **MySQL 8.0+** - Reliable relational database
- Automatic table creation and seeding
- Optimized queries with indexing
- Foreign key relationships

## 📁 Project Structure

```
kanakku-inventory-system/
├── client/                 # React frontend
│   ├── components/        # UI components
│   ├── pages/            # Application pages
│   ├── lib/              # Utilities
│   └── hooks/            # Custom hooks
├── server/                # Node.js backend
│   ├── config/           # Database config
│   ├── models/           # Data models
│   ├── services/         # Business logic
│   └── routes/           # API routes
├── .env.example          # Environment template
└── PROJECT_SETUP_GUIDE.md # Detailed setup guide
```

## 🔌 API Endpoints

### Core Endpoints
- `GET /api/dashboard/stats` - Dashboard analytics
- `GET /api/customers` - Customer management
- `GET /api/products` - Product catalog
- `GET /api/invoices` - Invoice system
- `GET /api/health` - Health check

All endpoints support pagination, filtering, and search functionality.

## 🎯 Key Features Implemented

✅ **MySQL Database Integration** - Complete database setup with all tables  
✅ **Modern Dashboard** - Matches the provided design exactly  
✅ **Responsive Design** - Works on all device sizes  
✅ **Logo Integration** - Kanakku logo with proper sizing and alignment  
✅ **Real-time Analytics** - Live data visualization  
✅ **Customer Management** - Full CRUD operations  
✅ **Inventory Tracking** - Stock management system  
✅ **Invoice Generation** - Professional invoice creation  
✅ **Multi-language Support** - UK, ES, FR language flags  

## 🚦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server
npm run typecheck   # Check TypeScript types
npm run format.fix  # Format code with Prettier
```

## 🌟 Screenshots

### Dashboard Overview
The main dashboard provides a comprehensive view of your business metrics with:
- Sales analytics and revenue tracking
- Customer insights and outstanding payments
- Recent transactions and invoice status
- Interactive charts and real-time data

### Customer Management
- Complete customer database with contact details
- Outstanding payment tracking
- Customer transaction history
- Easy search and filtering capabilities

### Inventory System
- Product catalog with categories and stock levels
- Inventory transaction tracking
- Low stock alerts and notifications
- Barcode support for easy management

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you need help setting up or using the application:

1. Check the [Setup Guide](./PROJECT_SETUP_GUIDE.md)
2. Review the troubleshooting section
3. Open an issue on GitHub
4. Contact the development team

## 🎉 Getting Started

Ready to transform your business operations? Follow our [detailed setup guide](./PROJECT_SETUP_GUIDE.md) and get started in minutes!

---

**Built with ❤️ for modern businesses**
# Kannu_React
