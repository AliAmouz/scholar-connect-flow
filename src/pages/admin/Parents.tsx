import { useState } from 'react';
import { Sidebar } from '@/pages/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, User, DollarSign, Calendar, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Parent {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  grade_level: number;
  status: string;
  parent_id: string;
}

const Parents = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all parents
  const { data: parents = [], isLoading: parentsLoading } = useQuery({
    queryKey: ['parents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'parent')
        .order('full_name', { ascending: true });
      
      if (error) throw error;
      return data as Parent[];
    },
  });

  // Fetch all students with parent relationships
  const { data: students = [], isLoading: studentsLoading } = useQuery({
    queryKey: ['students-with-parents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .not('parent_id', 'is', null)
        .order('first_name', { ascending: true });
      
      if (error) throw error;
      return data as Student[];
    },
  });

  // Filter parents based on search term
  const filteredParents = parents.filter(parent =>
    parent.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get children for a specific parent
  const getChildrenForParent = (parentId: string) => {
    return students.filter(student => student.parent_id === parentId);
  };

  // Calculate stats
  const totalParents = parents.length;
  const parentsWithChildren = parents.filter(parent => 
    students.some(student => student.parent_id === parent.id)
  ).length;
  const totalChildren = students.length;

  if (parentsLoading || studentsLoading) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-lg">Loading parents...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Parent Management</h1>
            <p className="text-gray-600 mt-2">Manage parent information, their children, and payment details</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Parents</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalParents}</div>
                <p className="text-xs text-muted-foreground">Registered parent accounts</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Families</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{parentsWithChildren}</div>
                <p className="text-xs text-muted-foreground">Parents with enrolled children</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Children</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalChildren}</div>
                <p className="text-xs text-muted-foreground">Children enrolled under parents</p>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search parents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Parents List */}
          <div className="space-y-6">
            {filteredParents.map((parent) => {
              const children = getChildrenForParent(parent.id);
              
              return (
                <Card key={parent.id}>
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
                              <div key={child.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                  <p className="font-medium">{child.first_name} {child.last_name}</p>
                                  <p className="text-sm text-gray-600">Grade {child.grade_level}</p>
                                </div>
                                <Badge variant={child.status === 'active' ? 'default' : 'secondary'}>
                                  {child.status}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="payments" className="mt-4">
                          <div className="text-center py-8 text-gray-500">
                            <DollarSign className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <p>Payment management coming soon</p>
                            <p className="text-sm">This will show tuition payments, fees, and billing history</p>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="communications" className="mt-4">
                          <div className="text-center py-8 text-gray-500">
                            <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <p>Communication history coming soon</p>
                            <p className="text-sm">This will show alerts, messages, and communication log</p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>

          {filteredParents.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-900">No parents found</p>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Parents;