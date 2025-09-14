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
    const stats = await prisma.metric.findMany({
      where: { tenantId: Number(tenantId) },
      select: { title: true, value: true }
    });

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
