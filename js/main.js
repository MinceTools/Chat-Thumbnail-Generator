const img = new Image();
img.src = './assets/ascii.png';

img.onload = () => {
  const canvas = document.getElementById('asciiCanvas');
  const ctx = canvas.getContext('2d');

  const charWidth = 32;
  const charHeight = 32;
  const charsPerRow = 16;

  const drawText = (text, x, y, color = '#FFFFFF') => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;

    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      if (charCode < 32 || charCode > 127) continue;
      const index = charCode - 32;

      const sx = (index % charsPerRow) * charWidth;
      const sy = Math.floor(index / charsPerRow) * charHeight;

      // Draw in white and tint with fillStyle
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(img, sx, sy, charWidth, charHeight, x + i * charWidth, y, charWidth, charHeight);

      // Tint over the white chars using multiply
      ctx.globalCompositeOperation = "source-in";
      ctx.fillRect(x + i * charWidth, y, charWidth, charHeight);
    }

    ctx.globalCompositeOperation = "source-over";
  };

  // Example render
  drawText("Player: Hello!", 10, 30, "#55FF55"); // lime green
};
