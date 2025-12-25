import { Placeholder } from "../components/ProfileBlocks";
import getMyBlogs from "../../../api/blogs/MyBlogs";
function ProfileBlogs() {
  const fn = async () => {
    const data = await getMyBlogs();
    console.log(data);
  };
  fn();
  return (
    <Placeholder
      title="User Blogs"
      description="User blog posts will appear here"
    />
  );
}

export default ProfileBlogs;
