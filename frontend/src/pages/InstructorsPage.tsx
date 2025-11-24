import { useEffect, useState } from 'react';
import { Star, Users, BookOpen, Award } from 'lucide-react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import type { Instructor } from '../types';

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInstructors() {
      try {
        const response = await axios.get<Instructor[]>(API_ENDPOINTS.instructors);
        setInstructors(response.data);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      } finally {
        setLoading(false);
      }
    }

    loadInstructors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Expert Instructors</h1>
          <p className="text-xl text-gray-600">
            Learn from industry professionals with years of experience
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {instructors.map((instructor) => (
              <div
                key={instructor.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={instructor.image_url}
                      alt={instructor.name}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>

                  <div className="p-6 md:w-2/3">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">
                          {instructor.name}
                        </h2>
                        <p className="text-blue-600 font-medium">{instructor.expertise}</p>
                      </div>
                      <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-semibold text-gray-900">{instructor.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 line-clamp-3">{instructor.bio}</p>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center bg-blue-50 rounded-lg p-3">
                        <div className="flex justify-center mb-2">
                          <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          {(instructor.students_count || 0).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-600">Students</p>
                      </div>

                      <div className="text-center bg-blue-50 rounded-lg p-3">
                        <div className="flex justify-center mb-2">
                          <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          {instructor.courses_count}
                        </p>
                        <p className="text-xs text-gray-600">Courses</p>
                      </div>

                      <div className="text-center bg-blue-50 rounded-lg p-3">
                        <div className="flex justify-center mb-2">
                          <Award className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">Expert</p>
                        <p className="text-xs text-gray-600">Level</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
