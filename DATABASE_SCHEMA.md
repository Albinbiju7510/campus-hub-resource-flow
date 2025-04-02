
# CampusHub Database Schema

## Overview
This document outlines the recommended database schema for the CampusHub application. For a production environment, we recommend implementing this schema in a proper database system like PostgreSQL through Supabase.

## Tables

### 1. Users
Stores information about all users of the system.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL, -- Hashed password
  role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'admin', 'principal')),
  department VARCHAR(100),
  year VARCHAR(20),
  points INTEGER DEFAULT 0,
  profile_image TEXT,
  registration_number VARCHAR(50) UNIQUE,
  phone_number VARCHAR(15),
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Activities
Records all point-earning activities by users.

```sql
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  points_earned INTEGER NOT NULL,
  category VARCHAR(50) NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  location VARCHAR(100),
  duration_minutes INTEGER,
  verified_by UUID REFERENCES users(id),
  metadata JSONB -- For storing additional details
);
```

### 3. Notifications
Stores notifications sent to users.

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  sender VARCHAR(100) NOT NULL,
  sender_id UUID REFERENCES users(id),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  type VARCHAR(20) NOT NULL CHECK (type IN ('info', 'alert', 'success', 'message')),
  target_department VARCHAR(100),
  target_year VARCHAR(20),
  is_urgent BOOLEAN DEFAULT FALSE,
  send_email BOOLEAN DEFAULT FALSE,
  metadata JSONB -- For storing additional targeting information
);
```

### 4. User_Notifications
Junction table to associate notifications with their recipients and track read status.

```sql
CREATE TABLE user_notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  notification_id UUID REFERENCES notifications(id) ON DELETE CASCADE,
  read BOOLEAN DEFAULT FALSE,
  delivery_status VARCHAR(20) DEFAULT 'delivered' CHECK (delivery_status IN ('pending', 'delivered', 'failed')),
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, notification_id)
);
```

### 5. Rewards
Defines available rewards that users can redeem with points.

```sql
CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  points_cost INTEGER NOT NULL,
  image_url TEXT,
  available BOOLEAN DEFAULT TRUE,
  original_price VARCHAR(50), -- Indian Rupee amount (₹)
  stock INTEGER DEFAULT 1,
  category VARCHAR(50), -- E.g., 'voucher', 'service', 'merchandise'
  expiry_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 6. Redemptions
Records reward redemptions by users.

```sql
CREATE TABLE redemptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reward_id UUID REFERENCES rewards(id) ON DELETE CASCADE,
  points_spent INTEGER NOT NULL,
  redemption_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'delivered')),
  approved_by UUID REFERENCES users(id),
  approval_date TIMESTAMP WITH TIME ZONE,
  delivery_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  metadata JSONB -- For storing redemption details
);
```

### 7. Resources
Defines campus resources that can be booked or accessed.

```sql
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL,
  location VARCHAR(100),
  capacity INTEGER,
  points_per_use INTEGER DEFAULT 0,
  image_url TEXT,
  available BOOLEAN DEFAULT TRUE,
  maintenance_schedule TEXT,
  operating_hours TEXT,
  rules TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 8. Bookings
Records resource bookings by users.

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  resource_id UUID REFERENCES resources(id) ON DELETE CASCADE,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed', 'cancelled')),
  points_earned INTEGER DEFAULT 0,
  purpose TEXT,
  approval_by UUID REFERENCES users(id),
  approval_time TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 9. Point_Rules
Defines the rules for point allocation across different activities.

```sql
CREATE TABLE point_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category VARCHAR(50) NOT NULL,
  activity_type VARCHAR(100) NOT NULL,
  base_points INTEGER NOT NULL,
  min_points INTEGER,
  max_points INTEGER,
  formula TEXT, -- For complex point calculations
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(category, activity_type)
);
```

### 10. Departments
Stores information about academic departments.

```sql
CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) UNIQUE NOT NULL,
  code VARCHAR(20) UNIQUE,
  head_id UUID REFERENCES users(id),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## RLS Policies (Row Level Security)

### Users Table
```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Admin and Principal can see all users
CREATE POLICY users_admin_view ON users 
  FOR SELECT 
  USING (auth.uid() IN (
    SELECT id FROM users WHERE role IN ('admin', 'principal')
  ));
  
-- Users can see their own data
CREATE POLICY users_self_view ON users 
  FOR SELECT 
  USING (auth.uid() = id);
  
-- Only admins can create new users
CREATE POLICY users_admin_insert ON users 
  FOR INSERT 
  WITH CHECK (auth.uid() IN (
    SELECT id FROM users WHERE role IN ('admin', 'principal')
  ));
  
-- Users can update their own data (except role)
CREATE POLICY users_self_update ON users 
  FOR UPDATE 
  USING (auth.uid() = id)
  WITH CHECK (role = OLD.role); -- Can't change own role
```

### Notifications Table
```sql
-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Admin and Principal can see and create all notifications
CREATE POLICY notifications_admin_view ON notifications 
  FOR SELECT 
  USING (auth.uid() IN (
    SELECT id FROM users WHERE role IN ('admin', 'principal')
  ));
  
CREATE POLICY notifications_admin_insert ON notifications 
  FOR INSERT 
  WITH CHECK (auth.uid() IN (
    SELECT id FROM users WHERE role IN ('admin', 'principal')
  ));
```

### User_Notifications Table
```sql
-- Enable RLS
ALTER TABLE user_notifications ENABLE ROW LEVEL SECURITY;

-- Users can see their own notifications
CREATE POLICY user_notifications_self_view ON user_notifications 
  FOR SELECT 
  USING (auth.uid() = user_id);
  
-- Users can update read status of their own notifications
CREATE POLICY user_notifications_self_update ON user_notifications 
  FOR UPDATE 
  USING (auth.uid() = user_id);
```

## Implementation Steps

1. **Set up Supabase Project**:
   - Create a new Supabase project
   - Configure authentication settings (email/password, magic link, etc.)
   - Set up database tables as defined above
   - Implement Row Level Security (RLS) policies

2. **API Integration**:
   - Create API endpoints for user management
   - Implement notification delivery system
   - Set up points tracking and allocation
   - Create booking and resource management APIs

3. **Authentication and Authorization**:
   - Set up proper role-based access control
   - Implement login/registration flows
   - Secure all API endpoints with appropriate RLS policies

4. **Frontend Integration**:
   - Connect React components to Supabase
   - Implement real-time updates for notifications
   - Create admin dashboards for data management
   - Add profile image upload functionality using Storage

5. **Testing**:
   - Test RLS policies to ensure data security
   - Verify notification delivery
   - Test points allocation and redemption process
   - Validate resource booking workflow

## Sample Queries

### Get User with Total Points
```sql
SELECT id, name, email, role, department, year, points, profile_image
FROM users
WHERE id = 'user_id_here';
```

### Get Recent Notifications for User
```sql
SELECT n.id, n.title, n.body, n.sender, n.timestamp, n.type, un.read
FROM notifications n
JOIN user_notifications un ON n.id = un.notification_id
WHERE un.user_id = 'user_id_here'
ORDER BY n.timestamp DESC
LIMIT 10;
```

### Get User Activity History
```sql
SELECT id, type, description, points_earned, category, timestamp, location, duration_minutes
FROM activities
WHERE user_id = 'user_id_here'
ORDER BY timestamp DESC;
```

### Get Available Rewards
```sql
SELECT id, title, description, points_cost, image_url, original_price, category
FROM rewards
WHERE available = TRUE AND (expiry_date IS NULL OR expiry_date > NOW());
```

### Get Resource Booking Status
```sql
SELECT r.name, b.start_time, b.end_time, b.status, b.points_earned
FROM bookings b
JOIN resources r ON b.resource_id = r.id
WHERE b.user_id = 'user_id_here' AND b.start_time > NOW()
ORDER BY b.start_time;
```

### Check Point Allocation Rules
```sql
SELECT category, activity_type, base_points, min_points, max_points, description 
FROM point_rules
WHERE is_active = TRUE
ORDER BY category, activity_type;
```
