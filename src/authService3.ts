interface User {
  id: number;
  email: string;
  password: string;
}

export async function fetchUserByEmail(email: string): Promise<User | null> {
  return {
    id: 1,
    email,
    password: "123456",
  };
}
