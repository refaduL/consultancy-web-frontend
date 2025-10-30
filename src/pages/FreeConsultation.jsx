// src/pages/ConsultationForm.jsx
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Video } from 'lucide-react';

export default function ConsultationForm() {
  const [sectionsOpen, setSectionsOpen] = useState({
    personal: true,
    academic: false,
    tests: false,
    study: false,
    financial: false,
    work: false,
    research: false,
    additional: false,
    supporting: false,
    preferences: false,
    previous: false,
    communication: false,
  });

  const toggleSection = (section) =>
    setSectionsOpen((prev) => ({ ...prev, [section]: !prev[section] }));

  const sectionHeader = (title, key) => (
    <button
      type="button"
      onClick={() => toggleSection(key)}
      className="w-full flex justify-between items-center py-4 px-2 border-b border-gray-200 hover:bg-gray-50 transition"
    >
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {sectionsOpen[key] ? (
        <ChevronUp className="w-5 h-5 text-gray-600" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );

  const inputStyle =
    "w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/80 focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition";

  return (
    <div className="min-h-screen bg-neutral-50 py-20 px-4 md:px-8 lg:px-16">
        <div className="container max-w-7xl mx-auto px-4 py-12">

        <h1 className="text-4xl font-bold text-gray-900 mb-3 text-center">
          Free Consultation Form
        </h1>
        <p className="text-gray-500 text-center mb-10">
          Fill in your details carefully to help us match you with the best
          opportunities.
        </p>

        <div className="grid lg:grid-cols-3 gap-12">

            {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              
              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <Phone className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Call Us</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-gray-600">+1 (555) 987-6543</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <Mail className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Us</h3>
                    <p className="text-gray-600">admissions@eduglobal.com</p>
                    <p className="text-gray-600">support@eduglobal.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <MapPin className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Visit Us</h3>
                    <p className="text-gray-600">
                      123 Education Street<br />
                      Knowledge City, KC 10001<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-orange-100 p-3 rounded-lg mr-4">
                    <Clock className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Office Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 7:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-8 space-y-4">
                <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 flex items-center justify-center">
                  <MessageCircle size={20} className="mr-2" />
                  WhatsApp Chat
                </button>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center justify-center">
                  <Video size={20} className="mr-2" />
                  Video Call
                </button>
              </div>
            </div>
          </div>

        <form className="space-y-6 bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 lg:col-span-2">
          {/* --- PERSONAL INFO --- */}
          {sectionHeader("Personal Information", "personal")}
          {sectionsOpen.personal && (
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <input placeholder="Full Name *" className={inputStyle} required />
              <input placeholder="Email Address *" className={inputStyle} required />
              <input placeholder="Phone Number *" className={inputStyle} required />
              <input placeholder="Country of Residence *" className={inputStyle} required />
              <input type="date" placeholder="Date of Birth" className={inputStyle} />
              <select className={inputStyle}>
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <input placeholder="Passport Number (optional)" className={inputStyle} />
            </div>
          )}

          {/* --- ACADEMIC --- */}
          {sectionHeader("Academic Background", "academic")}
          {sectionsOpen.academic && (
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <select className={inputStyle}>
                <option>Highest Level of Education</option>
                <option>High School</option>
                <option>Bachelor</option>
                <option>Master</option>
                <option>PhD</option>
              </select>
              <input placeholder="Current Degree / Qualification" className={inputStyle} />
              <input placeholder="Field of Study / Major" className={inputStyle} />
              <input placeholder="Current University / Institution" className={inputStyle} />
              <input placeholder="GPA / CGPA / Percentage" className={inputStyle} />
              <select className={inputStyle}>
                <option>Grading Scale</option>
                <option>4.0</option>
                <option>5.0</option>
                <option>10.0</option>
                <option>100%</option>
              </select>
              <input placeholder="Year of Graduation" className={inputStyle} />
            </div>
          )}

          {/* --- LANGUAGE TESTS --- */}
          {sectionHeader("English & Other Language Tests", "tests")}
          {sectionsOpen.tests && (
            <div className="space-y-4 mt-2">
              <div className="grid md:grid-cols-2 gap-4">
                <input placeholder="IELTS Overall Band" className={inputStyle} />
                <input placeholder="TOEFL iBT / PTE / Duolingo Score" className={inputStyle} />
              </div>
              <input placeholder="Other Language Tests (German, French, etc.)" className={inputStyle} />
              <textarea
                placeholder="Details or Section-wise Scores (optional)"
                rows={3}
                className={inputStyle}
              />
            </div>
          )}

          {/* --- STUDY PREFERENCES --- */}
          {sectionHeader("Study Preferences", "study")}
          {sectionsOpen.study && (
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <input placeholder="Interested Country *" className={inputStyle} required />
              <input placeholder="Secondary Country" className={inputStyle} />
              <select className={inputStyle}>
                <option>Preferred Program Level *</option>
                <option>Bachelor</option>
                <option>Master</option>
                <option>MBA</option>
                <option>PhD</option>
              </select>
              <input placeholder="Preferred Field of Study *" className={inputStyle} required />
              <input placeholder="Specific Program / Major" className={inputStyle} />
              <select className={inputStyle}>
                <option>Preferred Intake *</option>
                <option>Fall 2025</option>
                <option>Spring 2026</option>
                <option>Summer 2026</option>
              </select>
            </div>
          )}

          {/* --- FINANCIAL --- */}
          {sectionHeader("Financial Information", "financial")}
          {sectionsOpen.financial && (
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <select className={inputStyle}>
                <option>Funding Source *</option>
                <option>Self-Funded</option>
                <option>Family Sponsored</option>
                <option>Employer Sponsored</option>
                <option>Need Full Scholarship</option>
              </select>
              <select className={inputStyle}>
                <option>Budget per Year</option>
                <option>Under $5,000</option>
                <option>$5,000 - $10,000</option>
                <option>$10,000 - $20,000</option>
                <option>$20,000 - $30,000</option>
                <option>$30,000+</option>
              </select>
              <select className={inputStyle}>
                <option>Scholarship Interest</option>
                <option>Yes</option>
                <option>No</option>
                <option>Maybe</option>
              </select>
            </div>
          )}

          {/* --- WORK EXPERIENCE --- */}
          {sectionHeader("Work Experience", "work")}
          {sectionsOpen.work && (
            <div className="space-y-4 mt-2">
              <div className="grid md:grid-cols-2 gap-4">
                <select className={inputStyle}>
                  <option>Years of Work Experience</option>
                  <option>0</option>
                  <option>1-2</option>
                  <option>3-5</option>
                  <option>5-10</option>
                  <option>10+</option>
                </select>
                <input placeholder="Current Job Title / Position" className={inputStyle} />
              </div>
              <input placeholder="Company / Organization Name" className={inputStyle} />
              <input placeholder="Industry" className={inputStyle} />
              <textarea placeholder="Relevant Work Experience Details" rows={3} className={inputStyle} />
            </div>
          )}

          {/* --- RESEARCH --- */}
          {sectionHeader("Research Experience", "research")}
          {sectionsOpen.research && (
            <div className="space-y-4 mt-2">
              <select className={inputStyle}>
                <option>Do you have Research Experience?</option>
                <option>Yes</option>
                <option>No</option>
              </select>
              <input placeholder="Publications (if any)" className={inputStyle} />
              <textarea placeholder="Research Interests" rows={3} className={inputStyle} />
              <input placeholder="Supervisor / Mentor References (optional)" className={inputStyle} />
            </div>
          )}

          {/* --- ADDITIONAL --- */}
          {sectionHeader("Additional Information", "additional")}
          {sectionsOpen.additional && (
            <div className="space-y-4 mt-2">
              <textarea placeholder="Extracurricular Activities" rows={3} className={inputStyle} />
              <textarea placeholder="Volunteer Work / Community Service" rows={3} className={inputStyle} />
              <textarea placeholder="Awards & Achievements" rows={3} className={inputStyle} />
              <textarea placeholder="Certifications & Training" rows={3} className={inputStyle} />
              <textarea placeholder="Motivation / Statement of Purpose" rows={3} className={inputStyle} />
              <textarea placeholder="Career Goals" rows={3} className={inputStyle} />
              <textarea placeholder="Special Circumstances / Additional Notes" rows={3} className={inputStyle} />
            </div>
          )}

          {/* --- SUPPORTING --- */}
          {sectionHeader("Supporting Links", "supporting")}
          {sectionsOpen.supporting && (
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <input placeholder="LinkedIn Profile URL" className={inputStyle} />
              <input placeholder="Portfolio / Personal Website URL" className={inputStyle} />
              <input placeholder="GitHub / Professional Profile URL" className={inputStyle} />
            </div>
          )}

          {/* --- PREFERENCES --- */}
          {sectionHeader("Preferences & Requirements", "preferences")}
          {sectionsOpen.preferences && (
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <select className={inputStyle}>
                <option>Preferred University Type</option>
                <option>Research University</option>
                <option>Technical School</option>
                <option>Business School</option>
              </select>
              <select className={inputStyle}>
                <option>Campus Location Preference</option>
                <option>Urban</option>
                <option>Suburban</option>
                <option>Rural</option>
              </select>
              <select className={inputStyle}>
                <option>University Ranking Preference</option>
                <option>Top 50</option>
                <option>Top 100</option>
                <option>Top 200</option>
                <option>No Preference</option>
              </select>
              <select className={inputStyle}>
                <option>Accommodation Preference</option>
                <option>On-Campus</option>
                <option>Off-Campus</option>
                <option>Homestay</option>
              </select>
            </div>
          )}

          {/* --- PREVIOUS --- */}
          {sectionHeader("Previous Visa / Application History", "previous")}
          {sectionsOpen.previous && (
            <div className="space-y-4 mt-2">
              <select className={inputStyle}>
                <option>Previous Visa Applications?</option>
                <option>Yes</option>
                <option>No</option>
              </select>
              <select className={inputStyle}>
                <option>Any Visa Rejections?</option>
                <option>Yes</option>
                <option>No</option>
              </select>
              <textarea placeholder="If yes, country & reason" rows={3} className={inputStyle} />
              <select className={inputStyle}>
                <option>Previously Applied to Universities?</option>
                <option>Yes</option>
                <option>No</option>
              </select>
              <textarea placeholder="If yes, details" rows={3} className={inputStyle} />
            </div>
          )}

          {/* --- COMMUNICATION --- */}
          {sectionHeader("Communication Preferences", "communication")}
          {sectionsOpen.communication && (
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <select className={inputStyle}>
                <option>Preferred Contact Method</option>
                <option>Email</option>
                <option>Phone</option>
                <option>WhatsApp</option>
              </select>
              <select className={inputStyle}>
                <option>Best Time to Contact</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
              <select className={inputStyle}>
                <option>How did you hear about us?</option>
                <option>Social Media</option>
                <option>Friend</option>
                <option>Website</option>
                <option>Advertisement</option>
              </select>
            </div>
          )}

          {/* --- SUBMIT BUTTON --- */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-300 hover:from-primary-600 hover:to-primary-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Submit Consultation Request
            </button>
          </div>
        </form>

        </div>
      </div>
    </div>
  );
}
