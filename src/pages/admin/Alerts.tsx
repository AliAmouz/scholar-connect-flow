
import { Sidebar } from "../components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, Info, CheckCircle, Clock } from "lucide-react";
import { useAlerts } from "@/hooks/useAlerts";

const Alerts = () => {
  const { data: alerts = [], isLoading, error } = useAlerts();

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "behavior":
      case "academic":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "late":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "general":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "absence":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "behavior":
      case "academic":
        return "border-l-red-500";
      case "late":
        return "border-l-yellow-500";
      case "general":
        return "border-l-blue-500";
      case "absence":
        return "border-l-green-500";
      default:
        return "border-l-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "destructive";
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "secondary";
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-64 p-8">
          <div className="text-center">Loading alerts...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-64 p-8">
          <div className="text-center text-red-600">Error loading alerts: {error.message}</div>
        </div>
      </div>
    );
  }

  const unreadCount = alerts.filter(alert => !alert.read).length;
  const urgentCount = alerts.filter(alert => alert.priority === 'urgent' || alert.priority === 'high').length;

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
            <Badge variant="destructive">{urgentCount} Urgent</Badge>
            <Badge variant="secondary">{unreadCount} Unread</Badge>
          </div>
          <Button variant="outline">
            Mark All as Read
          </Button>
        </div>

        {alerts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-500">
                <h3 className="text-lg font-medium mb-2">No alerts found</h3>
                <p>All caught up! No new notifications at this time.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <Card 
                key={alert.id} 
                className={`border-l-4 ${getAlertColor(alert.alert_type)} ${
                  !alert.read ? 'bg-white shadow-md' : 'bg-gray-50'
                } hover:shadow-lg transition-shadow`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      {getAlertIcon(alert.alert_type)}
                      <div className="flex-1">
                        <h3 className={`font-semibold ${!alert.read ? 'text-gray-900' : 'text-gray-600'}`}>
                          {alert.title}
                        </h3>
                        <p className="text-gray-600 mt-1">{alert.message}</p>
                        <p className="text-sm text-gray-400 mt-2">
                          {new Date(alert.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {alert.priority && (
                        <Badge variant={getPriorityColor(alert.priority)}>
                          {alert.priority.toUpperCase()}
                        </Badge>
                      )}
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
        )}

        {alerts.length > 0 && (
          <div className="mt-8 text-center">
            <Button variant="outline">
              Load More Alerts
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;
