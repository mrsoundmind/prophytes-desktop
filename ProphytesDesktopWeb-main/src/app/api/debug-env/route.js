import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        NODE_ENV: process.env.NODE_ENV,
        USE_MOCK_DATA: process.env.USE_MOCK_DATA,
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL
    });
}
