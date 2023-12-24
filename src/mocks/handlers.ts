import { faker } from "@faker-js/faker";
import { graphql, http, HttpResponse } from "msw";

const movies = [
  {
    title: "Movie 1",
    id: 1,
  },
  {
    title: "Movie 2",
    id: 2,
  },
  {
    title: "Movie 3",
    id: 3,
  },
];

export const handlers = [
  graphql.query("ListMovies", async () => {
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
      title: faker.lorem.words(),
      id: movies.length + 1,
    };
    movies.push(newMovie);

    return HttpResponse.json({
      data: {
        newMovie,
      },
    });
  }),
];
