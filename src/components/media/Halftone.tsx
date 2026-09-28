import { useEffect, useRef } from 'react';
import styles from './Halftone.module.css';

interface Props {
  src: string;
  alt: string;
  /** Dots across the shorter side. Source crops are small, so ~40–64 is the sweet spot. */
  density?: number;
  dot?: string;
  background?: string;
  /** >1 pushes mids toward black, <1 opens them up. */
  gamma?: number;
  /** Dark dots on a light ground: dot size follows shadow, not light. */
  onPaper?: boolean;
  /** Animate a top-to-bottom “print” reveal when the image changes. */
  reveal?: boolean;
  className?: string;
}

const imageCache = new Map<string, Promise<HTMLImageElement>>();

function loadImage(src: string) {
  if (!imageCache.has(src)) {
    imageCache.set(
      src,
      new Promise((resolve, reject) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      }),
    );
  }
  return imageCache.get(src)!;
}

/** Samples an image into a luminance grid, cropped like object-fit: cover. */
function sample(img: HTMLImageElement, cols: number, rows: number) {
  const c = document.createElement('canvas');
  c.width = cols;
  c.height = rows;
  const ctx = c.getContext('2d', { willReadFrequently: true })!;
  const scale = Math.max(cols / img.width, rows / img.height);
  const w = img.width * scale;
  const h = img.height * scale;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, (cols - w) / 2, (rows - h) / 2, w, h);
  const { data } = ctx.getImageData(0, 0, cols, rows);
  const lum = new Float32Array(cols * rows);
  for (let i = 0; i < lum.length; i++) {
    lum[i] = (0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2]) / 255;
  }
  return lum;
}

/**
 * Print-style halftone portrait rendered to canvas.
 * Turns small, mixed-quality source images into one consistent,
 * art-directed black & white treatment.
 */
export function Halftone({
  src,
  alt,
  density = 56,
  dot = '#f2f0eb',
  background = 'transparent',
  gamma = 1.1,
  reveal = true,
  onPaper = false,
  className = '',
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let raf = 0;
    let cancelled = false;
    let firstPaint = true;
    let drawnSize = '';
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const draw = async () => {
      const box = wrap.getBoundingClientRect();
      if (!box.width || !box.height) return;
      drawnSize = `${Math.round(box.width)}x${Math.round(box.height)}`;

      const img = await loadImage(src).catch(() => null);
      if (!img || cancelled) return;

      const { width, height } = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      const cell = Math.min(width, height) / density;
      const cols = Math.ceil(width / cell);
      const rows = Math.ceil(height / cell);
      const lum = sample(img, cols, rows);
      const ctx = canvas.getContext('2d')!;
      const maxR = (cell / 2) * 1.08 * dpr;

      const paint = (progress: number) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (background !== 'transparent') {
          ctx.fillStyle = background;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.fillStyle = dot;
        const visibleRows = rows * progress;
        for (let y = 0; y < rows; y++) {
          const rowT = Math.min(1, Math.max(0, visibleRows - y + 1) / 6);
          if (rowT <= 0) break;
          for (let x = 0; x < cols; x++) {
            const v = lum[y * cols + x];
            const l = Math.pow(onPaper ? 1 - v : v, gamma);
            const r = maxR * Math.sqrt(l) * rowT;
            if (r < 0.35 * dpr) continue;
            ctx.beginPath();
            ctx.arc((x + 0.5) * cell * dpr, (y + 0.5) * cell * dpr, r, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      };

      cancelAnimationFrame(raf);
      if (!reveal || reduced || !firstPaint) {
        paint(1.2);
        return;
      }
      firstPaint = false;
      const start = performance.now();
      const duration = 900;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        paint(eased * 1.2 + 0.001);
        if (t < 1 && !cancelled) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    // Print the image the first time it scrolls into view…
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          draw();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(wrap);

    // …and re-rasterise (without animation) whenever its box changes.
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (drawnSize && `${Math.round(width)}x${Math.round(height)}` !== drawnSize) draw();
    });
    ro.observe(wrap);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [src, density, dot, background, gamma, reveal, onPaper]);

  return (
    <div ref={wrapRef} className={`${styles.wrap} ${className}`} role="img" aria-label={alt}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
