import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const submissions = [
    { id: 1, student: "Alice Johnson", avatar: "AJ", assignment: "AI Ethics Essay", course: "CSC 401", submitted: "2h ago", status: "Pending", grade: "" },
    { id: 2, student: "Bob Smith", avatar: "BS", assignment: "Binary Search Impl", course: "CSC 201", submitted: "1d ago", status: "Pending", grade: "" },
    { id: 3, student: "Charlie Brown", avatar: "CB", assignment: "Project Proposal", course: "CSC 305", submitted: "1d ago", status: "Graded", grade: "92/100" },
    { id: 4, student: "Diana Prince", avatar: "DP", assignment: "AI Ethics Essay", course: "CSC 401", submitted: "2d ago", status: "Graded", grade: "88/100" },
];

const TeacherGrading = () => {
    const handleGrade = (id: number) => {
        toast.success("Grade saved successfully");
    };

    return (
        <DashboardLayout role="teacher" userName="Dr. Teacher">
            <div className="space-y-8 max-w-7xl mx-auto">
                <div>
                    <h1 className="text-3xl font-display font-bold">Grading & Assignments</h1>
                    <p className="text-muted-foreground mt-1">Review and grade student submissions</p>
                </div>

                <Tabs defaultValue="pending" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="pending" className="gap-2">
                            <Clock className="w-4 h-4" /> Pending Review
                            <Badge variant="secondary" className="ml-1">2</Badge>
                        </TabsTrigger>
                        <TabsTrigger value="graded" className="gap-2">
                            <CheckCircle2 className="w-4 h-4" /> Graded
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="pending">
                        <div className="grid gap-4">
                            {submissions.filter(s => s.status === "Pending").map((submission) => (
                                <Card key={submission.id}>
                                    <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarFallback className="bg-primary/10 text-primary">{submission.avatar}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-semibold text-lg">{submission.student}</h3>
                                                <p className="text-muted-foreground">{submission.assignment} • {submission.course}</p>
                                                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                                    <Clock className="w-3.5 h-3.5" /> Submitted {submission.submitted}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 w-full sm:w-auto">
                                            <div className="flex items-center gap-2">
                                                <Input className="w-20" placeholder="/100" />
                                                <Button onClick={() => handleGrade(submission.id)}>Submit Grade</Button>
                                            </div>
                                            <Button variant="outline">View Work</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="graded">
                        <div className="grid gap-4">
                            {submissions.filter(s => s.status === "Graded").map((submission) => (
                                <Card key={submission.id} className="opacity-80 hover:opacity-100 transition-opacity">
                                    <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarFallback>{submission.avatar}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-medium text-lg">{submission.student}</h3>
                                                <p className="text-muted-foreground">{submission.assignment} • {submission.course}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <span className="block text-2xl font-bold text-primary">{submission.grade}</span>
                                                <span className="text-xs text-muted-foreground">Final Score</span>
                                            </div>
                                            <Button variant="outline" size="sm">Edit</Button>
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

export default TeacherGrading;
