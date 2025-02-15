// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex">
        <aside className="w-64 p-4 bg-gray-800 text-white">Menú</aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    );
  }
  