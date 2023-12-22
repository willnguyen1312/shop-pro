import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import { Link, Outlet } from "react-router-dom";

const link = new HttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export function Root() {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}
