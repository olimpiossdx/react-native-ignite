import React, { useState, useEffect } from "react";
import { ActivityIndicator } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { HighlightCard } from "../../components/HighlightCard";
import { ITransactionCardProps } from "../../components/TransactionCard";
import { TransactionCard } from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  LogoutButton,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LoadingContainer
} from "./styles";
import { useCallback } from "hoist-non-react-statics/node_modules/@types/react";

export interface IDataListProps extends ITransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
};

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
};

export function Dashboard() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<IDataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  function getLastTransactionDate(collection: IDataListProps[], type: 'positive' | 'negative') {
    const lastTransaction = new Date(Math.max.apply(Math, (collection
      .filter((transaction) => transaction.type == type)
      .map((transaction) => new Date(transaction.date).getTime()))));

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`;
  };

  async function loadTransactionsAsync() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItemda(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: IDataListProps[] = transactions.map((transaction: IDataListProps) => {
      const amount = Number(transaction.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });

      if (transaction.type === 'positive') {
        entriesTotal += Number(transaction.amount);
      }
      else {
        expensiveTotal += Number(transaction.amount);
      }

      const dateFormatted = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(transaction.date));

      return {
        ...transaction,
        amount,
        date: dateFormatted
      };
    });


    setTransactions(transactionsFormatted);

    const lastTransactionEntriesFormatted = getLastTransactionDate(transactions, 'positive');
    const lastTransactionExpenseFormatted = getLastTransactionDate(transactions, 'negative');
    const totalInterval = `01 à ${lastTransactionExpenseFormatted}`;

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última saída dia ${lastTransactionExpenseFormatted}`
      },
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntriesFormatted}`
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      },
    });

    setLoading(false);
  };

  useEffect(() => {
    loadTransactionsAsync()
    return () => {
      loadTransactionsAsync()
    }
  }, []);

  useFocusEffect(useCallback(() => { loadTransactionsAsync() }, []))


  // const data: IDataListProps[] = [
  //   {
  //     id: "1",
  //     type: "positive",
  //     title: "Desenvolvimento de site ",
  //     amount: "R$ 12.000,00 ",
  //     category: { name: "Vendas", icon: "dollar-sign" },
  //     date: "13/04/2020",
  //   },
  //   {
  //     id: "2",
  //     type: "negative",
  //     title: "Hambuergueria Pizzy",
  //     amount: "R$ 59,00 ",
  //     category: { name: "alimentacao", icon: "coffee" },
  //     date: "13/04/2020",
  //   },
  //   {
  //     id: "3",
  //     type: "negative",
  //     title: "alugel apartamento ",
  //     amount: "R$ 1.200,00 ",
  //     category: { name: "casa", icon: "shopping-bag" },
  //     date: "13/04/2020",
  //   },
  // ];

  return (
    <Container>
      {loading
        ? <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary.main} size='large' />
        </LoadingContainer>
        : <><Header>
          <UserWrapper>
            <UserInfo>
              <Photo
                source={{
                  uri: "https://avatars.githubusercontent.com/u/30667729?v=4",
                }}
              />
              <User>
                <UserGreeting>Olá, </UserGreeting>
                <UserName>Olimpio, </UserName>
              </User>
            </UserInfo>
            <LogoutButton onPress={() => { }}>
              <Icon name="power" />
            </LogoutButton>
          </UserWrapper>
        </Header>

          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.total.lastTransaction}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData.expensives.amount}
              lastTransaction={highlightData.expensives.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
            />
          </HighlightCards>

          <Transactions>
            <Title>listagem</Title>
            <TransactionsList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions></>}
    </Container>
  );
}
