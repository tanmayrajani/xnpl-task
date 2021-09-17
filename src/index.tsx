import { render } from "react-dom";

import { createInstance } from "./api";
import App from "./App";

import "./styles.css";

createInstance();

const rootElement = document.getElementById("root");
render(<App />, rootElement);
