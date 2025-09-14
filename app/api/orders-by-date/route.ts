import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const tenantId = url.searchParams.get('tenantId');

  if (!tenantId) {
    return NextResponse.json({ error: 'Missing tenantId' }, { status: 400 });
  }

  try {
    const orders = await prisma.order.groupBy({
      by: ['createdAt'],  // Use correct field here
      where: { tenantId: Number(tenantId) },
      _count: { id: true }
    });

    const formattedOrders = orders.map(o => ({
      name: o.createdAt.toISOString().split('T')[0],
      Orders: o._count.id
    }));

    return NextResponse.json(formattedOrders);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
