import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    const { user, password } = body;

    if(user !== 'admin' || password !== '123') {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const accessToken = 'fake-jwt-token';
    const cookiesStore = await cookies();

    cookiesStore.set('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
    });

    return NextResponse.json({ message: 'Login successful' });
}