import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer/Footer.jsx";
import ProductList from "./components/ProductList/ProductList";
import CartPage from "./components/CartPage/CartPage";
import ProductDetail from "./components/ProductDetail/ProductDetail.jsx";
import SearchResult from "./SearchResult/SearchResult";
import HomePage from "./Home/HomePage.jsx";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/search/:keyword" element={<SearchResult />} />
          <Route path="/:category" element={<ProductList />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
