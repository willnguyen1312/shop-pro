import { faker } from "@faker-js/faker";
import { graphql, HttpResponse } from "msw";

const movies = [
  {
    title: "The Lord of The Rings",
    id: 1,
  },
  {
    title: "The Matrix",
    id: 2,
  },
  {
    title: "Star Wars: The Empire Strikes Back",
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

  // graphql.query("ListMovies", () => {
  //   return HttpResponse.json({
  //     errors: [
  //       {
  //         message: `Cannot succeed!`,
  //       },
  //     ],
  //   });
  // }),

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
