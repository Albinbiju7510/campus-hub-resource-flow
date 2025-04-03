
export interface PointTransaction {
  id: string;
  description: string;
  points: number;
  category: 'facility' | 'event' | 'academic' | 'library' | 'store' | 'attendance';
  date: string;
  details?: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  image: string;
  available: boolean;
  originalPrice: string;
}

export interface AllocationCategory {
  category: string;
  allocations: {
    activity: string;
    points: string;
  }[];
}

// Points Transactions History
export const initialTransactions: PointTransaction[] = [
  {
    id: 'pt1',
    description: 'Participated in Coding Workshop',
    points: 50,
    category: 'event',
    date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    details: 'Participated in the full-day coding workshop organized by the Department of Computer Science'
  },
  {
    id: 'pt2',
    description: 'Used Library Resources',
    points: 15,
    category: 'facility',
    date: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    details: 'Used the Main Library study room for 3 hours'
  },
  {
    id: 'pt3',
    description: 'Attended Guest Lecture',
    points: 30,
    category: 'academic',
    date: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 days ago
    details: 'Attended the industry expert guest lecture on Modern Engineering Practices'
  }
];

// Campus Store Rewards
export const rewards: Reward[] = [
  {
    id: 'r1',
    title: 'College T-Shirt',
    description: 'Official college logo t-shirt, available in multiple sizes',
    pointsCost: 150,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    available: true,
    originalPrice: '₹600'
  },
  {
    id: 'r2',
    title: 'Cafeteria Meal Voucher',
    description: 'Free meal voucher for the campus cafeteria',
    pointsCost: 80,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    available: true,
    originalPrice: '₹200'
  },
  {
    id: 'r3',
    title: '10% Discount on Textbooks',
    description: 'Get 10% off on textbooks at the campus bookstore',
    pointsCost: 100,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    available: true,
    originalPrice: 'Up to ₹500 savings'
  },
  {
    id: 'r4',
    title: 'College Hoodie',
    description: 'Premium college hoodie with embroidered logo',
    pointsCost: 300,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    available: true,
    originalPrice: '₹1,200'
  },
  {
    id: 'r5',
    title: 'Free Printing Credit',
    description: '100 pages of free printing at the campus library',
    pointsCost: 50,
    image: 'https://images.unsplash.com/photo-1585241936939-be4099591252?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    available: true,
    originalPrice: '₹200'
  },
  {
    id: 'r6',
    title: 'Exam Preparation Package',
    description: 'Study materials, test papers, and a coffee voucher',
    pointsCost: 200,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    available: false,
    originalPrice: '₹750'
  }
];

// Point Allocation Rules
export const pointsAllocationRules: AllocationCategory[] = [
  {
    category: 'Campus Facilities',
    allocations: [
      { activity: 'Library Usage (per hour)', points: '5 points' },
      { activity: 'Study Room Booking', points: '10 points' },
      { activity: 'Computer Lab Usage (per hour)', points: '15 points' },
      { activity: 'Science Lab Usage (per session)', points: '20 points' },
      { activity: 'Sports Facility Usage (per hour)', points: '25 points' },
      { activity: 'Conference Room Booking', points: '10 points' },
      { activity: 'Multimedia Studio Usage (per hour)', points: '20 points' }
    ]
  },
  {
    category: 'Academic Activities',
    allocations: [
      { activity: 'Class Attendance (90% or above per month)', points: '50 points' },
      { activity: 'Assignment Submission (before deadline)', points: '10 points' },
      { activity: 'Quiz Participation', points: '15 points' },
      { activity: 'Research Paper Publication', points: '200 points' },
      { activity: 'Academic Competition Participation', points: '50 points' },
      { activity: 'Academic Competition Winner', points: '150 points' },
      { activity: 'Guest Lecture Attendance', points: '30 points' },
      { activity: 'Mentor Junior Students (per month)', points: '100 points' }
    ]
  },
  {
    category: 'Campus Events',
    allocations: [
      { activity: 'Workshop Participation', points: '50 points' },
      { activity: 'Cultural Event Participation', points: '40 points' },
      { activity: 'Sports Event Participation', points: '40 points' },
      { activity: 'Club Meeting Attendance', points: '20 points' },
      { activity: 'Event Organization Committee', points: '100 points' },
      { activity: 'Campus Cleanup Drive', points: '75 points' },
      { activity: 'Blood Donation Camp', points: '100 points' },
      { activity: 'Tree Plantation Drive', points: '60 points' }
    ]
  },
  {
    category: 'Community Service',
    allocations: [
      { activity: 'Volunteer Work (per hour)', points: '20 points' },
      { activity: 'Community Outreach Program', points: '75 points' },
      { activity: 'Teaching Underprivileged Children (per session)', points: '50 points' },
      { activity: 'Organizing Charity Events', points: '150 points' },
      { activity: 'Environmental Awareness Campaign', points: '100 points' },
      { activity: 'Social Media Management for College', points: '30 points/week' }
    ]
  },
  {
    category: 'Point Redemptions',
    allocations: [
      { activity: 'Purchase College Merchandise', points: 'Varies by item' },
      { activity: 'Cafeteria Meal Voucher', points: '80 points' },
      { activity: 'Free Printing Credit (100 pages)', points: '50 points' },
      { activity: 'Textbook Discount (10%)', points: '100 points' },
      { activity: 'Library Late Fee Waiver', points: '50 points' },
      { activity: 'Priority Registration for Events', points: '75 points' },
      { activity: 'Campus Parking Pass (1 month)', points: '200 points' }
    ]
  }
];
