import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
  async redirects() {
    return [
      // === Old WordPress site redirects (stanbaculescu.ro migration) ===

      // Team members (current)
      { source: '/vlad-baculescu', destination: '/ro/echipa/vlad-baculescu', permanent: true },
      { source: '/vlad-baculescu/', destination: '/ro/echipa/vlad-baculescu', permanent: true },
      { source: '/camelia-stan', destination: '/ro/echipa/camelia-stan', permanent: true },
      { source: '/camelia-stan/', destination: '/ro/echipa/camelia-stan', permanent: true },
      { source: '/alexandra-rusu', destination: '/ro/echipa/alexandra-rusu', permanent: true },
      { source: '/alexandra-rusu/', destination: '/ro/echipa/alexandra-rusu', permanent: true },
      { source: '/diana-antonia-chincea', destination: '/ro/echipa/diana-chincea', permanent: true },
      { source: '/diana-antonia-chincea/', destination: '/ro/echipa/diana-chincea', permanent: true },

      // Old slug redirect (diana-veres -> diana-veress)
      { source: '/ro/echipa/diana-veres', destination: '/ro/echipa/diana-veress', permanent: true },
      { source: '/en/echipa/diana-veres', destination: '/en/echipa/diana-veress', permanent: true },

      // Team members (former - redirect to team page)
      { source: '/ana-gabriela-tarta', destination: '/ro/echipa', permanent: true },
      { source: '/ana-gabriela-tarta/', destination: '/ro/echipa', permanent: true },
      { source: '/niculina-fanea', destination: '/ro/echipa', permanent: true },
      { source: '/niculina-fanea/', destination: '/ro/echipa', permanent: true },
      { source: '/madalina-lup', destination: '/ro/echipa', permanent: true },
      { source: '/madalina-lup/', destination: '/ro/echipa', permanent: true },
      { source: '/cristina-tentes', destination: '/ro/echipa', permanent: true },
      { source: '/cristina-tentes/', destination: '/ro/echipa', permanent: true },

      // Main pages
      { source: '/echipa-de-avocati', destination: '/ro/echipa', permanent: true },
      { source: '/echipa-de-avocati/', destination: '/ro/echipa', permanent: true },
      { source: '/servicii-juridice', destination: '/ro/servicii', permanent: true },
      { source: '/servicii-juridice/', destination: '/ro/servicii', permanent: true },
      { source: '/societate-civila-de-avocati', destination: '/ro/despre', permanent: true },
      { source: '/societate-civila-de-avocati/', destination: '/ro/despre', permanent: true },
      { source: '/contact', destination: '/ro/contact', permanent: true },
      { source: '/contact/', destination: '/ro/contact', permanent: true },
      { source: '/blog', destination: '/ro/blog', permanent: true },
      { source: '/blog/', destination: '/ro/blog', permanent: true },

      // Service pages
      { source: '/drept-penal', destination: '/ro/servicii/drept-penal', permanent: true },
      { source: '/drept-penal/', destination: '/ro/servicii/drept-penal', permanent: true },
      { source: '/drept-civil', destination: '/ro/servicii/drept-civil', permanent: true },
      { source: '/drept-civil/', destination: '/ro/servicii/drept-civil', permanent: true },
      { source: '/dreptul-familiei', destination: '/ro/servicii/drept-familiei', permanent: true },
      { source: '/dreptul-familiei/', destination: '/ro/servicii/drept-familiei', permanent: true },
      { source: '/malpraxisul-medical', destination: '/ro/servicii/malpraxis-medical', permanent: true },
      { source: '/malpraxisul-medical/', destination: '/ro/servicii/malpraxis-medical', permanent: true },
      { source: '/accidente-rutiere', destination: '/ro/servicii/accidente-rutiere', permanent: true },
      { source: '/accidente-rutiere/', destination: '/ro/servicii/accidente-rutiere', permanent: true },
      { source: '/drept-administrativ-si-fiscal', destination: '/ro/servicii/drept-administrativ-fiscal', permanent: true },
      { source: '/drept-administrativ-si-fiscal/', destination: '/ro/servicii/drept-administrativ-fiscal', permanent: true },
      { source: '/drept-comercial', destination: '/ro/servicii/drept-comercial', permanent: true },
      { source: '/drept-comercial/', destination: '/ro/servicii/drept-comercial', permanent: true },

      // Blog articles (old WordPress slugs)
      { source: '/solutie-de-clasare-pentru-savarsirea-infractiunii-de-fals-in-inscrisuri-sub-semnatura-privata', destination: '/ro/blog/fals-inscrisuri-semnatura-privata', permanent: true },
      { source: '/solutie-de-clasare-pentru-savarsirea-infractiunii-de-fals-in-inscrisuri-sub-semnatura-privata/', destination: '/ro/blog/fals-inscrisuri-semnatura-privata', permanent: true },
      { source: '/drepturile-suspectului-si-ale-inculpatului-in-faza-de-urmarire-penala', destination: '/ro/blog', permanent: true },
      { source: '/drepturile-suspectului-si-ale-inculpatului-in-faza-de-urmarire-penala/', destination: '/ro/blog', permanent: true },
      { source: '/efectele-amanarii-aplicarii-pedepsei-in-cazul-infractiunilor-rutiere', destination: '/ro/blog', permanent: true },
      { source: '/efectele-amanarii-aplicarii-pedepsei-in-cazul-infractiunilor-rutiere/', destination: '/ro/blog', permanent: true },
      { source: '/o-noua-reusita-amanarea-aplicarii-pedepsei', destination: '/ro/blog', permanent: true },
      { source: '/o-noua-reusita-amanarea-aplicarii-pedepsei/', destination: '/ro/blog', permanent: true },
      { source: '/dreptul-la-tacere', destination: '/ro/blog', permanent: true },
      { source: '/dreptul-la-tacere/', destination: '/ro/blog', permanent: true },
      { source: '/retestarea-alcoolemiei', destination: '/ro/blog', permanent: true },
      { source: '/retestarea-alcoolemiei/', destination: '/ro/blog', permanent: true },
      { source: '/importanta-incheierii-unui-contract-si-a-clauzelor-sale', destination: '/ro/blog', permanent: true },
      { source: '/importanta-incheierii-unui-contract-si-a-clauzelor-sale/', destination: '/ro/blog', permanent: true },
      { source: '/procedura-ordonantei-de-plata', destination: '/ro/blog', permanent: true },
      { source: '/procedura-ordonantei-de-plata/', destination: '/ro/blog', permanent: true },
      { source: '/contestarea-actelor-administrative-fiscale', destination: '/ro/blog', permanent: true },
      { source: '/contestarea-actelor-administrative-fiscale/', destination: '/ro/blog', permanent: true },

      // WordPress category pages
      { source: '/category/echipa', destination: '/ro/echipa', permanent: true },
      { source: '/category/echipa/', destination: '/ro/echipa', permanent: true },
      { source: '/category/servicii', destination: '/ro/servicii', permanent: true },
      { source: '/category/servicii/', destination: '/ro/servicii', permanent: true },
      { source: '/category/fara-categorie', destination: '/ro/blog', permanent: true },
      { source: '/category/fara-categorie/', destination: '/ro/blog', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  }
};

class VeliteWebpackPlugin {
  static started = false;
  apply(compiler: { hooks: { beforeCompile: { tapPromise: (name: string, callback: () => Promise<void>) => void } } }) {
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = process.env.NODE_ENV === 'development';
      const { build } = await import('velite');
      await build({ watch: dev, clean: !dev });
    });
  }
}

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

export default withNextIntl(nextConfig);
