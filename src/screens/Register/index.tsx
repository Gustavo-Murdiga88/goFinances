import React, { useState } from "react";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";
import { InputForm } from "../../components/Form/InputForm";

import { useNavigation } from '@react-navigation/native'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import {
  Container,
  Title,
  Header,
  Form,
  Fields,
  TransactionsTypes,
} from "./styles";

interface FormData {
  name: string;
  amount: string;
}

interface NavigationProps {
  navigate: (screen: string) => void;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor numérico")
    .positive("O Valor não pode ser negativo")
    .required("O valor obrigatório"),
});

const dataKey = "@gofinances:transactions";
export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
    icon: "list",
  });

  const { navigate } = useNavigation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleTransactionTypeSelect(type: "positive" | "negative") {
    setTransactionType(type);
  }

  async function handleRegister(form: FormData) {

    if (!transactionType) {
      Alert.alert("Selecione uma transação");
      return;
    }

    if (category.name === "category") {
      Alert.alert("Selecione uma categoria");
      return
    }

    const newTransaction = {
      id: String(new Date().getTime()),
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
      date: String(new Date()),
    };

    try {
      const dataStorage = await AsyncStorage.getItem(dataKey);
      const values = JSON.parse(dataStorage ? dataStorage : '[]');
      const data = [
        ...values,
        newTransaction,
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(data));

      setTransactionType('');
      setCategory({
        key: "category",
        name: "Categoria",
        icon: "list",
      });

      reset(); 
      //@ts-ignore 
      navigate('Listagem');

    } catch (err) {
      console.log(err);
      Alert.alert("Algo de errado aconteceu");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              control={control}
              name={"name"}
              placeholder={"Nome"}
              autoCapitalize={"sentences"}
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              control={control}
              name={"amount"}
              placeholder={"Preço"}
              keyboardType={"numeric"}
              error={errors.amount && errors.amount.message}
            />

            <TransactionsTypes>
              <TransactionTypeButton
                title={"Entrada"}
                type={"up"}
                isActive={transactionType === "positive"}
                onPress={() => {
                  handleTransactionTypeSelect("positive");
                }}
                activeOpacity={0.8}
              />
              <TransactionTypeButton
                title={"Saída"}
                type={"down"}
                isActive={transactionType === "negative"}
                onPress={() => {
                  handleTransactionTypeSelect("negative");
                }}
                activeOpacity={0.8}
              />
            </TransactionsTypes>

            <CategorySelectButton
              activeOpacity={0.8}
              icon={category.icon}
              onPress={handleOpenSelectCategoryModal}
              title={category.name}
            />
          </Fields>

          <Button
            title={"Enviar"}
            onPress={handleSubmit(handleRegister)}
            activeOpacity={0.8}
          />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
