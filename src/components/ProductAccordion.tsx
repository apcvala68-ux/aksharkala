"use client";

import { useState } from "react";

interface ProductAccordionProps {
  description: string;
  fabric: string;
  moq: string;
  lead_time: string;
  customization: string;
}

export default function ProductAccordion({
  description,
  fabric,
  moq,
  lead_time,
  customization,
}: ProductAccordionProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>("craft");

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const sections = [
    {
      id: "craft",
      label: "Craft & Specifications",
      content: (
        <div className="pt-4 pb-2 text-sm text-on-surface-variant space-y-2" style={{ fontFamily: "var(--font-inter)" }}>
          <p>
            <strong className="text-on-surface font-medium">Fabric:</strong> {fabric}
          </p>
          <p>
            <strong className="text-on-surface font-medium">Technique:</strong> Handloom Kadwa Weave
          </p>
          <p>
            <strong className="text-on-surface font-medium">Origin:</strong> Banaras, India
          </p>
        </div>
      ),
    },
    {
      id: "care",
      label: "Heritage Care",
      content: (
        <div className="pt-4 pb-2 text-sm text-on-surface-variant" style={{ fontFamily: "var(--font-inter)" }}>
          <p>
            Dry clean only by specialists. To maintain the luster of the zari, wrap in unbleached cotton or muslin when storing. Avoid spraying perfumes directly on the fabric. Refold every 3-4 months to prevent creasing at the same lines.
          </p>
        </div>
      ),
    },
    {
      id: "wholesale",
      label: "Wholesale Details",
      content: (
        <div className="pt-4 pb-2 text-sm text-on-surface-variant space-y-2" style={{ fontFamily: "var(--font-inter)" }}>
          <p>
            <strong className="text-on-surface font-medium">MOQ:</strong> {moq}
          </p>
          <p>
            <strong className="text-on-surface font-medium">Lead Time:</strong> {lead_time}
          </p>
          <p>
            <strong className="text-on-surface font-medium">Customization:</strong> {customization}
          </p>
          <p>
            <strong className="text-on-surface font-medium">Payment Terms:</strong> Wire transfer / Letter of Credit
          </p>
        </div>
      ),
    },
    {
      id: "logistics",
      label: "Logistics & Terms",
      content: (
        <div className="pt-4 pb-2 text-sm text-on-surface-variant" style={{ fontFamily: "var(--font-inter)" }}>
          <p>
            FOB/CIF shipping terms available. Each piece undergoes rigorous quality inspection before dispatch. Secure global courier with full insurance coverage. Custom packaging and labeling available for retail partners.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="border-t border-secondary/20 pt-4">
      {sections.map((section) => (
        <div key={section.id} className="py-4 border-b border-secondary/20">
          <button
            onClick={() => toggleAccordion(section.id)}
            className="flex justify-between items-center w-full text-[16px] text-on-surface outline-none cursor-pointer"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {section.label}
            <span
              className={`material-symbols-outlined text-secondary transition-transform duration-300 ${
                openAccordion === section.id ? "rotate-180" : ""
              }`}
            >
              expand_more
            </span>
          </button>
          {openAccordion === section.id && section.content}
        </div>
      ))}
    </div>
  );
}
