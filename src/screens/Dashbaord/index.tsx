import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  User,
  Photo,
  UserGreeting,
  UserName,
  ButtonPower,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  SubHeader,
} from "./styles";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
export interface DataListProps extends TransactionCardProps {
  id: string;
}

type TotalCardsProps = {
  amount: string;
  total: string;
  withdraw: string;
}

const dataKey = "@gofinances:transactions";
export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([]);
  const [totalCards, setTotalCards ] = useState<TotalCardsProps>({} as TotalCardsProps)
  async function onLoadTransactions() {

    const response = await AsyncStorage.getItem(dataKey);
    const transactions: Array<DataListProps> = response
      ? JSON.parse(response)
      : [];

    const transactionsFormatted = transactions.map((transactions) => {
      const date = Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(transactions.date));

      const amount = Number(transactions.amount).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      return {
        ...transactions,
        amount,
        date,
      };
    });

    setData(transactionsFormatted);
  }

  async function amountBillsToPay(){
    const data = await AsyncStorage.getItem(dataKey);
    const transactions: Array<DataListProps>= JSON.parse(data || '[]'); 

    const amountTransactions = transactions.reduce((acc, transaction) => {
      if( transaction.transactionType === 'negative'){
          acc.withdraw += Number(transaction.amount);
          acc.total -= Number(transaction.amount);
          return acc;
      }else {
          acc.amount += Number(transaction.amount);
          acc.total += Number(transaction.amount);
          return acc;
      }

    }, {
      amount: 0,
      withdraw: 0,
      total: 0,
    })

    const {amount, total, withdraw} = amountTransactions;

    setTotalCards({
     total: total.toLocaleString('pt-BR',{
      style:'currency',
      currency: 'BRL',
     }),
     amount: amount.toLocaleString('pt-BR',{
      style:'currency',
      currency: 'BRL',
     }),
     withdraw: withdraw.toLocaleString('pt-BR',{
      style:'currency',
      currency: 'BRL',
     }),
    })
  }

  useFocusEffect(
    useCallback(() => {
      onLoadTransactions();
      amountBillsToPay()
    }, [])
  );

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/74632138?v=4",
              }}
            />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Gustavo</UserName>
            </User>
          </UserInfo>
          <ButtonPower>
            <Icon name={"power"} />
          </ButtonPower>
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          type={"up"}
          title={"Entradas"}
          amount={totalCards.amount}
          lastTransaction="31/08/2022"
        />
        <HighlightCard
          type={"down"}
          title={"Saídas"}
          amount={totalCards.withdraw}
          lastTransaction="31/08/2022"
        />
        <HighlightCard
          type={"total"}
          title={"Total"}
          amount={totalCards.total}
          lastTransaction="31/08/2022"
        />
      </HighlightCards>
      <Transactions>
        <SubHeader>
          <Title>Listagem</Title>
        </SubHeader>

        <TransactionsList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
