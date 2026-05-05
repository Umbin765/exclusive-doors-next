interface Props {
  percent: number;
  className?: string;
}

export default function SaleBadge({ percent, className = '' }: Props) {
  return (
    <div
      className={`flex flex-col items-start bg-gray-900 border border-accent/30 rounded-lg px-3 py-1.5 shadow-lg ${className}`}
    >
      <span className="text-xl font-black leading-none tracking-tight text-accent">
        −{percent}%
      </span>
      <span className="text-[0.4375rem] font-bold tracking-[0.3em] uppercase text-accent/55 mt-0.5">
        reducere
      </span>
    </div>
  );
}
