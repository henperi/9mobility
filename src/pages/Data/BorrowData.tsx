import React, { useEffect, useState } from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { getFieldError } from '../../utils/formikHelper';
import { Styles as CardStyles } from '../../components/Card/styles';
import { PageBody } from '../../components/PageBody';

import appLogoBig from '../../assets/images/9mobile-logo-big.png';
import { Column } from '../../components/Column';
import { Text } from '../../components/Text';
import { Row } from '../../components/Row';
import { Colors } from '../../themes/colors';
import { SizedBox } from '../../components/SizedBox';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { BackButton } from '../../components/BackButton';
import { useFetch, usePost } from '../../customHooks/useRequests';
import { ErrorBox } from '../../components/ErrorBox';
import { Modal } from '../../components/Modal';
import { useGlobalStore } from '../../store';
import { Spinner } from '../../components/Spinner';
import { logger } from '../../utils/logger';
import { BorrowEligibilityResp } from './Interface';
import { generateShortId } from '../../utils/generateShortId';
import { TextField } from '../../components/TextField';
import { useGetMobileNumbers } from '../../customHooks/useGetMobileNumber';

interface BorrowSuccessResp {
  responseCode: number;
  message: string;
}

export const BorrowData: React.FC = () => {
  const [borrowData, { loading, data, error }] = usePost<BorrowSuccessResp>(
    'Mobility.Account/api/data/Borrow',
  );

  const { loading: loadingEligibility, data: dataEligibility } = useFetch<
    BorrowEligibilityResp
  >('Mobility.Account/api/Data/GetBorrowingEligibility');

  const [selectedNumber, setSelectedNumber] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number>();

  interface BorrowingAmounts {
    [x: string]: {
      id: number;
      amount: number;
      interest: number;
    }[];
  }

  const [borrowingAmounts, setBorrowingAmounts] = useState<BorrowingAmounts>();

  useEffect(() => {
    if (dataEligibility) {
      const mobileResults = dataEligibility.result.borrowingOptions.map(
        (option) => ({
          label: option.mobileNumber,
          value: option.mobileNumber,
        }),
      );

      setSelectedNumber(mobileResults[0].value);
    }
  }, [dataEligibility]);

  useEffect(() => {
    if (selectedNumber && dataEligibility) {
      const result: BorrowingAmounts = {};

      dataEligibility.result.borrowingOptions.map((option) => {
        if (option.mobileNumber === selectedNumber) {
          result[selectedNumber] = option.borrowingAmounts;
        }

        return option;
      });

      setBorrowingAmounts(result);
    }
  }, [dataEligibility, selectedNumber]);

  const {
    state: {
      auth: { user },
    },
  } = useGlobalStore();

  const formik = useFormik({
    initialValues: {
      mobileNumber: '',
      amount: '',
    },
    validationSchema: Yup.object({
      mobileNumber: Yup.string()
        .matches(/^\d{11}$/, 'Must be an 11 digit phone number')
        .required('This field is required'),
      amount: Yup.string().required('Please select an amount'),
    }),
    onSubmit: async (formData) => {
      setShowConfirmationModal(true);
    },
  });

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { mobileNumbers } = useGetMobileNumbers();

  const handleborrowData = async () => {
    try {
      const response = await borrowData({
        ...formik.values,
        amount: formik.values.amount,
      });

      if (response.data) {
        setShowConfirmationModal(false);
        setShowSuccessModal(true);
        formik.resetForm();
      }
    } catch (errorResp) {
      logger.log(errorResp);
    }
  };

  const renderModals = () => (
    <>
      <Modal
        isVisible={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        header={{ title: 'Transaction Confirmation' }}
        size="sm"
      >
        {error && <ErrorBox>{error.message}</ErrorBox>}
        <SizedBox height={15} />
        <Column>
          <Text>Hi {user?.firstName},</Text>
          <SizedBox height={15} />
          <Text>
            You are about to borrow data worth &nbsp;
            <Text variant="darker">N{formik.values.amount}</Text>
          </Text>
          <SizedBox height={10} />
          <Row useAppMargin>
            <Column xs={6} useAppMargin>
              <Button onClick={handleborrowData} isLoading={loading} fullWidth>
                Confirm
              </Button>
            </Column>
            <Column xs={6} useAppMargin>
              <Button
                onClick={() => setShowConfirmationModal(false)}
                outline
                fullWidth
              >
                Cancel
              </Button>
            </Column>
          </Row>
        </Column>
      </Modal>

      <Modal
        isVisible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        size="sm"
      >
        {error && <ErrorBox>{error.message}</ErrorBox>}
        <SizedBox height={15} />
        <Column>
          <Text>Hi {user?.firstName},</Text>
          <SizedBox height={15} />
          {data?.message && <Text>{data?.message}</Text>}
          <SizedBox height={10} />
          <Button
            onClick={() => setShowSuccessModal(false)}
            isLoading={loading}
            fullWidth
          >
            Done
          </Button>
        </Column>
      </Modal>
    </>
  );

  return (
    <>
      <PageBody>
        <Column justifyContent="center">
          <Column xs={12} md={6} lg={6}>
            <CardStyles.CardHeader
              style={{ height: '100%', position: 'relative', padding: '20px' }}
            >
              <img src={appLogoBig} alt="appLogoBig" />

              <BackButton />

              <SizedBox height={25} />

              <Column justifyContent="center">
                <Text size={18} weight={500}>
                  Borrow Data
                </Text>
                <Text size={14} color={Colors.grey} weight={200}>
                  Borrow and pay back later
                </Text>
              </Column>
            </CardStyles.CardHeader>
            <Card showOverlayedDesign fullWidth padding="7% 20%">
              {error && <ErrorBox>{error.message}</ErrorBox>}
              {loadingEligibility ? (
                <Spinner />
              ) : (
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    label="Select Phone Number"
                    placeholder="Select Phone"
                    dropDown
                    dropDownOptions={mobileNumbers}
                    value={formik.values.mobileNumber}
                    onChange={(e) =>
                      formik.setFieldValue('mobileNumber', e.target.value)
                    }
                    type="tel"
                    minLength={11}
                    maxLength={11}
                    error={getFieldError(
                      formik.errors.mobileNumber,
                      formik.touched.mobileNumber,
                    )}
                  />
                  <SizedBox height={16} />
                  <Text color={Colors.blackGrey}>
                    You are eligible to borrow amount below. Select any amount
                    to continue
                  </Text>
                  <SizedBox height={16} />

                  <Row useAppMargin>
                    {borrowingAmounts &&
                      borrowingAmounts[selectedNumber].map((options) => (
                        <Column xs={4} useAppMargin key={generateShortId()}>
                          <Button
                            fullWidth
                            onClick={() => {
                              setSelectedAmount(options.amount);
                              formik.setFieldValue(
                                'amount',
                                String(options.amount),
                              );
                            }}
                            variant="secondary"
                            outline={selectedAmount !== options.amount}
                            type="button"
                          >
                            {options.amount}
                          </Button>
                        </Column>
                      ))}
                  </Row>
                  {formik.errors.amount && (
                    <>
                      <SizedBox height={10} />
                      <ErrorBox>{formik.errors.amount}</ErrorBox>
                    </>
                  )}
                  <SizedBox height={24} />
                  <Button type="submit" isLoading={loading} fullWidth>
                    Borrow now
                  </Button>
                  {renderModals()}
                </form>
              )}
            </Card>
          </Column>
        </Column>
      </PageBody>
    </>
  );
};
