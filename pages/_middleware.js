import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"




export async function middleware(req) {
    if (req.url.includes("/api/auth")) {
        return NextResponse.next()
    }

    const session = await getToken({ req, secret: process.env.SECRET })

    if (!session) return NextResponse.redirect("/api/auth/signin")

    return NextResponse.next()
}
