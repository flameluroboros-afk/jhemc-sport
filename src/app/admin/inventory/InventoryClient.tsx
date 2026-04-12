'use client';

import { formatCurrency } from "@/lib/utils";
import { Plus, Search, Edit2, Trash2, MoreHorizontal, ArrowLeft, Loader2, Image as ImageIcon, Sparkles, Upload, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Product } from "@/lib/store";
import Modal from "@/components/admin/Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface InventoryClientProps {
  products: Product[];
  categories: { id: string, name: string }[];
}

export default function InventoryClient({ products, categories }: InventoryClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      handleOpenAdd();
      // Limpiar el parám de búsqueda para que no se reabra al recargar
      router.replace('/admin/inventory', { scroll: false });
    }
  }, [searchParams]);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    basePrice: '',
    image: '',
    stock: '',
    sizes: '',
    categoryId: categories[0]?.id || '',
    onSale: false,
    salePrice: ''
  });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      basePrice: '',
      image: '',
      stock: '',
      sizes: '',
      categoryId: categories[0]?.id || '',
      onSale: false,
      salePrice: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      basePrice: product.basePrice.toString(),
      image: product.image,
      stock: ((product as any).stock ?? 0).toString(),
      sizes: product.sizes.join(','),
      categoryId: categories.find(c => c.name === product.category)?.id || '',
      onSale: (product as any).onSale ?? false,
      salePrice: ((product as any).salePrice ?? '').toString(),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿ESTÁS SEGURO DE ELIMINAR ESTE PRODUCTO? ESTA ACCIÓN ES IRREVERSIBLE.')) return;
    
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading) return alert('Por favor espera a que la imagen se termine de subir.');
    
    setIsSubmitting(true);
    const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
    const method = editingProduct ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setIsModalOpen(false);
        startTransition(() => {
          router.refresh();
        });
      } else {
        const err = await res.json();
        alert(`Error: ${err.error || 'No se pudo guardar el producto'}`);
      }
    } catch (error) {
      console.error(error);
      alert('Error de conexión al servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const generateAIDescription = () => {
    if (!formData.name) return alert('¡Ingresa un nombre primero para inspirar a la IA!');
    const templates = [
      `DOMINA EL TERRENO CON ESTE EQUIPO DE ÉLITE. DISEÑADAS PARA MÁXIMO RENDIMIENTO Y COMODIDAD SUPERIOR EN CADA MOVIMIENTO.`,
      `TECNOLOGÍA DE PUNTA PARA ATLETAS QUE NO CONOCEN LÍMITES. LIGEREZA EXTREMA Y DURABILIDAD EN LAS CONDICIONES MÁS EXIGENTES.`,
      `ESTILO AGRESIVO Y RENDIMIENTO PROFESIONAL. LA PIEZA CLAVE QUE TU ENTRENAMIENTO NECESITA PARA LLEGAR AL SIGUIENTE NIVEL.`
    ];
    const random = templates[Math.floor(Math.random() * templates.length)];
    setFormData({ ...formData, description: `${formData.name.toUpperCase()}: ${random}` });
  };

  const handleBulkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    alert(`¡Detectado archivo: ${file.name}! Procesando subida masiva de productos... (Función en desarrollo)`);
  };

  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const dataPayload = new FormData();
    dataPayload.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: dataPayload,
      });

      if (res.ok) {
        const data = await res.json();
        setFormData({ ...formData, image: data.url });
      }
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Error al subir imagen');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <Link href="/admin" className="flex items-center text-white/40 hover:text-brand-neon mb-4 font-bold italic tracking-tight text-xs uppercase transition-colors">
            <ArrowLeft size={14} className="mr-2" />
            VOLVER AL DASHBOARD
          </Link>
          <h1 className="text-5xl md:text-7xl font-oswald font-black italic tracking-tighter uppercase">INVENTARIO</h1>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="flex items-center space-x-2 px-8 py-4 bg-brand-neon text-brand-dark font-oswald font-black italic text-sm hover:scale-105 transition-transform uppercase"
        >
          <Plus size={20} />
          <span>AÑADIR PRODUCTO</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-brand-neon transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="BUSCAR EQUIPO POR NOMBRE O CATEGORÍA..."
            className="w-full bg-brand-gray border border-white/5 py-4 pl-12 pr-4 text-sm font-bold italic outline-none focus:border-brand-neon/50 transition-all placeholder:text-white/20 uppercase"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="glass border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 border-b border-white/5 text-[10px] font-black tracking-widest text-white/40 uppercase italic">
              <tr>
                <th className="px-6 py-4">PRODUCTO</th>
                <th className="px-6 py-4 text-right">PRECIO</th>
                <th className="px-6 py-4 text-right">STOCK</th>
                <th className="px-6 py-4 text-right">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-12 h-12 bg-brand-dark border border-white/10 overflow-hidden">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="block font-oswald font-black italic text-sm group-hover:text-brand-neon transition-colors uppercase tracking-tight leading-none mb-1">{product.name}</span>
                        <span className="text-[9px] font-black italic text-white/30 tracking-widest uppercase">{product.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-oswald font-black italic text-brand-neon text-right">{formatCurrency(product.price)}</td>
                  <td className="px-6 py-4 font-black italic text-right">
                    <span className={(product as any).stock <= 5 ? "text-destructive" : "text-white"}>
                      {(product as any).stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button 
                         onClick={() => handleOpenEdit(product)}
                         className="p-2 hover:bg-white/5 text-white/40 hover:text-white transition-all">
                         <Edit2 size={16} />
                       </button>
                       <button 
                         onClick={() => handleDelete(product.id)}
                         className="p-2 hover:bg-white/5 text-white/40 hover:text-destructive transition-all">
                         <Trash2 size={16} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingProduct ? 'EDITAR PRODUCTO' : 'AÑADIR NUEVO PRODUCTO'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black italic tracking-widest text-white/40 uppercase">NOMBRE DEL PRODUCTO</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-brand-dark border border-white/10 p-4 text-sm font-bold italic focus:border-brand-neon outline-none transition-all uppercase"
                placeholder="EJ: ZAPATILLAS ZOOM X"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black italic tracking-widest text-white/40 uppercase">CATEGORÍA</label>
              <select 
                value={formData.categoryId}
                onChange={e => setFormData({...formData, categoryId: e.target.value})}
                className="w-full bg-brand-dark border border-white/10 p-4 text-sm font-bold italic focus:border-brand-neon outline-none transition-all uppercase cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name.toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label className="text-[10px] font-black italic tracking-widest text-white/40 uppercase">DESCRIPCIÓN TÉCNICA</label>
              <button 
                type="button"
                onClick={generateAIDescription}
                className="flex items-center space-x-1 text-brand-neon hover:text-white transition-colors text-[9px] font-black uppercase italic"
              >
                <Sparkles size={12} />
                <span>GENERAR CON IA</span>
              </button>
            </div>
            <textarea 
              required
              rows={3}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full bg-brand-dark border border-white/10 p-4 text-sm font-bold italic focus:border-brand-neon outline-none transition-all uppercase"
              placeholder="DETALLES DE ALTO RENDIMIENTO..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black italic tracking-widest text-white/40 uppercase">PRECIO BASE</label>
              <input 
                required
                type="number" 
                value={formData.basePrice || ''}
                onChange={e => setFormData({...formData, basePrice: e.target.value})}
                className="w-full bg-brand-dark border border-white/10 p-4 text-sm font-bold italic focus:border-brand-neon outline-none transition-all"
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black italic tracking-widest text-white/40 uppercase">PROMOCIÓN</label>
              <div className="flex items-center space-x-2 h-[54px] px-4 bg-brand-dark border border-white/10">
                <input 
                  type="checkbox"
                  checked={formData.onSale}
                  onChange={e => setFormData({...formData, onSale: e.target.checked})}
                  className="w-4 h-4 bg-brand-dark border-white/20 accent-brand-neon"
                />
                <span className="text-[10px] font-black italic text-white/60">ACTIVA</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black italic tracking-widest text-white/40 uppercase">PRECIO OFERTA</label>
              <input 
                type="number" 
                value={formData.salePrice || ''}
                onChange={e => setFormData({...formData, salePrice: e.target.value})}
                disabled={!formData.onSale}
                className="w-full bg-brand-dark border border-white/10 p-4 text-sm font-bold italic focus:border-brand-neon outline-none transition-all disabled:opacity-20"
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black italic tracking-widest text-white/40 uppercase">STOCK</label>
              <input 
                required
                type="number" 
                value={formData.stock || ''}
                onChange={e => setFormData({...formData, stock: e.target.value})}
                className="w-full bg-brand-dark border border-white/10 p-4 text-sm font-bold italic focus:border-brand-neon outline-none transition-all"
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black italic tracking-widest text-white/40 uppercase">TALLAS DISPONIBLES (PRESIONA ENTER PARA AÑADIR)</label>
            <div className="flex flex-wrap gap-2 p-3 bg-brand-dark border border-white/10 min-h-[54px] focus-within:border-brand-neon transition-all">
              {(formData.sizes || "").split(',').filter(s => s).map((size, index) => (
                <span key={index} className="flex items-center space-x-1 bg-brand-neon text-brand-dark px-2 py-1 text-[10px] font-black uppercase italic">
                  <span>{size}</span>
                  <button 
                    type="button"
                    onClick={() => {
                      const newSizes = formData.sizes.split(',').filter((_, i) => i !== index).join(',');
                      setFormData({ ...formData, sizes: newSizes });
                    }}
                    className="hover:scale-125 transition-transform"
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
              <input 
                type="text"
                placeholder="AÑADIR..."
                className="bg-transparent text-sm font-bold italic outline-none uppercase flex-1 min-w-[100px]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const val = (e.currentTarget.value || '').trim().toUpperCase();
                    if (val && !formData.sizes.includes(val)) {
                      setFormData({ ...formData, sizes: formData.sizes ? `${formData.sizes},${val}` : val });
                      e.currentTarget.value = '';
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black italic tracking-widest text-white/40 uppercase">IMAGEN DE PRODUCTO</label>
            <div className="flex gap-6">
              {/* Preview */}
              <div className="relative w-32 h-32 bg-brand-dark border border-white/10 flex items-center justify-center overflow-hidden">
                {formData.image ? (
                  <Image src={formData.image} alt="Preview" fill className="object-cover" />
                ) : (
                  <ImageIcon size={32} className="text-white/10" />
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-brand-dark/80 flex items-center justify-center">
                    <Loader2 size={24} className="animate-spin text-brand-neon" />
                  </div>
                )}
              </div>
              
              {/* Upload Button */}
              <div className="flex-1">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 hover:border-brand-neon/50 transition-colors cursor-pointer group bg-brand-dark/50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-white/20 group-hover:text-brand-neon transition-colors" />
                    <p className="mb-2 text-xs font-black italic tracking-tight text-white/40 uppercase">
                      <span className="text-brand-neon">HAZ CLIC PARA SUBIR</span> O ARRASTRA
                    </p>
                    <p className="text-[10px] text-white/20 font-bold">PNG, JPG O WEBP (MÁX. 5MB)</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
                
                {/* Fallback URL Input */}
                <input 
                  type="text" 
                  value={formData.image}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                  className="mt-2 w-full bg-transparent border-none text-[10px] text-white/30 font-bold italic focus:text-white transition-colors outline-none"
                  placeholder="O PEGA UN LINK AQUÍ..."
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              disabled={isPending || isSubmitting || isUploading}
              className="w-full py-5 bg-brand-neon text-brand-dark font-oswald font-black italic text-xl hover:scale-[1.02] transition-transform disabled:opacity-50"
            >
              {(isPending || isSubmitting) ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 size={24} className="animate-spin" />
                  <span>PROCESANDO...</span>
                </div>
              ) : (
                editingProduct ? 'GUARDAR CAMBIOS' : 'AÑADIR AL INVENTARIO'
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
