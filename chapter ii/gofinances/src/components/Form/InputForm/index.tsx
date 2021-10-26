import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";
import { Input } from "../Input";
import { Container } from "./styles";

interface Props extends TextInputProps {
  control: Control;
  name: string;
}

export default function InputForm({ control, name, ...rest }: Props) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => {
          return <Input value={value} onChangeText={onChange} {...rest} />;
        }}
        name={name}
      />
    </Container>
  );
}
