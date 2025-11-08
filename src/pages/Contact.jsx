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
    <div className="min-h-screen bg-gradient-default pt-24 pb-16">
      <div className="max-w-6xl mx-auto pt-6">
        
        {/* --- Header --- */}
        <header className="text-center mb-16">
          <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Contact Us
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Let’s Talk
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you’re a student or partner, our team is just one message away.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-10">
          
          {/* Contact Information Card */}
          <div className="bg-primary-100/50 backdrop-blur-md border border-white/40 shadow-xl rounded-3xl p-10 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <Phone className="text-indigo-600" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Call Us</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-gray-600">+1 (555) 987-6543</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Mail className="text-green-600" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Us</h3>
                    <p className="text-gray-600">admissions@eduglobal.com</p>
                    <p className="text-gray-600">support@eduglobal.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <MapPin className="text-purple-600" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Visit Us</h3>
                    <p className="text-gray-600">
                      123 Education Street, Knowledge City,<br /> 
                      KC 10001, United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Clock className="text-orange-600" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Office Hours</h3>
                    <p className="text-gray-600">
                      Mon - Fri: 9:00 AM - 7:00 PM<br />
                      Sat: 10:00 AM - 4:00 PM<br />
                      Sun: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-4">
              <button className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-300 hover:from-primary-500 hover:to-primary-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg">
                <MessageCircle size={20} /> WhatsApp Chat
              </button>
              <button 
                onClick={() => navigate("/consultation")}
                className="w-full px-8 py-4 bg-white hover:bg-primary-100 text-gray-700 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-soft border border-gray-200">
                <Video size={20} className="text-indigo-400" /> 
                Free Consultation
              </button>
            </div>
          </div>

          {/* Email Form Card */}
          <div className="bg-primary-100/50 backdrop-blur-md border border-white/40 shadow-xl rounded-3xl p-10 hover:shadow-2xl transition-all duration-300 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">
              Send Us a Message
            </h2>
            <p className="text-gray-500 text-center mb-8">
              We usually respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-700 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-700 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows="5"
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-700 shadow-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-300 hover:from-primary-500 hover:to-primary-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
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
    </div>
  );
}
