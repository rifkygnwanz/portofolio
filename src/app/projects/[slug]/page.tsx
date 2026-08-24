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

interface ScreenshotItem {
  src: string;
  isLandscape: boolean;
  width: number;
  height: number;
}

function getImageDimensions(filePath: string): { width: number; height: number; isLandscape: boolean } {
  try {
    if (!fs.existsSync(filePath)) {
      return { width: 800, height: 1200, isLandscape: false };
    }

    const fd = fs.openSync(filePath, "r");
    const buffer = Buffer.alloc(64);
    fs.readSync(fd, buffer, 0, 64, 0);
    fs.closeSync(fd);

    // PNG
    if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
      const width = buffer.readUInt32BE(16);
      const height = buffer.readUInt32BE(20);
      return { width, height, isLandscape: width > height };
    }

    // GIF
    if (buffer.toString("ascii", 0, 3) === "GIF") {
      const width = buffer.readUInt16LE(6);
      const height = buffer.readUInt16LE(8);
      return { width, height, isLandscape: width > height };
    }

    // JPEG
    if (buffer[0] === 0xff && buffer[1] === 0xd8) {
      const fullBuf = fs.readFileSync(filePath);
      let offset = 2;
      while (offset < fullBuf.length) {
        if (fullBuf[offset] !== 0xff) {
          offset++;
          continue;
        }
        const marker = fullBuf[offset + 1];
        if (
          (marker >= 0xc0 && marker <= 0xc3) ||
          (marker >= 0xc5 && marker <= 0xc7) ||
          (marker >= 0xc9 && marker <= 0xcb) ||
          (marker >= 0xcd && marker <= 0xcf)
        ) {
          const height = fullBuf.readUInt16BE(offset + 5);
          const width = fullBuf.readUInt16BE(offset + 7);
          return { width, height, isLandscape: width > height };
        }
        const length = fullBuf.readUInt16BE(offset + 2);
        offset += 2 + length;
      }
    }

    // WEBP
    if (buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP") {
      if (buffer.toString("ascii", 12, 16) === "VP8 ") {
        const width = buffer.readUInt16LE(26) & 0x3fff;
        const height = buffer.readUInt16LE(28) & 0x3fff;
        return { width, height, isLandscape: width > height };
      } else if (buffer.toString("ascii", 12, 16) === "VP8L") {
        const b1 = buffer[21], b2 = buffer[22], b3 = buffer[23], b4 = buffer[24];
        const width = 1 + (((b2 & 0x3f) << 8) | b1);
        const height = 1 + (((b4 & 0x0f) << 10) | (b3 << 2) | ((b2 & 0xc0) >> 6));
        return { width, height, isLandscape: width > height };
      } else if (buffer.toString("ascii", 12, 16) === "VP8X") {
        const width = 1 + buffer.readUIntLE(24, 3);
        const height = 1 + buffer.readUIntLE(27, 3);
        return { width, height, isLandscape: width > height };
      }
    }
  } catch (e) {
    // fallback
  }

  return { width: 800, height: 1200, isLandscape: false };
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
  const rawScreenshots = [...(project.screenshots || []), ...folderScreenshots];

  const combinedScreenshots: ScreenshotItem[] = rawScreenshots.map((src) => {
    const cleanPath = src.startsWith("/") ? src.slice(1) : src;
    const fullPath = path.join(process.cwd(), "public", cleanPath);
    const dimensions = getImageDimensions(fullPath);
    return {
      src,
      isLandscape: dimensions.isLandscape,
      width: dimensions.width,
      height: dimensions.height,
    };
  });

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
            {combinedScreenshots.map((item, idx) => (
              <BlurFade
                key={idx}
                delay={BLUR_FADE_DELAY * 8 + idx * 0.05}
                className={item.isLandscape ? "col-span-1 sm:col-span-2" : ""}
              >
                <div className="group relative overflow-hidden rounded-xl border bg-background transition-all hover:shadow-lg">
                  <Image
                    src={item.src}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    width={item.width || 800}
                    height={item.height || 1200}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.01]"
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
