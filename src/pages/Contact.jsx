import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, MessageCircle, Video } from 'lucide-react';

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('⚠️ Please fill out all fields');
      return;
    }
    console.log('Message Sent:', formData);
    setStatus('Message sent successfully! We’ll reach out soon.');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setStatus(''), 4000);
  };

  return (
    <section className="min-h-screen bg-gradient-default pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-14">
          <span className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Contact Us
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Let’s Talk
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you’re a student or partner, our team is just one message away.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Contact Info */}
          <div className="bg-primary-100/50 backdrop-blur-md border border-white/40 shadow-xl rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between transition-all hover:shadow-2xl">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-8">
                Get in Touch
              </h2>

              <div className="space-y-6">
                {[
                  {
                    icon: <Phone size={22} className="text-indigo-600" />,
                    bg: 'bg-indigo-100',
                    title: 'Call Us',
                    lines: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
                  },
                  {
                    icon: <Mail size={22} className="text-green-600" />,
                    bg: 'bg-green-100',
                    title: 'Email Us',
                    lines: ['admissions@eduglobal.com', 'support@eduglobal.com'],
                  },
                  {
                    icon: <MapPin size={22} className="text-purple-600" />,
                    bg: 'bg-purple-100',
                    title: 'Visit Us',
                    lines: [
                      '123 Education Street, Knowledge City,',
                      'KC 10001, United States',
                    ],
                  },
                  {
                    icon: <Clock size={22} className="text-orange-600" />,
                    bg: 'bg-orange-100',
                    title: 'Office Hours',
                    lines: [
                      'Mon - Fri: 9:00 AM - 7:00 PM',
                      'Sat: 10:00 AM - 4:00 PM',
                      'Sun: Closed',
                    ],
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`${item.bg} p-3 rounded-xl shrink-0`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      {item.lines.map((line, idx) => (
                        <p key={idx} className="text-gray-600 text-sm sm:text-base">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 space-y-4">
              <button className="w-full px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-300 hover:to-primary-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg">
                <MessageCircle size={20} /> WhatsApp Chat
              </button>

              <button
                onClick={() => navigate('/consultation')}
                className="w-full px-6 py-4 bg-white hover:bg-primary-100 text-gray-700 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all border border-gray-200"
              >
                <Video size={20} className="text-indigo-400" />
                Free Consultation
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-primary-100/50 backdrop-blur-md border border-white/40 shadow-xl rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-center transition-all hover:shadow-2xl">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 text-center mb-2">
              Send Us a Message
            </h2>

            <p className="text-gray-500 text-center text-sm sm:text-base mb-8">
              We usually respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                {
                  label: 'Your Name',
                  type: 'text',
                  name: 'name',
                  placeholder: 'Enter your name',
                },
                {
                  label: 'Your Email',
                  type: 'email',
                  name: 'email',
                  placeholder: 'Enter your email',
                },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-700 shadow-sm"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-700 shadow-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-300 hover:to-primary-500 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                Send Message
              </button>

              {status && (
                <p className="text-center text-sm font-medium text-indigo-600">
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
