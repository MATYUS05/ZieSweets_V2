export default function SelectField({ className = '', selectClassName = '', children, ...props }) {
  return (
    <span className={`relative block ${className}`}>
      <select {...props} className={`field select-pill cursor-pointer appearance-none pr-11 pl-5 ${selectClassName}`}>
        {children}
      </select>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 text-sm transition-[rotate]"
      >
        ▼
      </span>
    </span>
  )
}
