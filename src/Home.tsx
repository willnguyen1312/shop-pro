import { NetworkStatus, gql, useQuery } from "@apollo/client";
import { BlockStack, Button, List, Text } from "@shopify/polaris";

const GET_MOVIES = gql`
  query ListMovies {
    movies {
      title
    }
  }
`;

export function Home() {
  const { loading, error, data, refetch, networkStatus } = useQuery<{
    movies: { title: string }[];
  }>(GET_MOVIES, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const isRefreshing = networkStatus === NetworkStatus.refetch;

  if (loading && !isRefreshing) return <p>Loading...</p>;
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

      <Button
        onClick={() => {
          refetch();
        }}
      >
        Refresh
      </Button>

      <List type="bullet">
        {movies.map((movie) => {
          return <List.Item key={movie.title}>{movie.title}</List.Item>;
        })}
      </List>
      {isRefreshing && <Text as="p">Refreshing</Text>}
    </BlockStack>
  );
}
