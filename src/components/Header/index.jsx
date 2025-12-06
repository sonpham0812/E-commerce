import { Button, Flex, Input } from "antd";
import CategoryList from "./CategoryList";
import HeaderTop from "./HeaderTop";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryList, getCategoryList } from "../../store/categorySlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import CartIcon from "../Cart/CartIcon";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(getCategoryList);

  useEffect(() => {
    dispatch(fetchCategoryList());
  }, [dispatch]);

  // sửa lại onSearch để nhảy trang tìm kiếm
  const onSearch = (value) => {
    if (value.trim() !== "") {
      navigate(`/search/${value}`);
    }
  };

  const onClick = (category) => {
    navigate(`/${category}`);
  };

  return (
    <div className="header py-m bg-main">
      <HeaderTop />
      <Flex justify="space-between" align="center">
        <Flex gap={2}>
          <CategoryList />
          <div>TempLogo</div>
        </Flex>

        {/* Search */}
        <div className="search-categories">
          <Input.Search
            placeholder="Search your preferred items here"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch} // <--- dùng hàm trên
          />

          <Flex justify="space-between">
            {categories?.slice(0, 10)?.map((item) => (
              <Button
                key={item.name}
                color="default"
                variant="link"
                onClick={() => onClick(item.slug)}
              >
                {item.name}
              </Button>
            ))}
          </Flex>
        </div>

        <CartIcon />
      </Flex>
    </div>
  );
};

export default Header;
