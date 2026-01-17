import { motion } from "framer-motion";
import { BookOpen, MoreVertical, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const mockCourses = [
    { id: 1, title: "Artificial Intelligence Fundamentals", code: "CSC 401", instructor: "Dr. Teacher", status: "Active" },
    { id: 2, title: "Data Structures & Algorithms", code: "CSC 201", instructor: "Dr. Teacher", status: "Active" },
    { id: 3, title: "Introduction to Networking", code: "CSC 302", instructor: "Prof. Anderson", status: "Pending Approval" },
    { id: 4, title: "Web Development Bootcamp", code: "CSC 305", instructor: "Prof. Anderson", status: "Archived" },
];

const AdminCourses = () => {
    return (
        <DashboardLayout role="admin" userName="Admin User">
            <div className="space-y-8 max-w-7xl mx-auto">
                <div>
                    <h1 className="text-3xl font-display font-bold">Course Management</h1>
                    <p className="text-muted-foreground mt-1">Oversee and moderate all academic courses</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockCourses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
                                <CardHeader className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge variant="outline">{course.code}</Badge>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" /> Approve
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <XCircle className="w-4 h-4 mr-2 text-yellow-600" /> Reject/Archive
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">
                                                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <CardTitle className="line-clamp-2 text-lg">{course.title}</CardTitle>
                                    <CardDescription>{course.instructor}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${course.status === "Active" ? "bg-green-100 text-green-800" :
                                            course.status === "Pending Approval" ? "bg-yellow-100 text-yellow-800" :
                                                "bg-gray-100 text-gray-800"
                                        }`}>
                                        {course.status}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminCourses;
