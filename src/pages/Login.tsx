import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Lock, Mail, ArrowRight, Users } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [role, setRole] = useState<"student" | "teacher" | "admin">(
        (location.state as any)?.role || "student"
    );
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock login delay
        setTimeout(() => {
            if (email && password) {
                // Mock successful login
                localStorage.setItem("userRole", role);
                localStorage.setItem("userName", "Test User"); // In a real app this would come from API
                toast.success(`Welcome back, ${role}!`);

                // Redirect to original destination or dashboard
                const from = location.state?.from?.pathname || `/${role}`;
                navigate(from, { replace: true });
            } else {
                toast.error("Please enter both email and password");
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left side - Form */}
            <div className="flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground mb-4 shadow-lg shadow-primary/30">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <h1 className="text-3xl font-display font-bold">Welcome back</h1>
                        <p className="text-muted-foreground">Sign in to your academic portal</p>
                    </div>

                    <Tabs value={role} onValueChange={(v) => setRole(v as any)} className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-8">
                            <TabsTrigger value="student">Student</TabsTrigger>
                            <TabsTrigger value="teacher">Teacher</TabsTrigger>
                            <TabsTrigger value="admin">Admin</TabsTrigger>
                        </TabsList>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        className="pl-9"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link
                                        to="#"
                                        className="text-sm font-medium text-primary hover:underline"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            toast.info("Forgot password feature coming soon!");
                                        }}
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        className="pl-9"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Signing in..." : (
                                    <>
                                        Sign in <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </Tabs>

                    <div className="text-center text-sm">
                        <span className="text-muted-foreground">Don't have an account? </span>
                        <Link to="/signup" className="font-medium text-primary hover:underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right side - Visual */}
            <div className="hidden lg:flex flex-col justify-between bg-primary/5 p-12 relative overflow-hidden">
                {/* Abstract shapes */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

                <div className="relative z-10">
                    <h2 className="text-3xl font-display font-bold mb-4">Nacos Nexus</h2>
                    <p className="text-lg text-muted-foreground max-w-md">
                        Your all-in-one platform for academic excellence. Connect, learn, and grow with a community of motivated scholars.
                    </p>
                </div>

                <div className="relative z-10 grid gap-4">
                    <Card className="bg-background/50 backdrop-blur-sm border-primary/10">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                                <GraduationCap className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-medium">Student Success</p>
                                <p className="text-sm text-muted-foreground">Access resources anytime</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-background/50 backdrop-blur-sm border-primary/10 translate-x-8">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                                <Users className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-medium">Community Driven</p>
                                <p className="text-sm text-muted-foreground">Connect with peers</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Login;
