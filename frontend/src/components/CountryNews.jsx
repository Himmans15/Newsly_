import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EverythingCard from "./EverythingCard";
import Loader from "./Loader";

function CountryNews() {
  const { iso } = useParams();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const pageSize = 6;

  const handlePrev = () => setPage((prev) => prev - 1);
  const handleNext = () => setPage((prev) => prev + 1);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(
      `https://news-aggregator-dusky.vercel.app/country/${iso}?page=${page}&pageSize=${pageSize}`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((json) => {
        if (json.success) {
          setTotalResults(json.data.totalResults);
          setData(json.data.articles);
        } else {
          setError(json.message || "An error occurred");
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to fetch news. Please try again later.");
      })
      .finally(() => setIsLoading(false));
  }, [page, iso]);

  return (
    <div className="px-4 md:px-12 py-8">
      {error && <div className="text-red-500 text-center mb-6">{error}</div>}

      {isLoading ? (
        <Loader />
      ) : data.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {data.map((article, index) => (
            <EverythingCard
              key={index}
              title={article.title}
              description={article.description}
              imgUrl={article.urlToImage}
              publishedAt={article.publishedAt}
              url={article.url}
              author={article.author}
              source={article.source.name}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No news articles found for this country.
        </p>
      )}

      {/* Pagination Controls */}
      {!isLoading && data.length > 0 && (
        <div className="flex justify-center items-center gap-10 mt-10">
          <button
            onClick={handlePrev}
            disabled={page <= 1}
            className="pagination-btn px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            &larr; Prev
          </button>
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            {page} of {Math.ceil(totalResults / pageSize)}
          </span>
          <button
            onClick={handleNext}
            disabled={page >= Math.ceil(totalResults / pageSize)}
            className="pagination-btn px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
}

export default CountryNews;
