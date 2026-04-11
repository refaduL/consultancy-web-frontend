// src/components/ServiceDetail.jsx
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle, 
  Calendar, 
  DollarSign, 
  Clock,
  Award,
  MessageCircle,
  BookOpen,
  FileText,
  Globe,
  GraduationCap,
  UserCheck,
  Users
} from "lucide-react";

const serviceDetails = {
  1: {
    title: "University Admissions",
    icon: GraduationCap,
    gradient: "from-indigo-500 to-purple-500",
    longDescription: "Our comprehensive university admissions service guides you through every step of the application process, from selecting the right universities to submitting standout applications.",
    features: [
      "Personalized university shortlisting based on your profile",
      "Application strategy and timeline planning",
      "Statement of Purpose (SOP) and essay editing",
      "Recommendation letter guidance",
      "Application form filling assistance",
      "Interview preparation and mock sessions",
      "Follow-up with universities for application status"
    ],
    process: [
      { step: "Profile Assessment", duration: "1-2 days", icon: UserCheck },
      { step: "University Selection", duration: "1 week", icon: GraduationCap },
      { step: "Document Preparation", duration: "2-3 weeks", icon: FileText },
      { step: "Application Submission", duration: "1-2 weeks", icon: Globe },
      { step: "Interview Prep", duration: "1 week", icon: MessageCircle },
      { step: "Offer Management", duration: "Ongoing", icon: Award }
    ],
    successRate: "94%",
    avgProcessingTime: "4-6 weeks",
    price: "Starting from $499",
    testimonials: [
      { name: "Priya Sharma", university: "University of Toronto", quote: "Got admits from 5 top universities!" },
      { name: "Raj Patel", university: "Imperial College London", quote: "The SOP guidance was exceptional." }
    ]
  },
  2: {
    title: "Visa Assistance",
    icon: Globe,
    gradient: "from-emerald-500 to-teal-500",
    longDescription: "Navigate the complex visa application process with confidence. Our experts ensure your documentation is perfect and you're fully prepared for your visa interview.",
    features: [
      "Visa category selection guidance",
      "Document checklist preparation",
      "Financial documentation assistance",
      "Visa application form filling",
      "Mock interview sessions",
      "Visa interview tips and strategies",
      "Post-visa departure guidance"
    ],
    process: [
      { step: "Initial Consultation", duration: "1 day", icon: UserCheck },
      { step: "Document Collection", duration: "1-2 weeks", icon: FileText },
      { step: "Application Submission", duration: "3-5 days", icon: Globe },
      { step: "Interview Preparation", duration: "1 week", icon: MessageCircle },
      { step: "Visa Decision", duration: "2-4 weeks", icon: Award }
    ],
    successRate: "96%",
    avgProcessingTime: "3-5 weeks",
    price: "Starting from $299",
    testimonials: [
      { name: "Amit Kumar", country: "Canada", quote: "Got my study visa approved in first attempt!" }
    ]
  },
  3: {
    title: "Test Prep & Language Coaching",
    icon: BookOpen,
    gradient: "from-orange-500 to-amber-500",
    longDescription: "Achieve your target scores with our structured coaching programs for IELTS, TOEFL, GRE, and GMAT. Learn from expert mentors with proven track records.",
    features: [
      "Diagnostic tests to identify weak areas",
      "Customized study plans",
      "Live online/offline classes",
      "Practice tests with detailed analysis",
      "One-on-one doubt clearing sessions",
      "Vocabulary building resources",
      "Time management strategies"
    ],
    process: [
      { step: "Level Assessment", duration: "1 day", icon: UserCheck },
      { step: "Study Plan Creation", duration: "2 days", icon: BookOpen },
      { step: "Regular Classes", duration: "4-8 weeks", icon: Clock },
      { step: "Mock Tests", duration: "Weekly", icon: FileText },
      { step: "Final Preparation", duration: "1 week", icon: Award }
    ],
    successRate: "92%",
    avgProcessingTime: "6-8 weeks",
    price: "Starting from $399",
    testimonials: [
      { name: "Neha Gupta", score: "IELTS 8.0", quote: "Improved from 6.5 to 8.0 in just 2 months!" }
    ]
  },
  4: {
    title: "Scholarship Guidance",
    icon: FileText,
    gradient: "from-pink-500 to-rose-500",
    longDescription: "Unlock financial opportunities with our scholarship guidance service. We help you find and apply for scholarships that match your profile and academic achievements.",
    features: [
      "Scholarship database access",
      "Eligibility assessment",
      "Scholarship essay writing assistance",
      "Application timeline management",
      "Interview preparation for scholarships",
      "Need-based financial aid guidance",
      "External funding opportunities"
    ],
    process: [
      { step: "Profile Analysis", duration: "1 day", icon: UserCheck },
      { step: "Scholarship Matching", duration: "3-5 days", icon: Award },
      { step: "Application Prep", duration: "1-2 weeks", icon: FileText },
      { step: "Submission", duration: "1 week", icon: Globe },
      { step: "Follow-up", duration: "Ongoing", icon: MessageCircle }
    ],
    successRate: "78%",
    avgProcessingTime: "4-8 weeks",
    price: "Starting from $249",
    testimonials: [
      { name: "Sneha Reddy", scholarship: "Fullbright Scholar", quote: "Received $50,000 in scholarships!" }
    ]
  },
  5: {
    title: "Career Counseling",
    icon: UserCheck,
    gradient: "from-sky-500 to-blue-500",
    longDescription: "Make informed career decisions with our personalized counseling sessions. We align your interests, skills, and goals with the right educational and career paths.",
    features: [
      "Psychometric assessments",
      "Career interest mapping",
      "Industry trend analysis",
      "Educational pathway planning",
      "Resume and LinkedIn optimization",
      "Networking strategies",
      "Job search guidance"
    ],
    process: [
      { step: "Initial Assessment", duration: "2-3 days", icon: UserCheck },
      { step: "Career Exploration", duration: "1 week", icon: Globe },
      { step: "Pathway Planning", duration: "1 week", icon: BookOpen },
      { step: "Skill Development", duration: "4-6 weeks", icon: Clock },
      { step: "Job Preparation", duration: "2 weeks", icon: Award }
    ],
    successRate: "88%",
    avgProcessingTime: "2-4 weeks",
    price: "Starting from $199",
    testimonials: [
      { name: "Rahul Verma", job: "Data Scientist", quote: "Found my dream career path!" }
    ]
  },
  6: {
    title: "Pre-departure Support",
    icon: Users,
    gradient: "from-violet-500 to-fuchsia-500",
    longDescription: "Prepare for your journey abroad with our comprehensive pre-departure support. From travel arrangements to cultural orientation, we ensure you're ready for your new adventure.",
    features: [
      "Travel booking assistance",
      "Accommodation guidance",
      "Health insurance setup",
      "Bank account opening abroad",
      "Cultural orientation sessions",
      "Packing and luggage guidance",
      "Emergency contact preparation"
    ],
    process: [
      { step: "Pre-departure Kit", duration: "1 week", icon: FileText },
      { step: "Travel Arrangements", duration: "2 weeks", icon: Globe },
      { step: "Accommodation Setup", duration: "1-2 weeks", icon: Users },
      { step: "Documentation", duration: "1 week", icon: CheckCircle },
      { step: "Orientation", duration: "1 day", icon: MessageCircle }
    ],
    successRate: "99%",
    avgProcessingTime: "3-4 weeks",
    price: "Starting from $149",
    testimonials: [
      { name: "Anjali Mehta", destination: "Australia", quote: "Made my transition so smooth and stress-free!" }
    ]
  }
};

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = serviceDetails[id];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h2>
          <Link to="/services" className="text-primary-600 hover:text-primary-700">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Services
        </button>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
          <div className={`bg-gradient-to-r ${service.gradient} p-8 text-white`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Icon size={32} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{service.title}</h1>
            </div>
            <p className="text-lg text-white/90 max-w-3xl">{service.longDescription}</p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 bg-gray-50">
            <div className="p-6 text-center">
              <Award className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{service.successRate}</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="p-6 text-center">
              <Clock className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{service.avgProcessingTime}</div>
              <div className="text-sm text-gray-600">Average Processing</div>
            </div>
            <div className="p-6 text-center">
              <DollarSign className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{service.price}</div>
              <div className="text-sm text-gray-600">Starting Price</div>
            </div>
          </div>
        </div>

        {/* Features & Process Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Features */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircle className="text-primary-600" />
              What's Included
            </h2>
            <ul className="space-y-3">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Process */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Clock className="text-primary-600" />
              Our Process
            </h2>
            <div className="space-y-4">
              {service.process.map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <StepIcon className="w-4 h-4 text-primary-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{step.step}</div>
                        <div className="text-sm text-gray-500">{step.duration}</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-primary-600">Step {idx + 1}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {service.testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">
                      {testimonial.university || testimonial.country || testimonial.score || testimonial.scholarship || testimonial.job || testimonial.destination}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105">
            Get Started with {service.title}
          </button>
          <p className="text-sm text-gray-500 mt-4">Free consultation available. No hidden fees.</p>
        </div>
      </div>
    </div>
  );
}