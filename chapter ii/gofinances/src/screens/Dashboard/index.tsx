import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
} from "./styles";

export interface IDataListProps extends ITransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<IDataListProps[]>([]);

  async function loadTransactionsAsync() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItemda(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormatted: IDataListProps[] = transactions.map((transaction: IDataListProps) => {
      const amount = Number(transaction.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });

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

    setData(transactionsFormatted);
  };

  useEffect(() => {
    loadTransactionsAsync()
    return () => {
      loadTransactionsAsync()
    }
  }, []);


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
      <Header>
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
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril."
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última entrada dia 16 de abril."
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril."
        />
      </HighlightCards>

      <Transactions>
        <Title>listagem</Title>
        <TransactionsList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
