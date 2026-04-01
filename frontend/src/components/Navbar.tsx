"use client";

function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 text-white">
      <h1 className="text-2xl font-bold">Auto-DE</h1>

      <ul className="flex gap-6 items-center">
        <li><a href="/dashboard">Home</a></li>
        <li><a href="/cars">Cars</a></li>
        <li><a href="/contact">Contact</a></li>

        {/* 🔥 لینک Admin */}
        <li><a href="/admin">Admin</a></li>

        {/* Logout */}
        <li>
          <button
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              window.location.href = "/";
            }}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
