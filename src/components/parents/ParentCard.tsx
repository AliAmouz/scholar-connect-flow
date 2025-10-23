import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, AlertCircle } from 'lucide-react';
import type { Parent, Student } from '@/hooks/useParents';

interface ParentCardProps {
  parent: Parent;
  children: Student[];
}

export const ParentCard = ({ parent, children }: ParentCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{parent.full_name || 'Unknown Name'}</CardTitle>
            <CardDescription>{parent.email}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={children.length > 0 ? "default" : "secondary"}>
              {children.length} {children.length === 1 ? 'Child' : 'Children'}
            </Badge>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {children.length > 0 && (
        <CardContent>
          <Tabs defaultValue="children" className="w-full">
            <TabsList>
              <TabsTrigger value="children">Children</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="communications">Communications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="children" className="mt-4">
              <div className="space-y-3">
                {children.map((child) => (
                  <div key={child.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{child.first_name} {child.last_name}</p>
                      <p className="text-sm text-muted-foreground">Grade {child.grade_level}</p>
                    </div>
                    <Badge variant={child.status === 'active' ? 'default' : 'secondary'}>
                      {child.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="payments" className="mt-4">
              <div className="text-center py-8 text-muted-foreground">
                <DollarSign className="mx-auto h-12 w-12 mb-4" />
                <p>Payment management coming soon</p>
                <p className="text-sm">This will show tuition payments, fees, and billing history</p>
              </div>
            </TabsContent>
            
            <TabsContent value="communications" className="mt-4">
              <div className="text-center py-8 text-muted-foreground">
                <AlertCircle className="mx-auto h-12 w-12 mb-4" />
                <p>Communication history coming soon</p>
                <p className="text-sm">This will show alerts, messages, and communication log</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      )}
    </Card>
  );
};
