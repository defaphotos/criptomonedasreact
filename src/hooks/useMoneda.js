import React, { Fragment, useState } from "react";
import styled from '@emotion/styled';

const Label = styled.label`
    font-family:'Bebas Neue',cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display:block;
`;

const Select = styled.select`
    width:100%;
    display:block;
    padding:1rem;
    -webkit-appearance:none;
    border-radius: 10px;
    border:none;
    font-size:1.2rem;
`;

const useMoneda = (label, stateInicial, opciones) => {
  const [state, actualizarState] = useState(stateInicial);

  const Seleccionar = () => {
    return (
      <Fragment>
        <Label>{label}</Label>
        <Select value={state} onChange={(e) => actualizarState(e.target.value)}>
          <option value="">Seleccione</option>
          {opciones.map((opcion) => {
            return (
              <option key={opcion.codigo} value={opcion.codigo}>
                {opcion.nombre}
              </option>
            );
          })}
        </Select>
      </Fragment>
    );
  };

  return [state, Seleccionar, actualizarState];
};

export default useMoneda;
