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
  const [openAccordion, setOpenAccordion] = useState<string | null>("care");

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const sections = [
    {
      id: "care",
      label: "Heritage Care",
      content: (
        <div className="pt-4 pb-2 text-[13px] leading-[1.6] text-on-surface-variant/85" style={{ fontFamily: "var(--font-inter)" }}>
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
        <div className="pt-4 pb-2 text-[13px] leading-[1.6] text-on-surface-variant/85 space-y-2" style={{ fontFamily: "var(--font-inter)" }}>
          <p>
            <span className="text-on-surface/50 font-medium uppercase tracking-[0.05em] text-[11px] mr-2">MOQ:</span> {moq}
          </p>
          <p>
            <span className="text-on-surface/50 font-medium uppercase tracking-[0.05em] text-[11px] mr-2">Lead Time:</span> {lead_time}
          </p>
          <p>
            <span className="text-on-surface/50 font-medium uppercase tracking-[0.05em] text-[11px] mr-2">Customization:</span> {customization}
          </p>
          <p>
            <span className="text-on-surface/50 font-medium uppercase tracking-[0.05em] text-[11px] mr-2">Payment Terms:</span> Wire transfer / Letter of Credit
          </p>
        </div>
      ),
    },
    {
      id: "logistics",
      label: "Logistics & Terms",
      content: (
        <div className="pt-4 pb-2 text-[13px] leading-[1.6] text-on-surface-variant/85" style={{ fontFamily: "var(--font-inter)" }}>
          <p>
            FOB/CIF shipping terms available. Each piece undergoes rigorous quality inspection before dispatch. Secure global courier with full insurance coverage. Custom packaging and labeling available for retail partners.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="pt-2">
      {sections.map((section) => (
        <div key={section.id} className="py-4 border-b border-secondary/10">
          <button
            onClick={() => toggleAccordion(section.id)}
            className="flex justify-between items-center w-full text-[12px] tracking-[0.1em] font-medium text-on-surface uppercase outline-none cursor-pointer"
            style={{ fontFamily: "var(--font-inter)" }}
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
