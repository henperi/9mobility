import React from 'react';
// import { TopBar } from '../../components/TopBar';
import { ConfirmNumber } from './ConfirmNumber';
import { ConfirmOTP } from './ConfirmOTP';
import { Register } from './Register';
import { RegisterationComplete } from './RegisterationComplete';

export const WelcomePage = () => {
  return (
    <>
      {/* <TopBar /> */}
      <ConfirmNumber />
      <ConfirmOTP />
      <Register />
      <RegisterationComplete />
    </>
  );
};
