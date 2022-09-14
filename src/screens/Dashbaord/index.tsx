import React, { useCallback, useEffect, useState } from 'react'
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  User,
  Photo,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  SubHeader,
} from './styles'

import { Loading } from '../../components/Loading'
import { HighlightCard } from '../../components/HighlightCard'
import {
  TransactionCard,
  TransactionCardProps
} from '../../components/TransactionCard'

export interface DataListProps extends TransactionCardProps {
  id: string
}

const data = [{
    id: '1', 
    type: 'positive',
    name: 'Desenvolvimento de site',
    amount: 'R$ 12.000,00',
    category: 'food',
    date: '12/08/2022',
  },
  {
  id: '2', 
  type: 'positive',
  name: 'Desenvolvimento de site',
  amount: 'R$ 12.000,00',
  category: 'food',
  date: '12/08/2022',
  },
  {
  id: '3', 
  type: 'positive',
  name: 'Desenvolvimento de site',
  amount: 'R$ 12.000,00',
  category: 'food',
  date: '12/08/2022',
  }
] as any

export function Dashboard() {
  return (
    <Container>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri:'https://avatars.githubusercontent.com/u/74632138?v=4'
                  }}
                />
                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName>Gustavo</UserName>
                </User>
              </UserInfo>
                <Icon name={'power'} />
            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighlightCard
              type={'up'}
              title={'Entradas'}
              amount='R$ 24.000,00'
              lastTransaction='31/08/2022'
            />
            <HighlightCard
              type={'down'}
              title={'Saídas'}
              amount='R$ 12.000,00'
              lastTransaction='31/08/2022'
            />
            <HighlightCard
              type={'total'}
              title={'Total'}
              amount='R$ 12.000,00'
              lastTransaction='31/08/2022'
            />
          </HighlightCards>
          <Transactions>
            <SubHeader>
              <Title>Listagem</Title>
            </SubHeader>

            <TransactionsList
              data={data}
              keyExtractor={( item  ) => item.id}
              renderItem={({ item } ) => <TransactionCard data={item} />}

            />
          </Transactions>
    </Container>
  )
}
