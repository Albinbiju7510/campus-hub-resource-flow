
import { PointTransaction } from '@/components/points/PointsHistory';
import { Reward } from '@/components/points/RewardsList';
import { AllocationCategory } from '@/components/points/PointAllocationRules';

export const initialTransactions: PointTransaction[] = [
  {
    id: 'pt1',
    description: 'Attended Campus Cleanup Event',
    points: 50,
    category: 'event',
    date: '2023-04-22T11:20:00',
    details: 'Participated in the annual campus cleanup event, helping to collect waste and beautify the campus grounds for 4 hours.'
  },
  {
    id: 'pt2',
    description: 'Used Study Room for 2 hours',
    points: 10,
    category: 'facility',
    date: '2023-04-20T15:30:00',
    details: 'Utilized the premium study room in the Main Library building from 3:30 PM to 5:30 PM.'
  },
  {
    id: 'pt3',
    description: 'Borrowed 3 Books from Library',
    points: 15,
    category: 'library',
    date: '2023-04-18T10:45:00',
    details: 'Borrowed the following books: "Data Structures", "Algorithms Design", and "Computer Networks" for academic purposes.'
  },
  {
    id: 'pt4',
    description: 'Purchase at Campus Store',
    points: 25,
    category: 'store',
    date: '2023-04-15T14:20:00',
    details: 'Made a purchase of ₹500 at the campus store, including stationery and college merchandise.'
  },
  {
    id: 'pt5',
    description: 'Attended Tech Workshop',
    points: 35,
    category: 'event',
    date: '2023-04-10T09:00:00',
    details: 'Participated in the "Emerging Technologies in Software Development" workshop conducted by the CSE department.'
  },
  {
    id: 'pt6',
    description: 'Perfect Attendance - April',
    points: 30,
    category: 'attendance',
    date: '2023-04-30T23:59:00',
    details: 'Maintained 100% attendance in all classes for the month of April.'
  },
  {
    id: 'pt7',
    description: 'Academic Achievement - Quiz Winner',
    points: 40,
    category: 'academic',
    date: '2023-04-12T14:30:00',
    details: 'Secured first place in the departmental technical quiz competition.'
  }
];

export const rewards: Reward[] = [
  {
    id: 'r1',
    title: 'Campus Store Voucher',
    description: '₹500 off your next purchase at the campus store',
    pointsCost: 100,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da',
    available: true,
    originalPrice: '₹500'
  },
  {
    id: 'r2',
    title: 'Cafeteria Meal Pass',
    description: 'Free meals for a week at the campus café',
    pointsCost: 150,
    image: 'https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6',
    available: true,
    originalPrice: '₹700'
  },
  {
    id: 'r3',
    title: 'Premium Study Room Access',
    description: 'Exclusive access to premium study rooms for a month',
    pointsCost: 200,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6',
    available: true,
    originalPrice: '₹1,000'
  },
  {
    id: 'r4',
    title: 'Campus Merchandise',
    description: 'Limited edition campus hoodie with college logo',
    pointsCost: 250,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633',
    available: false,
    originalPrice: '₹1,200'
  },
  {
    id: 'r5',
    title: 'Library Late Fee Waiver',
    description: 'Get your library late fees waived off (up to ₹300)',
    pointsCost: 75,
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66',
    available: true,
    originalPrice: '₹300'
  },
  {
    id: 'r6',
    title: 'Exam Preparation Package',
    description: 'Study materials, notes, and mock tests for upcoming exams',
    pointsCost: 180,
    image: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc',
    available: true,
    originalPrice: '₹850'
  }
];

export const pointsAllocationRules: AllocationCategory[] = [
  {
    category: 'Academic Achievement',
    allocations: [
      { activity: 'Top rank in semester exams', points: '50-100 pts' },
      { activity: 'Quiz or competition winner', points: '20-50 pts' },
      { activity: 'Research paper publication', points: '100 pts' },
      { activity: 'Academic project completion', points: '30-60 pts' }
    ]
  },
  {
    category: 'Attendance',
    allocations: [
      { activity: '100% monthly attendance', points: '30 pts' },
      { activity: '90-99% monthly attendance', points: '20 pts' },
      { activity: 'No late arrivals in a month', points: '15 pts' }
    ]
  },
  {
    category: 'Campus Facilities Usage',
    allocations: [
      { activity: 'Library visit', points: '5 pts/visit' },
      { activity: 'Study room booking', points: '5 pts/hour' },
      { activity: 'Computer lab usage', points: '5 pts/hour' },
      { activity: 'Sports facility usage', points: '10 pts/session' }
    ]
  },
  {
    category: 'Events & Activities',
    allocations: [
      { activity: 'Organizing campus event', points: '50-100 pts' },
      { activity: 'Event participation', points: '20-30 pts' },
      { activity: 'Volunteering', points: '20-50 pts' },
      { activity: 'Workshop/seminar attendance', points: '15-30 pts' }
    ]
  },
  {
    category: 'Campus Contribution',
    allocations: [
      { activity: 'Campus cleanup participation', points: '25-50 pts' },
      { activity: 'Donation to campus initiatives', points: '10 pts/₹200' },
      { activity: 'Feedback submission', points: '10 pts' },
      { activity: 'Peer tutoring', points: '15 pts/hour' }
    ]
  }
];
