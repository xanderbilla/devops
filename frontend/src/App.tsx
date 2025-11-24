import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AllCoursesPage from "./pages/AllCoursesPage";
import InstructorsPage from "./pages/InstructorsPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import VideoPlayerPage from "./pages/VideoPlayerPage";
import MyProgressPage from "./pages/MyProgressPage";
import PaymentPage from "./pages/PaymentPage";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ScrollToTopButton from './components/ScrollToTopButton';
import { AuthProvider } from "./context/AuthContext.tsx";
import { AuthUIProvider } from "./context/AuthUIContext.tsx";
import { EnrollmentProvider } from "./context/EnrollmentContext.tsx";
import { Toaster } from 'react-hot-toast';

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
function App() {
    return (
        <AuthProvider>
            <AuthUIProvider>
                <EnrollmentProvider>
                    <Router>
                    <Toaster 
                        position="top-right"
                        toastOptions={{
                            duration: 3000,
                            style: {
                                background: '#363636',
                                color: '#fff',
                            },
                            success: {
                                duration: 3000,
                                iconTheme: {
                                    primary: '#10b981',
                                    secondary: '#fff',
                                },
                            },
                            error: {
                                duration: 4000,
                                iconTheme: {
                                    primary: '#ef4444',
                                    secondary: '#fff',
                                },
                            },
                        }}
                    />
                    <ScrollToTop />
                    <div className="min-h-screen bg-gray-50 flex flex-col">
                        {/* Hide Navbar on video-player & payment pages */}
                        <NavbarWrapper />

                        <main className="flex-grow">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/courses" element={<AllCoursesPage />} />
                                <Route path="/instructors" element={<InstructorsPage />} />
                                <Route path="/course/:id" element={<CourseDetailPage />} />
                                <Route path="/video/:id" element={<VideoPlayerPage />} />
                                <Route path="/my-courses" element={<MyProgressPage />} />
                                <Route path="/payment/:id" element={<PaymentPage />} />
                            </Routes>
                        </main>

                        <FooterWrapper />
                        <ScrollToTopButton />
                    </div>
                </Router>
            </EnrollmentProvider>
        </AuthUIProvider>
        </AuthProvider>
    );
}

/* Navbar hidden on selected pages */
function NavbarWrapper() {
    const hideOn = ["/video", "/payment"];
    const current = window.location.pathname;
    if (hideOn.some(p => current.startsWith(p))) return null;
    return <Navbar />;
}

/* Footer hidden on selected pages */
function FooterWrapper() {
    const hideOn = ["/video", "/payment"];
    const current = window.location.pathname;
    if (hideOn.some(p => current.startsWith(p))) return null;
    return <Footer />;
}

export default App;
