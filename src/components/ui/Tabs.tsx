type TabsProps<T extends string> = { value: T; onChange: (value: T) => void; items: { value: T; label: string; count?: number }[] }

export function Tabs<T extends string>({ value, onChange, items }: TabsProps<T>) {
  return (
    <div role="tablist" className="inline-flex flex-wrap gap-0.5 rounded-xl border border-white/[0.07] bg-black/25 p-1">
      {items.map((item) => (
        <button
          key={item.value}
          role="tab"
          aria-selected={value === item.value}
          onClick={() => onChange(item.value)}
          className={`rounded-lg px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
            value === item.value ? 'bg-white/10 text-white shadow-[inset_0_-2px_0_0_#FF7A1A]' : 'text-zinc-400 hover:text-zinc-100'
          }`}
        >
          {item.label}
          {item.count !== undefined && <span className="ml-1.5 text-zinc-500">{item.count}</span>}
        </button>
      ))}
    </div>
  )
}
