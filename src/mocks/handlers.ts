import { faker } from "@faker-js/faker";
import { graphql, HttpResponse } from "msw";

const movies = [
  {
    title: "The Lord of The Rings",
  },
  {
    title: "The Matrix",
  },
  {
    title: "Star Wars: The Empire Strikes Back",
  },
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const handlers = [
  graphql.query("ListMovies", async () => {
    await sleep(1000);

    // Generate sample title using faker
    const title = faker.lorem.words();
    movies.push({ title });
    return HttpResponse.json({
      data: {
        movies,
      },
    });
  }),
];
