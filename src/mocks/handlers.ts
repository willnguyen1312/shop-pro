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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const handlers = [
  graphql.query("ListMovies", async () => {
    await sleep(100);

    // Generate sample title using faker
    const title = faker.lorem.words();
    movies.push({ title, id: movies.length + 1 });
    return HttpResponse.json({
      data: {
        movies,
      },
    });
  }),
];
