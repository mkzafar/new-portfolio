import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Experience } from "../entities/experience";
import { Badge } from "./ui/badge";
import { ExternalLink, MapPin } from "lucide-react";
import { format } from "date-fns";
import bmsLogo from "@/assets/bms-lab.png";
import riipenLogo from "@/assets/riipen.avif";
import ssadcLogo from "@/assets/ssadc.jpg";

const COMPANY_LOGOS = {
  "BMS Lab @ University of Twente": bmsLogo,
  "Freelance @ Riipen": riipenLogo,
  "YorkU Application Development Services": ssadcLogo,
};

function getLogoFor(company) {
  return COMPANY_LOGOS[company] || null;
}

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/);
  const letters = (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
  return letters.toUpperCase() || "·";
}

function ExperienceCard({ exp, formatDate, align }) {
  const isRight = align === "right";
  return (
    <div>
      <p className={`text-sm text-slate-400 font-mono mb-1 ${isRight ? "text-right" : ""}`}>
        {formatDate(exp.start_date)} — {formatDate(exp.end_date)}
      </p>
      <h3 className={`text-lg font-semibold text-slate-900 leading-snug ${isRight ? "text-right" : ""}`}>
        {exp.position}
      </h3>
      <div className={`flex items-center gap-1.5 mt-0.5 ${isRight ? "justify-end" : ""}`}>
        <a
          href={exp.company_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors flex items-center gap-1"
        >
          {exp.company}
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>
      </div>
      {exp.location && (
        <p className={`text-xs text-slate-400 flex items-center gap-1 mt-0.5 ${isRight ? "justify-end" : ""}`}>
          <MapPin className="w-3 h-3" />
          {exp.location}
        </p>
      )}
      {exp.bullets && exp.bullets.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {exp.bullets.map((bullet, i) => (
            <li
              key={i}
              className={`text-sm text-slate-600 leading-relaxed flex gap-2 ${isRight ? "flex-row-reverse text-right" : ""}`}
            >
              <span className="mt-2 w-1 h-1 rounded-full bg-slate-400 shrink-0" />
              {bullet}
            </li>
          ))}
        </ul>
      )}
      {exp.tags && exp.tags.length > 0 && (
        <div className={`flex flex-wrap gap-1.5 mt-4 ${isRight ? "justify-end" : ""}`}>
          {exp.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="px-2.5 py-0.5 text-xs bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const data = await Experience.list("-start_date");
      setExperiences(data);
    } catch (error) {
      console.error("Error loading experiences:", error);
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Present";
    return format(new Date(dateString), "MMM yyyy");
  };

  return (
    <section id="experience" className="py-20" style={{ background: "transparent" }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Experience</h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Professional journey shaping my skills in engineering and data.
          </p>
        </motion.div>

        {loading ? (
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2" />
            <div className="space-y-12">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="relative flex items-start animate-pulse">
                  <div className="w-1/2 pr-12 flex justify-end">
                    {i % 2 === 0 && (
                      <div className="w-full space-y-3">
                        <div className="h-4 bg-slate-200 rounded w-1/2 ml-auto" />
                        <div className="h-3 bg-slate-200 rounded w-1/3 ml-auto" />
                        <div className="h-3 bg-slate-200 rounded w-3/4 ml-auto" />
                      </div>
                    )}
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-slate-200 rounded-full" />
                  <div className="w-1/2 pl-12">
                    {i % 2 !== 0 && (
                      <div className="space-y-3">
                        <div className="h-4 bg-slate-200 rounded w-1/2" />
                        <div className="h-3 bg-slate-200 rounded w-1/3" />
                        <div className="h-3 bg-slate-200 rounded w-3/4" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative">
            {/* Center vertical line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2"
              aria-hidden
            />

            <div className="space-y-0">
              {experiences.map((exp, index) => {
                const logoSrc = getLogoFor(exp.company);
                const isLast = index === experiences.length - 1;
                const cardOnLeft = index % 2 === 0;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: cardOnLeft ? -24 : 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className={`relative flex items-start ${isLast ? "pb-0" : "pb-14"}`}
                  >
                    {/* Left half */}
                    <div className="w-1/2 pr-12">
                      {cardOnLeft && (
                        <ExperienceCard
                          exp={exp}
                          formatDate={formatDate}
                          align="right"
                        />
                      )}
                    </div>

                    {/* Center logo/dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 z-10 mt-1">
                      <div className="w-10 h-10 rounded-full border-2 border-slate-200 bg-white shadow-sm flex items-center justify-center overflow-hidden">
                        {logoSrc ? (
                          <img
                            src={logoSrc}
                            alt={`${exp.company} logo`}
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-slate-600 text-xs font-bold">
                            {getInitials(exp.company)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right half */}
                    <div className="w-1/2 pl-12">
                      {!cardOnLeft && (
                        <ExperienceCard
                          exp={exp}
                          formatDate={formatDate}
                          align="left"
                        />
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
