"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthState, setUserDetailsState } from "@/store/authSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);
          
          let isPro = false;
          if (userDoc.exists()) {
            const userData = userDoc.data();
            isPro = userData.isPro || false;
          }

          dispatch(setAuthState(true));
          dispatch(
            setUserDetailsState({
              uid: user.uid,
              name: user.displayName ?? "",
              email: user.email ?? "",
              profilePic: user.photoURL ?? "",
              isPro: isPro,
            })
          );
        } catch (error) {
          console.error("Error fetching user data:", error);
          dispatch(setAuthState(true));
          dispatch(
            setUserDetailsState({
              uid: user.uid,
              name: user.displayName ?? "",
              email: user.email ?? "",
              profilePic: user.photoURL ?? "",
              isPro: false,
            })
          );
        }
      } else {
        console.log("User is signed out");
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthWrapper;
