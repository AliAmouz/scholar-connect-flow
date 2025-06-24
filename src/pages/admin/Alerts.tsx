
import { Sidebar } from "../components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, Info, CheckCircle, Clock } from "lucide-react";

const Alerts = () => {
  const alerts = [
    {
      id: 1,
      type: "urgent",
      title: "Low Attendance Alert",
      message: "John Smith's attendance has dropped below 75% this month",
      timestamp: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "info",
      title: "New Assignment Submitted",
      message: "25 students have submitted their Mathematics homework",
      timestamp: "4 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "success",
      title: "Grade Reports Generated",
      message: "Monthly grade reports are ready for review",
      timestamp: "1 day ago",
      read: true,
    },
    {
      id: 4,
      type: "warning",
      title: "System Maintenance",
      message: "Scheduled maintenance window this weekend",
      timestamp: "2 days ago",
      read: true,
    },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "border-l-red-500";
      case "warning":
        return "border-l-yellow-500";
      case "info":
        return "border-l-blue-500";
      case "success":
        return "border-l-green-500";
      default:
        return "border-l-gray-500";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Alerts & Notifications</h1>
          <p className="text-gray-600">Stay updated with important school activities</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <Badge variant="destructive">3 Urgent</Badge>
            <Badge variant="secondary">2 Unread</Badge>
          </div>
          <Button variant="outline">
            Mark All as Read
          </Button>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card 
              key={alert.id} 
              className={`border-l-4 ${getAlertColor(alert.type)} ${
                !alert.read ? 'bg-white shadow-md' : 'bg-gray-50'
              } hover:shadow-lg transition-shadow`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <h3 className={`font-semibold ${!alert.read ? 'text-gray-900' : 'text-gray-600'}`}>
                        {alert.title}
                      </h3>
                      <p className="text-gray-600 mt-1">{alert.message}</p>
                      <p className="text-sm text-gray-400 mt-2">{alert.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!alert.read && (
                      <Badge variant="default" className="bg-blue-100 text-blue-800">
                        New
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm">
                      Dismiss
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline">
            Load More Alerts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
