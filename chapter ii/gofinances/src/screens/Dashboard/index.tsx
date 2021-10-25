import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { ITransactionCardProps } from "../../components/TransactionCard";
import { TransactionCard } from "../../components/TransactionCard";

import { Container, Header, UserWrapper, UserInfo, Photo, User, UserGreeting, UserName, Icon, HighlightCards, Transactions, Title, TransactionsList } from "./styles";

export interface IDataListProps extends ITransactionCardProps {
  id: string;
};

export function Dashboard() {
  const data: IDataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: 'Desenvolvimento de site ',
      amount: 'R$ 12.000,00 ',
      category: { name: 'Vendas', icon: "dollar-sign" },
      date: '13/04/2020'
    },
    {
      id: '2',
      type: 'negative',
      title: 'Hambuergueria Pizzy',
      amount: 'R$ 59,00 ',
      category: { name: 'alimentacao', icon: "coffee" },
      date: '13/04/2020'
    },
    {
      id: '3',
      type: 'netive',
      title: 'alugel apartamento ',
      amount: 'R$ 1.200,00 ',
      category: { name: 'casa', icon: "dollar-shopping-bag" },
      date: '13/04/2020'
    }
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/30667729?v=4' }} />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Olá, </UserName>
            </User>
          </UserInfo>
        </UserWrapper>
        <Icon name='power' />
      </Header>

      <HighlightCards>
        <HighlightCard type='up' title='Entradas' amount='R$ 17.400,00' lastTransaction='Última entrada dia 13 de abril.' />
        <HighlightCard type='down' title='Saídas' amount='R$ 1.259,00' lastTransaction='Última entrada dia 16 de abril.' />
        <HighlightCard type='total' title='Total' amount='R$ 16.141,00' lastTransaction='01 à 16 de abril.' />
      </HighlightCards>

      <Transactions>
        <Title>listagem</Title>
        <TransactionsList
          data={data}
          keyExtractor={item = < ClipboardItem.id}
          renderItem={({ item }) =>
            <TransactionCard data={item} />}
        />

      </Transactions>
    </Container>
  );
}
