// FarmDirect — Mobile shell: status bar, bottom nav, container
// Uses our own chrome (not the starter AppBar) for cohesive branding.

function StatusBar({ tone = 'light' }) {
  const c = tone === 'dark' ? '#fff' : 'var(--fd-ink)';
  return (
    <div style={{
      height: 34, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 22px',
      position: 'relative', flexShrink: 0,
      fontFamily: 'var(--fd-sans)',
    }}>
      <span className="fd-num" style={{ fontSize: 14, fontWeight: 600, color: c }}>9:41</span>
      <div style={{
        position: 'absolute', left: '50%', top: 6, transform: 'translateX(-50%)',
        width: 92, height: 22, borderRadius: 12, background: '#111',
      }}/>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: c }}>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor"><path d="M1 7.5a9 9 0 0 1 13 0l-1 1a7.5 7.5 0 0 0-11 0l-1-1zM3 9.5a6 6 0 0 1 9 0l-1 1a4.5 4.5 0 0 0-7 0l-1-1zM6.5 11a2 2 0 1 1 2 0h-2z"/></svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor"><rect x="1" y="1" width="12" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2"/><rect x="3" y="3" width="9" height="5" rx="1"/><rect x="14" y="4" width="1.5" height="3" rx="0.5"/></svg>
      </div>
    </div>
  );
}

function BottomNav({ tabs, active, onChange }) {
  return (
    <div style={{
      flexShrink: 0, background: 'var(--fd-surface)',
      borderTop: '1px solid var(--fd-line)',
      padding: '8px 8px 10px',
      display: 'flex', justifyContent: 'space-around',
    }}>
      {tabs.map(t => {
        const on = active === t.id;
        return (
          <button key={t.id} onClick={() => onChange(t.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            background: 'transparent', border: 'none', cursor: 'pointer',
            padding: '6px 12px', borderRadius: 12,
            color: on ? 'var(--fd-primary)' : 'var(--fd-ink-3)',
          }}>
            <FDIcon name={t.icon} size={22} stroke={on ? 2.2 : 1.6}/>
            <span style={{ fontSize: 10.5, fontWeight: on ? 600 : 500, letterSpacing: 0.2 }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// Simple phone chrome (no top app bar — each screen has its own header)
function PhoneFrame({ children, width = 390, height = 820 }) {
  return (
    <div style={{
      width, height, borderRadius: 44, overflow: 'hidden',
      background: 'var(--fd-bg)',
      border: '10px solid #1a1a1a',
      boxShadow: '0 40px 100px rgba(26,46,34,0.28), 0 8px 24px rgba(26,46,34,0.16)',
      display: 'flex', flexDirection: 'column', boxSizing: 'border-box',
      position: 'relative',
    }}>
      {children}
    </div>
  );
}

// Screen header — page title + optional back/action
function ScreenHeader({ title, subtitle, onBack, right, transparent }) {
  return (
    <div style={{
      padding: '10px 20px 12px',
      display: 'flex', alignItems: 'center', gap: 10,
      background: transparent ? 'transparent' : 'var(--fd-bg)',
      flexShrink: 0,
    }}>
      {onBack && (
        <button onClick={onBack} style={{
          width: 36, height: 36, borderRadius: 12,
          background: 'var(--fd-surface)', border: '1px solid var(--fd-line)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          color: 'var(--fd-ink)',
        }}>
          <FDIcon name="arrow-left" size={18} stroke={2}/>
        </button>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        {subtitle && <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, color: 'var(--fd-ink-3)', textTransform: 'uppercase' }}>{subtitle}</div>}
        <div style={{ fontFamily: 'var(--fd-serif)', fontSize: 22, fontWeight: 500, color: 'var(--fd-ink)', lineHeight: 1.15 }}>{title}</div>
      </div>
      {right}
    </div>
  );
}

Object.assign(window, { StatusBar, BottomNav, PhoneFrame, ScreenHeader });
