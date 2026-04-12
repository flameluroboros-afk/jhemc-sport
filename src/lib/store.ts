import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  sizes: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

interface CartStore {
  cart: CartItem[];
  addItem: (product: Product, size: string) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addItem: (product, size) => {
        const item = get().cart.find((i) => i.id === product.id && i.selectedSize === size);
        if (item) {
          set({
            cart: get().cart.map((i) =>
              i.id === product.id && i.selectedSize === size
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ cart: [...get().cart, { ...product, quantity: 1, selectedSize: size }] });
        }
      },
      removeItem: (id, size) => {
        set({ cart: get().cart.filter((i) => !(i.id === id && i.selectedSize === size)) });
      },
      updateQuantity: (id, size, quantity) => {
        set({
          cart: get().cart.map((i) =>
            i.id === id && i.selectedSize === size ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        });
      },
      clearCart: () => set({ cart: [] }),
      getTotal: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'jhemc-cart',
    }
  )
);
