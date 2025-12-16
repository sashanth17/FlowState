const BlogCard = ({ SrcImage, Title, content, category, author }) => {
  return (
    <div className="flex flex-col bg-white shadow-md border border-gray-200 rounded-xl overflow-hidden w-full max-w-sm">
      <img src={SrcImage} alt={Title} className="w-full h-48 object-cover" />

      <div className="p-4 flex flex-col flex-grow">
        {/* Title + Category */}
        <h5 className="text-gray-900 font-bold text-xl leading-tight">
          {Title}
        </h5>
        <span className="text-sm text-gray-500 mb-2">{category}</span>

        {/* Author row */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <span className="font-medium text-gray-700">Author:</span>
          <span className="text-gray-500">{author}</span>
        </div>

        {/* Content */}
        <p className="text-gray-700 text-sm flex-grow line-clamp-3">
          {content}
        </p>

        {/* Button */}
        <button className="mt-4 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2">
          Read more
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
