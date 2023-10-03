export default function lch(
  lightness: number,
  color: number,
  hue: number,
  alpha: number = 100,
) {
  return `lch(${lightness}% ${color} ${hue} / ${alpha}%)`;
}