import React, { useState } from 'react';
import { ActivePlan } from '.';
import { Button } from '../../components/Button';
import { Column } from '../../components/Column';
import { ErrorBox } from '../../components/ErrorBox';
import { Modal } from '../../components/Modal';
import { RadioInput } from '../../components/RadioInput';
import { Row } from '../../components/Row';
import { SizedBox } from '../../components/SizedBox';
import { Spinner } from '../../components/Spinner';
import { Text } from '../../components/Text';
import { useGetMobileNumbers } from '../../customHooks/useGetMobileNumber';
import { useFetch, usePost } from '../../customHooks/useRequests';
import { useGlobalStore } from '../../store';
import { Colors } from '../../themes/colors';
import { generateShortId } from '../../utils/generateShortId';
import { logger } from '../../utils/logger';
import { rem } from '../../utils/rem';

interface PackageResponse {
  result: [PackageResult];
  responseCode: number;
  message: string;
}

interface PackageResult {
  id: number;
  offeringId: string;
  planName: string;
  option: string;
}

interface MigrateSuccessResp {
  responseCode: number;
  message: string;
}

export const PackageAdvisor: React.FC<{
  showPackageAdvisor: boolean;
  setShowPackageAdvisor: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirmationPrompt: boolean;
  setShowConfirmationPrompt: React.Dispatch<React.SetStateAction<boolean>>;
  showSuccessModal: boolean;
  setShowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  refetchCurrentPlan: () => Promise<{
    loading: boolean;
    data: ActivePlan;
    error: null;
  }>;
}> = (props) => {
  const {
    setShowPackageAdvisor,
    showPackageAdvisor,
    showConfirmationPrompt,
    setShowConfirmationPrompt,
    showSuccessModal,
    setShowSuccessModal,
    refetchCurrentPlan,
  } = props;
  const [selectedPackage, setSelectedPackage] = useState<PackageResult>();
  const { mobileNumbers } = useGetMobileNumbers();

  const { data, loading, error: packagesError } = useFetch<PackageResponse>(
    'Mobility.Account/api/Plans/GetPackageAdvisorOptions',
  );

  const [
    migrateToPlan,
    { loading: isMigrating, error: migrationError },
  ] = usePost<MigrateSuccessResp>('Mobility.Account/api/Plans/MigrateToPlan');

  const {
    state: {
      auth: { user },
    },
  } = useGlobalStore();

  const handlemigrateToPlan = async () => {
    try {
      const response = await migrateToPlan({
        offeringId: selectedPackage?.offeringId,
        planName: selectedPackage?.planName,
        mobileNumber: mobileNumbers ? mobileNumbers[0].value : '',
      });

      if (response.data) {
        setShowSuccessModal(true);
      }
    } catch (errorResp) {
      logger.log(errorResp);
    }
  };

  const Package: React.FC<PackageResult> = (packageProps) => {
    const { option } = packageProps;
    return (
      <Row
        style={{
          padding: '5%',
          border: `solid ${
            packageProps.offeringId === selectedPackage?.offeringId
              ? '2px'
              : '1px'
          } ${Colors.darkGreen}`,
          borderRadius: `${rem(5)}`,
          marginBottom: `${rem(15)}`,
          cursor: 'pointer',
        }}
        alignItems="center"
        onClick={() => setSelectedPackage({ ...packageProps })}
      >
        <Column xs={1}>
          <RadioInput
            checked={packageProps.offeringId === selectedPackage?.offeringId}
          />
        </Column>
        <Column xs={11}>
          <Text>{option}</Text>
        </Column>
      </Row>
    );
  };

  if (showSuccessModal) {
    return (
      <Modal
        isVisible={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
        }}
        size="sm"
      >
        <SizedBox height={15} />
        <Column>
          <Text>Hi {user?.firstName},</Text>
          <SizedBox height={15} />
          <Text>
            You have successfully migrated to{' '}
            <Text casing="uppercase">{selectedPackage?.planName}</Text>
          </Text>
          <SizedBox height={10} />
          <Button
            onClick={() => {
              setShowSuccessModal(false);
              setShowConfirmationPrompt(false);
              setShowPackageAdvisor(false);
              refetchCurrentPlan();
            }}
            fullWidth
          >
            Done
          </Button>
        </Column>
      </Modal>
    );
  }

  if (showConfirmationPrompt) {
    return (
      <Modal
        isVisible={showConfirmationPrompt}
        onClose={() => setShowConfirmationPrompt(false)}
        header={{ title: 'Transaction Confirmation' }}
        size="sm"
      >
        {migrationError && <ErrorBox>{migrationError.message}</ErrorBox>}
        <SizedBox height={15} />
        <Column>
          <Text>Hi {user?.firstName},</Text>
          <SizedBox height={15} />
          <Text>
            You are about to migrate to{' '}
            <Text variant="darker" casing="uppercase">
              {selectedPackage?.planName}
            </Text>{' '}
            prepaid plan
          </Text>
          <SizedBox height={10} />
          <Row useAppMargin>
            <Column xs={6} useAppMargin>
              <Button
                onClick={handlemigrateToPlan}
                isLoading={isMigrating}
                fullWidth
              >
                Confirm
              </Button>
            </Column>
            <Column xs={6} useAppMargin>
              <Button
                onClick={() => {
                  setShowConfirmationPrompt(false);
                }}
                outline
                fullWidth
              >
                Cancel
              </Button>
            </Column>
          </Row>
        </Column>
      </Modal>
    );
  }

  return (
    <Modal
      isVisible={showPackageAdvisor}
      onClose={() => setShowPackageAdvisor(false)}
      size="sm"
      showCloseButton={false}
    >
      <Column style={{ padding: '3% 5% 0% 5%' }}>
        <Row justifyContent="space-between" alignItems="center">
          <Text size={24} weight={500}>
            Package Advisor
          </Text>
          <Text
            size={36}
            color={Colors.blackGrey}
            style={{ cursor: 'pointer' }}
            onClick={() => setShowPackageAdvisor(false)}
          >
            X
          </Text>
        </Row>

        <SizedBox height={40} />

        <Column>
          {packagesError && <ErrorBox>{packagesError.message}</ErrorBox>}
          {loading ? (
            <SizedBox height={200}>
              <Spinner isFixed>Fetching Advisory</Spinner>
            </SizedBox>
          ) : (
            <>
              {data?.result.map((pack) => (
                <Package key={generateShortId()} {...pack} />
              ))}
            </>
          )}
        </Column>
        <SizedBox height={20} />

        {selectedPackage && (
          <>
            <Text alignment="center" weight={600}>
              Got you: Recomended package for you is&nbsp;
              <Text casing="uppercase">
                {selectedPackage && selectedPackage.planName}
              </Text>
            </Text>
            <SizedBox height={35} />
            <Button
              fullWidth
              style={{ padding: '5%' }}
              onClick={() => {
                setShowConfirmationPrompt(true);
              }}
            >
              Activate&nbsp;
              <Text casing="uppercase">
                {selectedPackage && selectedPackage.planName}
              </Text>
            </Button>
          </>
        )}
      </Column>
    </Modal>
  );
};
