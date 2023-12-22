import { useEffect } from "react";
import "./App.css";

function App() {
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
    <>
      <h1>Hello Shop 💳</h1>
    </>
  );
}

export default App;
