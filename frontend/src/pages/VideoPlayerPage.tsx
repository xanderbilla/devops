import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CheckCircle, Circle, ChevronRight, ChevronDown, BookOpen } from 'lucide-react';
import type { Course } from '../types';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

export default function VideoPlayerPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

    const [currentVideo, setCurrentVideo] = useState(0);
    const [expandedModules, setExpandedModules] = useState<number[]>([0]);

    const modules = [
        {
            title: 'Introduction and Fundamentals',
            lessons: [
                { title: 'Course Overview', duration: '10:25', completed: true },
                { title: 'Getting Started', duration: '15:30', completed: true },
                { title: 'Core Concepts', duration: '22:45', completed: false },
            ],
        },
        {
            title: 'Advanced Topics',
            lessons: [
                { title: 'Deep Dive into Key Areas', duration: '35:20', completed: false },
                { title: 'Best Practices', duration: '28:15', completed: false },
                { title: 'Real-world Applications', duration: '42:30', completed: false },
            ],
        },
        {
            title: 'Exam Preparation',
            lessons: [
                { title: 'Exam Strategy', duration: '18:40', completed: false },
                { title: 'Practice Questions', duration: '45:00', completed: false },
                { title: 'Final Review', duration: '30:25', completed: false },
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

    const toggleModule = (index: number) => {
        setExpandedModules((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    if (loading) return <div className="text-center py-12">Loading...</div>;
    if (!course) return <div className="text-center py-12">Course not found</div>;

    const allLessons = modules.flatMap((module, moduleIndex) =>
        module.lessons.map((lesson, lessonIndex) => ({
            ...lesson,
            moduleIndex,
            lessonIndex,
            moduleTitle: module.title,
        }))
    );

    const currentLesson = allLessons[currentVideo];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-4">
                    <button
                        onClick={() => navigate(`/course/${id}`)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        ← Back to Course Details
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                            <div className="aspect-video bg-gray-900 flex items-center justify-center">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                    title={currentLesson.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            <div className="p-6">
                                <div className="mb-4">
                                    <p className="text-sm text-blue-600 font-semibold mb-1">
                                        {currentLesson.moduleTitle}
                                    </p>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{currentLesson.title}</h1>
                                    <p className="text-gray-600">{course.title}</p>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t">
                                    <button
                                        onClick={() => setCurrentVideo(Math.max(0, currentVideo - 1))}
                                        disabled={currentVideo === 0}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>

                                    <span className="text-gray-600">
                    Lesson {currentVideo + 1} of {allLessons.length}
                  </span>

                                    <button
                                        onClick={() =>
                                            setCurrentVideo(Math.min(allLessons.length - 1, currentVideo + 1))
                                        }
                                        disabled={currentVideo === allLessons.length - 1}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">About This Lesson</h2>
                            <p className="text-gray-700 mb-4">
                                This lesson covers essential concepts that will help you master the material and
                                prepare for certification. Take notes and feel free to rewatch sections as needed.
                            </p>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-blue-800">
                                    <strong>Tip:</strong> Complete all lessons in order for the best learning
                                    experience. Mark lessons as complete as you finish them to track your progress.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-8">
                            <div className="bg-blue-600 text-white p-4">
                                <h3 className="text-lg font-bold">Course Content</h3>
                            </div>

                            <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
                                {modules.map((module, moduleIndex) => (
                                    <div key={moduleIndex} className="border-b border-gray-200">
                                        <button
                                            onClick={() => toggleModule(moduleIndex)}
                                            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <BookOpen className="w-5 h-5 text-blue-600" />
                                                <span className="font-semibold text-gray-900 text-left">{module.title}</span>
                                            </div>
                                            {expandedModules.includes(moduleIndex) ? (
                                                <ChevronDown className="w-5 h-5 text-gray-400" />
                                            ) : (
                                                <ChevronRight className="w-5 h-5 text-gray-400" />
                                            )}
                                        </button>

                                        {expandedModules.includes(moduleIndex) && (
                                            <div className="bg-gray-50">
                                                {module.lessons.map((lesson, lessonIndex) => {
                                                    const globalIndex = modules
                                                        .slice(0, moduleIndex)
                                                        .reduce((acc, m) => acc + m.lessons.length, 0) + lessonIndex;
                                                    const isActive = globalIndex === currentVideo;

                                                    return (
                                                        <button
                                                            key={lessonIndex}
                                                            onClick={() => setCurrentVideo(globalIndex)}
                                                            className={`w-full p-4 pl-12 flex items-center justify-between hover:bg-gray-100 transition-colors ${
                                                                isActive ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                                                            }`}
                                                        >
                                                            <div className="flex items-center space-x-3 flex-1">
                                                                {lesson.completed ? (
                                                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                                                ) : (
                                                                    <Circle className="w-5 h-5 text-gray-400" />
                                                                )}
                                                                <span
                                                                    className={`text-sm text-left ${
                                                                        isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
                                                                    }`}
                                                                >
                                  {lesson.title}
                                </span>
                                                            </div>
                                                            <span className="text-xs text-gray-500 ml-2">{lesson.duration}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
