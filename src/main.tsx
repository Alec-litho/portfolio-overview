import { createRoot } from "react-dom/client";
import { Portfolio } from "./Portfolio.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Portfolio />
  </Provider>
);
