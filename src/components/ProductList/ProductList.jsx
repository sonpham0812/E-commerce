import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchProductsByCategory,
  getProductsList,
} from "../../store/categorySlice";
import { useEffect } from "react";
import Product from "../Product/Product";
import { Col, Row, Spin } from "antd";
import { STATUS } from "../../utils/status";
import "./ProductList.scss";

const ProductList = () => {
  const dispatch = useDispatch();
  const productList = useSelector(getProductsList);
  const productStatus = useSelector((state) => state.category.productsStatus);
  const { category } = useParams();
  useEffect(() => {
    dispatch(fetchProductsByCategory(category));
  }, [dispatch, category]);

  console.log(productStatus);
  return (
    <div className="product-list">
      <Spin
        tip="Loading product list..."
        size="large"
        spinning={productStatus !== STATUS.SUCCEEDED}
      >
        <h1>{category}</h1>
        <Row gutter={[24, 24]}>
          {productList?.products?.map((item, index) => {
            return (
              <Col key={item.id} span={4.8}>
                <Product
                  id={item.id}
                  category={category}
                  brand={item.brand}
                  name={item.title}
                  price={item.price}
                  discount={item.discountPercentage}
                  image={item.thumbnail}
                />
              </Col>
            );
          })}
        </Row>
      </Spin>
    </div>
  );
};

export default ProductList;
