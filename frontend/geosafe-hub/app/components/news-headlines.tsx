"use client";

import AxiosInstance from "@/components/AxiosInstance";
import { useState, useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

type Article = {
  title: string;
  description: string;
  url: string;
  published_at: string;
};

export default function NewsHeadlines() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async (refresh = false) => {
    setLoading(true);
    try {
      const res = await AxiosInstance.get(`/crime-news/`, {
        params: {
          refresh: refresh ? "true" : "false",
        },
      });
      setNews(res.data);
      setLoading(false);
    } catch (e) {
      setError("Failed to load news. Please try again.");
      setLoading(false);
    }
  };

  const refreshHeadlines = () => {
    fetchNews(true);
  };

  // Fetch news on load
  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg max-w-md mx-auto">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
          <h3 className="text-lg font-bold text-white">Latest Safety News</h3>
        </div>
        <button
          onClick={refreshHeadlines}
          disabled={loading}
          className="p-1 text-white/70 hover:text-white transition-colors rounded-full"
          aria-label="Refresh headlines"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {error ? (
        <div className="bg-red-500/20 text-red-200 p-3 rounded-lg text-sm">
          {error}
        </div>
      ) : loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-white/20 rounded w-3/4 mb-1"></div>
              <div className="h-4 bg-white/20 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : news.length ? (
        <ul className="space-y-3 list-disc pl-5">
          {news.map((article, idx) => (
            <li key={idx} className="space-y-2">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-blue-500 hover:text-blue-700"
              >
                {article.title}
              </a>
              <p className="text-xs text-white/70">
                {new Date(article.published_at).toLocaleDateString()}
              </p>
              <p className="text-sm text-white/90">{article.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No news available.</p>
      )}
    </div>
  );
}
