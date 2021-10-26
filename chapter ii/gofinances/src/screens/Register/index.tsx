import React, { useEffect, useState } from "react";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from "../../components/Form/Button";
import InputForm from "../../components/Form/InputForm";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/CategorySelectButton";

import { CategorySelect } from "../CategorySelect";

import {
  Container,
  Form,
  Header,
  Title,
  Fields,
  TransactionTypes,
} from "./styles";

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor numérico")
    .positive("valor não pode ser negativo"),
});
interface FormData {
  name: string;
  amount: string;
}

export function Register() {
  const collectionKey = '@gofinances:transactions';

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function handleTransactionTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleCloseCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleOpenCategoryModal() {
    setCategoryModalOpen(true);
  }

  async function handldeRegisterAsync({ name, amount }: FormData) {
    const data = {
      name,
      amount,
      transactionType,
      category: category.key,
    };

    if (!transactionType)
      return Alert.alert("Selecione o tipo da transação");

    if (category.key === "category")
      return Alert.alert("Selecione a categoria");

    try {
      await AsyncStorage.setItem(collectionKey, JSON.stringify(data));
    }
    catch (error) {
      console.error(`screen:Register\n metódo:HandleRegister\n error`, error);
      Alert.alert('Não foi possível salvar');
    }
  }

  useEffect(() => {
    async function loadData() {
      const data = await AsyncStorage.getItem(collectionKey);
      console.log(JSON.parse(data!));
    }

    loadData();

    return () => {
      loadData();
    }
  }, [])
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionTypes>
              <TransactionTypeButton
                type="up"
                title="Income"
                onPress={() => handleTransactionTypeSelect("up")}
                isActive={transactionType === "up"}
              />
              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleTransactionTypeSelect("down")}
                isActive={transactionType === "down"}
              />
            </TransactionTypes>
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenCategoryModal}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handldeRegisterAsync)} />
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
