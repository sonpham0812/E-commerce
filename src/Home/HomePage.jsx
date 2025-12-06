// src/Home/HomePage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoryList,
  fetchLimitProduct,
  getCategoryList,
} from "../store/categorySlice";
import Product from "../components/Product/Product";
import { useNavigate } from "react-router-dom";
import "./HomePage.scss";
import { Col, Row } from "antd";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // categories từ redux
  const categories = useSelector(getCategoryList) || [];

  // local state chứa sản phẩm theo từng category
  const [categoryProducts, setCategoryProducts] = useState({});
  const [loadingMap, setLoadingMap] = useState({}); // loading riêng từng category

  useEffect(() => {
    dispatch(fetchCategoryList());
  }, [dispatch]);

  useEffect(() => {
    if (!categories || categories.length === 0) return;

    const toFetch = categories.slice(0, 5); // lấy 5 category đầu

    toFetch.forEach((cat) => {
      const slug = cat.slug || cat;
      if (!slug) return;

      // nếu category này đã có sản phẩm thì bỏ qua
      if (categoryProducts[slug]) return;

      setLoadingMap((s) => ({ ...s, [slug]: true }));

      // gọi redux thunk để lấy 4 sản phẩm theo limit
      dispatch(fetchLimitProduct({ category: slug, limit: 5 }))
        .then((data) => {
          setCategoryProducts((prev) => ({
            ...prev,
            [slug]: data.products || [],
          }));
        })
        .catch(() => {
          setCategoryProducts((prev) => ({ ...prev, [slug]: [] }));
        })
        .finally(() => {
          setLoadingMap((s) => ({ ...s, [slug]: false }));
        });
    });
  }, [categories, dispatch]);

  const onClickCategory = (slug) => navigate(`/${slug}`);
  const onClickViewAll = (slug) => navigate(`/${slug}`);

  return (
    <div className="home-page">
      {/* Banner */}
      <section className="home-banner">
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop"
          alt="banner"
        />
      </section>

      {/* Category Grid */}
      <section className="category-grid">
        <h2>Danh mục nổi bật</h2>
        <div className="grid">
          {categories?.slice(0, 8)?.map((c) => {
            const name = c.name || c;
            const slug = c.slug || c;

            return (
              <div
                key={slug}
                className="category-card"
                onClick={() => onClickCategory(slug)}
              >
                <div className="cat-image">
                  <img
                    src={`https://dummyimage.com/300x200/ddd/aaa&text=${encodeURIComponent(
                      name
                    )}`}
                    alt={name}
                  />
                </div>
                <div className="cat-name">{name}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured products by category */}
      <section className="featured">
        <h2>Sản phẩm nổi bật</h2>

        {categories?.slice(0, 5)?.map((c) => {
          const name = c.name || c;
          const slug = c.slug || c;
          const products = categoryProducts[slug] || [];

          return (
            <div className="featured-block" key={slug}>
              <div className="featured-header">
                <h3>{name}</h3>
                <button onClick={() => onClickViewAll(slug)}>Xem tất cả</button>
              </div>

              <Row gutter={24}>
                {loadingMap[slug] ? (
                  <p>Đang tải...</p>
                ) : products.length > 0 ? (
                  products.map((p) => (
                    <Col key={p.id} span={4.8}>
                      <Product
                        id={p.id}
                        name={p.title}
                        category={slug}
                        brand={p.brand}
                        price={p.price}
                        discount={p.discountPercentage}
                        image={p.thumbnail}
                      />
                    </Col>
                  ))
                ) : (
                  <p>Không có sản phẩm</p>
                )}
              </Row>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default HomePage;
