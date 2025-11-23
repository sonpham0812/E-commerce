import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryList, getCategoryList } from "../../store/categorySlice";
import { useEffect } from "react";

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategoryList);

  useEffect(() => {
    dispatch(fetchCategoryList());
  }, [dispatch]);

  return <div></div>;
};
