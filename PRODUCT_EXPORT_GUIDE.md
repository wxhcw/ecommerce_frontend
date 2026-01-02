# 产品数据导出指南

这个指南说明如何将产品数据（包括图片）发送给后端。

## 方法一：使用界面导出（最简单）

在网站的产品页面顶部，你会看到一个"Export Products to Backend"面板，提供以下选项：

1. **📥 Download JSON** - 下载JSON格式的产品数据
2. **📥 Download SQL** - 下载SQL INSERT语句
3. **📋 Copy JSON** - 复制JSON到剪贴板
4. **📊 Log to Console** - 在浏览器控制台查看数据
5. **🚀 Sync All Products** - 直接通过API发送到后端（需要配置API地址）
6. **🚀 Sync Batch** - 批量发送到后端（如果后端支持）

## 方法二：在浏览器控制台使用

打开浏览器开发者工具（F12），在Console中运行：

```javascript
// 导入工具函数（需要先访问网站）
import { 
  downloadProductsAsJSON, 
  downloadProductsAsSQL, 
  copyProductsToClipboard,
  logProducts 
} from './src/utils/downloadProducts';

// 下载JSON文件
downloadProductsAsJSON();

// 下载SQL文件
downloadProductsAsSQL();

// 复制到剪贴板
copyProductsToClipboard();

// 在控制台查看
logProducts();
```

## 方法三：直接使用代码

### 导出为JSON格式

```typescript
import { exportProductsAsJSON } from './src/utils/exportProducts';

const json = exportProductsAsJSON();
console.log(json);
// 复制输出并发送给后端
```

### 导出为SQL语句

```typescript
import { exportProductsAsSQL } from './src/utils/exportProducts';

const sql = exportProductsAsSQL();
console.log(sql);
// 可以直接在数据库中执行
```

### 通过API发送

```typescript
import { syncAllProducts, syncAllProductsBatch } from './src/utils/api';

// 单个发送
await syncAllProducts();

// 批量发送（如果后端支持）
await syncAllProductsBatch();
```

## 数据格式

导出的数据格式与你的数据库schema匹配：

```json
{
  "name": "Wireless Headphones Pro",
  "price": "299.99",
  "description": "Premium noise-cancelling headphones...",
  "category_id": 1,
  "image_url": "https://images.unsplash.com/..."
}
```

## 配置API地址

如果需要使用API同步功能，创建 `.env` 文件：

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## 图片处理

当前产品使用Unsplash的图片URL。你可以：

1. **保持URL** - 直接存储图片URL到数据库
2. **下载并上传** - 下载图片到本地，然后上传到你的服务器
3. **转换为Base64** - 如果需要，可以添加转换功能

## SQL示例

导出的SQL格式：

```sql
INSERT INTO products (name, price, description, category_id, image_url) 
VALUES ('Wireless Headphones Pro', 299.99, 'Premium noise-cancelling headphones...', 1, 'https://images.unsplash.com/...');
```

## 注意事项

- 价格已转换为字符串格式（匹配 `decimal(10,2)`）
- `category_id` 可以为 `NULL`
- 图片URL中的单引号已自动转义
- 所有产品数据都包含在导出中


