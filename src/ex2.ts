import { fetchUser } from "./service2";

export const getUserByEmail = async () => {
  const user = await fetchUser();
  return user.email;
};
