"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-300">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl"></div>
            <div className="relative bg-red-100 dark:bg-red-900/30 p-6 rounded-full">
              <AlertTriangle className="w-16 h-16 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          We encountered an unexpected error. Don&apos;t worry, it&apos;s not
          your fault. Please try again or return to the homepage.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === "development" && error?.message && (
          <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-left">
            <p className="text-sm font-mono text-red-800 dark:text-red-300 break-all">
              {error.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-violet-700 active:scale-95 shadow-md hover:shadow-lg"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-violet-600 text-violet-600 dark:text-violet-400 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-violet-600 hover:text-white dark:hover:text-white active:scale-95"
          >
            <Home size={18} />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
