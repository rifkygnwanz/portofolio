"use client";

import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { Icons } from "@/components/icons";
import {
  Smartphone,
  Globe,
  ChevronDown,
  ExternalLink,
  Layers,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectLink {
  icon?: React.ReactNode;
  type: string;
  href: string;
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly ProjectLink[];
  className?: string;
}

interface StoreItem {
  platform: "playstore" | "appstore" | "other";
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface AppGroup {
  name: string;
  stores: StoreItem[];
}

function parseProjectLinks(links?: readonly ProjectLink[]) {
  if (!links || links.length === 0) {
    return { appGroups: [], webList: [] };
  }

  const webList: ProjectLink[] = [];
  const appList: ProjectLink[] = [];

  for (const link of links) {
    const typeLower = (link.type || "").toLowerCase().trim();
    const hrefLower = (link.href || "").toLowerCase().trim();

    const isWeb =
      typeLower.includes("website") ||
      typeLower.includes("web") ||
      (!hrefLower.includes("play.google.com") &&
        !hrefLower.includes("apps.apple.com") &&
        ![
          "play store",
          "app store",
          "customer",
          "merchant",
          "driver",
          "inspector",
          "inspection",
          "partner",
          "passenger",
        ].some((kw) => typeLower.includes(kw)));

    if (isWeb) {
      webList.push(link);
    } else {
      appList.push(link);
    }
  }

  const hasVariants = appList.some(
    (l) =>
      ![
        "play store",
        "app store",
        "google play",
        "apple app store",
        "playstore",
        "appstore",
      ].includes(l.type.toLowerCase().trim()),
  );

  const appGroups: AppGroup[] = [];

  if (!hasVariants) {
    const stores: StoreItem[] = appList.map((l) => {
      const isApple =
        l.href.includes("apps.apple.com") ||
        l.type.toLowerCase().includes("app store");
      return {
        platform: isApple ? "appstore" : "playstore",
        label: isApple ? "App Store" : "Google Play",
        href: l.href,
        icon:
          l.icon ||
          (isApple ? (
            <Icons.appstore className="size-3" />
          ) : (
            <Icons.playstore className="size-3" />
          )),
      };
    });

    if (stores.length > 0) {
      appGroups.push({ name: "", stores });
    }
  } else {
    const variantMap = new Map<string, StoreItem[]>();

    for (const l of appList) {
      let vName = l.type.trim();
      if (vName.toLowerCase() === "inspection") {
        vName = "Inspector App";
      } else if (!vName.toLowerCase().includes("app")) {
        vName = `${vName} App`;
      }

      const isApple =
        l.href.includes("apps.apple.com") ||
        l.type.toLowerCase().includes("app store");
      const storeItem: StoreItem = {
        platform: isApple ? "appstore" : "playstore",
        label: isApple ? "App Store" : "Google Play",
        href: l.href,
        icon:
          l.icon ||
          (isApple ? (
            <Icons.appstore className="size-3" />
          ) : (
            <Icons.playstore className="size-3" />
          )),
      };

      if (!variantMap.has(vName)) {
        variantMap.set(vName, []);
      }
      variantMap.get(vName)!.push(storeItem);
    }

    variantMap.forEach((stores, name) => {
      appGroups.push({ name, stores });
    });
  }

  return { appGroups, webList };
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  const [appMenuOpen, setAppMenuOpen] = useState(false);
  const [webMenuOpen, setWebMenuOpen] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const appMenuRef = useRef<HTMLDivElement>(null);
  const webMenuRef = useRef<HTMLDivElement>(null);

  const { appGroups, webList } = parseProjectLinks(links);

  const totalAppStores = appGroups.reduce(
    (acc, group) => acc + group.stores.length,
    0,
  );
  const isSingleAppSingleStore = appGroups.length === 1 && totalAppStores === 1;
  const singleStore = isSingleAppSingleStore ? appGroups[0].stores[0] : null;

  const isSingleWeb = webList.length === 1;
  const singleWeb = isSingleWeb ? webList[0] : null;

  // Close menus on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        appMenuRef.current &&
        !appMenuRef.current.contains(event.target as Node)
      ) {
        setAppMenuOpen(false);
      }
      if (
        webMenuRef.current &&
        !webMenuRef.current.contains(event.target as Node)
      ) {
        setWebMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setAppMenuOpen(false);
        setWebMenuOpen(false);
      }
    }

    if (appMenuOpen || webMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [appMenuOpen, webMenuOpen]);

  const hasAnyLink = totalAppStores > 0 || webList.length > 0;
  const isAnyMenuOpen = appMenuOpen || webMenuOpen;

  return (
    <Card
      ref={cardRef}
      className={cn(
        "group relative flex flex-col border hover:shadow-lg transition-all duration-300 ease-out h-full hover:border-primary/30",
        isAnyMenuOpen ? "z-40 ring-1 ring-primary/20 shadow-md" : "z-10",
        className,
      )}
    >
      <Link href={href || "#"} className="flex flex-col flex-1 h-full">
        {video && (
          <div className="overflow-hidden rounded-t-lg">
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none mx-auto h-40 w-full object-cover object-top"
            />
          </div>
        )}
        {image && (
          <div className="overflow-hidden rounded-t-lg">
            <Image
              src={image}
              alt={title}
              width={500}
              height={300}
              className="h-40 w-full overflow-hidden object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        )}
        <CardHeader className="px-2">
          <div className="space-y-1">
            <CardTitle className="mt-1 text-base group-hover:text-primary transition-colors duration-300">
              {title}
            </CardTitle>
            <time className="font-sans text-xs">{dates}</time>
            <div className="hidden font-sans text-xs underline print:visible">
              {link
                ?.replace("https://", "")
                .replace("www.", "")
                .replace("/", "")}
            </div>
            <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert line-clamp-5 [&>p]:m-0">
              {description}
            </Markdown>
          </div>
        </CardHeader>
        <CardContent className="mt-auto flex flex-col px-2">
          {tags && tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {tags?.map((tag) => (
                <Badge
                  className="px-1 py-0 text-[10px]"
                  variant="secondary"
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Link>

      <CardFooter className="px-2 pb-2 pt-2 relative z-20">
        {hasAnyLink && (
          <div className="flex flex-row flex-wrap items-center gap-1.5 w-full">
            {/* APPS SECTION */}
            {totalAppStores > 0 && (
              <div className="relative" ref={appMenuRef}>
                {isSingleAppSingleStore && singleStore ? (
                  // Direct link if single app & single store
                  <a
                    href={singleStore.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 border border-border/40 shadow-2xs active:scale-95"
                  >
                    {singleStore.icon}
                    <span>{singleStore.label}</span>
                    <ExternalLink className="size-2.5 opacity-60 ml-0.5" />
                  </a>
                ) : (
                  // Dropdown menu button for multi-apps / multi-stores
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setAppMenuOpen((prev) => !prev);
                        setWebMenuOpen(false);
                      }}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md transition-all duration-200 border shadow-2xs active:scale-95",
                        appMenuOpen
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground border-border/40",
                      )}
                      aria-expanded={appMenuOpen}
                      aria-label="Toggle available mobile apps"
                    >
                      <Smartphone className="size-3" />
                      <span>Apps</span>
                      <ChevronDown
                        className={cn(
                          "size-3 opacity-70 transition-transform duration-200",
                          appMenuOpen && "rotate-180",
                        )}
                      />
                    </button>

                    {/* Popover Menu */}
                    <AnimatePresence>
                      {appMenuOpen && (
                        <>
                          {/* Mobile backdrop tap to dismiss */}
                          <div
                            className="fixed inset-0 z-40 sm:hidden bg-background/60 backdrop-blur-xs"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setAppMenuOpen(false);
                            }}
                          />

                          <motion.div
                            initial={{ opacity: 0, y: 6, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 4, scale: 0.97 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="absolute bottom-full mb-2 left-0 z-50 min-w-[240px] max-w-[280px] p-2.5 rounded-xl border bg-popover/95 text-popover-foreground shadow-xl backdrop-blur-md"
                          >
                            <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-border/60 text-[11px] font-semibold text-muted-foreground">
                              <span className="flex items-center gap-1.5">
                                <Smartphone className="size-3 text-primary" />
                                Available Apps
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setAppMenuOpen(false);
                                }}
                                className="sm:hidden p-0.5 rounded hover:bg-muted text-muted-foreground"
                              >
                                <X className="size-3.5" />
                              </button>
                            </div>

                            <div className="space-y-2 max-h-[260px] overflow-y-auto pr-0.5">
                              {appGroups.map((group, gIdx) => (
                                <div
                                  key={gIdx}
                                  className="flex flex-col gap-1.5 bg-muted/40 p-2 rounded-lg border border-border/50"
                                >
                                  {group.name && (
                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                                      <Layers className="size-3 text-primary/80" />
                                      <span>{group.name}</span>
                                    </div>
                                  )}
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    {group.stores.map((store, sIdx) => (
                                      <a
                                        key={sIdx}
                                        href={store.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setAppMenuOpen(false);
                                        }}
                                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium bg-background text-foreground hover:bg-primary hover:text-primary-foreground border border-border/80 shadow-2xs transition-all active:scale-95"
                                      >
                                        {store.icon}
                                        <span>{store.label}</span>
                                        <ExternalLink className="size-2.5 opacity-60 ml-0.5" />
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            )}

            {/* WEBSITES SECTION */}
            {webList.length > 0 && (
              <div className="relative" ref={webMenuRef}>
                {isSingleWeb && singleWeb ? (
                  // Direct link if single website
                  <a
                    href={singleWeb.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 border border-border/40 shadow-2xs active:scale-95"
                  >
                    {singleWeb.icon || <Globe className="size-3" />}
                    <span>{singleWeb.type || "Website"}</span>
                    <ExternalLink className="size-2.5 opacity-60 ml-0.5" />
                  </a>
                ) : (
                  // Dropdown menu button for multi-websites
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setWebMenuOpen((prev) => !prev);
                        setAppMenuOpen(false);
                      }}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md transition-all duration-200 border shadow-2xs active:scale-95",
                        webMenuOpen
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground border-border/40",
                      )}
                      aria-expanded={webMenuOpen}
                      aria-label="Toggle available websites"
                    >
                      <Globe className="size-3" />
                      <span>Website</span>
                      <ChevronDown
                        className={cn(
                          "size-3 opacity-70 transition-transform duration-200",
                          webMenuOpen && "rotate-180",
                        )}
                      />
                    </button>

                    {/* Popover Menu */}
                    <AnimatePresence>
                      {webMenuOpen && (
                        <>
                          {/* Mobile backdrop tap to dismiss */}
                          <div
                            className="fixed inset-0 z-40 sm:hidden bg-background/60 backdrop-blur-xs"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setWebMenuOpen(false);
                            }}
                          />

                          <motion.div
                            initial={{ opacity: 0, y: 6, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 4, scale: 0.97 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="absolute bottom-full mb-2 left-0 z-50 min-w-[210px] max-w-[260px] p-2 rounded-xl border bg-popover/95 text-popover-foreground shadow-xl backdrop-blur-md"
                          >
                            <div className="flex items-center justify-between px-2 py-1 mb-1 border-b border-border/60 text-[11px] font-semibold text-muted-foreground">
                              <span className="flex items-center gap-1.5">
                                <Globe className="size-3 text-primary" />
                                Available Websites
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setWebMenuOpen(false);
                                }}
                                className="sm:hidden p-0.5 rounded hover:bg-muted text-muted-foreground"
                              >
                                <X className="size-3.5" />
                              </button>
                            </div>

                            <div className="space-y-1">
                              {webList.map((web, wIdx) => (
                                <a
                                  key={wIdx}
                                  href={web.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setWebMenuOpen(false);
                                  }}
                                  className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-150 active:scale-95 group/item"
                                >
                                  <span className="flex items-center gap-2">
                                    <Globe className="size-3.5 text-muted-foreground group-hover/item:text-primary-foreground" />
                                    <span>{web.type || "Official Website"}</span>
                                  </span>
                                  <ExternalLink className="size-3 text-muted-foreground opacity-60 group-hover/item:opacity-100 group-hover/item:text-primary-foreground" />
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
