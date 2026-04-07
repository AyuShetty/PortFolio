import fs from "node:fs/promises";
import path from "node:path";
import { getPlaiceholder } from "plaiceholder";

export type GalleryImage = {
  src: string;
  alt: string;
  name: string;
  category?: string;
  featured?: boolean;
  blurDataURL?: string;
  fileName: string;
};

type GalleryMetaItem = {
  file: string;
  title?: string;
  alt?: string;
  category?: string;
  featured?: boolean;
};

type GalleryMeta = {
  items?: GalleryMetaItem[];
};

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"].flatMap((ext) => [ext, ext.toUpperCase()]));

async function readMetadata(folder: string): Promise<GalleryMetaItem[]> {
  const metadataPath = path.join(process.cwd(), "public", folder, "gallery.json");

  try {
    const raw = await fs.readFile(metadataPath, "utf-8");
    const parsed = JSON.parse(raw) as GalleryMeta;
    return parsed.items ?? [];
  } catch {
    return [];
  }
}

export async function getGalleryImages(folder: string): Promise<GalleryImage[]> {
  const absolute = path.join(process.cwd(), "public", folder);

  try {
    const metadataItems = await readMetadata(folder);
    const metadataMap = new Map(metadataItems.map((item) => [item.file, item]));
    const metadataOrder = metadataItems.map((item) => item.file);
    const entries = await fs.readdir(absolute, { withFileTypes: true });

    const files = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name)))
      .sort((a, b) => a.localeCompare(b));

    const orderedFiles = [
      ...metadataOrder.filter((file) => files.includes(file)),
      ...files.filter((file) => !metadataOrder.includes(file)),
    ];

    const results: GalleryImage[] = [];

    for (const fileName of orderedFiles) {
      const meta = metadataMap.get(fileName);
      const cleanName = fileName.replace(/[-_]/g, " ").replace(/\.[^.]+$/, "");
      
      // Skip blur data URL generation to improve performance during development
      // This can be re-enabled once other issues are resolved
      let blurDataURL: string | undefined = undefined;

      results.push({
        src: `/${folder}/${fileName}`,
        alt: meta?.alt ?? meta?.title ?? cleanName,
        name: meta?.title ?? cleanName,
        category: meta?.category,
        featured: meta?.featured,
        blurDataURL,
        fileName,
      });
    }

    return results;
  } catch {
    return [];
  }
}
