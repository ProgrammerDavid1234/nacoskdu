import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Calendar, CheckCircle2, Clock, AlertCircle, Upload, ChevronRight } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Mock Data
const assignments = [
    {
        id: 1,
        title: "Data Structures Assignment 3",
        course: "CSC 201",
        dueDate: "Tomorrow, 11:59 PM",
        status: "Pending",
        priority: "high",
        description: "Implement a Binary Search Tree with deletion and traversal methods."
    },
    {
        id: 2,
        title: "Database Design Project",
        course: "CSC 305",
        dueDate: "Jan 20, 2026",
        status: "Pending",
        priority: "medium",
        description: "Design and implement a relational database for a library management system."
    },
    {
        id: 3,
        title: "Algorithm Analysis Report",
        course: "CSC 202",
        dueDate: "Jan 15, 2026",
        status: "Submitted",
        submittedDate: "Jan 14, 2026",
        grade: null
    },
    {
        id: 4,
        title: "Web Development Quiz",
        course: "CSC 205",
        dueDate: "Jan 10, 2026",
        status: "Graded",
        submittedDate: "Jan 09, 2026",
        grade: "95/100"
    },
    {
        id: 5,
        title: "Operating Systems Lab 1",
        course: "CSC 302",
        dueDate: "Jan 05, 2026",
        status: "Graded",
        submittedDate: "Jan 05, 2026",
        grade: "88/100"
    }
];

const StudentAssignments = () => {
    const [activeTab, setActiveTab] = useState("pending");

    const pendingAssignments = assignments.filter(a => a.status === "Pending");
    const submittedAssignments = assignments.filter(a => a.status === "Submitted");
    const gradedAssignments = assignments.filter(a => a.status === "Graded");

    const getPriorityColor = (priority?: string) => {
        switch (priority) {
            case "high": return "text-destructive bg-destructive/10";
            case "medium": return "text-yellow-600 bg-yellow-500/10";
            default: return "text-primary bg-primary/10";
        }
    };

    return (
        <DashboardLayout role="student" userName="John Doe">
            <div className="space-y-8 max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-display font-bold">Assignments</h1>
                    <p className="text-muted-foreground">Manage your tasks and track your grades</p>
                </div>

                <Tabs defaultValue="pending" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full md:w-[400px] grid-cols-3 mb-8">
                        <TabsTrigger value="pending">Pending ({pendingAssignments.length})</TabsTrigger>
                        <TabsTrigger value="submitted">Submitted</TabsTrigger>
                        <TabsTrigger value="graded">Graded</TabsTrigger>
                    </TabsList>

                    <TabsContent value="pending" className="space-y-4">
                        {pendingAssignments.map((assignment, index) => (
                            <motion.div
                                key={assignment.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <Card className="hover:shadow-md transition-shadow border-l-4 border-l-primary/50">
                                    <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="bg-background">{assignment.course}</Badge>
                                                <Badge variant="secondary" className={getPriorityColor(assignment.priority)}>
                                                    {assignment.priority && assignment.priority.charAt(0).toUpperCase() + assignment.priority.slice(1)} Priority
                                                </Badge>
                                            </div>
                                            <h3 className="text-lg font-semibold">{assignment.title}</h3>
                                            <p className="text-sm text-muted-foreground">{assignment.description}</p>
                                            <div className="flex items-center gap-2 text-sm text-destructive font-medium pt-2">
                                                <Clock className="w-4 h-4" />
                                                Due: {assignment.dueDate}
                                            </div>
                                        </div>
                                        <Button className="w-full md:w-auto gap-2">
                                            <Upload className="w-4 h-4" /> Submit
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                        {pendingAssignments.length === 0 && (
                            <div className="text-center py-12 text-muted-foreground">
                                <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-green-500/50" />
                                <p>No active assignments! Time to relax.</p>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="submitted" className="space-y-4">
                        {submittedAssignments.map((assignment, index) => (
                            <motion.div
                                key={assignment.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <Card>
                                    <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                        <div className="flex-1 space-y-2">
                                            <Badge variant="outline">{assignment.course}</Badge>
                                            <h3 className="text-lg font-semibold">{assignment.title}</h3>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                Submitted on {assignment.submittedDate}
                                            </div>
                                        </div>
                                        <Button variant="outline" className="w-full md:w-auto">View Submission</Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </TabsContent>

                    <TabsContent value="graded" className="space-y-4">
                        {gradedAssignments.map((assignment, index) => (
                            <motion.div
                                key={assignment.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <Card className="border-green-500/20 bg-green-500/5">
                                    <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                        <div className="flex-1 space-y-2">
                                            <Badge variant="outline" className="bg-background">{assignment.course}</Badge>
                                            <h3 className="text-lg font-semibold">{assignment.title}</h3>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Calendar className="w-4 h-4" />
                                                Graded on {assignment.submittedDate}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-2xl font-bold text-primary">{assignment.grade}</span>
                                            <p className="text-xs text-muted-foreground">Score</p>
                                        </div>
                                        <Button variant="ghost" size="icon">
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
};

export default StudentAssignments;
