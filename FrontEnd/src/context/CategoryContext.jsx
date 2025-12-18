import { createContext, useContext, useState, useEffect } from "react";
import { fetchCategoryies } from "../api/categorylist";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategoryies();
      setCategories(data);
    };

    loadCategories();
  }, []);
  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

const useCategory = () => {
  return useContext(CategoryContext);
};

export { CategoryProvider, useCategory };
