"use client";

import Link from "next/link";

const gradientColors = {
  teal: "#00C6A2",
  blue: "#00A3FF",
  navy: "#0F2544",
  navyLight: "#1A3A6E",
};

type LogoVariant = "full" | "compact";

export function Logo({
  variant = "compact",
  href = "/",
  className = "",
  showLink = true,
}: {
  variant?: LogoVariant;
  href?: string;
  className?: string;
  showLink?: boolean;
}) {
  const content =
    variant === "full" ? (
      <FullLogo className={className} />
    ) : (
      <CompactLogo className={className} />
    );

  if (showLink && href) {
    return (
      <Link href={href} className={`inline-flex items-center ${className}`}>
        {content}
      </Link>
    );
  }
  return <span className={`inline-flex items-center ${className}`}>{content}</span>;
}

function FullLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 480 160"
      className={`h-14 w-auto sm:h-16 ${className}`}
      aria-label="tradeinvoice — Quotes · Invoices · Business"
    >
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradientColors.navy} />
          <stop offset="100%" stopColor={gradientColors.navyLight} />
        </linearGradient>
        <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradientColors.teal} />
          <stop offset="100%" stopColor={gradientColors.blue} />
        </linearGradient>
        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={gradientColors.teal} />
          <stop offset="100%" stopColor={gradientColors.blue} />
        </linearGradient>
        <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={gradientColors.teal} />
          <stop offset="100%" stopColor={gradientColors.blue} />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor={gradientColors.teal} floodOpacity="0.3" />
        </filter>
      </defs>
      <rect x="0" y="0" width="480" height="160" rx="20" ry="20" fill="url(#bgGrad)" />
      <line x1="0" y1="40" x2="480" y2="40" stroke="#fff" strokeOpacity="0.03" strokeWidth="1" />
      <line x1="0" y1="80" x2="480" y2="80" stroke="#fff" strokeOpacity="0.03" strokeWidth="1" />
      <line x1="0" y1="120" x2="480" y2="120" stroke="#fff" strokeOpacity="0.03" strokeWidth="1" />
      <line x1="120" y1="0" x2="120" y2="160" stroke="#fff" strokeOpacity="0.03" strokeWidth="1" />
      <line x1="240" y1="0" x2="240" y2="160" stroke="#fff" strokeOpacity="0.03" strokeWidth="1" />
      <line x1="360" y1="0" x2="360" y2="160" stroke="#fff" strokeOpacity="0.03" strokeWidth="1" />
      <g transform="translate(32, 28)" filter="url(#shadow)">
        <rect x="0" y="8" width="72" height="90" rx="8" ry="8" fill="url(#iconGrad)" opacity="0.15" />
        <rect x="0" y="8" width="72" height="90" rx="8" ry="8" fill="none" stroke="url(#iconGrad)" strokeWidth="2" />
        <path d="M50,8 L72,30 L50,30 Z" fill="url(#iconGrad)" opacity="0.4" />
        <path d="M50,8 L72,30 L50,30 Z" fill="none" stroke="url(#iconGrad)" strokeWidth="1.5" />
        <line x1="12" y1="42" x2="44" y2="42" stroke="url(#iconGrad)" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
        <line x1="12" y1="55" x2="54" y2="55" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        <line x1="12" y1="67" x2="48" y2="67" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        <line x1="12" y1="79" x2="38" y2="79" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
        <g filter="url(#glow)" transform="translate(44, 60)">
          <line x1="0" y1="22" x2="0" y2="0" stroke="url(#iconGrad)" strokeWidth="3" strokeLinecap="round" />
          <polyline points="-7,10 0,0 7,10" fill="none" stroke="url(#iconGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      <text x="130" y="95" fontFamily="Georgia, 'Times New Roman', serif" fontSize="52" fontWeight="700" letterSpacing="3" fill="#fff">
        TRADE
      </text>
      <text x="130" y="130" fontFamily="Georgia, 'Times New Roman', serif" fontSize="28" fontWeight="400" letterSpacing="10" fill="url(#textGrad)">
        INVOICE
      </text>
      <rect x="130" y="100" width="310" height="2" rx="1" fill="url(#accentGrad)" opacity="0.5" />
      <text x="132" y="150" fontFamily="'Courier New', monospace" fontSize="11" letterSpacing="2" fill="#fff" opacity="0.35">
        QUOTES · INVOICES · BUSINESS
      </text>
    </svg>
  );
}

function CompactLogo({ className = "" }: { className?: string }) {
  const teal = gradientColors.teal;
  const blue = gradientColors.blue;
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {/* Document + arrow icon */}
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0F2544]">
        <svg viewBox="0 0 72 106" className="h-6 w-6" fill="none">
          <rect x="0" y="8" width="72" height="90" rx="8" fill={teal} opacity="0.25" />
          <rect x="0" y="8" width="72" height="90" rx="8" fill="none" stroke={teal} strokeWidth="2" />
          <path d="M50 8L72 30H50V8Z" fill={blue} opacity="0.5" />
          <line x1="12" y1="42" x2="44" y2="42" stroke={teal} strokeWidth="2" strokeLinecap="round" opacity="0.9" />
          <line x1="12" y1="55" x2="54" y2="55" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <line x1="12" y1="67" x2="48" y2="67" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          <g transform="translate(36, 68)">
            <line x1="0" y1="14" x2="0" y2="0" stroke={teal} strokeWidth="2.5" strokeLinecap="round" />
            <polyline points="-5,7 0,0 5,7" fill="none" stroke={teal} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </span>
      {/* Wordmark */}
      <span className="flex flex-col leading-tight">
        <span className="font-serif text-lg font-bold tracking-tight text-[#0F2544] sm:text-xl">trade</span>
        <span
          className="text-sm font-normal tracking-widest sm:text-base"
          style={{
            background: `linear-gradient(90deg, ${gradientColors.teal}, ${gradientColors.blue})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          invoice
        </span>
      </span>
    </span>
  );
}
