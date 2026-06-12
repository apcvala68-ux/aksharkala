-- Aksharkala Admin Panel Migration
-- Run this SQL in Supabase SQL Editor

-- 1. Admin users table (links to Supabase auth.users)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'viewer')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Categories (normalized)
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Orders (inquiry to order conversion)
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  inquiry_id INT REFERENCES inquiries(id) ON DELETE SET NULL,
  product_id INT REFERENCES products(id) ON DELETE SET NULL,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  status TEXT DEFAULT 'quoted' CHECK (status IN (
    'quoted', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'
  )),
  total_value NUMERIC(12,2),
  currency TEXT DEFAULT 'INR',
  quantity INT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Activity log (audit trail)
CREATE TABLE IF NOT EXISTS activity_log (
  id SERIAL PRIMARY KEY,
  admin_id UUID REFERENCES admin_users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('product', 'inquiry', 'order', 'settings')),
  entity_id INT,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Analytics daily snapshots
CREATE TABLE IF NOT EXISTS analytics_daily (
  id SERIAL PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  total_inquiries INT DEFAULT 0,
  new_inquiries INT DEFAULT 0,
  replied_inquiries INT DEFAULT 0,
  closed_inquiries INT DEFAULT 0,
  total_orders INT DEFAULT 0,
  new_orders INT DEFAULT 0,
  total_revenue NUMERIC(12,2) DEFAULT 0,
  page_views INT DEFAULT 0,
  unique_visitors INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Admin notifications
CREATE TABLE IF NOT EXISTS admin_notifications (
  id SERIAL PRIMARY KEY,
  admin_id UUID REFERENCES admin_users(id),
  title TEXT NOT NULL,
  message TEXT,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'warning', 'success', 'error')),
  read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Seed default categories
INSERT INTO categories (name, slug, sort_order) VALUES
  ('Banarasi', 'banarasi', 1),
  ('Heritage', 'heritage', 2),
  ('Luxury', 'luxury', 3),
  ('Printed', 'printed', 4),
  ('Contemporary', 'contemporary', 5),
  ('Antique', 'antique', 6),
  ('Indo-Western', 'indo-western', 7)
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Enable RLS on all new tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_notifications ENABLE ROW LEVEL SECURITY;

-- admin_users policies
CREATE POLICY "Admin users can view own profile" ON admin_users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Super admins can view all admin users" ON admin_users
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND role = 'super_admin')
  );

CREATE POLICY "Super admins can insert admin users" ON admin_users
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND role = 'super_admin')
  );

CREATE POLICY "Super admins can update admin users" ON admin_users
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND role = 'super_admin')
  );

CREATE POLICY "Super admins can delete admin users" ON admin_users
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND role = 'super_admin')
  );

-- categories policies
CREATE POLICY "Anyone can view categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Authenticated can manage categories" ON categories
  FOR ALL USING (auth.role() = 'authenticated');

-- orders policies
CREATE POLICY "Authenticated can view orders" ON orders
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can insert orders" ON orders
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can update orders" ON orders
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can delete orders" ON orders
  FOR DELETE USING (auth.role() = 'authenticated');

-- activity_log policies
CREATE POLICY "Authenticated can view activity log" ON activity_log
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can insert activity log" ON activity_log
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- analytics_daily policies
CREATE POLICY "Authenticated can manage analytics" ON analytics_daily
  FOR ALL USING (auth.role() = 'authenticated');

-- admin_notifications policies
CREATE POLICY "Authenticated can view own notifications" ON admin_notifications
  FOR SELECT USING (auth.uid() = admin_id);

CREATE POLICY "Authenticated can update own notifications" ON admin_notifications
  FOR UPDATE USING (auth.uid() = admin_id);

CREATE POLICY "Authenticated can insert notifications" ON admin_notifications
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- UPDATE EXISTING TABLE POLICIES
-- ============================================

-- Products: Add write policies for authenticated users
CREATE POLICY "Authenticated can insert products" ON products
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can update products" ON products
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can delete products" ON products
  FOR DELETE USING (auth.role() = 'authenticated');

-- Inquiries: Add update policy for authenticated users
CREATE POLICY "Authenticated can update inquiries" ON inquiries
  FOR UPDATE USING (auth.role() = 'authenticated');

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to log activity
CREATE OR REPLACE FUNCTION log_activity(
  p_admin_id UUID,
  p_action TEXT,
  p_entity_type TEXT,
  p_entity_id INT DEFAULT NULL,
  p_details JSONB DEFAULT NULL
) RETURNS void AS $$
BEGIN
  INSERT INTO activity_log (admin_id, action, entity_type, entity_id, details)
  VALUES (p_admin_id, p_action, p_entity_type, p_entity_id, p_details);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create notification
CREATE OR REPLACE FUNCTION create_notification(
  p_admin_id UUID,
  p_title TEXT,
  p_message TEXT DEFAULT NULL,
  p_type TEXT DEFAULT 'info',
  p_link TEXT DEFAULT NULL
) RETURNS void AS $$
BEGIN
  INSERT INTO admin_notifications (admin_id, title, message, type, link)
  VALUES (p_admin_id, p_title, p_message, p_type, p_link);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
