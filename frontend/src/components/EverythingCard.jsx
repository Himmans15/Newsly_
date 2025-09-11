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
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <a href={url} target="_blank" rel="noopener noreferrer">
        {imgUrl && (
          <img src={imgUrl} alt={title} className="w-full h-56 object-cover" />
        )}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {description
              ? description.substring(0, 200) + "..."
              : "No description available."}
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-col gap-1">
            <p>
              <strong>Source:</strong> {source || "Unknown"}
            </p>
            <p>
              <strong>Author:</strong> {author || "Anonymous"}
            </p>
            <p>
              <strong>Published:</strong>{" "}
              {new Date(publishedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default EverythingCard;
