import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { dbConnect } from '@/lib/db';
import type { Product } from '../route';

// Utility to parse ObjectId safely
function parseId(id: string | null): ObjectId | null {
	if (!id) return null;
	if (!ObjectId.isValid(id)) return null;
	return new ObjectId(id);
}

// Allow partial updates; reuse rules from main route
const mutableFields: (keyof Product)[] = [
	'name',
	'category',
	'subcategory',
	'price',
	'brand',
	'stock_quantity',
	'description',
	'tags',
	'animal',
	'image_url'
];

function sanitizePatch(body: any): { update: Partial<Product>; errors: string[] } {
	const update: Partial<Product> = {};
	const errors: string[] = [];
	if (!body || typeof body !== 'object') {
		return { update: {}, errors: ['Body must be a JSON object.'] };
	}
	for (const key of Object.keys(body)) {
		if (!mutableFields.includes(key as keyof Product)) continue; // ignore unknown fields silently
		const value = (body as any)[key];
		switch (key) {
			case 'price':
				if (typeof value !== 'number' || value < 0) errors.push('price must be a non-negative number.');
				else update.price = value;
				break;
			case 'stock_quantity':
				if (!Number.isInteger(value) || value < 0) errors.push('stock_quantity must be a non-negative integer.');
				else update.stock_quantity = value;
				break;
			case 'tags':
				if (!Array.isArray(value) || !value.every(v => typeof v === 'string')) errors.push('tags must be an array of strings.');
				else update.tags = value;
				break;
			default:
				if (typeof value === 'string') (update as any)[key] = value.trim();
				else (update as any)[key] = value;
		}
	}
	if (Object.keys(update).length === 0 && errors.length === 0) errors.push('No valid fields provided for update.');
	return { update, errors };
}

// GET /api/products/[id]
export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
	try {
		const _id = parseId(id);
		if (!_id) return Response.json({ error: 'Invalid product id.' }, { status: 400 });
		const collection = dbConnect('products');
		const doc = await collection.findOne({ _id } as any);
		if (!doc) return Response.json({ error: 'Product not found.' }, { status: 404 });
		return Response.json(doc);
	} catch (err: any) {
		console.error('GET /api/products/[id] error', err);
		return Response.json({ error: 'Failed to fetch product.' }, { status: 500 });
	}
}

// PATCH /api/products/[id]
export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
	try {
		const _id = parseId(id);
		if (!_id) return Response.json({ error: 'Invalid product id.' }, { status: 400 });
		const body = await req.json().catch(() => null);
		const { update, errors } = sanitizePatch(body);
		if (errors.length) return Response.json({ errors }, { status: 400 });
		update.updatedAt = new Date();
		const collection = dbConnect('products');
		const res = await collection.findOneAndUpdate({ _id } as any, { $set: update }, { returnDocument: 'after' });
		if (!res) return Response.json({ error: 'Product not found.' }, { status: 404 });
		return Response.json({ message: 'Product updated.', data: res });
	} catch (err: any) {
		console.error('PATCH /api/products/[id] error', err);
		return Response.json({ error: 'Failed to update product.' }, { status: 500 });
	}
}

// DELETE /api/products/[id]
export async function DELETE(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
	try {
		const _id = parseId(id);
		if (!_id) return Response.json({ error: 'Invalid product id.' }, { status: 400 });
		const collection = dbConnect('products');
		const del = await collection.deleteOne({ _id } as any);
		if (del.deletedCount === 0) return Response.json({ error: 'Product not found.' }, { status: 404 });
		return Response.json({ message: 'Product deleted.' });
	} catch (err: any) {
		console.error('DELETE /api/products/[id] error', err);
		return Response.json({ error: 'Failed to delete product.' }, { status: 500 });
	}
}

// (Optional) POST here is not typical; encourage using collection route
export async function POST() {
	return Response.json({ error: 'Use POST /api/products to create products.' }, { status: 405 });
}

export const dynamic = 'force-dynamic';
