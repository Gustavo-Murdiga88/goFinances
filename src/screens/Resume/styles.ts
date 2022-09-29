import styled from "styled-components/native";
import { ScrollViewProps, TouchableOpacity, TouchableOpacityProps} from "react-native";
import {Feather} from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsHorizontalScrollIndicator: false,
  showsVerticalScrollIndicator: false,
} as ScrollViewProps)``;

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1; 
`;

export const ContentPie = styled.View`
    width: 100%;
    align-items: center;
`;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.title}
`;

export const MonthSelectButton = styled(TouchableOpacity as new () => TouchableOpacity).attrs({
  activeOpacity: 0.8,
} as TouchableOpacityProps)``;

export const MonthSelectIcon = styled(Feather)`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title}
`;

export const MonthSelect = styled.View`
  width: 100%;
  margin-top: 24px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

`;