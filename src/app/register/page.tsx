"use client";
import { useState } from 'react';
import { useToast } from '@/components/ToastProvider';
import Image from 'next/image';
import LoginImage from '@/Asset/Login.jpg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (data.success) {
        toast.push({ type: 'success', title: 'Account created' });
        router.push('/login');
      } else {
        toast.push({ type: 'error', title: 'Failed', message: data.message || 'Could not create account' });
      }
    } catch (err: any) {
      toast.push({ type: 'error', title: 'Error', message: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden ">
      <Image src={LoginImage} alt="Register" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-black/60" />
      <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-md p-8 glass-card space-y-6 text-white">
        <h1 className="text-3xl font-bold text-center">Create Account</h1>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Name</label>
            <input type="text" className="w-full glass-input px-4 py-2 rounded-md outline-none" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input type="email" className="w-full glass-input px-4 py-2 rounded-md outline-none" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input type="password" className="w-full glass-input px-4 py-2 rounded-md outline-none" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
        </div>
        <button disabled={loading} className="w-full glass-btn py-2 disabled:opacity-50 disabled:cursor-not-allowed">{loading ? 'Creating...' : 'Register'}</button>
        <p className="text-center text-sm">Already have an account? <Link href="/login" className="glass-link">Login</Link></p>
      </form>
    </div>
  );
}
