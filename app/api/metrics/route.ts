import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const tenantId = url.searchParams.get('tenantId');

  if (!tenantId) {
    return NextResponse.json({ error: 'tenantId query parameter required' }, { status: 400 });
  }

  try {
    // Mock metrics data aligned with your dashboard example/image
    const metrics = [
      { title: 'Total Revenue', value: '₹9,844.34' },
      { title: 'Total Orders', value: '9' },
      { title: 'Total Customers', value: '10' },
      { title: 'Avg. Order Value', value: '₹1,093.82' },
    ];

    return NextResponse.json(metrics);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
