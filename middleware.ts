import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect /vault routes (except /vault/login)
    if (pathname.startsWith('/vault') && pathname !== '/vault/login') {
        const vaultSession = request.cookies.get('vault_session');

        if (!vaultSession || vaultSession.value !== 'authenticated') {
            const url = request.nextUrl.clone();
            url.pathname = '/vault/login';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/vault/:path*'],
};
