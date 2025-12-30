import getMyBlogs from "../../../api/blogs/MyBlogs";
import { useState, useEffect } from "react";
import BlogCard from "../../../components/blogCard";

function ProfileBlogs() {
  const [blogs, setMyPost] = useState([]); // empty array initially

  useEffect(() => {
    async function fetchBlogs() {
      const data = await getMyBlogs();
      setMyPost(data);
    }
    fetchBlogs();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 text-center py-14 flex flex-wrap gap-6 justify-center mt-6">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id} // preferable over index
          SrcImage={blog.FeatureImage}
          Title={blog.Title}
          content={blog.Content}
          category={blog.Category}
          author={blog.Author}
          id={blog.id}
        />
      ))}
    </div>
  );
}

export default ProfileBlogs;
