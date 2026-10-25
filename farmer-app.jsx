// FarmDirect — Farmer mobile app
// Tabs: home (dashboard), listings, insights, orders, profile
// Plus modal flow: add crop (multi-step)

const { useState } = React;

const FARMER_TABS = [
  { id: 'home',     icon: 'home',     label: 'Home' },
  { id: 'listings', icon: 'grid',     label: 'Listings' },
  { id: 'insights', icon: 'sparkles', label: 'Insights' },
  { id: 'orders',   icon: 'truck',    label: 'Orders' },
  { id: 'profile',  icon: 'user',     label: 'Profile' },
];

function FarmerApp() {
  const [tab, setTab] = useState('home');
  const [addingCrop, setAddingCrop] = useState(false);

  return (
    <PhoneFrame>
      <StatusBar/>
      <div className="fd-scroll" style={{ flex: 1, overflow: 'auto', background: 'var(--fd-bg)' }}>
        {tab === 'home'     && <FarmerHome onAddCrop={() => setAddingCrop(true)} onNav={setTab}/>}
        {tab === 'listings' && <FarmerListings onAddCrop={() => setAddingCrop(true)}/>}
        {tab === 'insights' && <FarmerInsights/>}
        {tab === 'orders'   && <FarmerOrders/>}
        {tab === 'profile'  && <FarmerProfile/>}
      </div>
      <BottomNav tabs={FARMER_TABS} active={tab} onChange={setTab}/>
      {addingCrop && <AddCropSheet onClose={() => setAddingCrop(false)}/>}
    </PhoneFrame>
  );
}

// ─── HOME / DASHBOARD ─────────────────────────────────────────
function FarmerHome({ onAddCrop, onNav }) {
  return (
    <>
      {/* Greeting + verified badge */}
      <div style={{ padding: '10px 20px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'linear-gradient(135deg, #2f6b3a, #c9a227)',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--fd-serif)', fontSize: 18, fontWeight: 600,
        }}>R</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: 'var(--fd-ink-3)' }}>Namaste,</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--fd-ink)', display: 'flex', alignItems: 'center', gap: 6 }}>
            Ramesh Patil
            <span title="Verified" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 16, height: 16, borderRadius: '50%', background: 'var(--fd-primary)',
              color: '#fff',
            }}>
              <FDIcon name="check" size={11} stroke={3}/>
            </span>
          </div>
        </div>
        <button style={iconBtn}><FDIcon name="bell" size={18}/></button>
      </div>

      {/* Hero revenue card */}
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{
          borderRadius: 'var(--fd-r-lg)', padding: 20,
          background: 'linear-gradient(135deg, #2f6b3a 0%, #1f4a28 100%)',
          color: '#fff', position: 'relative', overflow: 'hidden',
          boxShadow: 'var(--fd-shadow-2)',
        }}>
          {/* subtle wheat-ear pattern */}
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ position: 'absolute', right: -20, top: -20, opacity: 0.12 }}>
            <path d="M60 10 L60 110 M60 30 Q40 40 30 30 M60 30 Q80 40 90 30 M60 50 Q40 60 30 50 M60 50 Q80 60 90 50 M60 70 Q40 80 30 70 M60 70 Q80 80 90 70 M60 90 Q40 100 30 90 M60 90 Q80 100 90 90" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
          <div style={{ fontSize: 11, opacity: 0.85, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 500 }}>
            This month's revenue
          </div>
          <div className="fd-num" style={{ fontFamily: 'var(--fd-serif)', fontSize: 40, fontWeight: 500, marginTop: 4, letterSpacing: -0.5 }}>
            ₹42,180
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6, fontSize: 13, opacity: 0.92 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 3, background: 'rgba(255,255,255,0.18)',
              padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 600,
            }}>
              <FDIcon name="up" size={11} stroke={2.5}/> 18.2%
            </span>
            <span>vs last month</span>
          </div>

          {/* mini KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 18, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.18)' }}>
            {[
              { l: 'Sold',      v: '1,450 kg' },
              { l: 'Remaining', v: '550 kg' },
              { l: 'Avg price', v: '₹28/kg' },
            ].map((k, i) => (
              <div key={i}>
                <div style={{ fontSize: 10, opacity: 0.7, textTransform: 'uppercase', letterSpacing: 0.6 }}>{k.l}</div>
                <div className="fd-num" style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{k.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ padding: '18px 20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <QuickAction icon="plus" label="Add new crop" onClick={onAddCrop} primary/>
        <QuickAction icon="chart" label="Market prices" onClick={() => onNav('insights')}/>
      </div>

      {/* AI insight card */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--fd-ink-3)', fontWeight: 600 }}>
            AI Suggestion
          </div>
          <span style={{ fontSize: 11, color: 'var(--fd-ink-3)' }}>Updated 2m ago</span>
        </div>
        <Card pad={0} style={{ overflow: 'hidden' }}>
          <div style={{
            padding: 16, display: 'flex', gap: 12, alignItems: 'flex-start',
            borderBottom: '1px solid var(--fd-line)',
            background: 'linear-gradient(180deg, var(--fd-primary-soft) 0%, var(--fd-surface) 100%)',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, background: 'var(--fd-primary)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <FDIcon name="sparkles" size={20}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--fd-serif)', fontSize: 17, fontWeight: 500, color: 'var(--fd-ink)', lineHeight: 1.25 }}>
                Hold your tomatoes 3–5 days.
              </div>
              <div style={{ fontSize: 13, color: 'var(--fd-ink-2)', marginTop: 4, lineHeight: 1.45 }}>
                Prices trending up. Pune market is paying <b>₹28/kg</b> — <b>₹3 more</b> than Nashik APMC.
              </div>
            </div>
          </div>
          <div style={{ padding: '10px 16px', display: 'flex', gap: 14, fontSize: 12, color: 'var(--fd-ink-2)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <FDIcon name="up" size={13} color="var(--fd-up)" stroke={2.4}/> Trend: rising
            </span>
            <span>·</span>
            <span>Demand: high</span>
            <span>·</span>
            <span>Confidence: 82%</span>
          </div>
        </Card>
      </div>

      {/* Active listings */}
      <div style={{ padding: '20px 20px 24px' }}>
        <SectionHeader title="Your active listings" action="See all" onAction={() => onNav('listings')}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FD_CROPS.slice(0, 2).map(c => <ListingRow key={c.id} crop={c}/>)}
        </div>
      </div>
    </>
  );
}

const iconBtn = {
  width: 36, height: 36, borderRadius: 12,
  background: 'var(--fd-surface)', border: '1px solid var(--fd-line)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
  color: 'var(--fd-ink)',
};

function QuickAction({ icon, label, onClick, primary }) {
  return (
    <button onClick={onClick} style={{
      background: primary ? 'var(--fd-ink)' : 'var(--fd-surface)',
      color: primary ? '#fff' : 'var(--fd-ink)',
      border: primary ? 'none' : '1px solid var(--fd-line)',
      borderRadius: 'var(--fd-r-md)', padding: '14px 14px',
      display: 'flex', alignItems: 'center', gap: 10,
      cursor: 'pointer', textAlign: 'left', font: 'inherit',
      boxShadow: primary ? 'var(--fd-shadow-1)' : 'none',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 10,
        background: primary ? 'var(--fd-primary)' : 'var(--fd-primary-soft)',
        color: primary ? '#fff' : 'var(--fd-primary-ink)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <FDIcon name={icon} size={18} stroke={2.2}/>
      </div>
      <span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
    </button>
  );
}

function SectionHeader({ title, action, onAction }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
      <div style={{ fontFamily: 'var(--fd-serif)', fontSize: 17, fontWeight: 500, color: 'var(--fd-ink)' }}>
        {title}
      </div>
      {action && (
        <button onClick={onAction} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontSize: 12, fontWeight: 600, color: 'var(--fd-primary)',
          display: 'flex', alignItems: 'center', gap: 3,
        }}>
          {action} <FDIcon name="arrow-right" size={12} stroke={2.4}/>
        </button>
      )}
    </div>
  );
}

function ListingRow({ crop }) {
  const series = FD_PRICE_SERIES[crop.id];
  return (
    <Card pad={12} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <ProduceSwatch crop={crop} size={48} radius={12}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--fd-ink)' }}>{crop.name}</span>
          <span style={{ fontSize: 11, color: 'var(--fd-ink-3)' }}>· {crop.grade}</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--fd-ink-2)', marginTop: 2 }}>
          {crop.quantity} {crop.unit} · Harvest {crop.harvest}
        </div>
      </div>
      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
        <div className="fd-num" style={{ fontSize: 15, fontWeight: 600, color: 'var(--fd-ink)' }}>
          ₹{crop.price}<span style={{ fontSize: 11, color: 'var(--fd-ink-3)', fontWeight: 400 }}>/{crop.unit}</span>
        </div>
        <Sparkline data={series} width={70} height={22} color={crop.trend === 'down' ? 'var(--fd-down)' : 'var(--fd-primary)'} stroke={1.5}/>
      </div>
    </Card>
  );
}

// ─── LISTINGS ─────────────────────────────────────────────────
function FarmerListings({ onAddCrop }) {
  return (
    <>
      <ScreenHeader title="My listings" subtitle="Marketplace"
        right={<button onClick={onAddCrop} style={{ ...iconBtn, background: 'var(--fd-ink)', color: '#fff', border: 'none' }}>
          <FDIcon name="plus" size={18} stroke={2.4}/>
        </button>}
      />
      <div style={{ padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {FD_CROPS.slice(0, 4).map(c => <ListingRow key={c.id} crop={c}/>)}
        <button onClick={onAddCrop} style={{
          padding: '14px', borderRadius: 'var(--fd-r-md)',
          border: '1.5px dashed var(--fd-line-2)', background: 'transparent',
          color: 'var(--fd-ink-2)', fontSize: 13, fontWeight: 500, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <FDIcon name="plus" size={16} stroke={2.2}/> List a new crop
        </button>
      </div>
    </>
  );
}

// ─── INSIGHTS (AI + markets) ──────────────────────────────────
function FarmerInsights() {
  const [cropId, setCropId] = useState('tomato');
  const crop = FD_CROPS.find(c => c.id === cropId);
  const series = FD_PRICE_SERIES[cropId];
  const markets = FD_MARKETS[cropId];
  const bestMarket = markets.find(m => m.best) || markets[0];

  return (
    <>
      <ScreenHeader title="Price intelligence" subtitle="AI insights"/>

      {/* Crop selector chips */}
      <div style={{ padding: '0 20px 12px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {FD_CROPS.map(c => {
          const on = c.id === cropId;
          return (
            <button key={c.id} onClick={() => setCropId(c.id)} style={{
              padding: '6px 12px', borderRadius: 999,
              background: on ? 'var(--fd-ink)' : 'var(--fd-surface)',
              color: on ? '#fff' : 'var(--fd-ink-2)',
              border: on ? 'none' : '1px solid var(--fd-line)',
              fontSize: 12, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
            }}>{c.name}</button>
          );
        })}
      </div>

      {/* Big price + chart card */}
      <div style={{ padding: '0 20px' }}>
        <Card pad={16}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--fd-ink-3)', fontWeight: 600 }}>
                Suggested price
              </div>
              <div className="fd-num" style={{ fontFamily: 'var(--fd-serif)', fontSize: 34, fontWeight: 500, color: 'var(--fd-ink)', lineHeight: 1 }}>
                ₹{crop.suggested}<span style={{ fontSize: 14, color: 'var(--fd-ink-3)' }}>/{crop.unit}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--fd-ink-2)', marginTop: 4 }}>
                Current: ₹{crop.price}/{crop.unit}
              </div>
            </div>
            <TrendPill trend={crop.trend} value={crop.changePct}/>
          </div>
          <div style={{ marginTop: 12 }}>
            <Sparkline data={series} width={310} height={80} color={crop.trend === 'down' ? 'var(--fd-down)' : 'var(--fd-primary)'}/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--fd-ink-3)', marginTop: 4 }}>
            <span>14 days ago</span><span>Today</span>
          </div>
        </Card>
      </div>

      {/* AI recommendation */}
      <div style={{ padding: '14px 20px 0' }}>
        <Card pad={14} style={{ borderColor: 'var(--fd-primary)', borderWidth: 1.5 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <FDIcon name="sparkles" size={20} color="var(--fd-primary)"/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, color: 'var(--fd-primary)', textTransform: 'uppercase' }}>
                Recommendation
              </div>
              <div style={{ fontFamily: 'var(--fd-serif)', fontSize: 16, fontWeight: 500, color: 'var(--fd-ink)', marginTop: 4, lineHeight: 1.3 }}>
                {crop.trend === 'up'
                  ? `Consider selling in ${bestMarket.name} — paying ₹${bestMarket.price - crop.price} more per ${crop.unit}.`
                  : crop.trend === 'down'
                    ? `Sell now — prices likely to keep dropping this week.`
                    : `Steady price. Sell at your convenience.`}
              </div>
              <div style={{ fontSize: 11, color: 'var(--fd-ink-3)', marginTop: 6 }}>
                Based on eNAM data, weather, and 3-year seasonal patterns.
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Nearby markets */}
      <div style={{ padding: '18px 20px 24px' }}>
        <SectionHeader title="Nearby markets"/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {markets.map((m, i) => (
            <Card key={i} pad={12} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              borderColor: m.best ? 'var(--fd-primary)' : 'var(--fd-line)',
              borderWidth: m.best ? 1.5 : 1,
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10,
                background: m.best ? 'var(--fd-primary)' : 'var(--fd-surface-2)',
                color: m.best ? '#fff' : 'var(--fd-ink-2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <FDIcon name="pin" size={16}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--fd-ink)' }}>{m.name}</span>
                  {m.best && <Chip tone="primary" size="sm">Best</Chip>}
                </div>
                <div style={{ fontSize: 11, color: 'var(--fd-ink-3)', marginTop: 2 }}>
                  {m.distance} km · Demand {m.demand}
                </div>
              </div>
              <div className="fd-num" style={{ fontSize: 14, fontWeight: 600, color: 'var(--fd-ink)', whiteSpace: 'nowrap' }}>
                ₹{m.price}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── ORDERS ───────────────────────────────────────────────────
function FarmerOrders() {
  const [selected, setSelected] = useState(null);
  if (selected) return <OrderDetail order={selected} onBack={() => setSelected(null)}/>;

  return (
    <>
      <ScreenHeader title="Orders" subtitle="Active & recent"/>
      <div style={{ padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {FD_ORDERS.map(o => {
          const crop = FD_CROPS.find(c => c.id === o.cropId);
          const done = o.stage === 6;
          return (
            <Card key={o.id} pad={14} onClick={() => setSelected(o)} style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <ProduceSwatch crop={crop} size={44} radius={12}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--fd-ink)' }}>{o.buyer}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--fd-ink-2)', marginTop: 2 }}>
                    {o.quantity} {o.unit} {crop.name} · {o.id}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="fd-num" style={{ fontSize: 14, fontWeight: 600 }}>{formatINRRaw(o.amount)}</div>
                  <div style={{ marginTop: 4 }}>
                    <Chip tone={done ? 'primary' : 'accent'} size="sm">{o.status}</Chip>
                  </div>
                </div>
              </div>
              {!done && <MiniProgress stage={o.stage}/>}
            </Card>
          );
        })}
      </div>
    </>
  );
}

function MiniProgress({ stage }) {
  const total = 6;
  return (
    <div style={{ display: 'flex', gap: 3, marginTop: 12 }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          flex: 1, height: 4, borderRadius: 2,
          background: i < stage ? 'var(--fd-primary)' : 'var(--fd-surface-2)',
        }}/>
      ))}
    </div>
  );
}

function OrderDetail({ order, onBack }) {
  const crop = FD_CROPS.find(c => c.id === order.cropId);
  return (
    <>
      <ScreenHeader title={order.id} subtitle="Order details" onBack={onBack}/>
      <div style={{ padding: '0 20px 24px' }}>
        <Card pad={16}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ProduceSwatch crop={crop} size={54} radius={14}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{crop.name}, {crop.grade}</div>
              <div style={{ fontSize: 12, color: 'var(--fd-ink-2)', marginTop: 2 }}>
                {order.quantity} {order.unit} · {order.buyer}
              </div>
            </div>
            <div className="fd-num" style={{ fontFamily: 'var(--fd-serif)', fontSize: 22, fontWeight: 500 }}>
              {formatINRRaw(order.amount)}
            </div>
          </div>
        </Card>

        <Card pad={16} style={{ marginTop: 12 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--fd-ink-3)', fontWeight: 600, marginBottom: 14 }}>
            Delivery timeline
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {FD_ORDER_STAGES.map((s, i) => {
              const done = i < order.stage, current = i === order.stage;
              return (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%',
                      background: done ? 'var(--fd-primary)' : current ? 'var(--fd-surface)' : 'var(--fd-surface-2)',
                      border: current ? '2px solid var(--fd-primary)' : done ? 'none' : '1px solid var(--fd-line)',
                      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {done && <FDIcon name="check" size={13} stroke={3}/>}
                      {current && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--fd-primary)' }}/>}
                    </div>
                    {i < FD_ORDER_STAGES.length - 1 && (
                      <div style={{ width: 2, height: 22, background: done ? 'var(--fd-primary)' : 'var(--fd-line)' }}/>
                    )}
                  </div>
                  <div style={{ paddingBottom: 12, flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: current ? 600 : 500,
                      color: done || current ? 'var(--fd-ink)' : 'var(--fd-ink-3)' }}>{s}</div>
                    {current && (
                      <div style={{ fontSize: 11, color: 'var(--fd-ink-2)', marginTop: 2 }}>
                        {order.eta}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card pad={16} style={{ marginTop: 12 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--fd-ink-3)', fontWeight: 600, marginBottom: 10 }}>
            Payment
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginTop: 4 }}>
            <span style={{ color: 'var(--fd-ink-2)' }}>Order value</span>
            <span className="fd-num" style={{ fontWeight: 500 }}>{formatINRRaw(order.amount)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginTop: 6 }}>
            <span style={{ color: 'var(--fd-ink-2)' }}>Platform fee (2%)</span>
            <span className="fd-num" style={{ fontWeight: 500 }}>−{formatINRRaw(Math.round(order.amount * 0.02))}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginTop: 6 }}>
            <span style={{ color: 'var(--fd-ink-2)' }}>Logistics</span>
            <span className="fd-num" style={{ fontWeight: 500 }}>−₹280</span>
          </div>
          <div style={{ borderTop: '1px dashed var(--fd-line)', margin: '10px 0' }}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Your payout</span>
            <span className="fd-num" style={{ fontFamily: 'var(--fd-serif)', fontSize: 22, fontWeight: 500, color: 'var(--fd-primary)' }}>
              {formatINRRaw(order.amount - Math.round(order.amount * 0.02) - 280)}
            </span>
          </div>
        </Card>
      </div>
    </>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────
function FarmerProfile() {
  return (
    <>
      <ScreenHeader title="Profile" subtitle="Verified farmer"/>
      <div style={{ padding: '0 20px 24px' }}>
        <Card pad={20}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'linear-gradient(135deg, #2f6b3a, #c9a227)',
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--fd-serif)', fontSize: 26, fontWeight: 500,
            }}>R</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--fd-ink)' }}>Ramesh Patil</div>
              <div style={{ fontSize: 12, color: 'var(--fd-ink-2)', marginTop: 2 }}>
                <FDIcon name="pin" size={11}/> Nashik, Maharashtra
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <Chip tone="primary" size="sm">
                  <FDIcon name="shield" size={11}/> Aadhaar verified
                </Chip>
                <Chip tone="gold" size="sm">
                  <FDIcon name="star" size={10}/> 4.8
                </Chip>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 20, paddingTop: 18, borderTop: '1px solid var(--fd-line)' }}>
            <ProfileStat label="Total sold" value="14.2 T"/>
            <ProfileStat label="Orders" value="86"/>
            <ProfileStat label="Since" value="2024"/>
          </div>
        </Card>

        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            { icon: 'leaf',    label: 'My farms & crops', sub: '2 farms · 12 acres' },
            { icon: 'wallet',  label: 'Payments & bank',  sub: 'HDFC ****4218' },
            { icon: 'phone',   label: 'Contact & support', sub: '24/7 helpline' },
            { icon: 'globe',   label: 'Language',         sub: 'English · हिन्दी' },
            { icon: 'settings',label: 'Settings',         sub: 'Notifications, privacy' },
          ].map((r, i) => (
            <div key={i} style={{
              background: 'var(--fd-surface)', padding: '14px 16px',
              borderRadius: i === 0 ? '14px 14px 0 0' : i === 4 ? '0 0 14px 14px' : 0,
              display: 'flex', alignItems: 'center', gap: 12,
              borderBottom: i < 4 ? '1px solid var(--fd-line)' : 'none',
              border: '1px solid var(--fd-line)',
              borderTop: i === 0 ? '1px solid var(--fd-line)' : 'none',
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10, background: 'var(--fd-primary-soft)',
                color: 'var(--fd-primary-ink)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <FDIcon name={r.icon} size={17}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--fd-ink)' }}>{r.label}</div>
                <div style={{ fontSize: 11, color: 'var(--fd-ink-3)', marginTop: 1 }}>{r.sub}</div>
              </div>
              <FDIcon name="arrow-right" size={16} color="var(--fd-ink-3)"/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ProfileStat({ label, value }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="fd-num" style={{ fontFamily: 'var(--fd-serif)', fontSize: 20, fontWeight: 500, color: 'var(--fd-ink)' }}>{value}</div>
      <div style={{ fontSize: 10, color: 'var(--fd-ink-3)', marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</div>
    </div>
  );
}

// ─── ADD CROP SHEET ───────────────────────────────────────────
function AddCropSheet({ onClose }) {
  const [step, setStep] = useState(1);
  const [cropId, setCropId] = useState('tomato');
  const [qty, setQty] = useState(500);
  const [grade, setGrade] = useState('A');
  const [price, setPrice] = useState(25);
  const crop = FD_CROPS.find(c => c.id === cropId);

  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'rgba(26,46,34,0.4)',
      display: 'flex', alignItems: 'flex-end', zIndex: 10,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', background: 'var(--fd-bg)',
        borderRadius: '24px 24px 0 0',
        padding: '10px 0 20px', maxHeight: '92%',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 -8px 32px rgba(0,0,0,0.16)',
      }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--fd-line-2)', margin: '4px auto 8px' }}/>
        <div style={{ padding: '4px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--fd-ink-3)', fontWeight: 600 }}>
              Step {step} of 3
            </div>
            <div style={{ fontFamily: 'var(--fd-serif)', fontSize: 22, fontWeight: 500, color: 'var(--fd-ink)' }}>
              {step === 1 ? 'Pick a crop' : step === 2 ? 'Quantity & grade' : 'Price & review'}
            </div>
          </div>
          <button onClick={onClose} style={iconBtn}>✕</button>
        </div>

        {/* progress */}
        <div style={{ padding: '0 20px 16px', display: 'flex', gap: 6 }}>
          {[1,2,3].map(n => (
            <div key={n} style={{ flex: 1, height: 4, borderRadius: 2, background: n <= step ? 'var(--fd-primary)' : 'var(--fd-surface-2)' }}/>
          ))}
        </div>

        <div className="fd-scroll" style={{ flex: 1, overflow: 'auto', padding: '0 20px' }}>
          {step === 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {FD_CROPS.map(c => {
                const on = c.id === cropId;
                return (
                  <button key={c.id} onClick={() => setCropId(c.id)} style={{
                    padding: 14, borderRadius: 'var(--fd-r-md)',
                    background: 'var(--fd-surface)',
                    border: on ? '2px solid var(--fd-primary)' : '1px solid var(--fd-line)',
                    cursor: 'pointer', textAlign: 'left', font: 'inherit',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <ProduceSwatch crop={c} size={40} radius={10}/>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fd-ink)' }}>{c.name}</div>
                      <div className="fd-num" style={{ fontSize: 11, color: 'var(--fd-ink-2)', marginTop: 2 }}>
                        ~₹{c.price}/{c.unit}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <Label>Quantity ({crop.unit})</Label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--fd-surface)', border: '1px solid var(--fd-line)', borderRadius: 12, padding: '10px 14px' }}>
                  <button onClick={() => setQty(Math.max(1, qty - 50))} style={qtyBtn}>−</button>
                  <input type="text" value={qty} onChange={e => setQty(+e.target.value || 0)} className="fd-num" style={{
                    flex: 1, border: 'none', outline: 'none', textAlign: 'center', background: 'transparent',
                    fontFamily: 'var(--fd-serif)', fontSize: 24, color: 'var(--fd-ink)',
                  }}/>
                  <button onClick={() => setQty(qty + 50)} style={qtyBtn}>+</button>
                </div>
              </div>

              <div>
                <Label>Quality grade</Label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['A', 'B', 'C'].map(g => {
                    const on = grade === g;
                    return (
                      <button key={g} onClick={() => setGrade(g)} style={{
                        flex: 1, padding: '12px', borderRadius: 12,
                        background: on ? 'var(--fd-ink)' : 'var(--fd-surface)',
                        color: on ? '#fff' : 'var(--fd-ink)',
                        border: on ? 'none' : '1px solid var(--fd-line)',
                        cursor: 'pointer', fontSize: 14, fontWeight: 500,
                      }}>Grade {g}</button>
                    );
                  })}
                </div>
              </div>

              <div>
                <Label>Harvest date</Label>
                <div style={{ padding: '12px 14px', border: '1px solid var(--fd-line)', borderRadius: 12, background: 'var(--fd-surface)', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <FDIcon name="calendar" size={16} color="var(--fd-ink-2)"/>
                  <span style={{ fontSize: 14, color: 'var(--fd-ink)' }}>15 Sep 2026</span>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <Label>Your asking price (₹ per {crop.unit})</Label>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, background: 'var(--fd-surface)', border: '1px solid var(--fd-line)', borderRadius: 12, padding: '14px 16px' }}>
                  <span style={{ fontSize: 22, color: 'var(--fd-ink-3)', fontFamily: 'var(--fd-serif)' }}>₹</span>
                  <input type="text" value={price} onChange={e => setPrice(+e.target.value || 0)} className="fd-num" style={{
                    flex: 1, border: 'none', outline: 'none', background: 'transparent',
                    fontFamily: 'var(--fd-serif)', fontSize: 30, color: 'var(--fd-ink)',
                  }}/>
                  <span style={{ fontSize: 13, color: 'var(--fd-ink-3)' }}>/{crop.unit}</span>
                </div>
              </div>

              <Card pad={14} style={{ background: 'var(--fd-primary-soft)', borderColor: 'var(--fd-primary)' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <FDIcon name="sparkles" size={18} color="var(--fd-primary-ink)"/>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--fd-primary-ink)' }}>
                      AI suggestion: ₹{crop.suggested}/{crop.unit}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--fd-ink-2)', marginTop: 4 }}>
                      Based on last 14 days at Nashik APMC + Pune Wholesale.
                      Your price is <b style={{ color: price >= crop.suggested ? 'var(--fd-primary-ink)' : 'var(--fd-danger)' }}>
                        {price >= crop.suggested ? '₹' + (price - crop.suggested) + ' above' : '₹' + (crop.suggested - price) + ' below'}
                      </b> suggested.
                    </div>
                  </div>
                </div>
              </Card>

              <Card pad={14}>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--fd-ink-3)', fontWeight: 600, marginBottom: 10 }}>Summary</div>
                <SumRow k="Crop" v={`${crop.name}, Grade ${grade}`}/>
                <SumRow k="Quantity" v={`${qty} ${crop.unit}`}/>
                <SumRow k="Price" v={`₹${price} / ${crop.unit}`}/>
                <div style={{ borderTop: '1px dashed var(--fd-line)', margin: '10px 0' }}/>
                <SumRow k="Est. gross" v={<span className="fd-num" style={{ fontFamily: 'var(--fd-serif)', fontSize: 20, color: 'var(--fd-primary)', fontWeight: 500 }}>
                  {formatINRRaw(price * qty)}
                </span>} bold/>
              </Card>
            </div>
          )}
        </div>

        <div style={{ padding: '14px 20px 0', display: 'flex', gap: 10 }}>
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} style={{
              flex: 1, padding: 14, borderRadius: 14,
              background: 'var(--fd-surface)', color: 'var(--fd-ink)',
              border: '1px solid var(--fd-line)', cursor: 'pointer',
              fontSize: 14, fontWeight: 600,
            }}>Back</button>
          )}
          <button onClick={() => step < 3 ? setStep(step + 1) : onClose()} style={{
            flex: 2, padding: 14, borderRadius: 14,
            background: 'var(--fd-ink)', color: '#fff', border: 'none', cursor: 'pointer',
            fontSize: 14, fontWeight: 600,
          }}>
            {step < 3 ? 'Continue' : 'List for sale'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Label({ children }) {
  return <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--fd-ink-3)', fontWeight: 600, marginBottom: 8 }}>{children}</div>;
}
const qtyBtn = {
  width: 32, height: 32, borderRadius: 8, background: 'var(--fd-surface-2)',
  border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--fd-ink)',
};
function SumRow({ k, v, bold }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '5px 0' }}>
      <span style={{ fontSize: 13, color: 'var(--fd-ink-2)' }}>{k}</span>
      <span className="fd-num" style={{ fontSize: 14, color: 'var(--fd-ink)', fontWeight: bold ? 600 : 500 }}>{v}</span>
    </div>
  );
}

Object.assign(window, { FarmerApp });
