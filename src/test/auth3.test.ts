import { login } from "../auth3";
import { fetchUserByEmail } from "../authService3";

// mock
jest.mock("../authService3");
const mockfetchUserByEmail = fetchUserByEmail as jest.MockedFunction<
  typeof fetchUserByEmail
>;

// describe
describe("ex3", () => {
  // case 1
  test("login success", async () => {
    mockfetchUserByEmail.mockResolvedValue({
      id: 1,
      email: "example@gmail.com",
      password: "123456",
    });
    const result = await login("example@gmail.com", "123456");
    expect(result).toEqual({ id: 1, email: "example@gmail.com" });
  });

  // case 2
  test("user not found", async () => {
    mockfetchUserByEmail.mockResolvedValue(null)
    await expect(login("example@gmail.com", "123456")).rejects.toThrow("user not found")
  });

  // case 3
  test("password fail", async () => {
    mockfetchUserByEmail.mockResolvedValue({
      id: 1,
      email: "example@gmail.com",
      password: "123456",
    });
    await expect(login("example@gmail.com", "1234567")).rejects.toThrow("invalid password");
  });
});
