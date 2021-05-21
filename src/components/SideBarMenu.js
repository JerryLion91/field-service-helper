import React from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useAuth } from '../helpers/use-auth';
import '../styles/modalAnimation.css';

import Button from './layout/Button';

export default function SideBarMenu() {
  const auth = useAuth();

  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)} icon="person" />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        classNames={{
          modalAnimationIn: 'customEnterModalAnimation',
          modalAnimationOut: 'customLeaveModalAnimation',
        }}
        styles={{
          modalContainer: {
            left: '0px',
            top: '0px',
            height: '100%',
            width: '100%',
            position: 'relative',
          },
          modal: {
            left: '0px',
            top: '0px',
            position: 'absolute',
            margin: '0px',
            height: '100vh',
            width: '30vw',
          },
        }}
        showCloseIcon={false}
        animationDuration={600}
      >
        {auth ? (
          <>
            <div
              style={{ backgroundColor: 'red', width: '100%', height: '3px' }}
            ></div>
          </>
        ) : (
          <></>
        )}
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
