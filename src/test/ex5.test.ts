import { getUserName } from "../ex5";

describe("getUserName", () => {
  test("should return user name when success", async () => {
    // TODO: mock fetchFn
    const mockService = {
      fetchfn: jest.fn()
    }

    mockService.fetchfn.mockResolvedValue({
      id:1,
      name:"John"
    })
    // TODO: call function
    const result = await getUserName(mockService.fetchfn)

    // TODO: assert result
    expect(result).toBe("John")
  });

  test("should throw error when fetch fails", async () => {
    // TODO: mock reject
    const mockService = {
      fetchfn:jest.fn()
    }

    mockService.fetchfn.mockRejectedValue(new Error("fail"))
    // TODO: assert error
    // const result = await getUserName(mockService.fetchfn)
    // expect(result).rejects.toThrow("fail")
    await expect(getUserName(mockService.fetchfn)).rejects.toThrow("fail")
  });
});