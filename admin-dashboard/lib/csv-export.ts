import { Order } from '@/types';

export const exportToCSV = (orders: Order[], filename: string = 'orders.csv') => {
  const headers = ['订单号', '用户', '商品', '金额', '状态', '配送地址', '联系电话', '备注', '创建时间', '更新时间'];
  
  const statusMap: Record<Order['status'], string> = {
    pending: '待处理',
    processing: '处理中',
    completed: '已完成',
    cancelled: '已取消',
  };

  const rows = orders.map(order => [
    order.id,
    order.userName,
    order.productName,
    order.amount.toFixed(2),
    statusMap[order.status],
    order.address || '',
    order.phone || '',
    order.note || '',
    new Date(order.createdAt).toLocaleString('zh-CN'),
    new Date(order.updatedAt).toLocaleString('zh-CN'),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
