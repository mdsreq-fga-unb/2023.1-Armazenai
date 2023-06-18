import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../../src/app/login/page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByText(/Login/i);

    expect(heading).toBeInTheDocument();
  });
});
