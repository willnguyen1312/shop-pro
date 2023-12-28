import { graphql, http, HttpResponse } from "msw";

const movies: {
  title: string;
  id: string;
}[] = [];

export const handlers = [
  graphql.query("ListMovies", async () => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    movies.push({
      title: `Movie ${movies.length + 1}`,
      id: `${movies.length + 1}`,
    });
    return HttpResponse.json({
      data: {
        movies,
      },
    });
  }),

  http.get("/api/counter", () => {
    return HttpResponse.json({
      data: {
        counter: 1,
      },
    });
  }),

  graphql.mutation("AddMovie", async () => {
    const newMovie = {
      title: `Movie ${movies.length + 1}`,
      id: `${movies.length + 1}`,
    };
    movies.push(newMovie);

    return HttpResponse.json({
      data: {
        newMovie,
      },
    });
  }),
];
