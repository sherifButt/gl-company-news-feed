import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter'
import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import { prisma } from '../../../db'
import { OAuthConfig } from 'next-auth/providers'

export default NextAuth({
   adapter: PrismaAdapter(prisma),
   providers: [
      GitHubProvider({
         clientId: process.env.GITHUB_ID!,
         clientSecret: process.env.GITHUB_SECRET!,
         
      }),
      TwitterProvider({
         clientId: process.env.TWITTER_CLIENT_ID || '',
         clientSecret: process.env.TWITTER_CLIENT_SECRET || '',
         version: '2.0', // opt-in to Twitter OAuth 2.0
      }),
   ],
})
