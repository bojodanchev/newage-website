import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0A0A',
          borderRadius: 40,
        }}
      >
        <span
          style={{
            fontSize: 110,
            fontWeight: 800,
            lineHeight: 1,
            background: 'linear-gradient(135deg, #6C3AFF, #00E5A0)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          N
        </span>
      </div>
    ),
    { ...size }
  )
}
