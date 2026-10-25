// FarmDirect — Admin/analytics web dashboard (desktop)

function AdminDashboard() {
  const p = FD_PLATFORM;
  return (
    <div style={{
      width: 1200, height: 820, background: 'var(--fd-bg)',
      display: 'grid', gridTemplateColumns: '220px 1fr', overflow: 'hidden',
    }}>
      {/* Sidebar */}
      <div style={{
        background: 'var(--fd-ink)', color: '#e8ede9',
        padding: '22px 16px', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 6px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--fd-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FDIcon name="leaf" size={17} color="#fff"/>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--fd-serif)', fontSize: 17, fontWeight: 500, color: '#fff', lineHeight: 1 }}>FarmDirect</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1, marginTop: 3 }}>Admin console</div>
          </div>
        </div>

        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            { icon: 'chart', label: 'Overview', on: true },
            { icon: 'user', label: 'Farmers' },
            { icon: 'cart', label: 'Buyers' },
            { icon: 'package', label: 'Orders' },
            { icon: 'sparkles', label: 'Price intelligence' },
            { icon: 'truck', label: 'Logistics' },
            { icon: 'wallet', label: 'Payouts' },
            { icon: 'globe', label: 'Markets & eNAM' },
          ].map((r, i) => (
            <div key={i} style={{
              padding: '9px 12px', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10,
              background: r.on ? 'rgba(47,107,58,0.30)' : 'transparent',
              color: r.on ? '#fff' : 'rgba(255,255,255,0.7)',
              fontSize: 13, fontWeight: r.on ? 600 : 500, cursor: 'pointer',
            }}>
              <FDIcon name={r.icon} size={16} stroke={r.on ? 2.2 : 1.7}/>
              {r.label}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', padding: '14px 12px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--fd-gold)', color: '#4b3a08', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>A</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, color: '#fff', fontWeight: 500 }}>Anjali Kumar</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>Ops · Maharashtra</div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ overflow: 'auto', padding: '20px 28px 28px' }}>
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--fd-ink-3)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>Overview</div>
            <div style={{ fontFamily: 'var(--fd-serif)', fontSize: 26, fontWeight: 500 }}>
              Platform performance <span style={{ color: 'var(--fd-ink-3)', fontWeight: 400 }}>· Last 30 days</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ padding: '8px 14px', border: '1px solid var(--fd-line)', borderRadius: 10, background: 'var(--fd-surface)', fontSize: 12, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <FDIcon name="calendar" size={13}/> Sep 2026
            </button>
            <button style={{ padding: '8px 14px', border: 'none', borderRadius: 10, background: 'var(--fd-ink)', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              Export report
            </button>
          </div>
        </div>

        {/* KPI row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          <KPICard label="Gross merchandise value" value={formatINR(p.gmv)} delta={p.gmvDeltaPct} spark={p.gmvSeries} tone="primary"/>
          <KPICard label="Active farmers" value={p.activeFarmers.toLocaleString('en-IN')} delta={p.farmersDelta / p.activeFarmers * 100} unit="onboarded"/>
          <KPICard label="Active buyers"  value={p.activeBuyers.toLocaleString('en-IN')} delta={p.buyersDelta / p.activeBuyers * 100} unit="onboarded"/>
          <KPICard label="Orders today"   value={p.ordersToday.toLocaleString('en-IN')} delta={p.ordersDelta / p.ordersToday * 100} unit="fulfilled"/>
        </div>

        {/* Row 2: GMV chart + Top crops */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, marginTop: 12 }}>
          <Card pad={20}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <div>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--fd-ink-3)', fontWeight: 600 }}>Marketplace volume</div>
                <div style={{ fontFamily: 'var(--fd-serif)', fontSize: 20, fontWeight: 500, marginTop: 2 }}>
                  16-week GMV trend
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {['1w', '4w', '16w', 'YTD'].map((t, i) => (
                  <div key={t} style={{
                    padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 500,
                    background: i === 2 ? 'var(--fd-ink)' : 'var(--fd-surface-2)',
                    color: i === 2 ? '#fff' : 'var(--fd-ink-2)', cursor: 'pointer',
                  }}>{t}</div>
                ))}
              </div>
            </div>
            <BigLineChart data={p.gmvSeries}/>
          </Card>

          <Card pad={20}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--fd-ink-3)', fontWeight: 600 }}>Top crops by revenue</div>
            <div style={{ fontFamily: 'var(--fd-serif)', fontSize: 20, fontWeight: 500, marginTop: 2, marginBottom: 14 }}>
              What's moving
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {p.topCrops.map((c, i) => (
                <HBar key={i} label={c.name} value={c.share} max={25} suffix="%" tone={i === 0 ? 'accent' : 'primary'}/>
              ))}
            </div>
          </Card>
        </div>

        {/* Row 3: Regions + Live orders */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
          <Card pad={20}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--fd-ink-3)', fontWeight: 600 }}>Regional activity</div>
            <div style={{ fontFamily: 'var(--fd-serif)', fontSize: 20, fontWeight: 500, marginTop: 2, marginBottom: 14 }}>
              Farmers & GMV by state
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr 90px 90px', gap: 8, fontSize: 10, color: 'var(--fd-ink-3)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600, padding: '0 0 8px', borderBottom: '1px solid var(--fd-line)' }}>
              <div>State</div><div>Share</div><div style={{ textAlign: 'right' }}>Farmers</div><div style={{ textAlign: 'right' }}>GMV</div>
            </div>
            {p.regions.map((r, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '110px 1fr 90px 90px', gap: 8, alignItems: 'center', padding: '9px 0', borderBottom: i < p.regions.length - 1 ? '1px solid var(--fd-line)' : 'none' }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{r.state}</div>
                <div style={{ height: 6, background: 'var(--fd-surface-2)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: (r.gmv / 342000 * 100) + '%', height: '100%', background: 'var(--fd-primary)' }}/>
                </div>
                <div className="fd-num" style={{ fontSize: 12, fontWeight: 500, textAlign: 'right' }}>{r.farmers}</div>
                <div className="fd-num" style={{ fontSize: 12, fontWeight: 600, textAlign: 'right' }}>{formatINR(r.gmv)}</div>
              </div>
            ))}
          </Card>

          <Card pad={20}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--fd-ink-3)', fontWeight: 600 }}>Live orders</div>
                <div style={{ fontFamily: 'var(--fd-serif)', fontSize: 20, fontWeight: 500, marginTop: 2 }}>
                  In-flight transactions
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--fd-primary)', fontWeight: 500 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--fd-primary)', animation: 'pulse 2s infinite' }}/>
                Live
              </div>
            </div>
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column' }}>
              {FD_ORDERS.map((o, i) => {
                const crop = FD_CROPS.find(c => c.id === o.cropId);
                const done = o.stage === 6;
                return (
                  <div key={o.id} style={{
                    display: 'grid', gridTemplateColumns: '1fr 90px 100px 80px',
                    gap: 10, alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: i < FD_ORDERS.length - 1 ? '1px solid var(--fd-line)' : 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                      <ProduceSwatch crop={crop} size={30} radius={7}/>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.buyer}</div>
                        <div style={{ fontSize: 10, color: 'var(--fd-ink-3)', marginTop: 1 }}>{o.id} · {o.quantity} {o.unit}</div>
                      </div>
                    </div>
                    <div className="fd-num" style={{ fontSize: 12, fontWeight: 600, textAlign: 'right' }}>{formatINRRaw(o.amount)}</div>
                    <div><Chip tone={done ? 'primary' : 'accent'} size="sm">{o.status}</Chip></div>
                    <div style={{ fontSize: 10, color: 'var(--fd-ink-3)', textAlign: 'right' }}>{o.placed}</div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Row 4: AI predictions strip */}
        <Card pad={20} style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--fd-ink-3)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                <FDIcon name="sparkles" size={12} color="var(--fd-primary)"/> AI Price predictions · 7 day forecast
              </div>
              <div style={{ fontFamily: 'var(--fd-serif)', fontSize: 20, fontWeight: 500, marginTop: 2 }}>
                Where the market is heading
              </div>
            </div>
            <div style={{ fontSize: 11, color: 'var(--fd-ink-3)' }}>Trained on eNAM + 3y seasonal · Confidence 78%</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
            {FD_CROPS.map(c => (
              <div key={c.id} style={{ padding: 14, border: '1px solid var(--fd-line)', borderRadius: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ProduceSwatch crop={c} size={28} radius={7}/>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 8 }}>
                  <span className="fd-num" style={{ fontFamily: 'var(--fd-serif)', fontSize: 20, fontWeight: 500 }}>₹{c.suggested}</span>
                  <span style={{ fontSize: 10, color: 'var(--fd-ink-3)' }}>/{c.unit}</span>
                </div>
                <div style={{ marginTop: 6 }}>
                  <TrendPill trend={c.trend} value={c.changePct} size="sm"/>
                </div>
                <div style={{ marginTop: 8, opacity: 0.85 }}>
                  <Sparkline data={FD_PRICE_SERIES[c.id]} width={140} height={28} color={c.trend === 'down' ? 'var(--fd-down)' : 'var(--fd-primary)'} stroke={1.5}/>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function KPICard({ label, value, delta, unit, spark, tone = 'neutral' }) {
  const up = delta >= 0;
  return (
    <Card pad={18}>
      <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--fd-ink-3)', fontWeight: 600 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 8 }}>
        <span className="fd-num" style={{ fontFamily: 'var(--fd-serif)', fontSize: 30, fontWeight: 500, letterSpacing: -0.4 }}>{value}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
        <TrendPill trend={up ? 'up' : 'down'} value={delta} size="sm"/>
        {unit && <span style={{ fontSize: 11, color: 'var(--fd-ink-3)' }}>{unit}</span>}
      </div>
      {spark && (
        <div style={{ marginTop: 10 }}>
          <Sparkline data={spark} width={230} height={40} color="var(--fd-primary)" stroke={1.8}/>
        </div>
      )}
    </Card>
  );
}

function BigLineChart({ data }) {
  const w = 700, h = 200, pad = 24;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const step = (w - pad * 2) / (data.length - 1);
  const pts = data.map((v, i) => [pad + i * step, pad + (h - pad * 2) * (1 - (v - min) / range)]);
  const path = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = path + ` L ${pts[pts.length - 1][0]} ${h - pad} L ${pts[0][0]} ${h - pad} Z`;
  const gridY = [0.25, 0.5, 0.75];

  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block', marginTop: 10 }}>
      <defs>
        <linearGradient id="gmvGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--fd-primary)" stopOpacity="0.22"/>
          <stop offset="1" stopColor="var(--fd-primary)" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {gridY.map((g, i) => (
        <line key={i} x1={pad} x2={w - pad} y1={pad + (h - pad * 2) * g} y2={pad + (h - pad * 2) * g}
          stroke="var(--fd-line)" strokeDasharray="3 3"/>
      ))}
      <path d={area} fill="url(#gmvGrad)"/>
      <path d={path} fill="none" stroke="var(--fd-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 4 : 0} fill="var(--fd-primary)"/>
      ))}
      {pts.map((p, i) => (
        i % 4 === 0 && (
          <text key={'x' + i} x={p[0]} y={h - 6} textAnchor="middle" style={{ fontSize: 10, fill: 'var(--fd-ink-3)' }}>W{i + 1}</text>
        )
      ))}
    </svg>
  );
}

Object.assign(window, { AdminDashboard });
