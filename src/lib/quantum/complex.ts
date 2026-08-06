import { Complex } from '../../types/quantum';
export type { Complex };

export const ZERO: Complex = { re: 0, im: 0 };
export const ONE: Complex = { re: 1, im: 0 };
export const I: Complex = { re: 0, im: 1 };
export const SQRT1_2: Complex = { re: 1 / Math.SQRT2, im: 0 };
export const NEG_SQRT1_2: Complex = { re: -1 / Math.SQRT2, im: 0 };

export function complex(re: number, im = 0): Complex {
  return { re, im };
}

export function add(a: Complex, b: Complex): Complex {
  return { re: a.re + b.re, im: a.im + b.im };
}

export function subtract(a: Complex, b: Complex): Complex {
  return { re: a.re - b.re, im: a.im - b.im };
}

export function multiply(a: Complex, b: Complex): Complex {
  return {
    re: a.re * b.re - a.im * b.im,
    im: a.re * b.im + a.im * b.re,
  };
}

export function scale(c: Complex, factor: number): Complex {
  return { re: c.re * factor, im: c.im * factor };
}

export function magnitudeSq(c: Complex): number {
  return c.re * c.re + c.im * c.im;
}

export function magnitude(c: Complex): number {
  return Math.sqrt(magnitudeSq(c));
}

export function phase(c: Complex): number {
  // Returns angle in radians between -pi and pi
  return Math.atan2(c.im, c.re);
}

export function conjugate(c: Complex): Complex {
  return { re: c.re, im: -c.im };
}

export function isEqual(a: Complex, b: Complex, eps = 1e-6): boolean {
  return Math.abs(a.re - b.re) < eps && Math.abs(a.im - b.im) < eps;
}

export function formatComplex(c: Complex, decimals = 3): string {
  const r = Math.abs(c.re) < 1e-8 ? 0 : Number(c.re.toFixed(decimals));
  const i = Math.abs(c.im) < 1e-8 ? 0 : Number(c.im.toFixed(decimals));

  if (r === 0 && i === 0) return '0';
  if (i === 0) return `${r}`;
  if (r === 0) {
    if (i === 1) return 'i';
    if (i === -1) return '-i';
    return `${i}i`;
  }

  const sign = i > 0 ? '+' : '-';
  const absI = Math.abs(i);
  const iStr = absI === 1 ? 'i' : `${absI}i`;
  return `${r} ${sign} ${iStr}`;
}
