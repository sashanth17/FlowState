import { useEffect, useState } from "react";
import { fetchBlogs } from "../../api/bloglist";
import BlogCard from "../../components/blogCard";

const BlogDashboard = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await fetchBlogs();
        console.log(response);
        setBlogs(response); // save blogs in state
      } catch (error) {
        console.log("Error fetching blogs:", error);
      }
    };

    getBlogs();
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-6 justify-center mt-6">
        {blogs.map((blog, index) => (
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

export default BlogDashboard;
