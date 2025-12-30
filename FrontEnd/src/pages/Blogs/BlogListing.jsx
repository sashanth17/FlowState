import { useEffect, useState } from "react";
import { fetchBlogs } from "../../api/bloglist";
import BlogCard from "../../components/blogCard";

// MUI
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const BlogDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getBlogs = async () => {
      const response = await fetchBlogs(currentPage);
      setBlogs(response.results);
      setTotalPages(response.total_pages);
    };

    getBlogs();
  }, [currentPage]);

  const handlePageChange = (_event, value) => {
    if (value !== currentPage) setCurrentPage(value);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center mt-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            SrcImage={blog.FeatureImage}
            Title={blog.Title}
            content={blog.Content}
            category={blog.Category}
            author={blog.Author}
          />
        ))}
      </div>

      <Stack spacing={2} alignItems="center" marginY={4}>
        <Typography>Page: {currentPage}</Typography>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
    </>
  );
};

export default BlogDashboard;
