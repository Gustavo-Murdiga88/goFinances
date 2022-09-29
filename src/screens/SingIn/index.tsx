import React from "react";

import Logo from '../../assets/logo.svg'
import Google from '../../assets/google.svg'
import Apple from '../../assets/apple.svg'

import {Container, Header,ImageContainer,Title,SubTitle, Footer, WrapperButtons}  from './styles'
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuthContext } from "../../context/Auth";
import { Alert } from "react-native";
export function SingIn(){
    const { SingInWithGoogle, user } = useAuthContext();

    async function Auth(){
        try{
          await SingInWithGoogle();
          console.log(user);  
        }catch(err){
            Alert.alert('Não foi possível realizar a autenticação')
            console.log(err)
        }
    }
    
    return (
        <Container>
            <Header> 
                <ImageContainer>
                    <Logo />
                </ImageContainer>
                <Title>
                Controle suas
                finanças de forma
                muito simples
                </Title>
                <SubTitle>
                Faça seu login com
                uma das contas abaixo
                </SubTitle>
            </Header>
            <Footer>
                <WrapperButtons>
                <SignInSocialButton 
                    svg={Google}
                    title='Entre com Google'
                    onPress={Auth}
                />
                <SignInSocialButton 
                    svg={Apple}
                    title='Entre com Apple'
                />
                </WrapperButtons>
            </Footer>
        </Container>
    )
}