-- ============================================================
-- Aksharkala: Supabase Schema + Complete 10-Item Catalog
-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard/project/swhjjgsyufuxeprlwxeb/sql/new)
-- ============================================================

-- 1. Products Table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  price TEXT DEFAULT 'Wholesale Pricing on Request',
  fabric TEXT,
  category TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  moq TEXT DEFAULT '5 pieces per style',
  lead_time TEXT DEFAULT '6-8 weeks',
  customization TEXT DEFAULT 'Custom colors, zari patterns, and blouse designs available',
  shipping TEXT DEFAULT 'FOB Mumbai / CIF global ports',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'read', 'replied', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view products" ON products;
CREATE POLICY "Anyone can view products" ON products
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can submit inquiries" ON inquiries;
CREATE POLICY "Anyone can submit inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can view inquiries" ON inquiries;
CREATE POLICY "Authenticated users can view inquiries" ON inquiries
  FOR SELECT USING (auth.role() = 'authenticated');

-- 4. Seed 10 Products

-- Base URL for Stitch HD images
-- All images are HD quality on Google CDN with 4K+ resolution

TRUNCATE products RESTART IDENTITY CASCADE;

-- Product 1: Banarasi Silk Saree - Handwoven
INSERT INTO products (title, slug, description, fabric, category, images, moq, lead_time, customization)
VALUES (
  'Banarasi Silk Saree - Handwoven',
  'banarasi-silk-saree-handwoven',
  'Handwoven Banarasi silk saree with intricate zari work. Each saree takes 45–60 days to complete on traditional handlooms by master weavers in Varanasi. The fabric shimmers with a rich gold patina, woven with authentic Banarasi brocade patterns including floral motifs, paisley, and kalga borders. Features a heavy gold zari pallu and complementary blouse piece. Suitable for bridal trousseau, festive celebrations, and luxury evening wear.',
  'Pure Katan Silk with Original Zari',
  'Banarasi',
  '["https://lh3.googleusercontent.com/aida-public/AB6AXuBxLnC0jMc1xhqfA4gwdKmj4Pmdvp_oTy0ptNLye23_npmctrWn1UU57ABaSRgGIO6q-vEUg41zViWzc54o-dfz1--3WrLob2IuHWGWATgi2rmWFY0a5n_GKIudxvMeqSwtVjQeZ4sX2dNGzUxTzduaWihQtpiCIYmNr5TqwIZieM-fiN06ahpAy4mwmN7T0xxpPUy93vSGeqVQawGAyM3oug_dGIB2gJXnVsE0k4NEYeM209ymukYoI0bnxVKASBGBnkkoKmzF2Pww","https://lh3.googleusercontent.com/aida-public/AB6AXuABKOT7_VxtfeA10zCH31yrs3VRVjrhfVuscPNrBmAGs9eY-muoRUqWFU-DAY3Zpkvv-Js00HKolwcaZ51-KK--gxUUN9quq64MU0dYmoBJX2NZujd72a3u58AIQP5uyl_wm7AhZfUKCv68xC92MijB7WxeXIETa92jQJOMV1KHDEnue8k4kpX4qtELEJboeJBekY9sXylHBkHp_IJ-eXixE7e68PCX2znXD0Wr8LEto_j8feZVqH3HASzitGfc9pRX9oBerWRYAX4"]'::jsonb,
  '3 pieces per style',
  '6–8 weeks',
  'Custom zari colors, border width, and blouse design available'
);

-- Product 2: Kanjivaram Silk Saree - Temple Heritage
INSERT INTO products (title, slug, description, fabric, category, images, moq, lead_time, customization)
VALUES (
  'Kanjivaram Silk Saree - Temple Heritage',
  'kanjivaram-silk-saree-temple-heritage',
  'Traditional Kanjivaram silk saree from Tamil Nadu, woven with a distinctive temple border. The body and border are woven separately and interlocked using the korvai technique — a hallmark of authentic Kanjivaram weaving. Rich jewel tones with traditional motifs inspired by South Indian temple architecture, including rudraksham, temple gopuram, and paisley designs. Pure zari woven pallu adds grandeur to this piece.',
  'Pure Mulberry Kanjivaram Silk',
  'Heritage',
  '["https://images.pexels.com/photos/10317106/pexels-photo-10317106.jpeg","https://lh3.googleusercontent.com/aida-public/AB6AXuD68p1JbyTDEEuS9VLDw5DlxK0zyjjRlxr_pgFP1_1DM7vnt4DdCM5es9gFto52nUkBK2rES51QwhuoRcdI8GQX1rotwSIbUfFXyj5BVN75POTJg7LSq7T_66469Tz_ugX0ClYrXsBIVKUltk-IqDdHPnBgOO4Pc7C7YP4LjtNNDXOCTYuTm5k9sIRTeQcTw6U9nz99L0G_JW2b3Ld1KlgxzgtRYlxgmkTJdqOX0M_eyLXZ0T2pCuPmpBETcDIL5HsKleoL7vtApgvh"]'::jsonb,
  '3 pieces per style',
  '8–10 weeks',
  'Custom color combinations, contrast borders, matching blouse piece'
);

-- Product 3: Katan Silk Brocade - Royal Regalia
INSERT INTO products (title, slug, description, fabric, category, images, moq, lead_time, customization)
VALUES (
  'Katan Silk Brocade - Royal Regalia',
  'katan-silk-brocade-royal-regalia',
  'Exquisite brocade weave on pure Katan silk, featuring elaborate Mughal-inspired floral patterns woven in fine gold and silver zari. This fabric is a testament to the pinnacle of Banarasi weaving, with each motif meticulously crafted by hand on a jacquard loom. The tight weave of Katan silk ensures durability while maintaining a soft, lustrous drape. Ideal for royal weddings, grand celebrations, and luxury bridal wear.',
  'Pure Katan Silk with Brocade Zari',
  'Banarasi',
  '["https://lh3.googleusercontent.com/aida-public/AB6AXuDcL77guvoyUb54i1ub-4lYTv1OuzOpOGbPBPNUZBWjAeLPnoYM-4J7yrrf9xK_2z1Fd2ABI6ghhayzjDthhg7-8FV0jnRhcpA_xggO2u_AcsBPUWp_eFAPbEBDIRd9fHmtKLXT_I60dIgR5Pn0NxRgiMs1-eBjVXxBz5ZQC4B6PSzC22c2Yg4BFIvd1wppWtl9JOhYAl3zCuVopBO_-dNzkrwQbswjQKQCS0vE35e2BNZfMrpzzIDQRXvaVVepjhBNHzzziFJAMlPH","https://images.pexels.com/photos/5472942/pexels-photo-5472942.jpeg"]'::jsonb,
  '3 pieces per style',
  '8–12 weeks',
  'Custom brocade motifs, zari color (gold/silver/copper), border design'
);

-- Product 4: Zardozi Embroidered Saree - Luxury Edition
INSERT INTO products (title, slug, description, fabric, category, images, moq, lead_time, customization)
VALUES (
  'Zardozi Embroidered Saree - Luxury Edition',
  'zardozi-embroidered-saree-luxury-edition',
  'Luxurious saree featuring handcrafted zardozi embroidery using precious metal threads. This piece represents the pinnacle of Indian embroidery, with intricate patterns worked in gold and silver threads, seed pearls, and gemstone accents by master artisans from Lucknow. Each motif is hand-stitched over several weeks, creating a raised, three-dimensional effect that catches light from every angle. A wearable work of art for the discerning collector.',
  'Pure Silk with Handcrafted Zardozi',
  'Luxury',
  '["https://lh3.googleusercontent.com/aida-public/AB6AXuCPXvlD2E3TYM0gRO61EKRMPkrSflh1xWQy_oKDp6AWME-YVlExUUb4uW5rHbqBCLa3Pbr4JLnMLNQiNofuoO7V5HQCPhH5_nra12Yh_s3HrfurjN3nj8oKU6pBaXpWOFIPdArFnbGGYJ4bOa-Je0-1NxINCOB0DFJxN-Af_xKEUiqltN5U3MFHdkB1YzsAK11u238E-5AlE0u6Z2F4Jh-D-oPypOJ-JLULT4C_jJFLFuXf7aGCbB16TiE-mPLn6hLK9V3wvYA3YCS7","https://images.pexels.com/photos/13876082/pexels-photo-13876082.jpeg"]'::jsonb,
  '2 pieces per style',
  '10–12 weeks',
  'Custom embroidery patterns, thread colors, stone and pearl detailing'
);

-- Product 5: Leheriya Silk Saree - Hand-Dyed
INSERT INTO products (title, slug, description, fabric, category, images, moq, lead_time, customization)
VALUES (
  'Leheriya Silk Saree - Hand-Dyed',
  'leheriya-silk-saree-hand-dyed',
  'Traditional Leheriya print on pure silk, hand-dyed using the ancient resist-dye technique from Rajasthan. The wave-like diagonal stripes are created by skilled artisans who tie and dye the fabric in multiple stages, producing distinctive rippled patterns in vibrant color combinations. Each saree is unique — the slight variations in the dye pattern are the hallmark of true hand craftsmanship. Lightweight and breathable, perfect for festive occasions and daytime celebrations.',
  'Pure Silk with Hand-Dyed Leheriya',
  'Printed',
  '["https://lh3.googleusercontent.com/aida-public/AB6AXuB3ymnwffDtQnMSKng6PDaxjGxaxvSKZMLKhQyHpquezGy9xhjKFX3EzYLN-xzhAkPGygrM5S1Y2Q63Ul3Qh9qaK-vN7y5wrB9Eb5nYjhi2MbNdqAonEa9QwiroIZ6-ImxpeljHr1C1ExgdmJdBYY7G1O0G-9ITpYXsB5pFvWxCzT5z1LWnYJJOLyHSvLjmqdOyojh84EtYiA_ValH-1Qmyk7w_uq7V074iSKH5MANcDB8RMoKHVMQMgkXOqbndvUfrs583AIjPmOoE","https://images.pexels.com/photos/9756371/pexels-photo-9756371.jpeg"]'::jsonb,
  '5 pieces per style',
  '3–4 weeks',
  'Custom color combinations and Leheriya wave patterns'
);

-- Product 6: Tissue Silk Saree - Contemporary Sheer
INSERT INTO products (title, slug, description, fabric, category, images, moq, lead_time, customization)
VALUES (
  'Tissue Silk Saree - Contemporary Sheer',
  'tissue-silk-saree-contemporary-sheer',
  'Lightweight tissue silk saree with a contemporary aesthetic. The sheer, translucent fabric is woven with fine metallic threads that create a subtle shimmer effect, catching light like morning mist. Unlike traditional heavy silks, tissue silk offers an airy drape with a modern silhouette. Perfect for cocktail events, receptions, and the fashion-forward client who values understated luxury. Available in an exclusive curated palette of contemporary shades.',
  'Tissue Silk with Metallic Accents',
  'Contemporary',
  '["https://lh3.googleusercontent.com/aida-public/AB6AXuDRELKCDK5PXbULswuVWhryOL8q_URQj0JzegxVS3-eRAgTs-6pGjgf3KP5xu2jeG3a8Az236A_gXioJTzj-HfhY92UouFnUo2M1a03IrjqsqZNIivisNzQIPeu90cLW6hPFXcEOrP5Ea64h6BLmSmFbpkTQ43KiuEG5cyYYjqBwJZGElUE8UQX1InwokatGXeH3nlbs5m21OvfSO8X0e-EibGaKnbPvK_Puk7WVajnlu0xxXJpfFFfPwEZtpj6x6E_5kkrlNYZvVkM","https://images.pexels.com/photos/10221741/pexels-photo-10221741.jpeg"]'::jsonb,
  '5 pieces per style',
  '4–6 weeks',
  'Custom metallic thread colors, border designs, and pallu finish'
);

-- Product 7: Handloom Cotton Saree - Heritage Weave
INSERT INTO products (title, slug, description, fabric, category, images, moq, lead_time, customization)
VALUES (
  'Handloom Cotton Saree - Heritage Weave',
  'handloom-cotton-saree-heritage-weave',
  'Handwoven cotton saree crafted on traditional wooden looms in West Bengal. Each saree is a celebration of the handloom tradition, featuring naturally dyed threads and classic Bengali weaving techniques including jamdani and tangail motifs. The fabric is breathable, lightweight, and softens beautifully with every wash. A conscious choice for the eco-minded buyer who values artisanal craftsmanship and the story behind every thread.',
  'Pure Handloom Cotton',
  'Heritage',
  '["https://lh3.googleusercontent.com/aida-public/AB6AXuBad5CRTaYA0nptRb6Oed0C8zjN8wb9sg7KcFz1u5Ibl4uPbpb92G8SR3BNbHiq0OrvvnSUyMd8vsWN4NsHPPxxkn2rXX_6eQQGoULscfTdPxMr369fEljkLeLx0z50eoG7W4ym_BxHeC6LIiSyyL1oIxVSFyjc60IF-3J0xC0tYwc6UTH3fIA-I0h9upc1tPxNwh_4ZHFzxrq3porbyT0KA9nbcVWD6wZ-ztQPi7AApjORXXO5LUv_266TF8v002dA6K-aKrHqPLZy","https://images.pexels.com/photos/13006965/pexels-photo-13006965.jpeg"]'::jsonb,
  '10 pieces per style',
  '3–4 weeks',
  'Custom colors, border patterns, jamdani/tangail motif selection'
);

-- Product 8: Vintage Silk Saree - Antique Patina
INSERT INTO products (title, slug, description, fabric, category, images, moq, lead_time, customization)
VALUES (
  'Vintage Silk Saree - Antique Patina',
  'vintage-silk-saree-antique-patina',
  'Antique-finish silk saree with vintage-inspired patterns and a soft, muted patina. The fabric is treated using traditional techniques to achieve an aged, heirloom appearance while maintaining the strength and luster of pure silk. Intricate booti motifs and a delicate gold zari border evoke the romance of a bygone era. Each piece is subtly different — the patina develops character, making every saree truly one-of-a-kind. Ideal for heritage-themed events, vintage enthusiasts, and collector wardrobes.',
  'Pure Silk with Antique Finish',
  'Antique',
  '["https://lh3.googleusercontent.com/aida-public/AB6AXuAUkEikZ3xu-DFoTVTynqU_qXS89vSBkBVpYzVbh1K-sTZWeArHnVpKh-pjHNY-DlFe3xgVQVcaiPN-SCACY99-iq3JZoht-Eq8bB2h-I-LqkwWbvqhrQavyGXIPJOHs4g7GJuPt5pAdn-pr3Hya4n47s_aB50zRKNAz5me7etA0-TVwwAh0o48WcvGO5FEyyK4CF4VlOE464w3PLY7q3tMo54xXNPLHvid492ZBxLTd7q7LaVCjR79S1U0rqc5-xtc_ErdxMlwyli1","https://images.pexels.com/photos/9478742/pexels-photo-9478742.jpeg"]'::jsonb,
  '3 pieces per style',
  '6–8 weeks',
  'Custom patina finish level, border design, and blouse neckline'
);

-- Product 9: Contemporary Weave Saree - Indo-Western Fusion
INSERT INTO products (title, slug, description, fabric, category, images, moq, lead_time, customization)
VALUES (
  'Contemporary Weave Saree - Indo-Western Fusion',
  'contemporary-weave-saree-indo-western-fusion',
  'Modern indo-western weave saree that bridges traditional Indian textiles with contemporary global fashion. Features innovative weaving patterns, unconventional color palettes — including charcoal, blush, sage, and midnight — with a draped silhouette designed for the modern woman. The fabric combines the richness of silk with the structure of modern blends, creating clean lines without sacrificing traditional draping elegance. Designed for international runways, fashion editorials, and the global luxury market.',
  'Premium Silk Blend with Structural Weave',
  'Indo-Western',
  '["https://lh3.googleusercontent.com/aida-public/AB6AXuDqk7pcgq7TcCMv6gKAvf1wNXfWcBSohAR6jS3ltlbM3GeL5vVSOxbOTx_1OujRkoNGqGU2Ks_WE1YaScDn2-EfBEEPsNzA5iHZPaZD8h1RBZD7X-ROJ5HF2pZYWsjHmBQeirbBseaWh7-305VL2xLS5bq16vRN82HF74P_FqtPShW-NzOqf7LokYzzsRvVRjLXZ8fRgcGDEZ7pSQRkeix_z3flSY6nZKKLYCBjgnLCgMA5LD_sMZSEsErIre0JW3x0VLE8ZsyPFz_Q","https://images.pexels.com/photos/36353558/pexels-photo-36353558.jpeg"]'::jsonb,
  '5 pieces per style',
  '6–8 weeks',
  'Custom weave patterns, color palettes, and fusion draping options'
);

-- Product 10: Paithani Silk Saree - Maharashtrian Legacy
INSERT INTO products (title, slug, description, fabric, category, images, moq, lead_time, customization)
VALUES (
  'Paithani Silk Saree - Maharashtrian Legacy',
  'paithani-silk-saree-maharashtrian-legacy',
  'Authentic Paithani silk saree from Maharashtra, woven on traditional pit looms in Yeola. The hallmark of Paithani weaving is the elaborate pallu featuring the iconic peacock and lotus motif, woven entirely in silk and fine zari threads with no loose threads on the reverse. The fabric is distinguished by its unique "half-drape" stiffness that gives the saree its characteristic silhouette. Rich, jewel-toned colors with intricate border patterns that have been treasured by Maharashtrian royalty for centuries. A timeless investment piece.',
  'Pure Paithani Silk with Silk Zari',
  'Heritage',
  '["https://lh3.googleusercontent.com/aida-public/AB6AXuDcL77guvoyUb54i1ub-4lYTv1OuzOpOGbPBPNUZBWjAeLPnoYM-4J7yrrf9xK_2z1Fd2ABI6ghhayzjDthhg7-8FV0jnRhcpA_xggO2u_AcsBPUWp_eFAPbEBDIRd9fHmtKLXT_I60dIgR5Pn0NxRgiMs1-eBjVXxBz5ZQC4B6PSzC22c2Yg4BFIvd1wppWtl9JOhYAl3zCuVopBO_-dNzkrwQbswjQKQCS0vE35e2BNZfMrpzzIDQRXvaVVepjhBNHzzziFJAMlPH","https://images.pexels.com/photos/31853351/pexels-photo-31853351.jpeg"]'::jsonb,
  '3 pieces per style',
  '8–10 weeks',
  'Custom color combinations, border width, and traditional motif selection'
);
