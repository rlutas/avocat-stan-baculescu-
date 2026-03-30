import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Stan-Baculescu | Societate Civilă de Avocați',
    short_name: 'Stan-Baculescu',
    description:
      'Cabinet de avocatură Stan-Baculescu din Satu Mare. Servicii juridice profesionale.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#003a70',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
