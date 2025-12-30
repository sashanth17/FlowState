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
        {drafts.length == 0 && <h1>No drafts found</h1>}
        {drafts.map((blog, index) => (
          <BlogCard
            key={index}
            SrcImage={blog.FeatureImage}
            Title={blog.Title}
            content={blog.Content}
            category={blog.Category}
            author={blog.Author}
            id={blog.id}
          />
        ))}
      </div>
    </>
  );
};

export default DraftPage;
