import react, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AppleAuthentication from "expo-apple-authentication";
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
  SingInWithApple(): Promise<void>;
  userLoading: boolean;
  singOut(): Promise<void>;
}

interface AuthResponse {
  params: {
    access_token: string;
  };
  type: string;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export function AuthProvider({ children }: AuthProvider) {
  const [user, setUser] = useState<UserProps>({
    // id: 'teste',
    // name:'Gustavo Murdiga',
    // photo: 'https://avatars.githubusercontent.com/u/74632138?v=4'
  } as UserProps);
  const [userLoading, setUserLoading] = useState(true);

  const KeyUser = "@gofinances:user";

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "719414036935-omr7ameo10qrmfalamlpj0rqrppg6h7s.apps.googleusercontent.com",
      iosClientId: '',
  });

  async function SingInWithGoogle() {
    try {
      const { type } = await promptAsync();
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
        const { params } = response as AuthResponse;
        const responseFetch = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        ).then((response) => response.json());

        const userLogged = {
          email: responseFetch.email,
          id: responseFetch.id,
          name: responseFetch.name,
          photo: responseFetch.picture,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(
          KeyUser,
          JSON.stringify(userLogged, null, 2)
        );
      }
    } catch (err) {
      console.log(err);
      throw new Error(err as string);
    }
  }

  async function SingInWithApple() {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      ],
    });

    const { email, fullName, identityToken, user } = credential;

    const userLogged = {
      email: email!,
      id: String(user),
      name: fullName?.givenName!,
      photo: `https://ui-avatars.com/api/?name=${fullName?.givenName!}`,
    };

    setUser(userLogged);
    await AsyncStorage.setItem(KeyUser, JSON.stringify(userLogged, null, 2));
  }

  async function singOut() {
    await AsyncStorage.removeItem(KeyUser);
    setUser({} as UserProps);
  }

  useEffect(() => {
    async function loadInfoUser() {
      const userInfo = await AsyncStorage.getItem(KeyUser);
      if (userInfo) {
        const user = JSON.parse(userInfo) as UserProps;
        setUser(user);
      }
      setUserLoading(false);
    }
    loadInfoUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userLoading,
        singOut,
        user,
        SingInWithGoogle,
        SingInWithApple,
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
