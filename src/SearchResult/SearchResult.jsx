import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spin, Row, Col } from "antd";
import Product from "../components/Product/Product";

const SearchResult = () => {
  const { keyword } = useParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/search?q=${keyword}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      });
  }, [keyword]);

  return (
    <Spin spinning={loading} tip="Đang tìm kiếm...">
      <h1>Kết quả tìm kiếm: {keyword}</h1>

      <Row gutter={[24, 24]}>
        {products.map((item) => (
          <Col key={item.id} span={4}>
            <Product
              id={item.id}
              name={item.title}
              category={item.category}
              brand={item.brand}
              price={item.price}
              discount={item.discountPercentage}
              image={item.thumbnail}
            />
          </Col>
        ))}
      </Row>

      {!loading && products.length === 0 && <p>Không tìm thấy sản phẩm nào</p>}
    </Spin>
  );
};

export default SearchResult;
