// src/components/PlaceholderPage.jsx
import { Construction, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PlaceholderPage({ pageName = "This Page" }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="max-w-lg text-center">
        <div className="text-6xl mb-6">
          <Construction className="mx-auto text-yellow-400 w-20 h-20 animate-bounce" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {pageName} Not Available
        </h1>
        <p className="text-gray-600 mb-6">
          We're working hard to build this page. Check back soon for updates!
        </p>
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
