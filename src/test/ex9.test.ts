import { loginWithRetry } from "../ex9";

type User = {
  username: string;
  password: string;
  role: "admin" | "user";
  attempts: number;
  locked: boolean;
};

describe("ex9", () => {
  // case1
  test("login success", async () => {
    const mockApi = {
      getUser: jest.fn().mockResolvedValue({
        username: "john",
        password: "1234",
        role: "admin",
        attempts: 0,
        locked: false,
      }),
      updateUser: jest.fn().mockResolvedValue(undefined),
    };
    const result = await loginWithRetry(mockApi, "john", "1234");
    expect(mockApi.updateUser).toHaveBeenCalled();
    expect(mockApi.getUser).toHaveBeenCalledWith("john");
    expect(result).toBe("admin");
  });

  // case2
  test("password wrong", async () => {
    const mockApi = {
      getUser: jest.fn().mockResolvedValue({
        username: "john",
        password: "1234",
        role: "admin",
        attempts: 0,
        locked: false,
      }),
      updateUser: jest.fn().mockResolvedValue(undefined),
    };
    const result = await loginWithRetry(mockApi, "john", "123");
    expect(result).toBe(null);
    expect(mockApi.updateUser).toHaveBeenCalled();
    expect(mockApi.updateUser).toHaveBeenCalledWith(
      expect.objectContaining({
        attempts: 1,
      }),
    );
  });

  // case 3
  test("account locked", async () => {
    const mockApi = {
      getUser: jest.fn().mockResolvedValue({
        username: "john",
        password: "1234",
        role: "user",
        attempts: 3,
        locked: true,
      }),
      updateUser: jest.fn().mockRejectedValue(undefined),
    };
    await expect(() => loginWithRetry(mockApi, "john", "1234")).rejects.toThrow(
      "Account locked",
    );
  });

  // case 4
  test("Retry API", async () => {
    let user: User = {
      username: "john",
      password: "1234",
      role: "user",
      attempts: 1,
      locked: false,
    };
    const mockApi = {
      getUser: jest.fn(() => Promise.resolve(user)),
      updateUser: jest.fn((updateUser) => {
        user = updateUser;
        return Promise.resolve();
      }),
    };

    await loginWithRetry(mockApi, "john", "123");
    expect(user.attempts).toBe(2);
    expect(user.locked).toBe(false);

    await loginWithRetry(mockApi, "john", "123");
    expect(user.attempts).toBe(3);
    expect(user.locked).toBe(true);
  });

  //case 5
  test("User not found", async () => {
    const mockApi = {
      getUser: jest.fn().mockResolvedValue(null),
      updateUser: jest.fn().mockResolvedValue(undefined),
    };
    const result = await loginWithRetry(mockApi, "john", "1234");
    expect(result).toBe(null);
  });
});
