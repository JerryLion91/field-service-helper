import React from 'react';
import Button from '../layout/Button';
import FlexRow from '../layout/FlexRow';
import Header from '../layout/Header';
import Input from '../layout/Input';
import SideBarMenu from '../SideBarMenu';
import Loading from './Loading';
import M from 'materialize-css';

export default function Calling({
  numbersToCall = [11983031100, 11983031101, 11983031102, 11983031103],
}) {
  React.useEffect(() => {
    const instances = M.FormSelect.init(document.querySelectorAll('select'));
  }, []);

  const formReducer = (state, action) => {
    switch (action.type) {
      case 'name':
        return { ...state, name: action.value };
      case 'select':
        return { ...state, result: action.value };
      case 'notes':
        return { ...state, notes: action.value };
      default:
        throw new Error('formReducer');
    }
  };
  const [notes, dispatch] = React.useReducer(formReducer, {
    name: '',
    result: '',
    notes: '',
  });

  const [listIndex, setListIndex] = React.useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(notes);
  };

  return (
    <>
      {false ? (
        <Loading />
      ) : (
        <div className={'container'} style={{ maxWidth: '800px' }}>
          <Header title={'Ajudante de Servico'}>
            <Button onClick={() => {}} icon="schedule" />
            <SideBarMenu />
          </Header>
          <div>
            <div style={{ textAlign: 'center' }}>
              {listIndex === 0 ? '-' : numbersToCall[listIndex]}
            </div>
            <div style={{ textAlign: 'center' }}>activeNumber</div>
            <div style={{ textAlign: 'center' }}>nextNumber</div>
          </div>
          <div className="row">
            <form className="col s12" onSubmit={handleSubmit}>
              <div className="row">
                <Input
                  className="input-field col s6"
                  type="text"
                  id="nameNote"
                  label="Name"
                  icon="account_circle"
                  value={notes.name}
                  onChange={(newName) =>
                    dispatch({ type: 'name', value: newName })
                  }
                />
                <div className="input-field col s6">
                  <select
                    name="selectNote"
                    id="selectNote"
                    value={notes.result}
                    onChange={({ target }) =>
                      dispatch({ type: 'select', value: target.value })
                    }
                  >
                    <option value="" disabled>
                      Choose your option
                    </option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                  <label>Materialize Select</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea
                    id="textNotes"
                    className="materialize-textarea"
                    value={notes.notes}
                    onChange={({ target }) =>
                      dispatch({ type: 'notes', value: target.value })
                    }
                  />
                  <label htmlFor="textNotes">Textarea</label>
                </div>
              </div>
              <FlexRow>
                <button
                  className="btn waves-effect waves-light"
                  type="submit"
                  name="action"
                  onClick={() => console.log('next')}
                >
                  Next Number
                  <i className="material-icons right">skip_next</i>
                </button>
                <button
                  className="btn waves-effect waves-light"
                  type="submit"
                  name="action"
                  onClick={() => {
                    console.log('previous');
                  }}
                >
                  Previous Number
                  <i className="material-icons left">skip_previous</i>
                </button>
              </FlexRow>
            </form>
          </div>
          <div className="col s12">
            <div className="row"></div>
          </div>
        </div>
      )}
    </>
  );
}
