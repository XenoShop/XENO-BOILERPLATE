type MeterProps = { value: number; max?: number; tone?: 'orange' | 'success' | 'amber' | 'danger' | 'info' }

export const Meter = ({ value, max = 100, tone = 'orange' }: MeterProps) => {
  const width = Math.max(0, Math.min(100, max === 0 ? 0 : (value / max) * 100))
  const colors = { orange: 'bg-ui-orange', success: 'bg-ui-success', amber: 'bg-ui-amber', danger: 'bg-ui-danger', info: 'bg-ui-info' }
  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800"
      role="progressbar"
      aria-valuenow={Math.round(width)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={`h-full rounded-full transition-all duration-500 ${colors[tone]}`} style={{ width: `${width}%` }} />
    </div>
  )
}
