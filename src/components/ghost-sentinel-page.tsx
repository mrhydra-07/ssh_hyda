"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Report = {
  title: string;
  category: string;
  summary: string;
};

const threatFeed = [
  "[ALERT] 185.73.14.22 -> brute-force pattern escalation",
  "[FEED] C2 domain rotation observed in EMEA sector",
  "[INTEL] Spear-phishing cluster linked to synthetic identity campaign",
  "[WARN] Zero-day chatter spike detected on closed channels",
  "[TRACK] New ransomware affiliate infrastructure fingerprinted",
  "[OSINT] Satellite uplink outage correlated with DDoS event",
];

const terminalLines = [
  "Initializing Ghost Sentinel core...",
  "Scanning external attack surface...",
  "Collecting IOC telemetry from global sensors...",
  "Correlating malware signatures with actor profiles...",
  "Publishing situational intelligence snapshot...",
];

const reports: Report[] = [
  {
    title: "Stealth Loader Campaign Mapping",
    category: "Malware Analysis",
    summary:
      "Dissects a modular loader chain leveraging signed binaries and regional C2 failover.",
  },
  {
    title: "Credential Harvesting Funnel",
    category: "Phishing Investigations",
    summary:
      "Tracks multilingual lure kits, clone domains, and credential relay infrastructure.",
  },
  {
    title: "Brokered Access Market Signals",
    category: "Dark Web Monitoring",
    summary:
      "Monitors broker listings and access resale patterns across underground forums.",
  },
  {
    title: "Infrastructure Disruption Trends",
    category: "Cyber Warfare",
    summary:
      "Analyzes state-aligned activity targeting communications and logistics stacks.",
  },
];

const skills = [
  "Kali Linux",
  "Wireshark",
  "OSINT Framework",
  "Python",
  "SIEM",
  "Threat Hunting",
  "Cloud Security",
];

const dashboardItems = [
  {
    title: "World Attack Map",
    details: "LATAM DDoS +38% | APAC phishing wave | EU brute-force cluster",
  },
  {
    title: "Malware Activity",
    details: "Loader: 42 | Infostealer: 17 | Ransomware beacons: 9",
  },
  {
    title: "Threat Actor Tracker",
    details: "Tracked groups: 12 active | 4 high-priority campaigns",
  },
  {
    title: "Suspicious IP Monitor",
    details: "Flagged IPs: 28 | Elevated risk score: 0.81",
  },
];

function SectionShell({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.45 }}
      className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6"
    >
      <div className="mb-6">
        <h2 className="font-orbitron text-2xl text-cyan-100 sm:text-3xl">{title}</h2>
        {subtitle ? <p className="mt-2 text-sm text-cyan-200/80">{subtitle}</p> : null}
      </div>
      {children}
    </motion.section>
  );
}

function GlowButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center rounded-md border border-emerald-300/50 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-100 transition hover:-translate-y-0.5 hover:bg-emerald-400/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
    >
      {children}
    </a>
  );
}

function TerminalWindow({ typedText, feedIndex }: { typedText: string; feedIndex: number }) {
  return (
    <div className="glass-panel overflow-hidden rounded-xl border border-cyan-300/20">
      <div className="flex items-center justify-between border-b border-cyan-200/10 px-4 py-2 text-xs text-cyan-200/80">
        <span>ghost-sentinel://intel-terminal</span>
        <span className="font-jetbrains">LIVE</span>
      </div>
      <div className="space-y-2 p-4 font-jetbrains text-xs sm:text-sm">
        <p className="text-emerald-300">
          $ {typedText}
          <span className="terminal-cursor" aria-hidden>
            ▋
          </span>
        </p>
        {threatFeed.slice(0, feedIndex + 1).map((line) => (
          <p className="text-cyan-100/85" key={line}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function GhostSentinelPage() {
  const [time, setTime] = useState<string>("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [feedIndex, setFeedIndex] = useState(0);
  const [showBoot, setShowBoot] = useState(true);

  const activeLine = terminalLines[lineIndex];

  useEffect(() => {
    const clock = setInterval(() => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        }).format(new Date()),
      );
    }, 1000);

    const boot = setTimeout(() => setShowBoot(false), 2200);

    return () => {
      clearInterval(clock);
      clearTimeout(boot);
    };
  }, []);

  useEffect(() => {
    const typer = setInterval(() => {
      setCharIndex((current) => {
        if (current < activeLine.length) {
          return current + 1;
        }

        setLineIndex((line) => (line + 1) % terminalLines.length);
        setFeedIndex((idx) => (idx + 1) % threatFeed.length);
        return 0;
      });
    }, 50);

    return () => clearInterval(typer);
  }, [activeLine.length]);

  const typedText = useMemo(() => activeLine.slice(0, charIndex), [activeLine, charIndex]);

  return (
    <div className="relative overflow-hidden bg-[#05080f] text-slate-100">
      <div className="radar-overlay" aria-hidden />
      <div className="matrix-overlay" aria-hidden />

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: showBoot ? 1 : 0, pointerEvents: showBoot ? "auto" : "none" }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex flex-col justify-center bg-black/95 px-6 font-jetbrains text-emerald-300"
      >
        <p>boot::ghost_sentinel_v4.2</p>
        <p>loading threat modules....OK</p>
        <p>establishing encrypted channels....OK</p>
        <p>activating cyber intelligence deck....READY</p>
      </motion.div>

      <header className="sticky top-0 z-30 border-b border-cyan-200/10 bg-[#05080f]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-xs sm:px-6">
          <span className="font-orbitron tracking-[0.16em] text-cyan-100">GHOST SENTINEL</span>
          <span className="font-jetbrains text-emerald-300">{time || "SYNCING..."}</span>
        </div>
      </header>

      <main>
        <section className="relative mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-2 font-jetbrains text-xs uppercase tracking-[0.2em] text-emerald-300/90">
              Threat Intelligence • Cyber Defense • OSINT Research
            </p>
            <h1 className="font-orbitron text-4xl leading-tight text-cyan-50 sm:text-5xl">
              Monitoring the Digital Battlefield
            </h1>
            <p className="mt-5 max-w-xl text-sm text-cyan-100/80 sm:text-base">
              Anonymous cyber threat researcher delivering strategic intelligence, adversary tracking,
              and digital defense insight from a stealth operations perspective.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <GlowButton href="#reports">View Research</GlowButton>
              <GlowButton href="#dashboard">Threat Reports</GlowButton>
            </div>
          </div>
          <TerminalWindow typedText={typedText} feedIndex={feedIndex} />
        </section>

        <SectionShell
          id="about"
          title="About the Lab"
          subtitle="Independent intelligence cell focused on cyber awareness and proactive defense"
        >
          <div className="glass-panel rounded-xl border border-cyan-200/20 p-5 text-sm leading-7 text-cyan-100/90">
            Ghost Sentinel is an anonymous independent cyber intelligence researcher focused on
            Cybersecurity, Threat Intelligence, OSINT, Geopolitical Cyber Analysis, and Digital
            Defense.
          </div>
        </SectionShell>

        <SectionShell id="dashboard" title="Threat Intelligence Dashboard">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dashboardItems.map((item) => (
                <article
                  key={item.title}
                  className="glass-panel rounded-xl border border-cyan-300/20 p-4 text-sm text-cyan-50/95"
                >
                  <h3 className="font-orbitron text-base text-cyan-100">{item.title}</h3>
                  <p className="mt-3 font-jetbrains text-xs text-emerald-300">{item.details}</p>
                </article>
              ))}
            <article className="glass-panel rounded-xl border border-cyan-300/20 p-4 sm:col-span-2 lg:col-span-3">
              <h3 className="font-orbitron text-base text-cyan-100">Live Threat Feed</h3>
              <div className="mt-3 space-y-2 font-jetbrains text-xs text-cyan-100/90">
                {threatFeed.map((entry) => (
                  <p key={entry}>{entry}</p>
                ))}
              </div>
            </article>
          </div>
        </SectionShell>

        <SectionShell id="reports" title="Research Reports">
          <div className="grid gap-4 md:grid-cols-2">
            {reports.map((report) => (
              <article
                key={report.title}
                className="glass-panel rounded-xl border border-cyan-300/20 p-5 transition hover:border-emerald-300/40"
              >
                <p className="font-jetbrains text-xs uppercase tracking-wide text-emerald-300">
                  {report.category}
                </p>
                <h3 className="mt-2 font-orbitron text-lg text-cyan-100">{report.title}</h3>
                <p className="mt-3 text-sm text-cyan-100/80">{report.summary}</p>
              </article>
            ))}
          </div>
        </SectionShell>

        <SectionShell id="skills" title="Skills & Technologies">
          <ul className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li
                key={skill}
                className="rounded-md border border-emerald-300/35 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-100"
              >
                {skill}
              </li>
            ))}
          </ul>
        </SectionShell>

        <SectionShell id="mission" title="Mission Statement">
          <div className="glass-panel rounded-xl border border-cyan-200/20 p-6 text-center">
            <p className="font-orbitron text-2xl text-cyan-50">Nation First. Security Supreme.</p>
            <p className="mt-3 text-sm text-cyan-100/80">
              Dedicated to ethical defense, public cyber awareness, and intelligence-led resilience.
            </p>
          </div>
        </SectionShell>

        <SectionShell id="contact" title="Secure Contact">
          <div className="glass-panel rounded-xl border border-cyan-200/20 p-6">
            <p className="font-jetbrains text-xs uppercase tracking-[0.2em] text-emerald-300">
              ProtonMail-style encrypted channel
            </p>
            <p className="mt-4 text-sm text-cyan-100/90">
              Use anonymous communication standards for sensitive submissions.
            </p>
            <a
              href="mailto:ghostsentinel@proton.me"
              className="mt-4 inline-flex rounded-md border border-emerald-300/40 bg-emerald-400/10 px-4 py-2 font-jetbrains text-xs text-emerald-200 transition hover:bg-emerald-400/20"
            >
              ghostsentinel@proton.me
            </a>
          </div>
        </SectionShell>
      </main>

      <footer className="border-t border-cyan-200/10 py-6 text-center font-jetbrains text-xs text-cyan-100/70">
        <p>© {new Date().getFullYear()} Ghost Sentinel // terminal://copyright</p>
        <p className="mt-1 text-emerald-300/90">Encrypted • Monitored • Protected</p>
      </footer>
    </div>
  );
}
