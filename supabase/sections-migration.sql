-- Sections table — flexible JSONB content for all homepage sections
-- No schema changes needed ever — content is data, not code

CREATE TABLE IF NOT EXISTS sections (
  id          SERIAL PRIMARY KEY,
  section_key TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  content     JSONB NOT NULL DEFAULT '{}',
  is_active   BOOLEAN DEFAULT TRUE,
  sort_order  INT DEFAULT 0,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Seed defaults matching current page.tsx content
INSERT INTO sections (section_key, name, content, sort_order) VALUES
('hero', 'Hero Section', '{
  "media": [
    {
      "type": "video",
      "url": "https://cdn.pixabay.com/video/2025/03/17/265356_large.mp4",
      "poster": "https://lh3.googleusercontent.com/aida-public/AB6AXuABKOT7_VxtfeA10zCH31yrs3VRVjrhfVuscPNrBmAGs9eY-muoRUqWFU-DAY3Zpkvv-Js00HKolwcaZ51-KK--gxUUN9quq64MU0dYmoBJX2NZujd72a3u58AIQP5uyl_wm7AhZfUKCv68xC92MijB7WxeXIETa92jQJOMV1KHDEnue8k4kpX4qtELEJboeJBekY9sXylHBkHp_IJ-eXixE7e68PCX2znXD0Wr8LEto_j8feZVqH3HASzitGfc9pRX9oBerWRYAX4"
    }
  ],
  "tagline": "Est. 1924 — A Century of Legacy",
  "headline": "Weaving the Pedigree of Indian Royalty",
  "headlineHighlight": "Indian Royalty",
  "subtitle": "Woven on century-old looms using archive blueprints, our silks carry the weight of history and the touch of human hands. Crafted for those who value true rarity.",
  "buttons": [
    { "text": "Request Catalog", "link": "/inquiry" },
    { "text": "Our Heritage", "link": "/heritage" }
  ]
}', 1),

('journey', 'Journey Story', '{
  "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuCPXvlD2E3TYM0gRO61EKRMPkrSflh1xWQy_oKDp6AWME-YVlExUUb4uW5rHbqBCLa3Pbr4JLnMLNQiNofuoO7V5HQCPhH5_nra12Yh_s3HrfurjN3nj8oKU6pBaXpWOFIPdArFnbGGYJ4bOa-Je0-1NxINCOB0DFJxN-Af_xKEUiqltN5U3MFHdkB1YzsAK11u238E-5AlE0u6Z2F4Jh-D-oPypOJ-JLULT4C_jJFLFuXf7aGCbB16TiE-mPLn6hLK9V3wvYA3YCS7",
  "tagline": "Est. 1924",
  "headline": "Legacy of Threads",
  "body": "For a century, Aksharkala has been the silent custodian of India\u2019s weaving heritage. Every drape tells a story of ancestral looms, where pure silk meets the soul of the artisan, crafted painstakingly to perfection.",
  "badge": { "number": "100", "text": "Years of Legacy" },
  "link": { "text": "Our History", "url": "/heritage" }
}', 2),

('craft', 'Featured Collections', '{
  "tagline": "Curated Excellence",
  "headline": "The Collections",
  "cards": [
    {
      "title": "Sarees",
      "tagline": "Imperial Splendor",
      "description": "Woven gold zardozi on pure handloom mulberry silk, representing a century of Royal Indian drape.",
      "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBxLnC0jMc1xhqfA4gwdKmj4Pmdvp_oTy0ptNLye23_npmctrWn1UU57ABaSRgGIO6q-vEUg41zViWzc54o-dfz1--3WrLob2IuHWGWATgi2rmWFY0a5n_GKIudxvMeqSwtVjQeZ4sX2dNGzUxTzduaWihQtpiCIYmNr5TqwIZieM-fiN06ahpAy4mwmN7T0xxpPUy93vSGeqVQawGAyM3oug_dGIB2gJXnVsE0k4NEYeM209ymukYoI0bnxVKASBGBnkkoKmzF2Pww",
      "link": "/collections"
    },
    {
      "title": "Indo-Western",
      "tagline": "Contemporary Silhouette",
      "description": "Modern luxury cuts meets traditional Indian weave structures. Designed for the global runway.",
      "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuD68p1JbyTDEEuS9VLDw5DlxK0zyjjRlxr_pgFP1_1DM7vnt4DdCM5es9gFto52nUkBK2rES51QwhuoRcdI8GQX1rotwSIbUfFXyj5BVN75POTJg7LSq7T_66469Tz_ugX0ClYrXsBIVKUltk-IqDdHPnBgOO4Pc7C7YP4LjtNNDXOCTYuTm5k9sIRTeQcTw6U9nz99L0G_JW2b3Ld1KlgxzgtRYlxgmkTJdqOX0M_eyLXZ0T2pCuPmpBETcDIL5HsKleoL7vtApgvh",
      "link": "/collections"
    },
    {
      "title": "Heritage",
      "tagline": "Ancestral Treasures",
      "description": "Exquisite designs meticulously preserved from archive blueprints and woven on century-old looms.",
      "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuDcL77guvoyUb54i1ub-4lYTv1OuzOpOGbPBPNUZBWjAeLPnoYM-4J7yrrf9xK_2z1Fd2ABI6ghhayzjDthhg7-8FV0jnRhcpA_xggO2u_AcsBPUWp_eFAPbEBDIRd9fHmtKLXT_I60dIgR5Pn0NxRgiMs1-eBjVXxBz5ZQC4B6PSzC22c2Yg4BFIvd1wppWtl9JOhYAl3zCuVopBO_-dNzkrwQbswjQKQCS0vE35e2BNZfMrpzzIDQRXvaVVepjhBNHzzziFJAMlPH",
      "link": "/collections"
    }
  ]
}', 3),

('promise', 'Trust Signals', '{
  "headline": "The Art of the Hand-Woven",
  "subtitle": "Each Aksharkala piece undergoes a rigorous 300-hour weaving process. Our master artisans use ancestral techniques passed down through five generations to ensure every thread is a testament to perfection.",
  "cards": [
    {
      "title": "100% Pure Silk",
      "description": "Sourced from local organic farms, spun into luxury mulberry threads that offer unmatched natural luster, strength, and exquisite drape.",
      "icon": "diamond"
    },
    {
      "title": "Hand Embroidered",
      "description": "Intricate zardozi and fine kantha patterns created over weeks of painstaking craftsmanship by master artisans, rendering every piece unique.",
      "icon": "feather"
    },
    {
      "title": "Ethical Sourcing",
      "description": "Committed to transparent supply chains, sustainable materials, and fair wages that support local communities and protect weaving heritage.",
      "icon": "heart"
    }
  ]
}', 4),

('cta', 'Call to Action', '{
  "headline": "Begin Your Journey",
  "subtitle": "Discover our curated collections \u2014 each piece a testament to the enduring beauty of handcraft.",
  "buttons": [
    { "text": "Explore Collections", "link": "/collections" },
    { "text": "Request Wholesale Catalog", "link": "/inquiry" }
  ]
}', 5);

-- Enable RLS
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;

-- Public read: anyone can read active sections
CREATE POLICY "Public can view active sections"
  ON sections FOR SELECT
  USING (is_active = TRUE);

-- Admin full access via auth
CREATE POLICY "Admin users can manage sections"
  ON sections FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Allow sections in activity_log entity_type
ALTER TABLE activity_log DROP CONSTRAINT IF EXISTS activity_log_entity_type_check;
ALTER TABLE activity_log ADD CONSTRAINT activity_log_entity_type_check
  CHECK (entity_type IN ('product', 'inquiry', 'order', 'settings', 'sections'));
