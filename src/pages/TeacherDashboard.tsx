import { Users, FileText, CheckCircle2, TrendingUp, BookOpen, Upload, Clock, ChevronRight, Megaphone } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const courses = [
  { id: 1, name: "Introduction to Algorithms", code: "CSC 202", students: 45, assignments: 8 },
  { id: 2, name: "Database Management Systems", code: "CSC 305", students: 38, assignments: 6 },
  { id: 3, name: "Software Engineering", code: "CSC 301", students: 42, assignments: 5 },
];

const pendingGrading = [
  { id: 1, title: "Algorithm Analysis Assignment", course: "CSC 202", submissions: 42, pending: 18 },
  { id: 2, title: "SQL Queries Project", course: "CSC 305", submissions: 35, pending: 12 },
  { id: 3, title: "System Design Document", course: "CSC 301", submissions: 40, pending: 8 },
];

const recentActivity = [
  { id: 1, action: "Uploaded lecture notes", course: "CSC 202", time: "1 hour ago" },
  { id: 2, action: "Graded 5 assignments", course: "CSC 305", time: "3 hours ago" },
  { id: 3, action: "Posted new assignment", course: "CSC 301", time: "Yesterday" },
];

const announcements = [
  { id: 1, title: "Server Maintenance Scheduled", content: "The system will be down for maintenance on Sunday at 2 AM.", date: "2026-01-18" },
  { id: 2, title: "New Semester Registration", content: "Registration for the new semester is now open for all students.", date: "2026-01-15" }
];

const TeacherDashboard = () => {
  return (
    <DashboardLayout role="teacher" userName="Dr. Smith">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold mb-2">Good morning, Dr. Smith! 📚</h1>
            <p className="text-muted-foreground">Here's an overview of your teaching activities.</p>
          </div>
          <Button variant="glow" size="lg">
            <Upload className="w-4 h-4 mr-2" />
            Upload Material
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Students"
            value={125}
            icon={Users}
            trend={{ value: 8, isPositive: true }}
            delay={0.1}
            variant="glow"
          />
          <StatCard
            title="Active Courses"
            value={3}
            icon={BookOpen}
            delay={0.2}
          />
          <StatCard
            title="Pending Reviews"
            value={38}
            icon={FileText}
            delay={0.3}
          />
          <StatCard
            title="Avg. Completion"
            value="87%"
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
            delay={0.4}
          />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:col-span-2 p-6 rounded-xl bg-card border border-border/50"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                My Courses
              </h2>
              <Button variant="ghost" size="sm" className="text-primary">
                Manage All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 border border-border/30 hover:border-primary/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{course.name}</h3>
                      <p className="text-sm text-muted-foreground">{course.code}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 text-right">
                    <div>
                      <p className="text-lg font-semibold text-foreground">{course.students}</p>
                      <p className="text-xs text-muted-foreground">Students</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-foreground">{course.assignments}</p>
                      <p className="text-xs text-muted-foreground">Assignments</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="p-6 rounded-xl bg-card border border-border/50"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Recent Activity
              </h2>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="p-3 rounded-lg bg-secondary/30"
                >
                  <p className="text-sm text-foreground mb-1">{activity.action}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary">{activity.course}</span>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Pending Grading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="p-6 rounded-xl bg-card border border-border/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Pending Grading
            </h2>
            <Button variant="outline" size="sm">
              Grade All
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingGrading.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-xl bg-secondary/30 hover:bg-secondary/50 border border-border/30 hover:border-primary/30 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">{item.course}</span>
                </div>
                <h3 className="font-medium text-foreground mb-4 line-clamp-2">{item.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Submissions: </span>
                    <span className="text-foreground font-medium">{item.submissions}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-destructive font-semibold">{item.pending}</span>
                    <span className="text-muted-foreground"> pending</span>
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

export default TeacherDashboard;
