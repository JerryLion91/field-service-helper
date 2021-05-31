import React from 'react';
import { fomattedPhoneNumber } from '../helpers/format';
import { useFirestore } from '../helpers/use-firestore';
import { useAuth } from '../helpers/use-auth.js';

export default function CreateNewList({
  setOpenModal,
  setListToCall,
  numberFormat,
}) {
  const { user } = useAuth();
  const firestore = useFirestore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      firestore.postNewNumberList(user.uid, phoneNumber, 100);
      setListToCall(list);
      setOpenModal(false);
    } else {
      alert('You must be Logged');
    }
  };
  const [phoneNumber, setPhoneNumber] = React.useState('');

  return (
    <>
      <h5>Adicionar Nova Lista</h5>
      <form action="" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="firstName">
            First Number
            <input
              type="text"
              value={phoneNumber}
              onChange={({ target }) => {
                setPhoneNumber(target.value);
              }}
            />
          </label>
        </p>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

const list = [
  {
    phoneNumber: '11983031100',
    details: {
      name: 'Lucas',
      result: 'Option 1',
      calls: 1,
      callsArray: [
        {
          caller: 'Jeremias',
          date: '',
          notes: 'falei sobre uma coisa',
        },
      ],
      timestamp: 'hoje',
    },
  },
  {
    phoneNumber: '11983031101',
    details: {
      name: '',
      result: '',
      calls: 2,
      callsArray: [
        {
          caller: 'Jeremias',
          date: '',
          notes: 'falei sobre uma coisa',
        },
        {
          caller: 'Jeremias',
          date: '',
          notes: 'falei sobre uma segunda coisa',
        },
      ],
      timestamp: 'hoje',
    },
  },
  {
    phoneNumber: '11983031102',
    details: {
      name: '',
      result: '',
      calls: 0,
      timestamp: 'hoje',
    },
  },
];

/**
 *   ModalReference

const ModalProperties = {
  open: {
    type: 'Boolean',
    default: 'required',
    description: 'Control if the modal is open or not',
  },
  onClose: {
    type: 'Function',
    default: 'required',
    description:
      'Fired when the Modal is requested to be closed by a click on the overlay or when user press esc key',
  },
  children: {
    type: 'Node',
    default: '',
    description: 'The content of the modal',
  },
  closeOnEsc: {
    type: 'Boolean',
    default: 'true',
    description: 'Is the modal closable when user press esc key',
  },
  closeOnOverlayClick: {
    type: 'Boolean',
    default: 'true',
    description: 'Is the modal closable when user click on overlay',
  },
  little: {
    type: 'Boolean',
    default: 'false',
    description:
      "Is the dialog centered (when you don't have a lot of content)",
  },
  showCloseIcon: {
    type: 'Boolean',
    default: 'true',
    description: 'Show the close icon',
  },
  closeIconSize: {
    type: 'Number',
    default: '28',
    description: 'Close icon size',
  },
  closeIconSvgPath: {
    type: 'Node',
    default: '',
    description: 'A valid svg path to show as icon',
  },
  classNames: {
    type: 'Object',
    default: '{}',
    description:
      'An object containing classNames to style the modal, can have properties "overlay" (classname for overlay div), "modal" (classname for modal content div), "closeIcon" (classname for close icon svg). You can customize the transition with "transitionEnter", "transitionEnterActive", "transitionExit", "transitionExitActive"',
  },
  styles: {
    type: 'Object',
    default: '{}',
    description:
      'An object containing the styles objects to style the modal, can have properties "overlay", "modal", "closeIcon"',
  },
  animationDuration: {
    type: 'Number',
    default: '500',
    description: 'Animation duration in milliseconds',
  },
};

*/
