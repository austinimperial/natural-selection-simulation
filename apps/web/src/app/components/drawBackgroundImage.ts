export function drawBackgroundImage({
  canvas,
  imageSrc,
  width,
  height,
  callback,
}: {
  canvas: HTMLCanvasElement | null;
  imageSrc: string | null;
  width: number;
  height: number;
  callback?: () => void;
}): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!canvas || !imageSrc) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    const img = new window.Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const canvasAspect = canvas.width / canvas.height;
      const imgAspect = img.width / img.height;

      let drawWidth: number,
        drawHeight: number,
        offsetX: number,
        offsetY: number;

      if (imgAspect > canvasAspect) {
        drawHeight = canvas.height;
        drawWidth = img.width * (canvas.height / img.height);
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = canvas.width;
        drawHeight = img.height * (canvas.width / img.width);
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      callback?.();

      resolve();
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = imageSrc;
  });
}
