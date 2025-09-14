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
    const customers = await prisma.customer.findMany({
      where: { tenantId: Number(tenantId) },
      orderBy: { spend: 'desc' },
      take: 5,
      select: { name: true, spend: true }
    });

    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
