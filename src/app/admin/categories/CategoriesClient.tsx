'use client';

import { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X, Tag } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  _count?: {
    products: number;
  };
}

export default function CategoriesClient({ initialCategories }: { initialCategories: any[] }) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      });

      if (!res.ok) throw new Error('Error al crear');
      const data = await res.json();
      setCategories([...categories, { ...data, _count: { products: 0 } }].sort((a, b) => a.name.localeCompare(b.name)));
      setNewCategoryName('');
    } catch (err) {
      alert('Error al crear la categoría');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (cat: Category) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  const saveEdit = async () => {
    if (!editName.trim() || !editingId) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/categories/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName.trim() }),
      });

      if (!res.ok) throw new Error('Error al actualizar');
      const data = await res.json();
      setCategories(categories.map(c => c.id === editingId ? { ...c, name: data.name } : c));
      setEditingId(null);
    } catch (err) {
      alert('Error al actualizar');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const cat = categories.find(c => c.id === id);
    if (!cat) return;

    if (cat._count && cat._count.products > 0) {
      alert(`No se puede eliminar "${cat.name}" porque tiene ${cat._count.products} productos asociados.`);
      return;
    }

    if (!confirm(`¿Estás seguro de eliminar la categoría "${cat.name}"?`)) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al eliminar');
      }
      setCategories(categories.filter(c => c.id !== id));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Formulario Agregar */}
      <div className="lg:col-span-1">
        <div className="glass p-8 border border-white/5 sticky top-32">
          <h2 className="text-2xl font-black italic tracking-tight mb-6 uppercase flex items-center">
            <Plus className="mr-2 text-brand-neon" size={20} />
            AGREGAR NUEVA
          </h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-[10px] font-black italic tracking-widest text-white/40 mb-2 uppercase">
                NOMBRE DE LA CATEGORÍA
              </label>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full bg-brand-dark border border-white/10 px-4 py-3 font-bold text-white focus:border-brand-neon outline-none transition-colors"
                placeholder="EJ: CALZADO PRO"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !newCategoryName.trim()}
              className="w-full py-4 bg-brand-neon text-brand-dark font-black italic tracking-tighter hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 uppercase"
            >
              {loading ? 'GUARDANDO...' : 'CREAR CATEGORÍA'}
            </button>
          </form>
        </div>
      </div>

      {/* Lista de Categorías */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black italic tracking-tight uppercase">LISTADO ACTUAL</h2>
          <span className="text-[10px] font-black italic text-white/40 tracking-widest uppercase">
            {categories.length} CATEGORÍAS TOTALES
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className="glass p-6 border border-white/5 flex items-center justify-between group hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className="p-3 bg-brand-neon/10 text-brand-neon rounded-none">
                  <Tag size={20} />
                </div>
                
                {editingId === cat.id ? (
                  <input
                    autoFocus
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 bg-brand-dark border border-brand-neon px-3 py-2 font-bold text-white outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                  />
                ) : (
                  <div>
                    <h3 className="text-xl font-black italic tracking-tighter uppercase leading-none">
                      {cat.name}
                    </h3>
                    <p className="text-[10px] font-bold text-brand-neon tracking-widest uppercase mt-1">
                      {cat._count?.products || 0} PRODUCTOS ASOCIADOS
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 ml-4">
                {editingId === cat.id ? (
                  <>
                    <button 
                      onClick={saveEdit}
                      className="p-3 bg-brand-neon text-brand-dark hover:scale-110 transition-transform"
                    >
                      <Check size={18} />
                    </button>
                    <button 
                      onClick={() => setEditingId(null)}
                      className="p-3 bg-white/5 text-white hover:text-destructive hover:scale-110 transition-transform"
                    >
                      <X size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => handleEdit(cat)}
                      className="p-3 bg-white/5 text-white/40 hover:text-brand-neon hover:scale-110 transition-transform"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(cat.id)}
                      className="p-3 bg-white/5 text-white/40 hover:text-destructive hover:scale-110 transition-transform"
                    >
                      <Trash2 size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          {categories.length === 0 && (
            <div className="text-center py-20 glass border border-white/5">
              <p className="text-white/20 font-black italic uppercase tracking-widest">
                NO HAY CATEGORÍAS CREADAS
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
