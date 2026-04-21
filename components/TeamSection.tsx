"use client";

import { motion } from "framer-motion";
import { Link2, ExternalLink, Cpu, Database, Code2 } from "lucide-react";

const TEAM = [
  {
    name: "Leena Lokhande",
    branch: "B.E. Artificial Intelligence",
    role: "Full-Stack Developer",
    responsibilities: [
      "Frontend architecture & UI design",
      "Backend API development",
      "System integration & deployment",
      "Project lead & coordination",
    ],
    icon: Code2,
    color: "#F97316",
    gradient: "from-orange-500 to-amber-400",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    initials: "LL",
  },
  {
    name: "Prachi Dwivedi",
    branch: "B.E. Artificial Intelligence",
    role: "AI & ML Engineer",
    responsibilities: [
      "Model training & evaluation",
      "Cosine similarity implementation",
      "TF-IDF vectorization pipeline",
      "Buy Score algorithm design",
    ],
    icon: Cpu,
    color: "#6366F1",
    gradient: "from-indigo-500 to-violet-500",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    initials: "PD",
  },
  {
    name: "Anu Choudhary",
    branch: "B.E. Artificial Intelligence",
    role: "Data Engineer",
    responsibilities: [
      "Data collection from Amazon & Flipkart",
      "ETL pipeline development",
      "Data cleaning & preprocessing",
      "Feature engineering & EDA",
    ],
    icon: Database,
    color: "#0EA5E9",
    gradient: "from-sky-500 to-cyan-400",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    initials: "AC",
  },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.45, delay },
  };
}

export function TeamSection() {
  return (
    <section id="team" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div {...fadeUp()} className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-orange-600">
            The Team
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
            Who built ElectroFind
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-zinc-500">
            A team of three AI engineering students bringing together machine
            learning, data engineering and full-stack development.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map(
            (
              {
                name,
                branch,
                role,
                responsibilities,
                icon: Icon,
                color,
                gradient,
                linkedin,
                github,
                initials,
              },
              i,
            ) => (
              <motion.div
                key={name}
                {...fadeUp(0.1 + i * 0.08)}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-card hover:shadow-card-hover hover:border-zinc-300 transition-all duration-300"
              >
                {/* Top gradient bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />

                <div className="p-6">
                  {/* Avatar */}
                  <div className="mb-4 flex items-start justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-xl font-extrabold text-white shadow-lg`}
                    >
                      {initials}
                    </div>
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-xl"
                      style={{ background: `${color}15` }}
                    >
                      <Icon className="h-4.5 w-4.5" style={{ color }} />
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="text-lg font-extrabold text-zinc-950">
                    {name}
                  </h3>
                  <p className="text-sm font-semibold" style={{ color }}>
                    {role}
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-400">{branch}</p>

                  {/* Responsibilities */}
                  <ul className="mt-4 space-y-1.5">
                    {responsibilities.map((r) => (
                      <li key={r} className="flex items-start gap-2">
                        <div
                          className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                          style={{ background: color }}
                        />
                        <span className="text-xs leading-relaxed text-zinc-600">
                          {r}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Social */}
                  <div className="mt-5 flex items-center gap-2 border-t border-zinc-100 pt-4">
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-600 transition-all hover:border-zinc-300 hover:text-zinc-900"
                    >
                      <Link2 className="h-3.5 w-3.5" />
                      LinkedIn
                    </a>
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-600 transition-all hover:border-zinc-300 hover:text-zinc-900"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            ),
          )}
        </div>

        {/* Branch note */}
        <motion.p
          {...fadeUp(0.35)}
          className="mt-10 text-center text-sm text-zinc-400"
        >
          All team members —{" "}
          <strong className="text-zinc-600">
            B.E. Artificial Intelligence
          </strong>{" "}
          · Final Year Project 2025–26
        </motion.p>
      </div>
    </section>
  );
}
