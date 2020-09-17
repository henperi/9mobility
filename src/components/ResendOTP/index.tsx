import React, { HtmlHTMLAttributes, useState } from 'react';
import { useCountdown } from '../../customHooks/useCountdown';
import { usePost } from '../../customHooks/useRequests';
import { Button } from '../Button';
import { ErrorBox } from '../ErrorBox';
import { Row } from '../Row';
import { Text } from '../Text';

interface IAvatar extends HtmlHTMLAttributes<HTMLDivElement> {
  time: number;
  trackingId: string | null;
}
export const ResendOTPIn: React.FC<IAvatar> = ({ time, trackingId }) => {
  const [baseTime, setTime] = useState(time);

  const countdown = useCountdown(baseTime);
  const [resendOTP] = usePost('Mobility.Onboarding/api/Verification/resendotp');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');

  const handleResendOTP = async () => {
    try {
      setLoading(true);
      setErrorMessage('');

      await resendOTP({ trackingNumber: trackingId });
      setLoading(false);
      setTime((prev) => (prev < 120 ? prev + 30 : prev));
    } catch (error) {
      setLoading(false);
      setErrorMessage((error as Error).message);
    }
  };

  return countdown > 0 ? (
    <Text alignment="center" size={15} variant="lighter">
      Resend OTP in {countdown}s
    </Text>
  ) : (
    <Row justifyContent="center">
      {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}
      <Button isLoading={loading} onClick={handleResendOTP} outline>
        Resend OTP
      </Button>
    </Row>
  );
};
