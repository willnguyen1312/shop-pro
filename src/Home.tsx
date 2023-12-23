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
    fetchPolicy: "network-only",
  });

  const [addMovie, { loading: addMovieLoading }] = useMutation(ADD_MOVIE, {
    refetchQueries: [GET_MOVIES],
  });

  // if (loading) return <Text as="p">Loading...</Text>;
  if (error) return <p>Error: {error.message}</p>;

  console.log("data", data);

  return (
    <BlockStack gap="400">
      <Text as="h1" variant="headingLg">
        Hello Shop 💳
      </Text>

      {loading && <Text as="p">Loading...</Text>}

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

      <Child />
    </BlockStack>
  );
}

function Child() {
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

  return data ? <Text as="p">Total count: {data.movies.length}</Text> : null;
}
