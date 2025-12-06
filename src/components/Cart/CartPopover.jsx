import { useSelector } from "react-redux";
import { Button } from "antd";
import "./CartPopover.scss";

const CartPopover = ({ onViewCart }) => {
  const cartItems = useSelector((state) => state.cart?.items || []);
  const items = cartItems.slice(0, 10);

  return (
    <div className="cart-modal">
      <h4 className="title">Recently Added Items</h4>

      <div className="items">
        {items.map((item, index) => (
          <div className="item" key={index}>
            <img src={item.image} alt={item.name} className="item-img" />
            <div className="info">
              <p className="name">{item.name}</p>
              <p className="price">
                {item.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                ₫
              </p>
            </div>
          </div>
        ))}
      </div>

      {cartItems.length > 10 && (
        <p className="more">{cartItems.length - 10} more items...</p>
      )}

      <Button
        type="primary"
        block
        style={{ marginTop: 10 }}
        onClick={onViewCart}
      >
        View My Shopping Cart
      </Button>
    </div>
  );
};

export default CartPopover;
