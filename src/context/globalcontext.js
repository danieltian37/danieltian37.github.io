import React, { createContext, use, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import handlePause from '../fluids/initializer.js'

const GlobalContext = createContext(
    {
        isVisible1: false,
        isVisible2: false,
        isVisible3: false,
        isVisible4: false,
        showFridge: () => {},
        showScrambler: () => {},
        showMonopobobility: () => {},
        showStoreChat: () => {},
    }
);

const GlobalContextProvider = ({ children }) => {
    const [isVisible1, setIsVisible1] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible3, setIsVisible3] = useState(false);
    const [isVisible4, setIsVisible4] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [first, setFirst] = useState(true);

    const leftButton = () => {
      if (isVisible1) {
        showScrambler();
      } else if (isVisible2) {
        showStoreChat();
      } else if (isVisible3) {
        showFridge();
      } else if (isVisible4) {
        showMonopobobility();
      }
    }
    const rightButton = () => {
      if (isVisible1) {
        showMonopobobility();
      } else if (isVisible2) {
        showFridge();
      } else if (isVisible3) {
        showStoreChat();
      } else if (isVisible4) {
        showScrambler();
      }
    }


    const showFridge = () => {
      setClicked(true);

      setIsVisible2(false);
      setIsVisible3(false);
      setIsVisible4(false);

      setIsVisible1(true);
      console.log(isVisible1)
      console.log("Open Fridge")
    };
    const showScrambler = () => {
      setClicked(true);
      
      setIsVisible1(false);
      setIsVisible3(false);
      setIsVisible4(false);

      setIsVisible2(true);
      console.log("Open Scrambler")
    };
    const showMonopobobility = () => {
      setClicked(true);
      
      setIsVisible1(false);
      setIsVisible2(false);
      setIsVisible4(false);

      setIsVisible3(true);
      console.log("Open Monopobobility")
    };
    const showStoreChat = () => {
      setClicked(true);
      
      setIsVisible1(false);
      setIsVisible2(false);
      setIsVisible3(false);

      setIsVisible4(true);
      console.log("Open StoreChat")
    };


    useEffect(() => {
      if (first) {
        setFirst(false);
      } else {
        handlePause()
      }
    }, [clicked]);

        return (
        <GlobalContext.Provider value={{
            isVisible1,
            setIsVisible1,
            isVisible2,
            setIsVisible2,
            isVisible3,
            setIsVisible3,
            isVisible4,
            setIsVisible4,
            showFridge,
            showScrambler,
            showMonopobobility,
            showStoreChat,
            leftButton,
            rightButton,
            setClicked,
            clicked,
        }}>
            {children}

        </GlobalContext.Provider>
    );
};

GlobalContextProvider.propTypes = {
    children: PropTypes.any
};

export default GlobalContext;

export {
    GlobalContextProvider
};