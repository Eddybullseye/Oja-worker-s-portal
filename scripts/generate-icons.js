const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

// Master SVG: Dark Mode
const svgMaster = `
<svg width="1024" height="1024" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="22" ry="22" fill="#0B3D3E" />
  <path d="M 50,15 A 50,50 0 0,1 50,85 A 50,50 0 0,1 50,15 Z" fill="#F9A826" />
</svg>
`;

// Light Mode SVG
const svgLight = `
<svg width="1024" height="1024" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="22" ry="22" fill="#F6F3EC" />
  <path d="M 50,15 A 50,50 0 0,1 50,85 A 50,50 0 0,1 50,15 Z" fill="#0B3D3E" />
</svg>
`;

// Adaptive Foreground (Maskable Safe Zone) - lens only
const svgForeground = `
<svg width="1024" height="1024" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M 50,15 A 50,50 0 0,1 50,85 A 50,50 0 0,1 50,15 Z" fill="#F9A826" />
</svg>
`;

// Save master SVGs
fs.writeFileSync(path.join(publicDir, 'icon-master.svg'), svgMaster.trim());
fs.writeFileSync(path.join(publicDir, 'icon-light.svg'), svgLight.trim());
fs.writeFileSync(path.join(publicDir, 'icon-foreground.svg'), svgForeground.trim());

async function generate() {
  const masterBuffer = Buffer.from(svgMaster.trim());
  const lightBuffer = Buffer.from(svgLight.trim());

  const sizes = [16, 32, 48, 120, 152, 167, 180, 192, 512, 1024];

  for (const size of sizes) {
    // Standard icon
    await sharp(masterBuffer)
      .resize(size, size)
      .toFile(path.join(publicDir, `icon-${size}x${size}.png`));
    
    // Light icon (mainly for favicon)
    if (size <= 48) {
      await sharp(lightBuffer)
        .resize(size, size)
        .toFile(path.join(publicDir, `favicon-light-${size}x${size}.png`));
    }
  }

  // Maskable icon requires 192 and 512, with a solid background and 20% padding (icon scaled down)
  // Our master SVG already has padding. The vesica is 70px high on a 100px canvas.
  // The safe zone for maskable icons is a circle of radius 40 (diameter 80) in the center.
  // Our vesica spans y=15 to 85 (height 70), so it perfectly fits inside the safe zone (80).
  // We can just render the master SVG without corner radius on a solid background for maskable!
  
  const svgMaskable = `
<svg width="1024" height="1024" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0B3D3E" />
  <path d="M 50,15 A 50,50 0 0,1 50,85 A 50,50 0 0,1 50,15 Z" fill="#F9A826" />
</svg>
  `;
  const maskableBuffer = Buffer.from(svgMaskable.trim());

  await sharp(maskableBuffer)
    .resize(192, 192)
    .toFile(path.join(publicDir, 'icon-maskable-192x192.png'));
  
  await sharp(maskableBuffer)
    .resize(512, 512)
    .toFile(path.join(publicDir, 'icon-maskable-512x512.png'));

  console.log("Icons generated successfully.");
}

generate().catch(console.error);
