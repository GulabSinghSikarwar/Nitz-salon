import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../server/db';
import { services } from '../../../shared/schema';

export async function GET() {
  try {
    const data = await db.select().from(services);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}
