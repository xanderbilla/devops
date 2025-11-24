import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Star, Clock, Users, Award, BookOpen, Play, ArrowLeft } from 'lucide-react';
import type { Course } from '../types';
import { useAuthUI } from '../context/AuthUIContext';
import { useEnrollment } from '../context/EnrollmentContext';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

export default function CourseDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { setShowLogin } = useAuthUI();
    const { isEnrolled } = useEnrollment();

    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    
    const isAlreadyEnrolled = id ? isEnrolled(id) : false;

    const modules = [
        {
            title: 'Introduction and Fundamentals',
            lessons: [
                { title: 'Course Overview', duration: '10:25' },
                { title: 'Getting Started', duration: '15:30' },
                { title: 'Core Concepts', duration: '22:45' },
            ],
        },
        {
            title: 'Advanced Topics',
            lessons: [
                { title: 'Deep Dive into Key Areas', duration: '35:20' },
                { title: 'Best Practices', duration: '28:15' },
                { title: 'Real-world Applications', duration: '42:30' },
            ],
        },
        {
            title: 'Exam Preparation',
            lessons: [
                { title: 'Exam Strategy', duration: '18:40' },
                { title: 'Practice Questions', duration: '45:00' },
                { title: 'Final Review', duration: '30:25' },
            ],
        },
    ];



    useEffect(() => {
        if (!id) return;
        async function fetchCourse() {
            try {
                const response = await axios.get<Course>(API_ENDPOINTS.courses.byId(id!));
                setCourse(response.data);
            } catch (err) {
                console.error('Error fetching course:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchCourse();
    }, [id]);

    const handlePaymentClick = (courseId: string) => {
        if (!token) {
            // alert('Please login to continue');
            setShowLogin(true);
            return;
        }
        navigate(`/payment/${courseId}`);
    };

    if (loading) return <div className="text-center py-12">Loading...</div>;
    if (!course) return <div className="text-center py-12">Course not found</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Back button */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <button
                        onClick={() => navigate('/courses')}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to All Courses</span>
                    </button>
                </div>
            </div>

            {/* Course header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">

                            <div className="mb-4">
                                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    {course.category?.name}
                                </span>
                            </div>

                            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                            <p className="text-xl text-blue-100 mb-6">{course.description}</p>

                            <div className="flex flex-wrap gap-6 mb-6">
                                <div className="flex items-center space-x-2">
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                    <span className="font-semibold">{course.rating}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Users className="w-5 h-5" />
                                    <span>{(course.students_enrolled || 0).toLocaleString()} students</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Clock className="w-5 h-5" />
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Award className="w-5 h-5" />
                                    <span>{course.level}</span>
                                </div>
                            </div>

                            {course.instructor && (
                                <div className="flex items-center space-x-4 bg-blue-700 bg-opacity-50 rounded-lg p-4">
                                    <img
                                        src={course.instructor.image_url}
                                        alt={course.instructor.name}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-sm text-blue-100">Instructor</p>
                                        <p className="text-xl font-semibold">{course.instructor.name}</p>
                                        <p className="text-sm text-blue-100">{course.instructor.expertise}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="md:col-span-1">
                            <div className="bg-white text-gray-900 rounded-lg shadow-xl overflow-hidden sticky top-24">
                                <div className="aspect-video bg-gray-900 relative group cursor-pointer">
                                    <img
                                        src={course.thumbnail_url}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all">
                                        <Play className="w-16 h-16 text-white" />
                                    </div>
                                </div>

                                <div className="p-6 text-center">

                                    {/* ⭐ CONDITION BASED BUTTONS ⭐ */}

                                    {isAlreadyEnrolled ? (
                                        <button
                                            onClick={() => navigate(`/video/${course.id}`)}
                                            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 mb-3"
                                        >
                                            Resume Learning
                                        </button>
                                    ) : token ? (
                                        <button
                                            onClick={() => handlePaymentClick(course.id)}
                                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 mb-3"
                                        >
                                            Enroll Now
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setShowLogin(true)}
                                            className="w-full bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 mb-3"
                                        >
                                            Login to Enroll
                                        </button>
                                    )}

                                    <button
                                        onClick={() => navigate(`/video/${course.id}`)}
                                        className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                                    >
                                        Preview Course
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">

                        {/* What you'll learn */}
                        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
                            <ul className="space-y-3">
                                <li className="flex items-start space-x-3">
                                    <div className="bg-blue-100 rounded-full p-1 mt-1">
                                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Master all key concepts and fundamentals</span>
                                </li>
                            </ul>
                        </div>

                        {/* Course modules */}
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
                            <div className="space-y-4">
                                {modules.map((module, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg">
                                        <div className="bg-gray-50 p-4 flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <BookOpen className="w-5 h-5 text-blue-600" />
                                                <h3 className="font-semibold text-gray-900">{module.title}</h3>
                                            </div>
                                            <span className="text-sm text-gray-600">{module.lessons.length} lessons</span>
                                        </div>

                                        <div className="p-4 space-y-2">
                                            {module.lessons.map((lesson, lessonIndex) => (
                                                <div
                                                    key={lessonIndex}
                                                    className="flex items-center justify-between py-2 hover:bg-gray-50 px-2 rounded cursor-pointer"
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <Play className="w-4 h-4 text-gray-400" />
                                                        <span className="text-gray-700">{lesson.title}</span>
                                                    </div>
                                                    <span className="text-sm text-gray-500">{lesson.duration}</span>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Course includes */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">This course includes:</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center space-x-3 text-gray-700">
                                    <Clock className="w-5 h-5 text-blue-600" />
                                    <span>{course.duration} of content</span>
                                </li>
                                <li className="flex items-center space-x-3 text-gray-700">
                                    <BookOpen className="w-5 h-5 text-blue-600" />
                                    <span>Comprehensive curriculum</span>
                                </li>
                                <li className="flex items-center space-x-3 text-gray-700">
                                    <Award className="w-5 h-5 text-blue-600" />
                                    <span>Certificate of completion</span>
                                </li>
                                <li className="flex items-center space-x-3 text-gray-700">
                                    <Users className="w-5 h-5 text-blue-600" />
                                    <span>Community support</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
