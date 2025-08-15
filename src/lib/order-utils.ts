import { Order, OrderFilters } from '@/types/order';

export function filterOrders(orders: Order[], filters: OrderFilters): Order[] {
  return orders.filter(order => {
    // Status filter
    if (filters.status && order.status !== filters.status) {
      return false;
    }

    // Date range filter
    if (filters.dateRange) {
      const [startDate, endDate] = filters.dateRange;
      const orderDate = order.createdAt;
      if (orderDate < startDate || orderDate > endDate) {
        return false;
      }
    }

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesOrderId = order.id.toLowerCase().includes(query);
      const matchesCustomerName = `${order.customer.firstName} ${order.customer.lastName}`.toLowerCase().includes(query);
      const matchesProductName = order.items.some(item =>
        item.product.name.toLowerCase().includes(query)
      );

      if (!matchesOrderId && !matchesCustomerName && !matchesProductName) {
        return false;
      }
    }

    return true;
  });
}

export function sortOrders(orders: Order[], field: keyof Order, direction: 'asc' | 'desc' = 'desc'): Order[] {
  const sortedOrders = [...orders];

  sortedOrders.sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (field) {
      case 'createdAt':
        aValue = a.createdAt.getTime();
        bValue = b.createdAt.getTime();
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
        return 0;
    }

    if (direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return sortedOrders;
}

export function getOrdersByStatus(orders: Order[], status: string): Order[] {
  return orders.filter(order => order.status === status);
}

export function getOrdersByDateRange(orders: Order[], startDate: Date, endDate: Date): Order[] {
  return orders.filter(order => {
    const orderDate = order.createdAt;
    return orderDate >= startDate && orderDate <= endDate;
  });
}

export function calculateOrderStats(orders: Order[]) {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalOrders,
    totalRevenue,
    averageOrderValue,
    statusCounts,
  };
}
