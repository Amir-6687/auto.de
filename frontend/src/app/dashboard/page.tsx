import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

export default function Dashboard() {
  return (
    <div
      className="w-full h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/car-background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10">
        <Navbar />
        <HeroSection />
      </div>
    </div>
  );
}
