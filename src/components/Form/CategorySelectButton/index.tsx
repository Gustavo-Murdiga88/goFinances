import React from 'react'
import {TouchableOpacityProps} from 'react-native'

import {
  Container,
  Category,
  Icon,
  CategorySelected,
  IconFeather
} from './styles'


interface Props extends TouchableOpacityProps {
  title: string
  icon: string | null
  onPress: () => void
}

export function CategorySelectButton({ title, icon, onPress, ...rest }: Props) {
  return (
    <Container onPress={onPress} {...rest}>
      <CategorySelected>
        {icon && <IconFeather name={icon} />}
        <Category>{title}</Category>
      </CategorySelected>
      <Icon name={'keyboard-arrow-down'} />
    </Container>
  )
}
