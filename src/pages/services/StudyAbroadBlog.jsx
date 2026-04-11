// pages/services/ServiceDetailsPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Newspaper, 
  Mail, 
  Clock, 
  Users, 
  Globe, 
  BookOpen, 
  Star,
  ChevronRight,
  Calendar,
  TrendingUp,
  MessageCircle,
  Share2,
  Bookmark
} from 'lucide-react';

export default function StudyAbroadBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  // Static service data
  const service = {
    id: 6,
    title: "Study Abroad Blog",
    description: "Curated articles, tips, and experiences from successful students.",
    icon: Newspaper,
    gradient: "from-violet-500 to-fuchsia-500",
    details: {
      content: ["Success stories", "Tips & tricks", "Country guides"],
      format: "Weekly newsletter + online access"
    }
  };

  // Sample blog posts
  const featuredPosts = [
    {
      id: 1,
      title: "10 Things I Wish I Knew Before Studying Abroad",
      excerpt: "Real experiences from a student who studied in Canada...",
      category: "Success Stories",
      readTime: "5 min read",
      date: "2024-03-15",
      author: "Sarah Johnson",
      image: "/api/placeholder/400/200"
    },
    {
      id: 2,
      title: "How to Score 7.5 in IELTS: Complete Guide",
      excerpt: "Step-by-step preparation strategy from an expert tutor...",
      category: "Tips & Tricks",
      readTime: "8 min read",
      date: "2024-03-10",
      author: "Michael Chen",
      image: "/api/placeholder/400/200"
    },
    {
      id: 3,
      title: "Study in Germany: Everything You Need to Know",
      excerpt: "Complete country guide for studying in Germany...",
      category: "Country Guides",
      readTime: "10 min read",
      date: "2024-03-05",
      author: "Emma Watson",
      image: "/api/placeholder/400/200"
    }
  ];

  const categories = [
    { name: "Success Stories", count: 24, icon: Users },
    { name: "Tips & Tricks", count: 45, icon: TrendingUp },
    { name: "Country Guides", count: 32, icon: Globe },
    { name: "Exam Preparation", count: 28, icon: BookOpen },
    { name: "Scholarship Updates", count: 19, icon: Star }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${service.gradient} text-white`}>
        <div className="container mx-auto px-4 py-12 md:py-16">
          <button
            onClick={() => navigate('/services')}
            className="mb-6 inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </button>
          
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
              <Newspaper className="w-4 h-4" />
              <span className="text-sm font-medium">Premium Service</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {service.title}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {service.description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Weekly updates</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">Free newsletter</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">1000+ readers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Get */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Get</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {service.details.content.map((item, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center mb-3">
                      <ChevronRight className="w-5 h-5 text-violet-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item}</h3>
                    <p className="text-sm text-gray-600">
                      {item === "Success stories" && "Real experiences from students"}
                      {item === "Tips & tricks" && "Proven strategies for success"}
                      {item === "Country guides" && "Detailed destination information"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Posts */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
                <Link to="/blog" className="text-violet-600 hover:text-violet-700 text-sm font-medium flex items-center gap-1">
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="space-y-6">
                {featuredPosts.map((post) => (
                  <article key={post.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-violet-600 bg-violet-50 px-2 py-1 rounded">
                            {post.category}
                          </span>
                          <span className="text-xs text-gray-500">{post.readTime}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-violet-600 transition-colors">
                          <Link to={`/blog/${post.id}`}>{post.title}</Link>
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>By {post.author}</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore Categories</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Link
                      key={category.name}
                      to={`/blog/category/${category.name.toLowerCase().replace(/ /g, '-')}`}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-violet-50 transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-gray-500 group-hover:text-violet-600" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-violet-600">
                          {category.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{category.count}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Newsletter Subscription */}
            <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-2xl p-6 border border-violet-100">
              <Mail className="w-8 h-8 text-violet-600 mb-3" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Weekly Newsletter</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get the latest study abroad tips and success stories delivered to your inbox every week.
              </p>
              
              {subscribed ? (
                <div className="bg-green-100 text-green-700 rounded-lg p-3 text-center text-sm">
                  ✅ Subscribed successfully! Check your email.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded-lg transition-colors"
                  >
                    Subscribe Now
                  </button>
                </form>
              )}
              <p className="text-xs text-gray-500 mt-3">
                No spam. Unsubscribe anytime.
              </p>
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {["#StudyAbroad", "#Scholarships", "#IELTS", "#StudentVisa", "#UniversityLife", "#CareerTips", "#LanguageLearning", "#CultureShock"].map((tag) => (
                  <Link
                    key={tag}
                    to={`/blog/tag/${tag.slice(1)}`}
                    className="text-xs px-3 py-1 bg-gray-100 hover:bg-violet-100 text-gray-700 hover:text-violet-600 rounded-full transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Share & Bookmark */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">Enjoy This Service?</h3>
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium text-gray-700">
                  <Bookmark className="w-4 h-4" />
                  Save
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium text-gray-700">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>

            {/* Discussion */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">Join the Discussion</h3>
              <p className="text-sm text-gray-600 mb-3">
                Connect with other students and share your experiences.
              </p>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-violet-600 text-violet-600 hover:bg-violet-50 rounded-lg transition-colors text-sm font-medium">
                <MessageCircle className="w-4 h-4" />
                Community Forum
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}