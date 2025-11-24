import { GraduationCap, LogIn, UserPlus, X, Menu, User, LogOut, Search } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LoginModel from './LoginModel';
import SignupModel from './SignupModel';
import { useAuthUI } from '../context/AuthUIContext';

export default function Navbar() {

    const { showLogin, setShowLogin, showSignup, setShowSignup } = useAuthUI();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [searchText, setSearchText] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const currentPage = location.pathname;

    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;

    const navItems = [
        { id: '/', label: 'Home' },
        { id: '/courses', label: 'All Courses' },
        { id: '/instructors', label: 'Instructors' },
    ];

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    const handleMobileNavigate = (path: string) => {
        navigate(path);
        setMobileMenuOpen(false);
    };

    return (
        <>
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        {/* Logo */}
                        <div
                            className="flex items-center space-x-2 cursor-pointer"
                            onClick={() => navigate('/')}
                        >
                            <GraduationCap className="w-8 h-8 text-blue-600" />
                            <span className="text-2xl font-bold text-blue-600">CertCook</span>
                        </div>

                        {/* Desktop Search */}
                        <div className="hidden md:flex items-center ml-6 w-[350px] relative">
                            <input
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                type="text"
                                placeholder="What do you want to learn?"
                                className="w-full py-2.5 pl-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                            />

                            <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 p-2.5 rounded-full text-white">
                                <Search className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.id}
                                    to={item.id}
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                                        currentPage === item.id
                                            ? 'text-blue-600 bg-blue-50'
                                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}

                            {isLoggedIn && (
                                <Link
                                    to="/my-courses"
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                                        currentPage === '/my-courses'
                                            ? 'text-blue-600 bg-blue-50'
                                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                    }`}
                                >
                                    My Courses
                                </Link>
                            )}
                        </div>

                        {/* Desktop Right Side */}
                        <div className="hidden md:flex items-center space-x-4">
                            {!isLoggedIn ? (
                                <>
                                    <button
                                        onClick={() => setShowLogin(true)}
                                        className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        <LogIn className="w-5 h-5" />
                                        <span>Login</span>
                                    </button>

                                    <button
                                        onClick={() => setShowSignup(true)}
                                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 font-medium shadow-md"
                                    >
                                        <UserPlus className="w-5 h-5" />
                                        <span>Sign Up</span>
                                    </button>
                                </>
                            ) : (
                                <div className="relative">
                                    <button
                                        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                        className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        <User className="w-5 h-5" />
                                        <span>Profile</span>
                                    </button>

                                    {profileMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200">
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                                            >
                                                My Profile
                                            </Link>

                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                            >
                                                <LogOut className="w-4 h-4 inline mr-2" />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Mobile Button */}
                        <div className="flex md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="text-gray-700 hover:text-blue-600 p-2"
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden border-t border-gray-200 pb-4">
                            <div className="flex flex-col space-y-2 pt-4">

                                {/* Mobile Search */}
                                <div className="px-4 mb-3">
                                    <div className="relative w-full">
                                        <input
                                            value={searchText}
                                            onChange={(e) => setSearchText(e.target.value)}
                                            type="text"
                                            placeholder="What do you want to learn?"
                                            className="w-full py-2.5 pl-4 pr-12 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 p-2.5 rounded-full text-white">
                                            <Search className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleMobileNavigate(item.id)}
                                        className={`px-4 py-3 text-left rounded-md text-base font-medium ${
                                            currentPage === item.id
                                                ? 'text-blue-600 bg-blue-50'
                                                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}

                                {isLoggedIn && (
                                    <Link
                                        to="/my-courses"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                                    >
                                        My Courses
                                    </Link>
                                )}

                                <div className="border-t border-gray-300 my-2" />

                                {!isLoggedIn ? (
                                    <>
                                        <button
                                            onClick={() => {
                                                setShowLogin(true);
                                                setMobileMenuOpen(false);
                                            }}
                                            className="px-3 py-3 text-blue-600 text-left"
                                        >
                                            Login
                                        </button>

                                        <button
                                            onClick={() => {
                                                setShowSignup(true);
                                                setMobileMenuOpen(false);
                                            }}
                                            className="px-3 py-3 bg-blue-600 text-white rounded-md"
                                        >
                                            Sign Up
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={handleLogout}
                                        className="px-3 py-3 text-red-600 text-left"
                                    >
                                        Logout
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* GLOBAL MODALS */}
            {showLogin && (
                <LoginModel
                    isOpen={showLogin}
                    onClose={() => setShowLogin(false)}
                    onSwitchToSignup={() => {
                        setShowLogin(false);
                        setShowSignup(true);
                    }}
                />
            )}

            {showSignup && (
                <SignupModel
                    isOpen={showSignup}
                    onClose={() => setShowSignup(false)}
                    onSwitchToLogin={() => {
                        setShowSignup(false);
                        setShowLogin(true);
                    }}
                />
            )}
        </>
    );
}
