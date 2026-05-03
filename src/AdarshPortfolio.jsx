import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

// ─── Particle Canvas Background ───────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${p.alpha})`;
        ctx.fill();
      });
      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139,92,246,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

// ─── Floating Blobs ────────────────────────────────────────────────────────────
function Blobs() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
          top: "-100px",
          left: "-100px",
          animation: "blobFloat1 12s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)",
          top: "30%",
          right: "-80px",
          animation: "blobFloat2 15s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)",
          bottom: "10%",
          left: "20%",
          animation: "blobFloat3 10s ease-in-out infinite",
        }}
      />
    </div>
  );
}

// ─── Glass Card ────────────────────────────────────────────────────────────────
function Glass({ children, style = {}, className = "" }) {
  return (
    <div
      className={className}
      style={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 20,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Glass Button ──────────────────────────────────────────────────────────────
function GlassBtn({ children, onClick, href, primary, style = {} }) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 28px",
    borderRadius: 50,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
    border: "none",
    transition: "all 0.3s ease",
    letterSpacing: "0.5px",
  };
  const s = primary
    ? {
        ...base,
        background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
        color: "#fff",
        boxShadow: "0 4px 24px rgba(139,92,246,0.4)",
        ...style,
      }
    : {
        ...base,
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.18)",
        color: "#e2e8f0",
        ...style,
      };

  if (href)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={s}>
        {children}
      </a>
    );
  return (
    <button onClick={onClick} style={s}>
      {children}
    </button>
  );
}

// ─── Nav ───────────────────────────────────────────────────────────────────────
function Nav({ active, setActive }) {
  const links = ["Home", "Skills", "Projects", "Education", "Contact"];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scroll = (id) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? "10px 24px" : "20px 24px",
        background: scrolled ? "rgba(10,10,20,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        transition: "all 0.4s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 22,
          fontWeight: 800,
          background: "linear-gradient(135deg,#a78bfa,#60a5fa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        AG.
      </div>

      {/* Desktop Links */}
      <div
        style={{ display: "flex", gap: 8, alignItems: "center" }}
        className="desktop-nav"
      >
        {links.map((l) => (
          <button
            key={l}
            onClick={() => scroll(l)}
            style={{
              background: active === l ? "rgba(139,92,246,0.2)" : "transparent",
              border:
                active === l
                  ? "1px solid rgba(139,92,246,0.5)"
                  : "1px solid transparent",
              color: active === l ? "#a78bfa" : "#94a3b8",
              padding: "8px 18px",
              borderRadius: 50,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
              transition: "all 0.3s",
            }}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="hamburger"
        style={{
          display: "none",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 10,
          padding: "8px 12px",
          cursor: "pointer",
          color: "#e2e8f0",
          fontSize: 18,
        }}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 64,
            left: 16,
            right: 16,
            background: "rgba(15,15,30,0.97)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 20,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            zIndex: 200,
          }}
        >
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scroll(l)}
              style={{
                background: "transparent",
                border: "none",
                color: "#e2e8f0",
                padding: "14px 20px",
                borderRadius: 12,
                cursor: "pointer",
                fontSize: 16,
                textAlign: "left",
                fontWeight: 500,
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [typed, setTyped] = useState("");
  const roles = [
    ".NET Full Stack Developer",
    "ASP.NET Core Engineer",
    "C# & Web API Builder",
    "MCA (AI/ML) Student",
  ];
  const [ri, setRi] = useState(0);

  useEffect(() => {
    let i = 0;
    let del = false;
    let timeout;
    const tick = () => {
      const word = roles[ri];
      if (!del) {
        setTyped(word.slice(0, i + 1));
        i++;
        if (i === word.length) {
          del = true;
          timeout = setTimeout(tick, 1800);
          return;
        }
      } else {
        setTyped(word.slice(0, i - 1));
        i--;
        if (i === 0) {
          del = false;
          setRi((r) => (r + 1) % roles.length);
        }
      }
      timeout = setTimeout(tick, del ? 50 : 80);
    };
    timeout = setTimeout(tick, 80);
    return () => clearTimeout(timeout);
  }, [ri]);

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 80px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 800 }}>
        {/* Avatar */}
        <div
          style={{
            width: 130,
            height: 130,
            borderRadius: "50%",
            margin: "0 auto 32px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: -4,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #8b5cf6, #3b82f6, #ec4899)",
              animation: "spin 6s linear infinite",
            }}
          />
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1e1b4b, #1e3a5f)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 64,
              border: "4px solid #0a0a14",
            }}
          >
            👨‍💻
          </div>
        </div>

        <div
          style={{
            display: "inline-block",
            padding: "6px 18px",
            borderRadius: 50,
            background: "rgba(139,92,246,0.15)",
            border: "1px solid rgba(139,92,246,0.3)",
            color: "#a78bfa",
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 20,
            letterSpacing: 1,
          }}
        >
          Available for Opportunities
        </div>

        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(38px,7vw,72px)",
            fontWeight: 800,
            color: "#f1f5f9",
            margin: "0 0 16px",
            lineHeight: 1.1,
          }}
        >
          Hi, I'm{" "}
          <span
            style={{
              background: "linear-gradient(135deg,#a78bfa,#60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ADARSH GUPTA
          </span>
        </h1>

        <h2
          style={{
            fontSize: "clamp(18px,3vw,26px)",
            color: "#64748b",
            fontWeight: 400,
            margin: "0 0 32px",
            minHeight: 40,
          }}
        >
          <span style={{ color: "#a78bfa", fontWeight: 600 }}>{typed}</span>
          <span
            style={{
              animation: "blink 1s steps(1) infinite",
              color: "#a78bfa",
            }}
          >
            |
          </span>
        </h2>

        <p
          style={{
            color: "#94a3b8",
            fontSize: 17,
            lineHeight: 1.8,
            maxWidth: 600,
            margin: "0 auto 48px",
          }}
        >
          Motivated MCA (AI/ML) candidate with hands-on experience in C#,
          ASP.NET Core, and Web API. Passionate about building scalable,
          maintainable software solutions.
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <GlassBtn
            primary
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            💬 Get In Touch
          </GlassBtn>
          <GlassBtn href="https://github.com/Adarsh271402">🐙 GitHub</GlassBtn>
          <GlassBtn href="https://linkedin.com/in/adarsh4007">
            🔗 LinkedIn
          </GlassBtn>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            marginTop: 100,
            color: "#475569",
            fontSize: 15,
            animation: "bounce 2s infinite",
          }}
        >
          ↓ Scroll to explore
        </div>
      </div>
    </section>
  );
}

// ─── Skills ────────────────────────────────────────────────────────────────────
const skillGroups = [
  {
    icon: "💻",
    title: "Languages",
    skills: [
      { name: "C#", pct: 85 },
      { name: "JavaScript", pct: 78 },
      { name: "HTML5/CSS3", pct: 90 },
      { name: "SQL", pct: 80 },
    ],
  },
  {
    icon: "🏗️",
    title: "Frameworks",
    skills: [
      { name: "ASP.NET Core", pct: 82 },
      { name: "ASP.NET MVC", pct: 80 },
      { name: "Web API", pct: 78 },
      { name: "Bootstrap", pct: 85 },
    ],
  },
  {
    icon: "🗄️",
    title: "Databases",
    skills: [
      { name: "SQL Server", pct: 80 },
      { name: "MySQL", pct: 72 },
      { name: "Entity Framework", pct: 76 },
    ],
  },
  {
    icon: "🛠️",
    title: "Tools & Design",
    skills: [
      { name: "Visual Studio", pct: 88 },
      { name: "Git & GitHub", pct: 82 },
      { name: "Figma", pct: 70 },
      { name: "VS Code", pct: 90 },
    ],
  },
];

function SkillBar({ name, pct }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setWidth(pct), 200);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct]);

  return (
    <div ref={ref} style={{ marginBottom: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <span style={{ color: "#cbd5e1", fontSize: 14, fontWeight: 500 }}>
          {name}
        </span>
        <span style={{ color: "#a78bfa", fontSize: 13, fontWeight: 600 }}>
          {pct}%
        </span>
      </div>
      <div
        style={{
          background: "rgba(255,255,255,0.08)",
          borderRadius: 50,
          height: 8,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: 50,
            width: `${width}%`,
            transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
            background: "linear-gradient(90deg, #8b5cf6, #3b82f6)",
          }}
        />
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section
      id="skills"
      style={{
        padding: "100px 24px",
        position: "relative",
        zIndex: 1,
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <SectionHeader tag="What I Work With" title="Technical Skills" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 24,
        }}
      >
        {skillGroups.map((g) => (
          <Glass key={g.title} style={{ padding: "28px 24px" }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>{g.icon}</div>
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                color: "#f1f5f9",
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 20,
              }}
            >
              {g.title}
            </h3>
            {g.skills.map((s) => (
              <SkillBar key={s.name} {...s} />
            ))}
          </Glass>
        ))}
      </div>

      {/* Concept Tags */}
      <div style={{ marginTop: 40, textAlign: "center" }}>
        <p style={{ color: "#64748b", marginBottom: 16, fontSize: 14 }}>
          Also familiar with
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
          }}
        >
          {[
            "OOP",
            "REST API",
            "MVC Architecture",
            "CRUD Operations",
            "Debugging",
            "Responsive Design",
            "UI/UX Design",
          ].map((t) => (
            <span
              key={t}
              style={{
                padding: "8px 18px",
                borderRadius: 50,
                fontSize: 13,
                fontWeight: 500,
                background: "rgba(139,92,246,0.1)",
                border: "1px solid rgba(139,92,246,0.2)",
                color: "#a78bfa",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ──────────────────────────────────────────────────────────────────
const projects = [
  {
    icon: "🌐",
    title: "Personal Portfolio Webpage",
    desc: "Fully responsive, mobile-friendly portfolio website with modern UI/UX, Bootstrap grid, custom CSS, client-side validated contact form, and semantic HTML5 for accessibility.",
    tech: ["HTML5", "CSS3", "Bootstrap", "JavaScript"],
    badge: "FreeCodeCamp · 2024",
    github: "https://github.com/Adarsh271402",
    color: "#8b5cf6",
  },
  {
    icon: "⚙️",
    title: ".NET Full Stack CRUD App",
    desc: "Full-stack web application with ASP.NET Core MVC implementing CRUD on SQL Server. RESTful Web API with Entity Framework Core ORM, responsive Bootstrap front-end, JS validation, OOP principles.",
    tech: ["ASP.NET Core", "C#", "SQL Server", "Entity Framework", "Bootstrap"],
    badge: "Personal Project · 2024",
    github: "https://github.com/Adarsh271402",
    color: "#3b82f6",
  },
];

function Projects() {
  return (
    <section
      id="projects"
      style={{
        padding: "100px 24px",
        position: "relative",
        zIndex: 1,
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <SectionHeader tag="What I've Built" title="Featured Projects" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 28,
        }}
      >
        {projects.map((p) => (
          <Glass
            key={p.title}
            style={{
              padding: 0,
              overflow: "hidden",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            className="project-card"
          >
            {/* Top accent */}
            <div
              style={{
                height: 4,
                background: `linear-gradient(90deg, ${p.color}, #ec4899)`,
              }}
            />
            <div style={{ padding: "28px 28px 24px" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>{p.icon}</div>
              <div
                style={{
                  display: "inline-block",
                  padding: "4px 14px",
                  borderRadius: 50,
                  fontSize: 12,
                  fontWeight: 600,
                  background: `${p.color}20`,
                  border: `1px solid ${p.color}40`,
                  color: p.color,
                  marginBottom: 14,
                }}
              >
                {p.badge}
              </div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  color: "#f1f5f9",
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: 14,
                  lineHeight: 1.3,
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: 15,
                  lineHeight: 1.7,
                  marginBottom: 24,
                }}
              >
                {p.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 24,
                }}
              >
                {p.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "4px 12px",
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#cbd5e1",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <GlassBtn
                href={p.github}
                style={{ fontSize: 13, padding: "10px 20px" }}
              >
                🐙 View on GitHub
              </GlassBtn>
            </div>
          </Glass>
        ))}
      </div>
    </section>
  );
}

// ─── Education & Certs ─────────────────────────────────────────────────────────
function Education() {
  const items = [
    {
      icon: "🎓",
      degree: "MCA — AI & Machine Learning",
      org: "Maharishi University of Information Technology, Noida",
      period: "2023 – 2025 (Expected)",
      sub: "Pursuing",
      color: "#8b5cf6",
    },
    {
      icon: "📘",
      degree: "BCA — Bachelor of Computer Applications",
      org: "Dr. Ram Manohar Lohia Avadh University",
      period: "2021 – 2024",
      sub: "CGPA: 8.0 / 10",
      color: "#3b82f6",
    },
  ];
  const certs = [
    {
      icon: "🏅",
      title: ".NET Full Stack Development Training",
      org: "DUCAT IND",
      year: "2024",
    },
    {
      icon: "🎖️",
      title: "Responsive Web Design",
      org: "FreeCodeCamp",
      year: "2024",
    },
  ];

  return (
    <section
      id="education"
      style={{
        padding: "100px 24px",
        position: "relative",
        zIndex: 1,
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <SectionHeader tag="My Background" title="Education & Certifications" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24,
          marginBottom: 40,
        }}
      >
        {items.map((i) => (
          <Glass
            key={i.degree}
            style={{ padding: "28px 24px", borderLeft: `3px solid ${i.color}` }}
          >
            <div style={{ fontSize: 40, marginBottom: 16 }}>{i.icon}</div>
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                color: "#f1f5f9",
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              {i.degree}
            </h3>
            <p
              style={{
                color: "#94a3b8",
                fontSize: 14,
                marginBottom: 8,
                lineHeight: 1.6,
              }}
            >
              {i.org}
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: 50,
                  fontSize: 12,
                  background: `${i.color}15`,
                  border: `1px solid ${i.color}30`,
                  color: i.color,
                }}
              >
                {i.period}
              </span>
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: 50,
                  fontSize: 12,
                  background: "rgba(255,255,255,0.06)",
                  color: "#94a3b8",
                }}
              >
                {i.sub}
              </span>
            </div>
          </Glass>
        ))}
      </div>
      <h3
        style={{
          fontFamily: "'Syne', sans-serif",
          color: "#f1f5f9",
          fontSize: 20,
          fontWeight: 700,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Certifications
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {certs.map((c) => (
          <Glass
            key={c.title}
            style={{
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div style={{ fontSize: 36, flexShrink: 0 }}>{c.icon}</div>
            <div>
              <p
                style={{
                  color: "#f1f5f9",
                  fontWeight: 600,
                  fontSize: 15,
                  marginBottom: 4,
                }}
              >
                {c.title}
              </p>
              <p style={{ color: "#94a3b8", fontSize: 13 }}>
                {c.org} · {c.year}
              </p>
            </div>
          </Glass>
        ))}
      </div>
    </section>
  );
}

// ─── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // Using EmailJS (free tier — user must sign up at emailjs.com and replace IDs)
  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus("required_fields");
      setTimeout(() => setStatus(null), 3000);
      return;
    }
    setStatus("sending");

    const SERVICE_ID = "service_lkml9vh";
    const TEMPLATE_ID = "template_bls9pwh";
    const PUBLIC_KEY = "WMawZJ6VKTzTLq7iZ"; 

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          subject: form.subject || "Portfolio Contact",
          message: form.message,
          to_name: "Adarsh",
        },
        PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
    setTimeout(() => setStatus(null), 4000);
  };

  const input = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    color: "#f1f5f9",
    fontSize: 15,
    outline: "none",
    transition: "border 0.3s",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  return (
    <section
      id="contact"
      style={{
        padding: "100px 24px 60px",
        position: "relative",
        zIndex: 1,
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <SectionHeader tag="Let's Talk" title="Get In Touch" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 32,
        }}
      >
        {/* Info */}
        <div>
          <Glass style={{ padding: "28px 24px", marginBottom: 20 }}>
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                color: "#f1f5f9",
                fontSize: 20,
                fontWeight: 700,
                marginBottom: 20,
              }}
            >
              Contact Info
            </h3>
            {[
              { icon: "📍", label: "Location", val: "New Ashok Nagar, Delhi" },
              { icon: "📞", label: "Phone", val: "+91 9918294007" },
              { icon: "📧", label: "Email", val: "adarshgupta02027@gmail.com" },
            ].map((c) => (
              <div
                key={c.label}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  marginBottom: 20,
                }}
              >
                <div style={{ fontSize: 24, flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <p
                    style={{
                      color: "#64748b",
                      fontSize: 12,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      marginBottom: 2,
                    }}
                  >
                    {c.label}
                  </p>
                  <p style={{ color: "#cbd5e1", fontSize: 14 }}>{c.val}</p>
                </div>
              </div>
            ))}
          </Glass>
          <div style={{ display: "flex", gap: 12 }}>
            {[
              {
                label: "GitHub",
                href: "https://github.com/Adarsh271402",
                icon: "🐙",
              },
              {
                label: "LinkedIn",
                href: "https://linkedin.com/in/adarsh4007",
                icon: "🔗",
              },
            ].map((s) => (
              <GlassBtn
                key={s.label}
                href={s.href}
                style={{ flex: 1, justifyContent: "center", fontSize: 13 }}
              >
                {s.icon} {s.label}
              </GlassBtn>
            ))}
          </div>

          {/* EmailJS Setup Hint
          <Glass
            style={{
              padding: "16px 20px",
              marginTop: 20,
              borderLeft: "3px solid #f59e0b",
            }}
          >
            <p
              style={{
                color: "#fbbf24",
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              ⚡ How to activate the form
            </p>
            <ol
              style={{
                color: "#94a3b8",
                fontSize: 12,
                lineHeight: 1.8,
                paddingLeft: 16,
                margin: 0,
              }}
            >
              <li>
                Sign up free at{" "}
                <a
                  href="https://emailjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#60a5fa" }}
                >
                  emailjs.com
                </a>
              </li>
              <li>Create a Gmail service + email template</li>
              <li>Replace the 3 IDs in the Contact component</li>
              <li>Add EmailJS CDN script to your HTML</li>
            </ol>
          </Glass> */}
        </div>

        {/* Form */}
        <Glass style={{ padding: "28px 24px" }}>
          <h3
            style={{
              fontFamily: "'Syne', sans-serif",
              color: "#f1f5f9",
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 24,
            }}
          >
            Send a Message
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              style={input}
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              style={input}
            />
            <input
              name="subject"
              placeholder="Subject (optional)"
              value={form.subject}
              onChange={handleChange}
              style={input}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              style={{ ...input, resize: "vertical" }}
            />

            <GlassBtn
              primary
              onClick={handleSubmit}
              style={{
                width: "100%",
                justifyContent: "center",
                opacity: status === "sending" ? 0.7 : 1,
              }}
            >
              {status === "sending" ? "⏳ Sending..." : "🚀 Send Message"}
            </GlassBtn>

            {status === "success" && (
              <div
                style={{
                  padding: "12px 18px",
                  borderRadius: 12,
                  background: "rgba(34,197,94,0.12)",
                  border: "1px solid rgba(34,197,94,0.25)",
                  color: "#4ade80",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                ✅ Message sent! I'll get back to you soon.
              </div>
            )}
            {status === "required_fields" && (
              <div
                style={{
                  padding: "12px 18px",
                  borderRadius: 12,
                  background: "rgba(239,68,68,0.12)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  color: "#f87171",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                ❌ Please fill in all required fields.
              </div>
            )}
            {status === "error" && (
              <div
                style={{
                  padding: "12px 18px",
                  borderRadius: 12,
                  background: "rgba(239,68,68,0.12)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  color: "#f87171",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                ❌ Something went wrong. Please try again.
              </div>
            )}
          </div>
        </Glass>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "40px 24px 30px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 28,
          fontWeight: 800,
          background: "linear-gradient(135deg,#a78bfa,#60a5fa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 12,
        }}
      >
        Adarsh Gupta
      </div>
      <p style={{ color: "#475569", fontSize: 14, marginBottom: 24 }}>
        .NET Full Stack Developer · Delhi, India
      </p>
      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: 32,
        }}
      >
        {[
          { label: "GitHub", href: "https://github.com/Adarsh271402" },
          { label: "LinkedIn", href: "https://linkedin.com/in/adarsh4007" },
          { label: "Email", href: "mailto:adarshgupta02027@gmail.com" },
        ].map((l) => (
          <GlassBtn
            key={l.label}
            href={l.href}
            style={{ fontSize: 13, padding: "8px 20px" }}
          >
            {l.label}
          </GlassBtn>
        ))}
      </div>
      <p style={{ color: "#334155", fontSize: 13 }}>
        © 2024 Adarsh Gupta · Built with React
      </p>
    </footer>
  );
}

// ─── Section Header ────────────────────────────────────────────────────────────
function SectionHeader({ tag, title }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 60 }}>
      <span
        style={{
          padding: "6px 18px",
          borderRadius: 50,
          background: "rgba(139,92,246,0.12)",
          border: "1px solid rgba(139,92,246,0.25)",
          color: "#a78bfa",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: 1,
        }}
      >
        {tag}
      </span>
      <h2
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(28px,5vw,48px)",
          fontWeight: 800,
          color: "#f1f5f9",
          marginTop: 16,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const sections = ["home", "skills", "projects", "education", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            setActive(
              e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1),
            );
        });
      },
      { threshold: 0.4 },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #06060f; font-family: 'DM Sans', sans-serif; color: #f1f5f9; overflow-x: hidden; }

        @keyframes blobFloat1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,30px)} }
        @keyframes blobFloat2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,40px)} }
        @keyframes blobFloat3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-30px)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

        .project-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(139,92,246,0.2); }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .hamburger { display: none !important; }
        }

        input::placeholder, textarea::placeholder { color: #475569; }
        input:focus, textarea:focus { border-color: rgba(139,92,246,0.5) !important; box-shadow: 0 0 0 3px rgba(139,92,246,0.1); }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #06060f; }
        ::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.4); border-radius: 3px; }
      `}</style>

      {/* EmailJS CDN - replace IDs in Contact component */}
      <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
      ></script>

      <ParticleCanvas />
      <Blobs />
      <Nav active={active} setActive={setActive} />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
