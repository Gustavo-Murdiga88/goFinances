import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { FlatList, FlatListProps, TouchableOpacity, TouchableOpacityProps  } from 'react-native';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { DataListProps } from '.'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`
export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  flex-direction: row;

  align-items: flex-start;
`
export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${RFValue(40)}px;
`
export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`
export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
`
export const User = styled.View`
  margin-left: ${RFValue(17)}px;
`
export const UserGreeting = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
`
export const UserName = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.bold};
`
export const ButtonPower = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
} as TouchableOpacityProps)``

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`
export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingLeft: 24 }
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(18)}px;
;`
export const Transactions = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: ${RFPercentage(10)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  margin-bottom: 16px;
`;

export const TransactionsList = styled(
  FlatList as new () => FlatList<DataListProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 10,
  },
} as FlatListProps<DataListProps>)``

export const SubHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  `;