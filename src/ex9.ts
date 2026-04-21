type User = {
  username: string;
  password: string;
  role: "admin" | "user";
  attempts: number;
  locked: boolean;
};

type Api = {
  getUser: (username: string) => Promise<User | null>;
  updateUser: (user: User) => Promise<void>;
};

export async function loginWithRetry(
  api: Api,
  username: string,
  password: string
): Promise<"admin" | "user" | null> {
  let user: User | null = null;

  // retry 2 ครั้ง
  for (let i = 0; i < 2; i++) {
    try {
      user = await api.getUser(username);
      break;
    } catch {}
  }

  if (!user) return null;

  if (user.locked) {
    throw new Error("Account locked");
  }

  if (user.password !== password) {
    user.attempts += 1;

    if (user.attempts >= 3) {
      user.locked = true;
    }

    await api.updateUser(user);
    return null;
  }

  // login success → reset attempts
  user.attempts = 0;
  await api.updateUser(user);

  return user.role;
}