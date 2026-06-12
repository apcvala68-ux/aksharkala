"use client";

import { useState, useEffect } from "react";
import { DataTable, Column } from "@/components/admin/DataTable";
import { Modal } from "@/components/admin/Modal";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { EmptyState } from "@/components/admin/EmptyState";
import { Layers, Plus, Trash2, Pencil, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

interface Collection {
  id: number;
  name: string;
  slug: string;
  description: string;
  cover_image: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

interface Product {
  id: number;
  title: string;
  images: string[];
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("sort_order");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [editCollection, setEditCollection] = useState<Collection | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchCollections = async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: "10",
      search,
      sort,
      order: sortOrder,
    });
    const res = await fetch(`/api/admin/collections?${params}`);
    const data = await res.json();
    setCollections(data.collections || []);
    setTotalPages(data.totalPages || 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchCollections();
  }, [page, search, sort, sortOrder]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    await fetch(`/api/admin/collections/${deleteId}`, { method: "DELETE" });
    setDeleting(false);
    setDeleteId(null);
    fetchCollections();
  };

  const handleSave = async (formData: Partial<Collection> & { product_ids?: number[] }) => {
    if (editCollection) {
      await fetch(`/api/admin/collections/${editCollection.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      await fetch("/api/admin/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }
    setShowForm(false);
    setEditCollection(null);
    fetchCollections();
  };

  const toggleActive = async (col: Collection) => {
    await fetch(`/api/admin/collections/${col.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !col.is_active }),
    });
    fetchCollections();
  };

  const columns: Column<Collection>[] = [
    {
      key: "cover_image",
      label: "",
      className: "w-[60px]",
      render: (item) => (
        <div className="w-10 h-10 rounded-lg overflow-hidden" style={{ background: "#222018" }}>
          {item.cover_image ? (
            <Image src={item.cover_image} alt={item.name} width={40} height={40} className="object-cover w-full h-full" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Layers size={16} style={{ color: "#534344" }} />
            </div>
          )}
        </div>
      ),
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (item) => (
        <span className="font-medium" style={{ color: "#e8e2d6" }}>{item.name}</span>
      ),
    },
    { key: "slug", label: "Slug", sortable: true },
    {
      key: "is_active",
      label: "Status",
      render: (item) => (
        <button
          onClick={() => toggleActive(item)}
          className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold px-2 py-1 rounded cursor-pointer transition-colors"
          style={{
            fontFamily: "var(--font-inter)",
            background: item.is_active ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
            color: item.is_active ? "#22c55e" : "#EF4444",
          }}
        >
          {item.is_active ? <Eye size={12} /> : <EyeOff size={12} />}
          {item.is_active ? "Active" : "Draft"}
        </button>
      ),
    },
    {
      key: "sort_order",
      label: "Order",
      sortable: true,
      render: (item) => (
        <span style={{ color: "#d9c1c2" }}>{item.sort_order}</span>
      ),
    },
    {
      key: "actions",
      label: "",
      className: "w-[80px]",
      render: (item) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => { setEditCollection(item); setShowForm(true); }}
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
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1
          className="text-[24px] md:text-[28px] font-semibold"
          style={{ fontFamily: "var(--font-montserrat)", color: "#e8e2d6" }}
        >
          Collections
        </h1>
        <button
          onClick={() => { setEditCollection(null); setShowForm(true); }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[12px] tracking-[0.1em] uppercase font-semibold transition-colors cursor-pointer"
          style={{ fontFamily: "var(--font-inter)", background: "#C6A972", color: "#0B0B0C" }}
        >
          <Plus size={16} /> Add Collection
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Search collections..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="flex-1 px-4 py-2.5 rounded-lg text-[13px] outline-none"
          style={{ fontFamily: "var(--font-inter)", background: "#222018", border: "1px solid #534344", color: "#e8e2d6" }}
        />
      </div>

      {collections.length === 0 && !loading ? (
        <EmptyState
          icon={Layers}
          title="No collections yet"
          description="Create your first collection to group products."
          action={{ label: "Add Collection", onClick: () => setShowForm(true) }}
        />
      ) : (
        <DataTable
          columns={columns}
          data={collections}
          loading={loading}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onSort={(key, dir) => { setSort(key); setSortOrder(dir); }}
        />
      )}

      <CollectionFormModal
        open={showForm}
        onClose={() => { setShowForm(false); setEditCollection(null); }}
        onSave={handleSave}
        collection={editCollection}
      />

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Collection"
        message="This will remove the collection. Products will not be deleted."
        loading={deleting}
      />
    </div>
  );
}

function CollectionFormModal({
  open,
  onClose,
  onSave,
  collection,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  collection: Collection | null;
}) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    cover_image: "",
    sort_order: 0,
    is_active: true,
  });
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productSearch, setProductSearch] = useState("");

  useEffect(() => {
    if (open) {
      fetchProducts();
      if (collection) {
        setForm({
          name: collection.name || "",
          slug: collection.slug || "",
          description: collection.description || "",
          cover_image: collection.cover_image || "",
          sort_order: collection.sort_order || 0,
          is_active: collection.is_active !== false,
        });
        fetchCollectionProducts(collection.id);
      } else {
        setForm({ name: "", slug: "", description: "", cover_image: "", sort_order: 0, is_active: true });
        setSelectedProductIds([]);
      }
      setProductSearch("");
    }
  }, [collection, open]);

  const fetchProducts = async () => {
    setProductsLoading(true);
    const res = await fetch("/api/admin/products?limit=100");
    const data = await res.json();
    setAllProducts(data.products || []);
    setProductsLoading(false);
  };

  const fetchCollectionProducts = async (id: number) => {
    const res = await fetch(`/api/admin/collections/${id}`);
    const data = await res.json();
    setSelectedProductIds(data.products?.map((p: Product) => p.id) || []);
  };

  const toggleProduct = (id: number) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, product_ids: selectedProductIds });
  };

  return (
    <Modal open={open} onClose={onClose} title={collection ? "Edit Collection" : "Add Collection"} size="lg">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[11px] tracking-[0.1em] uppercase mb-2" style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}>
              Name *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg text-[13px] outline-none"
              style={{ fontFamily: "var(--font-inter)", background: "#222018", border: "1px solid #534344", color: "#e8e2d6" }}
              required
            />
          </div>
          <div>
            <label className="block text-[11px] tracking-[0.1em] uppercase mb-2" style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}>
              Slug
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              placeholder="auto-generated from name"
              className="w-full px-4 py-2.5 rounded-lg text-[13px] outline-none"
              style={{ fontFamily: "var(--font-inter)", background: "#222018", border: "1px solid #534344", color: "#e8e2d6" }}
            />
          </div>
          <div>
            <label className="block text-[11px] tracking-[0.1em] uppercase mb-2" style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}>
              Cover Image URL
            </label>
            <input
              type="text"
              value={form.cover_image}
              onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-2.5 rounded-lg text-[13px] outline-none"
              style={{ fontFamily: "var(--font-inter)", background: "#222018", border: "1px solid #534344", color: "#e8e2d6" }}
            />
          </div>
          <div>
            <label className="block text-[11px] tracking-[0.1em] uppercase mb-2" style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}>
              Sort Order
            </label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2.5 rounded-lg text-[13px] outline-none"
              style={{ fontFamily: "var(--font-inter)", background: "#222018", border: "1px solid #534344", color: "#e8e2d6" }}
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] tracking-[0.1em] uppercase mb-2" style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}>
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg text-[13px] outline-none resize-none"
            style={{ fontFamily: "var(--font-inter)", background: "#222018", border: "1px solid #534344", color: "#e8e2d6" }}
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
              className="sr-only"
            />
            <div
              className="w-9 h-5 rounded-full relative transition-colors"
              style={{ background: form.is_active ? "#C6A972" : "#534344" }}
            >
              <div
                className="absolute top-0.5 w-4 h-4 rounded-full transition-transform"
                style={{ background: "#fff", transform: form.is_active ? "translateX(18px)" : "translateX(2px)" }}
              />
            </div>
            <span className="text-[12px] uppercase tracking-wider" style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}>
              Active
            </span>
          </label>
        </div>

        {/* Product Picker */}
        <div>
          <label className="block text-[11px] tracking-[0.1em] uppercase mb-3" style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}>
            Products ({selectedProductIds.length} selected)
          </label>
          {productsLoading ? (
            <div className="text-[12px] py-4" style={{ color: "#534344" }}>Loading products...</div>
          ) : (
            <>
              {/* Search input */}
              {allProducts.length > 0 && (
                <div className="relative mb-3">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#534344" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg text-[12px] outline-none"
                    style={{ fontFamily: "var(--font-inter)", background: "#222018", border: "1px solid #534344", color: "#e8e2d6" }}
                  />
                </div>
              )}
              <div className="max-h-[240px] overflow-y-auto rounded-lg border" style={{ borderColor: "#534344", background: "#15130d" }}>
                {allProducts.length === 0 ? (
                  <div className="p-4 text-[12px] text-center" style={{ color: "#534344" }}>
                    No products available. Create products first.
                  </div>
                ) : (() => {
                  const filtered = allProducts.filter((p) =>
                    p.title.toLowerCase().includes(productSearch.toLowerCase())
                  );
                  if (filtered.length === 0) {
                    return (
                      <div className="p-4 text-[12px] text-center" style={{ color: "#534344" }}>
                        No products match &quot;{productSearch}&quot;
                      </div>
                    );
                  }
                  return filtered.map((product) => {
                    const isSelected = selectedProductIds.includes(product.id);
                    return (
                      <label
                        key={product.id}
                        className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-white/[0.02] border-b last:border-b-0"
                        style={{ borderColor: "#534344" }}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleProduct(product.id)}
                          className="sr-only"
                        />
                        <div
                          className="w-[18px] h-[18px] border rounded flex items-center justify-center transition-all shrink-0"
                          style={{
                            borderColor: isSelected ? "#C6A972" : "#534344",
                            background: isSelected ? "#C6A972" : "transparent",
                          }}
                        >
                          {isSelected && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4L3.5 6.5L9 1" stroke="#0B0B0C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <div className="w-8 h-8 rounded overflow-hidden shrink-0" style={{ background: "#222018" }}>
                          {product.images?.[0] ? (
                            <Image src={product.images[0]} alt="" width={32} height={32} className="object-cover w-full h-full" />
                          ) : null}
                        </div>
                        <span className="text-[13px] truncate" style={{ fontFamily: "var(--font-inter)", color: "#e8e2d6" }}>
                          {product.title}
                        </span>
                      </label>
                    );
                  });
                })()}
              </div>
            </>
          )}
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
            {collection ? "Save Changes" : "Add Collection"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
