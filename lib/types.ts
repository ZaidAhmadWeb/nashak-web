// Strapi v5 base entity (no 'attributes' wrapper — fields are flat)
export interface StrapiMeta {
  pagination?: { page: number; pageSize: number; pageCount: number; total: number };
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  name: string;
  width: number | null;
  height: number | null;
  alternativeText: string | null;
  caption: string | null;
  formats?: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
  } | null;
}

// ─── Shared Components ────────────────────────────────────────────────────────
export interface Seo {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: StrapiMedia | null;
  canonicalURL?: string | null;
}

export interface Stat {
  value: string;
  label: string;
}

export interface IconTextCard {
  icon?: StrapiMedia | null;
  title: string;
  description: string;
}

export interface CtaButton {
  label: string;
  url: string;
}

export interface LogoItem {
  logo: StrapiMedia;
  name: string;
  link?: string | null;
}

export interface SocialLink {
  platform: 'instagram' | 'facebook' | 'linkedin' | 'twitter' | 'youtube';
  url: string;
}

// ─── Home Components ──────────────────────────────────────────────────────────
export interface HeroSlide {
  image: StrapiMedia;
  eyebrow?: string | null;
  heading: string;
  description?: string | null;
  ctaLabel?: string | null;
  ctaLink?: string | null;
}

export interface ProcessStep {
  stepNumber: number;
  icon?: StrapiMedia | null;
  title: string;
  description: string;
}

// ─── Company Components ───────────────────────────────────────────────────────
export interface TimelineEntry {
  year: string;
  description: string;
}

// ─── Product Components ───────────────────────────────────────────────────────
export interface SubtypeCard {
  image: StrapiMedia;
  name: string;
  modelsAvailable?: number | null;
  link?: string | null;
}

export interface Material {
  image: StrapiMedia;
  name: string;
  description?: string | null;
}

export interface ColorSwatch {
  image: StrapiMedia;
  name: string;
}

export interface OptionTag {
  label: string;
}

// ─── Difference Components ────────────────────────────────────────────────────
export interface ServicePrinciple {
  icon?: StrapiMedia | null;
  title: string;
  description: string;
}

export interface CycleStep {
  stepNumber: number;
  title: string;
  duration: string;
  note?: string | null;
}

// ─── Careers Components ───────────────────────────────────────────────────────
export interface JobCategory {
  title: string;
  description: string;
}

// ─── Collection Types ─────────────────────────────────────────────────────────
export interface ProductCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  group: 'ring-and-cage' | 'martial-arts' | 'apparel-and-gear';
  cardImage?: StrapiMedia | null;
  heroImage?: StrapiMedia | null;
  introHeading?: string | null;
  introDescription?: string | null;
  stats?: Stat[];
  subtypes?: SubtypeCard[];
  materials?: Material[];
  readyToGoColors?: ColorSwatch[];
  specialColorsNote?: string | null;
  weightOrSizeOptions?: OptionTag[];
  seo?: Seo | null;
  publishedAt?: string | null;
}

export interface SubCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  category?: ProductCategory | null;
  cardImage?: StrapiMedia | null;
  heroImage?: StrapiMedia | null;
  introHeading?: string | null;
  introDescription?: string | null;
  seo?: Seo | null;
  publishedAt?: string | null;
}

export interface Product {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  subCategory?: SubCategory | null;
  cardImage?: StrapiMedia | null;
  gallery?: StrapiMedia[];
  shortDescription?: string | null;
  description?: string | null;
  materials?: Material[];
  colors?: ColorSwatch[];
  sizeOptions?: OptionTag[];
  seo?: Seo | null;
  publishedAt?: string | null;
}

export interface Testimonial {
  id: number;
  documentId: string;
  clientName: string;
  clientLogo?: StrapiMedia | null;
  quote: string;
  showOnHome: boolean;
  publishedAt?: string | null;
}

export interface GalleryImage {
  id: number;
  documentId: string;
  image: StrapiMedia;
  caption?: string | null;
  order: number;
  publishedAt?: string | null;
}

export interface LegalPage {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  body: string;
  lastUpdated?: string | null;
}

// ─── Single Types ─────────────────────────────────────────────────────────────
export interface Global {
  siteName: string;
  logoLight?: StrapiMedia | null;
  logoDark?: StrapiMedia | null;
  favicon?: StrapiMedia | null;
  phoneNumber?: string | null;
  email?: string | null;
  officeAddress?: string | null;
  brochureFile?: StrapiMedia | null;
  socialLinks?: SocialLink[];
  headerCta?: CtaButton | null;
  defaultSeo?: Seo | null;
}

export interface HomePage {
  heroSlides?: HeroSlide[];
  processSteps?: ProcessStep[];
  featuredCategories?: { data: ProductCategory[] };
  stats?: Stat[];
  quoteText?: string | null;
  quoteAuthorName?: string | null;
  quoteAuthorSignature?: StrapiMedia | null;
  legacyHeading?: string | null;
  legacyDescription?: string | null;
  legacyVideoUrl?: string | null;
  capabilities?: IconTextCard[];
  certificationLogos?: LogoItem[];
  sustainabilityTeaserHeading?: string | null;
  sustainabilityTeaserDescription?: string | null;
  sustainabilityTeaserLink?: string | null;
  differenceTeaserHeading?: string | null;
  differenceTeaserDescription?: string | null;
  differenceTeaserLink?: string | null;
  clientLogos?: LogoItem[];
  seo?: Seo | null;
}

export interface CompanyPage {
  heroImage?: StrapiMedia | null;
  heroHeading?: string | null;
  introText?: string | null;
  capabilities?: IconTextCard[];
  historyHeading?: string | null;
  historyDescription?: string | null;
  timeline?: TimelineEntry[];
  seo?: Seo | null;
}

export interface DifferencePage {
  heroImage?: StrapiMedia | null;
  heroHeading?: string | null;
  introText?: string | null;
  servicePrinciples?: ServicePrinciple[];
  cycleSteps?: CycleStep[];
  seo?: Seo | null;
}

export interface PartnersPage {
  heroHeading?: string | null;
  introText?: string | null;
  partnerLogos?: LogoItem[];
  seo?: Seo | null;
}

export interface SustainabilityPage {
  heroImage?: StrapiMedia | null;
  heroHeading?: string | null;
  introText?: string | null;
  environmentHeading?: string | null;
  environmentDescription?: string | null;
  environmentCards?: IconTextCard[];
  corporateHeading?: string | null;
  corporateDescription?: string | null;
  corporateCards?: IconTextCard[];
  seo?: Seo | null;
}

export interface CareersPage {
  heroImage?: StrapiMedia | null;
  heroHeading?: string | null;
  introText?: string | null;
  applyEmail?: string | null;
  jobCategories?: JobCategory[];
  seo?: Seo | null;
}

export interface GalleryPage {
  heroHeading?: string | null;
  seo?: Seo | null;
}

export interface ProductsPage {
  heroHeading?: string | null;
  introHeading?: string | null;
  introDescription?: string | null;
  supplementaryServices?: IconTextCard[];
  seo?: Seo | null;
}

export interface ContactPage {
  heroHeading?: string | null;
  formSuccessMessage?: string | null;
  formErrorMessage?: string | null;
  seo?: Seo | null;
}
