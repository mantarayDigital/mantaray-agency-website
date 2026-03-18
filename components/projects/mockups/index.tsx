// Project mockups - static screenshot images for each project variant

import Image from "next/image";

// Variant configurations for each project
export const projectVariants: Record<string, { id: string; label: string }[]> =
  {
    pulse: [
      { id: "dashboard", label: "Dashboard" },
      { id: "reports", label: "Reports" },
      { id: "team", label: "Team" },
      { id: "receipts", label: "Receipts" },
    ],
    bloom: [
      { id: "home", label: "Home" },
      { id: "products", label: "Products" },
      { id: "detail", label: "Product Detail" },
      { id: "ar-view", label: "AR View" },
    ],
    atlas: [
      { id: "dashboard", label: "Dashboard" },
      { id: "contacts", label: "Contacts" },
      { id: "pipeline", label: "Pipeline" },
      { id: "reports", label: "Reports" },
    ],
    nomad: [
      { id: "search", label: "Search" },
      { id: "results", label: "Results" },
      { id: "detail", label: "Property" },
      { id: "booking", label: "Booking" },
    ],
    volt: [
      { id: "home", label: "Home" },
      { id: "workout", label: "Workout" },
      { id: "exercise", label: "Exercise" },
      { id: "progress", label: "Progress" },
    ],
    medix: [
      { id: "dashboard", label: "Dashboard" },
      { id: "booking", label: "Booking" },
      { id: "consultation", label: "Consultation" },
      { id: "records", label: "Records" },
    ],
    barista: [
      { id: "home", label: "Home" },
      { id: "products", label: "Shop" },
      { id: "services", label: "Services" },
      { id: "gallery", label: "Gallery" },
    ],
    luxe: [
      { id: "home", label: "Home" },
      { id: "products", label: "Products" },
      { id: "cart", label: "Cart" },
      { id: "checkout", label: "Checkout" },
    ],
    bazaar: [
      { id: "home", label: "Home" },
      { id: "categories", label: "Categories" },
      { id: "products", label: "Products" },
      { id: "branches", label: "Branches" },
    ],
    haven: [
      { id: "home", label: "Home" },
      { id: "cabins", label: "Cabins" },
      { id: "experience", label: "Experience" },
      { id: "booking", label: "Booking" },
    ],
    alpine: [
      { id: "home", label: "Home" },
      { id: "cabins", label: "Cabins" },
      { id: "gallery", label: "Gallery" },
      { id: "contact", label: "Contact" },
    ],
  };

export function getProjectMockup(slug: string, variant?: string) {
  const variants = projectVariants[slug];
  if (!variants) return null;

  const variantId = variant || variants[0].id;
  const src = `/screenshots/${slug}/${variantId}.png`;
  const label = variants.find((v) => v.id === variantId)?.label || variantId;

  return (
    <Image
      src={src}
      alt={`${slug} - ${label}`}
      width={1440}
      height={900}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "top",
      }}
    />
  );
}
