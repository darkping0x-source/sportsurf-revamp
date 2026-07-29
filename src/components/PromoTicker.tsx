const ANNOUNCEMENTS = [
  "FREE SITE VISIT & CONSULTATION ACROSS INDIA",
  "ISO 9001:2015 CERTIFIED",
  "FLAT 10% OFF ON FIRST PROJECT",
  "PREMIUM SPORTS SURFACES & EQUIPMENT",
];

export default function PromoTicker() {
  const items = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS];

  return (
    <div className="flex h-9 items-center overflow-hidden bg-navy text-white">
      <div className="flex h-full shrink-0 items-center bg-gold pr-1 pl-4 text-xs font-bold tracking-wider text-navy uppercase sm:pl-6 lg:pl-8">
        Latest Updates
      </div>
      <div
        aria-hidden="true"
        className="h-0 w-0 shrink-0 border-y-[18px] border-y-transparent border-l-[14px] border-l-gold"
      />
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
