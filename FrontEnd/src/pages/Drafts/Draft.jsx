import { useState, useEffect } from "react";
import fetchDrafts from "../../api/blogs/Drafts";
import BlogCard from "../../components/blogCard";
const BASE_URL = import.meta.env.VITE_API_URL;

const DraftPage = () => {
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    const loadDrafts = async () => {
      try {
        const data = await fetchDrafts();
        setDrafts(data);
      } catch (err) {
        console.error("Failed to fetch drafts", err);
      }
    };

    loadDrafts();
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-6 justify-center mt-6">
        {drafts.map((blog, index) => (
          <BlogCard
            key={index}
            SrcImage={
              blog.FeatureImage
                ? `http://127.0.0.1:8000${blog.FeatureImage}`
                : "https://via.placeholder.com/300"
            }
            Title={blog.Title}
            content={blog.Content}
            category={blog.Category}
            author={blog.Author}
          />
        ))}
      </div>
    </>
  );
};

export default DraftPage;
