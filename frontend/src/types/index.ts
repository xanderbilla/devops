export type Instructor = {
  id: string;
  name: string;
  bio: string;
  expertise: string;
  image_url: string;
  rating: number;
  students_count: number;
  courses_count: number;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  category_id: string;
  instructor_id: string;
  price: number;
  duration: string;
  level: string;
  thumbnail_url: string;
  video_url: string;
  is_featured: boolean;
  rating: number;
  students_enrolled: number;
  instructor?: Instructor;
  category?: Category;
};

export type CourseModule = {
  id: string;
  course_id: string;
  title: string;
  order_index: number;
  lessons?: CourseLesson[];
};

export type CourseLesson = {
  id: string;
  module_id: string;
  title: string;
  video_url: string;
  duration: string;
  order_index: number;
};

export type Enrollment = {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  progress_percentage: number;
  course?: Course;
};

export type Payment = {
  id: string;
  user_id: string;
  course_id: string;
  amount: number;
  status: string;
  payment_method: string;
  transaction_id: string;
  created_at: string;
  course?: Course;
};
