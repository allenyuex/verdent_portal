'use client';

import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { mockCategories } from '@/lib/mock-data';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { Category } from '@/types';

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">商品分类</h1>
            <p className="mt-1 text-sm text-neutral-500">管理商品分类信息</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            添加分类
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                <Input
                  placeholder="搜索分类名称或描述..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>分类</TableHead>
                  <TableHead>描述</TableHead>
                  <TableHead>商品数量</TableHead>
                  <TableHead>创建时间</TableHead>
                  <TableHead>更新时间</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map(category => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
                          <Tag className="h-5 w-5 text-neutral-600" />
                        </div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-neutral-600">
                      {category.description}
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{category.productCount}</span>
                    </TableCell>
                    <TableCell className="text-neutral-600">
                      {new Date(category.createdAt).toLocaleDateString('zh-CN')}
                    </TableCell>
                    <TableCell className="text-neutral-600">
                      {new Date(category.updatedAt).toLocaleDateString('zh-CN')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          disabled={category.productCount > 0}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-semibold">{categories.length}</div>
              <p className="mt-1 text-sm text-neutral-500">总分类数</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-semibold">
                {categories.reduce((sum, c) => sum + c.productCount, 0)}
              </div>
              <p className="mt-1 text-sm text-neutral-500">关联商品数</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-semibold">
                {categories.filter(c => c.productCount === 0).length}
              </div>
              <p className="mt-1 text-sm text-neutral-500">空分类数</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
