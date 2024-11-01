import { defineCollection, z } from 'astro:content';

export const collections = {
	work: defineCollection({
		type: 'content',
		schema: z.object({
			title: z.string(),
			subtitle: z.string(),
			description: z.string(),
			publishDate: z.coerce.date(),
			url: z.string(),
			tags: z.array(z.string()),
			img: z.string(),
			img_alt: z.string().optional(),
			img_1: z.string(),
			img_1_alt: z.string().optional(),
			img_2: z.string(),
			img_2_alt: z.string().optional(),
			img_3: z.string(),
			img_3_alt: z.string().optional(),
		}),
	}),
};
