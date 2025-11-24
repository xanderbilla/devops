import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-8 h-8" />
              <span className="text-2xl font-bold">CertCook</span>
            </div>
            <p className="text-blue-100">
              Empowering professionals with world-class certification courses in Healthcare and IT.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  All Courses
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  Instructors
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  My Progress
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  Healthcare Courses
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  IT Certifications
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  CNA Training
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  AWS Courses
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  Medical Coding
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span className="text-blue-100">
                  123 Education Street<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-blue-100 hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:info@certcook.com" className="text-blue-100 hover:text-white transition-colors">
                  info@certcook.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-500 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-blue-100 text-sm">
              © {new Date().getFullYear()} CertCook. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
