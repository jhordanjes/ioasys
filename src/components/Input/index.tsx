// Componente input utilizando o Formik. Capturando erros e focus.
import React, { InputHTMLAttributes, useState, FocusEvent } from 'react';
import { Field, ErrorMessage } from 'formik';
import { Container, Content, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export function Input({ name, label, ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFilled(!!e.target.value);
    setIsFocused(false);
  };

  return (
    <Container>
      <Content isFocused={isFocused} isFilled={isFilled}>
        <label htmlFor={name}>{label}</label>

        <Field
          id={name}
          name={name}
          as="input"
          {...rest}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
      </Content>

      <ErrorMessage name={name} render={msg => <Error>{msg}</Error>} />
    </Container>
  );
}
