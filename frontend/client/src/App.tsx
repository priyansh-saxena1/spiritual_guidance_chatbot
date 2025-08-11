import { Router, Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";

// Pages
import Index from "@/pages/Index";
import { Login } from "@/pages/auth/Login";
import { Signup } from "@/pages/auth/Signup";
import { Dashboard } from "@/pages/app/Dashboard";
import { Satsang } from "@/pages/app/satsang/Satsang";
import { Japa } from "@/pages/app/japa/Japa";
import { Dhyana } from "@/pages/app/dhyana/Dhyana";
import Chat from "@/pages/app/chat/Chat";
import { Progress } from "@/pages/app/progress/Progress";
import { Accountability } from "@/pages/app/accountability/Accountability";
import Community from "@/pages/app/community/Community";
import NotFound from "@/pages/NotFound";

// Context and Components
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Switch>
            {/* Public routes */}
            <Route path="/" component={Index} />
            <Route path="/auth/login" component={Login} />
            <Route path="/auth/signup" component={Signup} />
            
            {/* Protected routes */}
            <Route path="/app/dashboard">
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </Route>
            
            <Route path="/app/chat">
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            </Route>
            
            {/* Satsang routes */}
            <Route path="/app/satsang" component={() => <ProtectedRoute><Satsang /></ProtectedRoute>} />
            <Route path="/app/satsang/*">
              <ProtectedRoute>
                <Satsang />
              </ProtectedRoute>
            </Route>
            
            {/* Japa routes */}
            <Route path="/app/japa" component={() => <ProtectedRoute><Japa /></ProtectedRoute>} />
            <Route path="/app/japa/*">
              <ProtectedRoute>
                <Japa />
              </ProtectedRoute>
            </Route>
            
            {/* Dhyana routes */}
            <Route path="/app/dhyana" component={() => <ProtectedRoute><Dhyana /></ProtectedRoute>} />
            <Route path="/app/dhyana/*">
              <ProtectedRoute>
                <Dhyana />
              </ProtectedRoute>
            </Route>
            
            {/* Progress */}
            <Route path="/app/progress">
              <ProtectedRoute>
                <Progress />
              </ProtectedRoute>
            </Route>
            
            {/* Accountability routes */}
            <Route path="/app/accountability" component={() => <ProtectedRoute><Accountability /></ProtectedRoute>} />
            <Route path="/app/accountability/*">
              <ProtectedRoute>
                <Accountability />
              </ProtectedRoute>
            </Route>
            
            {/* Community */}
            <Route path="/app/community">
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            </Route>
            
            {/* Profile */}
            <Route path="/app/profile">
              <ProtectedRoute>
                <div className="min-h-screen bg-gradient-subtle lotus-bg p-6">
                  <div className="container mx-auto max-w-4xl">
                    <h1 className="text-3xl font-bold text-sacred-maroon mb-6">Profile</h1>
                    <p>Profile page coming soon...</p>
                  </div>
                </div>
              </ProtectedRoute>
            </Route>
            
            {/* 404 fallback */}
            <Route component={NotFound} />
          </Switch>
        </Router>
        
        {/* Global components */}
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
