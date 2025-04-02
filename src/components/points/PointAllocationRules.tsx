
import React from 'react';

interface AllocationRule {
  activity: string;
  points: string;
}

interface AllocationCategory {
  category: string;
  allocations: AllocationRule[];
}

interface PointAllocationRulesProps {
  allocationRules: AllocationCategory[];
}

const PointAllocationRules: React.FC<PointAllocationRulesProps> = ({ allocationRules }) => {
  return (
    <div className="space-y-6">
      {allocationRules.map((category, idx) => (
        <div key={idx}>
          <h3 className="text-lg font-semibold mb-3 text-campus-primary">{category.category}</h3>
          <div className="bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Points Awarded</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {category.allocations.map((allocation, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{allocation.activity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-campus-primary">{allocation.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export { PointAllocationRules, type AllocationCategory };
