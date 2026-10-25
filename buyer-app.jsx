// FarmDirect — Buyer mobile app
// Tabs: browse, search, cart, orders, profile

const BUYER_TABS = [
  { id: 'browse',  icon: 'home',   label: 'Browse' },
  { id: 'search',  icon: 'search', label: 'Search' },
  { id: 'cart',    icon: 'cart',   label: 'Cart' },
  { id: 'orders',  icon: 'truck',  label: 'Orders' },
  { id: 'profile', icon: 'user',   label: 'Account' },
];

function BuyerApp() {
  const [tab, setTab] = React.useState('browse');
  const [selected, setSelected] = React.useState(null); // crop for detail
  const [checkout, setCheckout] = React.useState(null); // { crop, qty }
  const [cart, setCart] = React.useState([]);

  const addToCart = (crop, qty) => {
    setCart(prev => [...prev, { crop, qty, id: Date.now() }]);
  };

  return (
    <PhoneFrame>
      <StatusBar/>
      <div className="fd-scroll" style={{ flex: 1, overflow: 'auto', background: 'var(--fd-bg)' }}>
        {selected && !checkout && (
          <CropDetail crop={selected} onBack={() => setSelected(null)}
            onBuy={(qty) => setCheckout({ crop: selected, qty })}
            onAdd={(qty) => { addToCart(selected, qty); setSelected(null); }}/>
        )}
        {checkout && (
          <Checkout {...checkout} onBack={() => setCheckout(null)}
            onDone={() => { setCheckout(null); setSelected(null); setTab('orders'); }}/>
        )}
        {!selected && !checkout && tab === 'browse'  && <BuyerBrowse onSelect={setSelected}/>}
        {!selected && !checkout && tab === 'search'  && <BuyerSearch onSelect={setSelected}/>}
        {!selected && !checkout && tab === 'cart'    && <BuyerCart cart={cart} onCheckout={(item) => setCheckout(item)} onRemove={(id) => setCart(cart.filter(c => c.id !== id))}/>}
        {!selected && !checkout && tab === 'orders'  && <BuyerOrders/>}
        {!selected && !checkout && tab === 'profile' && <BuyerProfile/>}
      </div>
      <BottomNav tabs={BUYER_TABS} active={tab} onChange={t => { setSelected(null); setCheckout(null); setTab(t); }}/>
    </PhoneFrame>
  );
}

// ─── BROWSE ───────────────────────────────────────────────────
function BuyerBrowse({ onSelect }) {
  const [cat, setCat] = React.useState('all');
  const cats = [
    { id: 'all', label: 'All' },
    { id: 'veg', label: 'Vegetables' },
    { id: 'grain', label: 'Grains' },
    { id: 'spice', label: 'Spices' },
  ];
  return (
    <>
      {/* Header */}
      <div style={{ padding: '10px 20px 4px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: 'var(--fd-ink-3)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <FDIcon name="pin" size={11}/> Delivering to <b style={{ color: 'var(--fd-ink)' }}>Pune, MH</b>
          </div>
          <div style={{ fontFamily: 'var(--fd-serif)', fontSize: 22, fontWeight: 500, color: 'var(--fd-ink)', marginTop: 2 }}>
            Fresh from the farm
          </div>
        </div>
        <button style={iconBtn}><FDIcon name="bell" size={18}/></button>
      </div>

      {/* Search bar */}
      <div style={{ padding: '8px 20px 0' }}>
        <div style={{
          background: 'var(--fd-surface)', border: '1px solid var(--fd-line)',
          borderRadius: 14, padding: '10px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <FDIcon name="search" size={17} color="var(--fd-ink-3)"/>
          <span style={{ flex: 1, fontSize: 13, color: 'var(--fd-ink-3)' }}>Search tomato, onion, wheat…</span>
          <FDIcon name="filter" size={17} color="var(--fd-ink-3)"/>
        </div>
      </div>

      {/* Category chips */}
      <div style={{ padding: '14px 20px 0', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {cats.map(c => {
          const on = c.id === cat;
          return (
            <button key={c.id} onClick={() => setCat(c.id)} style={{
              padding: '6px 12px', borderRadius: 999,
              background: on ? 'var(--fd-ink)' : 'var(--fd-surface)',
              color: on ? '#fff' : 'var(--fd-ink-2)',
              border: on ? 'none' : '1px solid var(--fd-line)',
              fontSize: 12, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
            }}>{c.label}</button>
          );
        })}
      </div>

      {/* Featured price banner */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{
          borderRadius: 'var(--fd-r-lg)', overflow: 'hidden',
          background: 'linear-gradient(135deg, #f6e2cf, #f2e7be)',
          padding: 18, display: 'flex', alignItems: 'center', gap: 14,
          border: '1px solid var(--fd-line)',
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: '#8a4113', fontWeight: 600 }}>
              Today's market
            </div>
            <div style={{ fontFamily: 'var(--fd-serif)', fontSize: 20, fontWeight: 500, color: 'var(--fd-ink)', marginTop: 4, lineHeight: 1.2 }}>
              Onions up 12% — grab from farm before the rise.
            </div>
          </div>
          <ProduceSwatch crop={FD_CROPS[1]} size={54} radius={14}/>
        </div>
      </div>

      {/* Grid of listings */}
      <div style={{ padding: '20px 20px 0' }}>
        <SectionHeader title="Verified farmers near you" action="Map view"/>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {FD_CROPS.map(c => (
            <CropCard key={c.id} crop={c} onClick={() => onSelect(c)}/>
          ))}
        </div>
      </div>
      <div style={{ height: 24 }}/>
    </>
  );
}

function CropCard({ crop, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: 'var(--fd-surface)', border: '1px solid var(--fd-line)',
      borderRadius: 'var(--fd-r-md)', padding: 12, cursor: 'pointer',
      textAlign: 'left', font: 'inherit', display: 'flex', flexDirection: 'column',
      gap: 8, boxShadow: 'var(--fd-shadow-1)',
    }}>
      <div style={{ position: 'relative' }}>
        <div style={{
          height: 90, borderRadius: 10, overflow: 'hidden',
          background: `linear-gradient(135deg, ${crop.color}22, ${crop.color}44)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
        }}>
          <svg width="60" height="60" viewBox="0 0 40 40">
            <circle cx="20" cy="22" r="14" fill={crop.color} opacity="0.85"/>
            <path d="M18 8c2 2 4 2 6 0 0 4-3 6-6 6s-3-4 0-6z" fill="#3e8e2a" opacity="0.9"/>
          </svg>
          <div style={{
            position: 'absolute', top: 6, left: 6, background: 'rgba(255,255,255,0.9)',
            borderRadius: 6, padding: '2px 6px', fontSize: 10, fontWeight: 600, color: 'var(--fd-primary-ink)',
            display: 'flex', alignItems: 'center', gap: 3,
          }}>
            <FDIcon name="shield" size={9} stroke={2.4}/> Verified
          </div>
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--fd-ink)' }}>{crop.name}</span>
          <TrendPill trend={crop.trend} value={crop.changePct} size="sm"/>
        </div>
        <div style={{ fontSize: 11, color: 'var(--fd-ink-2)', marginTop: 2 }}>
          {crop.village.split(',')[0]} · {crop.distanceKm} km
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 2 }}>
        <div className="fd-num" style={{ fontFamily: 'var(--fd-serif)', fontSize: 20, fontWeight: 500, color: 'var(--fd-ink)' }}>
          ₹{crop.price}<span style={{ fontSize: 11, color: 'var(--fd-ink-3)', fontWeight: 400 }}>/{crop.unit}</span>
        </div>
        <span style={{ fontSize: 10, color: 'var(--fd-ink-3)', display: 'flex', alignItems: 'center', gap: 2 }}>
          <FDIcon name="star" size={10} color="var(--fd-gold)"/> {crop.rating}
        </span>
      </div>
    </button>
  );
}

// ─── SEARCH ───────────────────────────────────────────────────
function BuyerSearch({ onSelect }) {
  const [q, setQ] = React.useState('');
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxDist, setMaxDist] = React.useState(400);
  const [gradeFilter, setGradeFilter] = React.useState('any');

  const results = FD_CROPS.filter(c =>
    (!q || c.name.toLowerCase().includes(q.toLowerCase())) &&
    c.price >= minPrice && c.distanceKm <= maxDist &&
    (gradeFilter === 'any' || c.grade.includes(gradeFilter))
  );

  return (
    <>
      <ScreenHeader title="Search & filter" subtitle="Marketplace"/>
      <div style={{ padding: '0 20px 12px' }}>
        <div style={{ background: 'var(--fd-surface)', border: '1px solid var(--fd-line)', borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <FDIcon name="search" size={17} color="var(--fd-ink-3)"/>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search crops…" style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 14, color: 'var(--fd-ink)', fontFamily: 'inherit',
          }}/>
        </div>
      </div>

      <div style={{ padding: '0 20px 8px' }}>
        <Card pad={14}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--fd-ink-3)', fontWeight: 600, marginBottom: 10 }}>Filters</div>
          <FilterRow label="Grade">
            {['any', 'A', 'B'].map(g => (
              <button key={g} onClick={() => setGradeFilter(g)} style={{
                padding: '5px 12px', borderRadius: 999,
                background: gradeFilter === g ? 'var(--fd-ink)' : 'var(--fd-surface-2)',
                color: gradeFilter === g ? '#fff' : 'var(--fd-ink-2)',
                border: 'none', fontSize: 12, cursor: 'pointer', fontWeight: 500,
              }}>{g === 'any' ? 'Any' : `Grade ${g}`}</button>
            ))}
          </FilterRow>
          <FilterRow label="Max distance">
            <input type="range" min="20" max="500" step="20" value={maxDist} onChange={e => setMaxDist(+e.target.value)} style={{ flex: 1, accentColor: 'var(--fd-primary)' }}/>
            <span className="fd-num" style={{ fontSize: 12, fontWeight: 600, minWidth: 50, textAlign: 'right' }}>{maxDist} km</span>
          </FilterRow>
          <FilterRow label="Min price">
            <input type="range" min="0" max="100" step="5" value={minPrice} onChange={e => setMinPrice(+e.target.value)} style={{ flex: 1, accentColor: 'var(--fd-primary)' }}/>
            <span className="fd-num" style={{ fontSize: 12, fontWeight: 600, minWidth: 50, textAlign: 'right' }}>₹{minPrice}</span>
          </FilterRow>
        </Card>
      </div>

      <div style={{ padding: '10px 20px 24px' }}>
        <div style={{ fontSize: 11, color: 'var(--fd-ink-3)', margin: '4px 0 10px' }}>
          {results.length} {results.length === 1 ? 'result' : 'results'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {results.map(c => (
            <Card key={c.id} pad={12} onClick={() => onSelect(c)} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
              <ProduceSwatch crop={c} size={48} radius={12}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{c.name} <span style={{ fontSize: 11, color: 'var(--fd-ink-3)', fontWeight: 400 }}>· {c.grade}</span></div>
                <div style={{ fontSize: 11, color: 'var(--fd-ink-2)', marginTop: 2 }}>
                  {c.farmer} · {c.distanceKm} km
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="fd-num" style={{ fontSize: 15, fontWeight: 600 }}>₹{c.price}<span style={{ fontSize: 10, color: 'var(--fd-ink-3)' }}>/{c.unit}</span></div>
                <div style={{ marginTop: 4 }}><TrendPill trend={c.trend} value={c.changePct} size="sm"/></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

function FilterRow({ label, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
      <div style={{ width: 90, fontSize: 12, color: 'var(--fd-ink-2)' }}>{label}</div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>{children}</div>
    </div>
  );
}

// ─── CROP DETAIL ──────────────────────────────────────────────
function CropDetail({ crop, onBack, onBuy, onAdd }) {
  const [qty, setQty] = React.useState(50);
  const series = FD_PRICE_SERIES[crop.id];

  return (
    <>
      <ScreenHeader title={crop.name} subtitle={crop.grade} onBack={onBack}/>
      <div style={{ padding: '0 20px 24px' }}>
        {/* Hero image */}
        <div style={{
          height: 180, borderRadius: 'var(--fd-r-lg)', overflow: 'hidden',
          background: `linear-gradient(135deg, ${crop.color}22, ${crop.color}55)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
        }}>
          <svg width="120" height="120" viewBox="0 0 40 40">
            <circle cx="20" cy="22" r="14" fill={crop.color} opacity="0.85"/>
            <path d="M18 8c2 2 4 2 6 0 0 4-3 6-6 6s-3-4 0-6z" fill="#3e8e2a" opacity="0.9"/>
          </svg>
          <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
            {crop.tags.map((t, i) => <Chip key={i} tone="primary" size="sm">{t}</Chip>)}
          </div>
        </div>

        {/* Price + trend */}
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div className="fd-num" style={{ fontFamily: 'var(--fd-serif)', fontSize: 34, fontWeight: 500, color: 'var(--fd-ink)', lineHeight: 1 }}>
              ₹{crop.price}<span style={{ fontSize: 15, color: 'var(--fd-ink-3)' }}>/{crop.unit}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--fd-ink-2)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
              <FDIcon name="star" size={12} color="var(--fd-gold)"/>
              {crop.rating} · {crop.quantity} {crop.unit} available
            </div>
          </div>
          <TrendPill trend={crop.trend} value={crop.changePct}/>
        </div>

        {/* 14d chart */}
        <Card pad={12} style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--fd-ink-3)', marginBottom: 6 }}>
            <span>Last 14 days</span>
            <span>Nashik APMC</span>
          </div>
          <Sparkline data={series} width={310} height={60} color="var(--fd-primary)"/>
        </Card>

        {/* Farmer card */}
        <Card pad={14} style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 42, height: 42, borderRadius: '50%',
              background: 'linear-gradient(135deg, #2f6b3a, #c9a227)',
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--fd-serif)', fontSize: 18, fontWeight: 500,
            }}>{crop.farmer[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                {crop.farmer}
                <span style={{ display: 'inline-flex', width: 14, height: 14, borderRadius: '50%', background: 'var(--fd-primary)', color: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                  <FDIcon name="check" size={9} stroke={3.5}/>
                </span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--fd-ink-2)', marginTop: 2 }}>
                <FDIcon name="pin" size={10}/> {crop.village} · {crop.distanceKm} km
              </div>
            </div>
            <button style={iconBtn}><FDIcon name="phone" size={16}/></button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--fd-line)' }}>
            <ProfileStat label="Rating" value={crop.rating}/>
            <ProfileStat label="Orders" value="86"/>
            <ProfileStat label="On time" value="98%"/>
          </div>
        </Card>

        {/* Quantity selector */}
        <div style={{ marginTop: 16 }}>
          <Label>Quantity ({crop.unit})</Label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--fd-surface)', border: '1px solid var(--fd-line)', borderRadius: 12, padding: '10px 14px' }}>
            <button onClick={() => setQty(Math.max(1, qty - 10))} style={qtyBtn}>−</button>
            <input type="text" value={qty} onChange={e => setQty(+e.target.value || 0)} className="fd-num" style={{
              flex: 1, border: 'none', outline: 'none', textAlign: 'center', background: 'transparent',
              fontFamily: 'var(--fd-serif)', fontSize: 22, color: 'var(--fd-ink)',
            }}/>
            <button onClick={() => setQty(qty + 10)} style={qtyBtn}>+</button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: 'var(--fd-ink-2)' }}>
            <span>Subtotal</span>
            <span className="fd-num" style={{ fontWeight: 600, color: 'var(--fd-ink)' }}>{formatINRRaw(qty * crop.price)}</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, marginTop: 20, position: 'sticky', bottom: 0 }}>
          <button onClick={() => onAdd(qty)} style={{
            flex: 1, padding: 14, borderRadius: 14,
            background: 'var(--fd-surface)', color: 'var(--fd-ink)',
            border: '1px solid var(--fd-line)', cursor: 'pointer',
            fontSize: 14, fontWeight: 600,
          }}>Add to cart</button>
          <button onClick={() => onBuy(qty)} style={{
            flex: 2, padding: 14, borderRadius: 14,
            background: 'var(--fd-ink)', color: '#fff', border: 'none', cursor: 'pointer',
            fontSize: 14, fontWeight: 600,
          }}>Buy now · {formatINRRaw(qty * crop.price)}</button>
        </div>
      </div>
    </>
  );
}

// ─── CART ─────────────────────────────────────────────────────
function BuyerCart({ cart, onCheckout, onRemove }) {
  const total = cart.reduce((s, c) => s + c.qty * c.crop.price, 0);

  if (cart.length === 0) {
    return (
      <>
        <ScreenHeader title="Cart" subtitle="Ready to order"/>
        <div style={{ padding: '40px 20px', textAlign: 'center' }}>
          <div style={{
            width: 80, height: 80, margin: '0 auto', borderRadius: '50%',
            background: 'var(--fd-primary-soft)', color: 'var(--fd-primary-ink)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FDIcon name="cart" size={36}/>
          </div>
          <div style={{ fontFamily: 'var(--fd-serif)', fontSize: 18, fontWeight: 500, marginTop: 16 }}>Your cart is empty</div>
          <div style={{ fontSize: 12, color: 'var(--fd-ink-2)', marginTop: 6 }}>
            Browse verified farmers and add fresh produce.
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ScreenHeader title="Cart" subtitle={`${cart.length} item${cart.length > 1 ? 's' : ''}`}/>
      <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {cart.map(item => (
          <Card key={item.id} pad={12} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ProduceSwatch crop={item.crop} size={44} radius={12}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{item.crop.name}</div>
              <div style={{ fontSize: 11, color: 'var(--fd-ink-2)', marginTop: 2 }}>
                {item.qty} {item.crop.unit} · {item.crop.farmer}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="fd-num" style={{ fontSize: 14, fontWeight: 600 }}>{formatINRRaw(item.qty * item.crop.price)}</div>
              <button onClick={() => onRemove(item.id)} style={{ background: 'none', border: 'none', color: 'var(--fd-ink-3)', fontSize: 11, cursor: 'pointer', padding: '4px 0' }}>Remove</button>
            </div>
          </Card>
        ))}

        <Card pad={14} style={{ marginTop: 6 }}>
          <SumRow k="Subtotal" v={formatINRRaw(total)}/>
          <SumRow k="Delivery" v="₹80"/>
          <SumRow k="Platform fee" v={formatINRRaw(Math.round(total * 0.02))}/>
          <div style={{ borderTop: '1px dashed var(--fd-line)', margin: '10px 0' }}/>
          <SumRow k="Total" bold v={<span className="fd-num" style={{ fontFamily: 'var(--fd-serif)', fontSize: 20, color: 'var(--fd-primary)', fontWeight: 500 }}>
            {formatINRRaw(total + 80 + Math.round(total * 0.02))}
          </span>}/>
        </Card>

        <button onClick={() => onCheckout({ crop: cart[0].crop, qty: cart[0].qty })} style={{
          padding: 14, borderRadius: 14, marginTop: 4,
          background: 'var(--fd-ink)', color: '#fff', border: 'none', cursor: 'pointer',
          fontSize: 14, fontWeight: 600,
        }}>Checkout · {formatINRRaw(total + 80 + Math.round(total * 0.02))}</button>
      </div>
    </>
  );
}

// ─── CHECKOUT ─────────────────────────────────────────────────
function Checkout({ crop, qty, onBack, onDone }) {
  const [step, setStep] = React.useState(1); // 1 payment, 2 confirmed
  const [method, setMethod] = React.useState('upi');
  const subtotal = qty * crop.price;
  const delivery = 80;
  const fee = Math.round(subtotal * 0.02);
  const total = subtotal + delivery + fee;

  if (step === 2) {
    return (
      <>
        <ScreenHeader title="Order placed" subtitle="Confirmation" onBack={onDone}/>
        <div style={{ padding: '0 20px 24px' }}>
          <Card pad={20} style={{ textAlign: 'center' }}>
            <div style={{
              width: 72, height: 72, margin: '0 auto', borderRadius: '50%',
              background: 'var(--fd-primary)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <FDIcon name="check" size={36} stroke={3}/>
            </div>
            <div style={{ fontFamily: 'var(--fd-serif)', fontSize: 22, fontWeight: 500, marginTop: 16 }}>
              Order confirmed
            </div>
            <div style={{ fontSize: 13, color: 'var(--fd-ink-2)', marginTop: 6 }}>
              {crop.farmer} will pack your {qty} {crop.unit} of {crop.name} today.
            </div>
            <div style={{ fontFamily: 'var(--fd-mono)', fontSize: 12, color: 'var(--fd-ink-3)', marginTop: 14 }}>
              Order #FD-{Math.floor(Math.random() * 9000 + 1000)}
            </div>
          </Card>

          <Card pad={16} style={{ marginTop: 12 }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--fd-ink-3)', fontWeight: 600, marginBottom: 10 }}>Estimated delivery</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--fd-primary-soft)', color: 'var(--fd-primary-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FDIcon name="truck" size={20}/>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Tomorrow · 8:30 AM</div>
                <div style={{ fontSize: 11, color: 'var(--fd-ink-2)' }}>via FarmDirect Logistics</div>
              </div>
            </div>
          </Card>

          <button onClick={onDone} style={{
            width: '100%', padding: 14, borderRadius: 14, marginTop: 16,
            background: 'var(--fd-ink)', color: '#fff', border: 'none', cursor: 'pointer',
            fontSize: 14, fontWeight: 600,
          }}>Track your order</button>
        </div>
      </>
    );
  }

  return (
    <>
      <ScreenHeader title="Checkout" subtitle="Payment" onBack={onBack}/>
      <div style={{ padding: '0 20px 24px' }}>
        <Card pad={14}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ProduceSwatch crop={crop} size={44} radius={12}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{crop.name}, {crop.grade}</div>
              <div style={{ fontSize: 11, color: 'var(--fd-ink-2)', marginTop: 2 }}>
                {qty} {crop.unit} · from {crop.farmer}
              </div>
            </div>
            <div className="fd-num" style={{ fontSize: 15, fontWeight: 600 }}>{formatINRRaw(subtotal)}</div>
          </div>
        </Card>

        <div style={{ marginTop: 16 }}>
          <Label>Delivery address</Label>
          <Card pad={14}>
            <div style={{ display: 'flex', gap: 10 }}>
              <FDIcon name="pin" size={17} color="var(--fd-primary)"/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Green Basket Warehouse</div>
                <div style={{ fontSize: 11, color: 'var(--fd-ink-2)', marginTop: 2, lineHeight: 1.4 }}>
                  Plot 22, Hadapsar Industrial Estate, Pune 411013
                </div>
              </div>
              <button style={{ background: 'none', border: 'none', fontSize: 12, fontWeight: 600, color: 'var(--fd-primary)', cursor: 'pointer' }}>Change</button>
            </div>
          </Card>
        </div>

        <div style={{ marginTop: 16 }}>
          <Label>Payment method</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { id: 'upi',  icon: 'wallet', label: 'UPI',  sub: 'GPay, PhonePe, Paytm' },
              { id: 'card', icon: 'wallet', label: 'Card', sub: 'Debit or credit' },
              { id: 'net',  icon: 'wallet', label: 'Net banking', sub: 'All major banks' },
            ].map(m => {
              const on = method === m.id;
              return (
                <button key={m.id} onClick={() => setMethod(m.id)} style={{
                  padding: 14, borderRadius: 14, textAlign: 'left', font: 'inherit',
                  background: 'var(--fd-surface)', cursor: 'pointer',
                  border: on ? '2px solid var(--fd-primary)' : '1px solid var(--fd-line)',
                  display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--fd-primary-soft)', color: 'var(--fd-primary-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FDIcon name={m.icon} size={16}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{m.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--fd-ink-2)' }}>{m.sub}</div>
                  </div>
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%',
                    border: '2px solid ' + (on ? 'var(--fd-primary)' : 'var(--fd-line-2)'),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{on && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--fd-primary)' }}/>}</div>
                </button>
              );
            })}
          </div>
        </div>

        <Card pad={14} style={{ marginTop: 16 }}>
          <SumRow k="Subtotal" v={formatINRRaw(subtotal)}/>
          <SumRow k="Delivery" v={formatINRRaw(delivery)}/>
          <SumRow k="Platform fee" v={formatINRRaw(fee)}/>
          <div style={{ borderTop: '1px dashed var(--fd-line)', margin: '10px 0' }}/>
          <SumRow k="Total" bold v={<span className="fd-num" style={{ fontFamily: 'var(--fd-serif)', fontSize: 20, color: 'var(--fd-primary)', fontWeight: 500 }}>
            {formatINRRaw(total)}
          </span>}/>
        </Card>

        <button onClick={() => setStep(2)} style={{
          width: '100%', padding: 14, borderRadius: 14, marginTop: 16,
          background: 'var(--fd-ink)', color: '#fff', border: 'none', cursor: 'pointer',
          fontSize: 14, fontWeight: 600,
        }}>Pay {formatINRRaw(total)}</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginTop: 10, fontSize: 11, color: 'var(--fd-ink-3)' }}>
          <FDIcon name="shield" size={12}/> Secured by Razorpay
        </div>
      </div>
    </>
  );
}

// ─── ORDERS (buyer) ───────────────────────────────────────────
function BuyerOrders() {
  return (
    <>
      <ScreenHeader title="Your orders" subtitle="Track deliveries"/>
      <div style={{ padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {FD_ORDERS.map(o => {
          const crop = FD_CROPS.find(c => c.id === o.cropId);
          const done = o.stage === 6;
          return (
            <Card key={o.id} pad={14}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <ProduceSwatch crop={crop} size={44} radius={12}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{crop.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--fd-ink-2)', marginTop: 2 }}>
                    {o.quantity} {o.unit} · from {FD_CROPS.find(c => c.id === o.cropId).farmer}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="fd-num" style={{ fontSize: 14, fontWeight: 600 }}>{formatINRRaw(o.amount)}</div>
                  <div style={{ marginTop: 4 }}>
                    <Chip tone={done ? 'primary' : 'accent'} size="sm">{o.status}</Chip>
                  </div>
                </div>
              </div>
              {!done && (
                <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 10, background: 'var(--fd-surface-2)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FDIcon name="clock" size={14} color="var(--fd-ink-2)"/>
                  <span style={{ fontSize: 12, color: 'var(--fd-ink-2)' }}>{o.eta}</span>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </>
  );
}

function BuyerProfile() {
  return (
    <>
      <ScreenHeader title="Account" subtitle="Green Basket Retail"/>
      <div style={{ padding: '0 20px 24px' }}>
        <Card pad={20}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              background: 'var(--fd-primary)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--fd-serif)', fontSize: 22, fontWeight: 500,
            }}>GB</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Green Basket Retail</div>
              <div style={{ fontSize: 12, color: 'var(--fd-ink-2)', marginTop: 2 }}>Pune · Retailer</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <Chip tone="primary" size="sm">GSTIN verified</Chip>
                <Chip tone="gold" size="sm">Gold buyer</Chip>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 20, paddingTop: 18, borderTop: '1px solid var(--fd-line)' }}>
            <ProfileStat label="Orders" value="34"/>
            <ProfileStat label="Saved" value="₹28k"/>
            <ProfileStat label="Rating" value="4.9"/>
          </div>
        </Card>
      </div>
    </>
  );
}

Object.assign(window, { BuyerApp });
