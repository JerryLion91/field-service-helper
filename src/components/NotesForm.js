import React from 'react';
import FlexRow from './layout/FlexRow';
import Input from './layout/Input';
import { formattedDate } from '../helpers/format';
import M from 'materialize-css';
import Loading from './pages/Loading';

export default function NotesForm({
  phoneDetails = {
    calls: '',
    result: '',
    notes: '',
  },
  onChangePhoneDetails,
  isLoading = false,
  onPhoneNumberChange,
  isNextNumberNull,
  isPrevNumberNull,
}) {
  // init Materialize
  const [selectInstance, setSelectInstance] = React.useState(
    M.FormSelect.init(document.querySelector('#selectNote'))
  );
  React.useEffect(() => {
    if (selectInstance) selectInstance.input.value = phoneDetails.result;
  }, [phoneDetails]);

  const [formNotes, setFormNotes] = React.useState('');
  const [dateForm, setDateForm] = React.useState({
    year: 2020,
    month: 4,
    day: 31,
  });
  React.useEffect(() => {
    setDate(new Date(dateForm.year, dateForm.month, dateForm.day));
  }, [dateForm]);
  const [date, setDate] = React.useState(new Date().now);

  const handleNextClick = () => {
    onPhoneNumberChange({ type: 'Next' }, formNotes);
    setFormNotes('');
  };
  const handlePrevClick = () => {
    onPhoneNumberChange({ type: 'Prev' }, formNotes);
    setFormNotes('');
  };

  return (
    <div className="row">
      <form className="col s12" onSubmit={(e) => e.preventDefault()}>
        {!isLoading ? (
          <>
            <div className="row">
              <Input
                className="input-field col s6"
                type="text"
                id="nameNote"
                label="Nome"
                icon="account_circle"
                value={phoneDetails.name}
                onChange={(newName) => onChangePhoneDetails({ name: newName })}
              />
              <div className="input-field col s6">
                <select
                  name="selectNote"
                  id="selectNote"
                  value={phoneDetails.result}
                  onChange={({ target }) =>
                    onChangePhoneDetails({ result: target.value })
                  }
                >
                  <option value=""></option>
                  <option value="revisitar">Revisitar</option>
                  <option value="n_existe">Nao Existe</option>
                  <option value="nao_deseja">Nao Deseja</option>
                  <option value="fora_area">Fora de Area</option>
                  <option value="cx_postal">Caixa Postal</option>
                  <option value="bloqueado">Bloqueado</option>
                  <option value="ocupado">Ocupado</option>
                  <option value="caiu">Ligacao Caiu</option>
                  <option value="tj">Testemunha de Jeova</option>
                  <option value="neutral">Neutro</option>
                </select>
                <label htmlFor="selectNote">Resultado da chamada</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <span
                  className="helper-text"
                  data-error="wrong"
                  data-success="right"
                  style={{ textAlign: 'right' }}
                >
                  {formattedDate(date)}
                </span>
                <textarea
                  id="textNotes"
                  className="materialize-textarea"
                  value={formNotes}
                  onChange={({ target }) => setFormNotes(target.value)}
                />
                <label htmlFor="textNotes">Notas da chamada</label>
              </div>
            </div>
          </>
        ) : (
          <div className="row" style={{ height: '185px' }}>
            <Loading />
          </div>
        )}
        <FlexRow>
          <button
            disabled={isNextNumberNull || isLoading}
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
            onClick={handleNextClick}
          >
            Proximo
            <i className="material-icons right">skip_next</i>
          </button>
          <button
            disabled={isPrevNumberNull || isLoading}
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
            onClick={handlePrevClick}
          >
            Anterior
            <i className="material-icons left">skip_previous</i>
          </button>
        </FlexRow>
      </form>
      <div className="row">
        <div className="input-field col s3">
          <input
            type="text"
            name="year"
            id="year"
            value={dateForm.year}
            onChange={({ target }) => {
              setDateForm((prev) => {
                return { ...prev, year: target.value };
              });
            }}
          />
          <label htmlFor="year">Year</label>
        </div>
        <div className="input-field col s3">
          <input
            type="text"
            name="month"
            id="month"
            value={dateForm.month}
            onChange={({ target }) => {
              setDateForm((prev) => {
                return { ...prev, month: target.value };
              });
            }}
          />
          <label htmlFor="month">Month</label>
        </div>
        <div className="input-field col s3">
          <input
            type="text"
            name="day"
            id="day"
            value={dateForm.day}
            onChange={({ target }) => {
              setDateForm((prev) => {
                return { ...prev, day: target.value };
              });
            }}
          />
          <label htmlFor="day">Day</label>
        </div>
      </div>
    </div>
  );
}
