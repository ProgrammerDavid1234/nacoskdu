import { BookOpen, FileText, Clock, CheckCircle2, Calendar, Bell, ChevronRight } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const upcomingDeadlines = [
  { id: 1, title: "Data Structures Assignment 3", course: "CSC 201", due: "Tomorrow", priority: "high" },
  { id: 2, title: "Database Design Project", course: "CSC 305", due: "3 days", priority: "medium" },
  { id: 3, title: "Algorithm Quiz", course: "CSC 202", due: "Next week", priority: "low" },
];

const recentCourses = [
  { id: 1, name: "Introduction to Algorithms", code: "CSC 202", progress: 75 },
  { id: 2, name: "Database Management Systems", code: "CSC 305", progress: 60 },
  { id: 3, name: "Software Engineering", code: "CSC 301", progress: 45 },
];

const notifications = [
  { id: 1, message: "New assignment posted in CSC 202", time: "2 hours ago" },
  { id: 2, message: "Your submission was graded", time: "5 hours ago" },
  { id: 3, message: "Class rescheduled for tomorrow", time: "1 day ago" },
];

const StudentDashboard = () => {
  return (
    <DashboardLayout role="student" userName="John Doe">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Welcome back, John! 👋</h1>
          <p className="text-muted-foreground">Here's what's happening with your courses today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Enrolled Courses"
            value={6}
            icon={BookOpen}
            delay={0.1}
            variant="glow"
          />
          <StatCard
            title="Pending Assignments"
            value={4}
            icon={FileText}
            delay={0.2}
          />
          <StatCard
            title="Completed Tasks"
            value={12}
            icon={CheckCircle2}
            trend={{ value: 15, isPositive: true }}
            delay={0.3}
          />
          <StatCard
            title="Study Hours"
            value="24h"
            icon={Clock}
            delay={0.4}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming Deadlines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:col-span-2 p-6 rounded-xl bg-card border border-border/50"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming Deadlines
              </h2>
              <Button variant="ghost" size="sm" className="text-primary">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline) => (
                <div 
                  key={deadline.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${
                      deadline.priority === "high" ? "bg-destructive" :
                      deadline.priority === "medium" ? "bg-yellow-500" : "bg-primary"
                    }`} />
                    <div>
                      <p className="font-medium text-foreground">{deadline.title}</p>
                      <p className="text-sm text-muted-foreground">{deadline.course}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{deadline.due}</p>
                    <p className="text-xs text-muted-foreground">Due</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="p-6 rounded-xl bg-card border border-border/50"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-semibold flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notifications
              </h2>
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <p className="text-sm text-foreground mb-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="p-6 rounded-xl bg-card border border-border/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-semibold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Your Courses
            </h2>
            <Button variant="ghost" size="sm" className="text-primary">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentCourses.map((course) => (
              <div 
                key={course.id}
                className="p-5 rounded-xl bg-secondary/30 hover:bg-secondary/50 border border-border/30 hover:border-primary/30 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">{course.code}</span>
                </div>
                <h3 className="font-medium text-foreground mb-3 line-clamp-2">{course.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground font-medium">{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
