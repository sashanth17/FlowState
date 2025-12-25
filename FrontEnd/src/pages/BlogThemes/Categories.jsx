import { useCategory } from "../../context/CategoryContext";
import BlogCard from "../../components/blogCard";
const Categories = () => {
  const { categories } = useCategory();
  console.table(categories[1]);
  return (
    <div className="flex flex-wrap gap-6 justify-center mt-6">
      {categories &&
        categories.map((element) => (
          <BlogCard
            key={element.id}
            SrcImage={element.CategoryImage}
            Title={element.CategoryName}
            content={element.CategoryDescription}
          />
        ))}
    </div>
  );
};

export default Categories;
