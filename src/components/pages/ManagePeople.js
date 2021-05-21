import React from 'react';

import Input from '../layout/Input';
import FlexRow from '../layout/FlexRow';
import Button from '../layout/Button';
import Header from '../layout/Header';
import Subtitle from '../layout/Subtitle';

import AddPersonButton from '../AddPersonButton';
import SideBarMenu from '../SideBarMenu';

import { useAuth } from '../../helpers/use-auth.js';
import { useFirestore } from '../../helpers/use-firestore';
import Loading from './Loading';

import M from 'materialize-css';

export default function ManagePeople() {
  const auth = useAuth();

  const firestore = useFirestore();
  const [users, setUsers] = React.useState(null);

  // const [state, setstate] = useState(initialState);

  const [searchValue, setSearchValue] = React.useState('');
  const handleInputChange = (newValue) => setSearchValue(newValue);

  React.useEffect(() => {
    const fetchData = async () => {
      const dataUsers = await firestore.getAllUsers();
      setUsers(dataUsers);
      // auth.user.uid === 'DxH4TB6UOsc2fFmUPXO0T5TOLtL2'
      // jerry.uid     === 'vweiFe8m2teiB6eWj6FwLCpgboH3'

      const phoneNumbers = await firestore.getPhoneNumbersByUser(
        'DxH4TB6UOsc2fFmUPXO0T5TOLtL2'
      );
      console.log(phoneNumbers);

      const calls = await firestore.getCallsByPhoneNumber(
        'vweiFe8m2teiB6eWj6FwLCpgboH3',
        11983031100
      );
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    firestore.postNewNumberList(
      'DxH4TB6UOsc2fFmUPXO0T5TOLtL2',
      11983031100,
      100
    );
    firestore.addNewCall('vweiFe8m2teiB6eWj6FwLCpgboH3', 11983031100, {
      caller: 'Jeremias Leao',
      notes: 'something',
    });
  }, []);

  return (
    <>
      {!users ? (
        <Loading />
      ) : (
        <div className={'container'} style={{ maxWidth: '800px' }}>
          <Header title={'Ajudante de Servico'}>
            <Button onClick={() => {}} icon="schedule" />
            <SideBarMenu />
          </Header>
          <FlexRow>
            <AddPersonButton className="col s2" />
            <Subtitle>Administrar Pessoas</Subtitle>
            <Button onClick={() => {}} icon="filter_alt" className="col s2" />
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
            <div className="row"></div>
          </div>
        </div>
      )}
    </>
  );
}
