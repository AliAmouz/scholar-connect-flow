
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";
import { useAlerts } from "@/hooks/useAlerts";
import { formatDistanceToNow } from "date-fns";

const RecentAlerts = () => {
  const { data: alerts = [], isLoading } = useAlerts();

  // Get the most recent 3 alerts
  const recentAlerts = alerts.slice(0, 3);

  if (isLoading) {
    return (
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Recent Alerts
          </CardTitle>
          <CardDescription>Latest notifications sent to parents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-4">Loading alerts...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Recent Alerts
        </CardTitle>
        <CardDescription>Latest notifications sent to parents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAlerts.length === 0 ? (
            <div className="text-center p-4 text-gray-500">
              No alerts found
            </div>
          ) : (
            recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {alert.students ? 
                      `${alert.students.first_name[0]}${alert.students.last_name[0]}` : 
                      '?'
                    }
                  </div>
                  <div>
                    <p className="font-medium">
                      {alert.students ? 
                        `${alert.students.first_name} ${alert.students.last_name}` : 
                        'Unknown Student'
                      }
                    </p>
                    <p className="text-sm text-gray-600">{alert.title}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={
                    alert.alert_type === "absence" ? "destructive" : 
                    alert.priority === "high" || alert.priority === "urgent" ? "destructive" : 
                    "secondary"
                  }>
                    {alert.alert_type}
                  </Badge>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(alert.created_at), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        <Button className="w-full mt-4" variant="outline">
          View All Alerts
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecentAlerts;
