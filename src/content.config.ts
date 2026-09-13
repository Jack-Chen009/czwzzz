// src/content.config.ts
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod'; // v6 推荐从 astro/zod 导入 z
import { glob } from 'astro/loaders'; // 导入 glob 加载器

// 1. 声明 blog 内容集合
const blogCollection = defineCollection({
  // v6 移除了 type: 'content'，改为使用 loader
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// 2. 如果你有 contact 联系页面或其他内容集合，也在这里导出
// const contactCollection = defineCollection({
//   loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/contact' }),
//   schema: z.object({ ... })
// });

export const collections = {
  'blog': blogCollection, // 对应目录 src/content/blog/
  // 'contact': contactCollection, // 对应目录 src/content/contact/
};