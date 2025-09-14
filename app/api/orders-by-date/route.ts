import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const tenantId = url.searchParams.get('tenantId');

  if (!tenantId) {
    return NextResponse.json({ error: 'Missing tenantId parameter' }, { status: 400 });
  }

  try {
    const orders = await prisma.order.groupBy({
      by: ['date'],
      where: { tenantId: Number(tenantId) },
      _count: { id: true }
    });

    // Format response to expected structure: [{ name: '2025-09-14', Orders: 123 }, ...]
interface Order {
  date: string | number | Date;
  _count: { id: number };
}
const formattedOrders = orders.map((order: Order) => ({
  name: new Date(order.date).toISOString().split('T'),
  Orders: order._count.id,
}));




    return NextResponse.json(formattedOrders);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
