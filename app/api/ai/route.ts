import { NextResponse } from 'next/server'
import getAIConfig from '@/src/config/ai'

// Simple API route to expose the selected AI provider/model.
// This is intentionally minimal and does NOT call any external provider.
// Use this for client-side feature toggles or to verify the app default.

export async function GET() {
  const cfg = getAIConfig()
  return NextResponse.json({ ok: true, config: cfg })
}
