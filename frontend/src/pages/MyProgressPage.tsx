import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import { useEnrollment } from '../context/EnrollmentContext';

type EnrollmentCourse = {
    id: string;
    user_id: string;
    course_id: string;
    enrolled_at: string;
    progress_percentage: number;
    course: {
        id: string;
        title: string;
        thumbnail_url: string;
        category?: {
            name: string;
        };
    };
};

export default function MyProgressPage() {
    const navigate = useNavigate();
    const { refreshEnrollments } = useEnrollment();
    const [enrolledCourses, setEnrolledCourses] = useState<EnrollmentCourse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEnrollments() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setEnrolledCourses([]);
                    setLoading(false);
                    return;
                }

                const response = await axios.get<EnrollmentCourse[]>(
                    API_ENDPOINTS.enrollments.myCourses,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setEnrolledCourses(response.data);
                // Refresh the enrollment context as well
                await refreshEnrollments();
            } catch (error) {
                console.error('Error fetching enrollments:', error);
                setEnrolledCourses([]);
            } finally {
                setLoading(false);
            }
        }

        fetchEnrollments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run once on mount

    const stats = {
        totalCourses: enrolledCourses.length,
        completedCourses: enrolledCourses.filter((e) => e.progress_percentage >= 100).length,
        totalHours: Math.round(enrolledCourses.length * 14), // Estimate
        certificates: enrolledCourses.filter((e) => e.progress_percentage >= 100).length,
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">My Learning Progress</h1>
                    <p className="text-xl text-gray-600">Track your certification journey</p>
                </div>

                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <BookOpen className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{stats.totalCourses}</p>
                        <p className="text-gray-600">Enrolled Courses</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-green-100 p-3 rounded-lg">
                                <Award className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{stats.completedCourses}</p>
                        <p className="text-gray-600">Completed</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-purple-100 p-3 rounded-lg">
                                <Clock className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{stats.totalHours}</p>
                        <p className="text-gray-600">Hours Learned</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-yellow-100 p-3 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{stats.certificates}</p>
                        <p className="text-gray-600">Certificates</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Continue Learning</h2>
                    
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            <p className="mt-4 text-gray-600">Loading your courses...</p>
                        </div>
                    ) : enrolledCourses.length === 0 ? (
                        <div className="text-center py-12">
                            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-xl text-gray-600 mb-4">You haven't enrolled in any courses yet</p>
                            <button
                                onClick={() => navigate('/courses')}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Browse Courses
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {enrolledCourses.map((enrollment) => (
                                <div
                                    key={enrollment.id}
                                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all"
                                >
                                    <div className="md:flex">
                                        <div className="md:w-64 h-48 md:h-auto">
                                            <img
                                                src={enrollment.course.thumbnail_url}
                                                alt={enrollment.course.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex-1 p-6">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    {enrollment.course.category && (
                                                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                                                            {enrollment.course.category.name}
                                                        </span>
                                                    )}
                                                    <h3 className="text-xl font-bold text-gray-900 mt-2">
                                                        {enrollment.course.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                                                    <span>Progress</span>
                                                    <span className="font-semibold text-blue-600">
                                                        {Math.round(enrollment.progress_percentage)}%
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                                    <div
                                                        className="bg-blue-600 h-full rounded-full transition-all duration-300"
                                                        style={{ width: `${enrollment.progress_percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <p className="text-sm text-gray-500">
                                                    Enrolled on {new Date(enrollment.enrolled_at).toLocaleDateString()}
                                                </p>
                                                <button
                                                    onClick={() => navigate(`/video/${enrollment.course.id}`)}
                                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                                >
                                                    Continue Learning
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md p-8 text-white text-center">
                    <h2 className="text-3xl font-bold mb-4">Keep Up the Great Work!</h2>
                    <p className="text-xl text-blue-100 mb-6">
                        You're on your way to achieving your certification goals
                    </p>
                    <button
                        onClick={() => navigate('/courses')}
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                        Explore More Courses
                    </button>
                </div>
            </div>
        </div>
    );
}
