
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  MessageSquare, 
  Settings,
  GraduationCap,
  Calendar,
  BarChart3,
  Menu,
  X,
  UserCheck
} from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Users, label: "Students", path: "/admin/students" },
    { icon: BookOpen, label: "Teachers", path: "/admin/teachers" },
    { icon: Calendar, label: "Classes", path: "/admin/classes" },
    { icon: UserCheck, label: "Parents", path: "/admin/parents" },
    { icon: BarChart3, label: "Reports", path: "/admin/reports" },
    { icon: MessageSquare, label: "Alerts", path: "/admin/alerts" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  const handleMenuClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white shadow-md"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm z-40 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">EduManage</h2>
              <p className="text-sm text-gray-500">Admin Dashboard</p>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 h-11 ${
                    isActive 
                      ? "bg-green-600 text-white shadow-md hover:bg-green-700" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => handleMenuClick(item.path)}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* Removed logout button since auth is removed */}
        </div>
      </div>
    </>
  );
};

export { Sidebar };
