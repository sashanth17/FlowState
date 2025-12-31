import { useNavigate } from "react-router-dom";

const BlogCard = ({
  id,
  SrcImage,
  Title,
  content,
  category = null,
  author = null,
  updateFeature = false,
}) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/blogs/${id}`);
  };

  // Logic to truncate content by word count
  const truncateContent = (text, limit) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  };

  return (
    <div className="flex flex-col bg-white shadow-md border border-gray-200 rounded-xl overflow-hidden w-full max-w-sm">
      <img src={SrcImage} alt={Title} className="w-full h-48 object-cover" />

      <div className="p-4 flex flex-col flex-grow">
        <h5
          className="text-gray-900 font-bold text-xl leading-tight cursor-pointer"
          onClick={goToDetail}
        >
          {Title}
        </h5>
        <span className="text-sm text-gray-500 mb-2">{category}</span>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <span className="font-medium text-gray-700">Author:</span>
          <span className="text-gray-500">{author}</span>
        </div>

        {/* Updated Content Section */}
        <p className="text-gray-700 text-sm flex-grow">
          {truncateContent(content, 50)}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
