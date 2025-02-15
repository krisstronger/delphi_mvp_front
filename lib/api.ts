// lib/api.ts
export async function getDashboardData() {
    const response = await fetch("/api/dashboard", { cache: "no-store" });
    return response.json();
  }
  