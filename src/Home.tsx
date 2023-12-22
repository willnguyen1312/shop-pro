import { NetworkStatus, gql, useApolloClient, useQuery } from "@apollo/client";
import { BlockStack, Button, List, Text } from "@shopify/polaris";

const GET_MOVIES = gql`
  query ListMovies {
    movies {
      title
      id
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
      {isRefreshing && <Text as="p">Refreshing</Text>}

      <List type="bullet">
        {data &&
          data.movies.map((movie) => {
            return <List.Item key={movie.title}>{movie.title}</List.Item>;
          })}
      </List>

      <Child />
    </BlockStack>
  );
}

function Child() {
  // const { data } = useQuery<{
  //   movies: { title: string }[];
  // }>(GET_MOVIES, {
  //   fetchPolicy: "network-only",
  //   notifyOnNetworkStatusChange: true,
  // });

  const client = useApolloClient();
  const data = client.readQuery<{
    movies: { title: string }[];
  }>({
    query: gql`
      query ListMovies {
        movies {
          id
        }
      }
    `,
  });

  console.log("data", data);

  return data ? <Text as="p">Total count: {data.movies.length}</Text> : null;
}
