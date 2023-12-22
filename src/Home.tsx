import { Text } from "@shopify/polaris";
import { useEffect } from "react";

export function Home() {
  useEffect(() => {
    fetch(new URL("/graphql", location.href), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query ListMovies {
            movies {
              title
            }
          }
        `,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
  }, []);

  return (
    <Text as="h1" variant="headingLg">
      Hello Shop 💳
    </Text>
  );
}
