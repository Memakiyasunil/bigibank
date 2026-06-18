import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BlogDetail() {
  const { slug } = useParams();
  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-royal-DEFAULT hover:underline mb-8 font-medium">
          <ArrowLeft size={16} />Back to Blog
        </Link>
        <div className="bg-white rounded-3xl overflow-hidden shadow-card border border-gray-100">
          <div className="h-56 bg-gradient-navy flex items-center justify-center">
            <span className="text-white/30 font-display text-2xl font-bold">BigiBank Blog</span>
          </div>
          <div className="p-8">
            <span className="badge badge-info mb-4">Banking</span>
            <h1 className="font-display text-3xl font-bold text-navy-DEFAULT mb-4">{slug?.replace(/-/g, ' ')?.replace(/\b\w/g, c => c.toUpperCase())}</h1>
            <p className="text-gray-500 leading-relaxed">
              This is a detailed article about financial topics to help you make better financial decisions.
              BigiBank is committed to financial education for all Indians.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
