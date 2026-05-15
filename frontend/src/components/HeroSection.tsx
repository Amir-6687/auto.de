"use client";

function HeroSection() {
  return (
    <div className="h-[20vh] flex flex-col justify-center items-center text-center text-white px-6">

      <h2
        style={{ fontFamily: "'Bungee', sans-serif", fontWeight: 400 }}
        className="text-4xl sm:text-6xl mb-4"
      >
        Find Your Perfect Car
      </h2>

      <p
        style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300 }}
        className="text-lg sm:text-xl max-w-2xl mb-8"
      >
        Explore thousands of listings with advanced filters and real-time updates.
      </p>
    </div>
  );
}

export default HeroSection;