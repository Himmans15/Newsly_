import React from "react";

function EverythingCard({
  title,
  description,
  imgUrl,
  publishedAt,
  url,
  author,
  source,
}) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg duration-300">
      {imgUrl && (
        <img src={imgUrl} alt={title} className="w-full h-48 object-cover" />
      )}

      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">
          {title}
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {description?.substring(0, 200) || "No description available."}
        </p>

        <div className="mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            <span className="font-semibold">Source:</span>{" "}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400"
            >
              {source?.substring(0, 70)}
            </a>
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Author:</span> {author || "Unknown"}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Published At:</span>{" "}
            {new Date(publishedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EverythingCard;
