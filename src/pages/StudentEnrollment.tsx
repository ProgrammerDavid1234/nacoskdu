import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, BookOpen, Clock, Users, Star, CheckCircle2 } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock Data
const availableCourses = [
    {
        id: 101,
        title: "Artificial Intelligence Fundamentals",
        code: "CSC 401",
        instructor: "Dr. Alan Turing",
        duration: "12 Weeks",
        students: 120,
        rating: 4.8,
        category: "Computer Science",
        description: "Learn the basics of AI, including machine learning, neural networks, and natural language processing.",
        image: "bg-indigo-500/10"
    },
    {
        id: 102,
        title: "Cybersecurity Essentials",
        code: "CSC 405",
        instructor: "Prof. Ada Lovelace",
        duration: "10 Weeks",
        students: 85,
        rating: 4.9,
        category: "Security",
        description: "Understand the core concepts of cybersecurity, network defense, and ethical hacking.",
        image: "bg-red-500/10"
    },
    {
        id: 103,
        title: "Mobile App Development",
        code: "CSC 310",
        instructor: "Mr. Steve Jobs",
        duration: "8 Weeks",
        students: 200,
        rating: 4.7,
        category: "Development",
        description: "Build cross-platform mobile applications using React Native and Flutter.",
        image: "bg-blue-500/10"
    },
    {
        id: 104,
        title: "Cloud Computing Architecture",
        code: "CSC 420",
        instructor: "Mrs. Grace Hopper",
        duration: "14 Weeks",
        students: 95,
        rating: 4.6,
        category: "Infrastructure",
        description: "Master cloud services, serverless architecture, and distributed systems design.",
        image: "bg-sky-500/10"
    },
    {
        id: 105,
        title: "UI/UX Design Principles",
        code: "DES 201",
        instructor: "Ms. Zaha Hadid",
        duration: "6 Weeks",
        students: 150,
        rating: 4.9,
        category: "Design",
        description: "Create beautiful and functional user interfaces with user-centered design principles.",
        image: "bg-pink-500/10"
    },
    {
        id: 106,
        title: "Blockchain Technology",
        code: "CSC 450",
        instructor: "Mr. Satoshi Nakamoto",
        duration: "10 Weeks",
        students: 60,
        rating: 4.5,
        category: "Computer Science",
        description: "Explore the fundamentals of blockchain, smart contracts, and decentralized applications.",
        image: "bg-orange-500/10"
    }
];

const StudentEnrollment = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);

    const handleEnroll = (courseId: number, courseTitle: string) => {
        setEnrolledCourses([...enrolledCourses, courseId]);
        toast.success(`Successfully enrolled in ${courseTitle}`, {
            description: "You can now access this course in your dashboard.",
        });
    };

    const filteredCourses = availableCourses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === "All" || course.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const categories = ["All", ...Array.from(new Set(availableCourses.map(c => c.category)))];

    return (
        <DashboardLayout role="student" userName="John Doe">
            <div className="space-y-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-display font-bold">Course Catalog</h1>
                        <p className="text-muted-foreground mt-1">Discover and enroll in new courses to expand your knowledge</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search courses..."
                                className="pl-9 bg-background"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="gap-2">
                                    <Filter className="w-4 h-4" />
                                    <span className="hidden sm:inline">Category: {categoryFilter}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {categories.map(category => (
                                    <DropdownMenuItem key={category} onClick={() => setCategoryFilter(category)}>
                                        {category}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Course Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 group">
                                <div className={`h-40 ${course.image} relative p-6`}>
                                    <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur text-foreground hover:bg-background/80">
                                        {course.category}
                                    </Badge>
                                    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                        {course.rating}
                                    </div>
                                </div>

                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-medium text-muted-foreground border border-border px-2 py-0.5 rounded">
                                            {course.code}
                                        </span>
                                    </div>
                                    <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-1">
                                        {course.title}
                                    </CardTitle>
                                    <CardDescription className="line-clamp-2 mt-2">
                                        {course.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="py-2 flex-grow">
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <Users className="w-4 h-4" />
                                            {course.students} Students
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4" />
                                            {course.duration}
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                                            {course.instructor.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span className="text-sm font-medium">{course.instructor}</span>
                                    </div>
                                </CardContent>

                                <CardFooter className="pt-2 pb-6">
                                    {enrolledCourses.includes(course.id) ? (
                                        <Button className="w-full bg-green-500 hover:bg-green-600 cursor-default">
                                            <CheckCircle2 className="w-4 h-4 mr-2" /> Enrolled
                                        </Button>
                                    ) : (
                                        <Button
                                            className="w-full"
                                            onClick={() => handleEnroll(course.id, course.title)}
                                        >
                                            Enroll Now
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default StudentEnrollment;
