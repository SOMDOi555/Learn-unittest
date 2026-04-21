import { Login, validatePassword } from "../ex7";

describe("ex7", () => {
  //   case1
  test("login success", async () => {
    const mockApi = {
      getUser: jest.fn().mockResolvedValue({
        id: 1,
        username: "John",
        password: "1234",
      }),
    };
    const result = await Login(mockApi, "John", "1234");
    expect(result).toBe(true);
  });
  // case 2
    test("User is null", async () => {
      const mockApi = {
        getUser: jest.fn().mockResolvedValue(null),
      };
      const result = await Login(mockApi, "John", "1234");
      expect(result).toBe(false);
    });

  //   case 3
  test("password false", async () => {
    const mockApi = {
      getUser: jest.fn().mockResolvedValue({
        id: 1,
        username: "John",
        password: "1234",
      }),
    };
    const result = await Login(mockApi, "John", "12345");
    expect(result).toBe(false);
  });
});

describe("validate password", () => {
  it("password correct", () => {
    expect(validatePassword("1234", "1234")).toBe(true);
  });

  it("password is incorrect",()=> {
    expect(validatePassword("1234","123")).toBe(false)
  })
});
