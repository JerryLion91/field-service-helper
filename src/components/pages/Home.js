import React from 'react';
import Button from '../layout/Button';
import Header from '../layout/Header';
import { useHistory } from 'react-router-dom';

export default function Home() {
  const history = useHistory();
  return (
    <div className={'container'} style={{ maxWidth: '800px' }}>
      <Header subtitle={'Home Page'} />
      <div className={'center'}>
        <h3>O que faremos hoje?</h3>
        <div className={'row'}>
          <Button onClick={() => history.push('/calling')} classNames={'btn'}>
            Lista de Numeros Nova
          </Button>
        </div>
        <div className={'row'}>
          <Button onClick={() => history.push('/manage')} classNames={'btn'}>
            Filtrar um lista de contatos
          </Button>
        </div>
      </div>
    </div>
  );
}
