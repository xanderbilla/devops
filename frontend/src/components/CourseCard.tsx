import { Star, Clock, Users, CheckCircle } from 'lucide-react';
import type { Course } from '../types';
import {useEnrollment } from '../context/EnrollmentContext';

type CourseCardProps = {
    course: Course;
    onClick: () => void;
};

export default function CourseCard({ course, onClick }: CourseCardProps) {
    const { isEnrolled } = useEnrollment();
    const enrolled = isEnrolled(course.id);

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    className="w-full h-full object-cover"
                />
                {enrolled ? (
                    <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Enrolled
                    </div>
                ) : (
                    <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ${course.price}
                    </div>
                )}
            </div>

            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                </p>

                {course.instructor && (
                    <p className="text-sm text-gray-700 mb-3 font-medium">
                        {course.instructor.name}
                    </p>
                )}

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">{course.rating}</span>
                    </div>

                    <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                    </div>

                    <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{(course.students_enrolled || 0).toLocaleString()}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
          <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
            {course.level}
          </span>
                </div>
            </div>
        </div>
    );
}
