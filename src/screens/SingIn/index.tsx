import React, { useState } from "react";
import { Alert, ActivityIndicator, Platform } from "react-native";
import { useTheme } from "styled-components";

import { useAuthContext } from "../../context/Auth";

import Logo from "../../assets/logo.svg";
import Google from "../../assets/google.svg";
import Apple from "../../assets/apple.svg";

import {
  Container,
  Header,
  ImageContainer,
  Title,
  SubTitle,
  Footer,
  WrapperButtons,
} from "./styles";
import { SignInSocialButton } from "../../components/SignInSocialButton";

export function SingIn() {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const { SingInWithGoogle, SingInWithApple, user } = useAuthContext();

  async function AuthGoogle() {
    try {
      setLoading(true);
      await SingInWithGoogle();
    } catch (err) {
      Alert.alert("Não foi possível realizar a autenticação");
      console.log(err);
      setLoading(false);
    }
  }

  async function AuthApple() {
    try {
      setLoading(true);
      return await SingInWithApple();
    } catch (err) {
      Alert.alert("Não foi possível realizar a autenticação");
      console.log(err);
      setLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <ImageContainer>
          <Logo />
        </ImageContainer>
        <Title>Controle suas finanças de forma muito simples</Title>
        <SubTitle>Faça seu login com uma das contas abaixo</SubTitle>
      </Header>
      <Footer>
        <WrapperButtons>
          <SignInSocialButton
            svg={Google}
            title="Entre com Google"
            onPress={AuthGoogle}
            disabled={loading}
          />
          {Platform.OS === "ios" && (
            <SignInSocialButton
              svg={Apple}
              title="Entre com Apple"
              onPress={AuthApple}
              disabled={loading}
            />
          )}
          {loading && (
            <ActivityIndicator
              color={theme.colors.shape}
              size="large"
              style={{ marginTop: 18 }}
            />
          )}
        </WrapperButtons>
      </Footer>
    </Container>
  );
}
