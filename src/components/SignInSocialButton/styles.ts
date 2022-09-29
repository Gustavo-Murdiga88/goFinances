import styled from "styled-components/native";
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

export const Container = styled(TouchableOpacity as new () => TouchableOpacity).attrs({} as TouchableOpacityProps)`
    width: 100%;
    height: 56px;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.colors.shape};
    margin-bottom: 16px;

    flex-direction: row;
    align-items: center;
    justify-content: center;
    justify-content: flex-start;
    
`;
export const ImageContainer = styled.View`
    width: 56px;
    height: 100%;
    border-right-width: 1px;
    border-right-color: ${({ theme}) => theme.colors.background};
    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    flex: 1;
    text-align: center;
    font-family: ${({ theme }) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.title}
`;