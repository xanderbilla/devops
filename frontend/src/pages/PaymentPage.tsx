import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';
import type { Course } from '../types';

export default function PaymentPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [course, setCourse] = useState<Course | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    // Fetch or simulate course data by ID
    useEffect(() => {
        if (!id) return;

        // Simulated fetch - replace with API call if needed
        const fetchedCourse: Course = {
            id: id!,
            title: 'AWS Solutions Architect',
            description: 'Master AWS cloud computing',
            category_id: '2',
            instructor_id: '2',
            price: 49,
            duration: '10h 30m',
            level: 'Intermediate',
            thumbnail_url:
                'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600',
            video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            is_featured: false,
            rating: 4.9,
            students_enrolled: 5680,
        };

        setCourse(fetchedCourse);
    }, [id]);

    const handlePayment = (e?: React.FormEvent) => {
        e?.preventDefault();
        setProcessing(true);

        setTimeout(() => {
            setProcessing(false);
            setSuccess(true);
            setTimeout(() => {
                navigate('/my-courses');
            }, 2000);
        }, 2000);
    };

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading course...</p>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
                    <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
                    <p className="text-gray-600 mb-6">
                        You've successfully enrolled in <strong>{course.title}</strong>
                    </p>
                    <p className="text-sm text-gray-500">Redirecting to your courses...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <button
                        onClick={() => navigate(`/course/${course.id}`)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        ← Back to Course
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-6">Complete Your Purchase</h1>

                            {/* Payment Method */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setPaymentMethod('card')}
                                        className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                                            paymentMethod === 'card'
                                                ? 'border-blue-600 bg-blue-50'
                                                : 'border-gray-300 hover:border-blue-400'
                                        }`}
                                    >
                                        <CreditCard className="w-5 h-5" />
                                        <span className="font-semibold">Credit Card</span>
                                    </button>

                                    <button
                                        onClick={() => setPaymentMethod('paypal')}
                                        className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                                            paymentMethod === 'paypal'
                                                ? 'border-blue-600 bg-blue-50'
                                                : 'border-gray-300 hover:border-blue-400'
                                        }`}
                                    >
                                        <span className="font-semibold">PayPal</span>
                                    </button>
                                </div>
                            </div>

                            {/* Card Payment Form */}
                            {paymentMethod === 'card' && (
                                <form onSubmit={handlePayment}>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Card Number
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="1234 5678 9012 3456"
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Expiry Date
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="MM/YY"
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                                                <input
                                                    type="text"
                                                    placeholder="123"
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Cardholder Name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="John Doe"
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div className="pt-6 border-t">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                            >
                                                {processing ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                        <span>Processing...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Lock className="w-5 h-5" />
                                                        <span>Pay ${course.price}</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}

                            {/* PayPal */}
                            {paymentMethod === 'paypal' && (
                                <div className="text-center py-12">
                                    <button
                                        onClick={() => handlePayment()}
                                        disabled={processing}
                                        className="bg-yellow-500 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-600 transition-colors disabled:opacity-50"
                                    >
                                        {processing ? (
                                            <div className="flex items-center space-x-2">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                <span>Processing...</span>
                                            </div>
                                        ) : (
                                            'Continue with PayPal'
                                        )}
                                    </button>
                                </div>
                            )}

                            <div className="mt-8 bg-gray-50 rounded-lg p-6">
                                <div className="flex items-start space-x-3">
                                    <Lock className="w-5 h-5 text-gray-600 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Secure Payment</h3>
                                        <p className="text-sm text-gray-600">
                                            Your payment information is encrypted and secure. We never store your card details.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-8">
                            <div className="bg-blue-600 text-white p-4">
                                <h3 className="text-lg font-bold">Order Summary</h3>
                            </div>

                            <div className="p-6">
                                <div className="mb-6">
                                    <img
                                        src={course.thumbnail_url}
                                        alt={course.title}
                                        className="w-full h-40 object-cover rounded-lg mb-4"
                                    />
                                    <h4 className="font-semibold text-gray-900 mb-2">{course.title}</h4>
                                    {course.instructor && (
                                        <p className="text-sm text-gray-600">By {course.instructor.name}</p>
                                    )}
                                </div>

                                <div className="space-y-3 border-t pt-4">
                                    <div className="flex justify-between text-gray-700">
                                        <span>Course Price</span>
                                        <span className="font-semibold">${course.price}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-700">
                                        <span>Tax</span>
                                        <span className="font-semibold">$0.00</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t">
                                        <span>Total</span>
                                        <span className="text-blue-600">${course.price}</span>
                                    </div>
                                </div>

                                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-green-900 mb-2">What's Included:</h4>
                                    <ul className="text-sm text-green-800 space-y-1">
                                        <li>• Lifetime access to course</li>
                                        <li>• Certificate of completion</li>
                                        <li>• {course.duration} of content</li>
                                        <li>• Community support</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
