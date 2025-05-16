"use client"
import AxiosInstance from "@/components/AxiosInstance";
import axios from "axios";
import { useEffect, useState } from "react";

type Article = {
  title: string;
  description: string;
  url: string;
  published_at:string;
};

const CrimeNews = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

const fetchNews = async (refresh = false) => {
  setLoading(true); 
  try {
    const res = await AxiosInstance.get(`/crime-news/`, {
      params: {
        refresh: refresh ? "true" : "false", 
      },
    });
    console.log(res.data)
    setNews(res.data); 
  } catch (e) {
    console.error("Error fetching news", e); 
  } finally {
    setLoading(false); 
  }
};


  useEffect(() => {
    fetchNews(); // load cached news on first load
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">NYC Crime News</h2>
      <button
        onClick={() => fetchNews(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        disabled={loading}
      >
        {loading ? "Refreshing..." : "Refresh News"}
      </button>

      <ul className="space-y-2">
        {news.length ? (
          news.map((article, idx) => (
            <li key={idx}>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline"
              >
                {article.title}
              </a>
              <p className="text-sm">{article.description}</p>
              <p className="text-sm">{article.published_at}</p>
            </li>
          ))
        ) : (
          <p>No news found.</p>
        )}
      </ul>
    </div>
  );
};

export default CrimeNews;
