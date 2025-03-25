function generateASCII() {
  const imageUrl = document.getElementById('imageUrl').value;
  if (!imageUrl) {
    alert('Please provide an image URL.');
    return;
  }

  const img = new Image();
  img.src = imageUrl;

  img.onload = function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const width = 100;
    const height = (img.height / img.width) * width;
    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(img, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;

    const ascii = pixelsToASCII(pixels, width, height);
    document.getElementById('asciiArt').textContent = ascii;
  };

  img.onerror = function() {
    alert('Error loading image. Check the URL.');
  };
}

function pixelsToASCII(pixels, width, height) {
  const asciiChars = ['@', '#', '8', '&', '%', '$', '*', '+', '-', '.', ' '];
  let asciiArt = '';

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      const r = pixels[index];
      const g = pixels[index + 1];
      const b = pixels[index + 2];
      const a = pixels[index + 3];

      const brightness = (r + g + b) / 3;
      const charIndex = Math.floor((brightness / 255) * (asciiChars.length - 1));

      asciiArt += asciiChars[charIndex];
    }
    asciiArt += '\n';
  }

  return asciiArt;
}