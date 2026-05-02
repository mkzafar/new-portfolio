import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Experience } from "../entities/experience";
import { ExternalLink, MapPin } from "lucide-react";
import { format } from "date-fns";
import bmsLogo from "@/assets/bms-lab.png";
import riipenLogo from "@/assets/riipen.avif";
import ssadcLogo from "@/assets/ssadc.jpg";
import scotialogo from "@/assets/scotialogo.jpeg";

const COMPANY_LOGOS = {
  "BMS Lab @ University of Twente": bmsLogo,
  "Freelance @ Riipen": riipenLogo,
  "YorkU Application Development Services": ssadcLogo,
  "Scotiabank": scotialogo,
};

function getLogoFor(company) { return COMPANY_LOGOS[company] || null; }
function getInitials(name = "") {
  const p = name.trim().split(/\s+/);
  return ((p[0]?.[0] || "") + (p[1]?.[0] || "")).toUpperCase() || "·";
}

const raised = {
  background: "rgba(255,252,245,0.55)",
  border: "1px solid rgba(220,210,190,0.55)",
  borderRadius: 12,
  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
};

const inset = {
  background: "rgba(160,150,130,0.14)",
  border: "1px solid rgba(160,150,130,0.22)",
  borderRadius: 12,
};

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadExperiences(); }, []);

  const loadExperiences = async () => {
    try { setExperiences(await Experience.list("-start_date")); }
    catch (e) { console.error(e); }
    setLoading(false);
  };

  const fmt = (d) => d ? format(new Date(d), "MMM yyyy") : "Present";

  return (
    <section id="experience" className="py-20" style={{ background: "transparent" }}>
      <div className="max-w-3xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-xs tracking-[0.2em] text-stone-500 uppercase mb-2 font-mono">Career</p>
          <h2 className="text-5xl font-bold text-stone-800 leading-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            Experience
          </h2>
          <div className="mt-4 w-10 h-px" style={{ background: "rgba(120,110,90,0.4)" }} />
        </motion.div>

        {loading ? (
          <div className="space-y-8 pl-10">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-28 rounded-xl animate-pulse"
                style={{ background: "rgba(200,190,170,0.2)" }} />
            ))}
          </div>
        ) : (
          <div className="relative">
            {/* Vertical timeline line */}
            <div
              className="absolute top-0 bottom-0"
              style={{
                left: 19,
                width: 1,
                background: "rgba(160,150,130,0.35)",
              }}
              aria-hidden
            />

            <div className="space-y-6">
              {experiences.map((exp, i) => {
                const logo = getLogoFor(exp.company);
                const panel = i % 2 === 0 ? raised : inset;

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    viewport={{ once: true }}
                    className="relative flex gap-6"
                  >
                    {/* Logo dot — sits on the line */}
                    <div className="shrink-0 z-10" style={{ marginTop: 2 }}>
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
                        style={{
                          background: "rgba(230,225,211,0.85)",
                          border: "1px solid rgba(200,190,170,0.6)",
                          boxShadow: "0 0 0 3px rgba(230,225,211,0.5)",
                        }}
                      >
                        {logo ? (
                          <img src={logo} alt={exp.company} className="w-full h-full object-contain" loading="lazy" />
                        ) : (
                          <span style={{ fontSize: 11, fontWeight: 700, color: "#7a7060" }}>
                            {getInitials(exp.company)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card */}
                    <div style={panel} className="p-6 flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-stone-800 text-base leading-snug">
                            {exp.position}
                          </h3>
                          <a
                            href={exp.company_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-800 transition-colors mt-0.5"
                          >
                            {exp.company}
                            <ExternalLink className="w-3 h-3 opacity-50" />
                          </a>
                        </div>

                        <div className="text-right shrink-0">
                          <p className="text-xs font-mono text-stone-400">
                            {fmt(exp.start_date)} — {fmt(exp.end_date)}
                          </p>
                          {exp.location && (
                            <p className="flex items-center gap-1 justify-end text-xs text-stone-400 mt-0.5">
                              <MapPin className="w-3 h-3" />
                              {exp.location}
                            </p>
                          )}
                        </div>
                      </div>

                      {exp.bullets?.length > 0 && (
                        <ul className="space-y-1.5 mt-3 mb-4">
                          {exp.bullets.map((b, j) => (
                            <li key={j} className="flex gap-2 text-sm text-stone-600 leading-relaxed">
                              <span className="mt-2 w-1 h-1 rounded-full bg-stone-400/70 shrink-0" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}

                      {exp.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {exp.tags.map((tag) => (
                            <span key={tag}
                              className="px-2.5 py-0.5 text-xs rounded text-stone-500"
                              style={{
                                background: "rgba(180,170,150,0.22)",
                                border: "1px solid rgba(180,170,150,0.35)",
                              }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
