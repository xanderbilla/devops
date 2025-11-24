export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  instructors: `${API_BASE_URL}/public/instructors`,
  courses: {
    all: `${API_BASE_URL}/public/courses`,
    featured: `${API_BASE_URL}/public/courses/featured`,
    byId: (id: string) => `${API_BASE_URL}/public/courses/${id}`,
    byCategory: (categoryId: string) => `${API_BASE_URL}/public/courses/category/${categoryId}`,
    search: (query: string) => `${API_BASE_URL}/public/courses/search?q=${query}`,
  },
  categories: {
    all: `${API_BASE_URL}/public/categories`,
    byId: (id: string) => `${API_BASE_URL}/public/categories/${id}`,
    bySlug: (slug: string) => `${API_BASE_URL}/public/categories/slug/${slug}`,
  },
  enrollments: {
    myCourses: `${API_BASE_URL}/api/enrollments/my-courses`,
    myCourseIds: `${API_BASE_URL}/api/enrollments/my-course-ids`,
    checkEnrollment: (courseId: string) => `${API_BASE_URL}/api/enrollments/check/${courseId}`,
  },
  auth: {
    login: `${API_BASE_URL}/auth/signin`,
    register: `${API_BASE_URL}/auth/signup`,
  },
};
