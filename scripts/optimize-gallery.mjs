import { mkdir, readdir, stat } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import sharp from 'sharp';

const sourceRoot = join(process.cwd(), 'public', 'gallery');
const outputRoot = join(process.cwd(), 'public', 'gallery-optimized');
const imagePattern = /\.(jpe?g|png|gif|webp|avif)$/i;

async function optimizeDirectory(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(entries.map(async (entry) => {
    const sourcePath = join(directory, entry.name);

    if (entry.isDirectory()) {
      await optimizeDirectory(sourcePath);
      return;
    }

    if (!entry.isFile() || !imagePattern.test(entry.name)) return;

    const relativePath = relative(sourceRoot, sourcePath);
    const outputPath = join(outputRoot, relativePath.replace(/\.[^/.]+$/, '.webp'));
    const sourceStats = await stat(sourcePath);

    try {
      const outputStats = await stat(outputPath);
      if (outputStats.mtimeMs >= sourceStats.mtimeMs) return;
    } catch {
      // Generate the derivative when it does not exist yet.
    }

    await mkdir(dirname(outputPath), { recursive: true });
    await sharp(sourcePath)
      .resize({ width: 2400, withoutEnlargement: true })
      .webp({ quality: 78, effort: 4 })
      .toFile(outputPath);
  }));
}

try {
  await stat(sourceRoot);
  await optimizeDirectory(sourceRoot);
} catch (error) {
  if (error.code === 'ENOENT') {
    console.warn('Gallery directory not found; skipping image optimization.');
  } else {
    throw error;
  }
}
