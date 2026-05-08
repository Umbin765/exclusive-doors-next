interface Props {
  percent: number;
  className?: string;
}

export default function SaleBadge({ percent, className = '' }: Props) {
  return (
    <div
      className={`flex flex-col items-start bg-gray-900 border border-accent/30 rounded-lg px-4 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.35)] ${className}`}
    >
      <span className="text-2xl font-black leading-none tracking-tight text-accent">
        −{percent}%
      </span>
      <span className="text-[0.5rem] font-bold tracking-[0.3em] uppercase text-accent/60 mt-1">
        reducere
      </span>
    </div>
  );
}
