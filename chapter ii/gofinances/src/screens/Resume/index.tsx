import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HistoryCard } from '../../components/HistoryCard'

import { categories } from '../../utils/categories';
import { Container, Header, Title, Content } from './styled'

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
  total: string;
  color: string;
};

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  async function loadDataAsync() {
    const collectionKey = '@gofinances:transactions';

    const response = await AsyncStorage.getItem(collectionKey);
    const responseFormatted: Array<TransactionData> = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter((expensive) => expensive.type = 'negative');

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;
      expensives.forEach(expensive => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const total = categorySum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total,
          color: category.color
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
        {totalByCategories.map(item => (<HistoryCard key={item.key} title={item.name} amount={item.total} color={item.color} />))}
      </Content>

    </Container>
  )
}
