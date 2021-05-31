import React from 'react';

import Input from '../layout/Input';
import FlexRow from '../layout/FlexRow';
import Button from '../layout/Button';
import Header from '../layout/Header';
import Subtitle from '../layout/Subtitle';

import AddContactButton from '../AddContactButton';
import SideBarMenu from '../SideBarMenu';

import { useAuth } from '../../helpers/use-auth.js';
import { useFirestore } from '../../helpers/use-firestore';
import Loading from './Loading';
import PhoneCard from '../layout/PhoneCard';

import { useHistory } from 'react-router-dom';

// import M from 'materialize-css';

export default function ManagePeople({ setListToCall }) {
  const auth = useAuth();
  const history = useHistory();
  const firestore = useFirestore();
  const [users, setUsers] = React.useState(null);

  const [searchValue, setSearchValue] = React.useState('');
  const handleInputChange = (newValue) => setSearchValue(newValue);

  const [allPhoneNumbers, setAllPhoneNumbers] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const dataUsers = await firestore.getAllUsers();
      setUsers(dataUsers);
      // auth.user.uid === 'DxH4TB6UOsc2fFmUPXO0T5TOLtL2'
      // jerry.uid     === 'vweiFe8m2teiB6eWj6FwLCpgboH3'

      const phoneNumbers = await firestore.getPhoneNumbersByUser(
        dataUsers[0].uid
      );
      setAllPhoneNumbers(phoneNumbers);
    };
    fetchData();
  }, []);

  const handleCallList = () => {
    setListToCall(allPhoneNumbers);
    history.push('/calling');
  };

  return (
    <>
      {!allPhoneNumbers ? (
        <Loading />
      ) : (
        <div className={'container'} style={{ maxWidth: '800px' }}>
          <Header title={'Ajudante de Servico'}>
            <Button
              onClick={handleCallList}
              icon="call"
              classNames={'btn-flat'}
            />
            <SideBarMenu />
          </Header>
          <FlexRow>
            <AddContactButton className="col s2" />
            <Subtitle>Administrar Contatos</Subtitle>
            <Button
              onClick={() => {}}
              icon="filter_alt"
              className="col s2 btn-flat"
            />
          </FlexRow>
          <Input
            className="input-field col s12"
            type="text"
            label="Procurar"
            icon="search"
            value={searchValue}
            onChange={handleInputChange}
          />

          <div className="col s12">
            <div className="row">
              {allPhoneNumbers.map((document, index) => {
                return (
                  <div key={index}>
                    <PhoneCard document={document} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
