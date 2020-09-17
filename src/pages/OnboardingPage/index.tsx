import React, { useState, Dispatch, SetStateAction } from 'react';
// import { TopBar } from '../../components/TopBar';
import { ConfirmNumber } from './ConfirmNumber';
import { ConfirmOTP } from './ConfirmOTP';
import { Register } from './Register';
import { RegisterationComplete } from './RegisterationComplete';

export const OnboardingScreen = {
  ConfirmNumber: 'ConfirmNumber',
  ConfirmOTP: 'ConfirmOTP',
  Register: 'Register',
  RegisterationComplete: 'RegisterationComplete',
} as const;

export interface SetScreen {
  setScreen: Dispatch<
    SetStateAction<
      'ConfirmNumber' | 'ConfirmOTP' | 'Register' | 'RegisterationComplete'
    >
  >;
}

export const OnboardingPage = () => {
  const [screen, setScreen] = useState<
    | 'ConfirmNumber'
    | 'ConfirmOTP'
    | 'Register'
    | 'ConfirmNumber'
    | 'RegisterationComplete'
  >(OnboardingScreen.ConfirmNumber);

  // const [mobileNumber, setMobileNumber] = useState<string>('');

  const getComponent = (
    key:
      | 'ConfirmNumber'
      | 'ConfirmOTP'
      | 'Register'
      | 'ConfirmNumber'
      | 'RegisterationComplete',
  ) => {
    switch (key) {
      case OnboardingScreen.ConfirmNumber:
        return <ConfirmNumber setScreen={setScreen} />;

      case OnboardingScreen.ConfirmOTP:
        return <ConfirmOTP setScreen={setScreen} />;

      case OnboardingScreen.Register:
        return <Register setScreen={setScreen} />;

      case OnboardingScreen.RegisterationComplete:
        return <RegisterationComplete setScreen={setScreen} />;

      default:
        return <ConfirmNumber setScreen={setScreen} />;
    }
  };

  return <>{getComponent(screen)}</>;
};
