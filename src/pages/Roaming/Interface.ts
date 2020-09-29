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
