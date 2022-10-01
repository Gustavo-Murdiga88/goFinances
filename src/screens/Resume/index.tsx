import { HeaderComponent } from "../../components/Header";
import { HistoryCard } from "../../components/HistoryCard";
import { VictoryPie } from "victory-native";
import { useAuthContext } from "../../context/Auth";
import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";
import {addMonths, subMonths, format} from 'date-fns'
import { ptBR } from 'date-fns/locale';

import { categories } from "../../utils/categories";

import {
  Container,
  Content,
  ContentPie,
  Month,
  MonthSelectButton,
  MonthSelectIcon,
  MonthSelect,
} from "./styles";
import { Loading } from '../../components/Loading';

type TransactionsData = {
  transactionType: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
};

type TotalByCategoryProps = {
  id: string;
  color: string;
  total: number;
  amount: string;
  name: string;
  percent: string;
};

export function Resume() {
  const theme = useTheme();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(true); 
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [historyCards, setHistoryCards] = useState<TotalByCategoryProps[]>([]);
  
  function handleDateChange(action: "next" | "prev"){
    setIsLoading(true);
    if(action === 'next'){
      setSelectedDate(addMonths(selectedDate, 1))
    }else{
      setSelectedDate(subMonths(selectedDate, 1))
    }
  }
  
  async function loadData() {
    const dataKey = `@gofinances:transactions_${user.id}`;

    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted: TransactionsData[] = response
      ? JSON.parse(response)
      : [];

    const expensives = responseFormatted.filter(
      (expansives) => expansives.transactionType === "negative" &&
      new Date(expansives.date).getMonth() === selectedDate.getMonth() &&
      new Date(expansives.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensivesTotal = expensives.reduce(
      (acc, expensive) => Number(expensive.amount) + acc,
      0
    );

    const totalByCategory: TotalByCategoryProps[] = [];
    categories.forEach((category) => {
      let categorySum = 0;
      expensives.forEach((expensive) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });
      if (categorySum) {
        const percent = `${(
          (categorySum / Number(expensivesTotal)) *
          100
        ).toFixed(0)}%`;
        totalByCategory.push({
          id: category.key,
          amount: categorySum.toLocaleString("pt-BR", {
            currency: "BRL",
            style: "currency",
          }),
          total: categorySum,
          color: category.color,
          name: category.name,
          percent,
        });
      }
    });
    
    setHistoryCards(totalByCategory);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <Container>
      <HeaderComponent title="Resumo por categoria" />
      {isLoading ? <Loading />: (
      <Content>
        <MonthSelect>
          <MonthSelectButton onPress={() => handleDateChange('prev')}>
            <MonthSelectIcon name='chevron-left' size={24}/>
          </MonthSelectButton>
          <Month>{format(selectedDate, 'MMMM, yyyy',{
            locale: ptBR,
          })}</Month>
          <MonthSelectButton onPress={() => handleDateChange('next')}>
            <MonthSelectIcon name='chevron-right' size={24}/>
          </MonthSelectButton>
        </MonthSelect>
        <ContentPie>
          <VictoryPie
            colorScale={historyCards.map((item) => item.color)}
            data={historyCards}
            x="percent"
            y="total"
            labelRadius={60}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: "bold",
                fill: theme.colors.shape,
              },
            }}
          />
        </ContentPie>
        {historyCards.map((card) => (
          <HistoryCard
            key={card.id}
            amount={card.amount}
            title={card.name}
            color={card.color}
          />
        ))}
      </Content>
      )}
    </Container>
  );
}
