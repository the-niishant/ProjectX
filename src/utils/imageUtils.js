/**
 * Elite Weavers Image Utilities
 * Generates placeholder textile patterns for demo/prototype use.
 * For production, use properly licensed saree photographs.
 */

/**
 * Generates a random "weave" pattern SVG that resembles textile patterns
 * Suitable for collection tiles, product backgrounds, and decorative elements
 */
export function generateTextilePattern(options = {}) {
  const {
    width = 400,
    height = 400,
    base = '#09151f',  // Night
    accent = '#e0ad62',  // Saffron thread
    pattern = 'zari',  // 'zari', 'border', 'butti', 'ikat'
  } = options;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">`;

  if (pattern === 'zari') {
    // Gold zari brocade-like grid
    const rows = Math.floor(height / 20);
    const cols = Math.floor(width / 20);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (c % 4 === 0 && r % 4 === 0) {
          svg += `<rect x="${c * 20}" y="${r * 20}" width="12" height="12" fill="${accent}"/>`;
        }
      }
    }
  } else if (pattern === 'border') {
    // Frame border pattern
    svg += `<rect x="0" y="0" width="${width}" height="${height}" fill="none" stroke="${accent}" stroke-width="8"/>`;
    // Corner motifs
    svg += `<circle cx="40" cy="40" r="15" fill="${accent}"/>`;
    svg += `<circle cx="${width-40}" cy="40" r="15" fill="${accent}"/>`;
    svg += `<circle cx="40" cy="${height-40}" r="15" fill="${accent}"/>`;
    svg += `<circle cx="${width-40}" cy="${height-40}" r="15" fill="${accent}"/>`;
  } else if (pattern === 'butti') {
    // Small motif scatter
    const count = 30;
    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = 3 + Math.random() * 6;
      svg += `<circle cx="${x}" cy="${y}" r="${size}" fill="${accent}" opacity="0.3"/>`;
    }
  }

  svg += '</svg>';
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Get appropriate textile pattern for a collection type
 */
export function getCollectionPattern(collectionSlug, width = 400, height = 400) {
  const patterns = {
    banarasi: { pattern: 'zari', description: 'Gold zari brocade pattern' },
    kanjivaram: { pattern: 'border', description: 'Temple border motif' },
    chanderi: { pattern: 'butti', description: 'Delicate butti weave pattern' },
    paithani: { pattern: 'ikat', description: 'Geometric ikat pattern' },
    patola: { pattern: 'border', description: 'Double ikat geometric border' },
    bandhani: { pattern: 'butti', description: 'Tie-dye dot pattern' },
    tussar: { pattern: 'butti', description: 'Textured silk pattern' },
    organza: { pattern: 'zari', description: 'Crisp organza pattern' },
    linen: { pattern: 'butti', description: 'Natural linen texture' },
    cotton: { pattern: 'butti', description: 'Breathable cotton weave' },
  };

  const cfg = patterns[collectionSlug.toLowerCase()] || patterns['banarasi'];
  return generateTextilePattern({ width, height, pattern: cfg.pattern });
}

/**
 * Product images configuration
 * Maps product slugs to specific pattern generators
 */
export function getProductImage(product, type = 'main') {
  const baseColor = '#09151f';
  const accent = '#e0ad62';

  if (type === 'gallery' || type === 'primary') {
    // Use a pattern that suggests the product's category
    const cat = (product.category || '').toLowerCase();
    switch (cat) {
      case 'banarasi':
        return generateTextilePattern({ pattern: 'zari', accent });
      case 'kanjivaram':
        return generateTextilePattern({ pattern: 'border', accent: '#8b4513' });
      case 'chanderi':
        return generateTextilePattern({ pattern: 'butti', accent: '#d2b48c' });
      case 'paithani':
        return generateTextilePattern({ pattern: 'ikat', accent: '#d2691e' });
      default:
        return generateTextilePattern({ pattern: 'butti', accent });
    }
  }
  return generateTextilePattern({ pattern: 'butti' });
}