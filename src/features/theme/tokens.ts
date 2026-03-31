export interface ThemeTokens {
  colors: {
    primary: string;
    primaryLight: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    error: string;
    success: string;
    warning: string;
    border: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    fontSize: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    fontWeight: {
      regular: "400";
      medium: "500";
      bold: "700";
    };
  };
}

export const lightTheme: ThemeTokens = {
  colors: {
    primary: "#2563EB",
    primaryLight: "#DBEAFE",
    secondary: "#7C3AED",
    background: "#FFFFFF",
    surface: "#F3F4F6",
    text: "#1F2937",
    textSecondary: "#6B7280",
    error: "#DC2626",
    success: "#16A34A",
    warning: "#FBBF24",
    border: "#E5E7EB",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
    },
    fontWeight: {
      regular: "400",
      medium: "500",
      bold: "700",
    },
  },
};

export const darkTheme: ThemeTokens = {
  colors: {
    primary: "#3B82F6",
    primaryLight: "#1E40AF",
    secondary: "#A78BFA",
    background: "#111827",
    surface: "#1F2937",
    text: "#F3F4F6",
    textSecondary: "#D1D5DB",
    error: "#EF4444",
    success: "#22C55E",
    warning: "#FBBF24",
    border: "#374151",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
    },
    fontWeight: {
      regular: "400",
      medium: "500",
      bold: "700",
    },
  },
};
