import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Create Categories
  const calzado = await prisma.category.create({ data: { name: 'Calzado' } });
  const ropa = await prisma.category.create({ data: { name: 'Ropa' } });
  const accesorios = await prisma.category.create({ data: { name: 'Accesorios' } });

  const calcularPrecioVenta = (precioBase: number): number => {
    const precio = precioBase + 120;
    return Math.floor(precio / 10) * 10 + 9; 
  };

  // Create Products
  await prisma.product.createMany({
    data: [
      {
        name: "Zapatillas Zoom Freak 5",
        description: "Domina la cancha con la tracción explosiva y la amortiguación de última generación.",
        basePrice: 180,
        price: calcularPrecioVenta(180),
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
        stock: 12,
        sizes: "38,39,40,41,42,43",
        categoryId: calzado.id
      },
      {
        name: "Camiseta JHEMC Pro Dry",
        description: "Tejido transpirable de alto rendimiento para tus entrenamientos más intensos.",
        basePrice: 29,
        price: calcularPrecioVenta(29),
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
        stock: 25,
        sizes: "S,M,L,XL",
        categoryId: ropa.id
      },
      {
        name: "Shorts Elite Velocity",
        description: "Diseñados para la velocidad y la movilidad total en cada zancada.",
        basePrice: 45,
        price: calcularPrecioVenta(45),
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1000&auto=format&fit=crop",
        stock: 18,
        sizes: "S,M,L,XL",
        categoryId: ropa.id
      },
      {
        name: "Gorra Sport Aero",
        description: "Protección ligera y transpirable para tus carreras bajo el sol.",
        basePrice: 15,
        price: calcularPrecioVenta(15),
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop",
        stock: 5,
        sizes: "Única",
        categoryId: accesorios.id
      }
    ]
  });

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
