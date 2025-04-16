
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navigation, AlertTriangle, Info, Mail, User, Home } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Navigation className="h-6 w-6 text-roadapp-purple" />
          <Link to="/" className="text-lg font-bold">
            Road Anomaly Detection
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`flex items-center gap-1 text-sm font-medium ${isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link 
            to="/about" 
            className={`flex items-center gap-1 text-sm font-medium ${isActive('/about') ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
          >
            <Info className="w-4 h-4" />
            About
          </Link>
          <Link 
            to="/contact" 
            className={`flex items-center gap-1 text-sm font-medium ${isActive('/contact') ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
          >
            <Mail className="w-4 h-4" />
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1">
              <User className="w-4 h-4" />
              Login
            </Button>
          </Link>
          <Link to="/admin">
            <Button variant="default" size="sm" className="bg-roadapp-purple hover:bg-roadapp-dark-purple">
              Admin Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
