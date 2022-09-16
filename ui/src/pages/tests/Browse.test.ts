import { urlBuilder } from "../../utils";

describe("urlBuilder", () => {
  const baseUrl = "http://localhost:3000/example";
  const limit = 10;
  const offset = 5;

  it("should return baseUrl if no query params are passed", () => {
    const newUrl = urlBuilder(baseUrl);
    expect(newUrl).toBe("http://localhost:3000/example");
  });

  it("should return baseUrl with query params", () => {
    const newUrl = urlBuilder(baseUrl, {
      limit: limit,
      offset: offset,
    });
    expect(newUrl).toBe("http://localhost:3000/example?limit=10&offset=5");
  });
});
