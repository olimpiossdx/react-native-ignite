import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { HistoryCard } from '../../components/HistoryCard'
import { categories } from '../../utils/categories';
import { Container, Header, Title, Content, ChartContainer } from './styled'
import { useTheme } from 'styled-components';

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
  const theme = useTheme();
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  async function loadDataAsync() {
    const collectionKey = '@gofinances:transactions';

    const response = await AsyncStorage.getItem(collectionKey);
    const responseFormatted: Array<TransactionData> = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter((expensive) => expensive.type = 'negative');

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
  }

  useEffect(() => {
    loadDataAsync()
    return () => {
      loadDataAsync()
    }
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resymo por categoria</Title>
      </Header>

      <Content>
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
      </Content>

    </Container>
  )
}
