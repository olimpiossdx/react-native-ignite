import React from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { Button } from '../../components/Form/Button';
import { categories } from '../../utils/categories';

import { Container, Header, Title, Category, Icon, Name, Separator, Footer } from './styles';

export interface Category {
  key: string;
  name: string;
};

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
};

export function CategorySelect({ category, setCategory, closeSelectCategory }: Props) {

  function hanldeCategorySelect(item: Category) {
    setCategory({ key: item.key, name: item.name })
  }

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>
      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          return (
            <Category onPress={() => hanldeCategorySelect(item)}>
              <Icon name={item.icon} />
              <Name >{item.name}</Name>
            </Category>
          );
        }}
        ItemSeparatorComponent={() => <Separator />}
      />
      <Footer>
        <Button title='Selecionar' onPress={closeSelectCategory} />
      </Footer>
    </Container >
  )
}
