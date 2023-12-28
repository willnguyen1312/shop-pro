import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { BlockStack, Button, List, Text } from "@shopify/polaris";

const GET_MOVIES = gql`
  query ListMovies {
    movies {
      title
      id
    }
  }
`;

const ADD_MOVIE = gql`
  mutation AddMovie {
    newMovie {
      id
      title
    }
  }
`;

export function Home() {
  const { loading, error, data } = useQuery<{
    movies: { title: string }[];
  }>(GET_MOVIES, {
    fetchPolicy: "cache-and-network",
  });

  const [addMovie, { loading: addMovieLoading }] = useMutation(ADD_MOVIE, {
    refetchQueries: [GET_MOVIES],
  });

  if (loading) return <Text as="p">Loading...</Text>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <BlockStack gap="400">
      <Text as="h1" variant="headingLg">
        Hello Shop 💳
      </Text>

      <Button
        onClick={async () => {
          await addMovie();
        }}
      >
        Add Movie
      </Button>
      {addMovieLoading && <Text as="p">Adding movie</Text>}

      <List type="bullet">
        {data &&
          data.movies.map((movie) => {
            return <List.Item key={movie.title}>{movie.title}</List.Item>;
          })}
      </List>

      {/* <Child /> */}
      {data && <Text as="p">Total count: {data.movies.length}</Text>}
    </BlockStack>
  );
}

const ChildQuery = gql`
  query ListMovies {
    movies {
      id
    }
  }
`;

export function Child() {
  const client = useApolloClient();
  const data = client.readQuery<{
    movies: { title: string }[];
  }>({
    query: ChildQuery,
  });

  return data ? <Text as="p">Total count: {data.movies.length}</Text> : null;
}
