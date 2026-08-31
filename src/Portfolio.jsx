import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Code2,
  Mail,
  Menu,
  X,
} from "lucide-react";
import {
  backgroundCards,
  contactItems,
  milestones,
  navItems,
  profile,
  projects,
  researchNotes,
  skills,
} from "./portfolioData.js";
import PortfolioMotion from "./PortfolioMotion.jsx";

const skillGroups = [
  {
    index: "01",
    title: "Build",
    note: "Languages and tools for turning an idea into a working system.",
    items: skills.slice(0, 6),
  },
  {
    index: "02",
    title: "System",
    note: "The practical layer that keeps software dependable, intelligent, and fast.",
    items: skills.slice(6, 12),
  },
  {
    index: "03",
    title: "Craft",
    note: "Engineering disciplines and standards that deliver real product execution.",
    items: skills.slice(12),
  },
];

const principles = [
  {
    index: "A",
    title: "Clarity",
    copy: "Make the next action obvious and let detail arrive when it is useful.",
  },
  {
    index: "B",
    title: "Access",
    copy: "Treat keyboard, contrast, motion, and readable structure as core product work.",
  },
  {
    index: "C",
    title: "Maintainability",
    copy: "Prefer systems that can absorb real content without needing a visual rebuild.",
  },
];

const heroCapabilities = [
  ["01", "Interface systems", "Clear components, responsive grids, and resilient layouts."],
  ["02", "AI & ML integration", "Generative AI pipelines, studio architectures, and structured agents."],
  ["03", "Systems & performance", "Typed data pipelines, low-latency execution, and C++ foundations."],
  ["04", "Practical execution", "Focused web utilities and tools shipped to production."],
];

const trackedSectionIds = ["dossier", ...navItems.map(([, id]) => id)];

const contactIcons = {
  GitHub: Code2,
  LinkedIn: BriefcaseBusiness,
  Email: Mail,
};

function SectionHeader({ index, eyebrow, title, light = false }) {
  return (
    <div className={`section-heading${light ? " section-heading--light" : ""}`} data-motion="heading">
      <div className="section-heading__meta">
        <span>{index}</span>
        <span>{eyebrow}</span>
      </div>
      <h2>{title}</h2>
    </div>
  );
}

function Header({ activeSection, menuOpen, setMenuOpen }) {
  return (
    <header className="site-header">
      <a className="brand" href="#dossier" aria-label="Jobanpreet Singh Gill, back to top">
        <span className="brand__mark">JSG</span>
        <span className="brand__name">Jobanpreet<br />Singh Gill</span>
      </a>

      <nav
        id="primary-navigation"
        className={`site-nav${menuOpen ? " is-open" : ""}`}
        aria-label="Primary navigation"
      >
        <span className="site-nav__label">Index</span>
        {navItems.map(([label, id], index) => (
          <a
            key={id}
            href={`#${id}`}
            className={activeSection === id ? "is-active" : ""}
            aria-current={activeSection === id ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {label}
          </a>
        ))}
      </nav>

      <a
        className="header-cta"
        href="https://github.com/Joban33"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub Profile
        <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.6} />
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
    </header>
  );
}

function ProjectDialog({ project, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;
    const previousFocus = document.activeElement;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.body.classList.add("dialog-open");
    document.addEventListener("keydown", handleKeyDown);
    requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.classList.remove("dialog-open");
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus?.();
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="project-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button ref={closeButtonRef} className="dialog-close" type="button" onClick={onClose}>
          Close <X aria-hidden="true" size={18} />
        </button>
        <div className="project-dialog__image">
          <img src={project.image} alt={project.title} />
        </div>
        <div className="project-dialog__copy">
          <p className="mono-label">{project.index} / {project.date}</p>
          <h2 id="project-dialog-title">{project.title}</h2>
          <p>{project.details}</p>
          <ul className="tag-list" aria-label="Project tags">
            {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
          {project.repo && (
            <div style={{ marginTop: "1.5rem" }}>
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="primary-action"
                style={{ display: "inline-flex", marginTop: 0 }}
              >
                View Repository on GitHub
                <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.6} />
              </a>
            </div>
          )}
          <p className="dialog-note">Open-source build repository on GitHub.</p>
        </div>
      </section>
    </div>
  );
}

export default function Portfolio() {
  const rootRef = useRef(null);
  const milestoneViewportRef = useRef(null);
  const [activeSection, setActiveSection] = useState("dossier");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const sections = trackedSectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -58%", threshold: [0, 0.1, 0.35] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const closeProject = useCallback(() => setSelectedProject(null), []);

  const scrollMilestones = (direction) => {
    const viewport = milestoneViewportRef.current;
    if (!viewport) return;
    viewport.scrollBy({ left: direction * viewport.clientWidth * 0.82, behavior: "smooth" });
  };

  return (
    <div ref={rootRef} className="portfolio-shell">
      <PortfolioMotion rootRef={rootRef} />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header
        activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <main id="main-content">
        <section id="dossier" className="hero" data-section>
          <div className="hero__statement">
            <p className="hero__hello" data-hero="label">Hello, I&apos;m Jobanpreet.</p>
            <h1 aria-label="Software builder and computer science student">
              <span data-hero="line">Software</span>
              <span className="hero__serif" data-hero="line">&amp; systems</span>
              <span data-hero="line">builder</span>
            </h1>
            <p className="hero__lead" data-hero="copy">{profile.strapline}</p>
            <a className="primary-action" href="#projects" data-hero="copy">
              View selected builds
              <ArrowDownRight aria-hidden="true" size={19} strokeWidth={1.6} />
            </a>
          </div>

          <figure className="hero__portrait" data-hero="portrait">
            <div className="hero__portrait-frame">
              <img
                src="/assets/joban-portrait.jpg"
                alt="Studio portrait of Jobanpreet Singh Gill in a suit and turban"
                fetchPriority="high"
              />
            </div>
            <figcaption>Jobanpreet Singh Gill / Computer Science &amp; Systems</figcaption>
          </figure>

          <aside className="hero__proof" aria-label="Portfolio summary" data-hero="proof">
            <p className="mono-label">Portfolio proof</p>
            <dl>
              <div>
                <dt>03</dt>
                <dd>Featured repositories</dd>
              </div>
              <div>
                <dt>06</dt>
                <dd>Technical accreditations</dd>
              </div>
              <div>
                <dt>2026</dt>
                <dd>Current portfolio edition</dd>
              </div>
            </dl>
            <p className="hero__availability"><span /> {profile.status}</p>
          </aside>

          <div className="hero__capabilities" data-hero="capabilities">
            {heroCapabilities.map(([index, title, copy]) => (
              <article key={index}>
                <span>{index}</span>
                <h2>{title}</h2>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="skills-section section-space" data-section>
          <SectionHeader index="01" eyebrow="Capability ledger" title="A working set, organised by purpose." />
          <div className="capability-ledger">
            {skillGroups.map((group) => (
              <article className="capability-row" key={group.index} data-motion="row">
                <div className="capability-row__index">{group.index}</div>
                <div className="capability-row__title">
                  <h3>{group.title}</h3>
                  <p>{group.note}</p>
                </div>
                <ul className="capability-row__items">
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="principles-section section-space" data-section>
          <div className="principles-intro" data-motion="block">
            <p className="mono-label">02 / Working principles</p>
            <h2>Useful software starts with what people need to understand.</h2>
          </div>
          <div className="principle-grid">
            {principles.map((principle) => (
              <article key={principle.index} data-motion="card">
                <span>{principle.index}</span>
                <h3>{principle.title}</h3>
                <p>{principle.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="projects-section section-space" data-section>
          <SectionHeader index="03" eyebrow="Selected builds" title="Software engineered for real utility and exploration." />
          <div className="study-grid">
            {projects.map((project, index) => (
              <article
                className={`study-card${index === 0 ? " study-card--featured" : ""}`}
                key={project.title}
                data-motion="card"
              >
                <div className="study-card__image" data-parallax>
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    width="1200"
                    height="900"
                  />
                  <span>{project.index}</span>
                </div>
                <div className="study-card__body">
                  <p className="mono-label">{project.date}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <ul className="tag-list" aria-label={`${project.title} tags`}>
                    {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <button className="text-action" type="button" onClick={() => setSelectedProject(project)}>
                    Inspect build <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.6} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="research" className="research-section section-space" data-section>
          <SectionHeader index="04" eyebrow="Technical investigations" title="Topics and systems under active study." light />
          <div className="research-list">
            {researchNotes.map((note) => (
              <article key={note.code} data-motion="row">
                <div className="research-list__code">
                  <span>{note.code}</span>
                  <span>{note.date}</span>
                </div>
                <div>
                  <p>{note.affiliation}</p>
                  <h3>{note.title}</h3>
                </div>
                <p className="research-list__detail">{note.detail}</p>
                <ArrowUpRight aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section id="achievements" className="milestones-section" data-section>
          <div className="milestone-pin">
            <div className="milestone-topbar">
              <p><span>05</span> / Engineering journey</p>
              <p>Scroll to move across the chapter</p>
              <div className="milestone-controls" aria-label="Milestone navigation">
                <button type="button" onClick={() => scrollMilestones(-1)} aria-label="Previous milestone">
                  <ChevronLeft aria-hidden="true" />
                </button>
                <button type="button" onClick={() => scrollMilestones(1)} aria-label="Next milestone">
                  <ChevronRight aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="milestone-progress" aria-hidden="true"><span /></div>
            <div className="milestone-viewport" ref={milestoneViewportRef}>
              <div className="milestone-track">
                <div className="milestone-intro">
                  <p className="mono-label">Growth through execution</p>
                  <h2>Disciplined foundations, modern systems.</h2>
                  <p>From low-level computing and algorithm design to generative AI and production web apps.</p>
                </div>
                {milestones.map((milestone) => (
                  <article className="milestone-card" key={milestone.index}>
                    <div className="milestone-card__image">
                      <img src={milestone.image} alt={milestone.title} loading="lazy" width="1200" height="900" />
                    </div>
                    <div className="milestone-card__body">
                      <p className="mono-label">{milestone.index} / {milestone.eyebrow}</p>
                      <h3>{milestone.title}</h3>
                      <p>{milestone.description}</p>
                      <span>{milestone.tag}</span>
                    </div>
                  </article>
                ))}
                <div className="milestone-endcap" aria-label="End of milestone sequence">
                  <span>End / 05</span>
                  <p>Credentials continue below.</p>
                  <ArrowDownRight aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="background-section section-space" data-section>
          <SectionHeader index="06" eyebrow="Credentials & Academics" title="Verified accreditations and technical education." />
          <div className="background-list">
            {backgroundCards.map((card) => (
              <article key={card.number} data-motion="row">
                <div className="background-list__meta">
                  <span>{card.number}</span>
                  <span>{card.period}</span>
                  <span>{card.status}</span>
                </div>
                <div className="background-list__title">
                  <p>{card.location}</p>
                  <h3>{card.title}</h3>
                  <span>{card.subtitle}</span>
                </div>
                <ul>
                  {card.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
                <p className="background-list__result">{card.result}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section" data-section>
          <div className="contact-section__intro" data-motion="block">
            <p className="mono-label">07 / Contact</p>
            <h2>Have a project or opportunity?</h2>
            <p>Connect across professional networks or get in touch directly via email.</p>
          </div>
          <div className="contact-list">
            {contactItems.map((item, index) => {
              const Icon = contactIcons[item.label];
              const isExternal = item.url.startsWith("http");
              return (
                <a
                  key={item.label}
                  href={item.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="contact-list__link"
                  data-motion="row"
                >
                  <span className="contact-list__index">0{index + 1}</span>
                  <Icon aria-hidden="true" size={22} strokeWidth={1.5} />
                  <span><strong>{item.label}</strong><small>{item.detail}</small></span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              );
            })}
          </div>
          <footer>
            <p>© 2026 {profile.name}</p>
            <a href="#dossier">Back to top <ArrowUpRight aria-hidden="true" size={16} /></a>
          </footer>
        </section>
      </main>

      <ProjectDialog project={selectedProject} onClose={closeProject} />
    </div>
  );
}
