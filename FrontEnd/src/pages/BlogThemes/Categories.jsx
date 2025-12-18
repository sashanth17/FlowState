import { useCategory } from "../../context/CategoryContext";
const Categories = () => {
  const { categories } = useCategory();
  return (
    <>
      <h1>The available Categories are:</h1>

      {categories &&
        categories.map((element) => (
          <h1 key={element.id}>{element.CategoryName}</h1>
        ))}
    </>
  );
};

export default Categories;
