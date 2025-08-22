import { NextRequest } from 'next/server';
import { dbConnect } from '@/lib/db';

// GET /api/products/users/[email] - fetch a user document by email (case-insensitive)
export async function GET(_req: NextRequest, { params }: { params: { email: string } }) {
	try {
		const raw = params.email || '';
		const decoded = decodeURIComponent(raw).trim();
		if (!decoded) return Response.json({ error: 'Email is required.' }, { status: 400 });
		// rudimentary email format check
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(decoded)) return Response.json({ error: 'Invalid email format.' }, { status: 400 });

		const collection = dbConnect('users');
		// case-insensitive search
		const user = await collection.findOne({ email: { $regex: `^${decoded.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' } } as any);
		if (!user) return Response.json({ error: 'User not found.' }, { status: 404 });
		// remove sensitive fields if present
		delete (user as any).password;
		delete (user as any).hashedPassword;
		return Response.json(user);
	} catch (err: any) {
		console.error('GET /api/products/users/[email] error', err);
		return Response.json({ error: 'Failed to fetch user.' }, { status: 500 });
	}
}

export const dynamic = 'force-dynamic';
