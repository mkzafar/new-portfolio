import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Experience } from "../entities/experience";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Building2, Calendar, ExternalLink, MapPin } from "lucide-react";
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
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Experience</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Professional and academic experiences that have shaped my technical journey
          </p>
        </motion.div>

        {loading ? (
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="border-none shadow-lg animate-pulse">
                <CardContent className="p-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-slate-200 rounded-lg" />
                    <div className="flex-1">
                      <div className="h-5 bg-slate-200 rounded mb-2" />
                      <div className="h-4 bg-slate-200 rounded mb-4" />
                      <div className="h-3 bg-slate-200 rounded" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Company logo (perfectly round) */}
                      <div className="h-12 w-12 rounded-full overflow-hidden border border-slate-200 bg-white shadow-sm flex items-center justify-center">
                        {(() => {
                          const logoSrc = getLogoFor(experience.company);
                          return logoSrc ? (
                            <img
                              src={logoSrc}
                              alt={`${experience.company} logo`}
                              className="h-full w-full object-contain"
                              loading="lazy"
                            />
                          ) : (
                            <span className="text-slate-700 text-sm font-semibold">
                              {getInitials(experience.company)}
                            </span>
                          );
                        })()}
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                          <div>
                            <h3 className="text-xl font-semibold text-slate-900">
                              {experience.position}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-blue-600 font-medium">
                                {experience.company}
                              </span>
                              {experience.company_url && (
                                <a
                                  href={experience.company_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col items-start lg:items-end gap-1">
                            <div className="flex items-center gap-2 text-slate-500">
                              <Calendar className="w-4 h-4" />
                              <span className="text-sm">
                                {formatDate(experience.start_date)} - {formatDate(experience.end_date)}
                              </span>
                              {experience.current && (
                                <Badge className="ml-2 bg-green-100 text-green-800 text-xs">
                                  Current
                                </Badge>
                              )}
                            </div>

                            {experience.location && (
                              <div className="flex items-center gap-1 text-slate-500 text-sm">
                                <MapPin className="w-4 h-4" />
                                <span>{experience.location}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {experience.bullets?.length ? (
  <ul className="list-disc pl-5 text-slate-600 leading-relaxed space-y-2">
    {experience.bullets.map((line, i) => (
      <li key={i}>{line}</li>
    ))}
  </ul>
) : (
  <p className="text-slate-600 leading-relaxed">{experience.description}</p>
)}


                        {experience.technologies && experience.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {experience.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="px-3 py-1 text-xs bg-slate-100 text-slate-700"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && experiences.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-900 mb-2">No Experience Yet</h3>
            <p className="text-slate-600">
              Professional experiences will appear here once they're added.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
