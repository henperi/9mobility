export interface BorrowEligibilityResp {
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

export interface BundlesResp {
  result: {
    id: string;
    bundle: string;
    cost: string;
    dataValue: string;
    validityDays: number;
    isActive: boolean;
    description: string;
    dataPlanId: number;
    categoryName: string;
  }[];
}

export interface IError {
  responseCode: number;
  message: string;
}

export const emptyError = {
  responseCode: 0,
  message: '',
};
