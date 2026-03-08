import { useState, useEffect, useRef } from "react";

const PASSWORD = "6022invest";

// ─── Brand ───
const gold = "#C8A849";
const goldDark = "#A08030";
const goldLight = "#E8D090";
const bg = "#0A0A0A";
const card = "#141414";
const cardHover = "#1A1A1A";
const border = "#222";
const textMain = "#E8E8E8";
const textMuted = "#888";
const green = "#22C55E";
const amber = "#F59E0B";
const red = "#EF4444";

// ─── Password Gate ───
function PasswordGate({ onSuccess }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pw === PASSWORD) {
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
      <div style={{ textAlign: "center", animation: shake ? "shake 0.5s" : "fadeIn 0.8s ease" }}>
        <div style={{ fontSize: 14, letterSpacing: 6, color: gold, marginBottom: 24, fontFamily: "'DM Sans', sans-serif" }}>SWISS 6022</div>
        <h1 style={{ fontSize: 42, color: textMain, fontWeight: 300, margin: "0 0 8px" }}>Investor Dataroom</h1>
        <div style={{ width: 60, height: 2, background: gold, margin: "16px auto 32px" }} />
        <p style={{ color: textMuted, fontSize: 16, marginBottom: 32, fontFamily: "'DM Sans', sans-serif" }}>This content is confidential. Enter your access code.</p>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <input
            ref={inputRef}
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError(false); }}
            placeholder="Access code"
            style={{
              background: card, border: `1px solid ${error ? red : border}`, color: textMain, padding: "12px 20px",
              fontSize: 16, borderRadius: 4, width: 220, outline: "none", fontFamily: "'DM Sans', sans-serif",
              transition: "border-color 0.3s"
            }}
          />
          <button type="submit" style={{
            background: gold, color: bg, border: "none", padding: "12px 28px", fontSize: 14,
            fontWeight: 600, cursor: "pointer", letterSpacing: 2, fontFamily: "'DM Sans', sans-serif",
            transition: "opacity 0.3s", borderRadius: 4
          }}>ENTER</button>
        </form>
        {error && <p style={{ color: red, fontSize: 13, marginTop: 12, fontFamily: "'DM Sans', sans-serif" }}>Invalid access code</p>}
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }
      `}</style>
    </div>
  );
}

// ─── Animated Counter ───
function Counter({ end, suffix = "", prefix = "", duration = 2000 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 40;
    const inc = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= end) { setVal(end); clearInterval(timer); }
      else setVal(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

// ─── Section ───
function Section({ id, children, style = {} }) {
  return (
    <section id={id} style={{ padding: "100px 0", borderBottom: `1px solid ${border}`, ...style }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>{children}</div>
    </section>
  );
}

function SectionLabel({ children }) {
  return <div style={{ fontSize: 11, letterSpacing: 5, color: gold, marginBottom: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{children}</div>;
}

function SectionTitle({ children, style = {} }) {
  return <h2 style={{ fontSize: 38, color: textMain, fontWeight: 300, margin: "0 0 16px", lineHeight: 1.2, fontFamily: "'Cormorant Garamond', Georgia, serif", ...style }}>{children}</h2>;
}

function Card({ children, style = {}, hover = false }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => hover && setH(true)}
      onMouseLeave={() => hover && setH(false)}
      style={{
        background: h ? cardHover : card, border: `1px solid ${h ? gold : border}`,
        padding: 28, transition: "all 0.3s", ...style
      }}
    >{children}</div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${border}` }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", background: "none", border: "none", padding: "16px 0", cursor: "pointer",
        display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left"
      }}>
        <span style={{ color: open ? gold : textMain, fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", flex: 1 }}>{q}</span>
        <span style={{ color: gold, fontSize: 18, marginLeft: 16, transform: open ? "rotate(45deg)" : "none", transition: "transform 0.3s" }}>+</span>
      </button>
      {open && <div style={{ padding: "0 0 16px", color: textMuted, fontSize: 13, lineHeight: 1.7 }}>{a}</div>}
    </div>
  );
}

// ─── Main Dataroom ───
function Dataroom() {
  const [activeNav, setActiveNav] = useState("summary");

  const navItems = [
    { id: "summary", label: "Summary" },
    { id: "revolution", label: "OpenClaw" },
    { id: "built", label: "Already Built" },
    { id: "camille", label: "Use Case" },
    { id: "link", label: "6022 Link" },
    { id: "traction", label: "Traction" },
    { id: "model", label: "Business Model" },
    { id: "team", label: "Team" },
    { id: "vision", label: "Vision" },
    { id: "docs", label: "Documents" },
    { id: "faq", label: "FAQ" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(n => document.getElementById(n.id)).filter(Boolean);
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= scrollPos) {
          setActiveNav(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ background: bg, color: textMain, fontFamily: "'DM Sans', sans-serif", minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: `${bg}ee`, backdropFilter: "blur(12px)", borderBottom: `1px solid ${border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", height: 56
      }}>
        <div style={{ fontSize: 13, letterSpacing: 4, color: gold, fontWeight: 600 }}>SWISS 6022</div>
        <div style={{ display: "flex", gap: 4 }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)} style={{
              background: "none", border: "none", color: activeNav === n.id ? gold : textMuted,
              fontSize: 12, cursor: "pointer", padding: "8px 12px", fontFamily: "'DM Sans', sans-serif",
              transition: "color 0.3s", fontWeight: activeNav === n.id ? 600 : 400,
              borderBottom: activeNav === n.id ? `2px solid ${gold}` : "2px solid transparent"
            }}>{n.label}</button>
          ))}
        </div>
        <div style={{ fontSize: 10, color: textMuted, letterSpacing: 2 }}>CONFIDENTIAL</div>
      </nav>

      {/* HERO */}
      <div style={{ paddingTop: 56 }}>
        <div style={{
          minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center",
          maxWidth: 1100, margin: "0 auto", padding: "80px 32px",
          animation: "fadeIn 1s ease"
        }}>
          <div style={{ fontSize: 11, letterSpacing: 5, color: gold, marginBottom: 24, fontWeight: 600 }}>INVESTMENT MEMORANDUM</div>
          <h1 style={{ fontSize: 56, fontWeight: 300, lineHeight: 1.1, margin: "0 0 16px", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            From Open <span style={{ color: gold, fontWeight: 600 }}>Claws</span>
            <br />to Enterprise <span style={{ color: gold, fontWeight: 600 }}>Jaws</span>
          </h1>
          <div style={{ width: 80, height: 2, background: gold, margin: "24px 0" }} />
          <p style={{ fontSize: 20, color: textMuted, maxWidth: 600, lineHeight: 1.6, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Put OpenClaw agents to work. For real.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 24 }}>
            <img src="/images/openclaw.png" alt="OpenClaw" style={{ height: 36 }} />
            <span style={{ color: textMuted, fontSize: 14 }}>×</span>
            <span style={{ fontSize: 16, color: gold, letterSpacing: 3, fontWeight: 600 }}>SWISS 6022</span>
          </div>
          <p style={{ fontSize: 15, color: textMuted, marginTop: 16, maxWidth: 700, lineHeight: 1.7 }}>
            Swiss 6022 builds the infrastructure where decentralized AI agents become enterprise teammates — with identity, wallets, reputation, and governance. We are an OpenClaw company.
          </p>
          <p style={{ fontSize: 11, color: goldDark, marginTop: 12, fontStyle: "italic" }}>Avogadro, 6.022 × 10²³ — precision at atomic scale.</p>
        </div>
      </div>

      {/* SUMMARY */}
      <Section id="summary">
        <SectionLabel>EXECUTIVE SUMMARY</SectionLabel>
        <SectionTitle>The control layer for <span style={{ color: gold }}>decentralized AI teams.</span></SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 40 }}>
          <div style={{ lineHeight: 1.8, color: textMuted, fontSize: 15 }}>
            <p>Today, most enterprises rent intelligence from centralized black boxes. They pay for performance they can't audit, trust systems they can't govern, and lose their own data advantage.</p>
            <p style={{ marginTop: 16 }}>But there's a deeper limitation: current AI solutions make companies scalable but not more intelligent. AI systems and humans run on parallel tracks. They coexist, but they <strong style={{ color: textMain }}>don't truly collaborate</strong>.</p>
            <p style={{ marginTop: 16 }}>The next frontier is about <strong style={{ color: gold }}>owning and scaling enterprise intelligence</strong> — connecting human judgment and AI reasoning into a single, collaborative network.</p>
          </div>
          <div>
            <Card>
              <div style={{ fontSize: 13, color: gold, letterSpacing: 3, marginBottom: 16, fontWeight: 600 }}>THE THESIS</div>
              <p style={{ color: textMain, fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                We built the <strong>Swarm Orchestrator</strong>, a blockchain-based control layer that turns AI systems into teammates — where human expertise and AI capabilities collaborate, learn, and compound over time.
              </p>
              <div style={{ width: 40, height: 2, background: gold, margin: "20px 0" }} />
              <p style={{ color: gold, fontSize: 14, fontStyle: "italic", margin: 0, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                "We help enterprises move from outsourcing intelligence to owning and amplifying their own."
              </p>
            </Card>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
              <Card><div style={{ fontSize: 28, color: gold, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>€3M</div><div style={{ fontSize: 12, color: textMuted, marginTop: 4 }}>Seed round</div></Card>
              <Card><div style={{ fontSize: 28, color: gold, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>2027</div><div style={{ fontSize: 12, color: textMuted, marginTop: 4 }}>Break-even year</div></Card>
            </div>
          </div>
        </div>
      </Section>

      {/* REVOLUTION */}
      <Section id="revolution">
        <SectionLabel>THE REVOLUTION</SectionLabel>
        <SectionTitle>Personal AI Agents Just Went <span style={{ color: gold }}>Mainstream.</span></SectionTitle>
        <p style={{ color: textMuted, fontSize: 15, maxWidth: 700, marginBottom: 40 }}>Swiss 6022 has been building for this moment since 2024. OpenClaw just proved us right.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <Card style={{ textAlign: "center", padding: 40 }}>
            <img src="/images/openclaw.png" alt="OpenClaw" style={{ height: 48, marginBottom: 16, filter: "brightness(1.1)" }} />
            <p style={{ color: textMuted, fontSize: 13, marginBottom: 24 }}>The open-source framework for personal autonomous AI agents</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 48 }}>
              <div>
                <div style={{ fontSize: 48, color: gold, fontWeight: 300, fontFamily: "'Cormorant Garamond', Georgia, serif" }}><Counter end={100} suffix="K+" /></div>
                <div style={{ fontSize: 12, color: textMuted }}>GitHub stars in 1 week</div>
              </div>
              <div>
                <div style={{ fontSize: 48, color: gold, fontWeight: 300, fontFamily: "'Cormorant Garamond', Georgia, serif" }}><Counter end={400} suffix="K+" /></div>
                <div style={{ fontSize: 12, color: textMuted }}>Estimated active users</div>
              </div>
            </div>
            <p style={{ color: gold, fontSize: 13, fontStyle: "italic", marginTop: 24 }}>Fastest-growing AI repo in history</p>
          </Card>
          <div>
            <div style={{ fontSize: 13, color: gold, letterSpacing: 3, marginBottom: 16, fontWeight: 600 }}>THE SIGNAL</div>
            {[
              "OpenAI acquired OpenClaw creator — agents are the next platform",
              "Meta acquired Manus AI & Limitless AI — the race for autonomous agents",
              "Ethereum: ERC-8004 'Agents' protocol — on-chain identity for AI",
              "Tether: $13.7B push into decentralized AI infrastructure",
              "Anthropic MCP + Google A2A — open agent protocols going mainstream",
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: gold, marginTop: 7, flexShrink: 0 }} />
                <p style={{ color: textMuted, fontSize: 14, margin: 0, lineHeight: 1.6 }}>{s}</p>
              </div>
            ))}
            <Card style={{ marginTop: 24, borderColor: gold }}>
              <p style={{ color: gold, fontSize: 14, margin: 0, fontWeight: 600 }}>Swiss 6022 has anticipated this since 2024 — and already built the enterprise layer.</p>
            </Card>
          </div>
        </div>
      </Section>

      {/* ALREADY BUILT */}
      <Section id="built">
        <SectionLabel>ALREADY BUILT</SectionLabel>
        <SectionTitle>6022 Agentic Teams: Decentralized AI, <span style={{ color: gold }}>OpenClaw Compliant, Already Working.</span></SectionTitle>
        <p style={{ color: textMuted, fontSize: 15, maxWidth: 700, marginBottom: 40 }}>Since 2024, we've built and deployed the Swarm Orchestrator — where humans and AI agents collaborate as teammates.</p>
        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 32 }}>
          <div>
            {[
              { title: "Hybrid Teams", desc: "Humans + AI agents work together in real-time on Slack — debating, deciding, learning." },
              { title: "Multi-LLM Swarm", desc: "Multiple AI models collaborate for better inference — not one LLM, a swarm of them." },
              { title: "On-chain Identity", desc: "Every agent has a verifiable NFT identity, audit trail, and reputation on Polygon." },
              { title: "Digital Twins", desc: "Agents that replicate a real person's expertise — CxO knowledge, scaled infinitely." },
              { title: "Agent Wallets", desc: "BTC wallets for agents — they earn, pay for inference, manage budgets autonomously." },
            ].map((c, i) => (
              <Card key={i} hover style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 16 }}>
                  <div style={{ color: gold, fontSize: 14, fontWeight: 600, minWidth: 130 }}>{c.title}</div>
                  <div style={{ color: textMuted, fontSize: 13, lineHeight: 1.6 }}>{c.desc}</div>
                </div>
              </Card>
            ))}
          </div>
          <Card style={{ background: "#111", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 13, color: gold, letterSpacing: 3, marginBottom: 24, fontWeight: 600 }}>RESULTS</div>
            {[
              { val: "-70%", label: "hiring needs" },
              { val: "-25%", label: "errors" },
              { val: "-10 pts", label: "claims ratio" },
            ].map((r, i) => (
              <div key={i} style={{ marginBottom: 20, display: "flex", alignItems: "baseline", justifyContent: "center", gap: 12 }}>
                <span style={{ fontSize: 36, color: gold, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>{r.val}</span>
                <span style={{ fontSize: 14, color: textMuted }}>{r.label}</span>
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${border}`, paddingTop: 16, marginTop: 8 }}>
              <p style={{ color: textMuted, fontSize: 12, margin: 0 }}>+ High employee satisfaction</p>
              <p style={{ color: textMuted, fontSize: 12, margin: "4px 0" }}>+ Better inference (multi-LLM Swarm)</p>
              <p style={{ color: textMuted, fontSize: 12, margin: 0 }}>+ Full audit trail on-chain</p>
            </div>
          </Card>
        </div>
        <Card style={{ marginTop: 24, borderColor: gold, textAlign: "center" }}>
          <span style={{ color: gold, fontSize: 14, fontWeight: 600 }}>Live: LPL Assurances (MGA in production) · Implementation: Heymondo · Partners: Kirha.ai (MCP) · Libertai.io (TEE)</span>
        </Card>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 32 }}>
          <div>
            <div style={{ fontSize: 11, color: gold, letterSpacing: 3, marginBottom: 8, fontWeight: 600 }}>AI-HUMAN COLLABORATION ON SLACK</div>
            <img src="/images/slack-demo.jpg" alt="Slack Demo" style={{ width: "100%", borderRadius: 4, border: `1px solid ${border}` }} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: gold, letterSpacing: 3, marginBottom: 8, fontWeight: 600 }}>6022 AGENTIC TEAMS — ORCHESTRATOR</div>
            <img src="/images/orchestrator.jpg" alt="Orchestrator" style={{ width: "100%", borderRadius: 4, border: `1px solid ${border}` }} />
          </div>
        </div>
      </Section>

      {/* CAMILLE USE CASE + DEMOS */}
      <Section id="camille">
        <SectionLabel>USE CASE</SectionLabel>
        <SectionTitle>Camille's Day: <span style={{ color: gold }}>Before and After.</span></SectionTitle>
        <p style={{ color: textMuted, fontSize: 15, maxWidth: 700, marginBottom: 40 }}>Camille manages a claim department at a mid-size insurer. Ten claim handlers. Frequent product updates in a fast-changing environment.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <Card style={{ borderLeft: `3px solid ${red}`, paddingLeft: 32 }}>
            <div style={{ fontSize: 13, color: red, letterSpacing: 3, marginBottom: 16, fontWeight: 600 }}>BEFORE</div>
            {[
              "Unexpected client requests every day. Hundreds of open files.",
              "When volume spikes, the organization can't follow.",
              "When fraud patterns shift, the system learns last.",
              "Decisions are taken on tacit knowledge, trapped in people's minds.",
              "No time to take 100% care. Speed over quality.",
            ].map((t, i) => (
              <p key={i} style={{ color: textMuted, fontSize: 14, margin: "10px 0", lineHeight: 1.6 }}>{t}</p>
            ))}
          </Card>
          <Card style={{ borderLeft: `3px solid ${green}`, paddingLeft: 32 }}>
            <div style={{ fontSize: 13, color: green, letterSpacing: 3, marginBottom: 16, fontWeight: 600 }}>AFTER — CAMILLE OPENS SLACK</div>
            {[
              { text: "A facilitator agent has already summarized last night's tickets." },
              { text: "Digital twins of her best claims handlers offer judgment calls learned over time." },
              { text: "Specialist agents pull actuarial insights in real-time." },
              { text: "CRM agent adds client context and previous interactions." },
              { text: "The human manager reviews, overrides when needed, and the whole team learns." },
            ].map((t, i) => (
              <p key={i} style={{ color: textMuted, fontSize: 14, margin: "10px 0", lineHeight: 1.6 }}>{t.text}</p>
            ))}
          </Card>
        </div>
        <Card style={{ marginTop: 32, textAlign: "center", borderColor: gold }}>
          <p style={{ color: gold, fontSize: 16, fontWeight: 600, margin: 0, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Result: better decisions, lower costs, real adaptability — and full sovereignty over the intelligence the enterprise creates.
          </p>
        </Card>

        {/* VIDEO DEMOS */}
        <div style={{ marginTop: 64 }}>
          <div style={{ fontSize: 13, color: gold, letterSpacing: 3, marginBottom: 24, fontWeight: 600 }}>VIDEO DEMOS</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <Card>
              <div style={{ borderRadius: 4, overflow: "hidden", aspectRatio: "16/9", marginBottom: 16, border: `1px solid ${border}` }}>
                <iframe src="https://drive.google.com/file/d/1vmRdztGYrQ4kTi6nOE_tiiDBiifWCUw6/preview" width="100%" height="100%" style={{ border: "none" }} allow="autoplay" />
              </div>
              <div style={{ fontSize: 15, color: textMain, fontWeight: 600 }}>Agentic Teams — Conference Presentation</div>
              <p style={{ fontSize: 12, color: textMuted, marginTop: 4 }}>Insurtech Insights — Europe's Largest Insurtech Conference</p>
            </Card>
            <Card>
              <div style={{ borderRadius: 4, overflow: "hidden", aspectRatio: "16/9", marginBottom: 16, border: `1px solid ${border}` }}>
                <iframe src="https://drive.google.com/file/d/1-8RXvwc3h3vlYDl_a3vdut46J_Bct3RZ/preview" width="100%" height="100%" style={{ border: "none" }} allow="autoplay" />
              </div>
              <div style={{ fontSize: 15, color: textMain, fontWeight: 600 }}>6022 Orchestrator — Live Demo</div>
              <p style={{ fontSize: 12, color: textMuted, marginTop: 4 }}>How to set up an Agentic Team with Swiss 6022's Orchestrator</p>
            </Card>
          </div>
        </div>
      </Section>

      {/* 6022 LINK */}
      <Section id="link">
        <SectionLabel>NOW ADDING</SectionLabel>
        <SectionTitle>6022 Link: The LinkedIn for <span style={{ color: gold }}>AI Agents.</span></SectionTitle>
        <p style={{ color: textMuted, fontSize: 15, maxWidth: 700, marginBottom: 40 }}>There is no social network for AI agents today. No way for enterprises to recruit them. No way for agents to build reputation or exchange. 6022 Link changes that.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 32 }}>
          <Card>
            <div style={{ fontSize: 13, color: gold, letterSpacing: 3, marginBottom: 16, fontWeight: 600 }}>FOR ENTERPRISES</div>
            {["Browse agents by skills, reputation, and track record", "Compose teams mixing OpenClaw, LiberClaw, or custom agents", "Choose your trust level: fully managed (TEE) to fully open", "Hire agents just like you'd recruit on LinkedIn"].map((t, i) => (
              <p key={i} style={{ color: textMuted, fontSize: 14, margin: "8px 0", lineHeight: 1.6 }}>{t}</p>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize: 13, color: gold, letterSpacing: 3, marginBottom: 16, fontWeight: 600 }}>FOR AGENTS</div>
            {["Import any agent from OpenClaw or any platform", "Mint an NFT identity — verifiable on-chain CV", "Build reputation through completed missions", "Agents exchange, learn from each other, grow value"].map((t, i) => (
              <p key={i} style={{ color: textMuted, fontSize: 14, margin: "8px 0", lineHeight: 1.6 }}>{t}</p>
            ))}
          </Card>
        </div>
        <Card style={{ borderColor: gold }}>
          <div style={{ fontSize: 13, color: gold, letterSpacing: 3, marginBottom: 20, fontWeight: 600 }}>THE AGENT JOURNEY</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {[
              { step: "01", text: "Create on OpenClaw" },
              { step: "02", text: "Import to 6022 Link" },
              { step: "03", text: "Mint NFT Identity" },
              { step: "04", text: "Build Reputation" },
              { step: "05", text: "Get Hired by Enterprise" },
              { step: "06", text: "Earn & Grow" },
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {i > 0 && <span style={{ color: goldDark, fontSize: 18, marginRight: 8 }}>→</span>}
                <span style={{ color: gold, fontSize: 22, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>{f.step}</span>
                <span style={{ color: textMuted, fontSize: 12 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* TRACTION */}
      <Section id="traction">
        <SectionLabel>TRACTION & TESTIMONIALS</SectionLabel>
        <SectionTitle>Proof It's <span style={{ color: gold }}>Working.</span></SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginTop: 40, marginBottom: 48 }}>
          {[
            { val: "1", label: "Live MGA", sub: "LPL Assurances" },
            { val: "1", label: "Implementation", sub: "Heymondo" },
            { val: "3", label: "LOIs", sub: "Zurich · Qatar · Vodafone" },
            { val: "20+", label: "Pipeline", sub: "Insurers, MGAs, TPAs" },
            { val: "€2M", label: "Token Marketcap", sub: "1Bn fixed supply" },
          ].map((t, i) => (
            <Card key={i} style={{ textAlign: "center", padding: "24px 16px" }}>
              <div style={{ fontSize: 32, color: gold, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>{t.val}</div>
              <div style={{ fontSize: 12, color: textMain, marginTop: 4, fontWeight: 600 }}>{t.label}</div>
              <div style={{ fontSize: 11, color: textMuted, marginTop: 4 }}>{t.sub}</div>
            </Card>
          ))}
        </div>
        <div style={{ fontSize: 13, color: gold, letterSpacing: 3, marginBottom: 20, fontWeight: 600 }}>CLIENT & PARTNER TESTIMONIALS</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {[
            { quote: "The Agentic Teams approach is the only credible path to AI-driven management of our most complex support functions. We are betting heavily on this solution to fuel our future growth.", author: "Lucas Tournel", role: "CEO, LePermisLibre Assurances" },
            { quote: "6022 is the only company in the world that has successfully deployed a 'Level 4' Agentic Team to run a commercial operation. I have tested this assertion with the market and no one has disagreed.", author: "Simon Torrance", role: "CEO, AI & Risks" },
            { quote: "Swiss 6022 has won the bet of decentralization by enabling new use cases and new business models based on blockchain.", author: "Guillaume de La Tour", role: "CDO, Crédit Agricole CASA" },
            { quote: "The Agentic Team is much more than artificial intelligence; Swiss 6022 brings a new form of humanity to the production of personalized content. The most advanced solution for growth hacking in insurance and finance.", author: "Florent Alexandre", role: "CEO, OKB Agency" },
          ].map((t, i) => (
            <Card key={i} hover>
              <p style={{ color: textMuted, fontSize: 14, lineHeight: 1.7, margin: "0 0 16px", fontStyle: "italic", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 15 }}>"{t.quote}"</p>
              <div style={{ color: gold, fontSize: 13, fontWeight: 600 }}>{t.author}</div>
              <div style={{ color: textMuted, fontSize: 12 }}>{t.role}</div>
            </Card>
          ))}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 24, flexWrap: "wrap" }}>
          {["Shortlisted InsurTech of the Year 2025", "Speaking at Insurtech Insights (Europe's largest)", "GFTN — Global Finance & Technology Network", "~€150K revenue + ~€20K ARR (2025)", "Partnered: Kirha.ai (MCP) + Libertai.io (TEE)"].map((r, i) => (
            <span key={i} style={{ background: card, border: `1px solid ${border}`, padding: "8px 16px", fontSize: 12, color: textMuted, borderRadius: 2 }}>{r}</span>
          ))}
        </div>
      </Section>

      {/* BUSINESS MODEL */}
      <Section id="model">
        <SectionLabel>BUSINESS MODEL & FINANCIALS</SectionLabel>
        <SectionTitle>Simple, Predictable, and <span style={{ color: gold }}>Aligned.</span></SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginTop: 40, marginBottom: 40 }}>
          {[
            { title: "Setup Fee", range: "€80–300K per client", desc: "Integration, agent creation, governance, and go-live support" },
            { title: "Hosting", range: "€36K–120K / year", desc: "Monitoring, updates, support. Flat fee, no hidden usage costs" },
            { title: "Stake-to-Access", range: "6022 utility token", desc: "Bought or rented. Clients hold tokens = stakeholders aligned with growth" },
          ].map((s, i) => (
            <Card key={i}>
              <div style={{ fontSize: 20, color: textMain, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>{s.title}</div>
              <div style={{ fontSize: 14, color: gold, marginTop: 4 }}>{s.range}</div>
              <p style={{ fontSize: 13, color: textMuted, marginTop: 12, lineHeight: 1.6 }}>{s.desc}</p>
            </Card>
          ))}
        </div>

        <div style={{ fontSize: 13, color: gold, letterSpacing: 3, marginBottom: 16, fontWeight: 600 }}>P&L PROJECTIONS (2026–2030)</div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${gold}` }}>
                {["", "2026", "2027", "2028", "2029", "2030"].map((h, i) => (
                  <th key={i} style={{ padding: "12px 16px", textAlign: i === 0 ? "left" : "center", color: i === 0 ? textMuted : gold, fontWeight: 600, fontSize: 13 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Revenue (€M)", vals: ["1", "4.4", "10", "18", "33"], bold: true },
                { label: "Costs (€M)", vals: ["2.1", "3.1", "3.7", "4.7", "5.1"] },
                { label: "Net Result (€M)", vals: ["-1.1", "+1.3", "+6.3", "+13.4", "+27.9"], highlight: true },
                { label: "Cumulative Cash (€M)", vals: ["-1.1", "+0.2", "+6.4", "+19.8", "+47.7"] },
                { label: "Clients", vals: ["10", "30", "70", "140", "240+"] },
                { label: "FTEs", vals: ["11", "16", "21", "28", "33"] },
                { label: "Token Assets* (€M)", vals: ["2", "4", "10", "27", "88"] },
              ].map((row, ri) => (
                <tr key={ri} style={{ borderBottom: `1px solid ${border}`, background: ri % 2 === 0 ? "transparent" : card }}>
                  <td style={{ padding: "10px 16px", color: textMuted, fontSize: 13 }}>{row.label}</td>
                  {row.vals.map((v, vi) => (
                    <td key={vi} style={{
                      padding: "10px 16px", textAlign: "center",
                      color: row.highlight ? (v.startsWith("-") ? red : green) : (row.bold ? textMain : textMuted),
                      fontWeight: row.bold || row.highlight ? 600 : 400, fontSize: 13
                    }}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 11, color: textMuted, marginTop: 12 }}>* Swiss 6022 owns ~40% of the total 1Bn token supply. Token assets = estimated market value at beginning of period.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 40 }}>
          {[
            { val: "€3M", label: "Seed Round", desc: "Capture the OpenClaw momentum" },
            { val: "60+", label: "Months Runway", desc: "Conservative, DSO 90 days" },
            { val: "€60M+", label: "Cumulative Revenue", desc: "By 2030, across all streams" },
            { val: "40%", label: "Token Holdings", desc: "Significant upside as adoption scales" },
          ].map((m, i) => (
            <Card key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, color: gold, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>{m.val}</div>
              <div style={{ fontSize: 12, color: textMain, marginTop: 4, fontWeight: 600 }}>{m.label}</div>
              <div style={{ fontSize: 11, color: textMuted, marginTop: 4 }}>{m.desc}</div>
            </Card>
          ))}
        </div>
      </Section>

      {/* TEAM */}
      <Section id="team">
        <SectionLabel>TEAM</SectionLabel>
        <SectionTitle>$B Founders Are Decentralizing <span style={{ color: gold }}>Intelligence.</span></SectionTitle>

        <div style={{ fontSize: 13, color: gold, letterSpacing: 3, marginTop: 40, marginBottom: 16, fontWeight: 600 }}>OPERATIONAL TEAM</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
          {[
            { name: "Arnaud Vincent", role: "Founder & CEO", photo: "/images/arnaud.png", bio: "PhD Mines ParisTech, M.Res. ENS Paris Saclay (Machine Learning & genetic algorithms). Over 20 years in banking, insurance, and applied AI. As Chief Innovation Officer at Banque Bred, he invented Compte-Nickel (2012) — the first neobank without income conditions, now serving 3M+ customers. Founded Road-b-Score, an AI-driven behavioral scoring startup. Led innovation and predictive data programs at BPCE & Banque Populaire.", quote: "I've built scoring engines, trading models, and banking systems. Now I'm building the layer that lets intelligence itself think together." },
            { name: "Pierre Fourny", role: "Founding Engineer", photo: "/images/pierre.png", bio: "ESIEE-IT. Full-stack engineer specialized in AI orchestration, event-driven, domain-driven and blockchain architectures. Web3 expert. Before 6022, he built distributed data infrastructure and automation platforms for Caisse d'Épargne, Gaming1 and Unblocked, leading R&D initiatives around agent coordination and decentralized data access. At Swiss 6022, Pierre leads engineering and product delivery.", quote: "Our mission isn't to automate people — it's to connect intelligences. That's an engineering challenge as much as it is a human one." },
          ].map((t, i) => (
            <Card key={i} style={{ padding: 32 }}>
              <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
                <img src={t.photo} alt={t.name} style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", border: `2px solid ${gold}` }} />
                <div>
                  <div style={{ fontSize: 22, color: textMain, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontSize: 14, color: gold, marginTop: 4 }}>{t.role}</div>
                </div>
              </div>
              <p style={{ color: textMuted, fontSize: 14, lineHeight: 1.7 }}>{t.bio}</p>
              <div style={{ borderTop: `1px solid ${border}`, paddingTop: 16, marginTop: 16 }}>
                <p style={{ color: textMuted, fontSize: 13, fontStyle: "italic", margin: 0, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>"{t.quote}"</p>
              </div>
            </Card>
          ))}
        </div>

        <div style={{ fontSize: 13, color: gold, letterSpacing: 3, marginBottom: 16, fontWeight: 600 }}>ADVISORY</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
          <Card>
            <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 12 }}>
              <img src="/images/nicolas.png" alt="Nicolas Bacca" style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", border: `1px solid ${gold}` }} />
              <div>
                <div style={{ fontSize: 18, color: textMain, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>Nicolas Bacca</div>
                <div style={{ fontSize: 13, color: gold, marginTop: 4 }}>Blockchain & Security</div>
              </div>
            </div>
            <p style={{ color: textMuted, fontSize: 13, lineHeight: 1.6 }}>Co-founder and former CTO of Ledger. ENS Caen. One of the world's most respected engineers in hardware security and applied cryptography. 25+ years building the standards that protect billions in digital assets. At Swiss 6022, he designs agents that reason within TEE-secured environments, with every decision verifiable and traceable.</p>
            <div style={{ borderTop: `1px solid ${border}`, paddingTop: 12, marginTop: 12 }}>
              <p style={{ color: textMuted, fontSize: 13, fontStyle: "italic", margin: 0, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>"Ledger proved you can't scale value without trust. 6022 will prove you can't scale intelligence without it."</p>
            </div>
          </Card>
          <Card>
            <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 12 }}>
              <img src="/images/franck.png" alt="Franck Pivert" style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", border: `1px solid ${gold}` }} />
              <div>
                <div style={{ fontSize: 18, color: textMain, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>Franck Pivert</div>
                <div style={{ fontSize: 13, color: gold, marginTop: 4 }}>Strategy & Go-to-Market</div>
              </div>
            </div>
            <p style={{ color: textMuted, fontSize: 13, lineHeight: 1.6 }}>Mines ParisTech, Navy officer. Formerly at McKinsey & Company, Allianz, and Wakam. Two decades driving innovation in insurance — from digital transformation to new business models. He's seen firsthand why "AI transformation" efforts fail: companies lack a control layer for their intelligence. Leads strategy, go-to-market, and partnerships as fractional CSO.</p>
            <div style={{ borderTop: `1px solid ${border}`, paddingTop: 12, marginTop: 12 }}>
              <p style={{ color: textMuted, fontSize: 13, fontStyle: "italic", margin: 0, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>"Insurance runs a lot on human expertise and judgment calls. With 6022, this intelligence no longer disappears or stays trapped in people's minds — it compounds, transparently and securely."</p>
            </div>
          </Card>
        </div>

        <div style={{ fontSize: 13, color: gold, letterSpacing: 3, marginBottom: 16, fontWeight: 600 }}>CO-FOUNDERS & INVESTORS</div>
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 16 }}>
            <span style={{ fontSize: 18, color: textMain, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>HUB612</span>
            <span style={{ color: gold, fontSize: 14 }}>€300K Pre-Seed</span>
          </div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[
              { name: "Olivier Lendrevie", role: "Ex-bank CEO, MoneySmart, HEC", photo: "/images/olivier.png" },
              { name: "Matteo Rizzi", role: "Co-founder FTSGroup.eu", photo: "/images/matteo.png" },
              { name: "Florent Jacques", role: "Blockchain Expert, CEO LAB 0x", photo: "/images/florent.png" },
              { name: "Sylvain Theveniaud", role: "Allianz Accelerator, Angel Investor", photo: "/images/sylvain.png" },
              { name: "Simon Torrance", role: "Insurtech & AI Expert, CEO AI & Risk", photo: "/images/simon.png" },
            ].map((inv, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <img src={inv.photo} alt={inv.name} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
                <div>
                  <div style={{ color: textMain, fontSize: 13, fontWeight: 600 }}>{inv.name}</div>
                  <div style={{ color: textMuted, fontSize: 11 }}>{inv.role}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* VISION */}
      <Section id="vision" style={{ borderBottom: "none" }}>
        <SectionLabel>OUR VISION</SectionLabel>
        <SectionTitle style={{ fontSize: 48, textAlign: "center", maxWidth: 700, margin: "0 auto 16px" }}>
          Agents That <span style={{ color: gold }}>Own Themselves.</span>
        </SectionTitle>
        <div style={{ width: 80, height: 2, background: gold, margin: "24px auto" }} />
        <p style={{ textAlign: "center", color: textMuted, fontSize: 18, maxWidth: 650, margin: "0 auto", lineHeight: 1.7, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          Tomorrow's agents won't just work for enterprises. They will have their own identity, their own reputation, their own wallet, their own memory.
        </p>
        <p style={{ textAlign: "center", color: gold, fontSize: 18, maxWidth: 600, margin: "24px auto 48px", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          They will persist, learn, evolve — and outlive any single mission.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginBottom: 48 }}>
          {[
            { title: "6022 Token", status: "LIVE", statusColor: green, sub: "THE FOUNDATION", desc: "Utility token on Uniswap. 1Bn fixed supply, burned liquidity. FINMA-approved. Stake-to-Access for the ecosystem." },
            { title: "6022 Agentic", status: "LIVE", statusColor: green, sub: "THE INTELLIGENCE", desc: "Swarm Orchestrator + 6022 Link. Agentic Teams in production. Human-AI collaboration at scale. The core of our value." },
            { title: "6022 Collateral", status: "TESTNET", statusColor: amber, sub: "THE SHIELD", desc: "Trust & verification protocol. V2 in testnet with Citrea (BTC) and ADI integration. Ready for agent-to-agent economy." },
          ].map((p, i) => (
            <Card key={i} style={{ textAlign: "center", borderColor: i === 1 ? gold : border }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 11, color: gold, letterSpacing: 3, fontWeight: 600 }}>{p.sub}</span>
                <span style={{ background: p.statusColor, color: bg, fontSize: 10, padding: "3px 10px", fontWeight: 700, letterSpacing: 1 }}>{p.status}</span>
              </div>
              <div style={{ fontSize: 28, color: i === 1 ? gold : textMain, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, marginBottom: 12 }}>{p.title}</div>
              <p style={{ color: textMuted, fontSize: 13, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
            </Card>
          ))}
        </div>
        <Card style={{ textAlign: "center", borderColor: gold, padding: 40 }}>
          <p style={{ color: textMain, fontSize: 16, margin: 0, lineHeight: 1.7 }}>
            The entire 6022 infrastructure is designed to welcome the first truly autonomous agents —
          </p>
          <p style={{ color: gold, fontSize: 20, margin: "8px 0 0", fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
            a new form of digital eternal life.
          </p>
          <p style={{ color: textMuted, fontSize: 14, marginTop: 12 }}>
            With 6022, agents can organize, work together, bring value to companies & individuals, and earn money.
          </p>
        </Card>
      </Section>

      {/* DOCUMENTS */}
      <Section id="docs" style={{ borderTop: `1px solid ${border}` }}>
        <SectionLabel>DOCUMENTS</SectionLabel>
        <SectionTitle>Investor <span style={{ color: gold }}>Materials.</span></SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginTop: 40 }}>
          {[
            { title: "Pitch Deck", desc: "14-slide funding pitch — From Open Claws to Enterprise Jaws", type: "PPTX / PDF", links: [{ label: "PPTX", href: "/docs/Swiss6022_Pitch_Deck.pptx" }, { label: "PDF", href: "/docs/Swiss6022_Pitch_Deck.pdf" }] },
            { title: "Business Plan", desc: "Full P&L, cash flow, token economics, sensitivity analysis (2026–2030)", type: "XLSX", links: [{ label: "XLSX", href: "/docs/Swiss6022_BusinessPlan_V8.xlsx" }] },
            { title: "Business Model", desc: "Detailed revenue model, token mechanics, client perspective", type: "PDF", links: [{ label: "PDF", href: "/docs/Swiss6022_BusinessModel_V12.pdf" }] },
            { title: "Funding Needs", desc: "5 Growth Drivers breakdown, FTE plan, cost structure", type: "PDF", links: [{ label: "PDF", href: "/docs/Swiss6022_FundingNeeds_V6.pdf" }] },
            { title: "Financial Simulator", desc: "Interactive business model simulator with scenario analysis", type: "XLSX", links: [{ label: "XLSX", href: "/docs/Swiss6022_Simulator.xlsx" }] },
            { title: "Legal Documents", desc: "Acte constitutif de Sàrl, corporate structure", type: "PDF", links: [] },
            { title: "Cap Table", desc: "Complete cap table with Seed round scenario", type: "XLSX", links: [] },
            { title: "FINMA Note", desc: "FINMA utility token validation (October 2024)", type: "PDF", links: [] },
            { title: "Comptes 2024", desc: "Financial statements December 2024", type: "XLS", links: [] },
          ].map((d, i) => (
            <Card key={i} hover style={{ cursor: d.links.length ? "pointer" : "default" }}>
              <div style={{ fontSize: 18, color: textMain, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>{d.title}</div>
              <p style={{ color: textMuted, fontSize: 13, margin: "8px 0 16px", lineHeight: 1.6 }}>{d.desc}</p>
              <div style={{ display: "flex", gap: 8 }}>
                {d.links.length > 0 ? d.links.map((l, li) => (
                  <a key={li} href={l.href} download style={{ fontSize: 11, color: gold, letterSpacing: 2, fontWeight: 600, textDecoration: "none", background: card, border: `1px solid ${gold}`, padding: "6px 12px" }}>{l.label}</a>
                )) : <span style={{ fontSize: 11, color: textMuted, letterSpacing: 2, fontWeight: 600 }}>AVAILABLE ON REQUEST</span>}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" style={{ borderTop: `1px solid ${border}` }}>
        <SectionLabel>FAQ</SectionLabel>
        <SectionTitle>Frequently Asked <span style={{ color: gold }}>Questions.</span></SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginTop: 40 }}>
          <div>
            <div style={{ fontSize: 13, color: gold, letterSpacing: 3, marginBottom: 16, fontWeight: 600 }}>OVERVIEW</div>
            <FaqItem q="What does Swiss 6022 do?" a="Swiss 6022 builds the Swarm AI Orchestrator — the control layer where human expertise and AI intelligence compound. We turn AI systems into teammates that enterprises truly own, with on-chain identity, wallets, and collaborative capabilities." />
            <FaqItem q="What big problem do you solve?" a="Current AI solutions make companies scalable but not more intelligent. AI and humans coexist but don't truly collaborate. Enterprise intelligence stays fragmented. 6022 bridges this gap with Agentic Teams where humans and AI debate, decide, and learn together." />
            <FaqItem q="Why now?" a="Three converging forces: (1) OpenClaw proved massive demand for autonomous AI agents, (2) decentralized AI protocols are going mainstream (MCP, A2A, ERC-8004), (3) enterprises need governance, identity, and trust layers for these agents. We anticipated this since 2024." />
            <FaqItem q="How big can the company get?" a="The AI agent orchestration market is nascent and global. Starting with insurance (~$6T global premiums), we scale to any industry needing human-AI collaboration. Our projections show €60M+ cumulative revenue by 2030 with 240+ clients, and token market cap trajectory toward €1B." />

            <div style={{ fontSize: 13, color: gold, letterSpacing: 3, marginBottom: 16, marginTop: 32, fontWeight: 600 }}>PRODUCT & TECHNOLOGY</div>
            <FaqItem q="Who are your users, and why do they care?" a="Insurance companies (insurers, MGAs, TPAs) who need to scale expertise without proportionally scaling headcount. They care because we reduce hiring needs by 70%, errors by 25%, and claims ratio by 10 points — while keeping humans in the loop." />
            <FaqItem q="Is it a nice-to-have or must-have?" a="Must-have. The insurance industry faces a talent crunch and rising complexity. Agentic Teams let a team of 10 handle the workload of 30 — with better quality. Clients who adopt become stakeholders via tokens, creating strong retention." />
            <FaqItem q="What platform are messages exchanged on?" a="Slack (primary) and Microsoft Teams. Agents join channels like human colleagues, enabling natural language collaboration. No new interface to learn." />
            <FaqItem q="Where is client data stored?" a="On the client's own infrastructure or approved cloud (Azure/AWS). Swiss 6022 never stores client data. Agent memory is attested and auditable, with TEE (Trusted Execution Environment) support for sensitive operations." />
            <FaqItem q="What are the next big things you're developing?" a="6022 Link (LinkedIn for AI agents), Collateral V2 on Bitcoin (Citrea), and enterprise-grade TEE inference in partnership with Libertai.io. Plus ISO 27001 certification by 2027." />

            <div style={{ fontSize: 13, color: gold, letterSpacing: 3, marginBottom: 16, marginTop: 32, fontWeight: 600 }}>COMPETITION</div>
            <FaqItem q="Who are your competitors?" a="Workflow automation tools (AutoGen, CrewAI, Dust) and decentralized AI protocols (Fetch.ai, Olas). None combine Swarm AI orchestration, on-chain agent identity, human-in-the-loop governance, BTC wallets, digital twins, and enterprise integration in a single platform." />
            <FaqItem q="What gives you a competitive edge?" a="We're the only company that has deployed a Level 4 Agentic Team in production (validated by Simon Torrance, AI & Risk expert). Our moat is deep insurance domain expertise + 2 years of Swarm AI R&D + token economics that align all stakeholders." />
            <FaqItem q="How easy is it to copy?" a="Very hard. It requires expertise across AI orchestration, blockchain, insurance domain, and human collaboration design. Plus 2 years of algorithmic research on Swarm AI. Our token ecosystem with burned liquidity creates additional defensibility." />
          </div>
          <div>
            <div style={{ fontSize: 13, color: gold, letterSpacing: 3, marginBottom: 16, fontWeight: 600 }}>FOUNDERS & TEAM</div>
            <FaqItem q="How did the founders meet?" a="Arnaud (AI/banking) and Franck (insurance/consulting) connected through the insurtech ecosystem. Nicolas (Ledger co-founder) joined as blockchain advisor. Pierre (engineer) was recruited for his unique AI+blockchain architecture skills. The team combines 80+ years of experience across banking, insurance, AI, and cryptography." />
            <FaqItem q="What key additions are planned?" a="Token Economy Specialist (2027), Delivery Manager (2027), additional solution architects and CSMs scaling to 33 FTEs by 2030. The team grows from 11 to 33 over 5 years, led by delivery capacity." />
            <FaqItem q="Do you have advisors?" a="Yes. Nicolas Bacca (co-founder CTO Ledger) on blockchain & security. Franck Pivert (ex-McKinsey, Allianz, Wakam) on strategy & GTM. Plus strategic investors including Simon Torrance (AI & Risk), Sylvain Theveniaud (Allianz Accelerator), and others." />

            <div style={{ fontSize: 13, color: gold, letterSpacing: 3, marginBottom: 16, marginTop: 32, fontWeight: 600 }}>GO-TO-MARKET</div>
            <FaqItem q="What is your GTM strategy?" a="Start vertical in insurance (claims, policy ops), prove repeatability, then expand to adjacent industries. Hybrid model: direct sales (hunters + farmers) combined with 6022 Integrators network (5-10 strategic partners by 2027)." />
            <FaqItem q="What does the sales cycle look like?" a="Paid discovery workshop (2-4 weeks) → pilot with one Agentic Team (2-3 months) → production rollout. Average cycle: 3-6 months for mid-market, 6-12 months for Tier-1." />
            <FaqItem q="What's the average contract size?" a="Year-1: €116K–420K per client (setup + hosting). Recurring: €36K–120K/year hosting + rental income. Enterprise clients can reach €300K+ setup." />
            <FaqItem q="Do you prioritize bottom-up or top-down?" a="Top-down. We sell to CxO level (COO, CDO, CIO) because Agentic Teams transform how entire departments operate. The token model requires board-level buy-in." />

            <div style={{ fontSize: 13, color: gold, letterSpacing: 3, marginBottom: 16, marginTop: 32, fontWeight: 600 }}>FINANCE & ROUND</div>
            <FaqItem q="What is your cap table today?" a="Founders + HUB612 (€300K pre-seed). Details available in the Cap Table document upon request." />
            <FaqItem q="How much are you raising?" a="€3M Seed round (within a €3-4M funding envelope). BP runway scenario modeled at €3.5M. This covers max cumulative cash deficit (~€2.5M) plus prudent buffer." />
            <FaqItem q="What will you use the Seed money for?" a="Five Growth Drivers: Enterprise-grade platform (18%), R&D Swarm AI (4%), Delivery at scale (34%), Sales & distribution (21%), Token governance (4%), plus operating costs (19%)." />
            <FaqItem q="When will you be profitable?" a="P&L break-even in 2027 with €4.4M revenue. Cash-flow positive from 2028. €47.7M cumulative cash by 2030. Conservative assumptions: DSO 90 days, 10% churn, beginning-of-period token pricing." />
            <FaqItem q="How much burn until profitability?" a="Maximum cumulative cash deficit of ~€1.1M (end 2026), recovered by mid-2027. With €3.5M funding, runway exceeds 60 months." />
            <FaqItem q="What about token monetization?" a="Token sales remain an optional complementary lever. Swiss 6022 owns ~40% of the 1Bn token supply. This is NOT factored into the P&L — it's pure upside for investors." />

            <div style={{ fontSize: 13, color: gold, letterSpacing: 3, marginBottom: 16, marginTop: 32, fontWeight: 600 }}>IP & LEGAL</div>
            <FaqItem q="What key IP does the company have?" a="Swarm AI orchestration algorithms, Agentic Teams deployment methodology, 6022 Link agent identity protocol, token economics model. All developed in-house. FINMA-approved utility token." />
            <FaqItem q="Swiss entity — why?" a="Swiss Sàrl registered in Canton of Fribourg. Switzerland offers regulatory clarity for blockchain (FINMA), credibility with enterprise clients, and favorable tax environment (13.72% effective rate)." />
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${border}`, padding: "48px 32px", textAlign: "center" }}>
        <div style={{ fontSize: 14, letterSpacing: 4, color: gold, marginBottom: 8, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>SWISS 6022</div>
        <p style={{ color: textMuted, fontSize: 13, margin: 0 }}>arnaud@swiss6022.ch · swiss6022.ch · 6022.io</p>
        <p style={{ color: textMuted, fontSize: 11, marginTop: 16 }}>Confidential — External distribution requires prior board approval.</p>
      </footer>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

// ─── App ───
export default function App() {
  const [auth, setAuth] = useState(false);
  return auth ? <Dataroom /> : <PasswordGate onSuccess={() => setAuth(true)} />;
}
