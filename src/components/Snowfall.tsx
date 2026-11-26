const FLAKES = [
  { left: '4%', size: 5, duration: 14, delay: 0 },
  { left: '11%', size: 4, duration: 18, delay: 3 },
  { left: '19%', size: 6, duration: 15, delay: 1 },
  { left: '27%', size: 4, duration: 20, delay: 5 },
  { left: '35%', size: 5, duration: 16, delay: 2 },
  { left: '44%', size: 3, duration: 19, delay: 7 },
  { left: '53%', size: 6, duration: 13, delay: 4 },
  { left: '62%', size: 4, duration: 17, delay: 0 },
  { left: '70%', size: 5, duration: 15, delay: 6 },
  { left: '78%', size: 4, duration: 21, delay: 2 },
  { left: '86%', size: 6, duration: 16, delay: 4 },
  { left: '94%', size: 4, duration: 18, delay: 1 },
];

export function Snowfall() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
    >
      {FLAKES.map((flake, idx) => (
        <span
          key={idx}
          className="snowflake-particle absolute top-0 rounded-full bg-[#C59B48]/35 shadow-[0_0_6px_rgba(255,255,255,0.65)]"
          style={{
            left: flake.left,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
