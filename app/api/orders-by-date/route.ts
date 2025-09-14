import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const tenantId = url.searchParams.get('tenantId');

  if (!tenantId) {
    return NextResponse.json({ error: 'Missing tenantId' }, { status: 400 });
  }

  try {
    // Mock orders-by-date data matching your image or test data
    const formattedOrders = [
      { name: "2025-09-01", Orders: 1 },
      { name: "2025-09-05", Orders: 1 },
      { name: "2025-09-07", Orders: 2 },
      { name: "2025-09-10", Orders: 1 },
      { name: "2025-09-12", Orders: 3 }
    ];

    return NextResponse.json(formattedOrders);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
