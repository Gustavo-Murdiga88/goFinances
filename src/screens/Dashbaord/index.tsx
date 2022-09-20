import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
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
  LoadingContainer,
} from "./styles";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import { useTheme } from "styled-components";
export interface DataListProps extends TransactionCardProps {
  id: string;
}

type TotalCardsProps = {
  entries: {
    total: string;
    lastTransaction: string;
  };
  amount: {
    total: string;
    lastTransaction: string;
  };
  withdraw: {
    total: string;
    lastTransaction: string;
  };
};

const dataKey = "@gofinances:transactions";

function handleGetTimeLastTransaction(
  data: DataListProps[],
  type: "positive" | "negative"
) {
  const lastTransaction = new Date(
    Math.max.apply(
      Math,
      data
        .filter((transaction) => transaction.transactionType === type)
        .map((transaction) => new Date(transaction.date).getTime())
    )
  );
  return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleDateString(
    "pt-BR",
    {
      month: "long",
    }
  )}`;
}
export function Dashboard() {
  const theme = useTheme();
  const [data, setData] = useState<DataListProps[]>([]);
  const [totalCards, setTotalCards] = useState<TotalCardsProps>(
    {} as TotalCardsProps
  );
  const [isLoading, setIsLoading] = useState(true);

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

  async function amountBillsToPay() {
    const data = await AsyncStorage.getItem(dataKey);
    const transactions: Array<DataListProps> = JSON.parse(data || "[]");

    const amountTransactions = transactions.reduce(
      (acc, transaction) => {
        if (transaction.transactionType === "negative") {
          acc.withdraw += Number(transaction.amount);
          acc.total -= Number(transaction.amount);
          return acc;
        } else {
          acc.amount += Number(transaction.amount);
          acc.total += Number(transaction.amount);
          return acc;
        }
      },
      {
        amount: 0,
        withdraw: 0,
        total: 0,
      }
    );

    const { amount, total, withdraw } = amountTransactions;

    const lastTransactionAmount = handleGetTimeLastTransaction(
      transactions,
      "positive"
    );
    const lastTransactionWithdraw = handleGetTimeLastTransaction(
      transactions,
      "negative"
    );

    const lastTransactionTotal = `01 à ${lastTransactionAmount}`

    setTotalCards({
      amount: {
        total: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: lastTransactionTotal,
      },
      entries: {
        total: amount.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última entrada dia ${lastTransactionAmount}`,
      },
      withdraw: {
        total: withdraw.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última saída dia ${lastTransactionWithdraw}`,
      },
    });
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      onLoadTransactions();
      amountBillsToPay();
    }, [])
  );

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={theme.colors.secondary} />
      </LoadingContainer>
    );
  }

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
          amount={totalCards.entries.total}
          lastTransaction={totalCards.amount.lastTransaction}
        />
        <HighlightCard
          type={"down"}
          title={"Saídas"}
          amount={totalCards.withdraw.total}
          lastTransaction={totalCards.withdraw.lastTransaction}
        />
        <HighlightCard
          type={"total"}
          title={"Total"}
          amount={totalCards.amount.total}
          lastTransaction={totalCards.amount.lastTransaction}
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
