import { Badge, Popover } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import CartPopover from "./CartPopover";
import { useSelector } from "react-redux";
import "./CartPopover.scss";
import { useNavigate } from "react-router-dom";

const CartIcon = () => {
  const cartItems = useSelector((state) => state.cart?.items || []);
  const count = cartItems.length;
  const navigate = useNavigate();

  const handleGoToCart = () => {
    navigate("/cart");
  };

  return (
    <Popover
      placement="bottomRight"
      trigger="hover"
      overlayClassName="cart-popover"
      content={<CartPopover onViewCart={handleGoToCart} />}
    >
      <div style={{ cursor: "pointer" }}>
        <Badge count={count} showZero>
          <ShoppingCartOutlined style={{ fontSize: 26, color: "#fff" }} />
        </Badge>
      </div>
    </Popover>
  );
};

export default CartIcon;
