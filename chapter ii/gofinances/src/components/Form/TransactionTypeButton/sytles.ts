import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

interface IconsProps {
  type: "up" | "down";
}

interface ContainerProps {
  isActive: boolean;
  type: "up" | "down";
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 48%;
  background-color: ${({ theme }) => theme.colors.secondary.main};

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text.main};
  border-radius: 5px;

  padding: 16px;
  ${({ isActive, type }) =>
    isActive &&
    type === "up" &&
    css`
      background-color: ${({ theme }) => theme.colors.success.light};
    `}
  ${({ isActive, type }) =>
    isActive &&
    type === "down" &&
    css`
      background-color: ${({ theme }) => theme.colors.attention.light};
    `}
`;

export const Icon = styled(Feather)<IconsProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ theme, type }) =>
    type === "up" ? theme.colors.success.main : theme.colors.attention.main};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.shape};
`;
