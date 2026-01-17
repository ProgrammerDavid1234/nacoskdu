import { Users, BookOpen, TrendingUp, BarChart3, Bell, Settings, ChevronRight, UserPlus, AlertCircle } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const systemStats = [
  { label: "Active Sessions", value: 234, change: "+12%" },
  { label: "Server Uptime", value: "99.9%", change: "0%" },
  { label: "Avg Response Time", value: "45ms", change: "-8%" },
];

const recentUsers = [
  { id: 1, name: "Alice Johnson", email: "alice@university.edu", role: "Student", joined: "Today" },
  { id: 2, name: "Bob Williams", email: "bob@university.edu", role: "Teacher", joined: "Yesterday" },
  { id: 3, name: "Carol Davis", email: "carol@university.edu", role: "Student", joined: "2 days ago" },
  { id: 4, name: "David Brown", email: "david@university.edu", role: "Student", joined: "3 days ago" },
];

const alerts = [
  { id: 1, type: "warning", message: "Storage usage at 75%", time: "10 min ago" },
  { id: 2, type: "info", message: "System backup completed", time: "1 hour ago" },
  { id: 3, type: "success", message: "New course CSC 401 created", time: "3 hours ago" },
];

const quickActions = [
  { icon: UserPlus, label: "Add User", description: "Create new student or teacher account" },
  { icon: BookOpen, label: "New Course", description: "Set up a new course module" },
  { icon: Bell, label: "Send Announcement", description: "Broadcast to all users" },
  { icon: Settings, label: "System Settings", description: "Configure platform settings" },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin" userName="Admin">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold mb-2">Admin Dashboard 🛡️</h1>
            <p className="text-muted-foreground">Monitor and manage the entire KDU NACOS CONNECT platform.</p>
          </div>
          <Button variant="hero" size="lg">
            <Bell className="w-4 h-4 mr-2" />
            Send Announcement
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Students"
            value="542"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            delay={0.1}
            variant="glow"
          />
          <StatCard
            title="Total Teachers"
            value={34}
            icon={Users}
            trend={{ value: 5, isPositive: true }}
            delay={0.2}
          />
          <StatCard
            title="Active Courses"
            value={28}
            icon={BookOpen}
            delay={0.3}
          />
          <StatCard
            title="Platform Growth"
            value="+24%"
            icon={TrendingUp}
            trend={{ value: 8, isPositive: true }}
            delay={0.4}
          />
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {quickActions.map((action, index) => (
            <div
              key={index}
              className="p-5 rounded-xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-[0_0_40px_hsl(142_76%_45%_/_0.1)] transition-all duration-300 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(142_76%_45%_/_0.2)] transition-all duration-300">
                <action.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{action.label}</h3>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="lg:col-span-2 p-6 rounded-xl bg-card border border-border/50"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Recent Users
              </h2>
              <Button variant="ghost" size="sm" className="text-primary">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">
                            {user.name.charAt(0)}
                          </div>
                          <span className="font-medium text-foreground">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{user.email}</td>
                      <td className="py-4 px-4">
                        <span className={`text-xs font-medium px-2 py-1 rounded ${user.role === "Teacher"
                            ? "bg-primary/10 text-primary"
                            : "bg-secondary text-muted-foreground"
                          }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{user.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* System Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="p-6 rounded-xl bg-card border border-border/50"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-semibold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                System Alerts
              </h2>
            </div>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${alert.type === "warning"
                      ? "bg-yellow-500/10 border-yellow-500/30"
                      : alert.type === "success"
                        ? "bg-primary/10 border-primary/30"
                        : "bg-secondary/50 border-border"
                    }`}
                >
                  <p className="text-sm text-foreground mb-1">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* System Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="p-6 rounded-xl bg-card border border-border/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-semibold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              System Performance
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {systemStats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-secondary/30">
                <p className="text-3xl font-display font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                <span className={`text-xs font-medium ${stat.change.startsWith("+") ? "text-primary" :
                    stat.change.startsWith("-") ? "text-destructive" : "text-muted-foreground"
                  }`}>
                  {stat.change}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
