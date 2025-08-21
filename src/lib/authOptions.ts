import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import type { AuthOptions, User, Account, Profile, Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import { collectionNames, dbConnect } from './db';

// Placeholder loginUser until real implementation is added
async function loginUser(credentials: Record<string, string> | undefined): Promise<{
    success: boolean; userId: string; user: any;
}> {
    // Implement your credentials auth here. For now, always fail.
    return { success: false, userId: '', user: null };
}

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter Your Email" },
                password: { label: "Password", type: "password", placeholder: "Enter Your Password" }
            },
            async authorize(credentials) {
                try {
                    // Add logic here to look up the user from the credentials supplied
                    const user = await loginUser(credentials);

                    // If user exists and password is correct, return user object
                    if (user && user.success) {
                        // Return user object that will be saved in the JWT
                        return {
                            id: user.userId,
                            email: user.user.email,
                            name: `${user.user.firstName} ${user.user.lastName}`,
                            firstName: user.user.firstName,
                            lastName: user.user.lastName,
                            phone: user.user.phone,
                            role: user.user.role || 'user'
                        }
                    } else {
                        // Return null to display a default error message
                        return null
                    }
                } catch (error: any) {
                    console.error("NextAuth authorize error:", error);
                    // Throw error to display custom error message
                    throw new Error(error.message || "Authentication failed");
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || ''
        })
    ],
    pages: {
        signIn: '/login',
        error: '/login',
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
            // Allow all sign-ins for OAuth providers and credentials
            if (account) {
                const { provider, providerAccountId } = account
                const {email : userEmail, image, name} = user

                const usercollection = dbConnect('users')
                // Check if user already exists in the database
                const existingUser = await usercollection.findOne({ provider, providerAccountId });
                if(!existingUser) {
                    const newUser = {
                        providerAccountId,
                        provider,
                        email: userEmail || '',
                        name: name || (userEmail ? userEmail.split('@')[0] : 'User'),
                        image : image || null,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        isActive: true,
                        role: 'user', // Default role
                        lastLogin: new Date(),
                    };
                    await usercollection.insertOne(newUser);
                }else{
                    
                    // Update last login timestamp for existing user
                    await usercollection.updateOne(
                        { provider, providerAccountId },
                        { $set: { lastLogin: new Date() } }
                    );
                }
            }
            return true;
        },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
    async jwt({ token, user, account }: { token: JWT; user?: User | null; account?: Account | null }) {
            // Persist user data to token
            if (user) {
                (token as any).id = (user as any).id || (user as any).userId;
                (token as any).role = (user as any).role;
                (token as any).firstName = (user as any).firstName;
                (token as any).lastName = (user as any).lastName;
                (token as any).phone = (user as any).phone;
            }
            // For OAuth providers, save additional data
            if (account?.provider === "google" || account?.provider === "github") {
                token.provider = account.provider;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            // Send properties to the client
            (session.user as any).id = (token as any).id;
            (session.user as any).role = (token as any).role;
            (session.user as any).firstName = (token as any).firstName;
            (session.user as any).lastName = (token as any).lastName;
            (session.user as any).phone = (token as any).phone;
            (session.user as any).provider = (token as any).provider;
            return session;
        },
    },
};