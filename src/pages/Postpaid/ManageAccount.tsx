import React, { useEffect, useState } from 'react';
import { Column } from '../../components/Column';
import { PageBody } from '../../components/PageBody';
import { Styles as CardStyles } from '../../components/Card/styles';
import appLogoBig from '../../assets/images/9mobile-logo-big.png';
import { BackButton } from '../../components/BackButton';
import { SizedBox } from '../../components/SizedBox';
import { Text } from '../../components/Text';
import { Colors } from '../../themes/colors';
import { Row } from '../../components/Row';
import { Card } from '../../components/Card';
import { ErrorBox } from '../../components/ErrorBox';
import { useLazyFetch } from '../../customHooks/useRequests';
import { CorporateDetailsResp } from './Interface';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';
import { TextField } from '../../components/TextField';
import { Spinner } from '../../components/Spinner';
import { RadioInput } from '../../components/RadioInput';
import { generateShortId } from '../../utils/generateShortId';

export const ManageAccount = () => {
  const [selectedNumber, setSelectedNumber] = useState<number>(-1);
  const [
    getCorporateDetails,
    {
      data: corporateData,
      error: corporateDataError,
      loading: corporateDetailsLoading,
    },
  ] = useLazyFetch<CorporateDetailsResp>(
    'Mobility.Account/api/PostPayTransaction/GetCorporateDetail',
  );

  const [
    getCorporateNumbers,
    {
      data: corporateNumbers,
      error: corporateNumbersError,
      loading: corporateNumbersLoading,
    },
  ] = useLazyFetch<CorporateDetailsResp>(
    'Mobility.Account/api/PostPayTransaction/GetCorporateNumbers',
  );

  useEffect(() => {
    getCorporateDetails();
  }, [getCorporateDetails, getCorporateNumbers]);

  useEffect(() => {
    if (corporateData) {
      getCorporateNumbers({
        contractNumber: String(corporateData.result.contractNumber),
        pageNumber: 1,
        pageSize: 5,
      });
    }
  }, [corporateData, getCorporateNumbers]);

  return (
    <PageBody>
      <Column justifyContent="center">
        <Column xs={12} md={7} lg={6}>
          <CardStyles.CardHeader
            style={{ height: '100%', position: 'relative', padding: '20px' }}
          >
            <img src={appLogoBig} alt="appLogoBig" />

            <BackButton />

            <SizedBox height={25} />

            <Column justifyContent="center">
              <Text size={18} weight={500}>
                Manage Numbers
              </Text>
              <Text size={14} color={Colors.grey} weight={200}>
                Services and features
              </Text>
            </Column>
          </CardStyles.CardHeader>

          <Card showOverlayedDesign fullWidth style={{ minHeight: '400px' }}>
            {corporateNumbersError && (
              <ErrorBox>{corporateNumbersError?.message}</ErrorBox>
            )}
            {corporateDetailsLoading ? (
              <Spinner isFixed />
            ) : (
              <>
                {corporateDataError ? (
                  <ErrorBox>{corporateDataError?.message}</ErrorBox>
                ) : (
                  <>
                    <Card
                      fullWidth
                      style={{
                        backgroundColor: convertHexToRGBA(
                          Colors.yellowGreen,
                          0.2,
                        ),
                        padding: '3%',
                      }}
                    >
                      <Row wrap justifyContent="space-between">
                        <Column xs={6}>
                          <Text size={16} weight="500" color={Colors.darkGreen}>
                            {corporateData?.result.contractName}
                          </Text>
                          <Text size={14}>
                            Admin: {corporateData?.result.adminNumber}
                          </Text>
                        </Column>
                        <Column xs={6} justifyContent="flex-end">
                          <Text size={16} weight="500" color={Colors.darkGreen}>
                            {corporateData?.result.contractNumber}
                          </Text>
                          <Text size={14}>Contact Number</Text>
                        </Column>
                      </Row>
                    </Card>
                    <SizedBox height={30} />
                    <Text weight="600" size={18}>
                      Numbers attached
                    </Text>
                    <SizedBox height={15} />
                    <Row childGap={10}>
                      <Column
                        lg={6}
                        xs={12}
                        style={{
                          flex: '1',
                          backgroundColor: Colors.white,
                        }}
                      >
                        <Card
                          fullWidth
                          fullHeight
                          style={{
                            padding: '5%',
                            minHeight: '250px',
                            maxHeight: '250px',
                            backgroundColor: convertHexToRGBA(
                              Colors.blackGrey,
                              0.1,
                            ),
                            border: `solid 1px ${convertHexToRGBA(
                              Colors.blackGrey,
                              0.1,
                            )}`,
                          }}
                        >
                          <TextField
                            placeholder="Search numbers"
                            onChange={() => null}
                            type="tel"
                            minLength={11}
                            maxLength={11}
                          />
                          <SizedBox height={20} />

                          {corporateNumbersLoading ? (
                            <Spinner isFixed />
                          ) : (
                            <>
                              {corporateNumbers?.result?.attachedNumbers
                                ?.length ? (
                                <>
                                  {corporateNumbers?.result.attachedNumbers.map(
                                    (num, index) => (
                                      <>
                                        <RadioInput
                                          key={generateShortId()}
                                          checked={selectedNumber === index}
                                          onChange={() =>
                                            setSelectedNumber(index)
                                          }
                                        >
                                          {num}
                                        </RadioInput>
                                        <SizedBox height={10} />
                                      </>
                                    ),
                                  )}
                                </>
                              ) : (
                                <Text>No numbers found</Text>
                              )}
                            </>
                          )}
                        </Card>
                      </Column>
                      <Column lg={6} xs={12} style={{ flex: '1' }}>
                        <Card
                          fullWidth
                          fullHeight
                          style={{
                            backgroundColor: Colors.darkGreen,
                            padding: '3%',
                            minHeight: '250px',
                            maxHeight: '250px',
                          }}
                        >
                          <Column
                            fullHeight
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Text color={Colors.white} alignment="center">
                              Display Services available on the MSISDN. Display
                              per MSISDN
                            </Text>
                          </Column>
                        </Card>
                      </Column>
                    </Row>
                  </>
                )}
              </>
            )}
          </Card>
        </Column>
      </Column>
    </PageBody>
  );
};
