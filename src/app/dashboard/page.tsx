"use client";
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session } = useSession();
  const user = session?.user as any;
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Overview</h1>
      {user ? (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {user.image && (
              <Image src={user.image} alt={user.name || 'User'} width={72} height={72} className="rounded-full ring-2 ring-primary/40" />
            )}
            <div>
              <p className="font-semibold text-lg">{user.name || user.email}</p>
              <p className="text-sm opacity-70">{user.email}</p>
              {user.role && <p className="text-xs mt-1 uppercase tracking-wide text-primary">{user.role}</p>}
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/products" className="btn btn-outline btn-sm">Browse Products</Link>
            <button onClick={() => signOut()} className="btn btn-error btn-sm text-white">Sign Out</button>
          </div>
        </div>
      ) : (
        <p>Please sign in.</p>
      )}
    </div>
  );
}
