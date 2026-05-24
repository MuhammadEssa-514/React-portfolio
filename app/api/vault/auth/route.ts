import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { password } = await request.json();
        const correctPassword = process.env.VAULT_PASSWORD || 'admin514';

        if (password === correctPassword) {
            const response = NextResponse.json({ success: true });

            // Set a secure, HTTP-only cookie
            response.cookies.set('vault_session', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24, // 1 day
                path: '/',
            });

            return response;
        }

        return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}

export async function DELETE() {
    const response = NextResponse.json({ success: true });
    response.cookies.set('vault_session', '', { maxAge: 0 });
    return response;
}
