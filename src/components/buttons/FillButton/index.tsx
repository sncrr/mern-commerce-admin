import styled from "styled-components";
import { colors } from "../../../theme";

export const FillButton = styled.button.attrs(() => ({
  className: "space-x-1"
}))`
  
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  transition: background-color 100ms ease-out;
  border-radius: 0.125rem;
  background-color: ${colors.mainColor};
  color: ${colors.white};

  &:hover {
    background-color: ${colors.inputFocus};
  }
`