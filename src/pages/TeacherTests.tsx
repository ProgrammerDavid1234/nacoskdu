import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, FileQuestion, Upload, Calendar, Clock, MoreVertical, Edit, Trash2, CheckCircle2 } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const initialTests = [
    {
        id: 1,
        title: "Mid-Term Examination",
        course: "CSC 202: Data Structures",
        duration: "90",
        questions: 50,
        status: "Published",
        date: "2026-03-15"
    },
    {
        id: 2,
        title: "Weekly Quiz 4",
        course: "CSC 305: Database Systems",
        duration: "30",
        questions: 20,
        status: "Draft",
        date: "2026-01-20"
    }
];

const TeacherTests = () => {
    const [tests, setTests] = useState(initialTests);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newTest, setNewTest] = useState({
        title: "",
        course: "",
        duration: "",
        questions: [] as any[],
        file: null as File | null
    });

    // Mock Question Builder State
    const [currentQuestion, setCurrentQuestion] = useState({
        text: "",
        options: ["", "", "", ""],
        correct: 0
    });

    const courses = [
        "CSC 201: Data Structures",
        "CSC 305: Database Systems",
        "CSC 401: Artificial Intelligence"
    ];

    const handleCreateTest = (e: React.FormEvent) => {
        e.preventDefault();

        if (!newTest.title || !newTest.course || !newTest.duration) {
            toast.error("Please fill in all required fields");
            return;
        }

        const test = {
            id: Math.floor(Math.random() * 1000),
            title: newTest.title,
            course: newTest.course,
            duration: newTest.duration,
            questions: newTest.questions.length || (newTest.file ? "Uploaded" : 0),
            status: "Published", // Defaulting to published for now
            date: new Date().toISOString().split('T')[0]
        };

        setTests([...tests, test]);
        setNewTest({ title: "", course: "", duration: "", questions: [], file: null });
        setIsDialogOpen(false);
        toast.success("Test created successfully");
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewTest({ ...newTest, file });
            toast.success(`File ${file.name} uploaded successfully`);
        }
    };

    const addQuestion = () => {
        if (!currentQuestion.text) return;
        setNewTest({
            ...newTest,
            questions: [...newTest.questions, currentQuestion]
        });
        setCurrentQuestion({ text: "", options: ["", "", "", ""], correct: 0 });
        toast.success("Question added");
    };

    return (
        <DashboardLayout role="teacher" userName="Dr. Teacher">
            <div className="space-y-8 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-display font-bold">Test Management</h1>
                        <p className="text-muted-foreground mt-1">Create and manage your assessments</p>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="gap-2">
                                <Plus className="w-4 h-4" /> Create New Test
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Create New Test</DialogTitle>
                                <DialogDescription>
                                    Configure test details and add questions.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCreateTest} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Test Title</Label>
                                        <Input
                                            id="title"
                                            value={newTest.title}
                                            onChange={(e) => setNewTest({ ...newTest, title: e.target.value })}
                                            placeholder="e.g. Mid-Term Exam"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="course">Course</Label>
                                        <Select onValueChange={(val) => setNewTest({ ...newTest, course: val })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Course" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {courses.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="duration">Duration (mins)</Label>
                                        <Input
                                            id="duration"
                                            type="number"
                                            value={newTest.duration}
                                            onChange={(e) => setNewTest({ ...newTest, duration: e.target.value })}
                                            placeholder="60"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 border rounded-md p-4 bg-secondary/10">
                                    <h3 className="font-semibold flex items-center gap-2">
                                        <FileQuestion className="w-4 h-4" /> Questions
                                    </h3>

                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="upload" className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 hover:bg-muted/50 transition-colors">
                                            <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                            <span className="text-sm font-medium">Upload Test File (PDF/Docx)</span>
                                            <span className="text-xs text-muted-foreground mt-1">or manually add questions below</span>
                                            <Input id="upload" type="file" className="hidden" onChange={handleFileUpload} />
                                        </Label>
                                        {newTest.file && <p className="text-xs text-primary font-medium mt-1">Uploaded: {newTest.file.name}</p>}
                                    </div>

                                    <div className="space-y-4 pt-4 border-t">
                                        <p className="text-sm font-medium">Manual Entry</p>
                                        <Textarea
                                            placeholder="Question Text"
                                            value={currentQuestion.text}
                                            onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
                                        />
                                        <div className="grid grid-cols-2 gap-2">
                                            {currentQuestion.options.map((opt, idx) => (
                                                <div key={idx} className="flex gap-2 items-center">
                                                    <Input
                                                        placeholder={`Option ${idx + 1}`}
                                                        value={opt}
                                                        onChange={(e) => {
                                                            const newOpts = [...currentQuestion.options];
                                                            newOpts[idx] = e.target.value;
                                                            setCurrentQuestion({ ...currentQuestion, options: newOpts });
                                                        }}
                                                    />
                                                    <input
                                                        type="radio"
                                                        name="correct"
                                                        checked={currentQuestion.correct === idx}
                                                        onChange={() => setCurrentQuestion({ ...currentQuestion, correct: idx })}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <Button type="button" variant="secondary" size="sm" onClick={addQuestion} className="w-full">
                                            Add Question
                                        </Button>
                                    </div>

                                    {newTest.questions.length > 0 && (
                                        <div className="text-sm text-muted-foreground">
                                            {newTest.questions.length} questions added manually.
                                        </div>
                                    )}
                                </div>

                                <DialogFooter>
                                    <Button type="submit">Create & Publish Test</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tests.map((test, index) => (
                        <motion.div
                            key={test.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <Card className="h-full flex flex-col group hover:border-primary/50 transition-colors">
                                <CardHeader>
                                    <div className="flex justify-between items-start mb-2">
                                        <div className={`px-2 py-1 rounded text-xs font-medium ${test.status === "Published" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                                            }`}>
                                            {test.status}
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Edit className="w-4 h-4 mr-2" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">
                                                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <CardTitle className="line-clamp-2">{test.title}</CardTitle>
                                    <p className="text-sm text-muted-foreground">{test.course}</p>
                                </CardHeader>
                                <CardContent className="flex-grow space-y-4">
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4" /> {test.duration}m
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <FileQuestion className="w-4 h-4" /> {test.questions} Qs
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                        <Calendar className="w-4 h-4" /> {test.date}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="w-full">View Results</Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default TeacherTests;
