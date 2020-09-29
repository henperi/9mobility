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
import { TextField } from '../../components/TextField';
import { BackButton } from '../../components/BackButton';
import { getFieldError } from '../../utils/formikHelper';
import { usePost } from '../../customHooks/useRequests';
import { ErrorBox } from '../../components/ErrorBox';
import { Modal } from '../../components/Modal';
import { useGlobalStore } from '../../store';
import { logger } from '../../utils/logger';
import { ActivePlan } from '.';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';
import { useGetMobileNumbers } from '../../customHooks/useGetMobileNumber';
import { useGetActivePlan } from '../../customHooks/useGetActivePlan';
import { Spinner } from '../../components/Spinner';

interface MigrateSuccessResp {
  responseCode: number;
  message: string;
}

export const SinglePlan: React.FC<{
  plan: ActivePlan['result'];
  allPlans: ActivePlan['result'][];
}> = ({ plan, allPlans }) => {
  const {
    data: activePlan,
    loading: activePlanLoading,
    refetch,
  } = useGetActivePlan();

  const [migrateToPlan, { loading, data, error }] = usePost<MigrateSuccessResp>(
    'Mobility.Account/api/Plans/MigrateToPlan',
  );

  const { mobileNumbers } = useGetMobileNumbers();

  const [plans, setplans] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  useEffect(() => {
    if (allPlans) {
      const mobileResults = allPlans.map((option) => ({
        label: option.name,
        value: option.id,
      }));

      setplans(mobileResults);
    }
  }, [allPlans]);

  const {
    state: {
      auth: { user },
    },
  } = useGlobalStore();

  const formik = useFormik({
    initialValues: {
      offeringId: '',
      planName: '',
      mobileNumber: mobileNumbers ? mobileNumbers[0].value : '',
    },
    validationSchema: Yup.object({
      mobileNumber: Yup.string()
        .matches(/^\d{11}$/, 'Must be an 11 digit phone number')
        .required('This field is required'),
      planName: Yup.string().required('Please select plan name'),
      offeringId: Yup.string().required('Please select offering ID'),
    }),
    onSubmit: async (formData) => {
      setShowConfirmationModal(true);
    },
  });

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handlemigrateToPlan = async () => {
    try {
      const response = await migrateToPlan(formik.values);

      if (response.data) {
        await refetch();
        setShowConfirmationModal(false);
        setShowSuccessModal(true);
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
          <Text>Hi {user?.firstName}</Text>
          <SizedBox height={15} />
          <Text>
            You are about to migrate to{' '}
            <Text variant="darker">{formik.values.planName}</Text>
            prepaid plan
          </Text>
          <SizedBox height={10} />
          <Row useAppMargin>
            <Column xs={6} useAppMargin>
              <Button
                onClick={handlemigrateToPlan}
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
          <Text>Hi {user?.firstName}</Text>
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

  const getPlan = (planId: string) => {
    return allPlans.filter((thisPlan) => thisPlan.id === planId);
  };

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
                {plan.name}
              </Text>
              <Text size={14} color={Colors.grey} weight={200}>
                Prepaid Package
              </Text>
            </Column>
          </CardStyles.CardHeader>
          <Card showOverlayedDesign fullWidth>
            {error && <ErrorBox>{error.message}</ErrorBox>}
            <>
              <Text size={13} variant="lighter">
                Current Plan
              </Text>
              <SizedBox height={10} />
              <Card
                fullWidth
                style={{
                  backgroundColor: convertHexToRGBA(Colors.yellowGreen, 0.3),
                }}
              >
                {activePlanLoading ? (
                  <Spinner isFixed />
                ) : (
                  <>
                    <Text>{activePlan?.result.name}</Text>
                    <SizedBox height={10} />
                    <Text size={12} variant="lighter">
                      {activePlan?.result.description}
                    </Text>
                  </>
                )}
              </Card>

              <SizedBox height={30} />
              <Text size={13} variant="lighter">
                Other Plans
              </Text>
              <SizedBox height={10} />
              <Card fullWidth>
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    label="Migrate to other plans"
                    placeholder="Select Plan"
                    dropDown
                    dropDownOptions={plans}
                    onChange={(e) => {
                      const { id, name } = getPlan(e.target.value)[0];

                      formik.setValues({
                        offeringId: id,
                        planName: name,
                        mobileNumber: mobileNumbers
                          ? mobileNumbers[0].value
                          : '',
                      });
                    }}
                    type="tel"
                    minLength={11}
                    maxLength={11}
                    error={getFieldError(
                      formik.errors.planName,
                      formik.touched.planName,
                    )}
                  />
                  <SizedBox height={24} />
                  <Button
                    // disabled={!!formik.values.planName}
                    type="submit"
                    isLoading={loading}
                    fullWidth
                  >
                    {formik.values.planName
                      ? `Migrate to ${formik.values.planName}`
                      : 'Select an option'}
                  </Button>
                  {renderModals()}
                </form>
              </Card>
            </>
          </Card>
        </Column>
      </PageBody>
    </>
  );
};
