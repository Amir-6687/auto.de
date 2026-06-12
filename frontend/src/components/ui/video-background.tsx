"use client";

export default function VideoBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/login-auto.de.mp4" type="video/mp4" />
      </video>

      {/* لایه تار روی ویدیو */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/30"></div>
    </div>
  );
}
