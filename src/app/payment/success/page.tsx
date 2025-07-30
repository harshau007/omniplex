"use client";

import { selectUserDetailsState, setUserDetailsState } from "@/store/authSlice";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import Arrow from "../../../../public/svgs/Arrow.svg";
import Check from "../../../../public/svgs/Check.svg";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetailsState);

  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [sessionDetails, setSessionDetails] = useState<any>(null);
  const [proStatusUpdated, setProStatusUpdated] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (sessionId && userDetails.uid) {
      verifyPayment(sessionId);
    } else if (!sessionId) {
      router.push("/");
    }
  }, [searchParams, userDetails.uid, router]);

  const verifyPayment = async (sessionId: string) => {
    setVerifying(true);
    try {
      const response = await fetch("/api/stripe/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          userId: userDetails.uid,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to verify payment");
      }

      const result = await response.json();

      if (result.success) {
        // NOTE: Updating user's Pro status in Redux
        dispatch(setUserDetailsState({ isPro: true }));
        setProStatusUpdated(true);
        setSessionDetails(result.session);
        toast.success("Payment successful! Welcome to Pro Plan! 🎉");
      } else {
        toast.error("Payment verification failed");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      toast.error("Failed to verify payment");
    } finally {
      setVerifying(false);
      setLoading(false);
    }
  };

  const handleContinue = () => {
    router.push("/");
  };

  if (loading || verifying) {
    return (
      <div className="fixed inset-0 bg-[#161616] z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#4ade80] mx-auto mb-6"></div>
          <div className="text-white text-xl font-medium mb-2">
            {verifying ? "Verifying your payment..." : "Loading..."}
          </div>
          <div className="text-gray-400 text-sm">
            Please wait while we process your Pro Plan upgrade
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#161616] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-[#232323] rounded-lg p-8 border border-[#ffffff14]"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-br from-[#4ade80] to-[#22c55e] rounded-full flex items-center justify-center mb-6 shadow-lg"
          >
            <img src={Check.src} alt="Success" className="w-10 h-10" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-white mb-3"
          >
            Payment Successful!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 mb-6 text-lg"
          >
            Welcome to{" "}
            <span className="text-[#4ade80] font-semibold">Pro Plan</span>! You
            now have access to all premium features.
          </motion.p>

          {proStatusUpdated && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="w-full bg-gradient-to-r from-[#4ade80]/20 to-[#22c55e]/20 rounded-lg p-4 mb-6 border border-[#4ade80]/30"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-3 h-3 bg-[#4ade80] rounded-full animate-pulse"></div>
                <div className="text-[#4ade80] font-semibold">
                  Pro Status Activated
                </div>
              </div>
              <div className="text-white text-sm">
                Your account has been upgraded successfully
              </div>
            </motion.div>
          )}

          {sessionDetails && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="w-full bg-[#2e2e2e] rounded-lg p-4 mb-6 border border-[#ffffff14]"
            >
              <div className="text-sm text-gray-400 mb-3 font-medium">
                Payment Details
              </div>
              <div className="space-y-2 text-white">
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-semibold">
                    ${(sessionDetails.amount_total / 100).toFixed(2)}{" "}
                    {sessionDetails.currency.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Product:</span>
                  <span className="font-semibold text-[#4ade80]">Pro Plan</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-semibold text-[#4ade80]">✓ Paid</span>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="w-full space-y-3"
          >
            <button
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-[#4ade80] to-[#22c55e] hover:from-[#22c55e] hover:to-[#16a34a] text-black py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Continue to Omniplex
              <img src={Arrow.src} alt="Arrow" className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="text-gray-400 text-sm">
                Thank you for choosing Omniplex Pro! 🚀
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
