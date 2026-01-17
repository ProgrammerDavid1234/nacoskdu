import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Users, BookOpen, MoreVertical, Edit, Trash2 } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const initialCourses = [
    {
        id: 101,
        title: "Artificial Intelligence Fundamentals",
        code: "CSC 401",
        students: 120,
        assignments: 8,
        status: "Active",
        image: "bg-indigo-500/10"
    },
    {
        id: 102,
        title: "Data Structures & Algorithms",
        code: "CSC 201",
        students: 156,
        assignments: 12,
        status: "Active",
        image: "bg-blue-500/10"
    },
    {
        id: 103,
        title: "Web Development Bootcamp",
        code: "CSC 305",
        students: 98,
        assignments: 5,
        status: "Upcoming",
        image: "bg-orange-500/10"
    }
];

const TeacherCourses = () => {
    const [courses, setCourses] = useState(initialCourses);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newCourse, setNewCourse] = useState({
        title: "",
        code: "",
        students: "0",
        assignments: "0",
        status: "Upcoming"
    });

    const handleCreateCourse = (e: React.FormEvent) => {
        e.preventDefault();

        if (!newCourse.title || !newCourse.code) {
            toast.error("Please fill in all required fields");
            return;
        }

        const course = {
            id: Math.floor(Math.random() * 1000),
            ...newCourse,
            students: parseInt(newCourse.students) || 0,
            assignments: parseInt(newCourse.assignments) || 0,
            image: "bg-primary/5" // Default background
        };

        setCourses([...courses, course]);
        setNewCourse({
            title: "",
            code: "",
            students: "0",
            assignments: "0",
            status: "Upcoming"
        });
        setIsDialogOpen(false);
        toast.success("Course created successfully");
    };

    return (
        <DashboardLayout role="teacher" userName="Dr. Teacher">
            <div className="space-y-8 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-display font-bold">My Courses</h1>
                        <p className="text-muted-foreground mt-1">Manage your active courses and curriculum</p>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="gap-2">
                                <Plus className="w-4 h-4" /> Create New Course
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Create New Course</DialogTitle>
                                <DialogDescription>
                                    Add a new course to your curriculum. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCreateCourse}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="title" className="text-right">
                                            Title
                                        </Label>
                                        <Input
                                            id="title"
                                            value={newCourse.title}
                                            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                                            className="col-span-3"
                                            placeholder="Introduction to Programming"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="code" className="text-right">
                                            Code
                                        </Label>
                                        <Input
                                            id="code"
                                            value={newCourse.code}
                                            onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                                            className="col-span-3"
                                            placeholder="CSC 101"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Create Course</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <Card className="h-full flex flex-col group overflow-hidden border-border/50 hover:border-primary/20 transition-all hover:shadow-lg">
                                <div className={`h-32 ${course.image} relative p-6 flex flex-col justify-between`}>
                                    <div className="flex justify-between items-start">
                                        <span className="text-xs font-medium bg-background/50 backdrop-blur px-2 py-1 rounded border border-border/10">
                                            {course.code}
                                        </span>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem className="gap-2">
                                                    <Edit className="w-4 h-4" /> Edit Course
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                                                    <Trash2 className="w-4 h-4" /> Archive
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <div className={`self-start px-2 py-1 rounded text-xs font-medium ${course.status === "Active" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                                        }`}>
                                        {course.status}
                                    </div>
                                </div>

                                <CardHeader>
                                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                                        {course.title}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="flex-grow">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1 p-3 rounded-lg bg-secondary/30">
                                            <div className="flex items-center gap-2 text-muted-foreground text-xs">
                                                <Users className="w-3.5 h-3.5" /> Students
                                            </div>
                                            <span className="text-xl font-bold">{course.students}</span>
                                        </div>
                                        <div className="flex flex-col gap-1 p-3 rounded-lg bg-secondary/30">
                                            <div className="flex items-center gap-2 text-muted-foreground text-xs">
                                                <BookOpen className="w-3.5 h-3.5" /> Modules
                                            </div>
                                            <span className="text-xl font-bold">{course.assignments}</span>
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className="pt-2">
                                    <Button variant="outline" className="w-full">
                                        View Classroom
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </DashboardLayout >
    );
};

export default TeacherCourses;
