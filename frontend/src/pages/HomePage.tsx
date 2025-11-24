import { useEffect, useState } from 'react';
import { 
  Stethoscope, 
  Laptop, 
  ArrowRight, 
  Award, 
  Users, 
  BookOpen, 
  CheckCircle, 
  TrendingUp, 
  Clock, 
  Star,
  PlayCircle,
  Target,
  Globe,
  Shield
} from 'lucide-react';
import type { Course } from '../types';
import CourseCard from '../components/CourseCard';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';


export default function HomePage() {
    const navigate = useNavigate();
    const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
      async function loadFeaturedCourses() {
          try {
              const response = await axios.get<Course[]>(API_ENDPOINTS.courses.featured);
              setFeaturedCourses(response.data);
          } catch (error) {
              console.error('Error loading featured courses:', error);
          } finally {
              setLoading(false);
          }
      }
    loadFeaturedCourses();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 text-yellow-300 mr-2" />
              <span className="text-sm font-medium">Rated 4.8/5 by 50,000+ students</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Master Your Career with<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                CertCook
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto">
              Professional certification courses in Healthcare & IT. Learn from industry experts and advance your career today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('courses')}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center space-x-2"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => navigate('courses')}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all flex items-center space-x-2"
              >
                <PlayCircle className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">50K+</div>
                <div className="text-blue-200 text-sm">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">100+</div>
                <div className="text-blue-200 text-sm">Expert Courses</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">95%</div>
                <div className="text-blue-200 text-sm">Pass Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">24/7</div>
                <div className="text-blue-200 text-sm">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Path
            </h2>
            <p className="text-xl text-gray-600">
              Select from our top certification categories
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              onClick={() => navigate(`/courses?category=healthcare` )}
              className="group bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full -mr-20 -mt-20 group-hover:bg-blue-100 transition-colors"></div>
              
              <div className="relative">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-5 rounded-2xl group-hover:scale-110 transition-transform">
                    <Stethoscope className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Healthcare</h3>
                </div>
                
                <p className="text-gray-600 mb-6 text-lg">
                  Professional healthcare certification courses including CNA, RN, Medical Coding, Pharmacy Tech, and more specialized programs.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">CNA</span>
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">RN</span>
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Medical Coding</span>
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Pharmacy</span>
                </div>
                
                <div className="flex items-center text-blue-600 font-semibold text-lg group-hover:gap-3 gap-2 transition-all">
                  <span>Browse Healthcare Courses</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

            <div
              onClick={() => navigate(`/courses?category=it-certification`)}
              className="group bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full -mr-20 -mt-20 group-hover:bg-blue-100 transition-colors"></div>
              
              <div className="relative">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-5 rounded-2xl group-hover:scale-110 transition-transform">
                    <Laptop className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">IT Certification</h3>
                </div>
                
                <p className="text-gray-600 mb-6 text-lg">
                  Industry-leading IT certifications including AWS, Azure, CompTIA, Cisco CCNA, and cutting-edge cloud technologies.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">AWS</span>
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Azure</span>
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">CompTIA</span>
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">CCNA</span>
                </div>
                
                <div className="flex items-center text-blue-600 font-semibold text-lg group-hover:gap-3 gap-2 transition-all">
                  <span>Browse IT Courses</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-4">
              <Award className="w-4 h-4 mr-2" />
              <span className="text-sm font-semibold">Top Rated</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start your certification journey with our most popular courses
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading amazing courses...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onClick={() => navigate(`/course/${course.id}`)}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('courses')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View All Courses
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose CertCook?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to succeed in your certification journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Expert Instructors</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn from certified professionals with 10+ years of real-world experience in their fields.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Complete Curriculum</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive course content with practice tests, quizzes, and hands-on projects.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Flexible Learning</h3>
              <p className="text-gray-600 leading-relaxed">
                Study at your own pace with lifetime access to all course materials and updates.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Community Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Join 50,000+ students and get help from our active community and support team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See what our students have achieved
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg border border-blue-100">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                "CertCook helped me pass my CNA certification on the first try! The instructors are amazing and the content is top-notch."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  SJ
                </div>
                <div>
                  <div className="font-bold text-gray-900">Sarah Johnson</div>
                  <div className="text-sm text-gray-600">Certified Nursing Assistant</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg border border-blue-100">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                "The AWS course was incredibly detailed and practical. I'm now a certified Solutions Architect thanks to CertCook!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  MC
                </div>
                <div>
                  <div className="font-bold text-gray-900">Michael Chen</div>
                  <div className="text-sm text-gray-600">AWS Solutions Architect</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg border border-blue-100">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                "Best investment in my career! The medical coding course gave me everything I needed to start my new job."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  ER
                </div>
                <div>
                  <div className="font-bold text-gray-900">Emily Rodriguez</div>
                  <div className="text-sm text-gray-600">Medical Coding Specialist</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-400">
              Powerful features designed for your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Certification Guarantee</h3>
                <p className="text-gray-400">Pass your exam or get your money back</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Career Advancement</h3>
                <p className="text-gray-400">Boost your earning potential by 30%+</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Personalized Learning</h3>
                <p className="text-gray-400">AI-powered study plans tailored to you</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Global Recognition</h3>
                <p className="text-gray-400">Certifications accepted worldwide</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Secure Platform</h3>
                <p className="text-gray-400">Your data is safe and encrypted</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <PlayCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">HD Video Lessons</h3>
                <p className="text-gray-400">Crystal clear instruction anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-10 text-blue-100">
            Join 50,000+ students who are already advancing their careers with CertCook
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('courses')}
              className="bg-white text-blue-600 px-10 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all shadow-2xl transform hover:-translate-y-1"
            >
              Browse All Courses
            </button>
            <button
              onClick={() => navigate('instructors')}
              className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
            >
              Meet Our Instructors
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
