"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BootScreen() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/terminal");
    }, 3000); // Simulate boot time
  }, []);

  return <div>Booting Lumon OS...</div>;
}