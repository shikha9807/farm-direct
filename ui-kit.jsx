// FarmDirect — shared UI kit
// Icons (inline SVG), Sparkline, Chip, Stat, ProduceSwatch, TrendPill

const FDIcon = ({ name, size = 20, stroke = 1.75, color = 'currentColor' }) => {
  const props = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: color, strokeWidth: stroke,
    strokeLinecap: 'round', strokeLinejoin: 'round',
  };
  switch (name) {
    case 'leaf':      return <svg {...props}><path d="M11 20A7 7 0 0 1 4 13c0-6 8-9 16-9 0 8-3 16-9 16z"/><path d="M2 22c1-4 4-8 9-10"/></svg>;
    case 'bell':      return <svg {...props}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>;
    case 'search':    return <svg {...props}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>;
    case 'plus':      return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case 'home':      return <svg {...props}><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/></svg>;
    case 'grid':      return <svg {...props}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
    case 'chart':     return <svg {...props}><path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/></svg>;
    case 'user':      return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>;
    case 'truck':     return <svg {...props}><rect x="1" y="6" width="14" height="10" rx="1"/><path d="M15 9h4l3 4v3h-7"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>;
    case 'cart':      return <svg {...props}><path d="M3 4h2l2.4 12.5a2 2 0 0 0 2 1.5h8.2a2 2 0 0 0 2-1.6L21 8H6"/><circle cx="9" cy="21" r="1"/><circle cx="18" cy="21" r="1"/></svg>;
    case 'up':        return <svg {...props}><path d="m6 14 6-6 6 6"/></svg>;
    case 'down':      return <svg {...props}><path d="m6 10 6 6 6-6"/></svg>;
    case 'flat':      return <svg {...props}><path d="M5 12h14"/></svg>;
    case 'sparkles':  return <svg {...props}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/></svg>;
    case 'pin':       return <svg {...props}><path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></svg>;
    case 'star':      return <svg {...props} fill="currentColor" stroke="none"><path d="M12 2l3 6.6L22 10l-5.2 4.6L18 22l-6-3.4L6 22l1.2-7.4L2 10l7-1.4L12 2z"/></svg>;
    case 'check':     return <svg {...props}><path d="M5 12l4 4 10-10"/></svg>;
    case 'shield':    return <svg {...props}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="m9 12 2 2 4-4"/></svg>;
    case 'calendar':  return <svg {...props}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>;
    case 'clock':     return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'arrow-right': return <svg {...props}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'arrow-left':  return <svg {...props}><path d="M19 12H5M11 6l-6 6 6 6"/></svg>;
    case 'phone':     return <svg {...props}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2z"/></svg>;
    case 'rupee':     return <svg {...props}><path d="M6 4h12M6 8h12M9 4c3 0 5 1.5 5 4s-2 4-5 4H6l8 8"/></svg>;
    case 'package':   return <svg {...props}><path d="M21 8 12 3 3 8v8l9 5 9-5V8z"/><path d="m3 8 9 5 9-5M12 13v8"/></svg>;
    case 'filter':    return <svg {...props}><path d="M3 5h18l-7 8v6l-4 2v-8L3 5z"/></svg>;
    case 'globe':     return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    case 'wallet':    return <svg {...props}><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M17 15h.01"/></svg>;
    case 'settings':  return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>;
    default: return null;
  }
};

// Sparkline chart
function Sparkline({ data, width = 120, height = 36, color = 'var(--fd-primary)', fill = true, stroke = 2 }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const w = width, h = height, pad = 2;
  const step = (w - pad * 2) / (data.length - 1);
  const pts = data.map((v, i) => [pad + i * step, pad + (h - pad * 2) * (1 - (v - min) / range)]);
  const path = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = path + ` L ${pts[pts.length - 1][0]} ${h} L ${pts[0][0]} ${h} Z`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      {fill && <path d={area} fill={color} opacity="0.14"/>}
      <path d={path} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.5" fill={color}/>
    </svg>
  );
}

// Trend pill: ↑ 8.4%
function TrendPill({ trend, value, size = 'md' }) {
  const isUp = trend === 'up', isFlat = trend === 'flat';
  const color = isFlat ? 'var(--fd-ink-2)' : isUp ? 'var(--fd-up)' : 'var(--fd-down)';
  const bg = isFlat ? 'var(--fd-surface-2)' : isUp ? 'var(--fd-primary-soft)' : 'var(--fd-accent-soft)';
  const icon = isFlat ? 'flat' : isUp ? 'up' : 'down';
  const padY = size === 'sm' ? 2 : 4, padX = size === 'sm' ? 6 : 8, fs = size === 'sm' ? 11 : 12;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      background: bg, color, padding: `${padY}px ${padX}px`,
      borderRadius: 999, fontSize: fs, fontWeight: 600,
      fontVariantNumeric: 'tabular-nums',
    }}>
      <FDIcon name={icon} size={size === 'sm' ? 11 : 13} stroke={2.4}/>
      {Math.abs(value).toFixed(1)}%
    </span>
  );
}

// Chip
function Chip({ children, tone = 'neutral', size = 'md' }) {
  const styles = {
    neutral:  { bg: 'var(--fd-surface-2)', fg: 'var(--fd-ink-2)' },
    primary:  { bg: 'var(--fd-primary-soft)', fg: 'var(--fd-primary-ink)' },
    accent:   { bg: 'var(--fd-accent-soft)', fg: '#8a4113' },
    gold:     { bg: 'var(--fd-gold-soft)', fg: '#6a5410' },
  }[tone];
  const padY = size === 'sm' ? 2 : 4;
  const padX = size === 'sm' ? 8 : 10;
  const fs = size === 'sm' ? 11 : 12;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: styles.bg, color: styles.fg,
      padding: `${padY}px ${padX}px`, borderRadius: 999,
      fontSize: fs, fontWeight: 500, letterSpacing: 0.1,
    }}>{children}</span>
  );
}

// Colored produce swatch — SVG placeholder with a symbolic shape
function ProduceSwatch({ crop, size = 56, radius = 14 }) {
  const c = crop.color || '#2f6b3a';
  return (
    <div style={{
      width: size, height: size, borderRadius: radius,
      background: `linear-gradient(135deg, ${c}22, ${c}44)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', flexShrink: 0,
      border: '1px solid rgba(0,0,0,0.05)',
    }}>
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 40 40">
        <circle cx="20" cy="22" r="14" fill={c} opacity="0.85"/>
        <path d="M18 8c2 2 4 2 6 0 0 4-3 6-6 6s-3-4 0-6z" fill="#3e8e2a" opacity="0.9"/>
      </svg>
      <div style={{
        position: 'absolute', bottom: 3, right: 4,
        fontFamily: 'var(--fd-mono)', fontSize: 7,
        color: 'rgba(0,0,0,0.35)', letterSpacing: 0.5,
      }}>{crop.emoji}</div>
    </div>
  );
}

// Stat block
function Stat({ label, value, unit, delta, tone = 'primary' }) {
  return (
    <div>
      <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--fd-ink-3)', fontWeight: 500 }}>
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
        <span className="fd-num" style={{ fontFamily: 'var(--fd-serif)', fontSize: 26, fontWeight: 500, color: 'var(--fd-ink)' }}>
          {value}
        </span>
        {unit && <span style={{ fontSize: 12, color: 'var(--fd-ink-2)' }}>{unit}</span>}
      </div>
      {delta != null && (
        <div style={{ marginTop: 4 }}>
          <TrendPill trend={delta >= 0 ? 'up' : 'down'} value={delta} size="sm"/>
        </div>
      )}
    </div>
  );
}

// Bar chart (horizontal)
function HBar({ label, value, max, tone = 'primary', suffix }) {
  const pct = Math.max(4, Math.min(100, (value / max) * 100));
  const bg = tone === 'accent' ? 'var(--fd-accent)' : 'var(--fd-primary)';
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 70px', alignItems: 'center', gap: 10 }}>
      <div style={{ fontSize: 13, color: 'var(--fd-ink-2)' }}>{label}</div>
      <div style={{ height: 8, background: 'var(--fd-surface-2)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ width: pct + '%', height: '100%', background: bg, borderRadius: 4 }}/>
      </div>
      <div className="fd-num" style={{ fontSize: 13, color: 'var(--fd-ink)', textAlign: 'right', fontWeight: 500 }}>
        {value}{suffix || ''}
      </div>
    </div>
  );
}

// Card wrapper
function Card({ children, style, pad = 16, elevate = 1 }) {
  const shadow = elevate === 0 ? 'none' : elevate === 2 ? 'var(--fd-shadow-2)' : 'var(--fd-shadow-1)';
  return (
    <div style={{
      background: 'var(--fd-surface)', borderRadius: 'var(--fd-r-md)',
      padding: pad, boxShadow: shadow, border: '1px solid var(--fd-line)',
      ...style,
    }}>{children}</div>
  );
}

function formatINR(n) {
  if (n == null) return '';
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + ' Cr';
  if (n >= 100000)   return '₹' + (n / 100000).toFixed(2) + ' L';
  if (n >= 1000)     return '₹' + (n / 1000).toFixed(1) + 'k';
  return '₹' + n.toLocaleString('en-IN');
}
function formatINRRaw(n) {
  return '₹' + n.toLocaleString('en-IN');
}

Object.assign(window, { FDIcon, Sparkline, TrendPill, Chip, ProduceSwatch, Stat, HBar, Card, formatINR, formatINRRaw });
