import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ name: string }> }
) {
    // 1. Verify Authentication
    const vaultSession = request.cookies.get('vault_session');

    if (!vaultSession || vaultSession.value !== 'authenticated') {
        return NextResponse.json({ error: 'Unauthorized. Access Denied.' }, { status: 401 });
    }

    try {
        const { name: filename } = await params;

        // Security: Prevent Directory Traversal
        // Only allow base filenames, no slashes or dots mapping to parent dirs
        if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
            return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
        }

        const filePath = path.join(process.cwd(), 'vault-data', filename);

        // Check if file exists
        try {
            await fs.access(filePath);
        } catch {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

        const fileBuffer = await fs.readFile(filePath);

        // Check if download is requested
        const { searchParams } = new URL(request.url);
        const shouldDownload = searchParams.get('download') === 'true';

        // Determine content type
        let contentType = 'application/octet-stream';
        const lowerFilename = filename.toLowerCase();
        if (lowerFilename.endsWith('.pdf')) contentType = 'application/pdf';
        else if (lowerFilename.endsWith('.jpg') || lowerFilename.endsWith('.jpeg')) contentType = 'image/jpeg';
        else if (lowerFilename.endsWith('.png')) contentType = 'image/png';

        const headers = new Headers({
            'Content-Type': contentType,
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'X-Frame-Options': 'SAMEORIGIN',
            'Content-Security-Policy': "frame-ancestors 'self'",
        });

        if (shouldDownload) {
            headers.set('Content-Disposition', `attachment; filename="${filename}"`);
        } else {
            headers.set('Content-Disposition', 'inline');
        }

        return new NextResponse(fileBuffer, { headers });

    } catch (error) {
        console.error('Vault File API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
