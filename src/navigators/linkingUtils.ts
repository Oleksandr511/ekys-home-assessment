// Helper to extract step from deep link (pure function, no dependencies)
export const extractStepFromUrl = (url: string): number | null => {
  const match = url.match(/onboarding[:/](\w+)/i);
  if (!match) return null;

  const value = match[1].toLowerCase();
  if (value === "review") return 5;

  const stepNum = parseInt(value, 10);
  return stepNum >= 1 && stepNum <= 5 ? stepNum : null;
};
