import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View``;
export const Header = styled.View`
    justify-content: flex-end;
    align-items: center;
    height: ${RFPercentage(70)}px;
    background-color: ${({ theme }) => theme.colors.primary};
`;
export const ImageContainer = styled.View`
    height: ${RFValue(120)}px;
    width: ${RFValue(68)}px;
    

    align-items: center;
    justify-content: center;

`;
export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(30)}px;
    margin-bottom: 80px;
    padding: 0 32px;
    
    text-align: center;
    color: ${({ theme }) => theme.colors.shape };

`;
export const SubTitle = styled.Text`

    max-width: 170px;
    height: 48px;
    text-align: center;
    line-height: 24px;

    margin-bottom: 67px;

    color: ${({ theme }) => theme.colors.shape};
    font-size: 16px;

`;

export const Footer = styled.View`
    height: 100%;
    background-color: ${({ theme }) => theme.colors.secondary};
`;

export const WrapperButtons = styled.View`
    width: 100%;
    height: 100%;
    padding: 0 32px;
    margin-top: ${RFPercentage(-4)}px;

`