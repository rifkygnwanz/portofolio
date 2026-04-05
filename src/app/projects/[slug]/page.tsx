import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = DATA.projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
  };
}

function getScreenshots(slug: string, screenshotDir?: string): string[] {
  const screenshotDirs = screenshotDir ? [screenshotDir] : ["screenshoot", "screenshots"];
  const allScreenshots: string[] = [];

  for (const dir of screenshotDirs) {
    const dirPath = path.join(process.cwd(), "public", dir.startsWith(slug) ? dir : path.join(slug, dir));
    
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      const images = files
        .filter((file) => 
          /\.(png|jpe?g|webp|gif)$/i.test(file)
        )
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
        .map((file) => {
          const relativeDir = dir.startsWith("/") ? dir : `/${dir}`;
          return `${relativeDir}/${file}`.replace(/\/+/g, "/");
        });
      
      allScreenshots.push(...images);
    }
  }

  return allScreenshots;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = DATA.projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  // @ts-ignore - screenshotDir is added dynamically
  const folderScreenshots = getScreenshots(params.slug, project.screenshotDir);
  const combinedScreenshots = [...(project.screenshots || []), ...folderScreenshots];

  const BLUR_FADE_DELAY = 0.04;

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="header">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ChevronLeft className="size-4" />
              Back to projects
            </Link>
          </BlurFade>

          <div className="flex flex-col space-y-2">
            <BlurFadeText
              delay={BLUR_FADE_DELAY * 2}
              className="text-3xl font-bold tracking-tighter sm:text-5xl"
              text={project.title}
            />
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <time className="text-sm text-muted-foreground">
                {project.dates}
              </time>
            </BlurFade>
          </div>
        </div>
      </section>

      <section id="description">
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <p className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {project.description}
          </p>
        </BlurFade>
      </section>

      <section id="technologies">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <div className="flex flex-wrap gap-1">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-[10px]">
                {tech}
              </Badge>
            ))}
          </div>
        </BlurFade>
      </section>

      {project.links && project.links.length > 0 && (
        <section id="links">
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <div className="flex flex-wrap gap-2">
              {project.links.map((link, idx) => (
                <Link key={idx} href={link.href} target="_blank">
                  <Badge className="flex gap-2 px-3 py-1.5 text-xs">
                    {link.icon}
                    {link.type}
                  </Badge>
                </Link>
              ))}
            </div>
          </BlurFade>
        </section>
      )}

      {combinedScreenshots.length > 0 && (
        <section id="screenshots" className="space-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">User Interface</h2>
          </BlurFade>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {combinedScreenshots.map((src, idx) => (
              <BlurFade key={idx} delay={BLUR_FADE_DELAY * 8 + idx * 0.05}>
                <div className="group relative overflow-hidden rounded-xl border bg-background transition-all hover:shadow-lg">
                  <Image
                    src={src}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    width={800}
                    height={1200}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              </BlurFade>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
