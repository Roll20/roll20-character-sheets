import { beforeEach, afterEach, it, expect, describe, vi, beforeAll } from "vitest"
import { sendSummary } from "../src/sendSummary";

const hoisted = vi.hoisted(() => {
  return {
    fetch: vi.fn(),
    core: {
      getInput: vi.fn(),
      debug: vi.fn(),
    },
    github: {
      getOctokit: vi.fn(),
      context: {
        payload: {
          pull_request: {
            number: 123,
          },
        }
      },
    },
    octokit: {
      request: vi.fn(),
      rest: {
        issues: {
          createComment: vi.fn(),
          listComments: vi.fn(),
        }
      }
    },
  }
});

vi.mock("@actions/core", () => hoisted.core);

vi.mock("@actions/github", () => hoisted.github);

describe("sendSummary", () => {

  describe("sendSummary", () => {
    beforeEach(() => {
      vi.resetAllMocks();
      hoisted.github.getOctokit.mockReturnValueOnce(hoisted.octokit);
      hoisted.octokit.rest.issues.createComment.mockResolvedValue({ data: [] });
    });

    it("Creates an error if there is one to create", () => {
      sendSummary([
        {
          name: "",
          type: "error",
          description: "Random Error",
        }
      ]);
      const { calls } = hoisted.octokit.rest.issues.createComment.mock;
      const firstCall = calls[0][0];
      expect(firstCall.body).toContain("Random Error");
      expect(firstCall.body).toContain("ERROR:");
    });

    it("Creates a warning if there is one to create", () => {
      sendSummary([
        {
          name: "",
          type: "warning",
          description: "Random Warning",
        }
      ]);
      const { calls } = hoisted.octokit.rest.issues.createComment.mock;
      const firstCall = calls[0][0];
      expect(firstCall.body).toContain("Random Warning");
      expect(firstCall.body).toContain("WARNING:");
    });

    it("Creates a notice if there is one to create", () => {
      sendSummary([
        {
          name: "",
          type: "notice",
          description: "Random Notice",
        }
      ]);
      const { calls } = hoisted.octokit.rest.issues.createComment.mock;
      const firstCall = calls[0][0];
      expect(firstCall.body).toContain("Random Notice");
      expect(firstCall.body).toContain("NOTICE:");
    });

    it("adds a code block annotation if applicable", () => {
      sendSummary([
        {
          name: "",
          type: "warning",
          description: "Random Warning",
          annotation: {
            title: "more data"
          }
        }
      ]);
      const { calls } = hoisted.octokit.rest.issues.createComment.mock;
      const firstCall = calls[0][0];
      expect(firstCall.body).toContain("```\ntitle: more data\n```");
    });

    it("combines multiple instances of the same error", () => {
      sendSummary([
        {
          name: "name",
          type: "warning",
          description: "Random Warning",
          annotation: {
            title: "more data"
          }
        },
        {
          name: "name",
          type: "warning",
          description: "Random Warning 2",
          annotation: {
            title: "more data"
          }
        },
      ]);
      const { calls } = hoisted.octokit.rest.issues.createComment.mock;
      const firstCall = calls[0][0];

      expect(firstCall.body).toContain("Random Warning (2 instances)");
    });

    it("shows annotations for multiple instances of the same error with different annotations", () => {
      sendSummary([
        {
          name: "name",
          type: "warning",
          description: "Random Warning",
          annotation: {
            title: "a lot more info"
          }
        },
        {
          name: "name",
          type: "warning",
          description: "Random Warning 2",
          annotation: {
            title: "more data"
          }
        },
      ]);
      const { calls } = hoisted.octokit.rest.issues.createComment.mock;
      const firstCall = calls[0][0];

      expect(firstCall.body).toContain("```\ntitle: more data\n```");
      expect(firstCall.body).toContain("```\ntitle: a lot more info\n```");
    });
  });
});