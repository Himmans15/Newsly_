import React, { useState, useEffect } from "react";
import EverythingCard from "./EverythingCard";

import Loader from "./Loader";

const AllNews = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const pageSize = 12;

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => prev + 1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `http://localhost:3000/all_news?page=${page}&pageSize=${pageSize}`
        );
        if (!res.ok) throw new Error("Network response was not ok");

        const result = await res.json();

        if (result.success) {
          setArticles(result.data.articles);
          setTotalResults(result.data.totalResults);
        } else {
          setError(result.message || "An unknown error occurred");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch news. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return (
    <div className="min-h-screen px-4 md:px-10 lg:px-20 py-10">
      {error && (
        <div className="bg-red-100 text-red-800 border border-red-300 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article, idx) => (
              <EverythingCard
                key={idx}
                title={article.title}
                description={article.description}
                imgUrl={article.urlToImage}
                publishedAt={article.publishedAt}
                url={article.url}
                author={article.author}
                source={article.source?.name}
              />
            ))}
          </div>

          <div className="pagination mt-12 flex justify-center items-center gap-10">
            <button
              onClick={handlePrev}
              disabled={page <= 1}
              className={`px-4 py-2 rounded text-white font-medium transition ${
                page <= 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              aria-label="Previous page"
            >
              &larr; Prev
            </button>

            <p className="font-medium text-gray-700 dark:text-gray-300">
              Page {page} of {Math.ceil(totalResults / pageSize)}
            </p>

            <button
              onClick={handleNext}
              disabled={page >= Math.ceil(totalResults / pageSize)}
              className={`px-4 py-2 rounded text-white font-medium transition ${
                page >= Math.ceil(totalResults / pageSize)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              aria-label="Next page"
            >
              Next &rarr;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllNews;
