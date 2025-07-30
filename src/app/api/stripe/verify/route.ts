import { NextRequest, NextResponse } from 'next/server';
import { verifyPaymentAndUpdateUser } from '@/utils/stripe';

export async function POST(req: NextRequest) {
  try {
    const { sessionId, userId } = await req.json();
    
    if (!sessionId || !userId) {
      return NextResponse.json(
        { error: 'Missing sessionId or userId' },
        { status: 400 }
      );
    }
    
    const result = await verifyPaymentAndUpdateUser(sessionId, userId);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
} 