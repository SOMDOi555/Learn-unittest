type User = {
  id: number;
  username: string;
  password: string;
  role: "admin" | "user";
};
type Api = {
  getUser: (username: string) => Promise<User | null>;
};

export function validatePassword(input: string, actual: string): boolean {
  return input === actual;
}

export async function loginWithRole(
  api: Api,
  username: string,
  password: string,
): Promise<"admin" | "user" | null> {
  const user = await api.getUser(username);
  if (!user) return null;
  if (!validatePassword(password, user.password)) return null;

  return user.role;
}
