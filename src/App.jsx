import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
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
  openSourceCards,
  profile,
  projects,
  researchNotes,
  skills,
} from "./portfolioData";
import { SpatialMotion } from "./SpatialMotion";

const binaryRows = Array.from({ length: 15 }, (_, row) =>
  Array.from({ length: 52 }, (_, column) =>
    ((row * 17 + column * 11 + row * column) % 2).toString(),
  ).join(" "),
);

const contactIcons = {
  GitHub: Code2,
  LinkedIn: BriefcaseBusiness,
  Email: Mail,
};

function RevealGate({ onReveal }) {
  const [leaving, setLeaving] = useState(false);
  const revealTimer = useRef(null);

  useEffect(() => () => {
    if (revealTimer.current) window.clearTimeout(revealTimer.current);
  }, []);

  const triggerReveal = () => {
    if (leaving) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onReveal();
      return;
    }

    setLeaving(true);
    revealTimer.current = window.setTimeout(onReveal, 760);
  };

  return (
    <div
      className={leaving ? "reveal-gate is-leaving" : "reveal-gate"}
      onMouseEnter={triggerReveal}
      onClick={triggerReveal}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") triggerReveal();
      }}
      aria-label={`Reveal ${profile.name}'s portfolio`}
    >
      <div className="binary-field" aria-hidden="true">
        {binaryRows.map((row, index) => (
          <span key={index}>{row}</span>
        ))}
      </div>
      <div className="identity-teaser" aria-hidden="true">
        <img src="/assets/portrait-placeholder.png" alt="" />
        <p>{profile.name}</p>
      </div>
      <p className="reveal-instruction">
        <span className="desktop-instruction">[ HOVER TO REVEAL IDENTITY ]</span>
        <span className="touch-instruction">[ TAP TO REVEAL IDENTITY ]</span>
      </p>
    </div>
  );
}

function Header({ activeSection, menuOpen, setMenuOpen, showNotice }) {
  return (
    <header className="site-header">
      <a className="wordmark" href="#dossier" onClick={() => setMenuOpen(false)}>
        <span>J.</span> SINGH
      </a>
      <nav className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="Primary navigation">
        {navItems.map(([label, id]) => (
          <a
            key={id}
            className={activeSection === id ? "active" : ""}
            href={`#${id}`}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
        <button
          className="resume-link"
          type="button"
          onClick={() => {
            setMenuOpen(false);
            showNotice("Add Joban's verified CV file to activate this download.");
          }}
        >
          CV <ArrowUpRight size={14} aria-hidden="true" />
        </button>
      </nav>
      <button
        className="menu-button"
        type="button"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((current) => !current)}
      >
        {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <span className="scroll-progress" aria-hidden="true" />
    </header>
  );
}

function SectionTitle({ kicker, children, tone = "default" }) {
  return (
    <div className={`section-heading section-heading--${tone}`}>
      <p>{kicker}</p>
      <h2>{children}</h2>
    </div>
  );
}

function ProjectDialog({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.body.classList.add("dialog-open");
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("dialog-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <article
        className="project-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="dialog-close" type="button" onClick={onClose} aria-label="Close project details">
          <X aria-hidden="true" />
        </button>
        <img src={project.image} alt="" />
        <p className="eyebrow">PROJECT STUDY / {project.index}</p>
        <h2 id="project-dialog-title">{project.title}</h2>
        <p>{project.details}</p>
        <div className="tag-row">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </article>
    </div>
  );
}

function App() {
  const [revealed, setRevealed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dossier");
  const [selectedProject, setSelectedProject] = useState(null);
  const [notice, setNotice] = useState("");
  const milestoneRail = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("gate-open", !revealed);
    return () => document.body.classList.remove("gate-open");
  }, [revealed]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 },
    );

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -60%", threshold: [0.08, 0.25, 0.5] },
    );

    document.querySelectorAll("[data-reveal]").forEach((node) => revealObserver.observe(node));
    navItems.forEach(([, id]) => {
      const node = document.getElementById(id);
      if (node) sectionObserver.observe(node);
    });

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!notice) return undefined;
    const timeout = window.setTimeout(() => setNotice(""), 3600);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const scrollMilestones = (direction) => {
    const rail = milestoneRail.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.82, behavior: "smooth" });
  };

  return (
    <>
      {!revealed && <RevealGate onReveal={() => setRevealed(true)} />}
      <div className={revealed ? "site-shell is-revealed" : "site-shell"}>
        <Header
          activeSection={activeSection}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          showNotice={setNotice}
        />

        <main>
          <section className="hero section-wrap" id="dossier" aria-labelledby="hero-title">
            <div className="identity-stage" data-reveal>
              <figure className="identity-stage__portrait spatial-depth">
                <img className="spatial-depth__surface" src="/assets/portrait-placeholder.png" alt="Anonymous profile placeholder for Jobanpreet Singh" />
                <figcaption>
                  <strong>{profile.name}</strong>
                  <span>{profile.role}</span>
                </figcaption>
              </figure>
            </div>
            <div className="hero-panel">
              <div className="hero-copy" data-reveal>
                <p className="eyebrow">DOSSIER / 2026</p>
                <h1 id="hero-title">Developer &amp;<br /><em>digital builder</em></h1>
                <p className="hero-intro">{profile.strapline}</p>
                <a className="text-link" href="#projects">
                  Explore selected work <ArrowRight size={17} aria-hidden="true" />
                </a>
              </div>
              <figure className="portrait-card spatial-depth" data-reveal>
                <img className="spatial-depth__surface" src="/assets/portrait-placeholder.png" alt="Anonymous profile placeholder for Jobanpreet Singh" />
                <figcaption>
                  <span>{profile.name}</span>
                  <span>{profile.role}</span>
                </figcaption>
              </figure>
            </div>
            <div className="hero-meta" data-reveal>
              <span>Thoughtful software &amp; useful experiments</span>
              <span>{profile.status}</span>
              <span>Available for the next chapter</span>
            </div>
          </section>

          <section className="skills-section section-wrap" id="skills">
            <SectionTitle kicker="01 / WORKING SET">Skills with room to grow.</SectionTitle>
            <div className="skill-cloud" data-reveal>
              {skills.map((skill, index) => (
                <span className={`skill-orb skill-orb--${(index % 4) + 1}`} key={skill}>{skill}</span>
              ))}
            </div>
          </section>

          <section className="open-section" aria-labelledby="open-title">
            <div className="section-wrap">
              <div className="dark-heading" data-reveal>
                <p>OPEN PRACTICE</p>
                <h2 id="open-title">Building in the open.</h2>
              </div>
              <div className="open-grid">
                {openSourceCards.map((card) => (
                  <article className="open-card spatial-depth" key={card.title} data-reveal>
                    <img className="spatial-depth__surface" src={card.image} alt="" />
                    <div>
                      <p className="eyebrow">{card.label}</p>
                      <h3>{card.title}</h3>
                      <div className="tag-row tag-row--dark">
                        {card.tags.map((tag) => <span key={tag}>{tag}</span>)}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="experience-section section-wrap" id="experience">
            <SectionTitle kicker="02 / EXPERIENCE">The work in progress.</SectionTitle>
            <article className="experience-card" data-reveal>
              <div className="experience-lead">
                <p className="eyebrow">WORKING PRINCIPLES</p>
                <h3>Clarity before complexity.</h3>
                <p>
                  Good software starts with honest constraints, readable decisions, and care for the
                  people using it. This portfolio is built around those principles.
                </p>
              </div>
              <div className="experience-stats" aria-label="Portfolio readiness">
                <div><strong>03</strong><span>concept studies</span></div>
                <div><strong>100%</strong><span>responsive</span></div>
                <div><strong>01</strong><span>clear system</span></div>
              </div>
              <div className="experience-note">
                <Code2 aria-hidden="true" />
                <p>Skills, projects, and links live in one data file, keeping future updates focused and safe.</p>
              </div>
            </article>
          </section>

          <section className="projects-section section-wrap" id="projects">
            <SectionTitle kicker="03 / SELECTED WORK">Projects, clearly framed.</SectionTitle>
            <div className="project-list">
              {projects.map((project, index) => (
                <article className={`project-card ${index % 2 ? "project-card--reverse" : ""}`} key={project.title} data-reveal>
                  <button className="project-visual spatial-depth" type="button" onClick={() => setSelectedProject(project)} aria-label={`Open details for ${project.title}`}>
                    <img className="spatial-depth__surface" src={project.image} alt={`${project.title} interface study`} />
                    <span><ArrowUpRight aria-hidden="true" /> View study</span>
                  </button>
                  <div className="project-copy">
                    <div className="project-index"><span>{project.index}</span><span>{project.date}</span></div>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <div className="tag-row">
                      {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <button className="text-link" type="button" onClick={() => setSelectedProject(project)}>
                      Read project note <ArrowRight size={17} aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="research-section" id="research">
            <div className="section-wrap research-inner">
              <SectionTitle kicker="04 / RESEARCH NOTES" tone="dark">Questions worth keeping.</SectionTitle>
              <div className="paper-stack">
                {researchNotes.map((note, index) => (
                  <article className={`research-paper research-paper--${index + 1}`} key={note.code} tabIndex={0} data-reveal>
                    <div className="paper-topline"><span>{note.code}</span><span>{note.date}</span></div>
                    <BookOpen aria-hidden="true" />
                    <h3>{note.title}</h3>
                    <p className="paper-affiliation">{note.affiliation}</p>
                    <p className="paper-detail">{note.detail}</p>
                    <span className="paper-number">0{index + 1}</span>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="milestones-section" id="achievements">
            <div className="section-wrap milestone-heading">
              <SectionTitle kicker="05 / MILESTONES">A foundation, not a fiction.</SectionTitle>
              <div className="rail-controls">
                <button type="button" onClick={() => scrollMilestones(-1)} aria-label="Previous milestone"><ArrowLeft aria-hidden="true" /></button>
                <button type="button" onClick={() => scrollMilestones(1)} aria-label="Next milestone"><ArrowRight aria-hidden="true" /></button>
              </div>
            </div>
            <div className="milestone-rail" ref={milestoneRail}>
              {milestones.map((milestone) => (
                <article className="milestone-card" key={milestone.index} data-reveal>
                  <img src={milestone.image} alt="" />
                  <div className="milestone-copy">
                    <div className="milestone-topline"><span>{milestone.index}</span><span>{milestone.eyebrow}</span></div>
                    <h3>{milestone.title}</h3>
                    <p>{milestone.description}</p>
                    <span className="milestone-tag">{milestone.tag}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="background-section section-wrap" id="education">
            <SectionTitle kicker="06 / BACKGROUND">The facts belong here.</SectionTitle>
            <div className="background-grid">
              {backgroundCards.map((card) => (
                <article className="background-card" key={card.number} data-reveal>
                  <div className="background-topline"><span>{card.number}</span><span>{card.status}</span></div>
                  <p className="background-period">{card.period} · {card.location}</p>
                  <h3>{card.title}</h3>
                  <p className="background-subtitle">{card.subtitle}</p>
                  <ul>{card.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                  <p className="background-result">{card.result}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="contact-section" id="contact">
            <div className="section-wrap contact-inner">
              <div className="contact-intro" data-reveal>
                <p className="eyebrow">07 / CONTACT</p>
                <h2>Let's make<br /><em>something useful.</em></h2>
                <p>This contact rail is ready for Joban's verified GitHub, LinkedIn, and email.</p>
              </div>
              <div className="contact-list" data-reveal>
                {contactItems.map(([name, description]) => {
                  const Icon = contactIcons[name];
                  return (
                    <button key={name} type="button" onClick={() => setNotice(`Add Joban's verified ${name} link to activate this.`)}>
                      <Icon aria-hidden="true" />
                      <span><strong>{name}</strong><small>{description}</small></span>
                      <ArrowUpRight aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <span>© 2026 {profile.name}</span>
          <span>Designed with restraint. Built with care.</span>
          <a href="#dossier">Back to top ↑</a>
        </footer>
      </div>

      <SpatialMotion active={revealed} />

      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
      {notice && <div className="notice" role="status">{notice}</div>}
    </>
  );
}

export default App;
