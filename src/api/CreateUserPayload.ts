// src/api/types/CreateUserPayload.ts

export type CreateUserPayload = {
  custom_fields: Record<string, unknown>;
  isEmailVerificationRequested: boolean;
  first_name: string;
  last_name: string;
  email: string;
  tags: string[];
  userRole: string;
  userCoursesToEnroll: string[] | null;

  enrollmentData: {
    addToSeat: boolean;
    justification: string;
    applyAffiliateCommissions: boolean;

    products: {
      id: string;
      price: number;
      expirationTimestamp: number | null;
      shouldSetCustomExpirationDate: boolean;
      productId: string;
    }[];

    createPaymentRecord: boolean;
    generateInvoice: boolean;
    sendWelcomeEmail: boolean;
    sendEnrollmentEmail: boolean;
    sendPaymentEmail: boolean;
    markProductsComplete: boolean;
    sendProductCompletionEmail: boolean;
  };

  account: {
    type: string;
  };
};