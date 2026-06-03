import { NextResponse } from "next/server";

export function proxy(request) {
    const accessToken = request.cookies.get('access_token')?.value || null;

    if (!accessToken) {
        const url = new URL('/login', request.url);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

// Configure Matchers
export const config = {
    matcher: ['/dashboard'],
};