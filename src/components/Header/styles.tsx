import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { FlatList, FlatListProps, TouchableOpacity, TouchableOpacityProps  } from 'react-native';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 18px;
`
export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(113)}px;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 19px;
`