// import only images that exist right now
import imgYumarket from "@/assets/yumarket.png";
import imgDisney from "@/assets/disney-plus-clone.png";
import imgScribe from "@/assets/scribe-app.png";
import imgHTN from "@/assets/hackthenorth.png";
import imgTasksy from "@/assets/tasksy-gg.jfif";
import imgPlant from "@/assets/plant-watering.jpg";
{/*import imgWorldCup from "@/assets/world-cup-2026.png";
import imgQuant from "@/assets/quant-trading-algo.png";
import imgSSADC from "@/assets/ssadc-projects.png";*/}


export class Project {
  static async list(orderBy = "order") {
    const data = [
      {
        id: "world-cup-2026",
        order: 1,
        title: "World Cup 2026 Prediction Model",
        description:
          "End-to-end pipeline for match outcome predictions: data ingestion, feature engineering, training, and Monte Carlo simulations with interactive charts.",
        technologies: ["Python", "Pandas", "scikit-learn", "XGBoost", "FastAPI"],
        github_url: "",
        live_url: "",
        image_url: "", // add later when you have the file
        year: 2025,
      },
      {
        id: "yumarket",
        order: 2,
        title: "YUmarket",
        description:
          "Campus marketplace with authenticated listings, image uploads, and chat. Focus on safe trades and simple discovery.",
        technologies: ["React", "Node", "Express", "MongoDB", "JWT"],
        github_url: "",
        live_url: "",
        image_url: imgYumarket, 
        year: 2024,
      },
      {
        id: "tasksy-gg",
        order: 3,
        title: "Tasksy.gg",
        description:
          "A gamified task manager with streaks, levels, reminders, and keyboard-friendly UX to keep you on track.",
        technologies: ["Next.js", "PostgreSQL", "Prisma", "Tailwind"],
        github_url: "",
        live_url: "",
        image_url: imgTasksy, 
        year: 2024,
      },
      {
        id: "quant-trading-algo",
        order: 4,
        title: "Quantitative Trading Algorithm",
        description:
          "Backtesting framework with factor models, risk controls, and walk-forward validation on historical equities data.",
        technologies: ["Python", "pandas", "NumPy", "yfinance", "TA-Lib"],
        github_url: "",
        live_url: "",
        image_url: "",
        year: 2024,
      },
      {
        id: "scribe-app",
        order: 5,
        title: "Scribe App",
        description:
          "Web app for quick audio → text transcription and summarization with shareable notes and search.",
        technologies: ["React", "Node", "Express", "PostgreSQL"],
        github_url: "",
        live_url: "",
        image_url: imgScribe,
        year: 2023,
      },
      {
        id: "plant-watering",
        order: 6,
        title: "Automated Plant Watering System",
        description:
          "IoT setup with soil moisture sensing and pump control; web dashboard for schedules and telemetry.",
        technologies: ["Arduino/ESP32", "C++", "MQTT", "Node-RED"],
        github_url: "",
        live_url: "",
        image_url: imgPlant,
        year: 2023,
      },
      {
        id: "ssadc-projects",
        order: 7,
        title: "SSADC Projects",
        description:
          "Suite of student-facing tools (prereq charts, room finder, class locator, study groups) with shared components and CI.",
        technologies: ["React", "Node", "MySQL", "Tailwind"],
        github_url: "",
        live_url: "",
        image_url: "",
        year: 2022,
      },
      {
        id: "hackthenorth",
        order: 8,
        title: "HackTheNorth",
        description:
          "48-hour hackathon project exploring real-time data + maps with a lightweight backend and polished UI.",
        technologies: ["React", "Map APIs", "Express"],
        github_url: "",
        live_url: "",
        image_url: imgHTN,
        year: 2022,
      },
      {
        id: "disney-plus-clone",
        order: 9,
        title: "Disney+ Clone",
        description:
          "Streaming UI clone with auth, profiles, categories, and responsive playback UI powered by a public movie API.",
        technologies: ["Next.js", "Tailwind", "TMDB API", "Firebase Auth"],
        github_url: "",
        live_url: "",
        image_url: imgDisney,
        year: 2021,
      },
    ];

    const sorted = [...data].sort((a, b) => {
      if (orderBy === "order") return (a.order ?? 0) - (b.order ?? 0);
      if (orderBy === "-year") return (b.year ?? 0) - (a.year ?? 0);
      if (orderBy === "year") return (a.year ?? 0) - (b.year ?? 0);
      return 0;
    });

    return sorted;
  }
}