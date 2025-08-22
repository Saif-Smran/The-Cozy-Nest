import { NextRequest } from 'next/server';
import { ObjectId, Filter } from 'mongodb';
import { collectionNames, dbConnect } from '@/lib/db';

// Product interface (MongoDB document shape)
export interface Product {
	_id?: ObjectId;
	name: string;
	category: string;
	subcategory?: string;
	price: number;
	brand?: string;
	stock_quantity: number;
	description: string;
	tags?: string[];
	animal: string;
	image_url: string;
	createdAt?: Date;
	updatedAt?: Date;
}

// Simple runtime validation
function validateProduct(payload: any): { valid: boolean; errors: string[]; value?: Product } {
	const errors: string[] = [];
	if (!payload || typeof payload !== 'object') errors.push('Body must be a JSON object.');
	const required: (keyof Product)[] = ['name', 'category', 'price', 'stock_quantity', 'description', 'animal', 'image_url'];
	required.forEach(field => {
		if (payload?.[field] === undefined || payload?.[field] === null || payload?.[field] === '') {
			errors.push(`${field} is required.`);
		}
	});
	if (payload?.price !== undefined && (typeof payload.price !== 'number' || payload.price < 0)) errors.push('price must be a non-negative number.');
	if (payload?.stock_quantity !== undefined && (!Number.isInteger(payload.stock_quantity) || payload.stock_quantity < 0)) errors.push('stock_quantity must be a non-negative integer.');
	if (payload?.tags && !Array.isArray(payload.tags)) errors.push('tags must be an array of strings.');
	if (Array.isArray(payload?.tags) && !payload.tags.every((t: any) => typeof t === 'string')) errors.push('tags must contain only strings.');

	if (errors.length) return { valid: false, errors };

	const value: Product = {
		name: String(payload.name).trim(),
		category: String(payload.category).trim(),
		subcategory: payload.subcategory ? String(payload.subcategory).trim() : undefined,
		price: Number(payload.price),
		brand: payload.brand ? String(payload.brand).trim() : undefined,
		stock_quantity: Number(payload.stock_quantity),
		description: String(payload.description).trim(),
		tags: payload.tags ? payload.tags.map((t: string) => t.trim()).filter(Boolean) : undefined,
		animal: String(payload.animal).trim(),
		image_url: String(payload.image_url).trim(),
		createdAt: new Date(),
		updatedAt: new Date(),
	};
	return { valid: true, errors: [], value };
}

// GET /api/products
// Query params: page, limit, category, animal, q (search in name/description), tag
export async function GET(req: NextRequest) {
	try {
		const url = new URL(req.url);
		const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
		const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') || '20', 10)));
		const category = url.searchParams.get('category');
		const animal = url.searchParams.get('animal');
		const tag = url.searchParams.get('tag');
		const q = url.searchParams.get('q');

		const query: Filter<Product> = {};
		if (category) query.category = category;
		if (animal) query.animal = animal;
		if (tag) query.tags = { $in: [tag] } as any;
		if (q) {
			const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
			(query as any).$or = [{ name: regex }, { description: regex }, { brand: regex }];
		}

		const collection = dbConnect('products');
		const total = await collection.countDocuments(query as any);
		const cursor = collection.find(query as any).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
		const data = await cursor.toArray();
		return Response.json({ data, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
	} catch (err: any) {
		console.error('GET /api/products error', err);
		return Response.json({ error: 'Failed to fetch products.' }, { status: 500 });
	}
}

// POST /api/products - create a new product document
export async function POST(req: NextRequest) {
	try {
		const body = await req.json().catch(() => null);
		const { valid, errors, value } = validateProduct(body);
		if (!valid || !value) {
			return Response.json({ errors }, { status: 400 });
		}

		const collection = dbConnect('products');
		// Optional: enforce uniqueness on name + animal for simplicity
		const existing = await collection.findOne({ name: value.name, animal: value.animal } as any);
		if (existing) {
			return Response.json({ error: 'A product with this name for that animal already exists.' }, { status: 409 });
		}
		const insertResult = await collection.insertOne(value as any);
		return Response.json({ _id: insertResult.insertedId, message: 'Product created successfully.' }, { status: 201 });
	} catch (err: any) {
		console.error('POST /api/products error', err);
		return Response.json({ error: 'Failed to create product.' }, { status: 500 });
	}
}

export const dynamic = 'force-dynamic'; // ensure route isn\'t statically optimized
