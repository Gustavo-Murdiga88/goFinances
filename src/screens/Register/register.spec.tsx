import { ReactNode } from "react";
import { Register } from ".";
import { render, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import theme from "../../global/styles/theme";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

type ProviderProps = {
  children: ReactNode;
};

function Provider({ children }: ProviderProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

jest.mock("../../context/Auth", () => ({
  useAuthContext: jest.fn(() => ({
    user: {
      id: "gus_token",
      email: "Gustavo",
      name: "Gustavo",
      photo: "photo",
    },
  })),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(() => {})
  }))
}))

describe("should have open modal when user click on button", () => {
  it("testing the press button for open modal", () => {
    const { getByTestId } = render(<Register />, { wrapper: Provider });

    const modal = getByTestId("modal-category");
    const button = getByTestId("category-select");

    fireEvent.press(button)

    expect(modal.props.visible).toBeTruthy();
    
  });
});
