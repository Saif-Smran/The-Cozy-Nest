import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export const metadata = { title: 'Dashboard - The Cozy Nest' };

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');
  const user = session.user as any;
  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      <aside className="w-60 shrink-0 border-r border-base-300 bg-base-100 dark:bg-base-200/50 p-5 space-y-6">
        <div>
          <p className="font-semibold text-sm uppercase tracking-wide text-base-content/60">Dashboard</p>
          <p className="font-medium mt-1">Hello {user?.name || user?.email}</p>
        </div>
        <nav className="flex flex-col gap-2 text-sm">
          <Link href="/dashboard" className="link-hover px-2 py-1 rounded hover:bg-base-200 dark:hover:bg-base-300/40">Overview</Link>
          <Link href="/dashboard/add-product" className="link-hover px-2 py-1 rounded hover:bg-base-200 dark:hover:bg-base-300/40">Add Product</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-10">
        {children}
      </main>
    </div>
  );
}
