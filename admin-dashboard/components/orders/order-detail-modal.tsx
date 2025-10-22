'use client';

import { Order } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface OrderDetailModalProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}

const statusMap: Record<Order['status'], { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  pending: { label: '待处理', variant: 'outline' },
  processing: { label: '处理中', variant: 'default' },
  completed: { label: '已完成', variant: 'secondary' },
  cancelled: { label: '已取消', variant: 'destructive' },
};

export default function OrderDetailModal({ order, open, onClose }: OrderDetailModalProps) {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>订单详情</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">订单号</p>
                <p className="mt-1 font-mono text-lg font-semibold">{order.id}</p>
              </div>
              <Badge variant={statusMap[order.status].variant}>
                {statusMap[order.status].label}
              </Badge>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-neutral-500">用户信息</p>
                <p className="mt-1 font-medium">{order.userName}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">联系电话</p>
                <p className="mt-1 font-medium">{order.phone || '-'}</p>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-neutral-500">商品信息</p>
              <p className="mt-1 font-medium">{order.productName}</p>
            </div>

            <div>
              <p className="text-sm text-neutral-500">订单金额</p>
              <p className="mt-1 text-2xl font-semibold text-neutral-900">
                ¥{order.amount.toFixed(2)}
              </p>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-neutral-500">配送地址</p>
              <p className="mt-1 font-medium">{order.address || '-'}</p>
            </div>

            {order.note && (
              <div>
                <p className="text-sm text-neutral-500">备注信息</p>
                <p className="mt-1 text-neutral-700">{order.note}</p>
              </div>
            )}

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-neutral-500">创建时间</p>
                <p className="mt-1 font-medium">
                  {new Date(order.createdAt).toLocaleString('zh-CN')}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">更新时间</p>
                <p className="mt-1 font-medium">
                  {new Date(order.updatedAt).toLocaleString('zh-CN')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
