import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export const STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;

export const PRO_PLAN_PRODUCT = {
  name: "Pro Plan",
  price: 1000, // $10.00 in cents
  currency: "usd",
  description: "Upgrade to Pro Plan for enhanced features",
};

export async function createCheckoutSession(customerEmail?: string) {
  try {
    const BASE_URL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.BASE_URL;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: PRO_PLAN_PRODUCT.currency,
            product_data: {
              name: PRO_PLAN_PRODUCT.name,
              description: PRO_PLAN_PRODUCT.description,
            },
            unit_amount: PRO_PLAN_PRODUCT.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/payment/cancel`,
      customer_email: customerEmail,
      metadata: {
        product: "pro_plan",
      },
    });

    return session;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}

export async function getCheckoutSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error) {
    console.error("Error retrieving checkout session:", error);
    throw error;
  }
}

export async function verifyPaymentAndUpdateUser(
  sessionId: string,
  userId: string
) {
  try {
    const session = await getCheckoutSession(sessionId);

    if (
      session.payment_status === "paid" &&
      session.metadata?.product === "pro_plan"
    ) {
      // NOTE: Updating user's Pro status in firestore database
      const { doc, setDoc } = await import("firebase/firestore");
      const { db } = await import("../../firebaseConfig");

      const userRef = doc(db, "users", userId);
      await setDoc(userRef, { isPro: true }, { merge: true });

      return {
        success: true,
        session,
        message: "Payment verified and Pro status updated",
      };
    } else {
      return {
        success: false,
        session,
        message: "Payment not completed or invalid product",
      };
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
}
