-- Fix RLS policies to ensure inventory reservation works
-- Allow authenticated users to update products (needed for reservation if not using SECURITY DEFINER)
-- However, our function is NOT SECURITY DEFINER currently (or was defined without it in my last edit).
-- Let's make the function SECURITY DEFINER so it bypasses RLS for the reservation logic.

CREATE OR REPLACE FUNCTION reserve_inventory(
  p_product_id UUID,
  p_quantity INTEGER
)
RETURNS BOOLEAN AS $$
DECLARE
  v_stock_quantity INTEGER;
  v_reserved_quantity INTEGER;
  v_available_stock INTEGER;
BEGIN
  -- 1. Lock the row for update. This prevents race conditions.
  SELECT stock_quantity, reserved_quantity 
  INTO v_stock_quantity, v_reserved_quantity
  FROM public.products
  WHERE id = p_product_id
  FOR UPDATE;

  -- 2. Handle case where product doesn't exist
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Product not found (ID: %)', p_product_id;
  END IF;

  -- 3. Calculate available stock safely handling NULLs
  v_available_stock := COALESCE(v_stock_quantity, 0) - COALESCE(v_reserved_quantity, 0);

  -- 4. Check availability
  IF v_available_stock < p_quantity THEN
    RAISE EXCEPTION 'Insufficient stock. Available: %, Requested: %', v_available_stock, p_quantity;
  END IF;

  -- 5. Update reserved quantity
  UPDATE public.products
  SET reserved_quantity = COALESCE(reserved_quantity, 0) + p_quantity,
      updated_at = NOW()
  WHERE id = p_product_id;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;





