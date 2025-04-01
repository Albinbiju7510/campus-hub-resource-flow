
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ResourceCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  type: string;
  availability: number;
  location: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  id,
  title,
  description,
  image,
  type,
  availability,
  location
}) => {
  // Helper function to determine availability color
  const getAvailabilityColor = (availability: number) => {
    if (availability > 70) return 'bg-green-500';
    if (availability > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="campus-card h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge 
          className="absolute top-3 right-3 capitalize"
          variant="secondary"
        >
          {type}
        </Badge>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-campus-primary">{title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full mr-2 ${getAvailabilityColor(availability)}`}></div>
            <span className="text-sm text-gray-700">{availability}% Available</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">Open Now</span>
          </div>
        </div>
        <div className="text-sm text-gray-600 mb-4">
          <span className="font-medium">Location:</span> {location}
        </div>
        <div className="mt-auto flex justify-between">
          <Link 
            to={`/resources/${id}`}
            className="text-campus-primary hover:text-campus-secondary font-medium text-sm"
          >
            View Details
          </Link>
          <Link 
            to={`/booking?resource=${id}`}
            className="campus-button-primary text-sm"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
