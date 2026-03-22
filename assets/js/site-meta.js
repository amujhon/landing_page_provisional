(function () {
  const config = window.APOLLO_SITE_CONFIG || {};
  const siteUrl = String(config.siteUrl || '').trim().replace(/\/+$/, '');

  if (!siteUrl) {
    return;
  }

  const root = document.documentElement;
  const rawPagePath = String(root.dataset.pagePath || '').replace(/^\/+/, '');
  const pagePath = rawPagePath.replace(/\.html$/i, '').replace(/^index$/i, '');
  const canonicalUrl = pagePath ? `${siteUrl}/${pagePath}` : `${siteUrl}/`;
  const defaultOgImage = String(root.dataset.ogImage || 'assets/img/og-cover.png').replace(/^\/+/, '');
  const ogImageUrl = /^https?:\/\//i.test(defaultOgImage)
    ? defaultOgImage
    : `${siteUrl}/${defaultOgImage}`;
  const title = document.title;
  const descriptionTag = document.querySelector('meta[name="description"]');
  const description = descriptionTag ? descriptionTag.getAttribute('content') || '' : '';
  const siteRoot = `${siteUrl}/`;
  const pageName = root.dataset.pageName || title;
  const breadcrumbLabel = root.dataset.breadcrumbLabel || pageName;

  const setAttr = (selector, attribute, value) => {
    const element = document.querySelector(selector);
    if (element) {
      element.setAttribute(attribute, value);
    }
  };

  const setJson = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent = JSON.stringify(value);
    }
  };

  setAttr('#canonical-link', 'href', canonicalUrl);
  setAttr('#meta-og-url', 'content', canonicalUrl);
  setAttr('#meta-og-image', 'content', ogImageUrl);
  setAttr('#meta-twitter-image', 'content', ogImageUrl);

  setJson('#ld-org', {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Apolo Education',
    url: siteRoot,
    logo: `${siteUrl}/assets/img/APOLO-V3-05.png`,
    description: 'Plataforma educativa integral para la gestión académica institucional.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      availableLanguage: ['Spanish']
    },
    sameAs: []
  });

  setJson('#ld-website', {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Apolo Education',
    url: siteRoot
  });

  setJson('#ld-software', {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Apolo',
    operatingSystem: 'Web, Android, iOS',
    applicationCategory: 'EducationalApplication',
    description: 'Plataforma educativa integral: gestión académica, comunicación, calificaciones, asistencias y más.',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: '0',
      description: 'Plan básico disponible'
    }
  });

  setJson('#ld-webpage', {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageName,
    url: canonicalUrl,
    description,
    inLanguage: 'es-EC',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Apolo Education',
      url: siteRoot
    }
  });

  if (document.querySelector('#ld-breadcrumbs')) {
    setJson('#ld-breadcrumbs', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: siteRoot
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: breadcrumbLabel,
          item: canonicalUrl
        }
      ]
    });
  }
})();