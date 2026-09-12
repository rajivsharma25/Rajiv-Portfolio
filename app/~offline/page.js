"use client";

import { WifiOff, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-10 border border-gray-200 dark:border-neutral-800 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-6">
          <WifiOff size={32} />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          You&apos;re Offline
        </h1>

        <p className="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed mb-8">
          It looks like you lost your internet connection. Cached sections of this portfolio remain accessible.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-full text-sm transition-all duration-200 cursor-pointer shadow-md hover:shadow-blue-500/25"
          >
            <RefreshCw size={15} />
            <span>Retry Connection</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-900 dark:text-white font-semibold px-5 py-3 rounded-full text-sm transition-all duration-200"
          >
            <ArrowLeft size={15} />
            <span>Go to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
