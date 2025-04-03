
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { StoreProductList } from '@/components/store/StoreProductList';
import { storeProducts } from '@/data/storeData';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Store = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  // Extract unique categories from products
  const categories = ['All', ...Array.from(new Set(storeProducts.map(product => product.category)))];
  
  // Filter products based on search term and category
  const filteredProducts = storeProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === null || categoryFilter === 'All' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-campus-primary mb-4">Campus Store</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Redeem your earned points for exclusive campus merchandise and discounted products!
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-campus-primary text-white p-3 rounded-full">
                <Badge className="text-xl p-1 bg-transparent hover:bg-transparent">
                  {user?.points || 0}
                </Badge>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Your Points Balance</h3>
                <p className="text-sm text-gray-600">
                  Use your points to purchase items from our store
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 w-full md:w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <Badge
                key={category}
                className={`cursor-pointer text-sm py-1 px-3 ${
                  (categoryFilter === category || (category === 'All' && categoryFilter === null))
                    ? 'bg-campus-primary hover:bg-campus-primary/90'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setCategoryFilter(category === 'All' ? null : category)}
              >
                {category}
              </Badge>
            ))}
          </div>
          
          <StoreProductList products={filteredProducts} />
        </div>
      </div>
    </Layout>
  );
};

export default Store;
