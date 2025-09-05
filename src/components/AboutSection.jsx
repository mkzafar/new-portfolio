import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Code2, BookOpen } from "lucide-react";
import uniLogo from "@/assets/university-logo.jpg";

// Simple, badge-style skills (no progress bars)
const skills = {
  "Programming Languages": ["Python", "JavaScript", "TypeScript", "Java", "C++", "SQL", "R"],
  "Web Technologies": ["React", "Node.js", "Express", "Next.js", "HTML/CSS", "REST APIs"],
  "Data & Analytics": ["Pandas", "NumPy", "TensorFlow", "PyTorch", "Tableau", "Excel"],
  "Databases": ["PostgreSQL", "MongoDB", "Redis", "SQLite"],
  "Tools & Platforms": ["Git", "Docker", "AWS", "Linux", "Jupyter", "VS Code"],
};

const currentLearning = [
  "Advanced React Patterns",
  "System Design",
  "Cloud Architecture",
  "Machine Learning Operations",
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 motion-reduce:transition-none motion-reduce:animate-none"
    >
      {/* subtle dotted overlay for contrast */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(59,130,246,0.15) 1px, transparent 0),
            radial-gradient(circle at 20px 20px, rgba(147,51,234,0.10) 1px, transparent 0)
          `,
          backgroundSize: "40px 40px, 60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <h2 className="text-4xl font-bold text-slate-900 mb-4">About Me</h2>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto">
Passionate Computer Engineering student focused on creating innovative solutions
            that bridge technology and real-world impact                  </p>
                </motion.div>

        {/* Main grid: Education + Skills */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Education (kept from the newer version) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border border-slate-200 bg-white/95 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 ring-1 ring-blue-200/60 flex items-center justify-center overflow-hidden">
                    <img
                      src={uniLogo}
                      alt="York University logo"
                      className="h-13 w-13 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Education</h3>
                    <p className="text-slate-600 font-medium">York University</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                    <h4 className="font-bold text-slate-900 text-lg mb-1">
                      Bachelor of Engineering (BEng)
                    </h4>
                    <p className="text-indigo-700 font-semibold mb-2">Computer Engineering</p>
                    <p className="text-slate-600">Expected Graduation: May 2026</p>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-semibold text-slate-900">Key Coursework:</h5>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      {[
                        "Data Structures & Algorithms",
                        "Database Systems",
                        "Advanced OOP",
                        "Machine Learning",
                        "Network Protocols",
                        "Digital Logic Design",
                      ].map((course) => (
                        <div key={course} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <span className="text-slate-700">{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Technical Skills (simple badges, blue-tinted) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="border border-slate-200 bg-white/95 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center ring-1 ring-green-200/60">
                    <Code2 className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Technical Skills</h3>
                    <p className="text-slate-600 font-medium">Technologies & Tools</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {Object.entries(skills).map(([category, list]) => (
                    <div key={category}>
                      <h4 className="font-medium text-slate-900 mb-3 border-b border-slate-200 pb-2">
                        {category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {list.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="px-3 py-1 text-xs bg-blue-50 text-blue-700 ring-1 ring-blue-200/60 hover:bg-blue-100 transition-colors"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Currently Learning (kept, simplified) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          viewport={{ once: true }}
        >
          <Card className="border border-slate-200 bg-white/95 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl flex items-center justify-center ring-1 ring-cyan-200/60">
                  <BookOpen className="w-7 h-7 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Currently Learning</h3>
                  <p className="text-slate-600 font-medium">Continuous Growth</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {currentLearning.map((topic, i) => (
                  <motion.div
                    key={topic}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <span className="text-slate-700 font-medium">{topic}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
