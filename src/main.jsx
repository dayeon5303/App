import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // HashRouter는 나중에 선택
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter basename="/App">
      <App />
    </BrowserRouter>
  </Provider>
);
