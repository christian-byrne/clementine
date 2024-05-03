import brandData from "@/data/brand.json";

export default function formatDocTitle(pageTitle) {
  if (!brandData || !brandData.name) return pageTitle;
  if (!pageTitle) return brandData.name;
  return `${brandData.name} - ${pageTitle}`;
}
