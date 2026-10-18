interface Env {
  ESD_WAITLIST: KVNamespace
}

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  try {
    const body = await ctx.request.json() as { email?: string; track?: string }
    const email = (body.email ?? '').trim().toLowerCase()
    const track = body.track ?? 'patient'

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Invalid email' }, { status: 400, headers: corsHeaders })
    }

    const key = `subscriber:${email}`
    const existing = await ctx.env.ESD_WAITLIST.get(key)
    if (existing) {
      return Response.json({ ok: true, alreadySubscribed: true }, { headers: corsHeaders })
    }

    await ctx.env.ESD_WAITLIST.put(key, JSON.stringify({
      email,
      track,
      subscribedAt: new Date().toISOString(),
    }))

    // Increment counter
    const countKey = `count:${track}`
    const current = parseInt(await ctx.env.ESD_WAITLIST.get(countKey) ?? '0', 10)
    await ctx.env.ESD_WAITLIST.put(countKey, String(current + 1))

    return Response.json({ ok: true }, { headers: corsHeaders })
  } catch {
    return Response.json({ error: 'Server error' }, { status: 500, headers: corsHeaders })
  }
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
