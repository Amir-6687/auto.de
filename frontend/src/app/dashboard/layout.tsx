export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white p-6">
          <h2 className="text-xl font-bold mb-6">Auto-DE Admin</h2>
  
          <nav className="space-y-4">
            <a href="/dashboard" className="block hover:text-gray-300">Dashboard</a>
            <a href="/dashboard/cars" className="block hover:text-gray-300">Car Listings</a>
            <a href="/dashboard/cars/new" className="block hover:text-gray-300">Add New Car</a>
          </nav>
        </aside>
  
        {/* Main content */}
        <main className="flex-1 bg-gray-100 p-8">
          {children}
        </main>
      </div>
    );
  }

  