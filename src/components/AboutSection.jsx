import React from "react";
import { motion } from "framer-motion";
import uniLogo from "@/assets/university-logo.jpg";

const skills = {
  "Languages":  ["Python", "JavaScript", "TypeScript", "Java", "C++", "SQL", "R"],
  "Web":        ["React", "Node.js", "Express", "Next.js", "HTML/CSS", "REST APIs"],
  "Data & ML":  ["Pandas", "NumPy", "TensorFlow", "PyTorch", "Tableau", "Excel"],
  "Databases":  ["PostgreSQL", "MongoDB", "Redis", "SQLite"],
  "Tools":      ["Git", "Docker", "AWS", "Linux", "Jupyter", "VS Code"],
};

const currentLearning = ["System Design", "DevOps", "Data Analytics", "NLP & LLM"];

const coursework = [
  "Data Structures & Algorithms",
  "Database Systems",
  "Advanced OOP",
  "Machine Learning",
  "Network Protocols",
  "Digital Logic Design",
];

// lighter-than-bg card — feels lifted
const raised = {
  background: "rgba(255,252,245,0.55)",
  border: "1px solid rgba(220,210,190,0.55)",
  borderRadius: 12,
  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
};

// darker-than-bg strip — feels recessed
const inset = {
  background: "rgba(160,150,130,0.15)",
  border: "1px solid rgba(160,150,130,0.22)",
  borderRadius: 12,
};

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20" style={{ background: "transparent" }}>
      <div className="max-w-5xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-xs tracking-[0.2em] text-stone-500 uppercase mb-2 font-mono">Profile</p>
          <h2 className="text-5xl font-bold text-stone-800 leading-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            About Me
          </h2>
          <div className="mt-4 w-10 h-px" style={{ background: "rgba(120,110,90,0.4)" }} />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-5 mb-5">
          {/* Education — raised */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div style={raised} className="p-7 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0"
                  style={{ background: "rgba(200,190,170,0.3)", border: "1px solid rgba(200,190,170,0.4)" }}>
                  <img src={uniLogo} alt="York University" className="h-full w-full object-contain" loading="lazy" />
                </div>
                <div>
                  <p className="text-xs text-stone-400 font-mono tracking-widest uppercase">Education</p>
                  <p className="text-stone-700 font-semibold text-sm">York University</p>
                </div>
              </div>

              <p className="text-stone-800 font-bold text-lg leading-snug mb-5"
                style={{ fontFamily: "'Georgia', serif" }}>
                BEng, Computer Engineering
              </p>

              <p className="text-xs text-stone-400 font-mono tracking-widest uppercase mb-3">Key Coursework</p>
              <div className="space-y-2">
                {coursework.map((c) => (
                  <div key={c} className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-stone-400 shrink-0" />
                    <span className="text-stone-600 text-sm">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills — raised */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.07 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div style={raised} className="p-7 h-full">
              <p className="text-xs text-stone-400 font-mono tracking-widest uppercase mb-5">Technical Skills</p>
              <div className="space-y-4">
                {Object.entries(skills).map(([cat, list]) => (
                  <div key={cat}>
                    <p className="text-xs text-stone-400 mb-2">{cat}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {list.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 text-xs rounded text-stone-600 cursor-default select-none transition-all duration-150"
                          style={{ background: "rgba(180,170,150,0.25)", border: "1px solid rgba(180,170,150,0.38)" }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(180,170,150,0.45)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(180,170,150,0.25)"; }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Currently Exploring — inset / recessed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div style={inset} className="p-7">
            <p className="text-xs text-stone-400 font-mono tracking-widest uppercase mb-4">Currently Exploring</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {currentLearning.map((topic, i) => (
                <motion.div
                  key={topic}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2.5 p-3 rounded-lg"
                  style={{ background: "rgba(255,252,245,0.3)", border: "1px solid rgba(220,210,190,0.3)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "#8fbc8f", boxShadow: "0 0 5px #8fbc8f99" }} />
                  <span className="text-stone-700 text-sm font-medium">{topic}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}