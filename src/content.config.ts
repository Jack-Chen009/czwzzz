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

const messagesCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/messages' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['news', 'post']).default('post'),
    pubDate: z.date(),
    source: z.string(),
    sourceUrl: z.string().url(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  'blog': blogCollection, // 对应目录 src/content/blog/
  'messages': messagesCollection,
};