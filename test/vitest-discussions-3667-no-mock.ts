import {
  getUserFromCache,
  getUserFromDb,
} from "./vitest-discussions-3667-mock";

export const getUser = (email: string): string => {
  const user = getUserFromCache(email);
  if (!user) {
    return getUserFromDb(email);
  }
  return user;
};
