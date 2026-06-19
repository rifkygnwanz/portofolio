"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Smartphone, Globe, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

const parseProjectDate = (datesStr: string) => {
  if (!datesStr) return new Date(0);
  const parts = datesStr.split("-");
  const targetStr = (parts[parts.length - 1] || "").trim();

  const match = targetStr.match(/([a-zA-Z]+)\s+(\d{4})/);
  if (!match) {
    const yearMatch = targetStr.match(/(\d{4})/);
    if (yearMatch) {
      return new Date(parseInt(yearMatch[1], 10), 0, 1);
    }
    return new Date(0);
  }

  const monthMap: { [key: string]: number } = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11,
  };

  const monthStr = match[1].toLowerCase().substring(0, 3);
  const year = parseInt(match[2], 10);
  const month = monthMap[monthStr] !== undefined ? monthMap[monthStr] : 0;

  return new Date(year, month, 1);
};

export default function Page() {
  const [activeFilter, setActiveFilter] = useState<"all" | "mobile" | "web">(
    "all",
  );
  const [sortBy, setSortBy] = useState<"featured" | "latest">("featured");

  const totalCount = DATA.stats.totalProjects;
  const playStoreCount = DATA.stats.playStore;
  const appStoreCount = DATA.stats.appStore;

  const filteredProjects = [...DATA.projects]
    .filter((project) => {
      if (activeFilter === "all") return true;
      // @ts-ignore
      return project.categories?.includes(activeFilter);
    })
    .sort((a, b) => {
      if (sortBy === "featured") {
        return DATA.projects.indexOf(a) - DATA.projects.indexOf(b);
      } else {
        return (
          parseProjectDate(b.dates).getTime() -
          parseProjectDate(a.dates).getTime()
        );
      }
    });

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 border">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      {/* {DATA.education && DATA.education.length > 0 && (
        <section id="education">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 7}>
              <h2 className="text-xl font-bold">Education</h2>
            </BlurFade>
            {(DATA.education as unknown as any[]).map((education, id) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + id * 0.05}
              >
                <ResumeCard
                  key={education.school}
                  href={education.href}
                  logoUrl={education.logoUrl}
                  altText={education.school}
                  title={education.school}
                  subtitle={education.degree}
                  period={`${education.start} - ${education.end}`}
                />
              </BlurFade>
            ))}
          </div>
        </section>
      )} */}
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve shipped work from small utilities to complex
                  applications. Selected projects below.
                </p>
              </div>
            </div>
          </BlurFade>

          {/* Stats Counter Badges */}
          <BlurFade delay={BLUR_FADE_DELAY * 11.5}>
            <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-[800px] mx-auto w-full px-4">
              <div className="flex flex-col items-center justify-center p-3 md:p-4 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300">
                <Layers className="size-5 md:size-6 mb-2 text-primary" />
                <span className="text-xl md:text-2xl font-bold tracking-tight">
                  {totalCount}+
                </span>
                <span className="text-[10px] md:text-xs text-muted-foreground text-center">
                  Total Projects
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 md:p-4 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300">
                <Icons.playstore className="size-5 md:size-6 mb-2 text-green-500" />
                <span className="text-xl md:text-2xl font-bold tracking-tight">
                  {playStoreCount}+
                </span>
                <span className="text-[10px] md:text-xs text-muted-foreground text-center">
                  Play Store
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 md:p-4 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300">
                <Icons.appstore className="size-5 md:size-6 mb-2 text-blue-500" />
                <span className="text-xl md:text-2xl font-bold tracking-tight">
                  {appStoreCount}+
                </span>
                <span className="text-[10px] md:text-xs text-muted-foreground text-center">
                  App Store
                </span>
              </div>
            </div>
          </BlurFade>

          {/* Category Filter and Sort Tab Selectors */}
          <BlurFade delay={BLUR_FADE_DELAY * 12}>
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center px-4 w-full max-w-[800px] mx-auto">
              {/* Category Filter */}
              <div className="inline-flex rounded-full border bg-muted p-1">
                {(["all", "mobile", "web"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                      "relative rounded-full px-4 py-1.5 text-xs md:text-sm font-medium transition-colors outline-none",
                      activeFilter === filter
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {activeFilter === filter && (
                      <motion.div
                        layoutId="active-filter-bg"
                        className="absolute inset-0 rounded-full bg-background shadow-sm"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10 capitalize">
                      {filter === "all"
                        ? "All Work"
                        : filter === "mobile"
                          ? "Mobile Apps"
                          : "Websites"}
                    </span>
                  </button>
                ))}
              </div>

              {/* Sort Selector */}
              <div className="inline-flex rounded-full border bg-muted p-1">
                {(["featured", "latest"] as const).map((sortOption) => (
                  <button
                    key={sortOption}
                    onClick={() => setSortBy(sortOption)}
                    className={cn(
                      "relative rounded-full px-4 py-1.5 text-xs md:text-sm font-medium transition-colors outline-none",
                      sortBy === sortOption
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {sortBy === sortOption && (
                      <motion.div
                        layoutId="active-sort-bg"
                        className="absolute inset-0 rounded-full bg-background shadow-sm"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10 capitalize">
                      {sortOption === "featured" ? "Featured" : "Latest"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </BlurFade>

          {/* Filtered Projects Grid */}
          <div className="px-4">
            <motion.div
              layout
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto w-full"
            >
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.title}
                    layout="position"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ProjectCard
                      href={project.href}
                      title={project.title}
                      description={project.description}
                      dates={project.dates}
                      tags={project.technologies}
                      image={project.image}
                      video={project.video}
                      links={project.links}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Want to chat? Just shoot me a dm{" "}
                <Link
                  href={DATA.contact.social.LinkedIn.url}
                  className="text-blue-500 hover:underline"
                >
                  with a direct question on LinkedIn
                </Link>{" "}
                and I&apos;ll respond whenever I can. I will ignore all
                soliciting.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
