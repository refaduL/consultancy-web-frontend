// src/pages/Universities.jsx
import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { universitiesData } from "../data/universitiesData";

export default function Universities() {
  const [expanded, setExpanded] = useState(universitiesData.map((uni) => uni.id));

  const toggleExpand = (id) =>
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFAD4] via-green-100 to-[#F1E6C1] py-20 px-4 md:px-8 lg:px-16">
      <div className="container max-w-5xl mx-auto pt-12">

        <div className="text-center mb-16">
          <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Universities
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Partner Universities
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the universities we work with. Click on a university to collapse/expand details.
          </p>
        </div>

        <div className="space-y-6">
          {universitiesData.map((uni) => (
            <div
              key={uni.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 transition hover:shadow-2xl"
            >
              {/* Header */}
              <button
                onClick={() => toggleExpand(uni.id)}
                className="w-full flex justify-between items-center px-6 py-4 cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{uni.flag}</span>
                  <div className="flex flex-col items-start ">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {uni.name}
                    </h2>
                    <p className="text-gray-500">{uni.country}</p>
                  </div>
                </div>
                {expanded.includes(uni.id) ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* Details */}
              {expanded.includes(uni.id) && (
                <div className="px-6 pb-6 space-y-4 text-gray-700 bg-gray-50 rounded-b-2xl">
                  <p>{uni.description}</p>

                  {/* Programs */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Programs:</h3>
                    <div className="flex flex-wrap gap-2">
                      {uni.programs.map((prog, idx) => (
                        <span
                          key={idx}
                          className="bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {prog}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Requirements:</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">Undergraduate:</h4>
                        <ul className="list-disc list-inside">
                          {uni.requirements.undergrad.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">Graduate:</h4>
                        <ul className="list-disc list-inside">
                          {uni.requirements.grad.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <strong>Tuition:</strong> {uni.tuition || "N/A"}
                    </div>
                    <div>
                      <strong>Acceptance Rate:</strong> {uni.acceptanceRate || "N/A"}
                    </div>
                    <div>
                      <strong>Location:</strong> {uni.location || "N/A"}
                    </div>
                    <div>
                      <strong>Ranking:</strong> {uni.ranking || "N/A"}
                    </div>
                  </div>

                  {/* Website */}
                  <a
                    href={uni.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-600 font-semibold hover:underline mt-2"
                  >
                    Visit Website <ExternalLink className="ml-1 w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
