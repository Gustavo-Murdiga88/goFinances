import react, { createContext, useContext, ReactNode, useState } from "react";
import * as AuthSession from "expo-auth-session";
import * as Google from 'expo-auth-session/providers/google';

interface AuthProvider {
  children: ReactNode;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
  photo?: string;
};
interface AuthContext {
  user: UserProps;
  SingInWithGoogle(): Promise<void>;
}

interface AuthResponse {
  params: {
    access_token: string;
  };
  type: string;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export function AuthProvider({ children }: AuthProvider) {
  const [user, setUser] = useState<UserProps>({} as UserProps);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "719414036935-omr7ameo10qrmfalamlpj0rqrppg6h7s.apps.googleusercontent.com",
  })

  async function SingInWithGoogle() {
    await promptAsync()
    const { type, params, ...rest} = response as AuthResponse;
    console.log(rest);

    // const CLIENT_ID =
    //   "719414036935-omr7ameo10qrmfalamlpj0rqrppg6h7s.apps.googleusercontent.com";
    // const REDIRECT_ID = "https://auth.expo.io/@gustavomurdiga/gofinances";
    // const RESPONSE_TYPE = "token";
    // const SCOPE = encodeURI("email profile");

    // const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=${SCOPE}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_ID}&client_id=${CLIENT_ID}`;

    // const { type, params } = (await AuthSession.startAsync({
    //   authUrl,
    // })) as AuthResponse;

    if (type === "success") {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
      ).then((response) => response.json());
      console.log(response)
      
      setUser({
        email: response.email,
        id: response.id,
        name: response.name,
        photo: response.picture,
      })
  }
}

  return (
    <AuthContext.Provider
      value={{
        user,
        SingInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  return context;
}
