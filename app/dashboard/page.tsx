"use client";

import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Dashboard
          </h1>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Welcome back!</CardTitle>
              <CardDescription>
                You&apos;re successfully logged in to Schofoni
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Email: {user?.email}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                User ID: {user?.id}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Get started with these common tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="default">
                Create New Project
              </Button>
              <Button className="w-full" variant="outline">
                View Documentation
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
              <CardDescription>
                Your account information and status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Status</span>
                  <span className="text-sm text-green-600">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Email Verified</span>
                  <span className="text-sm text-green-600">Yes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Last Sign In</span>
                  <span className="text-sm text-zinc-600">
                    {new Date(user?.last_sign_in_at || "").toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
