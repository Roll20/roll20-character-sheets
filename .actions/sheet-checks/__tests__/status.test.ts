import { beforeEach, afterEach, it, expect, describe, vi } from "vitest"

const hoisted = vi.hoisted(() => {
  return {
    getInput: vi.fn(),
  }
});

vi.mock("@actions/core", () => ({
  getInput: hoisted.getInput
}));

describe("run", () => {
  it("should take a raw file list and a separator and return a list of files", async () => {
    // arrange
    const rawFileList = "file1,file2,file3";
    const sep = ",";
    hoisted.getInput.mockReturnValueOnce(rawFileList)
      .mockReturnValueOnce(sep);

    // act
    const rawFiles = rawFileList.split(sep);

    // assert
    expect(rawFiles).toEqual(["file1", "file2", "file3"]);
  });
})