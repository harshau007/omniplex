"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserDetailsState } from "@/store/authSlice";
import { Modal, ModalContent } from "@nextui-org/modal";
import toast from "react-hot-toast";

import styles from "./ProPlan.module.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ProPlan = (props: Props) => {
  const userDetails = useSelector(selectUserDetailsState);
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userDetails.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      size="md"
      className="p-5"
    >
      <ModalContent>
        <div className={styles.list}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>Pro Plan</div>
          </div>
          <div className={styles.listContainer}>
            <div className={styles.planContainer}>
              <div className={styles.planHeader}>
                <div className={styles.planTitle}>Upgrade to Pro</div>
                <div className={styles.planPrice}>$10</div>
              </div>

              <div className={styles.featuresList}>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>✓</div>
                  <div className={styles.featureText}>
                    Unlimited AI conversations
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>✓</div>
                  <div className={styles.featureText}>
                    Advanced search capabilities
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>✓</div>
                  <div className={styles.featureText}>Priority support</div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>✓</div>
                  <div className={styles.featureText}>
                    Enhanced plugins access
                  </div>
                </div>
              </div>

              <div className={styles.bottomContainer}>
                <button
                  onClick={handlePurchase}
                  disabled={loading}
                  className={`${styles.purchaseButton} ${
                    loading ? styles.loading : ""
                  }`}
                >
                  {loading ? "Processing..." : "Purchase Pro Plan"}
                </button>
                <div onClick={props.onClose} className={styles.cancelButton}>
                  Cancel
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ProPlan;
