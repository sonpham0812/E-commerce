import { useDispatch, useSelector } from "react-redux";
import { Button, Flex, Table } from "antd";
import {
  removeItem,
  clearCart,
  increaseQty,
  decreaseQty,
} from "../../store/cartSlice";
import { useState } from "react";
import "./CartPage.scss";

const CartPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const [selectedItems, setSelectedItems] = useState([]);

  // ----- Select rows -----
  const rowSelection = {
    selectedRowKeys: selectedItems,
    onChange: (selectedRowKeys) => {
      setSelectedItems(selectedRowKeys);
    },
  };

  // ----- Table Columns -----
  const columns = [
    {
      title: "S.N.",
      dataIndex: "sn",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Product",
      dataIndex: "name",
    },
    {
      title: "Unit Price",
      dataIndex: "price",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (quantity, record) => (
        <Flex align="center" gap={10}>
          <Button size="small" onClick={() => dispatch(decreaseQty(record.id))}>
            -
          </Button>

          <span>{quantity}</span>

          <Button size="small" onClick={() => dispatch(increaseQty(record.id))}>
            +
          </Button>
        </Flex>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "price",
      render: (_, record) => `$${(record.price * record.quantity).toFixed(2)}`,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Button
          type="link"
          danger
          onClick={() => dispatch(removeItem(record.id))}
        >
          Delete
        </Button>
      ),
    },
  ];

  // ----- Total Amount -----
  const totalAmount = items
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>

      <div className="cart-box">
        <Table
          rowKey="id"
          dataSource={items}
          columns={columns}
          pagination={false}
          rowSelection={rowSelection}
        />

        <div className="cart-bottom">
          <Button danger onClick={() => dispatch(clearCart())}>
            🗑 CLEAR CART
          </Button>

          <div className="total-section">
            Total ({selectedItems.length} selected):{" "}
            <span className="total-price">${totalAmount.toFixed(2)}</span>
            <Button
              type="primary"
              size="large"
              className="checkout-btn"
              disabled={selectedItems.length === 0}
            >
              Check Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
