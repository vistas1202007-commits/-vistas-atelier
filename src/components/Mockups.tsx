import type { MockupKind } from "@/content/projects";

// Interface mockups drawn in HTML/CSS instead of stock images. Every size inside
// is in em, so a mockup scales with the font-size of its container.

function BrowserBar({ url }: { url: string }) {
  return (
    <div className="mk-bar" aria-hidden>
      <i />
      <i />
      <i />
      <span>{url}</span>
    </div>
  );
}

export function BeautyMockup() {
  return (
    <div className="mk mk-browser mk-beauty" role="img" aria-label="Aaina Beauty Studio website with a booking widget">
      <BrowserBar url="aainastudio.in" />
      <div className="bm-nav">
        <b>AAINA</b>
        <span>Services</span>
        <span>Stylists</span>
        <span>Gift cards</span>
        <em>Book now</em>
      </div>
      <div className="bm-hero">
        <div className="bm-copy">
          <small>HAUZ KHAS · OPEN TILL 8 PM</small>
          <h4>
            Your moment,
            <br />
            your glow.
          </h4>
          <p>Hair, skin and bridal care by people who listen first.</p>
          <div className="bm-rating">★★★★★ <span>4.9 · 312 Google reviews</span></div>
        </div>
        <div className="bm-book">
          <small>Book · Step 2 of 3</small>
          <strong>Thursday, 24 Oct</strong>
          <div className="bm-slots">
            <span>11:00</span>
            <span className="on">12:30</span>
            <span>14:00</span>
            <span className="off">15:30</span>
            <span>17:00</span>
            <span>18:30</span>
          </div>
          <div className="bm-stylist">
            <i>MK</i>
            <span>
              Meher K.<em>Senior stylist</em>
            </span>
          </div>
          <button tabIndex={-1}>Confirm · ₹500 deposit</button>
        </div>
      </div>
      <ul className="bm-services">
        <li>
          <span>Signature haircut</span>
          <em>45 min</em>
          <b>₹1,200</b>
        </li>
        <li>
          <span>Hydra facial</span>
          <em>60 min</em>
          <b>₹2,800</b>
        </li>
        <li>
          <span>Bridal trial</span>
          <em>90 min</em>
          <b>₹4,500</b>
        </li>
      </ul>
    </div>
  );
}

export function LaundryMockup() {
  return (
    <div className="mk mk-phone mk-laundry" role="img" aria-label="FreshFold app showing an order tracker and pickup scheduler">
      <div className="mk-notch" />
      <div className="lm-top">
        <small>Good morning, Riya</small>
        <b>FreshFold</b>
      </div>
      <div className="lm-status">
        <div className="lm-row">
          <span>Order #2048</span>
          <em>Out for delivery</em>
        </div>
        <div className="lm-steps">
          <i className="done" />
          <i className="done" />
          <i className="done" />
          <i className="now" />
        </div>
        <div className="lm-row lm-sub">
          <span>6 items · Wash &amp; fold</span>
          <span>Today, 6–7 pm</span>
        </div>
      </div>
      <small className="lm-label">Schedule a pickup</small>
      <div className="lm-days">
        <span>
          Mon<b>21</b>
        </span>
        <span className="on">
          Tue<b>22</b>
        </span>
        <span>
          Wed<b>23</b>
        </span>
        <span>
          Thu<b>24</b>
        </span>
      </div>
      <div className="lm-slots">
        <span>8–10 am</span>
        <span className="on">6–8 pm</span>
      </div>
      <ul className="lm-items">
        <li>
          <span>Wash &amp; fold</span>
          <b>₹79/kg</b>
        </li>
        <li>
          <span>Dry clean</span>
          <b>from ₹149</b>
        </li>
        <li>
          <span>Steam iron</span>
          <b>₹15/pc</b>
        </li>
      </ul>
      <button tabIndex={-1}>Schedule pickup →</button>
    </div>
  );
}

export function MenuMockup() {
  const items = [
    { name: "Masala shakshuka", desc: "Eggs, spiced tomato, sourdough", price: "₹340", veg: false },
    { name: "Ragi banana pancakes", desc: "Jaggery butter, berries", price: "₹290", veg: true },
    { name: "Burrata & peach toast", desc: "Basil oil, chilli honey", price: "₹420", veg: true, out: true },
    { name: "Kerala egg roast bowl", desc: "Appam, coconut stew", price: "₹360", veg: false },
  ];
  return (
    <div className="mk mk-phone mk-menu" role="img" aria-label="Gather café digital menu on a phone">
      <div className="mk-notch" />
      <div className="mm-head">
        <b>Gather.</b>
        <small>Table 7 · All-day café</small>
      </div>
      <div className="mm-tabs">
        <span className="on">Breakfast</span>
        <span>Bowls</span>
        <span>Coffee</span>
        <span>Sweet</span>
      </div>
      <div className="mm-special">
        <small>TODAY ONLY</small>
        <span>Filter coffee tiramisu</span>
      </div>
      <ul className="mm-items">
        {items.map((it) => (
          <li key={it.name} className={it.out ? "out" : undefined}>
            <i className={it.veg ? "veg" : "nonveg"} />
            <div>
              <span>{it.name}</span>
              <em>{it.desc}</em>
            </div>
            <b>{it.out ? "Sold out" : it.price}</b>
            {!it.out && <u>+</u>}
          </li>
        ))}
      </ul>
      <div className="mm-cart">
        <span>2 items</span>
        <b>View order · ₹630</b>
      </div>
    </div>
  );
}

export function DashboardMockup() {
  const thisWeek = [62, 48, 71, 55, 83, 96, 74];
  const lastWeek = [54, 51, 60, 58, 70, 88, 69];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const line = lastWeek.map((v, i) => `${i * 40 + 14},${100 - v}`).join(" ");
  return (
    <div className="mk mk-browser mk-dash" role="img" aria-label="Loom & Ledger retail sales dashboard">
      <BrowserBar url="app.loomledger.in/overview" />
      <div className="dm-body">
        <aside>
          <b>L&amp;L</b>
          <span className="on">Overview</span>
          <span>Sales</span>
          <span>Stock</span>
          <span>Reports</span>
        </aside>
        <div className="dm-main">
          <div className="dm-head">
            <span>
              Good morning, Anjali<em>Week 42 · both stores</em>
            </span>
            <i>This week ▾</i>
          </div>
          <div className="dm-kpis">
            <div>
              <small>Revenue</small>
              <b>₹4.82L</b>
              <em className="up">▲ 12.4%</em>
            </div>
            <div>
              <small>Gross margin</small>
              <b>38.1%</b>
              <em className="up">▲ 1.2 pt</em>
            </div>
            <div>
              <small>Units sold</small>
              <b>1,146</b>
              <em className="down">▼ 3.0%</em>
            </div>
            <div>
              <small>Reorder alerts</small>
              <b>7</b>
              <em>3 urgent</em>
            </div>
          </div>
          <div className="dm-panels">
            <div className="dm-chart">
              <div className="dm-legend">
                <span>
                  <i className="a" />
                  This week
                </span>
                <span>
                  <i className="b" />
                  Last week
                </span>
              </div>
              <svg viewBox="0 0 280 112" preserveAspectRatio="none" aria-hidden>
                {thisWeek.map((v, i) => (
                  <rect key={i} x={i * 40 + 6} y={100 - v} width="16" height={v} rx="2" />
                ))}
                <polyline points={line} />
              </svg>
              <div className="dm-days">
                {days.map((d, i) => (
                  <span key={i}>{d}</span>
                ))}
              </div>
            </div>
            <div className="dm-list">
              <small>Reorder now</small>
              <p>
                <span>Handloom cotton saree</span>
                <b>4 left</b>
              </p>
              <p>
                <span>Block-print bedsheet</span>
                <b>3 left</b>
              </p>
              <p>
                <span>Linen dupatta, indigo</span>
                <b>6 left</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Mockup({ kind }: { kind: MockupKind }) {
  if (kind === "beauty") return <BeautyMockup />;
  if (kind === "laundry") return <LaundryMockup />;
  if (kind === "menu") return <MenuMockup />;
  return <DashboardMockup />;
}
