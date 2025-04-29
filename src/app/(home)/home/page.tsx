"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GraduationCap,
  Users,
  BookOpen,
  Layers,
  TrendingUp,
  Award,
  AlertTriangle,
  ArrowRightCircle,
  BellRing,
  ChevronRight,
  BarChart,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col h-full">
      {/* Dashboard Header with subtle gradient background */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-indigo-50/50 via-slate-50 to-blue-50/50 dark:from-slate-900 dark:via-indigo-950/30 dark:to-slate-900">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              College Analytics Dashboard
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Welcome to your academic performance insights
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-1 bg-white/80 backdrop-blur-sm border-slate-200 dark:bg-slate-900/80 dark:border-slate-700"
            >
              <BellRing className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <span className="hidden sm:inline">Notifications</span>
              <Badge
                variant="secondary"
                className="ml-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300"
              >
                4
              </Badge>
            </Button>
            <Button
              variant="default"
              size="sm"
              className="gap-1 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white border-none shadow-md dark:from-indigo-600 dark:to-indigo-700"
            >
              Generate Report
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content with pattern background */}
      <div
        className="flex-1 overflow-auto p-6 bg-slate-50 dark:bg-slate-950"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a5b4fc' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Stats Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            {/* Total Students Card */}
            <Card className="border-0 shadow-md bg-white dark:bg-slate-900 overflow-hidden">
              <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-indigo-50/50 to-transparent dark:from-indigo-950/20 dark:to-transparent"></div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="rounded-full bg-indigo-100 p-2 dark:bg-indigo-900/60">
                    <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                  >
                    +12% ↑
                  </Badge>
                </div>
                <div className="space-y-1 relative z-10">
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                    5,234
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Total Students
                  </p>
                </div>
                <div className="mt-4 flex items-center text-xs text-slate-500 dark:text-slate-400 relative z-10">
                  <span className="text-green-500 dark:text-green-400 mr-1">
                    ↑
                  </span>
                  <span>124 new enrollments this month</span>
                </div>
              </CardContent>
            </Card>

            {/* Active Courses Card */}
            <Card className="border-0 shadow-md bg-white dark:bg-slate-900 overflow-hidden">
              <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent"></div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/60">
                    <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                  >
                    +5% ↑
                  </Badge>
                </div>
                <div className="space-y-1 relative z-10">
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                    327
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Active Courses
                  </p>
                </div>
                <div className="mt-4 flex items-center text-xs text-slate-500 dark:text-slate-400 relative z-10">
                  <span className="text-blue-500 dark:text-blue-400 mr-1">
                    +
                  </span>
                  <span>12 new courses added this semester</span>
                </div>
              </CardContent>
            </Card>

            {/* Departments Card */}
            <Card className="border-0 shadow-md bg-white dark:bg-slate-900 overflow-hidden">
              <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-emerald-50/50 to-transparent dark:from-emerald-950/20 dark:to-transparent"></div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900/60">
                    <Layers className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800"
                  >
                    Stable
                  </Badge>
                </div>
                <div className="space-y-1 relative z-10">
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                    42
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Departments
                  </p>
                </div>
                <div className="mt-4 flex items-center text-xs text-slate-500 dark:text-slate-400 relative z-10">
                  <span>All departments operational</span>
                </div>
              </CardContent>
            </Card>

            {/* Average GPA Card */}
            <Card className="border-0 shadow-md bg-white dark:bg-slate-900 overflow-hidden">
              <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-amber-50/50 to-transparent dark:from-amber-950/20 dark:to-transparent"></div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900/60">
                    <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800"
                  >
                    +0.2 ↑
                  </Badge>
                </div>
                <div className="space-y-1 relative z-10">
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                    3.42
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Average GPA
                  </p>
                </div>
                <div className="mt-4 flex items-center text-xs text-slate-500 dark:text-slate-400 relative z-10">
                  <span className="text-amber-500 dark:text-amber-400 mr-1">
                    ↑
                  </span>
                  <span>Improved from last semester (3.24)</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
            {/* Main Charts Section */}
            <div className="lg:col-span-4 space-y-6">
              {/* Enrollment Trends Chart */}
              <Card className="border-0 shadow-md bg-white dark:bg-slate-900 overflow-hidden">
                <CardHeader className="pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-medium text-slate-800 dark:text-slate-100">
                        Enrollment Trends
                      </CardTitle>
                      <CardDescription className="text-slate-500 dark:text-slate-400">
                        Student enrollment by semester
                      </CardDescription>
                    </div>
                    <Tabs defaultValue="yearly" className="w-[240px]">
                      <TabsList className="grid grid-cols-3 bg-slate-100 dark:bg-slate-800">
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                        <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
                        <TabsTrigger value="yearly">Yearly</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="h-[300px] w-full relative">
                    {/* Enrollment stacked bar chart - placeholder for real chart */}
                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/30 to-transparent dark:from-indigo-950/10 dark:to-transparent rounded-md"></div>
                    <div className="h-full w-full bg-white dark:bg-slate-900 rounded-md flex items-end relative z-10">
                      <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm dark:text-slate-500">
                        <div className="flex flex-col items-center gap-3">
                          <BarChart className="h-8 w-8 text-slate-300 dark:text-slate-700" />
                          <span>
                            Enrollment chart would appear here with real data
                          </span>
                        </div>
                      </div>
                      <div className="flex items-end justify-around w-full px-6 pb-6">
                        {[60, 75, 65, 80, 90, 85, 70].map((height, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <div className="flex flex-col h-[280px] items-end space-y-1 mb-2">
                              <div
                                className="w-12 bg-indigo-200 dark:bg-indigo-900/50 rounded-t-sm"
                                style={{ height: `${height * 0.4}px` }}
                              ></div>
                              <div
                                className="w-12 bg-indigo-400 dark:bg-indigo-700 rounded-t-sm"
                                style={{ height: `${height * 0.6}px` }}
                              ></div>
                            </div>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {2016 + i}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-6">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-sm bg-indigo-400 dark:bg-indigo-700 mr-2"></div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Undergraduate
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-sm bg-indigo-200 dark:bg-indigo-900/50 mr-2"></div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Graduate
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* GPA Trends */}
              <Card className="border-0 shadow-md bg-white dark:bg-slate-900 overflow-hidden">
                <CardHeader className="pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-medium text-slate-800 dark:text-slate-100">
                        GPA Trends
                      </CardTitle>
                      <CardDescription className="text-slate-500 dark:text-slate-400">
                        Average GPA across departments
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs gap-1 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                    >
                      <span>Details</span>
                      <ArrowRightCircle className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="h-[240px] w-full relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-transparent dark:from-blue-950/10 dark:to-transparent rounded-md"></div>
                    {/* Line chart for GPA trends - placeholder */}
                    <div className="h-full w-full bg-white dark:bg-slate-900 rounded-md relative z-10">
                      <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm dark:text-slate-500">
                        <div className="flex flex-col items-center gap-3">
                          <BarChart className="h-8 w-8 text-slate-300 dark:text-slate-700" />
                          <span>GPA trend line chart would appear here</span>
                        </div>
                      </div>
                      {/* Pseudo line chart */}
                      <svg
                        className="w-full h-full overflow-visible relative z-10"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient
                            id="gpa-gradient"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              stopColor="rgba(99, 102, 241, 0.2)"
                            />
                            <stop
                              offset="100%"
                              stopColor="rgba(99, 102, 241, 0)"
                            />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0,180 C40,160 80,140 120,150 C160,160 200,170 240,160 C280,150 320,130 360,120 C400,110 440,105 480,100 L480,240 L0,240 Z"
                          fill="url(#gpa-gradient)"
                          className="dark:opacity-50"
                        />
                        <path
                          d="M0,180 C40,160 80,140 120,150 C160,160 200,170 240,160 C280,150 320,130 360,120 C400,110 440,105 480,100"
                          fill="none"
                          stroke="#6366f1"
                          strokeWidth="2"
                          className="dark:opacity-80"
                        />
                        {/* Data points */}
                        {[
                          180, 160, 140, 150, 160, 170, 160, 150, 130, 120, 110,
                          105, 100,
                        ].map((y, i) => (
                          <circle
                            key={i}
                            cx={i * 40}
                            cy={y}
                            r="3"
                            fill="#6366f1"
                            className="dark:opacity-80"
                          />
                        ))}
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3 space-y-6">
              {/* Department Analytics */}
              <Card className="border-0 shadow-md bg-white dark:bg-slate-900 overflow-hidden">
                <CardHeader className="border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium text-slate-800 dark:text-slate-100">
                      Department Analytics
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-slate-500 gap-1 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
                    >
                      View All
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription className="text-slate-500 dark:text-slate-400">
                    Performance metrics by department
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {[
                      {
                        name: "Computer Science",
                        students: 842,
                        gpa: 3.68,
                        status: "Excellent",
                      },
                      {
                        name: "Mathematics",
                        students: 524,
                        gpa: 3.45,
                        status: "Good",
                      },
                      {
                        name: "Physics",
                        students: 328,
                        gpa: 3.52,
                        status: "Good",
                      },
                      {
                        name: "Engineering",
                        students: 763,
                        gpa: 3.37,
                        status: "Good",
                      },
                      {
                        name: "Business",
                        students: 691,
                        gpa: 3.21,
                        status: "Average",
                      },
                    ].map((dept, i) => (
                      <div
                        key={i}
                        className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-3">
                              <GraduationCap className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                            </div>
                            <div>
                              <p className="font-medium text-sm text-slate-700 dark:text-slate-300">
                                {dept.name}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {dept.students} students
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                              {dept.gpa} GPA
                            </p>
                            <Badge
                              className={
                                dept.status === "Excellent"
                                  ? "mt-1 bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400"
                                  : dept.status === "Good"
                                  ? "mt-1 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400"
                                  : "mt-1 bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400"
                              }
                            >
                              {dept.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Alerts & Notifications */}
              <Card className="border-0 shadow-md bg-white dark:bg-slate-900 overflow-hidden">
                <CardHeader className="border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium text-slate-800 dark:text-slate-100">
                      Recent Alerts
                    </CardTitle>
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400">
                      4 New
                    </Badge>
                  </div>
                  <CardDescription className="text-slate-500 dark:text-slate-400">
                    System notifications and alerts
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    <div className="flex items-start p-4 gap-3">
                      <div className="rounded-full bg-amber-100 p-1.5 dark:bg-amber-900/50">
                        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Low attendance detected
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          15 students in Physics 101 have attendance below 70%
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant="outline"
                            className="text-xs px-1.5 py-0 border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400"
                          >
                            Physics
                          </Badge>
                          <span className="text-xs text-slate-400 dark:text-slate-500">
                            2 hours ago
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start p-4 gap-3">
                      <div className="rounded-full bg-red-100 p-1.5 dark:bg-red-900/50">
                        <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Grade submission deadline approaching
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          5 courses have pending grade submissions due in 48
                          hours
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant="outline"
                            className="text-xs px-1.5 py-0 border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400"
                          >
                            Grades
                          </Badge>
                          <span className="text-xs text-slate-400 dark:text-slate-500">
                            1 day ago
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start p-4 gap-3">
                      <div className="rounded-full bg-green-100 p-1.5 dark:bg-green-900/50">
                        <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Performance improvement detected
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Computer Science department shows 15% improvement in
                          pass rates
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant="outline"
                            className="text-xs px-1.5 py-0 border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400"
                          >
                            CS Dept
                          </Badge>
                          <span className="text-xs text-slate-400 dark:text-slate-500">
                            3 days ago
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-4 py-3 border-t border-slate-100 dark:border-slate-800">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    View All Alerts
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
