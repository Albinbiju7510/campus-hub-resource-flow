
import React, { useState } from 'react';
import { StoreProduct } from '@/data/storeData';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import PointAnimation from '@/components/PointAnimation';

interface StoreProductListProps {
  products: StoreProduct[];
}

export const StoreProductList: React.FC<StoreProductListProps> = ({ products }) => {
  const { user, updatePoints } = useAuth();
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<StoreProduct | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showPointAnimation, setShowPointAnimation] = useState(false);
  const [spentPoints, setSpentPoints] = useState(0);
  
  const handlePurchase = (product: StoreProduct) => {
    setSelectedProduct(product);
    setShowConfirmDialog(true);
  };
  
  const confirmPurchase = () => {
    if (!selectedProduct || !user) return;
    
    if (user.points >= selectedProduct.pointsCost) {
      // Close dialog first
      setShowConfirmDialog(false);
      
      // Update points (negative amount = points spent)
      updatePoints(-selectedProduct.pointsCost, 'store', `Purchased ${selectedProduct.name}`);
      
      // Show animation for spent points
      setSpentPoints(selectedProduct.pointsCost);
      setShowPointAnimation(true);
      
      // Show success toast
      toast({
        title: "Purchase Successful!",
        description: `You've spent ${selectedProduct.pointsCost} points to purchase ${selectedProduct.name}. Please collect your item from the campus store.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Insufficient Points",
        description: `You need ${selectedProduct.pointsCost - (user.points || 0)} more points to purchase this item.`,
      });
    }
  };
  
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-500">No products match your search criteria</h3>
      </div>
    );
  }
  
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-md transition-shadow duration-300">
            <div className="h-48 w-full overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>{product.name}</span>
                <span className="text-sm font-normal bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {product.category}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-gray-700 mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-campus-primary">{product.pointsCost} points</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500">Value: ₹{product.originalPrice}</span>
                )}
              </div>
              {product.discount && (
                <div className="mt-1">
                  <span className="text-sm text-green-600 font-medium">
                    {product.discount}% discount with points
                  </span>
                </div>
              )}
              {product.stock && (
                <div className="mt-1">
                  <span className={`text-sm ${product.stock < 10 ? 'text-red-600' : 'text-gray-600'}`}>
                    {product.stock} in stock
                  </span>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handlePurchase(product)}
                disabled={user?.points < product.pointsCost || product.stock === 0}
                className="w-full"
              >
                {product.stock === 0 
                  ? 'Out of Stock' 
                  : user?.points < product.pointsCost 
                    ? `Need ${product.pointsCost - (user?.points || 0)} more points` 
                    : 'Redeem Now'
                }
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
            <DialogDescription>
              Are you sure you want to spend {selectedProduct?.pointsCost} points to purchase {selectedProduct?.name}?
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <div className="flex items-center justify-between mb-2">
              <span>Your current balance:</span>
              <span className="font-semibold">{user?.points || 0} points</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span>Cost of purchase:</span>
              <span className="font-semibold text-red-500">-{selectedProduct?.pointsCost || 0} points</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t">
              <span>Balance after purchase:</span>
              <span className="font-semibold">{(user?.points || 0) - (selectedProduct?.pointsCost || 0)} points</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
            <Button onClick={confirmPurchase}>Confirm Purchase</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {showPointAnimation && (
        <PointAnimation 
          points={-spentPoints} 
          text={`${spentPoints} Points Spent!`}
          onComplete={() => setShowPointAnimation(false)} 
        />
      )}
    </>
  );
};
