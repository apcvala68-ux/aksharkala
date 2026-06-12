"use client";

import { useState, useEffect } from "react";
import { DataTable, Column } from "@/components/admin/DataTable";
import { Modal } from "@/components/admin/Modal";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { EmptyState } from "@/components/admin/EmptyState";
import { useAuth } from "@/components/admin/AdminAuthProvider";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Package, Plus, Trash2, Pencil } from "lucide-react";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  fabric: string;
  images: string[];
  created_at: string;
}

interface Category {
  id: number;
  name: string;
}

export default function ProductsPage() {
  const { adminUser } = useAuth();
  const isViewer = adminUser?.role === "viewer";
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: "10",
      search,
      category,
      sort,
      order: sortOrder,
    });
    const res = await fetch(`/api/admin/products?${params}`);
    const data = await res.json();
    setProducts(data.products || []);
    setTotalPages(data.totalPages || 1);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/admin/categories?limit=100");
    const data = await res.json();
    setCategories(data.categories || []);
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search, category, sort, sortOrder]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    await fetch(`/api/admin/products/${deleteId}`, { method: "DELETE" });
    setDeleting(false);
    setDeleteId(null);
    fetchProducts();
  };

  const handleSave = async (formData: Partial<Product>) => {
    if (editProduct) {
      await fetch(`/api/admin/products/${editProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }
    setShowForm(false);
    setEditProduct(null);
    fetchProducts();
  };

  const columns: Column<Product>[] = [
    {
      key: "image",
      label: "",
      className: "w-[60px]",
      render: (item) => (
        <div className="w-10 h-10 rounded-lg overflow-hidden" style={{ background: "#222018" }}>
          {item.images?.[0] ? (
            <Image src={item.images[0]} alt={item.title} width={40} height={40} className="object-cover w-full h-full" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package size={16} style={{ color: "#534344" }} />
            </div>
          )}
        </div>
      ),
    },
    {
      key: "title",
      label: "Title",
      sortable: true,
      render: (item) => (
        <span className="font-medium" style={{ color: "#e8e2d6" }}>{item.title}</span>
      ),
    },
    { key: "category", label: "Category", sortable: true },
    { key: "fabric", label: "Fabric", sortable: true },
    {
      key: "created_at",
      label: "Created",
      sortable: true,
      render: (item) => new Date(item.created_at).toLocaleDateString(),
    },
    ...(!isViewer
      ? [{
          key: "actions",
          label: "",
          className: "w-[80px]",
          render: (item: Product) => (
            <div className="flex items-center gap-1">
              <button
                onClick={() => { setEditProduct(item); setShowForm(true); }}
                className="p-1.5 rounded-lg transition-colors cursor-pointer hover:bg-white/5"
                style={{ color: "#d9c1c2" }}
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => setDeleteId(item.id)}
                className="p-1.5 rounded-lg transition-colors cursor-pointer hover:bg-white/5"
                style={{ color: "#EF4444" }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ),
        }]
      : []),
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1
          className="text-[24px] md:text-[28px] font-semibold"
          style={{ fontFamily: "var(--font-montserrat)", color: "#e8e2d6" }}
        >
          Products
        </h1>
        {!isViewer && (
          <button
            onClick={() => { setEditProduct(null); setShowForm(true); }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[12px] tracking-[0.1em] uppercase font-semibold transition-colors cursor-pointer"
            style={{ fontFamily: "var(--font-inter)", background: "#C6A972", color: "#0B0B0C" }}
          >
            <Plus size={16} /> Add Product
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="flex-1 px-4 py-2.5 rounded-lg text-[13px] outline-none"
          style={{ fontFamily: "var(--font-inter)", background: "#222018", border: "1px solid #534344", color: "#e8e2d6" }}
        />
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          className="px-4 py-2.5 rounded-lg text-[13px] outline-none cursor-pointer"
          style={{ fontFamily: "var(--font-inter)", background: "#222018", border: "1px solid #534344", color: "#e8e2d6" }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      {products.length === 0 && !loading ? (
        <EmptyState
          icon={Package}
          title="No products yet"
          description="Add your first product to get started."
          action={{ label: "Add Product", onClick: () => setShowForm(true) }}
        />
      ) : (
        <DataTable
          columns={columns}
          data={products}
          loading={loading}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onSort={(key, dir) => { setSort(key); setSortOrder(dir); }}
        />
      )}

      {/* Product Form Modal */}
      <ProductFormModal
        open={showForm}
        onClose={() => { setShowForm(false); setEditProduct(null); }}
        onSave={handleSave}
        product={editProduct}
        categories={categories}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Product"
        message="This action cannot be undone. The product will be permanently removed."
        loading={deleting}
      />
    </div>
  );
}

function ProductFormModal({
  open,
  onClose,
  onSave,
  product,
  categories,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: Partial<Product>) => void;
  product: Product | null;
  categories: Category[];
}) {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    price: "",
    fabric: "",
    category: "",
    moq: "",
    lead_time: "",
    customization: "",
    shipping: "FOB Mumbai / CIF global ports",
  });
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title || "",
        slug: (product as unknown as Record<string, string>).slug || "",
        description: (product as unknown as Record<string, string>).description || "",
        price: product.price || "",
        fabric: product.fabric || "",
        category: product.category || "",
        moq: (product as unknown as Record<string, string>).moq || "",
        lead_time: (product as unknown as Record<string, string>).lead_time || "",
        customization: (product as unknown as Record<string, string>).customization || "",
        shipping: (product as unknown as Record<string, string>).shipping || "FOB Mumbai / CIF global ports",
      });
      setImages(product.images || []);
    } else {
      setForm({
        title: "", slug: "", description: "", price: "", fabric: "", category: "",
        moq: "", lead_time: "", customization: "", shipping: "FOB Mumbai / CIF global ports",
      });
      setImages([]);
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, images } as unknown as Partial<Product>);
  };

  return (
    <Modal open={open} onClose={onClose} title={product ? "Edit Product" : "Add Product"} size="lg">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField label="Title *" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
          <InputField label="Slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} />
          <InputField label="Price" value={form.price} onChange={(v) => setForm({ ...form, price: v })} placeholder="Wholesale Pricing on Request" />
          <InputField label="Fabric" value={form.fabric} onChange={(v) => setForm({ ...form, fabric: v })} />
          <div>
            <label className="block text-[11px] tracking-[0.1em] uppercase mb-2" style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}>
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg text-[13px] outline-none cursor-pointer"
              style={{ fontFamily: "var(--font-inter)", background: "#222018", border: "1px solid #534344", color: "#e8e2d6" }}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <InputField label="MOQ" value={form.moq} onChange={(v) => setForm({ ...form, moq: v })} placeholder="e.g. 10 pieces" />
          <InputField label="Lead Time" value={form.lead_time} onChange={(v) => setForm({ ...form, lead_time: v })} placeholder="e.g. 45-60 days" />
          <InputField label="Shipping" value={form.shipping} onChange={(v) => setForm({ ...form, shipping: v })} />
        </div>
        <div>
          <label className="block text-[11px] tracking-[0.1em] uppercase mb-2" style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}>
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2.5 rounded-lg text-[13px] outline-none resize-none"
            style={{ fontFamily: "var(--font-inter)", background: "#222018", border: "1px solid #534344", color: "#e8e2d6" }}
          />
        </div>
        <div>
          <label className="block text-[11px] tracking-[0.1em] uppercase mb-2" style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}>
            Customization
          </label>
          <textarea
            value={form.customization}
            onChange={(e) => setForm({ ...form, customization: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg text-[13px] outline-none resize-none"
            style={{ fontFamily: "var(--font-inter)", background: "#222018", border: "1px solid #534344", color: "#e8e2d6" }}
          />
        </div>
        <div>
          <label className="block text-[11px] tracking-[0.1em] uppercase mb-2" style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}>
            Images
          </label>
          <ImageUpload
            images={images}
            onChange={setImages}
            folder={`aksharkala/products/${form.slug || "uncategorized"}`}
            maxImages={8}
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer hover:bg-white/5"
            style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2", border: "1px solid #534344" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-colors cursor-pointer"
            style={{ fontFamily: "var(--font-inter)", background: "#C6A972", color: "#0B0B0C" }}
          >
            {product ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] tracking-[0.1em] uppercase mb-2" style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}>
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-lg text-[13px] outline-none"
        style={{ fontFamily: "var(--font-inter)", background: "#222018", border: "1px solid #534344", color: "#e8e2d6" }}
      />
    </div>
  );
}
