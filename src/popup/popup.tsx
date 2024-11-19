import React from "react";
import { createRoot } from "react-dom/client";

const test = (
  <div>
    <h1>Hello World</h1>
    <p>Hello Mustafa Kamal</p>
  </div>
);

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(test);
