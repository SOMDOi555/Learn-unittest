type User = {
  id: number;
  username: string;
  password: string;
};

type Api = {
  getUser: (username: string) => Promise<User | null>;
};

export async function Login(
  api: Api,
  username: string,
  password: string,
): Promise<boolean> {
  const user = await api.getUser(username);

  if (!user) return false;

  if (!validatePassword(password, user.password)) return false;

  return true;
}

export function validatePassword(input: string, actual: string): boolean {
  return input === actual;
}
