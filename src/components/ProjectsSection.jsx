import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../entities/project";
import { Github, ExternalLink, X } from "lucide-react";

const categories = ["All", "Data & AI", "Web Development", "Embedded Systems"];

// lighter-than-bg card
const raised = {
  background: "rgba(255,252,245,0.55)",
  border: "1px solid rgba(220,210,190,0.55)",
  borderRadius: 12,
  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
};

// darker recessed area
const inset = {
  background: "rgba(160,150,130,0.14)",
  border: "1px solid rgba(160,150,130,0.22)",
  borderRadius: 12,
};

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0"
          style={{ background: "rgba(42,42,32,0.78)", backdropFilter: "blur(6px)" }} />

        <motion.div
          className="relative z-10 max-w-lg w-full overflow-hidden"
          style={{
            background: "#ece7d9",
            border: "1px solid rgba(200,190,170,0.5)",
            borderRadius: 16,
            boxShadow: "0 32px 64px rgba(0,0,0,0.35)",
          }}
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {project.image_url ? (
            <div className="h-48 overflow-hidden">
              <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center"
              style={{ background: "rgba(180,170,150,0.2)", borderBottom: "1px solid rgba(200,190,170,0.3)" }}>
              <span className="text-6xl font-black select-none"
                style={{ color: "rgba(120,110,90,0.2)", fontFamily: "'Georgia', serif" }}>
                {project.title.charAt(0)}
              </span>
            </div>
          )}

          <button onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(236,231,217,0.92)", border: "1px solid rgba(200,190,170,0.4)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#ece7d9"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(236,231,217,0.92)"; }}
          >
            <X className="w-4 h-4 text-stone-600" />
          </button>

          <div className="p-7">
            {/* Header row inside modal — raised contrast strip */}
            <div style={{ ...raised, padding: "12px 16px", marginBottom: 16, borderRadius: 8 }}
              className="flex items-start justify-between gap-3">
              <h3 className="text-xl font-bold text-stone-800 leading-snug"
                style={{ fontFamily: "'Georgia', serif" }}>
                {project.title}
              </h3>
              <span className="text-xs text-stone-400 font-mono mt-1.5 shrink-0">{project.year}</span>
            </div>

            <p className="text-stone-600 text-sm leading-relaxed mb-5">{project.description}</p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.technologies.map((t) => (
                <span key={t}
                  className="px-2.5 py-1 text-xs rounded text-stone-600"
                  style={{ background: "rgba(180,170,150,0.28)", border: "1px solid rgba(180,170,150,0.4)" }}>
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              {project.github_url && (
                <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{ background: "#3d3d30", color: "#f0ebe2", border: "1px solid rgba(200,190,170,0.15)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#2a2a20"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#3d3d30"; }}>
                  <Github className="w-4 h-4" /> GitHub
                </a>
              )}
              {project.live_url && (
                <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{ background: "rgba(180,170,150,0.28)", color: "#5a5040", border: "1px solid rgba(180,170,150,0.4)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(180,170,150,0.45)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(180,170,150,0.28)"; }}>
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectCard({ project, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative rounded-xl overflow-hidden cursor-pointer aspect-[4/3]"
      style={raised}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {project.image_url ? (
        <img
          src={project.image_url}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center transition-transform duration-500"
          style={{ background: "rgba(220,215,200,0.6)", transform: hovered ? "scale(1.04)" : "scale(1)" }}>
          <span className="text-7xl font-black select-none"
            style={{ color: "rgba(120,110,90,0.18)", fontFamily: "'Georgia', serif" }}>
            {project.title.charAt(0)}
          </span>
        </div>
      )}

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0, background: "rgba(42,42,32,0.78)" }}
      >
        <h3 className="font-bold text-base text-center px-5 leading-snug mb-1.5"
          style={{ color: "#f0ebe2", fontFamily: "'Georgia', serif" }}>
          {project.title}
        </h3>
        {project.category && (
          <span className="text-xs tracking-widest uppercase"
            style={{ color: "rgba(220,210,195,0.55)" }}>
            {project.category}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [category, setCategory] = useState("All");

  useEffect(() => { loadProjects(); }, []);

  const loadProjects = async () => {
    try { setProjects(await Project.list("order")); }
    catch (e) { console.error(e); }
    setLoading(false);
  };

  const filtered = category === "All" ? projects : projects.filter((p) => p.category === category);

  return (
    <section id="projects" className="py-20" style={{ background: "transparent" }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header + filter bar — inset recessed area */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-xs tracking-[0.2em] text-stone-500 uppercase mb-2 font-mono">Work</p>
          <h2 className="text-5xl font-bold text-stone-800 leading-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            Projects
          </h2>
          <div className="mt-4 w-10 h-px" style={{ background: "rgba(120,110,90,0.4)" }} />
        </motion.div>

        {/* Filter pill bar — inset tray */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          style={inset}
          className="px-5 py-4 mb-8 flex flex-wrap gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
              style={
                category === cat
                  ? { background: "#3d3d30", color: "#f0ebe2", border: "1px solid transparent" }
                  : { background: "rgba(255,252,245,0.4)", color: "#6b6354", border: "1px solid rgba(200,190,170,0.35)" }
              }
              onMouseEnter={(e) => {
                if (category !== cat) e.currentTarget.style.background = "rgba(255,252,245,0.65)";
              }}
              onMouseLeave={(e) => {
                if (category !== cat) e.currentTarget.style.background = "rgba(255,252,245,0.4)";
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid — raised cards on the grain background */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-xl animate-pulse"
                style={{ background: "rgba(200,190,170,0.25)" }} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} onClick={() => setSelected(p)} />
            ))}
          </div>
        ) : (
          <p className="text-center py-16 text-stone-400 text-sm">No projects in this category.</p>
        )}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}