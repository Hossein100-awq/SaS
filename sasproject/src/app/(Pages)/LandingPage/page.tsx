"use client";

import {
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  Search,
  Sparkles,
  X,
} from "lucide-react";

const featureItems = [
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Job Matching",
  },
  {
    icon: FileText,
    title: "Tailored Resumes",
    description: "& Cover Letters",
  },
  {
    icon: BriefcaseBusiness,
    title: "Track Your",
    description: "Applications",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description: "& Insights",
  },
];

const matchedSkills = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B1120] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-[8%] h-[260px] w-[260px] rounded-full bg-blue-600/10 blur-[120px] sm:h-[360px] sm:w-[360px]" />

        <div className="absolute right-[8%] top-[5%] h-[280px] w-[280px] rounded-full bg-violet-600/10 blur-[120px] sm:h-[380px] sm:w-[380px]" />

        <div className="absolute bottom-[5%] right-[12%] h-[260px] w-[260px] rounded-full bg-cyan-500/8 blur-[120px] sm:h-[340px] sm:w-[340px]" />

        <div className="absolute left-[42%] top-[18%] h-[220px] w-[220px] rounded-full bg-violet-500/8 blur-[100px] sm:h-[300px] sm:w-[300px]" />
      </div>

      <section className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-12 lg:px-12 lg:pb-24 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/15 bg-blue-500/[0.06] px-3 py-1.5 text-[11px] font-medium text-blue-300 sm:mb-6 sm:text-xs">
              <Sparkles size={13} />
              AI-powered career assistant
            </div>

            <h1 className="text-4xl font-bold leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-[58px]">
              Land Your Dream Job
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                with AI
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-6 text-white/65 sm:mt-6 sm:text-base sm:leading-7 lg:text-lg">
              CareerCopilot helps you find better opportunities, match your
              resume with job descriptions, and create tailored resumes and
              cover letters — all powered by AI.
            </p>

            <div
              id="features"
              className="mt-10 grid grid-cols-2 gap-x-5 gap-y-6 sm:mt-12 sm:grid-cols-4 sm:gap-x-7"
            >
              {featureItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group flex min-w-0 items-start gap-2.5 sm:gap-3"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-500/[0.06] text-blue-400">
                      <Icon size={15} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold leading-5 text-white/80 sm:text-xs">
                        {item.title}
                      </p>

                      <p className="text-[11px] leading-5 text-white/45 sm:text-xs">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[680px]">
            <div className="absolute inset-10 rounded-full bg-blue-500/15 blur-[80px] sm:blur-[90px]" />

            <div className="absolute -inset-10 overflow-hidden">
              <div className="absolute right-[5%] top-[8%] h-[180px] w-[180px] rounded-full bg-violet-500/20 blur-[60px] sm:h-[240px] sm:w-[240px] sm:blur-[70px]" />

              <div className="absolute bottom-0 left-0 h-[160px] w-[210px] rounded-full bg-blue-500/20 blur-[60px] sm:h-[200px] sm:w-[260px] sm:blur-[70px]" />

              <div className="absolute bottom-[5%] right-[25%] h-[140px] w-[240px] rounded-full bg-cyan-400/10 blur-[55px] sm:h-[180px] sm:w-[300px] sm:blur-[65px]" />
            </div>

            <div className="relative rounded-[26px] border border-white/10 bg-[#0B1120]/75 p-1.5 shadow-[0_35px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-2">
              <div className="flex h-9 items-center justify-between border-b border-white/[0.06] px-2.5 sm:h-10 sm:px-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                </div>

                <div className="h-1.5 w-20 rounded-full bg-white/10 sm:w-24" />

                <div className="flex items-center gap-2 text-white/40">
                  <Search size={12} />
                </div>
              </div>

              <div className="grid min-h-[380px] grid-cols-1 sm:grid-cols-[125px_1fr] lg:min-h-[430px]">
                <aside className="hidden border-r border-white/[0.06] p-3 sm:block">
                  <div className="mb-5 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-cyan-400 to-violet-600">
                      <span className="text-[10px] font-black">N</span>
                    </div>

                    <span className="text-[10px] font-semibold">
                      CareerCopilot
                    </span>
                  </div>

                  <div className="space-y-1">
                    {[
                      "Overview",
                      "Applications",
                      "Resume",
                      "AI Analysis",
                      "Analytics",
                      "Billing",
                      "Settings",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className={`rounded-lg px-2.5 py-2 text-[10px] ${
                          index === 0
                            ? "bg-blue-500/15 text-blue-300"
                            : "text-white/45"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </aside>

                <div className="relative p-3 sm:p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-white/35">
                        Dashboard
                      </p>

                      <h3 className="mt-1 text-sm font-semibold sm:text-base">
                        Good morning, Alex
                      </h3>
                    </div>

                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-400 to-violet-500" />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-[0.95fr_1.05fr]">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-3.5 sm:p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-white/55">
                          Match Score
                        </span>

                        <span className="text-[9px] text-white/35">
                          Job #241
                        </span>
                      </div>

                      <div className="mx-auto mt-4 flex h-24 w-24 items-center justify-center rounded-full border-[8px] border-blue-500/15 sm:h-28 sm:w-28 sm:border-[10px]">
                        <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full border-[6px] border-cyan-400 border-r-blue-500 border-b-violet-500 sm:h-[82px] sm:w-[82px]">
                          <div className="text-center">
                            <div className="text-xl font-bold sm:text-2xl">
                              92%
                            </div>

                            <div className="text-[8px] text-white/35">
                              Strong match
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 text-center text-[9px] text-emerald-400">
                        Great fit for this role
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-3.5 sm:p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-white/55">
                          Skills Matched
                        </span>

                        <CheckCircle2
                          size={13}
                          className="text-blue-400"
                        />
                      </div>

                      <div className="mt-4 space-y-2">
                        {matchedSkills.map((skill) => (
                          <div
                            key={skill}
                            className="flex items-center justify-between rounded-lg bg-white/[0.025] px-2.5 py-2"
                          >
                            <span className="text-[9px] text-white/65">
                              {skill}
                            </span>

                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.025] p-3.5 sm:p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                          <Sparkles size={13} />
                        </div>

                        <span className="text-[10px] font-medium">
                          AI Generated Cover Letter
                        </span>
                      </div>

                      <X size={13} className="text-white/30" />
                    </div>

                    <p className="mt-3 text-[9px] leading-5 text-white/40 sm:text-[10px]">
                      Dear Hiring Manager, I am excited to apply for this
                      opportunity. My experience building modern web
                      applications aligns closely with the role requirements
                      and I am confident I can bring meaningful value to your
                      team...
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex gap-1.5">
                        <span className="h-1 w-8 rounded-full bg-blue-400/60" />
                        <span className="h-1 w-5 rounded-full bg-white/10" />
                        <span className="h-1 w-6 rounded-full bg-white/10" />
                      </div>

                      <span className="text-[8px] text-blue-400">
                        AI optimized
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 left-3 hidden rounded-2xl border border-white/10 bg-[#0B1120]/90 p-3 shadow-2xl backdrop-blur-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <BarChart3 size={16} />
                </div>

                <div>
                  <p className="text-[9px] text-white/35">
                    Applications tracked
                  </p>

                  <p className="mt-0.5 text-sm font-semibold">
                    24 this month
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}