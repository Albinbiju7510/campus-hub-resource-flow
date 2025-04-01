
export interface Resource {
  id: string;
  title: string;
  description: string;
  image: string;
  type: string;
  availability: number;
  location: string;
  details: {
    capacity: number;
    hours: string;
    amenities: string[];
    rules: string[];
  };
}

const resources: Resource[] = [
  {
    id: "r1",
    title: "Main Library Study Room",
    description: "Quiet study space with large tables and comfortable seating for individual or group study sessions.",
    image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3",
    type: "study",
    availability: 75,
    location: "Main Library, Floor 3",
    details: {
      capacity: 50,
      hours: "7:00 AM - 11:00 PM",
      amenities: ["WiFi", "Power outlets", "Natural lighting", "Quiet zone", "Whiteboard"],
      rules: ["No food or drinks", "Silence must be maintained", "No reservation required", "2-hour limit during peak hours"]
    }
  },
  {
    id: "r2",
    title: "Engineering Computer Lab",
    description: "Advanced computer lab with specialized software for engineering projects and assignments.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    type: "computer",
    availability: 45,
    location: "Engineering Building, Room 205",
    details: {
      capacity: 30,
      hours: "8:00 AM - 10:00 PM",
      amenities: ["High-performance computers", "CAD software", "3D printing", "Technical assistance", "Dual monitors"],
      rules: ["Student ID required", "No food or drinks", "Engineering students have priority", "Save work frequently"]
    }
  },
  {
    id: "r3",
    title: "Science Laboratory",
    description: "Fully equipped laboratory for conducting scientific experiments and research.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074",
    type: "lab",
    availability: 60,
    location: "Science Building, Floor 2",
    details: {
      capacity: 25,
      hours: "9:00 AM - 6:00 PM",
      amenities: ["Lab equipment", "Safety gear", "Chemical supplies", "Fume hoods", "Emergency shower"],
      rules: ["Lab coat required", "Safety goggles mandatory", "Instructor supervision required", "No unauthorized experiments"]
    }
  },
  {
    id: "r4",
    title: "Conference Room A",
    description: "Professional meeting room with presentation equipment for group discussions and meetings.",
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4",
    type: "meeting",
    availability: 20,
    location: "Administration Building, Room 101",
    details: {
      capacity: 20,
      hours: "8:00 AM - 8:00 PM",
      amenities: ["Projector", "Video conferencing", "Whiteboard", "Coffee service", "Climate control"],
      rules: ["Reservation required", "Keep area clean", "Report technical issues", "Maximum 2-hour booking"]
    }
  },
  {
    id: "r5",
    title: "Indoor Basketball Court",
    description: "Full-size indoor basketball court for recreational play and organized sports events.",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
    type: "sports",
    availability: 10,
    location: "Sports Complex, East Wing",
    details: {
      capacity: 30,
      hours: "6:00 AM - 10:00 PM",
      amenities: ["Locker rooms", "Water fountains", "Scoreboard", "Spectator seating", "Equipment rental"],
      rules: ["Athletic shoes required", "Student ID needed", "No food on court", "Share court during busy hours"]
    }
  },
  {
    id: "r6",
    title: "Multimedia Production Studio",
    description: "Professional-grade audio and video recording studio for content creation.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
    type: "lab",
    availability: 80,
    location: "Media Arts Building, Basement",
    details: {
      capacity: 10,
      hours: "10:00 AM - 8:00 PM",
      amenities: ["Recording equipment", "Editing software", "Sound isolation", "Green screen", "Lighting kit"],
      rules: ["Training required before first use", "Reservation mandatory", "No food or drinks", "Equipment checkout process"]
    }
  },
  {
    id: "r7",
    title: "Quiet Study Lounge",
    description: "Comfortable lounge area designated for silent individual study and reflection.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6",
    type: "study",
    availability: 35,
    location: "Student Center, Floor 4",
    details: {
      capacity: 40,
      hours: "24/7 Access",
      amenities: ["Comfortable seating", "Natural lighting", "WiFi", "Individual desks", "Charging stations"],
      rules: ["Absolute silence required", "No phone calls", "No group work", "No food", "Clean up after yourself"]
    }
  },
  {
    id: "r8",
    title: "Collaborative Workspace",
    description: "Open concept workspace designed for group projects and collaborative learning.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    type: "study",
    availability: 55,
    location: "Innovation Center, Main Floor",
    details: {
      capacity: 60,
      hours: "7:00 AM - 11:00 PM",
      amenities: ["Movable furniture", "Writable walls", "Large displays", "Video conferencing", "Printing station"],
      rules: ["Respectful noise level", "Share space with others", "Clean up after use", "No sleeping"]
    }
  }
];

export default resources;
