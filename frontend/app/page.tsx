// 📂 frontend/app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/notes"); // go to notes dashboard if logged in
    } else {
      router.push("/login"); // else redirect to login
    }
  }, [router]);

  return (
    <main className="flex items-center justify-center min-h-screen">
      <h1 className="text-xl font-semibold text-gray-600">
        Loading...
      </h1>
    </main>
  );
}
