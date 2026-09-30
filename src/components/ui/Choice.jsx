export const fieldLabel = 'mb-2 block text-xs font-bold tracking-[0.15em] uppercase'

export default function Choice({ name, legend, options, value, onChange, className = '' }) {
  return (
    <fieldset className={className}>
      <legend className={fieldLabel}>{legend}</legend>
      <div className="flex gap-2">
        {options.map((option) => (
          <label key={option} className="flex-1">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="peer sr-only"
            />
            <span className="flex min-h-11 cursor-pointer items-center justify-center rounded-full border-2 border-cocoa px-4 text-center font-bold shadow-hard transition-colors peer-checked:bg-cocoa peer-checked:text-cream peer-focus-visible:outline-3 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-cocoa peer-[:not(:checked)]:bg-white peer-[:not(:checked)]:hover:bg-gold">
              {option}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
