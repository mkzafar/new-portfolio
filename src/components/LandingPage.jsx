import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ArrowDown } from "lucide-react";

// Lightweight pure-CSS particle field that reacts to cursor
function CursorParticles() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    // Build particles
    const COUNT = 90;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      ox: 0, // will be set after first frame
      oy: 0,
      size: Math.random() * 2.5 + 0.8,
      opacity: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 0.3 + 0.1,
    }));
    // Save original positions
    particles.forEach((p) => { p.ox = p.x; p.oy = p.y; });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 140;

        if (dist < radius) {
          const force = (1 - dist / radius) * 60;
          p.x -= (dx / dist) * force * 0.05;
          p.y -= (dy / dist) * force * 0.05;
        } else {
          p.x += (p.ox - p.x) * 0.03;
          p.y += (p.oy - p.y) * 0.03;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 210, 195, ${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

export default function LandingPage({ onEnter }) {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handle = (e) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-start justify-center text-white z-20 overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, #5a5a4a 0%, #3d3d30 40%, #2a2a20 100%)`,
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: "-4vh" }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Full-bleed particle canvas */}
      <CursorParticles />

      {/* Subtle vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Hero content — ~1/5 in from left, no max-width so lines never wrap */}
      <div className="relative z-10" style={{ paddingLeft: "18vw", paddingRight: "3rem" }}>
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-2 mb-8"
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(200,185,160,0.35)",
              background: "rgba(200,185,160,0.08)",
              fontSize: "12px",
              letterSpacing: "0.08em",
              color: "rgba(220,210,195,0.85)",
              fontFamily: "monospace",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#8fbc8f",
                boxShadow: "0 0 6px #8fbc8f",
                display: "inline-block",
              }}
            />
            OPEN TO OPPORTUNITIES · FALL 2026
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#f0ebe2",
            margin: 0,
            fontFamily: "'Georgia', 'Times New Roman', serif",
            whiteSpace: "nowrap",
          }}
        >
          Muhammad Zafar
        </motion.h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{
            marginTop: "1.2rem",
            fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
            color: "rgba(220,210,195,0.7)",
            fontWeight: 400,
            letterSpacing: "0.01em",
            borderLeft: "2px solid rgba(200,185,160,0.4)",
            paddingLeft: "1rem",
            whiteSpace: "nowrap",
          }}
        >
          Computer Engineering - York University
          <br />
          <span style={{ opacity: 0.85 }}>Data Science - Scotiabank</span>
        </motion.p>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ marginTop: "2.5rem", display: "flex", alignItems: "center", gap: "1rem" }}
        >
          <a
            href="https://github.com/mkzafar"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "1px solid rgba(200,185,160,0.3)",
              background: "rgba(200,185,160,0.07)",
              color: "rgba(220,210,195,0.8)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(200,185,160,0.18)";
              e.currentTarget.style.color = "#f0ebe2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(200,185,160,0.07)";
              e.currentTarget.style.color = "rgba(220,210,195,0.8)";
            }}
          >
            <Github size={18} />
          </a>

          <a
            href="https://www.linkedin.com/in/mkzafar23/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "1px solid rgba(200,185,160,0.3)",
              background: "rgba(200,185,160,0.07)",
              color: "rgba(220,210,195,0.8)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(200,185,160,0.18)";
              e.currentTarget.style.color = "#f0ebe2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(200,185,160,0.07)";
              e.currentTarget.style.color = "rgba(220,210,195,0.8)";
            }}
          >
            <Linkedin size={18} />
          </a>

        </motion.div>
      </div>

      {/* Scroll prompt — bottom center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        onClick={onEnter}
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
          color: "rgba(220,210,195,0.72)",
          fontSize: "0.7rem",
          letterSpacing: "0.12em",
          userSelect: "none",
          background: "none",
          border: "none",
          fontFamily: "monospace",
        }}
      >
        <span>SCROLL TO EXPLORE</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}