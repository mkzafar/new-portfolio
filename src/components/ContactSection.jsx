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

// lighter-than-bg card
const raised = {
  background: "rgba(255,252,245,0.55)",
  border: "1px solid rgba(220,210,190,0.55)",
  borderRadius: 12,
  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
};

export default function ContactSection() {
  return (
    /*
      flex + flex-col + flex-1 so this section grows to fill all remaining
      space in the Portfolio flex column, pushing the footer to the bottom
      even when content is short.
    */
    <section
      id="contact"
      style={{
        background: "transparent",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        padding: "80px 24px",
      }}
    >
      <div className="max-w-xl mx-auto w-full">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-xs tracking-[0.2em] text-stone-500 uppercase mb-2 font-mono">Reach out</p>
          <h2 className="text-5xl font-bold text-stone-800 leading-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            Get In Touch
          </h2>
          <div className="mt-4 w-10 h-px" style={{ background: "rgba(120,110,90,0.4)" }} />
          <p className="mt-6 text-stone-500 text-base leading-relaxed">
            Open to new opportunities — whether it's a role, a project, or just a conversation.
          </p>
        </motion.div>

        {/* Link rows — raised cards for contrast against the grain bg */}
        <div className="space-y-3">
          {links.map(({ label, value, href, icon: Icon, description }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="flex items-center gap-5 p-5 text-left group transition-all duration-200"
              style={raised}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,252,245,0.82)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,252,245,0.55)";
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
              }}
            >
              {/* Icon box — inset chip inside the raised card */}
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200"
                style={{
                  background: "rgba(160,150,130,0.18)",
                  border: "1px solid rgba(160,150,130,0.28)",
                }}
              >
                <Icon className="w-5 h-5 text-stone-500" />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-stone-400 mb-0.5 font-mono">{description}</p>
                <p className="text-stone-700 font-medium text-sm truncate">{value}</p>
              </div>

              <span className="ml-auto text-stone-300 group-hover:text-stone-600 transition-colors duration-200 text-base">
                →
              </span>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}