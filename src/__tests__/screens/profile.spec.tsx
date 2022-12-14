import react from "react";
import { render, screen } from "@testing-library/react-native";
import { Profile } from "../../screens/Profile";


describe("Profile screen", () => {
  it('check if screen contains a text by "oi" ', async () => {
    render(<Profile />);
    const text = screen.getByText("oi");

    expect(text.props.children).toContain("oi");
  });
});
