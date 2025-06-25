
import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, AlertTriangle, TrendingUp } from "lucide-react";
import { useStudents } from "@/hooks/useStudents";
import { useTeachers } from "@/hooks/useTeachers";
import { useClasses } from "@/hooks/useClasses";
import { useAlerts } from "@/hooks/useAlerts";

const StatsCards = () => {
  const { data: students = [] } = useStudents();
  const { data: teachers = [] } = useTeachers();
  const { data: classes = [] } = useClasses();
  const { data: alerts = [] } = useAlerts();

  // Calculate today's absences (for demo, we'll use unread alerts of type absence)
  const todayAbsences = alerts.filter(alert => 
    alert.alert_type === 'absence' && 
    new Date(alert.created_at).toDateString() === new Date().toDateString()
  ).length;

  // Calculate average grade (mock for now since we don't have grades in the sample data)
  const averageGrade = 8.2;

  const stats = [
    {
      title: "Total Students",
      value: students.length,
      icon: Users,
      bgColor: "from-blue-500 to-blue-600",
      textColor: "text-blue-100",
      iconColor: "text-blue-200"
    },
    {
      title: "Teachers",
      value: teachers.length,
      icon: BookOpen,
      bgColor: "from-green-500 to-green-600",
      textColor: "text-green-100",
      iconColor: "text-green-200"
    },
    {
      title: "Absences Today",
      value: todayAbsences,
      icon: AlertTriangle,
      bgColor: "from-orange-500 to-orange-600",
      textColor: "text-orange-100",
      iconColor: "text-orange-200"
    },
    {
      title: "Avg. Grade",
      value: averageGrade,
      icon: TrendingUp,
      bgColor: "from-purple-500 to-purple-600",
      textColor: "text-purple-100",
      iconColor: "text-purple-200"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className={`bg-gradient-to-br ${stat.bgColor} text-white border-0`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${stat.textColor} text-sm font-medium`}>{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.iconColor}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;
