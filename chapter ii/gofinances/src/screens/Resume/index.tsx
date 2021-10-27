import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { HistoryCard } from '../../components/HistoryCard'
import { categories } from '../../utils/categories';
import { Container, Header, Title, Content, ChartContainer, MonthSelect, MonthSelectButton, MonthSelectIcon, Month, LoadingContainer } from './styled'
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

interface TransactionData {
  key: string;
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
};
interface CategoryData {
  key: string;
  name: string;
  totalFormatted: string;
  total: number;
  color: string;
  percent: string;
};

export function Resume() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  const theme = useTheme();

  function handleDateChange(action: 'next' | 'prev') {
    const newDate = action == 'next' ? addMonths(selectedDate, 1) : subMonths(selectedDate, 1);
    setSelectedDate(newDate);
  };

  async function loadDataAsync() {
    setIsLoading(true);
    const collectionKey = '@gofinances:transactions';

    const response = await AsyncStorage.getItem(collectionKey);
    const responseFormatted: Array<TransactionData> = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter((expensive) =>
      expensive.type === 'negative' &&
      new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
      new Date(expensive.date).getFullYear() === selectedDate.getFullYear());

    const expensiveTotal = expensives.reduce((acumulator: number, expensive: TransactionData) => {
      return acumulator + Number(expensive.amount);
    }, 0);

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;
      expensives.forEach(expensive => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const percent = `${(categorySum / expensiveTotal * 100).toFixed(0)}%`;
        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          color: category.color,
          totalFormatted,
          percent
        });
      }
    });

    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadDataAsync()
  }, [selectedDate]));

  return (
    <Container>
      <Header>
        <Title>Resymo por categoria</Title>
      </Header>
      {isLoading
        ? <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary.main} size='large' />
        </LoadingContainer>
        : <Content
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight()
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange('prev')}>
              <MonthSelectIcon name='chevron-left' />
            </MonthSelectButton>

            <Month>{format(selectedDate, 'MMM, yyy', { locale: ptBR })}</Month>

            <MonthSelectButton onPress={() => handleDateChange('next')}>
              <MonthSelectIcon name='chevron-right' />
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              colorScale={totalByCategories.map(category => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape
                }
              }}
              labelRadius={50}
              x='percent'
              y='total'
            />
          </ChartContainer>

          {totalByCategories.map(item => (<HistoryCard key={item.key} title={item.name} amount={item.totalFormatted} color={item.color} />))}
        </Content>}


    </Container >
  )
}
