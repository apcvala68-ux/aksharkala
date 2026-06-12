-- Aksharkala: Collections Migration
-- Run this SQL in Supabase SQL Editor AFTER seed.sql and admin-migration.sql

-- 1. Collections table
CREATE TABLE IF NOT EXISTS collections (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  cover_image TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Collection-Products junction (many-to-many)
CREATE TABLE IF NOT EXISTS collection_products (
  collection_id INT REFERENCES collections(id) ON DELETE CASCADE,
  product_id INT REFERENCES products(id) ON DELETE CASCADE,
  sort_order INT DEFAULT 0,
  PRIMARY KEY (collection_id, product_id)
);

-- 3. Enable RLS
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_products ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies

-- Public: anyone can view active collections
DROP POLICY IF EXISTS "Anyone can view active collections" ON collections;
CREATE POLICY "Anyone can view active collections" ON collections
  FOR SELECT USING (is_active = true);

-- Authenticated: full access
DROP POLICY IF EXISTS "Authenticated can manage collections" ON collections;
CREATE POLICY "Authenticated can manage collections" ON collections
  FOR ALL USING (auth.role() = 'authenticated');

-- Public: view collection_products for active collections
DROP POLICY IF EXISTS "Anyone can view collection products" ON collection_products;
CREATE POLICY "Anyone can view collection products" ON collection_products
  FOR SELECT USING (true);

-- Authenticated: full access
DROP POLICY IF EXISTS "Authenticated can manage collection products" ON collection_products;
CREATE POLICY "Authenticated can manage collection products" ON collection_products
  FOR ALL USING (auth.role() = 'authenticated');

-- 5. Seed sample collections
INSERT INTO collections (name, slug, description, cover_image, sort_order) VALUES
  ('Bridal Luxe', 'bridal-luxe', 'Handcrafted bridal sarees and lehengas for the modern bride. Pure silk, zari, and zardozi artistry.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxLnC0jMc1xhqfA4gwdKmj4Pmdvp_oTy0ptNLye23_npmctrWn1UU57ABaSRgGIO6q-vEUg41zViWzc54o-dfz1--3WrLob2IuHWGWATgi2rmWFY0a5n_GKIudxvMeqSwtVjQeZ4sX2dNGzUxTzduaWihQtpiCIYmNr5TqwIZieM-fiN06ahpAy4mwmN7T0xxpPUy93vSGeqVQawGAyM3oug_dGIB2gJXnVsE0k4NEYeM209ymukYoI0bnxVKASBGBnkkoKmzF2Pww', 1),
  ('Heritage Weaves', 'heritage-weaves', 'Timeless handloom traditions from Varanasi, Kanchipuram, and Paithani. Each piece tells a story.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcL77guvoyUb54i1ub-4lYTv1OuzOpOGbPBPNUZBWjAeLPnoYM-4J7yrrf9xK_2z1Fd2ABI6ghhayzjDthhg7-8FV0jnRhcpA_xggO2u_AcsBPUWp_eFAPbEBDIRd9fHmtKLXT_I60dIgR5Pn0NxRgiMs1-eBjVXxBz5ZQC4B6PSzC22c2Yg4BFIvd1wppWtl9JOhYAl3zCuVopBO_-dNzkrwQbswjQKQCS0vE35e2BNZfMrpzzIDQRXvaVVepjhBNHzzziFJAMlPH', 2),
  ('Contemporary Fusion', 'contemporary-fusion', 'Indo-Western silhouettes for the global luxury market. Innovation meets tradition.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqk7pcgq7TcCMv6gKAvf1wNXfWcBSohAR6jS3ltlbM3GeL5vVSOxbOTx_1OujRkoNGqGU2Ks_WE1YaScDn2-EfBEEPsNzA5iHZPaZD8h1RBZD7X-ROJ5HF2pZYWsjHmBQeirbBseaWh7-305VL2xLS5bq16vRN82HF74P_FqtPShW-NzOqf7LokYzzsRvVRjLXZ8fRgcGDEZ7pSQRkeix_z3flSY6nZKKLYCBjgnLCgMA5LD_sMZSEsErIre0JW3x0VLE8ZsyPFz_Q', 3),
  ('Vintage Revival', 'vintage-revival', 'Antique-finish silks and retro patina sarees. Nostalgia woven in every thread.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUkEikZ3xu-DFoTVTynqU_qXS89vSBkBVpYzVbh1K-sTZWeArHnVpKh-pjHNY-DlFe3xgVQVcaiPN-SCACY99-iq3JZoht-Eq8bB2h-I-LqkwWbvqhrQavyGXIPJOHs4g7GJuPt5pAdn-pr3Hya4n47s_aB50zRKNAz5me7etA0-TVwwAh0o48WcvGO5FEyyK4CF4VlOE464w3PLY7q3tMo54xXNPLHvid492ZBxLTd7q7LaVCjR79S1U0rqc5-xtc_ErdxMlwyli1', 4)
ON CONFLICT (slug) DO NOTHING;

-- 6. Link existing products to collections
DO $$
DECLARE
  bridal_id INT;
  heritage_id INT;
  contemporary_id INT;
  vintage_id INT;
BEGIN
  SELECT id INTO bridal_id FROM collections WHERE slug = 'bridal-luxe';
  SELECT id INTO heritage_id FROM collections WHERE slug = 'heritage-weaves';
  SELECT id INTO contemporary_id FROM collections WHERE slug = 'contemporary-fusion';
  SELECT id INTO vintage_id FROM collections WHERE slug = 'vintage-revival';

  -- Bridal Luxe: products 1,3,4 (Banarasi, Katan Brocade, Zardozi)
  INSERT INTO collection_products (collection_id, product_id, sort_order) VALUES
    (bridal_id, 1, 1), (bridal_id, 3, 2), (bridal_id, 4, 3)
  ON CONFLICT DO NOTHING;

  -- Heritage Weaves: products 2,7,10 (Kanjivaram, Handloom Cotton, Paithani)
  INSERT INTO collection_products (collection_id, product_id, sort_order) VALUES
    (heritage_id, 2, 1), (heritage_id, 7, 2), (heritage_id, 10, 3)
  ON CONFLICT DO NOTHING;

  -- Contemporary Fusion: products 5,6,9 (Leheriya, Tissue Silk, Indo-Western)
  INSERT INTO collection_products (collection_id, product_id, sort_order) VALUES
    (contemporary_id, 5, 1), (contemporary_id, 6, 2), (contemporary_id, 9, 3)
  ON CONFLICT DO NOTHING;

  -- Vintage Revival: products 8 (Vintage Silk)
  INSERT INTO collection_products (collection_id, product_id, sort_order) VALUES
    (vintage_id, 8, 1)
  ON CONFLICT DO NOTHING;
END $$;
