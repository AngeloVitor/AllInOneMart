import { Product } from './Product';

export interface CartItemInput {
  pid: string;
  product_name: string;
  amount: number;
}

export interface CheckoutInputBody {
  Cart: CartItemInput[];
  EmailContact: string;
}

export interface CheckoutOutputBody {
  order_number: string;
  test_email_app_url: string;
}

export interface ErrorDetail {
  location: string;
  message: string;
  value: null;
}

export interface ErrorModel {
  detail: string;
  errors: ErrorDetail[];
  instance: string;
  status: number;
  title: string;
  type: string;
}

export interface ListProductsOutputBody {
  items: Product[];
  total_items: number;
}
