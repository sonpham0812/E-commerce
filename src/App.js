import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import HeaderTop from "./components/Header/HeaderTop";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <HeaderTop />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
