import enTranslations from "@shopify/polaris/locales/en.json";
import { Link, Outlet } from "react-router-dom";

import { AppProvider } from "@shopify/polaris";

export function Root() {
  return (
    <AppProvider i18n={enTranslations}>
      <main>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </main>
    </AppProvider>
  );
}
