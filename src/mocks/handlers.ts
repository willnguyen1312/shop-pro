import { graphql, HttpResponse } from "msw";

export const handlers = [
  graphql.query("ListMovies", () => {
    return HttpResponse.json({
      data: {
        movies: [
          {
            title: "The Lord of The Rings",
          },
          {
            title: "The Matrix",
          },
          {
            title: "Star Wars: The Empire Strikes Back",
          },
        ],
      },
    });
  }),
];
