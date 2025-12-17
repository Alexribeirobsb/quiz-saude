import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para o banco de dados
export interface QuizResponse {
  id?: string;
  created_at?: string;
  answers: Record<number, string>;
  recommended_products: string[];
}

export interface Customer {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  cpf: string;
  phone?: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipcode: string;
  };
}

export interface Order {
  id?: string;
  created_at?: string;
  customer_id: string;
  products: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  payment_method: 'credit_card' | 'pix' | 'boleto';
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
}
