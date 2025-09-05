import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Project } from "../entities/project";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Github, ExternalLink, Folder } from "lucide-react";

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await Project.list('order');
      setProjects(data);
    } catch (error) {
      console.error("Error loading projects:", error);
    }
    setLoading(false);
  };

  return (
    <section id="projects" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured Projects</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A selection of projects that showcase my technical skills and problem-solving abilities
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="border-none shadow-lg animate-pulse">
                <CardContent className="p-6">
                  <div className="h-48 bg-slate-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded mb-4"></div>
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-slate-200 rounded"></div>
                    <div className="h-6 w-20 bg-slate-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full group cursor-pointer">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="relative mb-4">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                          <Folder className="w-16 h-16 text-slate-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-all duration-300"></div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.slice(0, 3).map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="px-3 py-1 text-xs bg-blue-100 text-blue-800"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies?.length > 3 && (
                          <Badge variant="secondary" className="px-3 py-1 text-xs bg-slate-100 text-slate-600">
                            +{project.technologies.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100">
                      {project.github_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 hover:bg-slate-100 transition-colors"
                          onClick={() => window.open(project.github_url, '_blank')}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Button>
                      )}
                      {project.live_url && (
                        <Button
                          size="sm"
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                          onClick={() => window.open(project.live_url, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="text-center py-16">
            <Folder className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-900 mb-2">No Projects Yet</h3>
            <p className="text-slate-600">Projects will appear here once they're added to the portfolio.</p>
          </div>
        )}
      </div>
    </section>
  );
}