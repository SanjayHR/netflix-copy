import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

jest.mock("./Header", () => () => null);
jest.mock("../utils/firebase", () => ({ auth: {} }));
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));
jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
  signInWithEmailAndPassword.mockResolvedValue({
    user: { uid: "user-1", email: "person@example.com", displayName: null },
  });
  createUserWithEmailAndPassword.mockResolvedValue({
    user: { uid: "user-1", email: "person@example.com", displayName: null },
  });
  updateProfile.mockResolvedValue();
});

test("signs in without accessing the unmounted full-name input", async () => {
  render(<Login />);
  fireEvent.change(screen.getByPlaceholderText("Email Address"), {
    target: { value: "person@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "Password1!" },
  });

  fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

  await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/browse"));
  expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
    {},
    "person@example.com",
    "Password1!",
  );
  expect(updateProfile).not.toHaveBeenCalled();
});

test("creates an account with the full name and updates the profile", async () => {
  render(<Login />);
  fireEvent.click(screen.getByText(/Don't have an account\?/));
  fireEvent.change(screen.getByPlaceholderText("Full Name"), {
    target: { value: "Taylor User" },
  });
  fireEvent.change(screen.getByPlaceholderText("Email Address"), {
    target: { value: "person@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "Password1!" },
  });

  fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

  await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/browse"));
  expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
    {},
    "person@example.com",
    "Password1!",
  );
  expect(updateProfile).toHaveBeenCalledWith(
    expect.objectContaining({ uid: "user-1" }),
    { displayName: "Taylor User" },
  );
});
