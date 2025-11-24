import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import type { Course, Category } from '../types';
import CourseCard from '../components/CourseCard';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

type AllCoursesPageProps = {
    initialCategory?: string;
};

export default function AllCoursesPage({ initialCategory }: AllCoursesPageProps) {
    const navigate = useNavigate();
    const [courses, setCourses] = useState<Course[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('all');

    useEffect(() => {
        async function loadData() {
            try {
                const [coursesResponse, categoriesResponse] = await Promise.all([
                    axios.get<Course[]>(API_ENDPOINTS.courses.all),
                    axios.get<Category[]>(API_ENDPOINTS.categories.all),
                ]);

                setCourses(coursesResponse.data);
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    useEffect(() => {
        if (initialCategory) setSelectedCategory(initialCategory);
    }, [initialCategory]);



    const filteredCourses = courses.filter((course) => {
        const matchesCategory = selectedCategory === 'all' || course.category?.slug === selectedCategory;
        const matchesSearch =
            searchQuery === '' ||
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLevel = selectedLevel === 'all' || course.level.toLowerCase() === selectedLevel.toLowerCase();

        return matchesCategory && matchesSearch && matchesLevel;
    });

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">All Courses</h1>
                    <p className="text-xl text-gray-600">
                        Explore our complete catalog of professional certification courses
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                            >
                                <option value="all">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.slug}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={selectedLevel}
                                onChange={(e) => setSelectedLevel(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                            >
                                <option value="all">All Levels</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Course count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing <span className="font-semibold">{filteredCourses.length}</span> courses
                    </p>
                </div>

                {/* Course list */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : filteredCourses.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-md">
                        <p className="text-xl text-gray-600">No courses found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map((course) => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                onClick={() => navigate(`/course/${course.id}`)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
