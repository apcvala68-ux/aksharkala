import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { label: "Collections", href: "/collections" },
  { label: "Heritage", href: "/heritage" },
  { label: "Inquiry", href: "/inquiry" },
  { label: "Craftsmanship", href: "/heritage" },
];

const legalLinks: never[] = [];

export default function Footer() {
  return (
    <footer className="relative z-10 w-full mt-auto bg-surface-container-lowest/90 backdrop-blur-md border-t border-secondary/10">
      {/* Top Section: Brand + Newsletter */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-20 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <Image
              src="/aksharkala-logo.png"
              alt="Aksharkala"
              width={180}
              height={50}
              className="h-14 w-auto"
              priority
            />
            <p
              className="text-[14px] text-on-surface-variant max-w-sm leading-[1.8]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Industrial luxury and textile artistry. Crafting hand-woven
              heirlooms for discerning global retailers since generations.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-secondary/20 text-on-surface-variant hover:text-secondary hover:border-secondary/50 hover:bg-secondary/5 transition-all duration-300 cursor-pointer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with us on LinkedIn"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-secondary/20 text-on-surface-variant hover:text-secondary hover:border-secondary/50 hover:bg-secondary/5 transition-all duration-300 cursor-pointer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://wa.me/919265854905"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact us on WhatsApp"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-secondary/20 text-on-surface-variant hover:text-secondary hover:border-secondary/50 hover:bg-secondary/5 transition-all duration-300 cursor-pointer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3
              className="text-[11px] tracking-[0.2em] uppercase text-secondary mb-6 font-semibold"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Explore
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-on-surface-variant hover:text-secondary transition-colors duration-300 inline-block cursor-pointer"
                    style={{
                      fontFamily: "var(--font-inter)",
                      lineHeight: "20px",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3
              className="text-[11px] tracking-[0.2em] uppercase text-secondary mb-6 font-semibold"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Wholesale Inquiries
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@aksharkala.com"
                  className="text-[14px] text-on-surface-variant hover:text-secondary transition-colors duration-300 inline-flex items-center gap-2 cursor-pointer"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-secondary/60 shrink-0"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  info@aksharkala.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919265854905"
                  className="text-[14px] text-on-surface-variant hover:text-secondary transition-colors duration-300 inline-flex items-center gap-2 cursor-pointer"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-secondary/60 shrink-0"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  +91 92658 54905
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-secondary/60 shrink-0 mt-0.5"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span
                  className="text-[14px] text-on-surface-variant leading-[20px]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  V-1132 Surat Textile Market(STM),
                  <br />
                  Ring Road, Surat, 395002
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-secondary/10">
        <div className="max-w-[1440px] mx-auto px-5 md:px-20 py-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6">
              <h3
                className="text-[18px] md:text-[20px] text-on-surface mb-2"
                style={{ fontFamily: "var(--font-playfair-display)" }}
              >
                Stay Updated
              </h3>
              <p
                className="text-[13px] text-on-surface-variant"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                New collections, artisan stories, and wholesale opportunities.
              </p>
            </div>
            <div className="md:col-span-6">
              <form
                className="flex flex-col sm:flex-row gap-3"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email address for newsletter"
                  className="flex-1 px-5 py-3.5 bg-surface-container border border-secondary/15 text-on-surface text-[14px] placeholder:text-on-surface-variant/50 focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/20 transition-all duration-300"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-secondary text-on-secondary text-[11px] tracking-[0.15em] uppercase font-semibold hover:bg-secondary-fixed-dim hover:text-on-secondary-fixed transition-all duration-300 cursor-pointer whitespace-nowrap"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary/10">
        <div className="max-w-[1440px] mx-auto px-5 md:px-20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p
              className="text-[12px] text-on-surface-variant/60"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              &copy; 2025 Aksharkala Global. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[12px] text-on-surface-variant/60 hover:text-secondary transition-colors duration-300 cursor-pointer"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
