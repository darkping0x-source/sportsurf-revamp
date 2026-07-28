import { describe, it, expect } from "vitest";
import { isValidEmail, isStrongPassword } from "./validation";

describe("isValidEmail", () => {
  it("accepts a normal email", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
  });

  it("accepts a plus-addressed email", () => {
    expect(isValidEmail("user+tag@example.com")).toBe(true);
  });

  it("trims surrounding whitespace before checking", () => {
    expect(isValidEmail("  user@example.com  ")).toBe(true);
  });

  it("rejects a string with no @", () => {
    expect(isValidEmail("not-an-email")).toBe(false);
  });

  it("rejects a string with no domain", () => {
    expect(isValidEmail("user@")).toBe(false);
  });

  it("rejects a string with no TLD", () => {
    expect(isValidEmail("user@localhost")).toBe(false);
  });

  it("rejects an empty string", () => {
    expect(isValidEmail("")).toBe(false);
  });

  it("rejects an email containing spaces", () => {
    expect(isValidEmail("user name@example.com")).toBe(false);
  });
});

describe("isStrongPassword", () => {
  it("accepts an 8-character password", () => {
    expect(isStrongPassword("abcd1234")).toBe(true);
  });

  it("accepts a longer password", () => {
    expect(isStrongPassword("a much longer passphrase")).toBe(true);
  });

  it("rejects a 7-character password", () => {
    expect(isStrongPassword("abcd123")).toBe(false);
  });

  it("rejects an empty password", () => {
    expect(isStrongPassword("")).toBe(false);
  });
});
