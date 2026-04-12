import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Lógica del Precio: Base + 120, terminando siempre en el dígito 9
 */
export const calcularPrecioVenta = (precioBase: number): number => {
  const precio = precioBase + 120;
  return Math.floor(precio / 10) * 10 + 9; 
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  }).format(amount);
};
