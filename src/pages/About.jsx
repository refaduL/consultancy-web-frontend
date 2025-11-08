import { useState, useEffect, useRef } from 'react';
import {
  Target, Rocket, Users, Globe, Award, Shield, Zap, Check, Heart, Lightbulb,
  TrendingUp, BookOpen, GraduationCap, MapPin, Clock, Lock, Database, Cpu,
  Bell, BarChart, Star, CheckCircle, ArrowRight, Compass, Scale, LayoutGrid
} from 'lucide-react';

// Count-up animation hook
const useCountUp = (end) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const increment = end / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          
          observer.unobserve(entry.target);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, [end]);

  return [count, ref];
};

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-transparent opacity-60"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-emerald-500/10 backdrop-blur-sm rounded-full border border-emerald-500/20">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-emerald-700">Trusted by 10,000+ Students Worldwide</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Your Gateway to
            <span className="block mt-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Global Education
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Where expert counseling meets intelligent technology to transform your study abroad dreams into reality
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#cta" className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#story" className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-full font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-300">
              Learn Our Story
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Impact Stats */}
        <section className="py-16 -mt-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard end={10000} label="Students Helped" Icon={Users} gradient="from-blue-500 to-blue-600" suffix="+" />
            <StatCard end={500} label="Partner Universities" Icon={GraduationCap} gradient="from-purple-500 to-purple-600" suffix="+" />
            <StatCard end={30} label="Countries" Icon={Globe} gradient="from-emerald-500 to-emerald-600" suffix="+" />
            <StatCard end={95} label="Success Rate" Icon={TrendingUp} gradient="from-pink-500 to-pink-600" suffix="%" />
          </div>
        </section>

        {/* Story Timeline */}
        <section id="story" className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Our Journey</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From a small team with a big vision to a global platform transforming international education
            </p>
          </div>

          <div className="space-y-12 max-w-4xl mx-auto">
            <TimelineCard 
              year="2018" 
              title="The Beginning" 
              description="Founded by education veterans and tech innovators to solve the complexity of studying abroad with intelligent automation"
              Icon={Lightbulb}
            />
            <TimelineCard 
              year="2019" 
              title="Platform Launch" 
              description="Beta release of our AI matching algorithm helps 500+ students find their perfect university fit"
              Icon={Rocket}
            />
            <TimelineCard 
              year="2021" 
              title="Global Expansion" 
              description="Partnered with 300+ universities worldwide, hired country specialists, and introduced real-time tracking"
              Icon={Globe}
            />
            <TimelineCard 
              year="2025" 
              title="Industry Leader" 
              description="Serving 10,000+ students globally with the most advanced study abroad platform, continuously innovating"
              Icon={Star}
            />
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group p-8 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-3xl border border-blue-200 hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                Making international education accessible and streamlined through intelligent technology and expert human guidance, personalized for every student's unique journey.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-3xl border border-purple-200 hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                To be the world's most trusted digital platform connecting students with global opportunities, fostering a new generation of internationally-minded graduates.
              </p>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-20 bg-slate-50 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 rounded-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Complete Support, Every Step</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From discovery to departure, we're with you throughout your journey
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <ServiceCard Icon={Compass} title="University Discovery" description="AI-powered search across thousands of programs worldwide" />
            <ServiceCard Icon={Target} title="Smart Matching" description="Personalized recommendations with compatibility scores" />
            <ServiceCard Icon={Users} title="Expert Counseling" description="One-on-one guidance from admissions veterans" />
            <ServiceCard Icon={BookOpen} title="Document Review" description="Comprehensive support for essays and applications" />
            <ServiceCard Icon={CheckCircle} title="Application Tracking" description="Real-time status updates and deadline management" />
            <ServiceCard Icon={Award} title="Scholarship Support" description="Maximize your funding opportunities" />
            <ServiceCard Icon={Shield} title="Visa Assistance" description="Expert guidance through visa applications" />
            <ServiceCard Icon={GraduationCap} title="Post-Admission Care" description="Pre-departure support and student community" />
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Why Students Choose Us</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Technology-driven efficiency meets human expertise and care
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard Icon={Zap} title="AI-Powered Matching" description="Proprietary algorithms that find your perfect university fit based on your unique profile" />
            <FeatureCard Icon={Users} title="Expert Counselors" description="Seasoned professionals with deep knowledge of global admissions" />
            <FeatureCard Icon={LayoutGrid} title="All-in-One Platform" description="Manage everything from one secure, intuitive dashboard" />
            <FeatureCard Icon={Scale} title="Complete Transparency" description="Full visibility into status, costs, and communications" />
            <FeatureCard Icon={Shield} title="No Hidden Fees" description="Clear, upfront pricing with zero surprises" />
            <FeatureCard Icon={Clock} title="24/7 Access" description="Your documents and updates available anytime, anywhere" />
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 rounded-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-slate-600">The principles that guide everything we do</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ValueCard Icon={Heart} title="Student Success First" description="Your best-fit university and long-term growth are our only priorities" />
            <ValueCard Icon={Check} title="Radical Transparency" description="Honest assessments, clear processes, and realistic expectations" />
            <ValueCard Icon={Lightbulb} title="Continuous Innovation" description="Constantly improving through technology and feedback" />
            <ValueCard Icon={Shield} title="Unwavering Integrity" description="Ethical practices in every application and interaction" />
            <ValueCard Icon={Globe} title="Global Excellence" description="World-class service with local market expertise" />
          </div>
        </section>

        {/* Technology Platform */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Powered by Technology</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Advanced platform features that make your journey seamless
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <TechCard Icon={Cpu} title="Smart Algorithms" description="AI-driven matching analyzing thousands of program requirements" />
            <TechCard Icon={Clock} title="Real-Time Tracking" description="Instant updates at every stage of your application" />
            <TechCard Icon={Lock} title="Secure Storage" description="Bank-grade encryption for all your documents" />
            <TechCard Icon={Bell} title="Smart Notifications" description="Never miss a deadline or important update" />
            <TechCard Icon={Database} title="Data Intelligence" description="Insights from global admission trends and success metrics" />
            <TechCard Icon={BarChart} title="Personal Dashboard" description="Everything you need in one centralized hub" />
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="py-24 my-20 bg-primary-100/50 backdrop-blur-md border border-white/40 transition-all duration-300 text-center text-white relative overflow-hidden">
          
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl mb-10 opacity-95 leading-relaxed">
              Join thousands of successful students who trusted us to make their study abroad dreams come true
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-300 hover:from-primary-500 hover:to-primary-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg group">
                Get Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="/universities" className="px-8 py-4 bg-white hover:bg-primary-100 text-gray-700 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-soft border border-gray-200">
                Explore Universities
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

// Components
const StatCard = ({ end, label, Icon, gradient, suffix }) => {
  const [count, ref] = useCountUp(end);
  return (
    <div ref={ref} className={`p-6 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300`}>
      <Icon className="w-8 h-8 mb-3 opacity-80" />
      <div className="text-4xl font-bold mb-1">{count.toLocaleString()}{suffix}</div>
      <div className="text-sm opacity-90 font-medium">{label}</div>
    </div>
  );
};

const TimelineCard = ({ year, title, description, Icon }) => (
  <div className="flex gap-6 group">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="w-0.5 h-full bg-gradient-to-b from-blue-500 to-transparent mt-2"></div>
    </div>
    <div className="flex-1 pb-8">
      <div className="text-sm font-bold text-blue-600 mb-2">{year}</div>
      <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

const ServiceCard = ({ Icon, title, description }) => (
  <div className="group p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300">
    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const FeatureCard = ({ Icon, title, description }) => (
  <div className="flex gap-4 group">
    <div className="flex-shrink-0">
      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6 text-emerald-600" />
      </div>
    </div>
    <div>
      <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

const ValueCard = ({ Icon, title, description }) => (
  <div className="group p-6 bg-white rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-300 text-center">
    <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
      <Icon className="w-7 h-7 text-purple-600" />
    </div>
    <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
    <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const TechCard = ({ Icon, title, description }) => (
  <div className="group p-6 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all duration-300">
    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <Icon className="w-6 h-6 text-emerald-600" />
    </div>
    <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
    <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
  </div>
);