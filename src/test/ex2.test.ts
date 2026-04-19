import { getUserByEmail } from "../ex2";
import { fetchUser } from "../service2";

// mock service
jest.mock("../service2");

const mockfetchUser = fetchUser as jest.MockedFunction<typeof fetchUser>;

describe("test ex2", () => {
  beforeEach(() => {
    mockfetchUser.mockClear();
  });

  test("getUserByEmail", async () => {
    mockfetchUser.mockResolvedValue({
      name: "John",
      email: "john@email.com",
    });
    const result = await getUserByEmail();
    expect(result).toBe("john@email.com");
  });
});
