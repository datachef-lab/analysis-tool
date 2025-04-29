"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart2,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Home,
  Layers,
  MessageSquare,
  PieChart,
  Settings,
  Users,
  Menu,
  FileBarChart,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";

interface SidebarNavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: React.ReactNode;
    variant: "default" | "ghost";
    href: string;
  }[];
}

type NavLinkVariant = "default" | "ghost";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string): NavLinkVariant => {
    return pathname === href ? "default" : "ghost";
  };

  // Navigation links for the sidebar
  const dashboardLinks = [
    {
      title: "Overview",
      icon: <Home className="h-4 w-4" />,
      variant: isActive("/home"),
      href: "/home",
    },
    {
      title: "Analytics",
      icon: <BarChart2 className="h-4 w-4" />,
      variant: isActive("/home/analytics"),
      href: "/home/analytics",
    },
    {
      title: "Reports",
      icon: <FileBarChart className="h-4 w-4" />,
      variant: isActive("/home/reports"),
      href: "/home/reports",
    },
  ];

  const dataLinks = [
    {
      title: "Students",
      icon: <Users className="h-4 w-4" />,
      variant: isActive("/home/students"),
      href: "/home/students",
    },
    {
      title: "Courses",
      icon: <BookOpen className="h-4 w-4" />,
      variant: isActive("/home/courses"),
      href: "/home/courses",
    },
    {
      title: "Faculty",
      icon: <GraduationCap className="h-4 w-4" />,
      variant: isActive("/home/faculty"),
      href: "/home/faculty",
    },
    {
      title: "Departments",
      icon: <Layers className="h-4 w-4" />,
      variant: isActive("/home/departments"),
      href: "/home/departments",
    },
    {
      title: "Schedule",
      icon: <Calendar className="h-4 w-4" />,
      variant: isActive("/home/schedule"),
      href: "/home/schedule",
    },
  ];

  const aiToolLinks = [
    {
      title: "Chat Assistant",
      icon: <MessageSquare className="h-4 w-4" />,
      variant: isActive("/home/chat"),
      href: "/home/chat",
    },
    {
      title: "Data Insights",
      icon: <PieChart className="h-4 w-4" />,
      variant: isActive("/home/insights"),
      href: "/home/insights",
    },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside
        className={cn(
          "group relative flex h-full flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 shadow-sm",
          isCollapsed ? "w-[70px]" : "w-[250px]"
        )}
      >
        {/* Sidebar Header/Logo */}
        <div
          className={cn(
            "flex h-16 items-center border-b border-slate-200 dark:border-slate-800 px-4",
            isCollapsed ? "justify-center" : "justify-between"
          )}
        >
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-indigo-600 dark:bg-indigo-500 p-1.5">
                <BarChart2 className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                EduAnalytics
              </h1>
            </div>
          )}
          {isCollapsed && (
            <div className="rounded-md bg-indigo-600 dark:bg-indigo-500 p-1.5">
              <BarChart2 className="h-5 w-5 text-white" />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-7 w-7 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100",
              isCollapsed &&
                "hidden group-hover:flex absolute -right-3 bg-white dark:bg-slate-800 shadow-sm top-4 z-10"
            )}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <ScrollArea className="flex-1 py-2">
          <TooltipProvider>
            <div className="px-3 py-2">
              <div className="mb-2">
                <div className={cn("mb-1", isCollapsed ? "px-2" : "px-4")}>
                  {!isCollapsed && (
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      DASHBOARD
                    </p>
                  )}
                  {isCollapsed && (
                    <Separator className="mx-auto h-[2px] w-5 rounded-full bg-slate-300 dark:bg-slate-700" />
                  )}
                </div>
                <SidebarNav isCollapsed={isCollapsed} links={dashboardLinks} />
              </div>

              <div className="mb-2">
                <div className={cn("mb-1", isCollapsed ? "px-2" : "px-4")}>
                  {!isCollapsed && (
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      DATA
                    </p>
                  )}
                  {isCollapsed && (
                    <Separator className="mx-auto h-[2px] w-5 rounded-full bg-slate-300 dark:bg-slate-700" />
                  )}
                </div>
                <SidebarNav isCollapsed={isCollapsed} links={dataLinks} />
              </div>

              <div className="mb-2">
                <div className={cn("mb-1", isCollapsed ? "px-2" : "px-4")}>
                  {!isCollapsed && (
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      AI TOOLS
                    </p>
                  )}
                  {isCollapsed && (
                    <Separator className="mx-auto h-[2px] w-5 rounded-full bg-slate-300 dark:bg-slate-700" />
                  )}
                </div>
                <SidebarNav isCollapsed={isCollapsed} links={aiToolLinks} />
              </div>
            </div>
          </TooltipProvider>
        </ScrollArea>

        {/* User profile section at bottom */}
        <div
          className={cn(
            "mt-auto border-t border-slate-200 dark:border-slate-800 p-4",
            isCollapsed ? "flex justify-center py-4" : "px-4 py-3"
          )}
        >
          {!isCollapsed ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 border border-slate-200 dark:border-slate-700">
                <AvatarImage src="/avatars/admin.png" alt="Admin User" />
                <AvatarFallback className="text-xs bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
                  AU
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  Admin User
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  admin@college.edu
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto h-8 w-8 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                onClick={() => {}}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Avatar className="h-9 w-9 border border-slate-200 dark:border-slate-700">
              <AvatarImage src="/avatars/admin.png" alt="Admin User" />
              <AvatarFallback className="text-xs bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
                AU
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </aside>

      {/* Mobile sidebar toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-50 h-8 w-8 rounded-full bg-white text-slate-700 border-slate-200 hover:text-slate-900 shadow-md dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:text-slate-100 md:hidden"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-950">
        {children}
      </main>
    </div>
  );
}

// Sidebar Navigation Component
function SidebarNav({ links, isCollapsed }: SidebarNavProps) {
  const router = useRouter();

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-1 py-1 data-[collapsed=true]:py-2"
    >
      {links.map((link, index) => (
        <Tooltip key={index} delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant={link.variant}
              className={cn(
                "h-9 justify-start text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800",
                link.variant === "default" &&
                  "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800",
                isCollapsed ? "w-9 p-0" : "w-full px-3"
              )}
              onClick={() => router.push(link.href)}
            >
              {link.icon}
              {!isCollapsed && <span className="ml-2">{link.title}</span>}
              {!isCollapsed && link.label && (
                <span className="ml-auto text-xs text-slate-500 dark:text-slate-400">
                  {link.label}
                </span>
              )}
            </Button>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent
              side="right"
              className="flex items-center gap-4 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800"
            >
              {link.title}
              {link.label && (
                <span className="ml-auto text-xs text-slate-500 dark:text-slate-400">
                  {link.label}
                </span>
              )}
            </TooltipContent>
          )}
        </Tooltip>
      ))}
    </div>
  );
}
