import NextAuth from 'next-auth';
import { authOptions } from '@/lib/authOptions';

// Initialize NextAuth with the provided options
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };