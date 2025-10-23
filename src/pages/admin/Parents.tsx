import { useState } from 'react';
import { Sidebar } from '@/pages/components/Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, User } from 'lucide-react';
import { useParents } from '@/hooks/useParents';
import { ParentStats } from '@/components/parents/ParentStats';
import { ParentCard } from '@/components/parents/ParentCard';

const Parents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { parents, isLoading, getChildrenForParent, stats } = useParents();

  const filteredParents = parents.filter(parent =>
    parent.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
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
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Parent Management</h1>
            <p className="text-muted-foreground mt-2">Manage parent information, their children, and payment details</p>
          </div>

          <ParentStats 
            totalParents={stats.totalParents}
            parentsWithChildren={stats.parentsWithChildren}
            totalChildren={stats.totalChildren}
          />

          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search parents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-6">
            {filteredParents.map((parent) => (
              <ParentCard
                key={parent.id}
                parent={parent}
                children={getChildrenForParent(parent.id)}
              />
            ))}
          </div>

          {filteredParents.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <User className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No parents found</p>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Parents;