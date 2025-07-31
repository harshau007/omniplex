"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

import Arrow from "../../../../public/svgs/Arrow.svg";
import CrossRed from "../../../../public/svgs/CrossRed.svg";

const PaymentCancel = () => {
  const router = useRouter();

  React.useEffect(() => {
    toast.error("Payment was cancelled");
  }, []);

  const handleTryAgain = () => {
    router.push("/");
  };

  const handleGoToProfile = () => {
    router.push("/");
  };

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
            className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-6 shadow-lg"
          >
            <img src={CrossRed.src} alt="Cancel" className="w-10 h-10" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-white mb-3"
          >
            Payment Cancelled
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 mb-6 text-lg"
          >
            No worries! You can upgrade to{" "}
            <span className="text-[#4ade80] font-semibold">Pro Plan</span>{" "}
            anytime. Your account remains unchanged.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-lg p-4 mb-6 border border-red-500/30"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="text-red-400 font-semibold">
                Payment Not Completed
              </div>
            </div>
            <div className="text-white text-sm">
              {`You can try again whenever you're ready`}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="w-full space-y-3"
          >
            <button
              onClick={handleTryAgain}
              className="w-full bg-[#2e2e2e] hover:bg-[#ffffff14] text-white py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg border border-[#ffffff14] hover:border-[#4ade80]/50"
            >
              Back to Omniplex
              <img src={Arrow.src} alt="Arrow" className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="text-gray-400 text-sm mb-3">
                Want to try again? Visit your profile to upgrade.
              </div>
              <button
                onClick={handleGoToProfile}
                className="text-[#4ade80] hover:text-[#22c55e] font-medium transition-colors duration-200"
              >
                Go to Profile →
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentCancel;
