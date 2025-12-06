import { useEffect, useState } from "react";
import "./ProductDetail.scss";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetail } from "../../store/productSlice";
import { Spin } from "antd";
import { STATUS } from "../../utils/status";
import { addToCart } from "../../store/cartSlice";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.product.productInfo);
  const productsStatus = useSelector((state) => state.product.productStatus);
  const { id } = useParams();

  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (productDetail?.images?.length > 0) {
      setMainImage(productDetail.images[0]);
    }
  }, [productDetail]);

  const newPrice =
    (productDetail.price * (100 - productDetail.discountPercentage)) / 100;

  const decrease = () => quantity > 1 && setQuantity(quantity - 1);
  const increase = () => setQuantity(quantity + 1);

  // Hàm thêm vào giỏ
  const handleAddToCart = () => {
    if (!productDetail) return;

    dispatch(
      addToCart({
        id: productDetail.id,
        name: productDetail.title,
        price: newPrice,
        image: mainImage,
        quantity: quantity,
      })
    );
  };

  return (
    <Spin
      tip="Loading product details..."
      size="large"
      spinning={productsStatus !== STATUS.SUCCEEDED}
    >
      <div className="product-wrapper">
        <div className="product-page">
          <div className="left">
            <div className="main-image">
              <img src={mainImage} alt="product" draggable={false} />
            </div>

            <div className="image-list">
              {productDetail.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={`thumb ${mainImage === img ? "active" : ""}`}
                  onClick={() => setMainImage(img)}
                  alt="thumb"
                  draggable={false}
                />
              ))}
            </div>
          </div>

          <div className="right">
            <h2>{productDetail.title}</h2>

            <p className="sub">{productDetail.description}</p>

            <div className="info">
              <span>{`Rating: ${productDetail.rating}`}</span>
              {/* <span>{`Brand: ${productDetail.brand}`}</span> */}
              <span>{`Category: ${productDetail.category}`}</span>
            </div>

            <div className="price-box">
              <div className="line old">{productDetail.price?.toFixed(2)}</div>

              <div className="line">
                <span className="new">{Number(newPrice).toFixed(2)}</span>
                <span className="discount">{`${productDetail.discountPercentage}% OFF`}</span>
              </div>
            </div>

            <div className="quantity-box">
              <span>{`Quantity: ${productDetail.stock}`}</span>

              <button onClick={decrease}>-</button>
              <span className="number">{quantity}</span>
              <button onClick={increase}>+</button>
            </div>

            <div className="btn-group">
              <button className="add" onClick={handleAddToCart}>
                <FiShoppingCart style={{ marginRight: "6px" }} />
                Add To Cart
              </button>
              <button className="buy">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default ProductDetail;
