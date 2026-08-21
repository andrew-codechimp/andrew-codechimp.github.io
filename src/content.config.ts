import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			categories: z.array(z.string()).optional(),
		}),
});

const portfolio = defineCollection({
	// Load Markdown files in the `src/content/portfolio/` directory.
	loader: glob({ base: './src/content/portfolio', pattern: '**/*.md' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			heroImage: z.optional(image()),
			subtitle: z.optional(z.string()),
			appImg: z.optional(z.string()),
			storeUrl: z.optional(z.string()),
			storeText: z.optional(z.string()),
			category: z.optional(z.string()),
			order: z.optional(z.number()),
			exclude: z.optional(z.boolean()),
		}),
});

export const collections = { blog, portfolio };
