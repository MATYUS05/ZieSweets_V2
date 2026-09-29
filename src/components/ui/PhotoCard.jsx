export default function PhotoCard({ src, alt, tilt = 0, caption, className = '', imgClassName = '', ...imgProps }) {
  return (
    <figure
      style={{ '--tilt': `${tilt}deg` }}
      className={`rotate-(--tilt) border-2 border-cocoa bg-white p-2.5 shadow-hard-lg ${className}`}
    >
      <img src={src} alt={alt} className={`w-full border-2 border-cocoa object-cover ${imgClassName}`} {...imgProps} />
      {caption && <figcaption className="font-display px-1 pt-3 pb-1 text-lg italic">{caption}</figcaption>}
    </figure>
  )
}
