
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import ResourceCard from '@/components/ResourceCard';
import ResourceFilter from '@/components/ResourceFilter';
import resources from '@/data/resources';

const Resources = () => {
  const [searchParams] = useSearchParams();
  const typeFromUrl = searchParams.get('type') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [resourceType, setResourceType] = useState(typeFromUrl);
  const [availability, setAvailability] = useState('all');
  const [filteredResources, setFilteredResources] = useState(resources);

  // Filter resources based on the current filters
  useEffect(() => {
    let filtered = [...resources];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.location.toLowerCase().includes(query)
      );
    }

    // Filter by resource type
    if (resourceType && resourceType !== 'all') {
      filtered = filtered.filter(resource => 
        resource.type.toLowerCase() === resourceType.toLowerCase()
      );
    }

    // Filter by availability
    if (availability !== 'all') {
      if (availability === 'high') {
        filtered = filtered.filter(resource => resource.availability > 70);
      } else if (availability === 'medium') {
        filtered = filtered.filter(resource => 
          resource.availability >= 30 && resource.availability <= 70
        );
      } else if (availability === 'low') {
        filtered = filtered.filter(resource => resource.availability < 30);
      }
    }

    setFilteredResources(filtered);
  }, [searchQuery, resourceType, availability]);

  // Reset all filters
  const handleReset = () => {
    setSearchQuery('');
    setResourceType('all');
    setAvailability('all');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-campus-primary mb-4">Campus Resources</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Browse and book all available campus resources including study spaces, labs, libraries, and more.
          </p>
        </div>

        <ResourceFilter 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          resourceType={resourceType}
          setResourceType={setResourceType}
          availability={availability}
          setAvailability={setAvailability}
          onReset={handleReset}
        />

        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map(resource => (
              <ResourceCard 
                key={resource.id}
                id={resource.id}
                title={resource.title}
                description={resource.description}
                image={resource.image}
                type={resource.type}
                availability={resource.availability}
                location={resource.location}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No resources found</h3>
            <p className="text-gray-600">
              Try adjusting your filters or search criteria.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Resources;
