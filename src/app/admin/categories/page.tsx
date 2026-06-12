"use client";

import { useState, useEffect } from "react";
import { DataTable, Column } from "@/components/admin/DataTable";
import { Modal } from "@/components/admin/Modal";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { EmptyState } from "@/components/admin/EmptyState";
import { Tag, Plus, Trash2, Pencil } from "lucide-react";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  sort_order: number;
  created_at: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("sort_order");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: "50",
      search,
      sort,
      order: sortOrder,
    });
    const res = await fetch(`/api/admin/categories?${params}`);
    const data = await res.json();
    setCategories(data.categories || []);
    setTotalPages(data.totalPages || 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, [page, search, sort, sortOrder]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    await fetch(`/api/admin/categories/${deleteId}`, { method: "DELETE" });
    setDeleting(false);
    setDeleteId(null);
    fetchCategories();
  };

  const handleSave = async (formData: Partial<Category>) => {
    if (editCategory) {
      await fetch(`/api/admin/categories/${editCategory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }
    setShowForm(false);
    setEditCategory(null);
    fetchCategories();
  };

  const columns: Column<Category>[] = [
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
      key: "sort_order",
      label: "Order",
      sortable: true,
      render: (item) => (
        <span style={{ color: "#d9c1c2" }}>{item.sort_order}</span>
      ),
    },
    {
      key: "created_at",
      label: "Created",
      sortable: true,
      render: (item) => new Date(item.created_at).toLocaleDateString(),
    },
    {
      key: "actions",
      label: "",
      className: "w-[80px]",
      render: (item) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => { setEditCategory(item); setShowForm(true); }}
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
          Categories
        </h1>
        <button
          onClick={() => { setEditCategory(null); setShowForm(true); }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[12px] tracking-[0.1em] uppercase font-semibold transition-colors cursor-pointer"
          style={{ fontFamily: "var(--font-inter)", background: "#C6A972", color: "#0B0B0C" }}
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="flex-1 px-4 py-2.5 rounded-lg text-[13px] outline-none"
          style={{ fontFamily: "var(--font-inter)", background: "#222018", border: "1px solid #534344", color: "#e8e2d6" }}
        />
      </div>

      {categories.length === 0 && !loading ? (
        <EmptyState
          icon={Tag}
          title="No categories yet"
          description="Add your first category to organize products."
          action={{ label: "Add Category", onClick: () => setShowForm(true) }}
        />
      ) : (
        <DataTable
          columns={columns}
          data={categories}
          loading={loading}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onSort={(key, dir) => { setSort(key); setSortOrder(dir); }}
        />
      )}

      <CategoryFormModal
        open={showForm}
        onClose={() => { setShowForm(false); setEditCategory(null); }}
        onSave={handleSave}
        category={editCategory}
      />

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Category"
        message="This action cannot be undone. Products using this category will lose the association."
        loading={deleting}
      />
    </div>
  );
}

function CategoryFormModal({
  open,
  onClose,
  onSave,
  category,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: Partial<Category>) => void;
  category: Category | null;
}) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    sort_order: 0,
  });

  useEffect(() => {
    if (category) {
      setForm({
        name: category.name || "",
        slug: category.slug || "",
        description: category.description || "",
        sort_order: category.sort_order || 0,
      });
    } else {
      setForm({ name: "", slug: "", description: "", sort_order: 0 });
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form as unknown as Partial<Category>);
  };

  return (
    <Modal open={open} onClose={onClose} title={category ? "Edit Category" : "Add Category"}>
      <form onSubmit={handleSubmit} className="space-y-5">
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
            {category ? "Save Changes" : "Add Category"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
