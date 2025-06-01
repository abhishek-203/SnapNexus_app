import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// ReactDOM.createRoot(document.getElementById('root')!).render(
//     <App/>


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
