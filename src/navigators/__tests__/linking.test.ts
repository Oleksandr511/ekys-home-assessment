import { extractStepFromUrl } from "../linkingUtils";

// We test the pure URL parsing logic which doesn't depend on Expo
describe("Deep Link URL Parsing", () => {
  describe("extractStepFromUrl", () => {
    it("should extract step number from onboarding URL", () => {
      const url = "myapp://onboarding/1";
      const step = extractStepFromUrl(url);
      expect(step).toBe(1);
    });

    it("should extract step 5 from onboarding URL", () => {
      const url = "myapp://onboarding/5";
      const step = extractStepFromUrl(url);
      expect(step).toBe(5);
    });

    it("should return 5 when URL contains 'review' alias", () => {
      const url = "myapp://onboarding/review";
      const step = extractStepFromUrl(url);
      expect(step).toBe(5);
    });

    it("should return 5 when URL contains 'review' in different case", () => {
      const url = "myapp://onboarding/REVIEW";
      const step = extractStepFromUrl(url);
      expect(step).toBe(5);
    });

    it("should handle URLs with different separators", () => {
      const url = "myapp:/onboarding:3";
      const step = extractStepFromUrl(url);
      expect(step).toBe(3);
    });

    it("should return null for invalid step numbers", () => {
      const url = "myapp://onboarding/6";
      const step = extractStepFromUrl(url);
      expect(step).toBeNull();
    });

    it("should return null for step 0", () => {
      const url = "myapp://onboarding/0";
      const step = extractStepFromUrl(url);
      expect(step).toBeNull();
    });

    it("should return null for non-onboarding URLs", () => {
      const url = "myapp://settings";
      const step = extractStepFromUrl(url);
      expect(step).toBeNull();
    });

    it("should return null for invalid URLs", () => {
      const url = "myapp://onboarding/abc";
      const step = extractStepFromUrl(url);
      expect(step).toBeNull();
    });

    it("should return null for empty URLs", () => {
      const url = "";
      const step = extractStepFromUrl(url);
      expect(step).toBeNull();
    });

    it("should handle URLs with path prefix", () => {
      const url = "myapp://home/onboarding/2";
      const step = extractStepFromUrl(url);
      expect(step).toBe(2);
    });

    it("should validate step 2", () => {
      const url = "myapp://onboarding/2";
      const step = extractStepFromUrl(url);
      expect(step).toBe(2);
    });

    it("should validate step 3", () => {
      const url = "myapp://onboarding/3";
      const step = extractStepFromUrl(url);
      expect(step).toBe(3);
    });

    it("should validate step 4", () => {
      const url = "myapp://onboarding/4";
      const step = extractStepFromUrl(url);
      expect(step).toBe(4);
    });
  });
});
