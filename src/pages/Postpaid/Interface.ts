export interface SuccessResp {
  result: {
    paymentLink: string;
  };
  responseCode: number;
  message: string;
}

export interface CorporateDetailsResp {
  result: {
    contractNumber: string;
    contractName: string;
    adminNumber: string;
    attachedNumbers: [string];
  };
}
