import { useState } from "react";
import { motion } from "framer-motion";
import { Users, MoreVertical, Edit, Trash2, Shield, Search } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const mockUsers = [
    { id: 1, name: "Dr. Teacher", email: "teacher@kdu.edu.ng", role: "teacher", status: "Verified" },
    { id: 2, name: "John Doe", email: "john@student.kdu.edu.ng", role: "student", status: "Verified" },
    { id: 3, name: "Jane Smith", email: "jane@student.kdu.edu.ng", role: "student", status: "Pending" },
    { id: 4, name: "Prof. Anderson", email: "anderson@kdu.edu.ng", role: "teacher", status: "Verified" },
    { id: 5, name: "Mike Johnson", email: "mike@student.kdu.edu.ng", role: "student", status: "Suspended" },
];

const AdminUsers = () => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <DashboardLayout role="admin" userName="Admin User">
            <div className="space-y-8 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-display font-bold">User Management</h1>
                        <p className="text-muted-foreground mt-1">Manage student and teacher accounts</p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search users..."
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>All Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b bg-secondary/10 text-sm">
                                    <div className="col-span-2">Name & Email</div>
                                    <div>Role</div>
                                    <div>Status</div>
                                    <div className="text-right">Actions</div>
                                </div>
                                <div className="divide-y">
                                    {mockUsers.map((user) => (
                                        <div key={user.id} className="grid grid-cols-5 gap-4 p-4 items-center text-sm hover:bg-muted/30 transition-colors">
                                            <div className="col-span-2">
                                                <div className="font-medium">{user.name}</div>
                                                <div className="text-xs text-muted-foreground">{user.email}</div>
                                            </div>
                                            <div>
                                                <Badge variant={user.role === "teacher" ? "default" : "secondary"}>
                                                    {user.role}
                                                </Badge>
                                            </div>
                                            <div>
                                                <Badge variant="outline" className={
                                                    user.status === "Verified" ? "text-green-600 border-green-200 bg-green-50" :
                                                        user.status === "Pending" ? "text-yellow-600 border-yellow-200 bg-yellow-50" :
                                                            "text-red-600 border-red-200 bg-red-50"
                                                }>
                                                    {user.status}
                                                </Badge>
                                            </div>
                                            <div className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreVertical className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            <Edit className="w-4 h-4 mr-2" /> Edit Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Shield className="w-4 h-4 mr-2" /> Change Permissions
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive">
                                                            <Trash2 className="w-4 h-4 mr-2" /> Delete Account
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminUsers;
