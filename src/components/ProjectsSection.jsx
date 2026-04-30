import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../entities/project";
import { Github, ExternalLink, X } from "lucide-react";
import { Badge } from "./ui/badge";

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handle = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
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
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          className="relative z-10 bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          {project.image_url ? (
            <div className="h-52 overflow-hidden bg-slate-100">
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div
              className="h-52 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center"
            >
              <span className="text-5xl font-bold text-slate-300 select-none">
                {project.title.charAt(0)}
              </span>
            </div>
          )}

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow hover:bg-white transition-colors"
          >
            <X className="w-4 h-4 text-slate-700" />
          </button>

          {/* Body */}
          <div className="p-7">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="text-2xl font-bold text-slate-900">{project.title}</h3>
              <span className="text-xs text-slate-400 font-mono mt-1.5 shrink-0">{project.year}</span>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-5">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-xs bg-slate-100 text-slate-700"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
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
      className="relative rounded-xl overflow-hidden cursor-pointer bg-slate-100 aspect-[4/3]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image or placeholder */}
      {project.image_url ? (
        <img
          src={project.image_url}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
        >
          <span className="text-6xl font-black text-slate-400/50 select-none">
            {project.title.charAt(0)}
          </span>
        </div>
      )}

      {/* Hover overlay */}
      <div
        className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <h3 className="text-white font-bold text-lg text-center px-4 leading-snug mb-2">
          {project.title}
        </h3>
        {project.category && (
          <span className="text-white/60 text-xs tracking-widest uppercase">
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

  const categories = ["All", "Data & AI", "Web Development", "Embedded Systems"];

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await Project.list("order");
      setProjects(data);
    } catch (error) {
      console.error("Error loading projects:", error);
    }
    setLoading(false);
  };

  const filteredProjects =
    category === "All"
      ? projects
      : projects.filter((p) => p.category === category);

  return (
    <section id="projects" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Projects</h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            A selection of things I've built — click any card for details.
          </p>

          {/* Category filter */}
          <div className="flex justify-center gap-3 mt-8 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  category === cat
                    ? "bg-slate-900 text-white shadow"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400"
                }`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelected(project)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-slate-400">No projects in this category.</div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}