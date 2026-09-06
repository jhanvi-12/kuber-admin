import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-20 pb-16 min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-lg mx-auto px-4 text-center">
        <p className="text-7xl sm:text-8xl font-bold text-purple-700 mb-4">404</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-purple-700 text-white rounded-full font-medium hover:bg-purple-800 transition-colors"
          >
            <Home className="h-5 w-5" />
            Go to Home
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 py-3 px-6 border border-purple-200 text-purple-700 rounded-full font-medium hover:bg-purple-50 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
