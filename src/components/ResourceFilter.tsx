
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface ResourceFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resourceType: string;
  setResourceType: (type: string) => void;
  availability: string;
  setAvailability: (availability: string) => void;
  onReset: () => void;
}

const ResourceFilter: React.FC<ResourceFilterProps> = ({
  searchQuery,
  setSearchQuery,
  resourceType,
  setResourceType,
  availability,
  setAvailability,
  onReset
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4 text-campus-primary">Filter Resources</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-2">
          <div className="relative">
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <Select
            value={resourceType}
            onValueChange={setResourceType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Resource Type" />
            </SelectTrigger>
            <SelectContent className="z-50">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="study">Study Spaces</SelectItem>
              <SelectItem value="lab">Laboratories</SelectItem>
              <SelectItem value="library">Libraries</SelectItem>
              <SelectItem value="computer">Computer Labs</SelectItem>
              <SelectItem value="sports">Sports Facilities</SelectItem>
              <SelectItem value="meeting">Meeting Rooms</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-1">
          <Select
            value={availability}
            onValueChange={setAvailability}
          >
            <SelectTrigger>
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent className="z-50">
              <SelectItem value="all">Any Availability</SelectItem>
              <SelectItem value="high">High (>70%)</SelectItem>
              <SelectItem value="medium">Medium (30-70%)</SelectItem>
              <SelectItem value="low">Low (<30%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button
          variant="outline" 
          onClick={onReset}
          className="mr-2"
        >
          Reset
        </Button>
        <Button>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default ResourceFilter;
