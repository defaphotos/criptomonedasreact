import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './componentes/Formulario';
import axios from 'axios';
import Cotizacion from './componentes/Cotizacion';
import Spinner from './componentes/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media(min-width:922px){
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content:'';
    width:100px;
    height:6px;
    background-color: #66A2FE;
    display:block;
  }
`;

function App() {
  const [moneda,guardarMoneda] = useState('');
  const [criptomoneda,guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const[cargando,guardarCargando] = useState(false);
  useEffect(()=>{

    const cotizarCriptomoneda = async()=>{
      if(moneda === '' || criptomoneda === '') return;

      let url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      let respuesta  = await axios.get(url);
      
      guardarCargando(true);
      setTimeout(()=>{
        guardarResultado(respuesta.data.DISPLAY[criptomoneda][moneda]);
        guardarCargando(false);

      },3000)
    }
    cotizarCriptomoneda();
  },[moneda,criptomoneda])
  
  return (
    <Contenedor>
    <div>
      <Imagen src={imagen} alt="imagen cripto" />
    </div>
    <div>
      <Heading>Cotizar Criptomonedas al Instante</Heading>
      <Formulario guardarMoneda={guardarMoneda} guardarCriptomoneda={guardarCriptomoneda} />
      {cargando ?<Spinner /> : <Cotizacion resultado={resultado} />
 }
    </div>

    </Contenedor>
  );
}

export default App;
