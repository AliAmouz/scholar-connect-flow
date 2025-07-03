
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherPanel from "./pages/TeacherPanel";
import ParentDashboard from "./pages/ParentDashboard";
import StudentProfile from "./pages/StudentProfile";
import Students from "./pages/admin/Students";
import Teachers from "./pages/admin/Teachers";
import Classes from "./pages/admin/Classes";
import Reports from "./pages/admin/Reports";
import Alerts from "./pages/admin/Alerts";
import Settings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public authentication route */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Default route redirects to auth - users will be auto-redirected based on role after login */}
            <Route path="/" element={<Navigate to="/auth" replace />} />
            
            {/* Protected admin routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/students" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Students />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/teachers" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Teachers />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/classes" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Classes />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/reports" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Reports />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/alerts" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Alerts />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/settings" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Settings />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected teacher route */}
            <Route 
              path="/teacher" 
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherPanel />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected parent routes */}
            <Route 
              path="/parent" 
              element={
                <ProtectedRoute allowedRoles={['parent']}>
                  <ParentDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Student profile route - accessible by parents and admins */}
            <Route 
              path="/student/:id" 
              element={
                <ProtectedRoute allowedRoles={['parent', 'admin']}>
                  <StudentProfile />
                </ProtectedRoute>
              } 
            />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
