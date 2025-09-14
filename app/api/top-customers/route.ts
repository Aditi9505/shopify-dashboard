import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const tenantId = url.searchParams.get('tenantId');

  if (!tenantId) {
    return NextResponse.json({ error: 'Missing tenantId parameter' }, { status: 400 });
  }

  try {
    const topCustomers = [
      { name: "Daisy", spend: "₹3,114.13" },
      { name: "Lily", spend: "₹1,414.82" },
      { name: "Kiara", spend: "₹979.91" },
      { name: "Anuj S", spend: "₹543.91" },
      { name: "Nia Shah", spend: "₹541.62" }
    ];

    return NextResponse.json(topCustomers);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
