"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiRequest } from "@/utils/api";
import { useAuth } from "./AuthContext";
import { Sitter, SitterContextType } from '../types/sitter';

interface SitterProviderProps {
  children: ReactNode;
}
const SitterContext = createContext<SitterContextType | undefined>(undefined);

export function SitterProvider({ children }: SitterProviderProps) {
  const { user, loading } = useAuth();
  const [isSitter, setIsSitter] = useState<boolean>(false);
  const [sitterData, setSitterData] = useState<any | null>(null);

  // This function calls the /sitters endpoint and checks if the logged‑in user has a sitter profile.
  const refreshSitterStatus = async () => {
    if (!user) {
      setIsSitter(false);
      setSitterData(null);
      return;
    }

    try {
      const data = await apiRequest("/sitters/profile");
      // Assume the response is like { sitters: [ ... ] }
      if (data) {
        // if data it means that the user logged is also a sitter,
        // otherwise it returns sitter not found.
          setIsSitter(true);
          setSitterData(data.sitter);
      } else {
        // In case the data format is different.
        setIsSitter(false);
        setSitterData(null);
      }
    } catch (err) {
      console.error("Error refreshing sitter status:", err);
    }
  };

  // When the user changes (or finishes loading), refresh the sitter status.
  useEffect(() => {
    if (!loading && user) {
      refreshSitterStatus();
    }
  }, [user, loading]);

  return (
    <SitterContext.Provider
      value={{ isSitter, setIsSitter, sitterData, refreshSitterStatus }}
    >
      {children}
    </SitterContext.Provider>
  );
}

// Custom hook to use the SitterContext
export function useSitter(): SitterContextType {
  const context = useContext(SitterContext);
  if (context === undefined) {
    throw new Error("useSitter must be used within a SitterProvider");
  }
  return context;
}
