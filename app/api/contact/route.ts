import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const name = formData.get('name') as string;
        const mobileNumber = formData.get('mobileNumber') as string;
        const whatsappNumber = formData.get('whatsappNumber') as string;
        const email = formData.get('email') as string;
        const message = formData.get('message') as string;
        const files = formData.getAll('files') as File[];

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Configure Nodemailer
        // Using environment variables for security
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Prepare attachments
        const emailAttachments: any[] = await Promise.all(
            files.map(async (file) => {
                const buffer = Buffer.from(await file.arrayBuffer());
                return {
                    filename: file.name,
                    content: buffer,
                };
            })
        );

        //  Add profile image as inline attachment for logo
        let hasProfileLogo = false;
        try {
            const logoPath = path.join(process.cwd(), 'public', 'profile.jpg');
            if (fs.existsSync(logoPath)) {
                const logoBuffer = fs.readFileSync(logoPath);
                emailAttachments.push({
                    filename: 'profile.jpg',
                    content: logoBuffer,
                    cid: 'profileImage',
                });
                hasProfileLogo = true;
            }
        } catch (e) {
            console.error('Failed to attach profile image logo:', e);
        }

        const currentYear = new Date().getFullYear();

        // Professional Email Template
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Portfolio Message</title>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        background-color: #0b0f19;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                        -webkit-font-smoothing: antialiased;
                    }
                    .wrapper {
                        background-color: #0b0f19;
                        width: 100%;
                        table-layout: fixed;
                        padding: 40px 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #111827;
                        border-radius: 24px;
                        overflow: hidden;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
                        border: 1px solid #1f2937;
                    }
                    .gradient-bar {
                        height: 6px;
                        background: linear-gradient(90deg, #6366f1, #3b82f6, #10b981);
                    }
                    .header {
                        padding: 40px 30px 20px 30px;
                        text-align: center;
                    }
                    .profile-container {
                        width: 86px;
                        height: 86px;
                        margin: 0 auto 20px auto;
                        border-radius: 50%;
                        padding: 3px;
                        background: linear-gradient(135deg, #6366f1, #3b82f6);
                        box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
                    }
                    .profile-img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        object-fit: cover;
                        display: block;
                        background-color: #1f2937;
                    }
                    .title {
                        color: #ffffff;
                        font-size: 26px;
                        font-weight: 800;
                        margin: 0 0 8px 0;
                        letter-spacing: -0.5px;
                    }
                    .subtitle {
                        color: #9ca3af;
                        font-size: 14px;
                        margin: 0;
                    }
                    .content {
                        padding: 10px 40px 40px 40px;
                    }
                    .info-card {
                        background-color: #1f2937;
                        border-radius: 16px;
                        padding: 24px;
                        margin-bottom: 24px;
                        border: 1px solid #374151;
                    }
                    .info-row {
                        margin-bottom: 16px;
                    }
                    .info-row:last-child {
                        margin-bottom: 0;
                    }
                    .label {
                        font-size: 11px;
                        text-transform: uppercase;
                        letter-spacing: 1.5px;
                        color: #9ca3af;
                        font-weight: 700;
                        margin-bottom: 4px;
                    }
                    .value {
                        font-size: 15px;
                        color: #f3f4f6;
                        font-weight: 500;
                    }
                    .value a {
                        color: #60a5fa;
                        text-decoration: none;
                    }
                    .message-title {
                        font-size: 13px;
                        text-transform: uppercase;
                        letter-spacing: 1.5px;
                        color: #9ca3af;
                        font-weight: 700;
                        margin-bottom: 10px;
                        padding-left: 4px;
                    }
                    .message-card {
                        background-color: #1f2937;
                        border-left: 4px solid #6366f1;
                        border-radius: 0 16px 16px 0;
                        padding: 24px;
                        margin-bottom: 24px;
                        border-top: 1px solid #374151;
                        border-right: 1px solid #374151;
                        border-bottom: 1px solid #374151;
                    }
                    .message-text {
                        font-size: 15px;
                        color: #e5e7eb;
                        line-height: 1.7;
                        margin: 0;
                    }
                    .attachment-list {
                        margin-top: 8px;
                    }
                    .attachment-card {
                        background-color: #1f2937;
                        border: 1px solid #374151;
                        border-radius: 12px;
                        padding: 12px 16px;
                        margin-bottom: 8px;
                        display: block;
                    }
                    .attachment-icon {
                        margin-right: 8px;
                        color: #10b981;
                        font-size: 16px;
                        vertical-align: middle;
                    }
                    .attachment-name {
                        font-size: 13px;
                        color: #e5e7eb;
                        font-weight: 500;
                        vertical-align: middle;
                    }
                    .cta-container {
                        text-align: center;
                        margin: 32px 0 10px 0;
                    }
                    .btn-reply {
                        display: inline-block;
                        background: linear-gradient(135deg, #6366f1, #3b82f6);
                        color: #ffffff !important;
                        font-weight: 700;
                        font-size: 15px;
                        padding: 14px 32px;
                        text-decoration: none;
                        border-radius: 9999px;
                        box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
                    }
                    .footer {
                        text-align: center;
                        padding: 30px 40px;
                        background-color: #0b0f19;
                        border-top: 1px solid #1f2937;
                    }
                    .footer-text {
                        font-size: 12px;
                        color: #6b7280;
                        line-height: 1.6;
                        margin: 0;
                    }
                    .footer-links {
                        margin-top: 12px;
                    }
                    .footer-link {
                        font-size: 12px;
                        color: #9ca3af;
                        text-decoration: none;
                        margin: 0 8px;
                    }
                    .footer-link:hover {
                        color: #6366f1;
                    }
                </style>
            </head>
            <body>
                <div class="wrapper">
                    <div class="container">
                        <div class="gradient-bar"></div>
                        <div class="header">
                            <div class="profile-container">
                                <img src="${hasProfileLogo ? 'cid:profileImage' : 'https://m-essa.vercel.app/favicon.ico'}" class="profile-img" alt="Muhammad Essa">
                            </div>
                            <h1 class="title">New Message</h1>
                            <p class="subtitle">An inquiry from your portfolio contact form</p>
                        </div>
                        
                        <div class="content">
                            <div class="info-card">
                                <div class="info-row">
                                    <div class="label">Sender Name</div>
                                    <div class="value">${name}</div>
                                </div>
                                <div class="info-row">
                                    <div class="label">Mobile Number</div>
                                    <div class="value">${mobileNumber}</div>
                                </div>
                                <div class="info-row">
                                    <div class="label">WhatsApp Number</div>
                                    <div class="value">${whatsappNumber}</div>
                                </div>
                                <div class="info-row" style="margin-top: 16px;">
                                    <div class="label">Sender Email</div>
                                    <div class="value"><a href="mailto:${email}">${email}</a></div>
                                </div>
                            </div>
                            
                            <div class="message-title">Message Content</div>
                            <div class="message-card">
                                <p class="message-text">${message.replace(/\n/g, '<br>')}</p>
                            </div>
                            
                            ${files.length > 0 ? `
                            <div class="message-title" style="margin-top: 24px;">Attachments (${files.length})</div>
                            <div class="attachment-list">
                                ${files.map(file => `
                                    <div class="attachment-card">
                                        <span class="attachment-icon">📎</span>
                                        <span class="attachment-name">${file.name}</span>
                                    </div>
                                `).join('')}
                            </div>
                            ` : ''}
                            
                            <div class="cta-container">
                                <a href="mailto:${email}" class="btn-reply">Reply to ${name}</a>
                            </div>
                        </div>
                        
                        <div class="footer">
                            <p class="footer-text">This is an automated notification sent from your portfolio website.</p>
                            <p class="footer-text" style="margin-top: 4px;">© ${currentYear} Muhammad Essa • All Rights Reserved</p>
                            <div class="footer-links">
                                <a href="https://m-essa.vercel.app" class="footer-link">Portfolio</a>
                                <span style="color: #374151;">•</span>
                                <a href="mailto:muhammadessa1514@gmail.com" class="footer-link">Contact</a>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Send Email
        await transporter.sendMail({
            from: `"${name}" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
            subject: `New Inquiry from ${name} via Portfolio`,
            text: `Message from ${name} (${email}): ${message}`,
            html: htmlContent,
            attachments: emailAttachments,
            replyTo: email,
        });

        return NextResponse.json({ success: true, message: 'Message sent successfully!' });

    } catch (error: any) {
        console.error('Email Error:', error);
        return NextResponse.json({ error: error.message || 'Failed to send message' }, { status: 500 });
    }
}
