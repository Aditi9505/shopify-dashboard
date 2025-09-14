import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const shop = url.searchParams.get('shop');

  if (!shop) {
    return NextResponse.json({ error: 'shop query parameter required' }, { status: 400 });
  }

  try {
    // Add explicit string index signature here
    const tenantMock: Record<string, number> = {
      "yoursluxestore.myshopify.com": 1,
      "othershop.myshopify.com": 2,
    };

    const tenantId = tenantMock[shop];

    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    return NextResponse.json({ tenantId });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
