import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Shield, Users } from "lucide-react";
import { RoleCard } from "@/components/RoleCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-background/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_hsl(142_76%_45%_/_0.3)]">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">Uni Connect</span>
          </div>
          <div className="text-sm text-muted-foreground">
            NACOS Department Portal
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">Welcome to NACOS</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight"
          >
            Your Gateway to
            <span className="block text-primary">Academic Excellence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            Connect with your courses, teachers, and fellow students. 
            Manage assignments, access resources, and stay updated — all in one place.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center gap-12 mb-16"
          >
            {[
              { value: "500+", label: "Students" },
              { value: "50+", label: "Courses" },
              { value: "30+", label: "Teachers" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-display font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="relative z-10 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-display font-semibold mb-4">Select Your Portal</h2>
            <p className="text-muted-foreground">Choose your role to access your personalized dashboard</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <RoleCard
              title="Student"
              description="Access courses, submit assignments, and connect with teachers."
              icon={BookOpen}
              href="/student"
              features={[
                "View course materials",
                "Submit assignments",
                "Track deadlines",
                "Message teachers"
              ]}
              delay={0.5}
            />
            <RoleCard
              title="Teacher"
              description="Manage courses, upload materials, and grade student work."
              icon={Users}
              href="/teacher"
              features={[
                "Upload course content",
                "Create assignments",
                "Grade submissions",
                "Student communication"
              ]}
              delay={0.6}
            />
            <RoleCard
              title="Admin"
              description="Oversee the entire system, manage users and monitor analytics."
              icon={Shield}
              href="/admin"
              features={[
                "User management",
                "System analytics",
                "Course oversight",
                "Announcements"
              ]}
              delay={0.7}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-8 px-4">
        <div className="container mx-auto text-center">

        </div>
      </footer>
    </div>
  );
};

export default Index;
