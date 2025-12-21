import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PLCAutoPilot - AI-Powered PLC Programming Assistant',
    short_name: 'PLCAutoPilot',
    description: 'Transform specifications into production-ready PLC code in minutes. AI-powered automation for Schneider Electric EcoStruxure platforms.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3B82F6',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
