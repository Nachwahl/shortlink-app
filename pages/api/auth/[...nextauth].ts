import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GitHubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'
import prisma from '../../../lib/prisma'


// @ts-ignore
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        EmailProvider({
            server: {
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                },
                tls:{
                    rejectUnauthorized: false
                }
            },
            from: process.env.SMTP_FROM,
        }),
    ],
    theme: {
      brandColor: "#2979ff",
      logo: "https://buildtheearth.net/assets/img/site-logo-animated.gif",
      colorScheme: "light"
    },
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
    session: {strategy: "jwt"},
    jwt: {
        secret: process.env.SECRET,
        maxAge: 60 * 60 * 24 * 30
    },
    callbacks: {
        async jwt({token, user, account, profile, isNewUser}) {
            console.log(user)
            if (account?.accessToken) {
                token.accessToken = account.accessToken
            }
            if (user?.role) {
                token.role = user.role
            }
            return token
        }
    }
};
