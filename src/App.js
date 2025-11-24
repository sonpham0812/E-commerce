import { BrowserRouter } from "react-router-dom";

import "./App.scss";
import { Provider } from "react-redux";
import store from "./store/store";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
