"use client";
import { signIn } from 'next-auth/react';
import { useState, Suspense } from 'react';
import { useToast } from '@/components/ToastProvider';
import Image from 'next/image';
import LoginImage from '@/Asset/Login.jpg';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginFormInner() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get('error');
  const toast = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn('credentials', { email, password, redirect: false });
      if (res?.ok) {
    toast.push({ type: 'success', title: 'Logged in' });
        router.push('/');
      } else {
    toast.push({ type: 'error', title: 'Login failed', message: res?.error || 'Invalid credentials' });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <Image src={LoginImage} alt="Login" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-black/60" />
      <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-md p-8 glass-card space-y-6 text-white">
        <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
        {errorParam && <p className="text-sm text-red-300 text-center">{errorParam}</p>}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input type="email" className="w-full glass-input px-4 py-2 rounded-md outline-none" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input type="password" className="w-full glass-input px-4 py-2 rounded-md outline-none" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
        </div>
        <button disabled={loading} className="w-full glass-btn py-2 disabled:opacity-50 disabled:cursor-not-allowed">{loading ? 'Logging in...' : 'Login'}</button>
        <p className="text-center text-sm">No account? <Link href="/register" className="glass-link">Register</Link></p>
        <div className="flex gap-3 pt-4">
          <button type="button" onClick={() => signIn('google')} className="flex-1 glass-btn py-2">Google</button>
          <button type="button" onClick={() => signIn('github')} className="flex-1 glass-btn py-2">GitHub</button>
        </div>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-base-content/70">Loading...</div>}>
      <LoginFormInner />
    </Suspense>
  );
}
