import React from 'react'
import { Container, Title, Amount, Footer, Icon, Category, CategoryName, Date } from './styles'

interface ICategoryProps {
  name: string;
  icon: string;
}

export interface ITransactionCardProps {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: ICategoryProps;
  date: string;
}

interface IProps {
  data: ITransactionCardProps;
}

export function TransactionCard({ data }: IProps) {
  return (
    <Container>
      <Title>
        {data.name}
      </Title>
      <Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>
            {data.category.name}
          </CategoryName>
        </Category>
        <Date>
          {data.date}
        </Date>
      </Footer>
    </Container>
  )
};
