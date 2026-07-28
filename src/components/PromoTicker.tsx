const ANNOUNCEMENTS = [
  "FREE SITE VISIT & CONSULTATION ACROSS INDIA",
  "ISO 9001:2015 CERTIFIED",
  "FLAT 10% OFF ON FIRST PROJECT",
  "PREMIUM SPORTS SURFACES & EQUIPMENT",
];

export default function PromoTicker() {
  const items = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS];

  return (
    <div className="flex items-stretch overflow-hidden bg-navy text-white">
      <div className="shrink-0 bg-gold px-4 py-2 text-xs font-bold tracking-wider text-navy uppercase">
        Latest Updates
      </div>
      <div className="flex flex-1 items-center overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-10 py-2 whitespace-nowrap">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-10 text-xs font-medium tracking-wide">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-gold" />}
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
