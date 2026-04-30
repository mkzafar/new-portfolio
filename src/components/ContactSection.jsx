import React from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

const links = [
  {
    label: "Email",
    value: "mkzafar23@gmail.com",
    href: "mailto:mkzafar23@gmail.com",
    icon: Mail,
    description: "Best way to reach me",
  },
  {
    label: "GitHub",
    value: "github.com/mkzafar",
    href: "https://github.com/mkzafar",
    icon: Github,
    description: "See my code",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/mkzafar23",
    href: "https://www.linkedin.com/in/mkzafar23/",
    icon: Linkedin,
    description: "Connect with me",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-24" style={{ background: "transparent" }}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Get In Touch</h2>
          <p className="text-slate-500 text-lg leading-relaxed mb-14">
            I'm currently open to new opportunities. Whether it's a role, a
            project, or just a conversation — feel free to reach out.
          </p>
        </motion.div>

        <div className="space-y-4">
          {links.map(({ label, value, href, icon: Icon, description }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="flex items-center gap-5 p-5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-all duration-200 text-left group"
            >
              <div className="w-11 h-11 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm group-hover:shadow transition-shadow">
                <Icon className="w-5 h-5 text-slate-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-400 mb-0.5">{description}</p>
                <p className="text-slate-800 font-medium truncate">{value}</p>
              </div>
              <span className="ml-auto text-slate-300 group-hover:text-slate-500 transition-colors text-lg">
                →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}