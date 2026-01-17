import { useState } from "react";
import { Timer, FileQuestion, CheckCircle2, AlertCircle, ChevronRight, PlayCircle } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

// Mock Data
const tests = [
    {
        id: 1,
        title: "Mid-Term Examination",
        course: "CSC 202: Data Structures",
        duration: "90 mins",
        questions: 50,
        startTime: "Today, 2:00 PM",
        status: "Upcoming",
        type: "Exam"
    },
    {
        id: 2,
        title: "Weekly Quiz 4",
        course: "CSC 305: Database Systems",
        duration: "30 mins",
        questions: 20,
        startTime: "Available Now",
        status: "Active",
        type: "Quiz"
    },
    {
        id: 3,
        title: "Lab Assessment 2",
        course: "CSC 301: Software Engineering",
        duration: "45 mins",
        questions: 15,
        startTime: "Tomorrow, 10:00 AM",
        status: "Upcoming",
        type: "Assessment"
    }
];

const history = [
    {
        id: 101,
        title: "Quiz 3: Normalization",
        course: "CSC 305",
        score: 85,
        total: 100,
        date: "Jan 12, 2026",
        status: "Passed"
    },
    {
        id: 102,
        title: "Algorithm Complexity Test",
        course: "CSC 202",
        score: 92,
        total: 100,
        date: "Jan 10, 2026",
        status: "Passed"
    }
];

const StudentTest = () => {
    const [activeTest, setActiveTest] = useState<any>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});

    // Mock questions for the active test
    const mockQuestions = [
        {
            id: 1,
            question: "Which of the following sorting algorithms has the best average-case time complexity?",
            options: ["Bubble Sort", "Quick Sort", "Insertion Sort", "Selection Sort"]
        },
        {
            id: 2,
            question: "What is the time complexity of searching in a balanced Binary Search Tree (BST)?",
            options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"]
        },
        {
            id: 3,
            question: "In a min-heap, where is the smallest element located?",
            options: ["At the root", "At the last leaf", "It depends on the insertion order", "In the middle"]
        },
        {
            id: 4,
            question: "Which data structure is primarily used to implement recursion?",
            options: ["Queue", "Stack", "Linked List", "Tree"]
        },
        {
            id: 5,
            question: "What is the worst-case time complexity of Merge Sort?",
            options: ["O(n^2)", "O(n)", "O(n log n)", "O(log n)"]
        }
    ];

    const handleStartTest = (test: any) => {
        toast.success(`Starting ${test.title}... Good luck!`);
        setActiveTest(test);
        setCurrentQuestion(0);
        setAnswers({});
    };

    const handleAnswer = (optionIndex: number) => {
        setAnswers({ ...answers, [currentQuestion]: optionIndex });
    };

    const handleNext = () => {
        if (currentQuestion < mockQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = () => {
        toast.success("Test submitted successfully! results will be published soon.");
        setActiveTest(null);
        setAnswers({});
        setCurrentQuestion(0);
    };

    if (activeTest) {
        return (
            <DashboardLayout role="student" userName="John Doe">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-display font-bold">{activeTest.title}</h1>
                            <p className="text-muted-foreground">{activeTest.course}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-mono font-medium">
                                <Timer className="w-4 h-4" />
                                59:42
                            </div>
                            <Button variant="outline" onClick={() => setActiveTest(null)}>Exit Test</Button>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Question {currentQuestion + 1} of {mockQuestions.length}</span>
                            <Progress value={((currentQuestion + 1) / mockQuestions.length) * 100} className="w-48 h-2" />
                        </div>

                        <Card className="min-h-[400px] flex flex-col">
                            <CardContent className="p-8 flex-1 flex flex-col">
                                <h2 className="text-xl font-medium mb-8">
                                    {mockQuestions[currentQuestion].question}
                                </h2>

                                <div className="space-y-4 flex-1">
                                    {mockQuestions[currentQuestion].options.map((option, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleAnswer(index)}
                                            className={`p-4 rounded-lg border cursor-pointer transition-all ${answers[currentQuestion] === index
                                                    ? "border-primary bg-primary/5 shadow-[0_0_15px_hsl(var(--primary)/0.1)]"
                                                    : "border-border hover:bg-secondary/50"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${answers[currentQuestion] === index
                                                        ? "border-primary bg-primary text-primary-foreground"
                                                        : "border-muted-foreground"
                                                    }`}>
                                                    {answers[currentQuestion] === index && <CheckCircle2 className="w-3 h-3" />}
                                                </div>
                                                <span className={answers[currentQuestion] === index ? "font-medium text-primary" : ""}>
                                                    {option}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between mt-8 pt-8 border-t border-border">
                                    <Button
                                        variant="outline"
                                        onClick={handlePrev}
                                        disabled={currentQuestion === 0}
                                    >
                                        Previous
                                    </Button>

                                    {currentQuestion === mockQuestions.length - 1 ? (
                                        <Button onClick={handleSubmit} className="gap-2">
                                            Submit Test <CheckCircle2 className="w-4 h-4" />
                                        </Button>
                                    ) : (
                                        <Button onClick={handleNext} className="gap-2">
                                            Next Question <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout role="student" userName="John Doe">
            <div className="max-w-5xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-display font-bold">Tests & Quizzes</h1>
                    <p className="text-muted-foreground">View and take your scheduled assessments</p>
                </div>

                <Tabs defaultValue="available" className="w-full">
                    <TabsList className="grid w-full md:w-[400px] grid-cols-2 mb-8">
                        <TabsTrigger value="available">Available Tests</TabsTrigger>
                        <TabsTrigger value="history">History & Results</TabsTrigger>
                    </TabsList>

                    <TabsContent value="available" className="space-y-4">
                        {tests.map((test) => (
                            <Card key={test.id} className="group hover:border-primary/50 transition-colors">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Badge variant={test.status === "Active" ? "default" : "secondary"} className={test.status === "Active" ? "bg-primary text-primary-foreground" : ""}>
                                                    {test.status}
                                                </Badge>
                                                <Badge variant="outline">{test.type}</Badge>
                                            </div>
                                            <h3 className="text-xl font-semibold">{test.title}</h3>
                                            <p className="text-muted-foreground font-medium">{test.course}</p>
                                            <div className="flex items-center gap-6 text-sm text-muted-foreground pt-1">
                                                <div className="flex items-center gap-1.5">
                                                    <Timer className="w-4 h-4" />
                                                    {test.duration}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <FileQuestion className="w-4 h-4" />
                                                    {test.questions} Questions
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div className="text-sm font-medium mb-4">
                                                Starts: <span className="text-foreground">{test.startTime}</span>
                                            </div>
                                            <Button
                                                size="lg"
                                                disabled={test.status !== "Active"}
                                                className="w-full md:w-auto gap-2"
                                                onClick={() => handleStartTest(test)}
                                            >
                                                {test.status === "Active" ? (
                                                    <>Start Test <PlayCircle className="w-4 h-4" /></>
                                                ) : (
                                                    <>View Details <ChevronRight className="w-4 h-4" /></>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </TabsContent>

                    <TabsContent value="history" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            {history.map((item) => (
                                <Card key={item.id}>
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <Badge variant="outline" className="mb-2">{item.course}</Badge>
                                                <h3 className="font-semibold">{item.title}</h3>
                                                <p className="text-xs text-muted-foreground">{item.date}</p>
                                            </div>
                                            <Badge variant="secondary" className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
                                                {item.status}
                                            </Badge>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Score</span>
                                                <span className="font-bold">{item.score}/{item.total}</span>
                                            </div>
                                            <Progress value={(item.score / item.total) * 100} className="h-2" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
};

export default StudentTest;
