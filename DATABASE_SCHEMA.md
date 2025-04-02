
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
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  type VARCHAR(20) NOT NULL CHECK (type IN ('info', 'alert', 'success', 'message')),
  target_department VARCHAR(100),
  target_year VARCHAR(20),
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
  original_price VARCHAR(50),
  stock INTEGER DEFAULT 1,
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
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Implementation Steps

1. **Set up Supabase Project**:
   - Create a new Supabase project
   - Configure authentication settings
   - Set up database tables as defined above

2. **API Integration**:
   - Create API endpoints for user management
   - Implement notification delivery system
   - Set up points tracking and allocation
   - Create booking and resource management APIs

3. **Security**:
   - Implement Row Level Security (RLS) policies
   - Set up proper authentication and authorization
   - Secure all API endpoints

4. **Frontend Integration**:
   - Connect React components to Supabase
   - Implement real-time updates for notifications
   - Create admin dashboards for data management

## Sample Queries

### Get User with Total Points
```sql
SELECT id, name, email, role, department, year, points
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
SELECT id, type, description, points_earned, category, timestamp
FROM activities
WHERE user_id = 'user_id_here'
ORDER BY timestamp DESC;
```

### Get Available Rewards
```sql
SELECT id, title, description, points_cost, image_url, original_price
FROM rewards
WHERE available = TRUE;
```
