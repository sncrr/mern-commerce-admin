import styled from "styled-components"
import { colors } from "../../../theme"

const Container = styled.div`
.loader {
  width: 48px;
  height: 48px;
  display: inline-block;
  position: relative;
}
.loader::after,
.loader::before {
  content: '';
  width: 48px;
  height: 48px;
  border: 2px solid ${colors.mainLight};
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  animation: rotation 2s ease-in-out infinite;
}
.loader::after {
  border-color: ${colors.mainDark};
  animation-delay: 1s;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
`
export const BoxSpinner = () => (
  <Container>
    <span className="loader" />
  </Container>
)