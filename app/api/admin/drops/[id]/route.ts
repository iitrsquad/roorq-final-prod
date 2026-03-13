import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const hasAdminRole = (role?: string | null) => role === 'admin' || role === 'super_admin'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const parsedId = z.string().uuid().safeParse(params.id)
  if (!parsedId.success) {
    return NextResponse.json({ error: 'Invalid drop id' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data: userData, error: authError } = await supabase.auth.getUser()

  if (authError || !userData.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: roleData, error: roleError } = await supabase.rpc('get_user_role', {
    user_id: userData.user.id,
  })

  if (roleError || !hasAdminRole(roleData)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { error: unassignError } = await supabase
    .from('products')
    .update({ drop_id: null })
    .eq('drop_id', params.id)

  if (unassignError) {
    return NextResponse.json({ error: unassignError.message }, { status: 500 })
  }

  const { error: deleteError } = await supabase
    .from('drops')
    .delete()
    .eq('id', params.id)

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
