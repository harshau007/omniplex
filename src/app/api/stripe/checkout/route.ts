import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/utils/stripe';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    
    const session = await createCheckoutSession(email);
    
    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
} 