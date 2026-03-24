-- Migration: Add Story Score fields to products table
-- ROORQ's core differentiator — every piece gets a narrative-based authentication score
-- Dimensions: Origin, Era, Brand, Cultural Value, Condition (each 1-10)

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS story_score_origin    SMALLINT CHECK (story_score_origin    BETWEEN 1 AND 10),
  ADD COLUMN IF NOT EXISTS story_score_era       SMALLINT CHECK (story_score_era       BETWEEN 1 AND 10),
  ADD COLUMN IF NOT EXISTS story_score_brand     SMALLINT CHECK (story_score_brand     BETWEEN 1 AND 10),
  ADD COLUMN IF NOT EXISTS story_score_cultural  SMALLINT CHECK (story_score_cultural  BETWEEN 1 AND 10),
  ADD COLUMN IF NOT EXISTS story_score_condition SMALLINT CHECK (story_score_condition BETWEEN 1 AND 10),

  -- Narrative text per dimension (shown in Vintage Passport on product page)
  ADD COLUMN IF NOT EXISTS story_origin_text     TEXT,
  ADD COLUMN IF NOT EXISTS story_era_text        TEXT,
  ADD COLUMN IF NOT EXISTS story_brand_text      TEXT,
  ADD COLUMN IF NOT EXISTS story_cultural_text   TEXT,
  ADD COLUMN IF NOT EXISTS story_condition_text  TEXT,

  -- Rarity tier badge shown on product card
  ADD COLUMN IF NOT EXISTS story_rarity          TEXT CHECK (story_rarity IN ('find', 'rare', 'grail', '1of1')),

  -- Verification metadata
  ADD COLUMN IF NOT EXISTS story_verified_by     TEXT DEFAULT 'ROORQ Team',
  ADD COLUMN IF NOT EXISTS story_verified_at     TIMESTAMPTZ;

-- Computed total score as a view column (average of all 5 dimensions, nullable until all 5 filled)
-- We use a generated column so the total is always in sync
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS story_score_total NUMERIC(3,1)
    GENERATED ALWAYS AS (
      CASE
        WHEN story_score_origin IS NOT NULL
         AND story_score_era IS NOT NULL
         AND story_score_brand IS NOT NULL
         AND story_score_cultural IS NOT NULL
         AND story_score_condition IS NOT NULL
        THEN ROUND(
          (story_score_origin + story_score_era + story_score_brand +
           story_score_cultural + story_score_condition)::NUMERIC / 5,
          1
        )
        ELSE NULL
      END
    ) STORED;

-- Index for filtering/sorting by story score on shop page
CREATE INDEX IF NOT EXISTS idx_products_story_score_total ON products (story_score_total DESC NULLS LAST);

-- Index for rarity filtering
CREATE INDEX IF NOT EXISTS idx_products_story_rarity ON products (story_rarity) WHERE story_rarity IS NOT NULL;

COMMENT ON COLUMN products.story_score_origin    IS 'Origin score 1-10: where was this piece sourced';
COMMENT ON COLUMN products.story_score_era       IS 'Era score 1-10: how clearly the era can be confirmed';
COMMENT ON COLUMN products.story_score_brand     IS 'Brand score 1-10: brand authenticity and value';
COMMENT ON COLUMN products.story_score_cultural  IS 'Cultural value score 1-10: cultural or campus significance';
COMMENT ON COLUMN products.story_score_condition IS 'Condition score 1-10: physical condition of the piece';
COMMENT ON COLUMN products.story_score_total     IS 'Auto-computed average of all 5 dimensions (null until all filled)';
COMMENT ON COLUMN products.story_rarity          IS 'Rarity tier: find | rare | grail | 1of1';
