
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/toaster';

// Pages
import Index from './pages/Index';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import Resources from './pages/Resources';
import ResourceDetail from './pages/ResourceDetail';
import Booking from './pages/Booking';
import Notifications from './pages/Notifications';
import Points from './pages/Points';
import Account from './pages/Account';
import Store from './pages/Store';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminMessaging from './pages/AdminMessaging';
import AdminPoints from './pages/AdminPoints';
import NotFound from './pages/NotFound';
import Terms from './pages/Terms';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:id" element={<ResourceDetail />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/points" element={<Points />} />
          <Route path="/account" element={<Account />} />
          <Route path="/store" element={<Store />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/messaging" element={<AdminMessaging />} />
          <Route path="/admin/points" element={<AdminPoints />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
