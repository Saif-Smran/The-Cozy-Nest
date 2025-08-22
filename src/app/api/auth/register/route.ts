import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import bcrypt from 'bcryptjs';

interface RegisterBody {
  name?: string;
  email?: string;
  password?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegisterBody;
    const { name, email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password required' }, { status: 400 });
    }

    const users = dbConnect('users');

    // check existing
    const existing = await users.findOne({ email });
    if (existing) {
      return NextResponse.json({ success: false, message: 'User already exists' }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      password: hashed,
      name: name || email.split('@')[0],
      provider: 'credentials',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      role: 'user',
      lastLogin: null,
    };

    const result = await users.insertOne(newUser as any);

    return NextResponse.json({ success: true, message: 'Account created', userId: result.insertedId });
  } catch (e: any) {
    console.error('Register error', e);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
