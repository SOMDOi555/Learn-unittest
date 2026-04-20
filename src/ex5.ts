export type User = {
  id: number;
  name: string;
};

// function นี้ “รับ fetchFn เข้ามา” (dependency injection)
export async function getUserName(
  fetchFn: (id: number) => Promise<User>
): Promise<string> {
  const user = await fetchFn(1);
  return user.name;
}