const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN ?? "";

export function getStrapiMediaUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_URL}${url}`;
}

export async function fetchAPI<T>(
  path: string,
  params: Record<string, string> = {},
  revalidateSeconds = 60,
): Promise<T> {
  const query = new URLSearchParams(params).toString();
  const url = `${STRAPI_URL}/api${path}${query ? `?${query}` : ""}`;
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (STRAPI_API_TOKEN) headers["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;

  let res: Response;
  try {
    res = await fetch(url, {
      next: { revalidate: revalidateSeconds },
      headers,
    });
  } catch (err) {
    console.warn(`Strapi unreachable: ${path}`, (err as Error).message);
    return { data: null, meta: {} } as T;
  }

  if (!res.ok) {
    console.warn(`Strapi fetch failed: ${path} (${res.status})`);
    return { data: null, meta: {} } as T;
  }
  return res.json();
}

// ─── Populate helpers ─────────────────────────────────────────────────────────
// Strapi v5 does NOT support populate=deep. Use explicit nested populate:
//   populate[field]=* for direct media/component
//   populate[field][populate]=* for components that contain media/relations

const SEO_POPULATE = { "populate[seo][populate]": "*" };

// ─── Convenience wrappers ─────────────────────────────────────────────────────

export async function getGlobal() {
  const res = await fetchAPI<{ data: import("./types").Global }>("/global", {
    // direct media fields come through with populate=*
    // components with sub-media need [populate]=*
    "populate[logoLight]": "true",
    "populate[logoDark]": "true",
    "populate[favicon]": "true",
    "populate[brochureFile]": "true",
    "populate[socialLinks]": "*",
    "populate[headerCta]": "*",
    "populate[defaultSeo][populate]": "*",
  });
  return res.data;
}

export async function getHomePage() {
  const res = await fetchAPI<{ data: import("./types").HomePage }>(
    "/home-page",
    {
      "populate[heroSlides][populate]": "*",
      "populate[processSteps][populate]": "*",
      "populate[featuredCategories][populate]": "*",
      "populate[stats]": "*",
      "populate[quoteAuthorSignature]": "true",
      "populate[capabilities][populate]": "*",
      "populate[certificationLogos][populate]": "*",
      "populate[clientLogos][populate]": "*",
      ...SEO_POPULATE,
    },
  );
  return res.data;
}

export async function getCompanyPage() {
  const res = await fetchAPI<{ data: import("./types").CompanyPage }>(
    "/company-page",
    {
      "populate[heroImage]": "true",
      "populate[capabilities][populate]": "*",
      "populate[timeline]": "*",
      ...SEO_POPULATE,
    },
  );
  return res.data;
}

export async function getDifferencePage() {
  const res = await fetchAPI<{ data: import("./types").DifferencePage }>(
    "/difference-page",
    {
      "populate[heroImage]": "true",
      "populate[servicePrinciples][populate]": "*",
      "populate[cycleSteps]": "*",
      ...SEO_POPULATE,
    },
  );
  return res.data;
}

export async function getPartnersPage() {
  const res = await fetchAPI<{ data: import("./types").PartnersPage }>(
    "/partners-page",
    {
      "populate[partnerLogos][populate]": "*",
      ...SEO_POPULATE,
    },
  );
  return res.data;
}

export async function getSustainabilityPage() {
  const res = await fetchAPI<{ data: import("./types").SustainabilityPage }>(
    "/sustainability-page",
    {
      "populate[heroImage]": "true",
      "populate[environmentCards][populate]": "*",
      "populate[corporateCards][populate]": "*",
      ...SEO_POPULATE,
    },
  );
  return res.data;
}

export async function getCareersPage() {
  const res = await fetchAPI<{ data: import("./types").CareersPage }>(
    "/careers-page",
    {
      "populate[heroImage]": "true",
      "populate[jobCategories]": "*",
      ...SEO_POPULATE,
    },
  );
  return res.data;
}

export async function getGalleryPage() {
  const res = await fetchAPI<{ data: import("./types").GalleryPage }>(
    "/gallery-page",
    SEO_POPULATE,
  );
  return res.data;
}

export async function getProductsPage() {
  const res = await fetchAPI<{ data: import("./types").ProductsPage }>(
    "/products-page",
    {
      "populate[supplementaryServices][populate]": "*",
      ...SEO_POPULATE,
    },
  );
  return res.data;
}

export async function getContactPage() {
  const res = await fetchAPI<{ data: import("./types").ContactPage }>(
    "/contact-page",
    SEO_POPULATE,
  );
  return res.data;
}

export async function getAllProductCategories() {
  const res = await fetchAPI<{ data: import("./types").ProductCategory[] }>(
    "/product-categories",
    {
      "populate[cardImage]": "true",
      "populate[heroImage]": "true",
      "populate[stats]": "*",
      "populate[subtypes][populate]": "*",
      "populate[materials][populate]": "*",
      "populate[readyToGoColors][populate]": "*",
      "populate[weightOrSizeOptions]": "*",
      ...SEO_POPULATE,
      "pagination[pageSize]": "100",
    },
  );
  return res.data ?? [];
}

export async function getProductCategoryBySlug(slug: string) {
  const res = await fetchAPI<{ data: import("./types").ProductCategory[] }>(
    "/product-categories",
    {
      "filters[slug][$eq]": slug,
      "populate[cardImage]": "true",
      "populate[heroImage]": "true",
      "populate[stats]": "*",
      "populate[subtypes][populate]": "*",
      "populate[materials][populate]": "*",
      "populate[readyToGoColors][populate]": "*",
      "populate[weightOrSizeOptions]": "*",
      ...SEO_POPULATE,
    },
  );
  return res.data?.[0] ?? null;
}

export async function getAllSubCategories() {
  const res = await fetchAPI<{ data: import("./types").SubCategory[] }>(
    "/sub-categories",
    {
      "populate[category]": "true",
      "pagination[pageSize]": "200",
    },
  );
  return res.data ?? [];
}

export async function getSubCategoriesByCategory(categorySlug: string) {
  const res = await fetchAPI<{ data: import("./types").SubCategory[] }>(
    "/sub-categories",
    {
      "filters[category][slug][$eq]": categorySlug,
      "populate[cardImage]": "true",
      "populate[heroImage]": "true",
      ...SEO_POPULATE,
      "pagination[pageSize]": "100",
    },
  );
  return res.data ?? [];
}

export async function getSubCategoryBySlug(categorySlug: string, subCategorySlug: string) {
  const res = await fetchAPI<{ data: import("./types").SubCategory[] }>(
    "/sub-categories",
    {
      "filters[slug][$eq]": subCategorySlug,
      "filters[category][slug][$eq]": categorySlug,
      "populate[cardImage]": "true",
      "populate[heroImage]": "true",
      ...SEO_POPULATE,
    },
  );
  return res.data?.[0] ?? null;
}

export async function getAllProducts() {
  const res = await fetchAPI<{ data: import("./types").Product[] }>(
    "/products",
    {
      "populate[subCategory][populate][category]": "true",
      "pagination[pageSize]": "300",
    },
  );
  return res.data ?? [];
}

export async function getProductsBySubCategory(categorySlug: string, subCategorySlug: string) {
  const res = await fetchAPI<{ data: import("./types").Product[] }>(
    "/products",
    {
      "filters[subCategory][slug][$eq]": subCategorySlug,
      "filters[subCategory][category][slug][$eq]": categorySlug,
      "populate[cardImage]": "true",
      ...SEO_POPULATE,
      "pagination[pageSize]": "100",
    },
  );
  return res.data ?? [];
}

export async function getProductBySlug(categorySlug: string, subCategorySlug: string, productSlug: string) {
  const res = await fetchAPI<{ data: import("./types").Product[] }>(
    "/products",
    {
      "filters[slug][$eq]": productSlug,
      "filters[subCategory][slug][$eq]": subCategorySlug,
      "filters[subCategory][category][slug][$eq]": categorySlug,
      "populate[cardImage]": "true",
      "populate[gallery]": "true",
      "populate[materials][populate]": "*",
      "populate[colors][populate]": "*",
      "populate[sizeOptions]": "*",
      ...SEO_POPULATE,
    },
  );
  return res.data?.[0] ?? null;
}

export async function getTestimonials(onlyHome = false) {
  const params: Record<string, string> = {
    "populate[clientLogo]": "true",
    "pagination[pageSize]": "50",
  };
  if (onlyHome) params["filters[showOnHome][$eq]"] = "true";
  const res = await fetchAPI<{ data: import("./types").Testimonial[] }>(
    "/testimonials",
    params,
  );
  return res.data ?? [];
}

export async function getGalleryImages() {
  const res = await fetchAPI<{ data: import("./types").GalleryImage[] }>(
    "/gallery-images",
    {
      "populate[image]": "true",
      "sort[0]": "order:asc",
      "pagination[pageSize]": "200",
    },
  );
  return res.data ?? [];
}

export async function getLegalPage(slug: string) {
  const res = await fetchAPI<{ data: import("./types").LegalPage[] }>(
    "/legal-pages",
    { "filters[slug][$eq]": slug },
  );
  return res.data?.[0] ?? null;
}
