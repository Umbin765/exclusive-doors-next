export default function GermanBadge() {
  return (
    <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-md border border-white/60">
      {/* German flag — three horizontal stripes */}
      <span className="inline-flex flex-col overflow-hidden rounded-sm" style={{ width: 22, height: 14 }}>
        <span className="flex-1 bg-black" />
        <span className="flex-1 bg-[#DD0000]" />
        <span className="flex-1 bg-[#FFCE00]" />
      </span>
      <span className="text-[0.5625rem] font-bold tracking-[0.12em] uppercase text-gray-800 leading-none whitespace-nowrap">
        Made in Germany
      </span>
    </div>
  );
}
