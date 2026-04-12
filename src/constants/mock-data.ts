import { Product } from "@/lib/store";
import { calcularPrecioVenta } from "@/lib/utils";

export const CATEGORIES = ["Calzado", "Ropa", "Accesorios"];

const createProduct = (id: string, name: string, basePrice: number, category: string, image: string, description: string, sizes: string[]): Product => ({
  id,
  name,
  price: calcularPrecioVenta(basePrice),
  description,
  category,
  image,
  sizes
});

export const MOCK_PRODUCTS: Product[] = [
  createProduct(
    "1",
    "Zapatillas Zoom Freak 5",
    180,
    "Calzado",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
    "Domina la cancha con la tracción explosiva y la amortiguación de última generación.",
    ["38", "39", "40", "41", "42", "43"]
  ),
  createProduct(
    "2",
    "Camiseta JHEMC Pro Dry",
    29,
    "Ropa",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
    "Tejido transpirable de alto rendimiento para tus entrenamientos más intensos.",
    ["S", "M", "L", "XL"]
  ),
  createProduct(
    "3",
    "Shorts Elite Velocity",
    45,
    "Ropa",
    "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1000&auto=format&fit=crop",
    "Diseñados para la velocidad y la movilidad total en cada zancada.",
    ["S", "M", "L", "XL"]
  ),
  createProduct(
    "4",
    "Gorra Sport Aero",
    15,
    "Accesorios",
    "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop",
    "Protección ligera y transpirable para tus carreras bajo el sol.",
    ["Única"]
  ),
];
