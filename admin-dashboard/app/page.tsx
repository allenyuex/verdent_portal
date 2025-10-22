'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ShoppingCart, Package, TrendingUp } from 'lucide-react';
import { mockUsers, mockOrders, mockProducts } from '@/lib/mock-data';

export default function Home() {
  const stats = [
    {
      title: '总用户数',
      value: mockUsers.length,
      icon: Users,
      description: '注册用户总数',
    },
    {
      title: '总订单数',
      value: mockOrders.length,
      icon: ShoppingCart,
      description: '所有订单',
    },
    {
      title: '商品数量',
      value: mockProducts.length,
      icon: Package,
      description: '在售商品',
    },
    {
      title: '总销售额',
      value: `¥${mockOrders.reduce((sum, o) => sum + o.amount, 0).toFixed(2)}`,
      icon: TrendingUp,
      description: '累计销售',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">仪表盘</h1>
          <p className="mt-1 text-sm text-neutral-500">欢迎回来，查看您的业务概况</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-neutral-600">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-neutral-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">{stat.value}</div>
                  <p className="mt-1 text-xs text-neutral-500">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>最近订单</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrders.slice(0, 5).map(order => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{order.productName}</div>
                      <div className="text-xs text-neutral-500">{order.userName}</div>
                    </div>
                    <div className="text-sm font-medium">¥{order.amount.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>低库存商品</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProducts
                  .filter(p => p.stock < 50)
                  .slice(0, 5)
                  .map(product => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">{product.name}</div>
                        <div className="text-xs text-neutral-500">{product.category}</div>
                      </div>
                      <div
                        className={`text-sm font-medium ${
                          product.stock === 0 ? 'text-red-600' : 'text-yellow-600'
                        }`}
                      >
                        库存: {product.stock}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
