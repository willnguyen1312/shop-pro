import { gql, useQuery } from "@apollo/client";
import { BlockStack, List, Text } from "@shopify/polaris";

const GET_MOVIES = gql`
  query ListMovies {
    movies {
      title
    }
  }
`;

export function Home() {
  const { loading, error, data } = useQuery<{ movies: { title: string }[] }>(
    GET_MOVIES,
    {
      fetchPolicy: "network-only",
    },
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  if (!data) {
    return null;
  }

  const { movies } = data;

  return (
    <BlockStack gap="400">
      <Text as="h1" variant="headingLg">
        Hello Shop 💳
      </Text>

      <List type="bullet">
        {movies.map((movie) => {
          return <List.Item key={movie.title}>{movie.title}</List.Item>;
        })}
      </List>
    </BlockStack>
  );
}
