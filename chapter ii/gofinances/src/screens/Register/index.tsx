import React, { useState } from 'react';

import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { Input } from '../../components/Form/Input';

import { Container, Form, Header, Title, Fields, TransactionTypes } from './styles';

export function Register() {
  const [transactionType, setTransactionType] = useState('');

  const handleTransactionTypeSelect = (type: 'up' | 'down') => {
    setTransactionType(type);
  };

  return (
    <Container>
      <Header>
        <Title>Register</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder='Nome' />
          <Input placeholder='Preço' />
          <TransactionTypes>
            <TransactionTypeButton type='up' title='Income' onPress={() => handleTransactionTypeSelect('up')} isActive={transactionType === 'up'} />
            <TransactionTypeButton type='down' title='Outcome' onPress={() => handleTransactionTypeSelect('down')} isActive={transactionType === 'down'} />
          </TransactionTypes>
        </Fields>

        <Button title='Enviar' />
      </Form>
    </Container>
  )
};
