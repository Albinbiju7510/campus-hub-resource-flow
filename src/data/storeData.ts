
export interface StoreProduct {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  originalPrice?: number;
  image: string;
  category: string;
  discount?: number;
  stock: number;
}

export const storeProducts: StoreProduct[] = [
  {
    id: "prod1",
    name: "College Hoodie",
    description: "Premium quality college hoodie with embroidered logo",
    pointsCost: 500,
    originalPrice: 1200,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "Apparel",
    discount: 25,
    stock: 15
  },
  {
    id: "prod2",
    name: "Wireless Earbuds",
    description: "College branded wireless earbuds with noise cancellation",
    pointsCost: 750,
    originalPrice: 2000,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "Electronics",
    discount: 20,
    stock: 8
  },
  {
    id: "prod3",
    name: "Campus Notebook Set",
    description: "Set of 3 premium notebooks with college branding",
    pointsCost: 150,
    originalPrice: 350,
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "Stationery",
    discount: 15,
    stock: 30
  },
  {
    id: "prod4",
    name: "Insulated Water Bottle",
    description: "24oz stainless steel insulated water bottle with college logo",
    pointsCost: 300,
    originalPrice: 800,
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "Accessories",
    discount: 15,
    stock: 20
  },
  {
    id: "prod5",
    name: "College Backpack",
    description: "Durable backpack with laptop compartment and college branding",
    pointsCost: 600,
    originalPrice: 1500,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "Accessories",
    discount: 20,
    stock: 12
  },
  {
    id: "prod6",
    name: "Cafeteria Meal Voucher",
    description: "Voucher for a free meal at the campus cafeteria",
    pointsCost: 100,
    originalPrice: 250,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "Food",
    discount: 30,
    stock: 50
  },
  {
    id: "prod7",
    name: "College T-Shirt",
    description: "Cotton college t-shirt with printed logo",
    pointsCost: 250,
    originalPrice: 600,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "Apparel",
    discount: 20,
    stock: 25
  },
  {
    id: "prod8",
    name: "Wireless Charger",
    description: "10W fast wireless charger with college logo",
    pointsCost: 400,
    originalPrice: 1000,
    image: "https://images.unsplash.com/photo-1583863788508-8d254571d755?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "Electronics",
    discount: 15,
    stock: 10
  },
  {
    id: "prod9",
    name: "Academic Workshop Ticket",
    description: "Free entry to upcoming academic workshops on campus",
    pointsCost: 200,
    originalPrice: 500,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "Events",
    discount: 40,
    stock: 15
  }
];
