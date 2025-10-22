# Admin Dashboard

一个现代化的后台管理系统，使用 Next.js、Tailwind CSS 和 shadcn/ui 构建。

## 技术栈

- **框架**: Next.js 16 (App Router)
- **样式**: Tailwind CSS
- **组件库**: shadcn/ui
- **图标**: Lucide React
- **语言**: TypeScript

## 功能特性

### 1. 布局设计
- **左右布局**: 左侧侧边栏 + 右侧内容区
- **侧边栏**: 包含 Logo、二级菜单、登录区域
- **顶部 Header**: 面包屑导航 + 通知图标
- **响应式设计**: 适配不同屏幕尺寸

### 2. 核心功能
- **登录功能**: 邮箱 + 验证码登录（测试验证码: 123456）
- **用户管理**: 用户列表、用户资料编辑
- **订单管理**: 订单列表、状态筛选、订单统计
- **商品管理**: 商品列表、库存管理、上下架

### 3. 页面路由
- `/` - 仪表盘（首页）
- `/users` - 用户列表
- `/users/profile` - 用户资料
- `/orders` - 订单列表
- `/products` - 商品列表

## 快速开始

### 安装依赖

```bash
npm install
```

### 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
admin-dashboard/
├── app/                    # Next.js App Router 页面
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页（仪表盘）
│   ├── users/             # 用户管理页面
│   ├── orders/            # 订单管理页面
│   └── products/          # 商品管理页面
├── components/            # React 组件
│   ├── layout/           # 布局组件
│   │   ├── dashboard-layout.tsx  # 主布局
│   │   ├── sidebar.tsx           # 侧边栏
│   │   ├── header.tsx            # 顶部栏
│   │   ├── navigation.tsx        # 导航菜单
│   │   ├── breadcrumb.tsx        # 面包屑
│   │   └── login-dialog.tsx      # 登录对话框
│   └── ui/               # shadcn/ui 组件
├── hooks/                # 自定义 Hooks
│   └── use-auth.ts       # 认证 Hook
├── lib/                  # 工具函数和配置
│   ├── mock-data.ts      # Mock 数据
│   ├── auth.ts           # 认证逻辑
│   └── utils.ts          # 工具函数
└── types/                # TypeScript 类型定义
    └── index.ts
```

## 设计风格

- **配色**: 黑白色调为主，参考 Notion 设计风格
- **字体**: 使用 Geist 字体
- **组件**: 基于 shadcn/ui，保持简洁一致的视觉效果

## Mock 数据

项目使用 Mock 数据进行演示，暂未连接真实 API。数据存储在 `lib/mock-data.ts` 中。

### 登录测试

- 使用任意邮箱地址
- 验证码固定为: `123456`

## 开发说明

### 添加新页面

1. 在 `app/` 目录下创建新的页面文件
2. 使用 `DashboardLayout` 包装页面内容
3. 在 `lib/mock-data.ts` 中添加菜单项

### 添加新组件

1. 使用 shadcn/ui CLI 添加组件: `npx shadcn@latest add [component]`
2. 自定义组件放在 `components/` 目录下

### 样式定制

- 修改 `app/globals.css` 调整全局样式
- 使用 Tailwind CSS 类名进行样式控制

## 最佳实践

- ✅ 组件复用性强，拆分合理
- ✅ 遵循 React 和 Next.js 最佳实践
- ✅ TypeScript 类型安全
- ✅ 响应式设计
- ✅ 代码结构清晰，易于维护
