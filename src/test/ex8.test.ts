import { loginWithRole } from "../ex8";

describe("login with role", () => {
  // case1
  test("admin login", async () => {
    const mockApi = {
      getUser: jest.fn().mockResolvedValue({
        id: 1,
        username: "john",
        password: "1234",
        role: "admin",
      }),
    };
    const result = await loginWithRole(mockApi, "john", "1234");
    expect(result).toBe("admin");
  });

  // case2
  it("password is incorrect", async () => {
    const mockApi = {
      getUser: jest.fn().mockResolvedValue({
        id: 1,
        username: "john",
        password: "1234",
        role: "admin",
      }),
    };
    const result = await loginWithRole(mockApi, "john", "1235");
    expect(result).toBe(null);
  });

  // case3
  test("user not found", async () => {
    const mockApi = {
      getUser: jest.fn().mockResolvedValue(null),
    };
    const result = await loginWithRole(mockApi,"jane","1234")
    expect(result).toBe(null)
  });
});
