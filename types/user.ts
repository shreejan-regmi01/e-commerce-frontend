export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export const USER_TYPE = {
  CUSTOMER: "customer",
  SELLER: "seller",
  ADMIN: "admin",
};
