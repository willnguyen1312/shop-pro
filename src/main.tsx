import "@shopify/polaris/build/esm/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Root } from "./Root.tsx";

const Home = React.lazy(() =>
  import("./Home.tsx").then((m) => ({ default: m.Home })),
);
const About = React.lazy(() =>
  import("./About.tsx").then((m) => ({ default: m.About })),
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: (
          <React.Suspense fallback={<>...</>}>
            <Home />
          </React.Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <React.Suspense fallback={<>...</>}>
            <About />
          </React.Suspense>
        ),
      },
    ],
  },
]);

async function enableMocking() {
  // if (process.env.NODE_ENV !== "development") {
  //   return;
  // }

  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
});
