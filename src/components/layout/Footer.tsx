import React from 'react';
import { AlertTriangle, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8 border-t">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-roadapp-purple" />
              Disclaimer
            </h3>
            <p className="text-sm text-gray-600">
              This system is for road anomaly detection only and may not detect all types of damage.
              Results should be verified by professionals before taking action.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-roadapp-purple">Home</Link>
              </li>

              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-roadapp-purple">About</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-roadapp-purple">Contact</Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-gray-600 hover:text-roadapp-purple">Login</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-roadapp-purple" />
              Contact Information
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2 text-roadapp-purple" />
                <a href="mailto:aryansharmaji1305@gmail.com" className="hover:text-roadapp-purple">
                  aryansharmaji1305@gmail.com
                </a>
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2 text-roadapp-purple" />
                <a href="tel:+918939489526" className="hover:text-roadapp-purple">
                  +91 89394 89526
                </a>
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-roadapp-purple" />
                <span>Chennai, India</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Road Anomaly Detection. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
