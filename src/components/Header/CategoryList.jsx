import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryList, getCategoryList } from "../../store/categorySlice";
import { useEffect } from "react";
import { Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategoryList);
  const categoryItems = categories?.map(item => ({ label: item.name, key: item.slug }))
  const navigate = useNavigate()

  const onClick = ({ key }) => {
    navigate(`/category/${key}`)
  }

  useEffect(() => {
    dispatch(fetchCategoryList());
  }, [dispatch]);

  return (
    <Dropdown menu={{ categoryItems, onClick }}>
      <a href="/" onClick={e => e.preventDefault()}>
        <MenuOutlined style={{ fontSize: '24px' }} />
      </a>
    </Dropdown>
  )
};

export default CategoryList;
