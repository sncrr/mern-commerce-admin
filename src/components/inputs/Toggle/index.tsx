import { styled } from "styled-components";
import { colors } from "../../../theme";
import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  rounded?: boolean;
  className?: string;
}

export const Toggle = (props: Props) => {
  const { rounded = true } = props;

  const inputProps = {
    ...props,
    rounded: undefined,
    className: undefined,
  };

  return (
    <Container>
      <label className="switch">
        <input
          {...inputProps}
          type="checkbox"
        />
        <span className={`slider ${rounded ? "round" : ""}`}></span>
      </label>
    </Container>
  );
};

const Container = styled.div`
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 0.75rem;

  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 3.5rem;
    height: 2rem;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.5rem;
    width: 1.5rem;
    left: 4px;
    bottom: 4px;
    background-color: #fff;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: ${colors.mainColor};
  }

  input:focus + .slider {
    box-shadow: 0 0 1px ${colors.mainColor};
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(1.5rem);
    -ms-transform: translateX(1.5rem);
    transform: translateX(1.5rem);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 4rem;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;
