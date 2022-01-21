import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"


export async function middleware(req) {
    const session = await getToken({ req, secret: process.env.SECRET })
    if (!session) return NextResponse.redirect("/api/auth/signin")
    if(session.role !== "admin") {
        return NextResponse.redirect("/")
    }
    return NextResponse.next()


}
