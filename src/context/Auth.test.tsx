import react from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { AuthProvider, useAuthContext } from "../context/Auth";

jest.mock("expo-auth-session/providers/google",() => {
    const response = {
      params: {
        access_token: "google-token",
      },
    };

    const promptAsync = jest.fn(() => ({
      type: "success",
    }));

    const request = jest.fn(() => ({}))

    return {
      useAuthRequest: () => {
        return [request,response, promptAsync];
      },
    };
  })

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
jest.requireActual("expo-auth-session/providers/google");

describe("should be able with google account", () => {
  it("logged account google", async () => {
    // @ts-ignore
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        id: 'userInfo.id',
        email: 'userInfo.email',
        name: 'userInfo.given_name',
        photo: 'userInfo.picture',
        locale: 'userInfo.locale',
        verified_email: 'userInfo.verified_email',

      })
    })) as jest.Mock

    const { result } = renderHook(() => useAuthContext(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.SingInWithGoogle());

    expect(result.current.user).toBeTruthy();
  });
});
