import { Badge, Button, Flex, Input } from "antd";
import CategoryList from "./CategoryList";
import HeaderTop from "./HeaderTop";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryList, getCategoryList } from "../../store/categorySlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./index.scss";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(getCategoryList);
  useEffect(() => {
    dispatch(fetchCategoryList());
  }, [dispatch]);
  const onSearch = () => {};
  const onClick = (category) => {
    navigate(`/category/${category}`);
  };
  return (
    <div className="header py-m bg-main">
      <HeaderTop />
      <Flex justify="space-between" align="center">
        <Flex gap={2}>
          <CategoryList />
          <div>TempLogo</div>
        </Flex>
        <div className="search-categories">
          <Input.Search
            placeholder="Search your preferred items here"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
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
        <Badge count={0} showZero>
          <ShoppingCartOutlined style={{ fontSize: "24px", color: "#fff" }} />
        </Badge>
      </Flex>
    </div>
  );
};

export default Header;
