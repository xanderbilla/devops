import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

type EnrollmentContextType = {
  enrolledCourseIds: string[];
  isEnrolled: (courseId: string) => boolean;
  refreshEnrollments: () => Promise<void>;
  loading: boolean;
};

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

export function EnrollmentProvider({ children }: { children: ReactNode }) {
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnrollments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setEnrolledCourseIds([]);
        setLoading(false);
        return;
      }

      const response = await axios.get<string[]>(API_ENDPOINTS.enrollments.myCourseIds, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEnrolledCourseIds(response.data);
    } catch (error: unknown) {
      console.error('Error fetching enrollments:', error);
      // If unauthorized, clear the token
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number } };
        if (axiosError.response?.status === 401 || axiosError.response?.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setEnrolledCourseIds([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const isEnrolled = (courseId: string) => {
    return enrolledCourseIds.includes(courseId);
  };

  const refreshEnrollments = async () => {
    setLoading(true);
    await fetchEnrollments();
  };

  return (
    <EnrollmentContext.Provider value={{ enrolledCourseIds, isEnrolled, refreshEnrollments, loading }}>
      {children}
    </EnrollmentContext.Provider>
  );
}

export function useEnrollment() {
  const context = useContext(EnrollmentContext);
  if (context === undefined) {
    throw new Error('useEnrollment must be used within an EnrollmentProvider');
  }
  return context;
}
