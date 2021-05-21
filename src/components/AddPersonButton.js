import React from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import '../styles/modalAnimation.css';

import Button from './layout/Button';

export default function AddPersonButton({ className, addPerson }) {
  const [open, setOpen] = React.useState(false);
  const [person, setPerson] = React.useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    // addPerson(newPerson);
  };

  return (
    <div className={className}>
      <Button onClick={() => setOpen(true)} icon="add" />
      <Modal open={open} onClose={() => setOpen(false)}>
        <h5>Adicionar pessoa</h5>
        <form action="" onSubmit={handleSubmit}>
          <p>
            <label htmlFor="firstName">
              First name
              <input type="text" />
            </label>
          </p>
          <p>
            <label htmlFor="lastName">
              Last name
              <input type="text" />
            </label>
          </p>
          <input type="submit" value="Submit" />
        </form>
      </Modal>
    </div>
  );
}

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
