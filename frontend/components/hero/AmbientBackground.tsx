"use client";

export default function AmbientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Orb 1 - Indigo/Purple - Top Right */}
      <div
        className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full opacity-100 dark:opacity-100"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.3), transparent)",
          filter: "blur(80px)",
          animation: "orb-float-1 20s ease-in-out infinite",
        }}
      />

      {/* Orb 2 - Teal - Bottom Left */}
      <div
        className="absolute -bottom-12 -left-12 w-[400px] h-[400px] rounded-full opacity-40 dark:opacity-100"
        style={{
          background: "radial-gradient(circle, rgba(20,184,166,0.25), transparent)",
          filter: "blur(80px)",
          animation: "orb-float-2 25s ease-in-out infinite",
        }}
      />

      {/* Orb 3 - Small Indigo - Center Right */}
      <div
        className="absolute top-1/2 right-1/4 w-[250px] h-[250px] rounded-full opacity-40 dark:opacity-100"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.3), transparent)",
          filter: "blur(60px)",
          animation: "orb-pulse 8s ease-in-out infinite",
        }}
      />
    </div>
  );
}
