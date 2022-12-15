import react from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { AuthProvider, useAuthContext } from "../context/Auth";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("expo-auth-session/providers/google", () => {
  const response = {
    params: {
      access_token: "google-token",
    },
  };

  const promptAsync = jest.fn(() => ({
    type: "success",
  }));

  const request = jest.fn(() => ({}));

  return {
    useAuthRequest: () => {
      return [request, response, promptAsync];
    },
  };
});

jest.mock("expo-apple-authentication", () => {
  return {
    signInAsync: jest.fn(() => ({
      email: "guga",
      fullName: {
        givenName: "Gustavo Murdiga",
      },
      identityToken: "Apple_token",
      user: "Gustavo Murdiga",
    })),
    AppleAuthenticationScope: {
      EMAIL: "gumurdiga@gmail.com",
      FULL_NAME: "Gustavo Murdiga",
    },
  };
});

describe("must have tests in methods of the login", () => {
  it("logged account google", async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            id: "userInfo.id",
            email: "userInfo.email",
            name: "userInfo.given_name",
            photo: "userInfo.picture",
            locale: "userInfo.locale",
            verified_email: "userInfo.verified_email",
          }),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useAuthContext(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.SingInWithGoogle());

    expect(result.current.user).toBeTruthy();
    expect(result.current.user.photo).toBeFalsy();
  });

  it("logout the account google", async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            id: "userInfo.id",
            email: "userInfo.email",
            name: "userInfo.given_name",
            photo: "userInfo.picture",
            locale: "userInfo.locale",
            verified_email: "userInfo.verified_email",
          }),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useAuthContext(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.SingInWithGoogle());

    await act(() => result.current.singOut());

    expect(result.current.user.name).toBeFalsy();
    expect(result.current.user).toEqual({});
  });

  it("logged account Apple and logout", async () => {
    const { result } = renderHook(() => useAuthContext(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.SingInWithApple());

    expect(result.current.user.name).toBeTruthy();
  });

  it("should be logged with apple account and logout", async () => {
    const { result } = renderHook(() => useAuthContext(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.SingInWithApple());

    await act(() => result.current.singOut());

    expect(result.current.user).toEqual({});
    expect(result.current.user.name).toBeFalsy();
  });
});
