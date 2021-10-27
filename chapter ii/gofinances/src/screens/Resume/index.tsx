import React from 'react'
import { HistoryCard } from '../../components/HistoryCard'

import { Container, Header, Title } from './styled'

export function Resume() {
  return (
    <Container>
      <Header>
        <Title>Resymo por categoria</Title>
      </Header>

      <HistoryCard title='' amount='' color='' />
      <HistoryCard title='' amount='' color='' />
      <HistoryCard title='' amount='' color='' />

    </Container>
  )
}
