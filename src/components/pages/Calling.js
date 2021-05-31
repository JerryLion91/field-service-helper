import React, { Fragment } from 'react';
import Button from '../layout/Button';
import Header from '../layout/Header';
import SideBarMenu from '../SideBarMenu';
import Loading from './Loading';

import '../../styles/slider.css';
import ReturnVisits from '../ReturnVisits';
import NotesForm from '../NotesForm';
import { useAuth } from '../../helpers/use-auth.js';
import { useFirestore } from '../../helpers/use-firestore';
import CreateNewList from '../CreateNewList';
import { fomattedPhoneNumber } from '../../helpers/format';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
// import '../styles/modalAnimation.css';

export default function Calling({ listToCall, setListToCall }) {
  const { user } = useAuth();
  const firestore = useFirestore();

  const isListAnArray = Array.isArray(listToCall);

  const [openModal, setOpenModal] = React.useState(!isListAnArray);

  const [isLoading, setIsLoading] = React.useState(null);
  const [currentCall, setCurrentCall] = React.useState(null);
  const [returnVisits, setReturnVisits] = React.useState(null);
  const [numberFormat, setNumberFormat] = React.useState('byFive');
  /**
   * Slider handler
   */
  const initSlides = (listToCall) => {
    if (isListAnArray) {
      const numbersToCall = listToCall.map((doc) => doc.phoneNumber);
      return {
        array: numbersToCall,
        prevSlide: null,
        currSlide: 0,
        nextSlide: 1,
        change: null,
      };
    } else {
      setCurrentCall({
        name: '',
        result: '',
        notes: '',
      });
      return {
        array: ['00000000000'],
        prevSlide: null,
        currSlide: 0,
        nextSlide: null,
        change: null,
      };
    }
  };
  const handleSlideChange = (state, action) => {
    const maxIndex = state.array.length - 1;
    switch (action.type) {
      case 'Next':
        return {
          ...state,
          prevSlide: state.currSlide,
          currSlide: state.nextSlide,
          nextSlide: state.nextSlide === maxIndex ? null : state.nextSlide + 1,
          change: 'Next',
        };
      case 'Prev':
        return {
          ...state,
          prevSlide: state.prevSlide === 0 ? null : state.prevSlide - 1,
          currSlide: state.prevSlide,
          nextSlide: state.currSlide,
          change: 'Prev',
        };
      case 'Reset':
        return initSlides(action.payload);
      default:
        throw new Error();
    }
  };
  const [slides, dispatchSlideChange] = React.useReducer(
    handleSlideChange,
    listToCall,
    initSlides
  );

  // end slider handler

  /**
   *
   * @param {Object} changeType dispatchSlideChange object
   * @param {Object} notes with .name, .result, .notes
   */
  const onPhoneNumberChange = async (changeType, notes) => {
    if (currentCall) {
      firestore
        .updatePhoneDetails(
          user.uid,
          listToCall[slides.currSlide].phoneNumber,
          currentCall
        )
        .then(() => {})
        .catch((err) => {
          console.error(err);
        });
    }
    if (notes !== '') {
      const callId = await firestore.addNewCall(
        user.uid,
        listToCall[slides.currSlide].phoneNumber,
        {
          caller: user.displayName,
          notes: notes,
        }
      );
      console.log(callId);
    }
    dispatchSlideChange(changeType);
  };

  const setupCurrentCall = async () => {
    const currentNumber = listToCall[slides.currSlide].phoneNumber;
    const phoneNumberDetails = await firestore.getPhoneNumberDetails(
      user.uid,
      currentNumber
    );
    const phoneNumberCalls = await firestore.getCallsByPhoneNumber(
      user.uid,
      currentNumber
    );
    setCurrentCall(phoneNumberDetails);
    setReturnVisits(phoneNumberCalls);
  };

  React.useEffect(() => {
    if (user) setupCurrentCall();
  }, [slides]);

  React.useEffect(() => {
    dispatchSlideChange({ type: 'Reset', payload: listToCall });
  }, [listToCall]);

  return (
    <>
      {!currentCall ? (
        <Loading />
      ) : (
        <div className={'container'} style={{ maxWidth: '800px' }}>
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <CreateNewList
              setOpenModal={setOpenModal}
              setListToCall={setListToCall}
              numberFormat={numberFormat}
            />
          </Modal>
          <Header subtitle={'Chamadas'}>
            <Button
              onClick={() => setOpenModal(true)}
              icon="add"
              classNames={'btn-flat'}
            />
            <SideBarMenu />
          </Header>
          {/* Slider */}
          <div
            className={'container'}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              height: '25vh',
              width: '100%',
            }}
          >
            {slides.array.map((slide, index) => {
              return (
                <Fragment key={index}>
                  {slides.prevSlide !== null && (
                    <div
                      className={
                        index === slides.prevSlide && slides.change === 'Prev'
                          ? 'phoneNumber prevCall SlideFromOut'
                          : index === slides.prevSlide &&
                            slides.change === 'Next'
                          ? 'phoneNumber prevCall SlideFromCurrToPrev'
                          : index === slides.prevSlide
                          ? 'phoneNumber prevCall'
                          : 'phoneNumber'
                      }
                    >
                      {index === slides.prevSlide && (
                        <p>{fomattedPhoneNumber(slide, numberFormat)}</p>
                      )}
                    </div>
                  )}
                  <div
                    className={
                      index === slides.currSlide && slides.change === 'Next'
                        ? 'phoneNumber currCall SlideFromNextToCurr'
                        : index === slides.currSlide && slides.change === 'Prev'
                        ? 'phoneNumber currCall SlideFromPrevToCurr'
                        : index === slides.currSlide
                        ? 'phoneNumber currCall'
                        : 'phoneNumber'
                    }
                  >
                    {index === slides.currSlide && (
                      <p>{fomattedPhoneNumber(slide, numberFormat)}</p>
                    )}
                  </div>
                  {slides.nextSlide !== null && (
                    <div
                      className={
                        index === slides.nextSlide && slides.change === 'Next'
                          ? 'phoneNumber nextCall SlideFromOut'
                          : index === slides.nextSlide &&
                            slides.change === 'Prev'
                          ? 'phoneNumber nextCall SlideFromCurrToNext'
                          : index === slides.nextSlide
                          ? 'phoneNumber nextCall'
                          : 'phoneNumber'
                      }
                    >
                      {index === slides.nextSlide && (
                        <p>{fomattedPhoneNumber(slide, numberFormat)}</p>
                      )}
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>

          <NotesForm
            phoneDetails={currentCall}
            onChangePhoneDetails={(newValue) => {
              setCurrentCall((prev) => {
                return { ...prev, ...newValue };
              });
            }}
            isLoading={isLoading}
            onPhoneNumberChange={onPhoneNumberChange}
            isNextNumberNull={slides.nextSlide === null}
            isPrevNumberNull={slides.prevSlide === null}
          />

          {returnVisits ? <ReturnVisits callsArray={returnVisits} /> : null}
        </div>
      )}
    </>
  );
}
