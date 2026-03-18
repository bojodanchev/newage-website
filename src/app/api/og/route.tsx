import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'New Age'
  const description =
    searchParams.get('description') ||
    'From Idea to Empire — Premium business systems architect.'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#0A0A0A',
          padding: '60px 80px',
          position: 'relative',
        }}
      >
        {/* Gradient accent bar at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #6C3AFF, #00E5A0)',
          }}
        />

        {/* Logo text */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #6C3AFF, #00E5A0)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 40,
          }}
        >
          New Age
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: '#F0F0F5',
            lineHeight: 1.2,
            maxWidth: '900px',
            marginBottom: 20,
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 24,
            color: '#8B8BA3',
            lineHeight: 1.4,
            maxWidth: '800px',
          }}
        >
          {description}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
