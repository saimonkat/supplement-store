'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronLeft, ChevronRight, Package } from 'lucide-react';

import Button from '@/components/ui/button';
import { ROUTE } from '@/constants/route';

interface OrderItem {
  product: { name: string };
}

interface Customer {
  firstName: string;
  lastName: string;
  email: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const orders: Order[] = [
  {
    id: 'ORD-001',
    orderNumber: '#ABC123',
    customer: { firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    items: [{ product: { name: 'Whey Protein Isolate' } }],
    total: 49.99,
    status: 'pending',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'ORD-002',
    orderNumber: '#DEF456',
    customer: { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
    items: [{ product: { name: 'Creatine Monohydrate' } }],
    total: 24.99,
    status: 'processing',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14')
  },
  {
    id: 'ORD-003',
    orderNumber: '#GHI789',
    customer: { firstName: 'Mike', lastName: 'Johnson', email: 'mike@example.com' },
    items: [{ product: { name: 'Pre-Workout Energy Blend' } }],
    total: 39.99,
    status: 'shipped',
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13')
  },
  {
    id: 'ORD-004',
    orderNumber: '#JKL012',
    customer: { firstName: 'Sarah', lastName: 'Wilson', email: 'sarah@example.com' },
    items: [{ product: { name: 'Multivitamin Complex' } }],
    total: 29.99,
    status: 'delivered',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12')
  },
  {
    id: 'ORD-005',
    orderNumber: '#MNO345',
    customer: { firstName: 'David', lastName: 'Brown', email: 'david@example.com' },
    items: [{ product: { name: 'BCAA Amino Acids' } }],
    total: 34.99,
    status: 'cancelled',
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-11')
  }
];

const statusColors: Record<Order['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
};

function AdminPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Order['status'] | ''>('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortBy, setSortBy] = useState<keyof Order>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const itemsPerPage = 10;

  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    // Search filtering
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(query) ||
        order.orderNumber.toLowerCase().includes(query) ||
        order.customer.firstName.toLowerCase().includes(query) ||
        order.customer.lastName.toLowerCase().includes(query) ||
        order.customer.email.toLowerCase().includes(query) ||
        order.items.some(item => item.product.name.toLowerCase().includes(query))
      );
    }

    // Status filtering
    if (statusFilter) {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Date range filtering
    if (dateRange.start || dateRange.end) {
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.createdAt);
        const startDate = dateRange.start ? new Date(dateRange.start) : null;
        const endDate = dateRange.end ? new Date(dateRange.end) : null;

        if (startDate && endDate) {
          return orderDate >= startDate && orderDate <= endDate;
        } else if (startDate) {
          return orderDate >= startDate;
        } else if (endDate) {
          return orderDate <= endDate;
        }

        return true;
      });
    }

    // Sorting
    filtered.sort((a, b) => {
      let aValue: string | number | Date, bValue: string | number | Date;

      switch (sortBy) {
        case 'createdAt':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        case 'total':
          aValue = a.total;
          bValue = b.total;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          aValue = a[sortBy] as string | number | Date;
          bValue = b[sortBy] as string | number | Date;
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchQuery, statusFilter, dateRange, sortBy, sortDirection]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const handleSort = (field: keyof Order) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
    setDateRange({ start: '', end: '' });
    setCurrentPage(1);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="py-40 px-safe lg:py-32 md:py-24">
      <div className="container">
        <div className="mb-12">
          <h1 className="fs-48 font-bold text-foreground mb-4 lg:fs-40 md:fs-32">Admin Portal</h1>
          <p className="text-18 text-muted-foreground lg:text-16 md:text-14">Manage orders and monitor store performance</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8 lg:p-5 md:p-4">
          <div className="grid grid-cols-4 gap-6 lg:grid-cols-2 md:grid-cols-1">
            {/* Search */}
            <div className="col-span-2 lg:col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-foreground mb-2">
                Search Orders
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by order ID, customer name, or product..."
                  type="text"
                  value={searchQuery}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Status
              </label>
              <select
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(e) => setStatusFilter(e.target.value as Order['status'] | '')}
                value={statusFilter}
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  type="date"
                  value={dateRange.start}
                />
                <input
                  className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  type="date"
                  value={dateRange.end}
                />
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          {(searchQuery || statusFilter || dateRange.start || dateRange.end) && (
            <div className="mt-4 flex justify-end">
              <Button
                className="text-muted-foreground hover:text-foreground"
                onClick={clearFilters}
                size="sm"
                theme="ghost"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>

        {/* Orders Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70 lg:px-4 md:px-3" onClick={() => handleSort('orderNumber')}>
                    <div className="flex items-center gap-2">
                      Order #
                      {sortBy === 'orderNumber' && (
                        sortDirection === 'asc' ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70 lg:px-4 md:px-3" onClick={() => handleSort('createdAt')}>
                    <div className="flex items-center gap-2">
                      Date
                      {sortBy === 'createdAt' && (
                        sortDirection === 'asc' ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider lg:px-4 md:px-3">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider lg:px-4 md:px-3">
                    Products
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70 lg:px-4 md:px-3" onClick={() => handleSort('total')}>
                    <div className="flex items-center gap-2">
                      Total
                      {sortBy === 'total' && (
                        sortDirection === 'asc' ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70 lg:px-4 md:px-3" onClick={() => handleSort('status')}>
                    <div className="flex items-center gap-2">
                      Status
                      {sortBy === 'status' && (
                        sortDirection === 'asc' ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider lg:px-4 md:px-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {currentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap lg:px-4 md:px-3">
                      <div className="text-sm font-medium text-foreground">{order.orderNumber}</div>
                      <div className="text-xs text-muted-foreground">{order.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground lg:px-4 md:px-3">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap lg:px-4 md:px-3">
                      <div className="text-sm font-medium text-foreground">
                        {order.customer.firstName} {order.customer.lastName}
                      </div>
                      <div className="text-xs text-muted-foreground">{order.customer.email}</div>
                    </td>
                    <td className="px-6 py-4 lg:px-4 md:px-3">
                      <div className="text-sm text-foreground">
                        {order.items.map((item, index) => (
                          <div key={`${order.id}-item-${index}`} className="flex items-center gap-2">
                            <Package className="h-3 w-3 text-muted-foreground" />
                            {item.product.name}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground lg:px-4 md:px-3">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap lg:px-4 md:px-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[order.status]}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium lg:px-4 md:px-3">
                      <Button
                        className="flex items-center gap-2"
                        onClick={() => router.push(`${ROUTE.orders}/${order.id}`)}
                        size="sm"
                        theme="outline"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-border lg:px-4 md:px-3">
              <div className="flex items-center justify-between lg:flex-col lg:gap-4 lg:items-start">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length} results
                </div>
                <div className="flex items-center gap-2 lg:w-full lg:justify-center">
                  <Button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    size="sm"
                    theme="outline"
                  >
                    Previous
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        className="w-10 h-10 p-0"
                        onClick={() => setCurrentPage(page)}
                        size="sm"
                        theme={currentPage === page ? "primary" : "ghost"}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    size="sm"
                    theme="outline"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
