'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Calendar, User, Package, DollarSign, Truck, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

import Button from '@/components/ui/button';
import { ROUTE } from '@/constants/route';

interface OrderItem {
  product: {
    name: string;
    price: number;
    image?: string;
  };
  quantity: number;
  subtotal: number;
}

interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

interface Order {
  id: string;
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
  trackingNumber?: string;
  estimatedDelivery?: Date;
}

// Mock order data - in a real app, this would come from an API
const mockOrder: Order = {
  id: 'ORD-001',
  orderNumber: '#ABC123',
  customer: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    }
  },
  items: [
    {
      product: {
        name: 'Whey Protein Isolate',
        price: 49.99,
        image: '/images/products/protein-1.jpg'
      },
      quantity: 2,
      subtotal: 99.98
    },
    {
      product: {
        name: 'Creatine Monohydrate',
        price: 24.99,
        image: '/images/products/protein-2.jpg'
      },
      quantity: 1,
      subtotal: 24.99
    }
  ],
  subtotal: 124.97,
  tax: 12.50,
  shipping: 9.99,
  total: 147.46,
  status: 'pending',
  createdAt: new Date('2024-01-15T10:30:00'),
  updatedAt: new Date('2024-01-15T10:30:00'),
  notes: 'Customer requested expedited shipping if possible.',
  estimatedDelivery: new Date('2024-01-20')
};

const statusConfig = {
  pending: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    icon: Clock,
    description: 'Order received, waiting for processing'
  },
  processing: {
    label: 'Processing',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    icon: AlertCircle,
    description: 'Order is being prepared for shipping'
  },
  shipped: {
    label: 'Shipped',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    icon: Truck,
    description: 'Order has been shipped'
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    icon: CheckCircle,
    description: 'Order has been delivered'
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    icon: XCircle,
    description: 'Order has been cancelled'
  }
};

function OrderDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusUpdate, setStatusUpdate] = useState<Order['status']>('pending');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch order details
    const fetchOrder = async () => {
      setLoading(true);
      // In a real app, you would fetch the order based on params.slug
      // const response = await fetch(`/api/orders/${params.slug}`);
      // const orderData = await response.json();

      // Simulate API delay
      setTimeout(() => {
        setOrder(mockOrder);
        setStatusUpdate(mockOrder.status);
        setLoading(false);
      }, 500);
    };

    if (params.slug) {
      fetchOrder();
    }
  }, [params.slug]);

  const handleStatusUpdate = async () => {
    if (!order || statusUpdate === order.status) return;

    setIsUpdating(true);

    // Simulate API call to update status
    // await fetch(`/api/orders/${order.id}/status`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ status: statusUpdate })
    // });

    // Simulate API delay
    setTimeout(() => {
      setOrder(prev => prev ? { ...prev, status: statusUpdate, updatedAt: new Date() } : null);
      setIsUpdating(false);
    }, 1000);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="py-40 px-safe lg:py-32 md:py-24">
        <div className="container">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading order details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-40 px-safe lg:py-32 md:py-24">
        <div className="container">
          <div className="text-center">
            <h1 className="fs-32 font-bold text-foreground mb-4 lg:fs-28 md:fs-24">Order Not Found</h1>
            <p className="text-muted-foreground mb-6">The order you're looking for doesn't exist.</p>
            <Button onClick={() => router.push(ROUTE.admin)}>
              Back to Admin
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentStatus = statusConfig[order.status];

  return (
    <div className="py-40 px-safe lg:py-32 md:py-24">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <Button
            theme="ghost"
            onClick={() => router.push(ROUTE.admin)}
            className="mb-4 flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Admin
          </Button>

          <div className="flex items-start justify-between md:flex-col md:gap-4">
            <div>
              <h1 className="fs-32 font-bold text-foreground mb-2 lg:fs-28 md:fs-24">
                Order {order.orderNumber}
              </h1>
              <p className="text-muted-foreground">
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${currentStatus.color}`}>
                <currentStatus.icon className="h-4 w-4" />
                {currentStatus.label}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 lg:grid-cols-1">
          {/* Main Content */}
          <div className="col-span-2 space-y-6 lg:col-span-1">
            {/* Order Summary */}
            <div className="bg-card border border-border rounded-xl p-6 lg:p-5 md:p-4">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2 lg:text-lg md:text-base">
                <Package className="h-5 w-5" />
                Order Summary
              </h2>

              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg lg:p-3 md:p-3">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center lg:w-12 lg:h-12 md:w-10 md:h-10">
                      <Package className="h-6 w-6 text-muted-foreground lg:h-5 lg:w-5 md:h-4 md:w-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground lg:text-sm md:text-sm">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground lg:text-xs md:text-xs">
                        Qty: {item.quantity} × {formatCurrency(item.product.price)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground lg:text-sm md:text-sm">{formatCurrency(item.subtotal)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm lg:text-xs md:text-xs">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>{formatCurrency(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm lg:text-xs md:text-xs">
                    <span className="text-muted-foreground">Tax:</span>
                    <span>{formatCurrency(order.tax)}</span>
                  </div>
                  <div className="flex justify-between text-sm lg:text-xs md:text-xs">
                    <span className="text-muted-foreground">Shipping:</span>
                    <span>{formatCurrency(order.shipping)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border lg:text-base md:text-base">
                    <span>Total:</span>
                    <span>{formatCurrency(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Update */}
            <div className="bg-card border border-border rounded-xl p-6 lg:p-5 md:p-4">
              <h2 className="text-xl font-semibold text-foreground mb-4 lg:text-lg md:text-base">Update Order Status</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 lg:text-xs md:text-xs">
                    Current Status: <span className="font-normal text-muted-foreground">{currentStatus.description}</span>
                  </label>
                  <select
                    value={statusUpdate}
                    onChange={(e) => setStatusUpdate(e.target.value as Order['status'])}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {Object.entries(statusConfig).map(([value, config]) => (
                      <option key={value} value={value}>
                        {config.label}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  onClick={handleStatusUpdate}
                  disabled={statusUpdate === order.status || isUpdating}
                  className="w-full"
                >
                  {isUpdating ? 'Updating...' : 'Update Status'}
                </Button>
              </div>
            </div>

            {/* Notes */}
            {order.notes && (
              <div className="bg-card border border-border rounded-xl p-6 lg:p-5 md:p-4">
                <h2 className="text-xl font-semibold text-foreground mb-4 lg:text-lg md:text-base">Order Notes</h2>
                <p className="text-muted-foreground lg:text-sm md:text-sm">{order.notes}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Details */}
            <div className="bg-card border border-border rounded-xl p-6 lg:p-5 md:p-4">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2 lg:text-lg md:text-base">
                <User className="h-5 w-5" />
                Customer Details
              </h2>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground lg:text-xs md:text-xs">Name</p>
                  <p className="font-medium text-foreground lg:text-sm md:text-sm">
                    {order.customer.firstName} {order.customer.lastName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground lg:text-xs md:text-xs">Email</p>
                  <p className="font-medium text-foreground lg:text-sm md:text-sm">{order.customer.email}</p>
                </div>

                {order.customer.phone && (
                  <div>
                    <p className="text-sm text-muted-foreground lg:text-xs md:text-xs">Phone</p>
                    <p className="font-medium text-foreground lg:text-sm md:text-sm">{order.customer.phone}</p>
                  </div>
                )}

                {order.customer.address && (
                  <div>
                    <p className="text-sm text-muted-foreground lg:text-xs md:text-xs">Address</p>
                    <div className="text-foreground lg:text-sm md:text-sm">
                      <p>{order.customer.address.street}</p>
                      <p>{order.customer.address.city}, {order.customer.address.state} {order.customer.address.zipCode}</p>
                      <p>{order.customer.address.country}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Information */}
            <div className="bg-card border border-border rounded-xl p-6 lg:p-5 md:p-4">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2 lg:text-lg md:text-base">
                <Calendar className="h-5 w-5" />
                Order Information
              </h2>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground lg:text-xs md:text-xs">Order ID</p>
                  <p className="font-medium text-foreground lg:text-sm md:text-sm">{order.id}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground lg:text-xs md:text-xs">Order Number</p>
                  <p className="font-medium text-foreground lg:text-sm md:text-sm">{order.orderNumber}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground lg:text-xs md:text-xs">Created</p>
                  <p className="font-medium text-foreground lg:text-sm md:text-sm">{formatDate(order.createdAt)}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground lg:text-xs md:text-xs">Last Updated</p>
                  <p className="font-medium text-foreground lg:text-sm md:text-sm">{formatDate(order.updatedAt)}</p>
                </div>

                {order.estimatedDelivery && (
                  <div>
                    <p className="text-sm text-muted-foreground lg:text-xs md:text-xs">Estimated Delivery</p>
                    <p className="font-medium text-foreground lg:text-sm md:text-sm">{formatDate(order.estimatedDelivery)}</p>
                  </div>
                )}

                {order.trackingNumber && (
                  <div>
                    <p className="text-sm text-muted-foreground lg:text-xs md:text-xs">Tracking Number</p>
                    <p className="font-medium text-foreground lg:text-sm md:text-sm">{order.trackingNumber}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
