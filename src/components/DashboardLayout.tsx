import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  BookOpen,
  FileText,
  MessageSquare,
  User,
  Upload,
  Users,
  BarChart3,
  Bell,
  Settings,
  Menu,
  X,
  LogOut,
  GraduationCap,
  Bot,
  ClipboardCheck,
  FileQuestion
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: typeof Home;
  label: string;
  href: string;
}

interface DashboardLayoutProps {
  children: ReactNode;
  role: "student" | "teacher" | "admin";
  userName?: string;
}

const studentNav: NavItem[] = [
  { icon: Home, label: "Dashboard", href: "/student" },
  { icon: BookOpen, label: "All Courses", href: "/student/enrollment" },
  { icon: BookOpen, label: "My Courses", href: "/student/courses" },
  { icon: FileText, label: "Assignments", href: "/student/assignments" },
  { icon: ClipboardCheck, label: "Take Test", href: "/student/test" },
  { icon: Bot, label: "Use AI", href: "https://hexy.hextantlabs.com/" },
  { icon: User, label: "Profile", href: "/student/profile" },
];

const teacherNav: NavItem[] = [
  { icon: Home, label: "Dashboard", href: "/teacher" },
  { icon: BookOpen, label: "My Courses", href: "/teacher/courses" },
  { icon: Upload, label: "Materials", href: "/teacher/materials" },
  { icon: FileText, label: "Grading", href: "/teacher/grading" },
  { icon: FileQuestion, label: "Tests", href: "/teacher/tests" },
];

const adminNav: NavItem[] = [
  { icon: Home, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: BookOpen, label: "Courses", href: "/admin/courses" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Bell, label: "Announcements", href: "/admin/announcements" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

const navByRole = {
  student: studentNav,
  teacher: teacherNav,
  admin: adminNav,
};

const roleLabels = {
  student: "Student Portal",
  teacher: "Teacher Portal",
  admin: "Admin Console",
};

export function DashboardLayout({ children, role, userName = "User" }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navItems = navByRole[role];

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_hsl(142_76%_45%_/_0.3)]">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg text-sidebar-foreground">KDU NACOS CONNECT</h1>
                <p className="text-xs text-muted-foreground">{roleLabels[role]}</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              const isExternal = item.href.startsWith("http");

              const LinkComponent = isExternal ? "a" : Link;
              const linkProps = isExternal
                ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
                : { to: item.href };

              return (
                <LinkComponent
                  key={item.href}
                  {...linkProps as any}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-primary/10 text-primary shadow-[0_0_20px_hsl(142_76%_45%_/_0.1)]"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className={cn("w-5 h-5", isActive && "text-primary")} />
                  {item.label}
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                  )}
                </LinkComponent>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent/50">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">{userName}</p>
                <p className="text-xs text-muted-foreground capitalize">{role}</p>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/">
                  <LogOut className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-border flex items-center px-4 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mr-4"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile close button */}
      {sidebarOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 right-4 z-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}
