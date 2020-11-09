import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConfirmNumber } from '../pages/OnboardingPage/ConfirmNumber';
import { ConfirmOTP } from '../pages/OnboardingPage/ConfirmOTP';
import { Register } from '../pages/OnboardingPage/Register';
import { RegisterationComplete } from '../pages/OnboardingPage/RegisterationComplete';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Dashboard } from '../pages/Dashboard';
import { AirtimePage } from '../pages/Airtime';
import { CallHistory } from '../pages/CallHistory';
import { BuyWithPin } from '../pages/Airtime/BuyWithPin';
import { TransferAirtime } from '../pages/Airtime/TransferAirtime';
import { BorrowAirtime } from '../pages/Airtime/BorrowAirtime';
import { BuyWithDebitCard } from '../pages/Airtime/BuyWithDebitCard';
import { TransactionHistoryPage } from '../pages/TransactionHistory';
import { ValidateDataUsage } from '../pages/DataUsage';
import { DataPage } from '../pages/Data';
import { BuyDataWithCard } from '../pages/Data/BuyDataWithCard';
import { BuyDataWithAirtime } from '../pages/Data/BuyDataWithAirtime';
import { TransferData } from '../pages/Data/TransferData';
import { BorrowData } from '../pages/Data/BorrowData';
import { PrepaidPlansPage } from '../pages/PrepaidPlans';
import { Roaming } from '../pages/Roaming';
import { RoamingRates } from '../pages/Roaming/RoamingRates';
import { PostpaidPage } from '../pages/Postpaid';
import { PayBill } from '../pages/Postpaid/PayBill';
import { Download } from '../pages/Postpaid/Download';
import { BuyBundle } from '../pages/Postpaid/BuyBundle';
import { ManageAccount } from '../pages/Postpaid/ManageAccount';
import { SubscribedServices } from '../pages/SubscribedServices';
import { Settings } from '../pages/Settings';
import { ManageNumbers } from '../pages/Settings/ManageNumbers';
import { BuyRoamingBundles } from '../pages/Roaming/BuyRoamingBundles';
import { IDDRates } from '../pages/Roaming/IDDRates';
import { RegisterTest } from '../pages/OnboardingPage/TestRegister';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/onboarding" />} />
      <Route
        exact
        path="/onboarding"
        render={() => <Redirect to="/onboarding/confirmNumber" />}
      />
      <Route exact path="/onboarding/confirmNumber" component={ConfirmNumber} />
      <Route exact path="/onboarding/verifyOTP" component={ConfirmOTP} />
      <Route exact path="/onboarding/register" component={Register} />
      <Route exact path="/onboarding/register-test" component={RegisterTest} />
      <Route
        exact
        path="/onboarding/successful"
        component={RegisterationComplete}
      />
      <ProtectedRoute exact path="/dashboard" component={Dashboard} />
      <ProtectedRoute exact path="/airtime" component={AirtimePage} />

      <ProtectedRoute
        exact
        path="/airtime/buy-with-debit-card"
        component={BuyWithDebitCard}
      />
      <ProtectedRoute
        exact
        path="/airtime/buy-with-pin"
        component={BuyWithPin}
      />
      <ProtectedRoute
        exact
        path="/airtime/transfer"
        component={TransferAirtime}
      />
      <ProtectedRoute exact path="/airtime/borrow" component={BorrowAirtime} />

      <ProtectedRoute exact path="/data" component={DataPage} />
      <ProtectedRoute
        exact
        path="/data/buy-with-debit-card"
        component={BuyDataWithCard}
      />
      <ProtectedRoute
        exact
        path="/transaction/history"
        component={TransactionHistoryPage}
      />
      <ProtectedRoute
        exact
        path="/data-usage/history"
        component={ValidateDataUsage}
      />

      <ProtectedRoute
        exact
        path="/data/buy-with-airtime"
        component={BuyDataWithAirtime}
      />

      <ProtectedRoute exact path="/data/transfer" component={TransferData} />
      <ProtectedRoute exact path="/data/borrow" component={BorrowData} />
      <ProtectedRoute path="/call" component={CallHistory} />

      <ProtectedRoute
        exact
        path="/prepaid-plans"
        component={PrepaidPlansPage}
      />
      <ProtectedRoute exact path="/roaming" component={Roaming} />
      <ProtectedRoute exact path="/roaming/rates" component={RoamingRates} />
      <ProtectedRoute exact path="/roaming/idd-rates" component={IDDRates} />
      <ProtectedRoute
        exact
        path="/roaming/buy-bundle"
        component={BuyRoamingBundles}
      />

      <ProtectedRoute exact path="/postpaid" component={PostpaidPage} />
      <ProtectedRoute exact path="/postpaid/pay-bill" component={PayBill} />
      <ProtectedRoute
        exact
        path="/postpaid/download-statement"
        component={Download}
      />
      <ProtectedRoute exact path="/postpaid/buy-bundle" component={BuyBundle} />
      <ProtectedRoute
        exact
        path="/postpaid/manage-acct"
        component={ManageAccount}
      />
      <ProtectedRoute
        exact
        path="/subscribed-services"
        component={SubscribedServices}
      />
      <ProtectedRoute exact path="/settings" component={Settings} />
      <ProtectedRoute
        exact
        path="/settings/manage-numbers"
        component={ManageNumbers}
      />
    </Switch>
  );
};
