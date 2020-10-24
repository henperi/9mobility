import React, { useEffect, useState } from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
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
import { DropDownButton } from '../../components/Button/DropdownButton';
import { useSimStore } from '../../store/simStore';

interface BorrowEligibilityResp {
  result: {
    borrowingOptions: {
      mobileNumber: string;
      borrowingAmounts: {
        id: number;
        amount: number;
        interest: number;
      }[];
    }[];
  };
}

interface BorrowSuccessResp {
  responseCode: number;
  message: string;
}

export const BorrowAirtime: React.FC = () => {
  const [borrowAirtime, { loading, data, error }] = usePost<BorrowSuccessResp>(
    'Mobility.Account/api/Airtime/Borrow',
  );

  const { loading: loadingEligibility, data: dataEligibility } = useFetch<
    BorrowEligibilityResp
  >('Mobility.Account/api/Airtime/GetBorrowingEligibility');

  const [selectedNumber, setSelectedNumber] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number>();

  const [mobileNumbers, setMobileNumbers] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

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

      setMobileNumbers(mobileResults);
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

  const {
    state: { sim },
  } = useSimStore();

  const formik = useFormik({
    initialValues: {
      amount: '',
    },
    validationSchema: Yup.object({
      amount: Yup.number().required('Please select an amount'),
    }),
    onSubmit: async (formData) => {
      setShowConfirmationModal(true);
    },
  });

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleborrowAirtime = async () => {
    try {
      if (sim.secondarySim) {
        const response = await borrowAirtime({
          ...formik.values,
          mobileNumber: sim.secondarySim,
        });

        if (response.data) {
          setShowConfirmationModal(false);
          setShowSuccessModal(true);
          formik.resetForm();
        }
      } else {
        const response = await borrowAirtime({
          ...formik.values,
          mobileNumber: mobileNumbers[0].value,
        });

        if (response.data) {
          setShowConfirmationModal(false);
          setShowSuccessModal(true);
          formik.resetForm();
        }
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
            You are about to borrow airtime worth{' '}
            <Text variant="darker">N{formik.values.amount}</Text>
          </Text>
          <SizedBox height={10} />
          <Row useAppMargin>
            <Column xs={6} useAppMargin>
              <Button
                onClick={handleborrowAirtime}
                isLoading={loading}
                fullWidth
              >
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
      <PageBody centeralize>
        <Column xs={12} md={6} lg={5}>
          <CardStyles.CardHeader
            style={{ height: '100%', position: 'relative', padding: '20px' }}
          >
            <img src={appLogoBig} alt="appLogoBig" />

            <BackButton />

            <SizedBox height={25} />

            <Column justifyContent="center">
              <Text size={18} weight={500}>
                Borrow Airtime
              </Text>
              <Text size={14} color={Colors.grey} weight={200}>
                Borrow and pay back later
              </Text>
            </Column>
          </CardStyles.CardHeader>
          <Card showOverlayedDesign fullWidth padding="12% 15%">
            {error && <ErrorBox>{error.message}</ErrorBox>}
            {loadingEligibility ? (
              <Spinner />
            ) : (
              <form onSubmit={formik.handleSubmit}>
                <DropDownButton
                  dropdownOptions={mobileNumbers}
                  useDefaultName={false}
                  variant="default"
                  type="button"
                  fullWidth
                  style={{
                    minWidth: '150px',
                    display: 'flex',
                    padding: '10px',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: 'unset',
                    background: `#FBFBFB`,
                    border: `solid 1px ${Colors.grey}`,
                  }}
                >
                  <Text size={18} color={Colors.darkGreen} weight={500}>
                    {sim.secondarySim ||
                      (mobileNumbers && mobileNumbers[0]?.value)}
                  </Text>
                </DropDownButton>
                <SizedBox height={16} />
                <Row useAppMargin>
                  {borrowingAmounts &&
                    borrowingAmounts[selectedNumber].map((options) => (
                      <Column xs={4} useAppMargin key={options.id}>
                        <Button
                          fullWidth
                          onClick={() => {
                            setSelectedAmount(options.amount);
                            formik.setFieldValue('amount', options.amount);
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
                  Borrow
                </Button>
                {renderModals()}
              </form>
            )}
          </Card>
        </Column>
      </PageBody>
    </>
  );
};
