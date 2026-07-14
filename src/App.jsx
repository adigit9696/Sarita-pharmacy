import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import brandLogoSrc from "./assets/logo.png";
import MEDICINE_LIST from "./medicineList.js";

// ─── SVG ICONS ────────────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

// ─── MINIMALIST SVG ICON SYSTEM ────────────────────────────────────────────────
// Cosmic, thin-line icons — replaces emojis for a premium professional aesthetic
const _IP = {
  pill: <><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" /><path d="m8.5 8.5 7 7" /></>,
  syringe: <><path d="m18 2 4 4" /><path d="m17 7-4-4" /><path d="M19 9 10.3 17.7a2 2 0 0 1-2.83 0l-1.17-1.17a2 2 0 0 1 0-2.83L15 5" /><path d="m2 22 4-2" /></>,
  dna: <><path d="M2 15c6.667-6 13.333 0 20-6" /><path d="M2 9c6.667 6 13.333 0 20 6" /><path d="M9 22c1.8-4.5 4.2-4.5 6 0" /><path d="M9 2c1.8 4.5 4.2 4.5 6 0" /></>,
  stethoscope: <><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 12 0V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" /><path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4" /><circle cx="20" cy="10" r="2" /></>,
  heart: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
  flask: <><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" /><path d="M8.5 2h7" /><path d="M7 16.5h10" /></>,
  crossMed: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  bandage: <><rect x="3" y="3" width="18" height="18" rx="4" transform="rotate(45 12 12)" /><path d="M12 12h.01" /></>,
  building: <><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" /></>,
  microscope: <><path d="M6 18h8" /><path d="M3 22h18" /><path d="M14 22a7 7 0 1 0 0-14h-1" /><path d="M9 14h2" /><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2z" /><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" /></>,
  eye: <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></>,
  tooth: <path d="M12 2C9.5 2 8 3 7 5c-1 2-1.5 5-1 7 .5 2.5 1.5 5 2.5 7 .5 1 1.5 3 2.5 3s2-2 2.5-3c1-2 2-4.5 2.5-7 .5-2 0-5-1-7-1-2-2.5-3-5-3z" />,
  brain: <><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5V22" /><path d="M14.5 2a2.5 2.5 0 0 0-2.5 2.5" /><path d="M4.2 5.7A2.5 2.5 0 0 1 7.6 4" /><path d="M19.8 5.7a2.5 2.5 0 0 0-3.4-1.7" /><path d="M2 9.8a2.5 2.5 0 0 1 3.8-.7" /><path d="M22 9.8a2.5 2.5 0 0 0-3.8-.7" /><path d="M2.4 14.3a2.5 2.5 0 0 1 4-.4" /><path d="M21.6 14.3a2.5 2.5 0 0 0-4-.4" /><path d="M5.7 19.8A2.5 2.5 0 0 1 9 19" /><path d="M18.3 19.8a2.5 2.5 0 0 0-3.3-.8" /></>,
  flower: <><circle cx="12" cy="12" r="3" /><path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15" /></>,
  ear: <><path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3 3 0 1 1-6 0" /><path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 0 0 4 0" /></>,
  leaf: <><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 20 .5 20 .5s.5 5-2 11a7 7 0 0 1-7 8.5z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></>,
  scan: <><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><path d="M7 12h10" /></>,
  bone: <><circle cx="7" cy="7" r="3" /><circle cx="17" cy="17" r="3" /><path d="m9 9 6 6" /></>,
  baby: <><circle cx="12" cy="12" r="10" /><path d="M9 12h.01" /><path d="M15 12h.01" /><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" /></>,
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
  cart: <><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></>,
  home: <><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></>,
  user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
  userMd: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /><path d="M12 11v2" /><path d="M11 12h2" /></>,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></>,
  search: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></>,
  mapPin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
  clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
  bike: <><circle cx="18.5" cy="17.5" r="3.5" /><circle cx="5.5" cy="17.5" r="3.5" /><circle cx="15" cy="5" r="1" /><path d="M12 17.5V14l-3-3 4-3 2 3h2" /></>,
  star: <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />,
  rocket: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></>,
  lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
  creditCard: <><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><path d="M1 10h22" /></>,
  banknote: <><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01" /><path d="M18 12h.01" /></>,
  box: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="M3.27 6.96 12 12.01l8.73-5.05" /><path d="M12 22.08V12" /></>,
  clipboard: <><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></>,
  wallet: <><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4z" /></>,
  mobile: <><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><path d="M12 18h.01" /></>,
  check: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4 12 14.01l-3-3" /></>,
  xMark: <><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></>,
  sparkle: <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275z" />,
  flame: <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />,
  zap: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />,
  trophy: <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2z" /></>,
  smile: <><circle cx="12" cy="12" r="10" /><path d="M8 14c1.5 2 3.5 3 4 3s2.5-1 4-3" /><path d="M9 9h.01" /><path d="M15 9h.01" /></>,
  truck: <><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 13.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></>,
  hands: <><path d="M7 11v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-8" /><path d="M12 3v4" /><path d="M7.5 7l1.5 4" /><path d="M16.5 7l-1.5 4" /></>,
  mapIcon: <><path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4z" /><path d="M8 2v16" /><path d="M16 6v16" /></>,
  clip: <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />,
  fileText: <><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5z" /><path d="M14 2v6h6" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" /></>,
  folderOpen: <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />,
  upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m17 8-5-5-5 5" /><path d="M12 3v12" /></>,
  bulb: <><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></>,
  warn: <><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z" /><path d="M12 9v4" /><path d="M12 17h.01" /></>,
  edit: <><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" /><path d="m15 5 4 4" /></>,
  hash: <><path d="M4 9h16" /><path d="M4 15h16" /><path d="M10 3 8 21" /><path d="M16 3l-2 18" /></>,
  badgeNew: <><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></>,
  timer: <><path d="M5 22h14" /><path d="M5 2h14" /><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" /><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" /></>,
  headphones: <><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></>,
  arrowUp: <path d="m18 15-6-6-6 6" />,
};

function Icon({ name, size = 20, color = "currentColor", sw = 1.5 }) {
  const paths = _IP[name];
  if (!paths) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle" }}>
      {paths}
    </svg>
  );
}

// ─── BRAND LOGO (uses src/assets/logo.png as single source of truth) ────────
function BrandLogo({ size = 36, style = {}, className = "" }) {
  return (
    <img
      src={brandLogoSrc}
      alt="Sarita Pharmacy"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain", display: "block", ...style }}
      loading="lazy"
    />
  );
}

// ═══════════════════════════════════════════════════════════
// SCROLL REVEAL HOOK
// ═══════════════════════════════════════════════════════════
function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: options.threshold || 0.12, rootMargin: options.rootMargin || "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, visible] = useScrollReveal();
  const transforms = { up: "translateY(40px)", down: "translateY(-40px)", left: "translateX(-40px)", right: "translateX(40px)", scale: "scale(0.92)" };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : (transforms[direction] || "translateY(40px)"),
      transition: `opacity 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════
const CONFIG = {
  name: "Sarita Pharmacy",
  phone: "9278400673",
  whatsapp: "919278400673",
  address: "5/1/1 Madhokunj, Katra, Prayagraj, UP 211002",
  deliveryCharge: 30,
  deliveryTime: "45–60 min",
  yearsActive: 5,
  openTime: "8:00 AM – 10:00 PM",
};


// ═══════════════════════════════════════════════════════════
// DOCTORS DATABASE
// ═══════════════════════════════════════════════════════════
const DOCTORS = [
  { id: 1, name: "Dr. A.K. Srivastava", qual: "MBBS, MD (Dermatology)", spec: "Dermatologist", specHindi: "त्वचा एवं यौन रोग विशेषज्ञ", timing: "Wed & Sat: 12PM - 4PM", icon: "D1", color: "#8b5cf6", tags: ["Specialist"], fee: "₹600" },
  { id: 2, name: "Dr. G. Singh & Avadh Raj Pal", qual: "Netra Sarjan", spec: "Eye Specialist", specHindi: "नेत्र रोग विशेषज्ञ", timing: "Everyday: 2PM - 8PM", icon: "D2", color: "#0891b2", tags: ["Eye"], fee: "₹300" },
  { id: 3, name: "Dr. Varun Tripathi", qual: "MD (Physician)", spec: "Physician & Diabetologist", specHindi: "मधुमेह रोग विशेषज्ञ", timing: "Mon-Sat: 11:30AM-1:30PM, 6:30PM-8:30PM | Sun: 1PM-2PM, 7PM-8PM", icon: "D3", color: "#10b981", tags: ["Physician"], fee: "₹600 / ₹200 for students for month" },
  { id: 4, name: "Dr. Pravin Kumar Tripathi", qual: "BDS, Dental Surgeon", spec: "Dental Surgeon", specHindi: "दाँत एवं मुख रोग विशेषज्ञ", timing: "Everyday: 10AM-1PM & 4PM-8PM", icon: "D4", color: "#f59e0b", tags: ["Dental"], fee: "₹200" },
  { id: 5, name: "Dr. Piyush Shankar Tripathi", qual: "MBBS, MS (Gen. Surgery)", spec: "General & Cancer Surgeon", specHindi: "जनरल सर्जन एवं कैंसर रोग विशेषज्ञ", timing: "Mon-Sat: 5PM - 7PM", icon: "D5", color: "#ef4444", tags: ["Surgeon"], fee: "₹500" },
  { id: 6, name: "Dr. R.P. Pandey", qual: "Neuro Specialist", spec: "Neurologist", specHindi: "न्यूरो रोग विशेषज्ञ", timing: "Mon-Sat: 1:30PM - 2:30PM", icon: "D6", color: "#6366f1", tags: ["Neuro"], fee: "₹500" },
  { id: 7, name: "Dr. S. Shukla", qual: "MBBS, MD", spec: "Gynecologist", specHindi: "स्त्री रोग विशेषज्ञ", timing: "Mon-Sat: 5PM - 6PM", icon: "D7", color: "#ec4899", tags: ["Gynecologist"], fee: "₹300" },
  { id: 8, name: "Dr. Vishwas", qual: "ENT Surgeon", spec: "ENT Specialist", specHindi: "कान, नाक एवं गला रोग विशेषज्ञ", timing: "Mon-Sat: 2:30PM - 4PM", icon: "D8", color: "#14b8a6", tags: ["ENT"], fee: "₹300" },
  { id: 9, name: "Dr. Durgesh Kumar Shukla", qual: "M.S. (Ayurveda)", spec: "Ayurveda Specialist", specHindi: "चर्म, उदर एवं गुदा रोग विशेषज्ञ", timing: "Mon-Sat: 5:30PM - 7:30PM", icon: "D9", color: "#22c55e", tags: ["Ayurveda"], fee: "₹500" },
  { id: 10, name: "Dr. A.K. Chaubey", qual: "MBBS, D.G.M., PG Dip.", spec: "Physician & Rheumatologist", specHindi: "फिजिशियन एवं गठिया रोग विशेषज्ञ", timing: "Mon-Sat: 3PM - 4:30PM", icon: "D10", color: "#f97316", tags: ["Physician"], fee: "₹300" },
  { id: 11, name: "Dr. S.K. Pandey", qual: "MBBS, D. Ortho", spec: "Orthopedic Specialist", specHindi: "हड्डी एवं जोड़ रोग विशेषज्ञ", timing: "Mon-Sat: 11:30AM - 1PM", icon: "D11", color: "#0d4f6b", tags: ["Orthopedic"], fee: "₹300" },
  { id: 12, name: "Dr. S.K. Shukla", qual: "MBBS, DCH", spec: "Child Specialist", specHindi: "बाल रोग विशेषज्ञ", timing: "Mon-Sat: 5PM - 7PM", icon: "D12", color: "#06b6d4", tags: ["Child"], fee: "₹300" },
];
const DOC_ICON_MAP = { "D1": "microscope", "D2": "eye", "D3": "stethoscope", "D4": "tooth", "D5": "building", "D6": "brain", "D7": "flower", "D8": "ear", "D9": "leaf", "D10": "scan", "D11": "bone", "D12": "baby" };

// ═══════════════════════════════════════════════════════════
// SECURE AUTH — Password verified via SHA-256 hash.
// The actual password is NEVER stored in source code.
// Only the irreversible SHA-256 digest is stored here.
// To change password: run in browser console:
//   crypto.subtle.digest('SHA-256', new TextEncoder().encode('YourNewPassword'))
//     .then(h => console.log(Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2,'0')).join('')))
// Then replace _ADMIN_HASH below with the output.
// ═══════════════════════════════════════════════════════════
const _ADMIN_HASH = "81e3be0c1f63f75f311765ef1d333bcacc792547caae337e2b4591fefa2a9002";
const verifyAdmin = async (input) => {
  try {
    const data = new TextEncoder().encode(input);
    const hashBuf = await crypto.subtle.digest("SHA-256", data);
    const hashHex = Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, "0")).join("");
    return hashHex === _ADMIN_HASH;
  } catch { return false; }
};

// ═══════════════════════════════════════════════════════════
// FIREBASE REST API
// ═══════════════════════════════════════════════════════════
//
// ⚠  SECURITY NOTICE — ACTION REQUIRED:
// The API key below is restricted to Firestore REST calls only.
// You MUST update Firestore Security Rules in Firebase Console:
//
//   Firebase Console → Firestore Database → Rules tab
//
//   Recommended rules (replace existing):
//   ─────────────────────────────────────
//   rules_version = '2';
//   service cloud.firestore {
//     match /databases/{database}/documents {
//       match /orders/{orderId} {
//         allow create: if true;
//         allow read, update: if request.time < timestamp.date(2026, 12, 31);
//         allow delete: if false;
//       }
//     }
//   }
//   ─────────────────────────────────────
//   Then click "Publish". Restricts delete and limits access window.
//
const PROJECT_ID = "sarita-pharmacy-25d00";
const API_KEY = "AIzaSyCh4nDjecmJVkxTmnxUkoLZgP9ML63i55w";
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

const toFS = obj => {
  const f = {};
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === "string") f[k] = { stringValue: v };
    else if (typeof v === "number") f[k] = { integerValue: String(v) };
    else if (typeof v === "boolean") f[k] = { booleanValue: v };
  }
  return { fields: f };
};
const fromFS = doc => {
  const o = { id: doc.name?.split("/").pop() };
  for (const [k, v] of Object.entries(doc.fields || {}))
    o[k] = v.stringValue ?? v.integerValue ?? v.booleanValue ?? "";
  return o;
};
const fsGet = async () => {
  const r = await fetch(`${BASE}/orders?key=${API_KEY}`);
  if (!r.ok) throw new Error(`Firebase fetch failed: ${r.status} ${r.statusText}`);
  const d = await r.json();
  if (d.error) throw new Error(d.error.message || "Firestore error");
  if (!d.documents) return [];
  return d.documents.map(fromFS).sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
};

const fsAdd = async (data) => {
  const r = await fetch(`${BASE}/orders?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toFS(data)),
  });
  if (!r.ok) throw new Error(`Firebase write failed: ${r.status} ${r.statusText}`);
  const d = await r.json();
  if (d.error) throw new Error(d.error.message || "Firestore write error");
  return d.name?.split("/").pop();
};

const fsPatch = async (id, data) => {
  const mask = Object.keys(data).map(k => `updateMask.fieldPaths=${k}`).join("&");
  const r = await fetch(`${BASE}/orders/${id}?key=${API_KEY}&${mask}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toFS(data)),
  });
  if (!r.ok) throw new Error(`Firebase update failed: ${r.status} ${r.statusText}`);
  const d = await r.json();
  if (d.error) throw new Error(d.error.message || "Firestore update error");
};

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════
// Secure Order ID using crypto.randomUUID()
const genId = () => {
  try {
    const uuid = crypto.randomUUID();
    return "SP-" + uuid.split("-")[0].toUpperCase();
  } catch {
    return "SP" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase();
  }
};

const fmt = ts => ts ? new Date(Number(ts)).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "—";
const fmtDate = ts => ts ? new Date(Number(ts)).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }) : "—";
const isToday = ts => { const d = new Date(Number(ts)); const t = new Date(); return d.getDate() === t.getDate() && d.getMonth() === t.getMonth() && d.getFullYear() === t.getFullYear(); };
const isLast7 = ts => Date.now() - Number(ts) < 7 * 24 * 60 * 60 * 1000;

const STATUS = {
  new: { label: "New Order", icon: "badgeNew", color: "#3b82f6", bg: "#eff6ff", step: 0 },
  confirmed: { label: "Confirmed", icon: "check", color: "#8b5cf6", bg: "#f5f3ff", step: 1 },
  packing: { label: "Packing", icon: "box", color: "#f59e0b", bg: "#fffbeb", step: 2 },
  out_for_delivery: { label: "On the Way", icon: "bike", color: "#f97316", bg: "#fff7ed", step: 3 },
  delivered: { label: "Delivered", icon: "sparkle", color: "#10b981", bg: "#ecfdf5", step: 4 },
  cancelled: { label: "Cancelled", icon: "xMark", color: "#ef4444", bg: "#fef2f2", step: -1 },
};
const FLOW = ["new", "confirmed", "packing", "out_for_delivery", "delivered"];

// Sound Alert
const playAlert = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [523, 659, 784, 1047].forEach((freq, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.frequency.value = freq; o.type = "sine";
      g.gain.setValueAtTime(0, ctx.currentTime + i * 0.15);
      g.gain.linearRampToValueAtTime(0.4, ctx.currentTime + i * 0.15 + 0.05);
      g.gain.linearRampToValueAtTime(0, ctx.currentTime + i * 0.15 + 0.2);
      o.start(ctx.currentTime + i * 0.15);
      o.stop(ctx.currentTime + i * 0.15 + 0.25);
    });
  } catch (e) { }
};

// ═══════════════════════════════════════════════════════════
// SPLASH SCREEN
// ═══════════════════════════════════════════════════════════
function SplashScreen({ onDone }) {
  const [fadeOut, setFadeOut] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 2100);
    const t2 = setTimeout(() => onDone(), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "linear-gradient(135deg, #092c3c 0%, #0d4f6b 50%, #06b6d4 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      animation: fadeOut ? "splashFadeOut 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards" : "none",
    }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px,transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />
      <div style={{ textAlign: "center", position: "relative", zIndex: 1, animation: "splashPop 0.7s cubic-bezier(0.34,1.56,0.64,1)" }}>
        {/* Glow & Ring Wrapper */}
        <div style={{
          position: "relative", width: 130, height: 130, margin: "0 auto 28px",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{
            position: "absolute", inset: -10, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)",
            animation: "pulse 2s ease-in-out infinite"
          }} />
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            border: "2px dashed rgba(255,255,255,0.25)",
            animation: "spin 12s linear infinite"
          }} />
          <BrandLogo size={72} style={{ zIndex: 2, filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.25))" }} />
        </div>

        <h1 style={{
          fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "clamp(36px,7vw,56px)",
          color: "white", letterSpacing: "-0.03em", marginBottom: 14,
          textShadow: "0 4px 20px rgba(0,0,0,0.35)", lineHeight: 1.1
        }}>
          Sarita Pharmacy
        </h1>
        <div style={{
          color: "#22d3ee", fontSize: 14, fontWeight: 700,
          letterSpacing: "0.2em", textTransform: "uppercase",
          textShadow: "0 2px 10px rgba(6,182,212,0.4)"
        }}>
          Fast Delivery · Genuine Medicines
        </div>

        {/* Premium Linear Progress Loader */}
        <div style={{
          marginTop: 48, width: 200, height: 4,
          background: "rgba(255,255,255,0.12)", borderRadius: 10,
          margin: "48px auto 0", overflow: "hidden", position: "relative"
        }}>
          <div style={{
            position: "absolute", left: 0, top: 0, height: "100%",
            background: "linear-gradient(90deg, #22d3ee, #38bdf8)", borderRadius: 10,
            animation: "shimmer 1.4s ease-in-out infinite", width: "60%"
          }} />
        </div>
      </div>

    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// FADE TRANSITION
// ═══════════════════════════════════════════════════════════
function FadeTransition({ children, pageKey }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 30); return () => clearTimeout(t); }, [pageKey]);
  return (
    <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.38s ease, transform 0.38s ease" }}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// BACK TO TOP
// ═══════════════════════════════════════════════════════════
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  if (!show) return null;
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed", bottom: 96, right: 16, zIndex: 997, width: 44, height: 44,
        background: "linear-gradient(135deg,#0d4f6b,#0891b2)", color: "white", border: "none",
        borderRadius: "50%", fontSize: 18, cursor: "pointer",
        boxShadow: "0 4px 16px rgba(13,79,107,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "fadeSlideIn 0.3s ease", transition: "all 0.2s"
      }}
    ><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg></button>
  );
}

// ═══════════════════════════════════════════════════════════
// PROGRESS TIMELINE (Admin Modal)
// ═══════════════════════════════════════════════════════════
function ProgressTimeline({ status }) {
  const ci = FLOW.indexOf(status);
  return (
    <div style={{ padding: "16px 20px", background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>Order Progress</div>
      <div style={{ position: "relative" }}>
        {/* Background line */}
        <div style={{ position: "absolute", top: 20, left: 20, right: 20, height: 3, background: "#e2e8f0", borderRadius: 4 }} />
        {/* Progress line */}
        <div style={{
          position: "absolute", top: 20, left: 20, height: 3, borderRadius: 4,
          background: "linear-gradient(90deg,#0d4f6b,#0891b2)",
          width: ci < 0 ? "0%" : `${(ci / (FLOW.length - 1)) * 100}%`,
          transition: "width 0.6s ease"
        }} />
        {/* Steps */}
        <div style={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
          {FLOW.map((s, i) => {
            const act = i <= ci, cur = i === ci;
            return (
              <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: act ? "linear-gradient(135deg,#0d4f6b,#0891b2)" : "white",
                  border: cur ? "3px solid #0891b2" : act ? "3px solid #0d4f6b" : "3px solid #e2e8f0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: act && !cur ? 16 : 13,
                  fontWeight: 800, color: act ? "white" : "#94a3b8",
                  boxShadow: cur ? "0 0 0 5px rgba(13,79,107,0.15),0 4px 12px rgba(13,79,107,0.3)" : act ? "0 4px 12px rgba(13,79,107,0.2)" : "none",
                  transition: "all 0.4s ease",
                  animation: cur ? "pulse 2s ease-in-out infinite" : "none",
                }}>
                  {act && !cur ? "✔" : STATUS[s].icon}
                </div>
                <div style={{
                  fontSize: 9, fontWeight: 700, color: cur ? "#0d4f6b" : act ? "#475569" : "#94a3b8",
                  textAlign: "center", lineHeight: 1.3, maxWidth: 52, transition: "color 0.3s"
                }}>
                  {STATUS[s].label.split(" ").map((w, i) => <div key={i}>{w}</div>)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ADMIN LOGIN GATE
// ═══════════════════════════════════════════════════════════
function AdminLogin({ onAuth }) {
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState(false);
  const [show, setShow] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const inputRef = useRef(null);

  // Clear password on mount to prevent autocomplete residue
  useEffect(() => {
    setPwd("");
    // Double-clear: browsers may fill async after mount
    const t = setTimeout(() => {
      setPwd("");
      if (inputRef.current) inputRef.current.value = "";
    }, 100);
    return () => clearTimeout(t);
  }, []);

  const submit = async () => {
    if (locked) return;
    const ok = await verifyAdmin(pwd);
    if (ok) {
      onAuth();
    } else {
      const next = attempts + 1;
      setAttempts(next);
      setErr(true);
      setPwd("");
      setTimeout(() => setErr(false), 2500);
      // Lock after 5 failed attempts for 30 seconds
      if (next >= 5) {
        setLocked(true);
        setTimeout(() => { setLocked(false); setAttempts(0); }, 30000);
      }
    }
  };

  return (
    <div style={{ paddingTop: 70, minHeight: "100vh", background: "linear-gradient(150deg,#f8fafc,#e0f2fe)", display: "flex", alignItems: "center", justifyContent: "center", padding: "70px 16px 40px" }}>
      <div style={{
        background: "white", borderRadius: 24, padding: "clamp(28px,5vw,44px) clamp(20px,5vw,36px)", maxWidth: 420, width: "100%",
        boxShadow: "0 16px 48px rgba(0,0,0,0.12)", textAlign: "center", animation: "fadeSlideIn 0.4s ease"
      }}>

        {/* Icon */}
        <div style={{
          width: 72, height: 72, background: "linear-gradient(135deg,#0d4f6b,#0891b2)", borderRadius: 20,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, margin: "0 auto 20px",
          boxShadow: "0 8px 24px rgba(13,79,107,0.3)"
        }}><Icon name="lock" size={34} color="white" /></div>

        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(20px,3vw,24px)", color: "#0d4f6b", fontWeight: 800, marginBottom: 6 }}>
          Admin Dashboard
        </h2>
        <p style={{ color: "#64748b", fontSize: 13, marginBottom: 28 }}>
          Authorized personnel only. Enter your password to continue.
        </p>

        {/* Lock warning */}
        {locked && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: "12px 16px", marginBottom: 16, color: "#dc2626", fontSize: 13, fontWeight: 600 }}>
            <Icon name="lock" size={13} color="#dc2626" /> Too many failed attempts. Please wait 30 seconds.
          </div>
        )}

        {/* Input */}
        <div style={{ position: "relative", marginBottom: 14 }}>
          <input
            ref={inputRef}
            aria-label="Admin password"
            type={show ? "text" : "password"}
            value={pwd}
            onChange={e => { setPwd(e.target.value); setErr(false); }}
            onKeyDown={e => e.key === "Enter" && submit()}
            placeholder="Enter password..."
            disabled={locked}
            autoComplete="new-password"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            name={"sp-admin-key-" + Date.now()}
            id={"sp-admin-key-" + Date.now()}
            style={{
              width: "100%", padding: "13px 48px 13px 16px",
              border: `2px solid ${err ? "#ef4444" : "#e2e8f0"}`,
              borderRadius: 12, fontSize: 16, outline: "none", fontFamily: "inherit",
              background: err ? "#fff5f5" : locked ? "#f8fafc" : "white",
              transition: "all 0.2s", color: "#1e293b",
              boxShadow: err ? "0 0 0 3px rgba(239,68,68,0.1)" : "none",
            }}
          />
          <button
            onClick={() => setShow(s => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            style={{
              position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#94a3b8", padding: 4
            }}>
            {show ? <Icon name="eye" size={18} color="#94a3b8" /> : <Icon name="eye" size={18} color="#94a3b8" />}
          </button>
        </div>

        {/* Error message — generic, no hints */}
        {err && (
          <div style={{
            color: "#ef4444", fontSize: 13, fontWeight: 600, marginBottom: 14,
            background: "#fef2f2", padding: "8px 12px", borderRadius: 8, border: "1px solid #fecaca"
          }}>
            <Icon name="warn" size={12} color="#ef4444" /> Incorrect password. Please try again.
          </div>
        )}

        {/* Submit */}
        <button
          aria-label="Login to admin dashboard"
          onClick={submit}
          disabled={locked}
          style={{
            width: "100%", padding: "13px",
            background: locked
              ? "#94a3b8"
              : "linear-gradient(135deg,#0d4f6b,#0891b2)",
            color: "white", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700,
            cursor: locked ? "not-allowed" : "pointer", fontFamily: "inherit",
            boxShadow: locked ? "none" : "0 4px 16px rgba(13,79,107,0.3)",
            transition: "all 0.2s"
          }}>
          {locked ? "Locked \u2014 Wait 30s" : "Access Dashboard"}
        </button>

        <div style={{ marginTop: 16, fontSize: 12, color: "#cbd5e1" }}>
          Sarita Pharmacy // Secure Admin Portal
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [splash, setSplash] = useState(true);
  const [page, setPage] = useState("home");
  const [orders, setOrders] = useState([]);
  const [dbReady, setDbReady] = useState(false);
  const [dbError, setDbError] = useState(false);
  const [errorDismissed, setErrorDismissed] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState(null);
  const [mob, setMob] = useState(false);
  const [bookingDoc, setBookingDoc] = useState(null);
  const [toast, setToast] = useState(null);
  const [tracking, setTracking] = useState(null);
  const [adminAuth, setAdminAuth] = useState(false);

  // Auto-logout: require password every time admin page is visited
  useEffect(() => {
    if (page !== "admin") setAdminAuth(false);
  }, [page]);
  const prevCountRef = useRef(0);
  const orderRef = useRef(null);

  const showToast = (msg, type = "info") => { setToast({ msg, type }); setTimeout(() => setToast(null), 4000); };

  const load = useCallback(async () => {
    try {
      const data = await fsGet();
      const newCount = data.filter(o => o.status === "new").length;
      if (prevCountRef.current > 0 && newCount > prevCountRef.current) {
        playAlert();
        showToast("New order received!", "success");
      }
      prevCountRef.current = newCount;
      setOrders(data);
      setDbReady(true);
      setDbError(false);
      setErrorDismissed(false);
    } catch (err) {
      console.error("[Firebase] Load error:", err.message);
      setDbReady(false);
      setDbError(true);
      showToast("Firebase connect nahi ho pa raha. Internet check karein.", "error");
    }
  }, []);

  useEffect(() => { if (!splash) { load(); const t = setInterval(load, 20000); return () => clearInterval(t); } }, [load, splash]);

  const scrollToOrder = () => { setPage("order"); window.history.pushState({ page: "order" }, "", "#order"); setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 0); };
  const navigateTo = (p) => { setPage(p); window.history.pushState({ page: p }, "", p === "home" ? "#" : `#${p}`); setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 0); };

  // ── Browser Back Button: History API integration ──
  const backExitRef = useRef(0);
  const backToastRef = useRef(null);
  useEffect(() => {
    // Push initial home state so there's always something in the history
    if (!window.history.state) {
      window.history.replaceState({ page: "home" }, "", window.location.href);
    }

    const onPopState = (e) => {
      const target = e.state?.page || "home";
      if (target === "home" && page === "home") {
        // Already on home — double tap to exit logic
        const now = Date.now();
        if (now - backExitRef.current < 2500) {
          // Second tap within 2.5 seconds — allow browser to exit naturally
          return;
        }
        backExitRef.current = now;
        // Push state back so the user doesn't exit
        window.history.pushState({ page: "home" }, "", "#");
        // Show exit toast
        clearTimeout(backToastRef.current);
        setToast({ msg: "Wapas jaane ke liye fir se Back dabayein", type: "info" });
        backToastRef.current = setTimeout(() => setToast(null), 2500);
      } else {
        // Navigate back to the target page
        setPage(target);
        setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 0);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [page]);

  const addOrder = async form => {
    const orderId = genId();
    const order = {
      ...form, orderId, status: "new", total: "0",
      deliveryCharge: String(CONFIG.deliveryCharge),
      createdAt: String(Date.now()),
    };
    try {
      await fsAdd(order);
      setSuccess(orderId);
      await load();
    } catch (err) {
      console.error("[Firebase] Add order error:", err.message);
      setOrders(p => [{ ...order, id: orderId }, ...p]);
      setSuccess(orderId);
      showToast("Order locally saved \u2014 Firebase sync pending.", "error");
    }
    // Build clean WhatsApp message with all form data
    const msg = [
      `*${CONFIG.name} \u2014 New Order*`,
      ``,
      `*Order ID:* ${orderId}`,
      `*Name:* ${form.name}`,
      `*WhatsApp Number:* ${form.phone}`,
      `*Delivery Address:* ${form.address}`,
      `*Pincode:* ${form.pincode}`,
      `*Payment Mode:* ${form.paymentMode}`,
      ``,
      `*Medicine List:*`,
      form.medicines,
      ``,
      `*Special Note:* ${form.note || "\u2014"}`,
      ...(form.reminderDate || form.reminderNote ? [
        ``,
        `*Medicine Reminder:*`,
        `Date: ${form.reminderDate ? new Date(form.reminderDate + "T00:00:00").toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "\u2014"}`,
        `Note: ${form.reminderNote || "\u2014"}`,
      ] : []),
      ``,
      `_Placed at ${new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })} on ${new Date().toLocaleDateString("en-IN")}_`,
    ].join("\n");
    window.open(`https://api.whatsapp.com/send?phone=${CONFIG.whatsapp}&text=${encodeURIComponent(msg)}`, "_blank");
  };

  const updateStatus = async (id, s) => {
    // Optimistic update first for instant UI feedback
    setOrders(p => p.map(o => o.id === id ? { ...o, status: s } : o));
    setSelected(p => p?.id === id ? { ...p, status: s } : p);
    try {
      await fsPatch(id, { status: s });
      showToast(`Status updated: ${STATUS[s]?.label}`, "success");
    } catch (err) {
      console.error("[Firebase] Status update error:", err.message);
      showToast("Status update failed. Please retry.", "error");
    }
  };

  const sendWA = (o, msg) => window.open(`https://wa.me/91${o.phone}?text=${encodeURIComponent(msg)}`, "_blank");

  const trackOrder = id => {
    const o = orders.find(x => (x.orderId || x.id) === id.trim().toUpperCase());
    setTracking(o || "notfound");
  };

  // Triple filter chain: date → status → search
  const dateFiltered = orders.filter(o => {
    if (dateFilter === "today") return isToday(o.createdAt);
    if (dateFilter === "week") return isLast7(o.createdAt);
    return true;
  });
  const statusFiltered = filter === "all" ? dateFiltered : dateFiltered.filter(o => o.status === filter);
  const filtered = search.trim() === "" ? statusFiltered : statusFiltered.filter(o => {
    const q = search.trim().toLowerCase();
    return (
      (o.name || "").toLowerCase().includes(q) ||
      (o.phone || "").toLowerCase().includes(q) ||
      (o.orderId || o.id || "").toLowerCase().includes(q) ||
      (o.medicines || "").toLowerCase().includes(q)
    );
  });
  const stats = {
    total: dateFiltered.length,
    new: dateFiltered.filter(o => o.status === "new").length,
    out: dateFiltered.filter(o => o.status === "out_for_delivery").length,
    done: dateFiltered.filter(o => o.status === "delivered").length,
  };

  if (splash) return (
    <>
      <Styles />
      <SplashScreen onDone={() => setSplash(false)} />
    </>
  );

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", minHeight: "100vh", background: "transparent", color: "#1e293b", position: "relative" }}>
      <PharmacyBackground />
      <Styles />

      {/* Toast Notification */}
      {toast && (
        <div role="alert" aria-live="assertive" style={{
          position: "fixed", top: 80, right: 16, zIndex: 999,
          background: toast.type === "success" ? "#10b981" : toast.type === "error" ? "#ef4444" : "#3b82f6",
          color: "white", padding: "12px 20px", borderRadius: 12, fontWeight: 700, fontSize: 14,
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)", animation: "slideIn 0.3s ease",
          maxWidth: 300, lineHeight: 1.4,
        }}>
          {toast.msg}
        </div>
      )}


      <BackToTop />
      <FloatingWhatsApp page={page} mob={mob} />
      <Nav page={page} setPage={navigateTo} scrollToOrder={scrollToOrder} mob={mob} setMob={setMob} />

      {/* ── GLOBAL FIREBASE ERROR BANNER ── */}
      {dbError && !errorDismissed && (
        <div role="alert" aria-live="assertive" style={{
          position: "fixed", top: 70, left: 0, right: 0, zIndex: 95,
          background: "linear-gradient(135deg,#fef2f2,#fff1f2)",
          borderBottom: "2px solid #fca5a5",
          padding: "clamp(10px,2vw,14px) clamp(16px,4vw,32px)",
          display: "flex", alignItems: "center", gap: "clamp(10px,2vw,16px)",
          flexWrap: "wrap", boxShadow: "0 4px 16px rgba(239,68,68,0.12)",
          animation: "fadeSlideIn 0.3s ease",
        }}>
          <span style={{ fontSize: "clamp(18px,3vw,24px)", display: "flex", alignItems: "center" }}><Icon name="warn" size={24} color="#dc2626" /></span>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontWeight: 700, color: "#dc2626", fontSize: "clamp(12px,2vw,14px)" }}>
              Firebase se connect nahi ho pa raha
            </div>
            <div style={{ color: "#ef4444", fontSize: "clamp(11px,1.8vw,13px)", marginTop: 2 }}>
              Internet check karein ya refresh karein. Orders abhi locally save ho rahe hain.
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button
              aria-label="Retry Firebase connection"
              onClick={() => { setErrorDismissed(false); load(); }}
              style={{
                padding: "clamp(7px,1.5vw,9px) clamp(12px,2vw,18px)",
                background: "#dc2626", color: "white", border: "none",
                borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer",
                fontFamily: "inherit", transition: "all 0.2s",
                boxShadow: "0 2px 8px rgba(220,38,38,0.3)",
              }}>
              <Icon name="zap" size={12} color="white" /> Retry
            </button>
            <button
              aria-label="Dismiss error banner"
              onClick={() => setErrorDismissed(true)}
              style={{
                padding: "clamp(7px,1.5vw,9px) clamp(10px,2vw,14px)",
                background: "white", color: "#dc2626",
                border: "1px solid #fca5a5", borderRadius: 8,
                fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
              }}>
              ✕
            </button>
          </div>
        </div>
      )}

      {page === "home" && (
        <FadeTransition pageKey="home">
          <HomePage scrollToOrder={scrollToOrder} trackOrder={trackOrder} tracking={tracking} setTracking={setTracking} setPage={navigateTo} onBookDoc={setBookingDoc} />
        </FadeTransition>
      )}
      {page === "order" && (
        <FadeTransition pageKey="order">
          <OrderPage orderRef={orderRef} onSubmit={addOrder} success={success} setSuccess={setSuccess} />
        </FadeTransition>
      )}
      {page === "doctors" && (
        <FadeTransition pageKey="doctors">
          <DoctorsPage onBookDoc={setBookingDoc} />
        </FadeTransition>
      )}

      {/* Appointment Booking Modal */}
      {bookingDoc && <AppointmentModal doc={bookingDoc} onClose={() => setBookingDoc(null)} />}
      {page === "admin" && (
        <FadeTransition pageKey="admin">
          {!adminAuth
            ? <AdminLogin onAuth={() => setAdminAuth(true)} />
            : <AdminPage stats={stats} filtered={filtered} filter={filter} setFilter={setFilter}
              dateFilter={dateFilter} setDateFilter={setDateFilter}
              search={search} setSearch={setSearch}
              orders={orders} selected={selected} setSelected={setSelected}
              updateStatus={updateStatus} sendWA={sendWA} dbReady={dbReady}
              onRefresh={load} playAlert={playAlert}
              onLogout={() => setAdminAuth(false)} />
          }
        </FadeTransition>
      )}

      <Footer setPage={navigateTo} scrollToOrder={scrollToOrder} />
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({ page, setPage, scrollToOrder, mob, setMob }) {
  const [sc, setSc] = useState(false);
  const navRef = useRef(null);
  useEffect(() => {
    const h = () => setSc(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  // Close mobile menu when clicking outside the nav
  useEffect(() => {
    if (!mob) return;
    const handleOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMob(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [mob, setMob]);
  return (
    <nav ref={navRef} style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: sc || page !== "home"
        ? "rgba(13, 79, 107, 0.92)"
        : "rgba(10, 61, 82, 0.4)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.12)",
      transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
      padding: "0 clamp(16px,4vw,32px)",
      boxShadow: sc ? "0 10px 30px rgba(0,0,0,0.15)" : "none",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        {/* LOGO */}
        <button aria-label="Go to home page"
          style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", background: "none", border: "none", fontFamily: "inherit", flexShrink: 0 }}
          onClick={() => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <div style={{
            width: 44, height: 44,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1) rotate(5deg)" }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) rotate(0deg)" }}><BrandLogo size={42} /></div>
          <div style={{ textAlign: "left" }}>
            <div style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 800,
              fontSize: "clamp(17px,2.5vw,21px)",
              color: "white", lineHeight: 1.1,
              textShadow: "0 2px 10px rgba(0,0,0,0.25)",
              letterSpacing: "-0.02em",
            }}>Sarita Pharmacy</div>
            <div style={{ fontSize: 9, color: "#22d3ee", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", marginTop: 2 }}>
              Prayagraj · Home Delivery
            </div>
          </div>
        </button>

        {/* DESKTOP NAV */}
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {[["home", "Home"], ["order", "Order Now"], ["doctors", "Doctors"]].map(([p, l]) => (
            <button key={p} aria-label={`Go to ${l}`}
              onClick={() => p === "order" ? scrollToOrder() : setPage(p)}
              className={page === p ? "nav-btn nav-active" : "nav-btn"}
            >{l}</button>
          ))}
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.2)", margin: "0 8px" }} />
          <a href={`tel:${CONFIG.phone}`} aria-label={`Call ${CONFIG.phone}`}
            style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10,
              background: "rgba(255,255,255,0.1)", color: "white", fontWeight: 600, fontSize: 13,
              textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)", transition: "all 0.25s",
              backdropFilter: "blur(8px)"
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.18)" }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)" }}>
            <Icon name="phone" size={14} /> {CONFIG.phone}
          </a>
          <button aria-label="Place an order" onClick={scrollToOrder} className="cta-pill">
            <Icon name="cart" size={14} /> Order Karo
          </button>
        </div>

        {/* HAMBURGER */}
        <button className="hamburger" aria-label="Toggle mobile menu"
          onClick={() => setMob(!mob)}
          style={{
            color: "white", fontSize: 26, background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12,
            width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "all 0.25s"
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.18)" }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)" }}>
          {mob ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mob && (
        <div style={{
          background: "rgba(13, 79, 107, 0.97)",
          backdropFilter: "blur(24px)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          padding: "10px 16px 14px",
          display: "flex", flexDirection: "column", gap: 4,
          animation: "fadeSlideIn 0.25s cubic-bezier(0.25, 1, 0.5, 1)",
          borderRadius: "0 0 16px 16px"
        }}>
          {[["home", "home", "Home"], ["order", "cart", "Order Karo"], ["doctors", "userMd", "Doctors"]].map(([p, icon, l]) => (
            <button key={p} aria-label={l}
              onClick={() => { if (p === "order") { scrollToOrder(); } else { setPage(p); } setMob(false); }}
              style={{
                padding: "8px 14px",
                background: page === p ? "rgba(255,255,255,0.15)" : "transparent",
                color: "white", border: "none",
                borderRadius: 10, fontWeight: page === p ? 700 : 500,
                fontSize: 13, textAlign: "left", cursor: "pointer", fontFamily: "inherit",
                transition: "all 0.2s", display: "flex", alignItems: "center", gap: 10,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)" }}
              onMouseLeave={e => { e.currentTarget.style.background = page === p ? "rgba(255,255,255,0.15)" : "transparent" }}>
              <span style={{ width: 20, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name={icon} size={15} color="white" /></span>{l}
            </button>
          ))}
          {/* Divider */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "4px 0" }} />
          {/* Dashboard — admin only */}
          <button aria-label="Dashboard"
            onClick={() => { setPage("admin"); setMob(false); }}
            style={{
              padding: "8px 14px",
              background: page === "admin" ? "rgba(255,255,255,0.15)" : "transparent",
              color: "rgba(255,255,255,0.6)", border: "none",
              borderRadius: 10, fontWeight: 500,
              fontSize: 12, textAlign: "left", cursor: "pointer", fontFamily: "inherit",
              transition: "all 0.2s", display: "flex", alignItems: "center", gap: 10,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)" }}
            onMouseLeave={e => { e.currentTarget.style.background = page === "admin" ? "rgba(255,255,255,0.15)" : "transparent" }}>
            <span style={{ width: 20, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="gear" size={13} color="rgba(255,255,255,0.6)" /></span>Admin Dashboard
          </button>
          {/* Quick actions */}
          <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
            <a href={`tel:${CONFIG.phone}`} aria-label={`Call ${CONFIG.phone}`}
              style={{
                flex: 1, padding: "9px 12px", background: "rgba(255,255,255,0.08)", color: "white",
                border: "none", borderRadius: 10, fontWeight: 600,
                fontSize: 12, textAlign: "center", textDecoration: "none", transition: "all 0.2s"
              }}>
              <Icon name="phone" size={12} /> Call
            </a>
            <button onClick={() => { scrollToOrder(); setMob(false); }}
              style={{
                flex: 1, padding: "9px 12px", background: "rgba(255,255,255,0.95)", color: "#0d4f6b", border: "none",
                borderRadius: 10, fontWeight: 800, fontSize: 12, textAlign: "center", cursor: "pointer", fontFamily: "inherit",
                transition: "all 0.2s"
              }}>
              <Icon name="cart" size={14} /> Order Karo
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── ANIMATED PHARMACY BACKGROUND ────────────────────────────────────────────
function PharmacyBackground() {
  const items = [
    { icon: "pill", size: 32, top: "5%", left: "3%", dur: "18s", delay: "0s", opacity: 0.15 },
    { icon: "syringe", size: 26, top: "12%", left: "92%", dur: "22s", delay: "2s", opacity: 0.12 },
    { icon: "dna", size: 38, top: "25%", left: "8%", dur: "25s", delay: "4s", opacity: 0.14 },
    { icon: "pill", size: 24, top: "35%", left: "88%", dur: "20s", delay: "1s", opacity: 0.10 },
    { icon: "stethoscope", size: 30, top: "45%", left: "5%", dur: "24s", delay: "3s", opacity: 0.12 },
    { icon: "heart", size: 22, top: "55%", left: "95%", dur: "19s", delay: "5s", opacity: 0.13 },
    { icon: "flask", size: 28, top: "65%", left: "4%", dur: "21s", delay: "2s", opacity: 0.12 },
    { icon: "pill", size: 34, top: "75%", left: "90%", dur: "23s", delay: "0s", opacity: 0.16 },
    { icon: "crossMed", size: 26, top: "85%", left: "7%", dur: "26s", delay: "4s", opacity: 0.10 },
    { icon: "dna", size: 24, top: "15%", left: "50%", dur: "28s", delay: "6s", opacity: 0.08 },
    { icon: "syringe", size: 22, top: "40%", left: "45%", dur: "30s", delay: "8s", opacity: 0.07 },
    { icon: "pill", size: 28, top: "70%", left: "55%", dur: "20s", delay: "1s", opacity: 0.10 },
    { icon: "bandage", size: 24, top: "20%", left: "70%", dur: "22s", delay: "3s", opacity: 0.10 },
    { icon: "heart", size: 20, top: "60%", left: "30%", dur: "24s", delay: "7s", opacity: 0.08 },
    { icon: "crossMed", size: 30, top: "90%", left: "60%", dur: "27s", delay: "5s", opacity: 0.12 },
  ];
  return (
    <div className="pharmacy-bg" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* Animated gradient mesh */}
      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />
      <div className="gradient-orb gradient-orb-3" />
      {/* Floating pharmacy icons */}
      {items.map((item, i) => (
        <span
          key={i}
          className="pharma-float"
          style={{
            position: "absolute",
            top: item.top,
            left: item.left,
            fontSize: item.size,
            opacity: item.opacity,
            animationDuration: item.dur,
            animationDelay: item.delay,
            filter: "blur(0.5px)",
          }}
        >{<Icon name={item.icon} size={item.size} color="rgba(13,79,107,0.5)" />}</span>
      ))}
      {/* Subtle grid pattern */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(13,79,107,0.04) 1.5px, transparent 1.5px)",
        backgroundSize: "36px 36px",
      }} />
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ scrollToOrder, trackOrder, tracking, setTracking, setPage, onBookDoc }) {
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <HeroSection scrollToOrder={scrollToOrder} />
      <QuickTrackBar trackOrder={trackOrder} tracking={tracking} setTracking={setTracking} />
      <StatsSection />
      <OffersSection />
      <ServicesSection />
      <DoctorsPreview setPage={setPage} onBookDoc={onBookDoc} />
      <HowItWorksSection scrollToOrder={scrollToOrder} />
      <MapSection />
      <ReviewsSection />
      <CtaSection scrollToOrder={scrollToOrder} />
    </div>
  );
}

function HeroSection({ scrollToOrder }) {
  return (
    <section style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at 80% 20%, rgba(34,211,238,0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(13,79,107,0.3) 0%, transparent 60%), linear-gradient(135deg, #071e29 0%, #0d4f6b 50%, #0891b2 100%)",
      display: "flex", alignItems: "center", padding: "clamp(100px,12vw,130px) clamp(16px,4vw,40px) clamp(60px,8vw,80px)", position: "relative", overflow: "hidden"
    }}>
      {/* Decorative Orbs */}
      <div style={{ position: "absolute", top: -120, right: -80, width: 550, height: 550, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -100, left: -60, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "36px 36px", pointerEvents: "none" }} />

      <div className="hero-grid" style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "clamp(32px,5vw,64px)", alignItems: "center", position: "relative", zIndex: 1 }}>
        <div>
          <div className="hero-badge" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.07)", backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.15)", borderRadius: 30,
            padding: "8px 20px", marginBottom: "clamp(16px,3vw,24px)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22d3ee", display: "inline-block", animation: "blink 1.5s infinite", boxShadow: "0 0 10px #22d3ee" }} />
            <span style={{ color: "rgba(255,255,255,0.95)", fontSize: "clamp(11px,2vw,13px)", fontWeight: 700, letterSpacing: "0.02em" }}>Prayagraj mein Fast Delivery available!</span>
          </div>
          <h1 className="hero-h1" style={{
            fontFamily: "'Outfit', sans-serif", fontSize: "clamp(38px,6vw,64px)", fontWeight: 900,
            color: "white", lineHeight: 1.06, marginBottom: "clamp(16px,3vw,24px)", letterSpacing: "-0.03em",
            textShadow: "0 10px 30px rgba(0,0,0,0.2)"
          }}>
            Medicines<br /><span style={{
              background: "linear-gradient(90deg, #22d3ee, #38bdf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(34,211,238,0.2))"
            }}>Ghar Pe</span><br />Milenge Ab!
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "clamp(14px,2.2vw,17px)", lineHeight: 1.8, marginBottom: "clamp(24px,4vw,36px)", maxWidth: 480 }}>
            Prayagraj ki sabse trusted pharmacy. Medicine ka naam batayein —
            hum <strong style={{ color: "#22d3ee", background: "rgba(34,211,238,0.1)", padding: "4px 10px", borderRadius: 8, border: "1px solid rgba(34,211,238,0.15)" }}>{CONFIG.deliveryTime}</strong> mein aapke darwaze tak pahuncha denge.
          </p>
          <div className="hero-ctas" style={{ display: "flex", gap: "clamp(10px,2vw,14px)", flexWrap: "wrap", marginBottom: "clamp(28px,4vw,40px)" }}>
            <button aria-label="Place order now" onClick={scrollToOrder} className="btn-hero-primary" style={{ boxShadow: "0 10px 25px rgba(13,79,107,0.4)" }}><Icon name="cart" size={16} /> Abhi Order Karo</button>
            <a href={`https://wa.me/${CONFIG.whatsapp}?text=Namaste! Mujhe medicines order karni hain.`}
              target="_blank" rel="noreferrer" aria-label="Contact on WhatsApp" className="btn-hero-wa"><WhatsAppIcon size={18} color="white" /> WhatsApp Karo</a>
          </div>
          <div className="hero-features" style={{ display: "flex", flexWrap: "wrap", gap: "16px 0" }}>
            {[["rocket", "Fast", "45–60 min"], ["pill", "Genuine", "100% Auth."], ["lock", "Secure", "UPI & Cash"], ["phone", "Support", "8am–10pm"]].map(([i, t, s], idx) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, padding: "clamp(6px,1.2vw,10px) clamp(12px,2vw,20px)", borderRight: idx < 3 ? "1px solid rgba(255,255,255,0.15)" : "none" }}>
                <span style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" }}><Icon name={i} size={typeof window !== 'undefined' && window.innerWidth < 600 ? 18 : 22} color="#22d3ee" /></span>
                <div>
                  <div style={{ color: "white", fontWeight: 700, fontSize: "clamp(11px,1.8vw,13px)" }}>{t}</div>
                  <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "clamp(10px,1.5vw,11px)", fontWeight: 500 }}>{s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Cards Graphic */}
        <div className="hero-cards" style={{ position: "relative", height: 440, display: "flex", justifyContent: "center", alignItems: "center" }}>
          {[
            { top: -10, left: -30, delay: "0s", icon: "pill", t: "10,000+ Orders", s: "Delivered successfully" },
            { top: -10, right: -30, delay: "0.8s", icon: "star", t: "4.9 Rating", s: "5,000+ customers" },
            { bottom: 20, right: -30, delay: "1.6s", icon: "bike", t: "Free Delivery", s: "On orders ₹500+" },
            { bottom: 20, left: -30, delay: "2.4s", icon: "headphones", t: "Support", s: "8am–10pm" }
          ].map((c, i) => (
            <div key={i} className="float-card" style={{ position: "absolute", top: c.top, left: c.left, right: c.right, bottom: c.bottom, animationDelay: c.delay }}>
              <div style={{ marginBottom: 6, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" }}><Icon name={c.icon} size={26} color="var(--primary-color)" /></div>
              <div style={{ fontWeight: 800, fontSize: 14, color: "var(--primary-color)", marginBottom: 3 }}>{c.t}</div>
              <div style={{ fontSize: 11, color: "var(--text-light)", fontWeight: 500 }}>{c.s}</div>
            </div>
          ))}
          <div style={{
            width: 170, height: 170,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            position: "relative"
          }}>
            <div style={{
              position: "absolute", inset: -8, borderRadius: 52,
              border: "1px dashed rgba(255,255,255,0.15)",
              animation: "spin 20s linear infinite"
            }} />
            <div style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.2))", animation: "pulse 2s infinite" }}><BrandLogo size={100} /></div>
            <div style={{ color: "white", fontWeight: 800, fontSize: 12, marginTop: 8, textAlign: "center", lineHeight: 1.3, fontFamily: "'Outfit', sans-serif", letterSpacing: "0.02em", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>Sarita<br />Pharmacy</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickTrackBar({ trackOrder, tracking, setTracking }) {
  const [id, setId] = useState("");
  return (
    <section style={{ background: "#09222d", padding: "clamp(20px,3vw,28px) clamp(16px,4vw,40px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }} aria-label="Order tracking">
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div className="track-flex" style={{ display: "flex", alignItems: "center", gap: "clamp(12px,2vw,16px)", flexWrap: "wrap" }}>
          <div style={{ flex: 1, display: "flex", gap: 10, minWidth: 260 }}>
            <input value={id} onChange={e => setId(e.target.value.toUpperCase())}
              aria-label="Enter order ID to track"
              placeholder="Order ID dalein (jaise: SP-A1B2C3)"
              style={{
                flex: 1, padding: "clamp(11px,2vw,14px) clamp(14px,2vw,18px)", borderRadius: 12,
                border: "2px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.07)", color: "white", fontSize: 16,
                fontFamily: "inherit", outline: "none", backdropFilter: "blur(8px)",
                minWidth: 0, transition: "all 0.25s"
              }}
              onFocus={e => { e.currentTarget.style.borderColor = "#22d3ee"; e.currentTarget.style.boxShadow = "0 0 0 4px rgba(34,211,238,0.15)" }}
              onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.boxShadow = "none" }} />
            <button aria-label="Track your order" onClick={() => trackOrder(id)}
              style={{
                padding: "clamp(11px,2vw,14px) clamp(16px,2vw,24px)", background: "white",
                color: "var(--primary-color)", border: "none", borderRadius: 12, fontWeight: 800,
                fontSize: "clamp(13.5px,2vw,14.5px)", cursor: "pointer", fontFamily: "inherit",
                whiteSpace: "nowrap", flexShrink: 0, transition: "all 0.25s"
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#e2f8ff"; e.currentTarget.style.transform = "translateY(-1px)" }}
              onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.transform = "none" }}>
              <Icon name="search" size={14} color="var(--primary-color)" /> Track Order
            </button>
          </div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "clamp(12px,1.8vw,13px)", fontWeight: 600, letterSpacing: "0.01em" }}>
            <Icon name="box" size={14} color="rgba(255,255,255,0.6)" /> Order ID aapke WhatsApp bill mein hoga
          </div>
        </div>
        {tracking && (
          <div style={{
            marginTop: 18, background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.15)", borderRadius: 20, padding: "clamp(16px,3vw,24px)",
            boxShadow: "0 15px 35px rgba(0,0,0,0.15)"
          }}>
            {tracking === "notfound" ? (
              <div style={{ color: "#fecaca", fontWeight: 700, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 14 }}>
                <Icon name="alertCircle" size={14} color="#fecaca" /> Order nahi mila. Kripya sahi Order ID check karein.
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
                  <div>
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600 }}>Order ID: </span>
                    <span style={{ color: "white", fontWeight: 800, fontFamily: "monospace", background: "rgba(255,255,255,0.1)", padding: "3px 8px", borderRadius: 6 }}>{tracking.orderId || tracking.id}</span>
                  </div>
                  <span style={{ background: STATUS[tracking.status]?.bg, color: STATUS[tracking.status]?.color, padding: "5px 14px", borderRadius: 30, fontSize: 12, fontWeight: 800, border: `1px solid ${STATUS[tracking.status]?.color}25` }}>
                    <Icon name={STATUS[tracking.status]?.icon} size={12} color={STATUS[tracking.status]?.color} /> {STATUS[tracking.status]?.label}
                  </span>
                  <button aria-label="Close tracking" onClick={() => setTracking(null)} style={{ background: "rgba(255,255,255,0.12)", border: "none", color: "white", width: 24, height: 24, borderRadius: "50%", cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                </div>
                <div className="track-progress" style={{ display: "flex", alignItems: "center", padding: "0 10px", marginBottom: 16 }}>
                  {FLOW.map((s, i) => {
                    const ci = FLOW.indexOf(tracking.status);
                    const act = i <= ci;
                    const cur = i === ci;
                    return (
                      <div key={s} style={{ display: "flex", alignItems: "center", flex: i < FLOW.length - 1 ? 1 : "none" }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: "50%",
                          background: act ? "#22d3ee" : "rgba(255,255,255,0.15)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 14, fontWeight: 800, color: act ? "#09222d" : "rgba(255,255,255,0.4)",
                          flexShrink: 0, boxShadow: cur ? "0 0 0 5px rgba(34,211,238,0.2)" : "none",
                          border: cur ? "3px solid #ffffff" : "none", transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
                        }}>
                          {act && !cur ? "✔" : i + 1}
                        </div>
                        {i < FLOW.length - 1 && <div style={{ flex: 1, height: 4, background: i < ci ? "#22d3ee" : "rgba(255,255,255,0.15)", borderRadius: 2 }} />}
                      </div>
                    );
                  })}
                </div>
                <div style={{ color: "rgba(255,255,255,0.85)", fontSize: "clamp(13px,1.8vw,14px)", fontWeight: 600, background: "rgba(255,255,255,0.05)", padding: "10px 14px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)" }}>
                  <Icon name="user" size={12} color="rgba(255,255,255,0.85)" /> {tracking.name} &nbsp;•&nbsp; <Icon name="mapPin" size={12} color="rgba(255,255,255,0.85)" /> {tracking.address}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section style={{ background: "linear-gradient(180deg, rgba(240,249,255,0.88) 0%, rgba(248,250,252,0.90) 50%, rgba(240,253,244,0.88) 100%)", borderBottom: "1px solid #e2e8f0", padding: "clamp(36px,6vw,48px) clamp(16px,4vw,40px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "clamp(16px,3vw,24px)" }}>
          {[["10,000+", "Orders Delivered", "box", "#0891b2"], ["5,000+", "Happy Customers", "smile", "#10b981"], [CONFIG.yearsActive + " Yrs", "Experience", "trophy", "#f59e0b"], ["45 Min", "Avg Delivery", "zap", "#8b5cf6"]].map(([v, l, i, c], idx) => (
            <Reveal key={l} delay={idx * 80}>
              <div style={{
                textAlign: "center", padding: "28px 20px", background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(12px)",
                borderRadius: 24, border: "1px solid #e2e8f0",
                boxShadow: "0 10px 25px -10px rgba(13,79,107,0.05)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer"
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 20px 35px -10px rgba(13,79,107,0.12)" }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 10px 25px -10px rgba(13,79,107,0.05)" }}>
                <div style={{ marginBottom: 10, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.05))" }}><Icon name={i} size={30} color={c} /></div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(24px,4vw,32px)", fontWeight: 900, color: c, lineHeight: 1.1 }}>{v}</div>
                <div style={{ fontSize: "clamp(12px,2vw,14px)", color: "#64748b", fontWeight: 600, marginTop: 6, letterSpacing: "0.01em" }}>{l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// AD CAROUSEL — Premium cover-flow for weekly product ads
// ═══════════════════════════════════════════════════════════
// HOW TO UPDATE: Replace files 01.jpg–06.jpg in /public/assets/ads/
// Images: portrait 4:5 ratio, ~1080×1350px recommended (JPG/PNG).
// No code edits needed — just swap the image files each week.
// ═══════════════════════════════════════════════════════════

// ── 1. Image data config ──
const AD_SLIDES = [
  { id: 1, src: "/assets/ads/01.jpg", alt: "Pharmacy Offer 1" },
  { id: 2, src: "/assets/ads/02.jpg", alt: "Pharmacy Offer 2" },
  { id: 3, src: "/assets/ads/03.jpg", alt: "Pharmacy Offer 3" },
  { id: 4, src: "/assets/ads/04.jpg", alt: "Pharmacy Offer 4" },
  { id: 5, src: "/assets/ads/05.jpg", alt: "Pharmacy Offer 5" },
  { id: 6, src: "/assets/ads/06.jpg", alt: "Pharmacy Offer 6" },
];

function OffersSection() {
  const [current, setCurrent] = useState(0);
  const [imgErrors, setImgErrors] = useState({});
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const intervalRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const total = AD_SLIDES.length;

  // ── 2. Autoplay + infinite loop (modulo-based, seamless) ──
  const startAutoplay = useCallback(() => {
    clearInterval(intervalRef.current);
    if (total < 2) return;
    intervalRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % total);
    }, 2500);
  }, [total]);

  useEffect(() => {
    if (!hovered) startAutoplay();
    return () => clearInterval(intervalRef.current);
  }, [startAutoplay, hovered]);

  // ── 3. Navigation ──
  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total]);

  // ── 4. Hover-to-pause (desktop only, whole section) ──
  const onEnter = () => { setHovered(true); clearInterval(intervalRef.current); };
  const onLeave = () => { setHovered(false); };

  // ── 5. Mobile swipe handling ──
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; clearInterval(intervalRef.current); };
  const onTouchMove = (e) => { touchEndX.current = e.touches[0].clientX; };
  const onTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); }
    startAutoplay();
  };

  // ── 6. Responsive card sizing + cover-flow positioning ──
  const wrap = (idx) => ((idx % total) + total) % total;
  const offsets = [-2, -1, 0, 1, 2];

  const getCardTransform = (offset) => {
    const dist = Math.abs(offset);
    // Container-relative left positions for overlapping cover-flow
    // Card width ~23% of container, so these positions create natural overlap
    const leftPositions = { "-2": 8, "-1": 27, "0": 50, "1": 73, "2": 92 };
    const leftPct = leftPositions[String(offset)] || 50;
    const scaleMap = { 0: 1.18, 1: 0.85, 2: 0.7 };
    const scale = scaleMap[dist] || 0.5;
    const opacityMap = { 0: 1, 1: 0.7, 2: 0.45 };
    const opacity = opacityMap[dist] || 0;
    const blurMap = { 0: 0, 1: 0, 2: 0 };
    const blur = blurMap[dist] || 0;
    const zMap = { 0: 5, 1: 3, 2: 1 };
    const z = zMap[dist] || 0;
    const shadowMap = {
      0: "0 25px 60px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.06)",
      1: "0 12px 30px rgba(0,0,0,0.15)",
      2: "0 6px 16px rgba(0,0,0,0.08)",
    };
    const shadow = shadowMap[dist] || "none";
    return { leftPct, scale, opacity, blur, z, shadow };
  };

  const renderCard = (offset) => {
    const idx = wrap(current + offset);
    const slide = AD_SLIDES[idx];
    const hasError = imgErrors[idx];
    const { leftPct, scale, opacity, blur, z, shadow } = getCardTransform(offset);

    return (
      <div
        key={`card-${slide.id}-${offset}`}
        style={{
          position: "absolute",
          left: `${leftPct}%`,
          top: "50%",
          width: "clamp(200px, 40vw, 280px)",
          aspectRatio: "4 / 5",
          transform: `translate(-50%, -50%) scale(${scale})`,
          opacity,
          filter: "none",
          zIndex: z,
          borderRadius: "clamp(14px, 2vw, 20px)",
          overflow: "hidden",
          boxShadow: shadow,
          transition: "all 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform, opacity, filter",
          userSelect: "none",
          WebkitUserSelect: "none",
          pointerEvents: offset === 0 ? "auto" : "none",
          cursor: "default",
        }}
      >
        {hasError ? (
          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            color: "#94a3b8",
          }}>
            <Icon name="image" size={32} color="#cbd5e1" />
            <span style={{ fontSize: 11, fontWeight: 600, marginTop: 8 }}>Ad Coming Soon</span>
          </div>
        ) : (
          <img
            src={slide.src} alt={slide.alt} draggable="false"
            loading={Math.abs(offset) <= 1 ? "eager" : "lazy"}
            onError={() => setImgErrors(p => ({ ...p, [idx]: true }))}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              display: "block", pointerEvents: "none",
            }}
          />
        )}
      </div>
    );
  };

  const allBroken = Object.keys(imgErrors).length >= total;
  if (allBroken) {
    return (
      <section style={{ padding: "clamp(60px,8vw,100px) 0", background: "rgba(255,255,255,0.88)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px,4vw,40px)" }}>
          <Reveal><SH badge="Special Offer" title="Hamare Khaas Offers!" sub="Best products. Best prices. Har hafte naye offers aapke liye!" /></Reveal>
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#94a3b8", fontSize: 14, fontWeight: 600 }}>
            <Icon name="image" size={40} color="#cbd5e1" />
            <p style={{ marginTop: 12 }}>Offers jald aa rahe hain!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      style={{
        padding: "clamp(50px,7vw,90px) 0 clamp(40px,5vw,60px)",
        background: "rgba(255,255,255,0.88)",
        overflow: "hidden",
        position: "relative",
        isolation: "isolate",
      }}
      onMouseEnter={onEnter} onMouseLeave={onLeave}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px,4vw,40px)" }}>
        <Reveal><SH badge="Special Offer" title="Hamare Khaas Offers!" sub="Best products. Best prices. Har hafte naye offers aapke liye!" /></Reveal>
      </div>

      {/* Cover-flow track */}
      <Reveal>
        <div
          style={{ position: "relative", width: "100%", maxWidth: 1200, margin: "0 auto" }}
          onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
        >
          {/* Fixed-height container — prevents layout reflow on slide change */}
          <div style={{
            position: "relative",
            width: "100%",
            height: "clamp(340px, 62vw, 430px)",
            margin: "0 auto",
          }}>
            {offsets.map(o => renderCard(o))}
          </div>

          {/* Dot indicators */}
          <div style={{
            display: "flex", justifyContent: "center", gap: 8,
            marginTop: "clamp(18px, 2.5vw, 28px)",
            padding: "0 20px",
          }}>
            {AD_SLIDES.map((s, i) => (
              <button key={s.id} aria-label={`Go to slide ${i + 1}`}
                onClick={() => setCurrent(i)}
                style={{
                  width: current === i ? 24 : 8,
                  height: 8,
                  borderRadius: 20, border: "none", cursor: "pointer", padding: 0,
                  background: current === i ? "linear-gradient(90deg, #0d4f6b, #0891b2)" : "rgba(0,0,0,0.12)",
                  transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                  flexShrink: 0,
                }} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ServicesSection() {
  const items = [["rocket", "Fast Delivery", "45–60 min mein Prayagraj ke har mohalle mein delivery.", "#0891b2"], ["pill", "All Medicines", "Branded, generic, ayurvedic — sab kuch ek jagah.", "#8b5cf6"], ["clipboard", "Prescription Upload", "WhatsApp par prescription ka photo bhejo, hum baki sab sambhaal lenge.", "#10b981"], ["wallet", "Best Prices", "Bina kisi high extra cost ke bilkul market rate par authentic medicines.", "#f59e0b"], ["lock", "100% Genuine", "Hum medicines ko direct company ya authorized distributors se sourcing karte hain.", "#ef4444"], ["phone", "Expert Advice", "Hamare expert pharmacists se seedhi baat kijiye aur koi bhi doubt clear kijiye.", "#0d4f6b"]];
  return (
    <section style={{ padding: "clamp(60px,8vw,100px) clamp(16px,4vw,40px)", background: "linear-gradient(135deg, rgba(248,250,252,0.88) 0%, rgba(240,249,255,0.88) 50%, rgba(250,245,255,0.88) 100%)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal><SH badge="Services" title="Kyun Choose Karein Sarita Pharmacy?" sub="Aapki health aur convenience — dono hamare liye equally important hain" /></Reveal>
        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: "clamp(16px,2vw,24px)" }}>
          {items.map(([icon, title, desc, color], idx) => (
            <Reveal key={title} delay={idx * 60}>
              <div className="service-card" style={{ "--accent": color, height: "100%" }}>
                <div style={{ width: 54, height: 54, background: color + "12", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, border: `1px solid ${color}20`, boxShadow: `0 4px 10px ${color}08` }}><Icon name={icon} size={26} color={color} /></div>
                <h3 style={{ fontSize: "clamp(15px,2vw,17px)", fontWeight: 800, color: "#0f172a", marginBottom: 10, fontFamily: "'Outfit', sans-serif" }}>{title}</h3>
                <p style={{ fontSize: "clamp(13px,1.8vw,14px)", color: "#64748b", lineHeight: 1.7, fontWeight: 500 }}>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── DOCTORS PREVIEW (Home Page) ─────────────────────────────────────────────
function DoctorsPreview({ setPage, onBookDoc }) {
  return (
    <section style={{ padding: "clamp(60px,8vw,100px) clamp(16px,4vw,40px)", background: "rgba(255,255,255,0.88)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: "clamp(36px,5vw,52px)" }}>
            <div>
              <div style={{ display: "inline-block", background: "linear-gradient(135deg,#e0f2fe,#bfdbfe)", color: "#0369a1", padding: "6px 18px", borderRadius: 30, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Expert Doctors</div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(24px,4vw,38px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.02em" }}>Expert Doctors Available</h2>
              <p style={{ color: "#64748b", fontSize: "clamp(13px,2vw,15.5px)", marginTop: 10, fontWeight: 500 }}>Hamare multispeciality clinic mein 12 expert specialist doctors available hain.</p>
            </div>
            <button onClick={() => { setPage("doctors"); window.scrollTo({ top: 0 }); }} className="btn-primary-lg" style={{ whiteSpace: "nowrap" }}>
              View All 12 Doctors
            </button>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: "clamp(16px,2.5vw,24px)" }}>
          {DOCTORS.slice(0, 6).map((doc, idx) => (<Reveal key={doc.id} delay={idx * 70}><DoctorCard doc={doc} compact onBookDoc={onBookDoc} /></Reveal>))}
        </div>
        <Reveal delay={150}>
          <div style={{ textAlign: "center", marginTop: "clamp(32px,5vw,48px)" }}>
            <button onClick={() => { setPage("doctors"); window.scrollTo({ top: 0 }); }} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 40px", background: "white", color: "var(--primary-color)", border: "2px solid var(--primary-color)", borderRadius: 14, fontWeight: 800, fontSize: "clamp(14px,2vw,15px)", cursor: "pointer", fontFamily: "inherit", transition: "all 0.25s" }} onMouseEnter={e => { e.currentTarget.style.background = "#f0f9ff"; e.currentTarget.style.borderColor = "var(--accent-color)"; e.currentTarget.style.color = "var(--accent-color)" }} onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "var(--primary-color)"; e.currentTarget.style.color = "var(--primary-color)" }}>
              View All 12 Doctors
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DoctorCard({ doc, compact, onBookDoc }) {
  const iconName = DOC_ICON_MAP[doc.icon] || "stethoscope";
  return (
    <div style={{ background: "white", borderRadius: 24, overflow: "hidden", boxShadow: "0 10px 25px -10px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.02)", border: "1px solid #e2e8f0", transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)", display: "flex", flexDirection: "column", height: "100%" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 25px 45px rgba(13,79,107,0.12), 0 0 0 2px " + doc.color + "30"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 10px 25px -10px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.02)"; }}>
      <div style={{ height: 6, background: "linear-gradient(90deg," + doc.color + "," + doc.color + "99)", flexShrink: 0 }} />
      <div style={{ padding: compact ? "clamp(18px,3vw,24px)" : "clamp(24px,3vw,32px)", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 18 }}>
          <div style={{ width: compact ? 56 : 64, height: compact ? 56 : 64, background: doc.color + "12", border: "2px solid " + doc.color + "20", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 4px 10px ${doc.color}08` }}><Icon name={iconName} size={compact ? 26 : 30} color={doc.color} /></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: compact ? "clamp(15px,2vw,17px)" : "clamp(16px,2.5vw,19px)", fontWeight: 800, color: "#0f172a", lineHeight: 1.2, marginBottom: 6, letterSpacing: "-0.01em" }}>{doc.name}</h3>
            <span style={{ display: "inline-block", background: doc.color + "08", color: doc.color, padding: "3px 12px", borderRadius: 20, fontSize: "clamp(10px,1.5vw,11px)", fontWeight: 800, border: "1px solid " + doc.color + "20" }}>{doc.qual}</span>
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontWeight: 800, color: "#1e293b", fontSize: "clamp(13.5px,2vw,15px)", marginBottom: 3, fontFamily: "'Outfit', sans-serif" }}>{doc.spec}</div>
          <div style={{ color: "#64748b", fontSize: "clamp(12.5px,1.8vw,14px)", fontFamily: "'Noto Sans Devanagari', 'Outfit', sans-serif", fontWeight: 500, lineHeight: 1.6, letterSpacing: "0.01em", marginTop: 2 }}>{doc.specHindi}</div>
        </div>
        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 16, padding: "clamp(10px,1.5vw,12px) clamp(12px,2vw,16px)", marginBottom: 18, flex: 1 }}>
          <div style={{ fontSize: "clamp(10px,1.5vw,11px)", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Clinic Timings</div>
          <div style={{ fontSize: "clamp(12px,1.5vw,13px)", color: "#475569", fontWeight: 600, lineHeight: 1.5 }}>{doc.timing}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block", boxShadow: "0 0 8px rgba(16,185,129,0.5)", animation: "blink 2s ease-in-out infinite" }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: "#10b981", letterSpacing: "0.01em" }}>Available at Clinic</span>
          {doc.fee && <><span style={{ color: "#cbd5e1", fontSize: 12, fontWeight: 400 }}>•</span><span style={{ fontSize: 12, fontWeight: 700, color: "#0f172a", letterSpacing: "0.01em" }}>Fee: {doc.fee}</span></>}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <button onClick={() => onBookDoc && onBookDoc(doc)} aria-label={"Book " + doc.name}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "clamp(10px,1.5vw,12px) 8px", background: "linear-gradient(135deg," + doc.color + "," + doc.color + "cc)", color: "white", borderRadius: 12, fontWeight: 800, fontSize: "clamp(11.5px,1.5vw,12.5px)", border: "none", cursor: "pointer", fontFamily: "inherit", boxShadow: `0 4px 10px ${doc.color}20`, transition: "transform 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseLeave={e => e.currentTarget.style.transform = "none"}>
            <Icon name="clipboard" size={14} color="white" /> Book Appointment
          </button>
          <a href={"tel:" + CONFIG.phone} aria-label="Call clinic"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(10px,1.5vw,12px) 8px", background: "white", color: "var(--primary-color)", border: "2px solid #e2e8f0", borderRadius: 12, fontWeight: 800, fontSize: "clamp(11.5px,1.5vw,12.5px)", textDecoration: "none", transition: "all 0.25s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--primary-color)"; e.currentTarget.style.background = "#f0f9ff"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "white"; }}>
            Call Clinic
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── APPOINTMENT BOOKING MODAL ─────────────────────────────────────────────
function AppointmentModal({ doc, onClose }) {
  const iconName = DOC_ICON_MAP[doc.icon] || "stethoscope";
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "Morning", complaint: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const overlayRef = useRef(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const today = new Date().toISOString().split("T")[0];

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Patient ka naam likhna zaroori hai";
    if (!form.phone.trim()) errs.phone = "WhatsApp number daalna zaroori hai";
    else if (!/^\d{10}$/.test(form.phone.trim())) errs.phone = "Sahi 10-digit number daalein";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const msg = [
      `Namaste! Mujhe ${doc.name} ke saath appointment book karna hai.`,
      ``,
      `ðŸ‘¤ Naam: ${form.name.trim()}`,
      `ðŸ“± Phone: ${form.phone.trim()}`,
      `ðŸ“… Date: ${form.date || "Jaldi se jaldi"}`,
      `ðŸ• Time: ${form.time}`,
      `ðŸ“ Reason: ${form.complaint.trim() || "General consultation"}`,
    ].join("\n");
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
    setTimeout(() => { onClose(); }, 2200);
  };

  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); if (errors[k]) setErrors(p => { const n = { ...p }; delete n[k]; return n; }); };

  // Inline label component
  const Label = ({ icon, text, required }) => (
    <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: "#334155", marginBottom: 6, fontFamily: "'Outfit', sans-serif" }}>
      {icon} {text}
      {required && <span style={{ color: "#ef4444", fontSize: 12 }}>*</span>}
    </label>
  );

  const inputBase = { width: "100%", padding: "12px 16px", border: "2px solid #e2e8f0", borderRadius: 12, fontSize: 15, outline: "none", color: "#0f172a", background: "white", fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)" };
  const inputErr = { borderColor: "#ef4444", background: "#fff8f8", boxShadow: "0 0 0 4px rgba(239,68,68,0.08)" };

  return (
    <div ref={overlayRef} onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", animation: "apptOverlayIn 0.3s ease forwards", background: "rgba(7,30,41,0.6)", backdropFilter: "blur(6px)" }}>

      <div className="appt-modal-box" style={{
        background: "white", borderRadius: 24, width: "100%", maxWidth: 520,
        maxHeight: "92vh", overflowY: "auto", position: "relative",
        boxShadow: "0 32px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)",
        animation: "apptModalIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards",
      }}>

        {/* Close button */}
        <button onClick={onClose} aria-label="Close modal" style={{
          position: "absolute", top: 16, right: 16, zIndex: 10,
          width: 36, height: 36, borderRadius: "50%", border: "none",
          background: "rgba(0,0,0,0.06)", color: "#64748b", fontSize: 18,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "inherit", transition: "all 0.2s",
        }} onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; e.currentTarget.style.color = "#ef4444"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.06)"; e.currentTarget.style.color = "#64748b"; }}><Icon name="xMark" size={18} color="currentColor" /></button>

        {/* Header */}
        <div style={{ padding: "clamp(24px,4vw,32px) clamp(24px,4vw,32px) 0", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 52, height: 52, background: doc.color + "12", border: "2px solid " + doc.color + "20", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name={iconName} size={24} color={doc.color} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(16px,3vw,19px)", fontWeight: 800, color: "#0f172a", lineHeight: 1.2, marginBottom: 4 }}>{doc.name}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: doc.color }}>{doc.spec}</div>
            </div>
          </div>
          <div style={{ marginTop: 16, padding: "10px 14px", background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)", borderRadius: 12, fontSize: 13, color: "#0369a1", fontWeight: 600, lineHeight: 1.5, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="clipboard" size={16} color="#0369a1" /> Niche apni details bharein aur WhatsApp par appointment request bhejein
          </div>
        </div>

        {/* Success State */}
        {submitted ? (
          <div style={{ padding: "40px 32px 48px", textAlign: "center", animation: "apptSuccessIn 0.4s ease" }}>
            <div style={{ marginBottom: 16, animation: "apptSuccessBounce 0.6s ease", display: "flex", justifyContent: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, #10b981, #059669)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(16,185,129,0.3)" }}>
                <Icon name="check" size={32} color="white" sw={2.5} />
              </div>
            </div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 800, color: "#10b981", marginBottom: 8 }}>Appointment request bhej diya gaya hai!</div>
            <div style={{ fontSize: 14, color: "#64748b", fontWeight: 500 }}>WhatsApp par confirmation ke liye check karein</div>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} style={{ padding: "0 clamp(24px,4vw,32px) clamp(24px,4vw,32px)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

              {/* Patient Name */}
              <div>
                <Label icon={<Icon name="user" size={15} color="#64748b" />} text="Patient ka Naam" required />
                <input type="text" placeholder="Patient ka poora naam likhein" value={form.name}
                  onChange={e => set("name", e.target.value)}
                  style={{ ...inputBase, ...(errors.name ? inputErr : {}) }} />
                {errors.name && <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#ef4444", fontSize: 12, fontWeight: 600, marginTop: 4, paddingLeft: 2 }}><Icon name="warn" size={13} color="#ef4444" /> {errors.name}</div>}
              </div>

              {/* WhatsApp Number */}
              <div>
                <Label icon={<Icon name="phone" size={15} color="#64748b" />} text="WhatsApp Number" required />
                <input type="tel" placeholder="10-digit mobile number" value={form.phone}
                  onChange={e => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  style={{ ...inputBase, ...(errors.phone ? inputErr : {}) }} />
                {errors.phone && <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#ef4444", fontSize: 12, fontWeight: 600, marginTop: 4, paddingLeft: 2 }}><Icon name="warn" size={13} color="#ef4444" /> {errors.phone}</div>}
              </div>

              {/* Date and Time — side by side on desktop */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="appt-date-time-row">
                <div>
                  <Label icon={<Icon name="clock" size={15} color="#64748b" />} text="Preferred Date" />
                  <input type="date" value={form.date} min={today}
                    onChange={e => set("date", e.target.value)}
                    style={{ ...inputBase, cursor: "pointer" }} />
                </div>
                <div>
                  <Label icon={<Icon name="timer" size={15} color="#64748b" />} text="Preferred Time" />
                  <select value={form.time} onChange={e => set("time", e.target.value)}
                    style={{ ...inputBase, cursor: "pointer", appearance: "auto" }}>
                    <option value="Morning">Morning (Subah)</option>
                    <option value="Afternoon">Afternoon (Dopahar)</option>
                    <option value="Evening">Evening (Shaam)</option>
                  </select>
                </div>
              </div>

              {/* Complaint */}
              <div>
                <Label icon={<Icon name="edit" size={15} color="#64748b" />} text="Complaint / Kya problem hai" />
                <textarea rows={2} placeholder="e.g. fever, checkup, consultation" value={form.complaint}
                  onChange={e => set("complaint", e.target.value)}
                  style={{ ...inputBase, resize: "vertical" }} />
              </div>
            </div>

            {/* Submit */}
            <button type="submit" style={{
              width: "100%", marginTop: 24, marginBottom: 8, padding: "15px 24px",
              background: "linear-gradient(135deg, #25d366, #128c45)",
              color: "white", border: "none", borderRadius: 14,
              fontWeight: 800, fontSize: 15, cursor: "pointer",
              fontFamily: "inherit", display: "flex", alignItems: "center",
              justifyContent: "center", gap: 10,
              boxShadow: "0 6px 20px rgba(37,211,102,0.3)",
              transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
            }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px) scale(1.01)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(37,211,102,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(37,211,102,0.3)"; }}>
              <WhatsAppIcon size={18} color="white" /> WhatsApp par Appointment Bhejein
            </button>
            <div style={{ textAlign: "center", fontSize: 12, color: "#94a3b8", fontWeight: 500, paddingBottom: 8 }}>
              WhatsApp par message open hoga — wahan se Send dabayein
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function DoctorsPage({ onBookDoc }) {
  const FILTERS = ["All", "Physician", "Surgeon", "Specialist", "Dental", "Eye", "Neuro", "Gynecologist", "ENT", "Ayurveda", "Orthopedic", "Child"];
  const [activeFilter, setActiveFilter] = useState("All");
  const [filterVisible, setFilterVisible] = useState(true);
  const lastScrollY = useRef(0);
  const filtered = activeFilter === "All" ? DOCTORS : DOCTORS.filter(d => d.tags.some(t => t.toLowerCase() === activeFilter.toLowerCase()));

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 200) {
        setFilterVisible(false); // scrolling down
      } else {
        setFilterVisible(true); // scrolling up
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div style={{ paddingTop: 70 }}>
      <section style={{
        background: "radial-gradient(circle at 80% 20%, rgba(34,211,238,0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(13,79,107,0.3) 0%, transparent 60%), linear-gradient(135deg, #071e29 0%, #0d4f6b 50%, #0891b2 100%)",
        padding: "clamp(60px,8vw,90px) clamp(16px,4vw,40px)", position: "relative", overflow: "hidden", textAlign: "center"
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 30, padding: "6px 18px", marginBottom: 20 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22d3ee", display: "inline-block", animation: "blink 1.5s infinite", boxShadow: "0 0 8px #22d3ee" }} />
            <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 13, fontWeight: 700 }}>12 Expert Doctors Available</span>
          </div>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 16, letterSpacing: "-0.02em" }}>
            Consult Expert Doctors Near You
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "clamp(14px,2vw,17px)", lineHeight: 1.7, marginBottom: 28, maxWidth: 540, margin: "0 auto 28px", fontWeight: 500 }}>
            Sarita Pharmacy and Multispeciality Clinic mein 12 expert specialist doctors available hain. Apne clinical slot ke liye abhi appointment book kijiye.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={"https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent("Namaste! Main ek doctor se appointment lena chahta/chahti hun.")} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "#25d366", color: "white", borderRadius: 14, fontWeight: 800, fontSize: 14, textDecoration: "none", boxShadow: "0 6px 20px rgba(37,211,102,0.3)", transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"} onMouseLeave={e => e.currentTarget.style.transform = "none"}>WhatsApp par Book Karo</a>
            <a href={"tel:" + CONFIG.phone} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(4px)", color: "white", borderRadius: 14, fontWeight: 800, fontSize: 14, textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)", transition: "all 0.25s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}>Call Clinic: {CONFIG.phone}</a>
          </div>
        </div>
      </section>

      <section style={{
        background: "white", borderBottom: "1px solid #e2e8f0",
        padding: "clamp(16px,3vw,24px) clamp(16px,4vw,40px)",
        position: "sticky", top: 70, zIndex: 40,
        boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
        transform: filterVisible ? "translateY(0)" : "translateY(-100%)",
        opacity: filterVisible ? 1 : 0,
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
        pointerEvents: filterVisible ? "auto" : "none"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginRight: 4 }}>Filters:</span>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} aria-label={"Filter by " + f}
                style={{
                  padding: "8px 18px", borderRadius: 30, border: "1px solid", fontSize: "clamp(11px,1.5vw,13px)", fontWeight: 700,
                  cursor: "pointer", fontFamily: "inherit", transition: "all 0.25s ease",
                  borderColor: activeFilter === f ? "var(--primary-color)" : "#e2e8f0",
                  background: activeFilter === f ? "var(--primary-color)" : "white",
                  color: activeFilter === f ? "white" : "#64748b",
                  boxShadow: activeFilter === f ? "0 4px 12px rgba(13,79,107,0.12)" : "none"
                }}
                onMouseEnter={e => { if (activeFilter !== f) { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = "#cbd5e1" } }}
                onMouseLeave={e => { if (activeFilter !== f) { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#e2e8f0" } }}>
                {f}
                {f !== "All" && <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.8, background: activeFilter === f ? "rgba(255,255,255,0.2)" : "#f1f5f9", color: activeFilter === f ? "white" : "#94a3b8", padding: "2px 6px", borderRadius: 20 }}>({DOCTORS.filter(d => d.tags.some(t => t.toLowerCase() === f.toLowerCase())).length})</span>}
              </button>
            ))}
            <span style={{ marginLeft: "auto", fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>{filtered.length} doctors shown</span>
          </div>
        </div>
      </section>

      <section style={{ padding: "clamp(36px,5vw,60px) clamp(16px,4vw,40px)", background: "#f8fafc", minHeight: "50vh" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {filtered.length === 0
            ? <div style={{ textAlign: "center", padding: "80px 24px", color: "#94a3b8" }}><div style={{ fontSize: 44, marginBottom: 12 }}>ðŸ”</div><div style={{ fontWeight: 700, fontSize: 16, color: "#64748b" }}>Koi doctor nahi mila</div><div style={{ fontSize: 13, marginTop: 4 }}>Kripya koi doosra filter select kijiye.</div></div>
            : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,320px),1fr))", gap: "clamp(16px,2.5vw,24px)" }}>
              {filtered.map((doc, idx) => (<Reveal key={doc.id} delay={idx * 50}><DoctorCard doc={doc} onBookDoc={onBookDoc} /></Reveal>))}
            </div>
          }
        </div>
      </section>

      <section style={{ padding: "clamp(48px,6vw,72px) clamp(16px,4vw,40px)", background: "linear-gradient(135deg,#0d4f6b,#0891b2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: "clamp(20px,3vw,32px)" }}>
            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(24px,4vw,34px)", fontWeight: 900, color: "white", marginBottom: 12, letterSpacing: "-0.01em" }}>Appointment Kaise Book Karein?</h2>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "clamp(13px,2vw,15px)", lineHeight: 1.7, fontWeight: 500 }}>Hamare clinic par appointment book karna behad aasaan hai. Aap niche diye gaye options ka use kar sakte hain:</p>
            </div>
            {[["WhatsApp Booking", "WhatsApp par slot aur timing confirm kijiye.", "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent("Namaste! Appointment book karna hai.")], ["Call Clinic Support", CONFIG.phone, "tel:" + CONFIG.phone], ["Direct Clinic Visit", CONFIG.address, null]].map(([title, desc, href]) => (
              <div key={title} style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 20, padding: "clamp(20px,3vw,26px)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontWeight: 800, color: "white", fontSize: "clamp(15px,2vw,17px)", marginBottom: 6, fontFamily: "'Outfit', sans-serif" }}>{title}</div>
                  <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(12px,1.5vw,13.5px)", marginBottom: href ? 18 : 0, lineHeight: 1.5, fontWeight: 500 }}>{desc}</div>
                </div>
                {href && <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 20px", background: "white", color: "var(--primary-color)", borderRadius: 10, fontWeight: 800, fontSize: 13, textDecoration: "none", width: "fit-content", boxShadow: "0 4px 10px rgba(0,0,0,0.15)", transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"} onMouseLeave={e => e.currentTarget.style.transform = "none"}>Contact Karo</a>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
function HowItWorksSection({ scrollToOrder }) {
  return (
    <section style={{ padding: "clamp(48px,8vw,96px) clamp(16px,4vw,40px)", background: "rgba(255,255,255,0.88)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal><SH badge="How It Works" title="Order Karna Hai Bahut Aasaan!" sub="Sirf 3 steps mein medicines aapke darwaze par" /></Reveal>
        <div className="how-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", gap: "clamp(28px,4vw,40px)" }}>
          {[{ n: "01", icon: "mobile", t: "Order Karo", d: "Website par form bharo ya WhatsApp message karo. Medicines ki list, address aur payment mode batao." }, { n: "02", icon: "check", t: "Confirmation", d: "Hum turant order confirm karenge aur packing shuru karenge. WhatsApp pe update milega." }, { n: "03", icon: "bike", t: "Doorstep Delivery", d: "45–60 min mein delivery boy aapke darwaze par. Track karo Order ID se!" }].map(({ n, icon, t, d }, idx) => (
            <Reveal key={n} delay={idx * 120} direction="up">
              <div style={{ textAlign: "center", position: "relative", padding: "clamp(24px,4vw,32px) clamp(16px,3vw,24px) clamp(20px,3vw,24px)", background: "rgba(248,250,252,0.85)", backdropFilter: "blur(12px)", borderRadius: 20, border: "1px solid #e2e8f0", height: "100%" }}>
                <div style={{ position: "absolute", top: -24, left: "50%", transform: "translateX(-50%)", width: 56, height: 56, background: "linear-gradient(135deg,#0d4f6b,#0891b2)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(13,79,107,0.3)" }}><Icon name={icon} size={26} color="white" /></div>
                <div style={{ position: "absolute", top: 8, right: 16, fontFamily: "'Playfair Display',serif", fontSize: "clamp(36px,6vw,52px)", color: "#e2e8f0", fontWeight: 800, lineHeight: 1, pointerEvents: "none" }}>{n}</div>
                <div style={{ marginTop: 28 }}>
                  <h3 style={{ fontSize: "clamp(16px,2.5vw,19px)", fontWeight: 700, color: "#0d4f6b", marginBottom: 10 }}>{t}</h3>
                  <p style={{ fontSize: "clamp(13px,1.8vw,14px)", color: "#64748b", lineHeight: 1.75 }}>{d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div style={{ textAlign: "center", marginTop: "clamp(32px,5vw,48px)" }}>
            <button aria-label="Order medicines now" onClick={scrollToOrder} className="btn-primary-lg"><Icon name="cart" size={16} /> Abhi Order Karo — {CONFIG.deliveryTime} Delivery</button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


function MapSection() {
  return (
    <section style={{ padding: "clamp(48px,8vw,96px) clamp(16px,4vw,40px)", background: "rgba(248,250,252,0.88)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal><SH badge="Find Us" title="Hamare Pharmacy Ka Location" sub="5/1/1 Madhokunj, Katra, Prayagraj — delivery bhi available hai" /></Reveal>
        <div className="map-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: "clamp(10px,2vw,14px)" }}>
          {[["mapPin", "Address", CONFIG.address], ["phone", "Phone", CONFIG.phone], ["clock", "Timing", CONFIG.openTime], ["bike", "Delivery Area", "Prayagraj ke sabhi areas mein"], ["creditCard", "Payment", "UPI, PhonePe, GPay, Cash"]].map(([icon, label, value]) => (
            <Reveal key={label} direction="up">
              <div style={{ display: "flex", gap: "clamp(10px,2vw,14px)", alignItems: "flex-start", padding: "clamp(14px,2vw,18px)", background: "rgba(255,255,255,0.82)", backdropFilter: "blur(12px)", borderRadius: 14, border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", height: "100%" }}>
                <div style={{ width: 42, height: 42, background: "linear-gradient(135deg,#e0f2fe,#bae6fd)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name={icon} size={20} color="#0369a1" /></div>
                <div>
                  <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>{label}</div>
                  <div style={{ fontWeight: 600, color: "#1e293b", fontSize: "clamp(13px,1.8vw,14px)", lineHeight: 1.4 }}>{value}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div style={{ textAlign: "center", marginTop: "clamp(24px,4vw,36px)" }}>
            <a href="https://maps.app.goo.gl/5NC95L8JifqYR7Y17" target="_blank" rel="noreferrer" aria-label="Open in Google Maps"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "clamp(14px,2vw,16px) clamp(28px,4vw,40px)", background: "linear-gradient(135deg,#0d4f6b,#0891b2)", color: "white", borderRadius: 14, fontWeight: 700, fontSize: "clamp(14px,2vw,16px)", textDecoration: "none", boxShadow: "0 8px 24px rgba(13,79,107,0.3)", transition: "transform 0.25s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={e => e.currentTarget.style.transform = "none"}>
              <Icon name="mapIcon" size={18} /> Google Maps mein Dekho
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const reviews = [{ name: "Ramesh Gupta", area: "Civil Lines", text: "Raat 9 baje order kiya aur 38 minute mein delivery! Dawa bilkul sahi aayi. Bahut badhiya service.", stars: 5 }, { name: "Shweta Singh", area: "Katra", text: "Papa ki BP ki dawa urgent chahiye thi. Sarita Pharmacy ne jaldi deliver ki. Price bhi market rate tha. Shukriya!", stars: 5 }, { name: "Arun Verma", area: "Tagore Town", text: "WhatsApp par prescription bheja aur bina kisi jhanjhat ke medicines ghar aa gayi. Bahut convenient hai!", stars: 5 }, { name: "Priya Sharma", area: "George Town", text: "Genuine medicines, fast delivery, friendly staff. Prayagraj ki sabse best pharmacy. Highly recommended!", stars: 5 }];
  return (
    <section style={{ padding: "clamp(48px,8vw,96px) clamp(16px,4vw,40px)", background: "linear-gradient(150deg,#0a3d52,#0d4f6b 40%,#0e7490)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal><SH badge="Customer Reviews" title="Customers Kya Kehte Hain?" sub="Prayagraj ke hazaron customers ka bharosa hamare saath hai" dark /></Reveal>
        <div className="reviews-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: "clamp(14px,2vw,22px)" }}>
          {reviews.map(({ name, area, text, stars }, idx) => (
            <Reveal key={name} delay={idx * 80} direction="up">
              <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: "clamp(18px,3vw,26px)", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ color: "#fbbf24", fontSize: "clamp(14px,2.5vw,18px)", marginBottom: 12, letterSpacing: "0.1em" }}>{"★".repeat(stars)}</div>
                <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "clamp(13px,1.8vw,14px)", lineHeight: 1.75, marginBottom: 16, fontStyle: "italic", flex: 1 }}>"{text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                  <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,rgba(255,255,255,0.2),rgba(255,255,255,0.1))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "white", fontSize: 15, flexShrink: 0 }}>{name[0]}</div>
                  <div>
                    <div style={{ color: "white", fontWeight: 700, fontSize: "clamp(12px,2vw,14px)" }}>{name}</div>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>{area}, Prayagraj</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection({ scrollToOrder }) {
  return (
    <section style={{ padding: "clamp(48px,8vw,80px) clamp(16px,4vw,40px)", background: "linear-gradient(180deg, rgba(255,255,255,0.90) 0%, rgba(240,249,255,0.88) 50%, rgba(224,242,254,0.88) 100%)", overflow: "hidden" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <div style={{ margin: "0 auto 20px", width: 72, height: 72, display: "flex", alignItems: "center", justifyContent: "center" }}><BrandLogo size={68} /></div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(24px,4vw,32px)", fontWeight: 800, color: "#0d4f6b", marginBottom: 12 }}>Aaj Hi Try Karo!</h2>
          <p style={{ color: "#64748b", fontSize: "clamp(14px,2vw,15px)", lineHeight: 1.8, marginBottom: "clamp(20px,4vw,32px)" }}>
            Pehla order karo aur khud dekho kaisi hai Sarita Pharmacy ki service. Prayagraj ke sabse trusted pharmacy mein aapka swagat hai!
          </p>
          <div className="cta-buttons" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button aria-label="Order now" onClick={scrollToOrder} className="btn-primary-lg"><Icon name="cart" size={16} /> Order Karo Abhi</button>
            <a href={`https://wa.me/${CONFIG.whatsapp}?text=Namaste! Medicines order karni hain.`} target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "clamp(12px,2vw,15px) clamp(22px,3vw,30px)", borderRadius: 12, background: "#25d366", color: "white", fontWeight: 700, fontSize: "clamp(14px,2vw,15px)", textDecoration: "none", boxShadow: "0 4px 16px rgba(37,211,102,0.35)" }}>
              <WhatsAppIcon size={18} color="white" /> WhatsApp Karo
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── MEDICINE AUTOCOMPLETE ────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════
// MIC BUTTON — Voice Input using Web Speech API
// ═══════════════════════════════════════════════════════════
function MicButton({ onResult, isTextarea }) {
  const [listening, setListening] = useState(false);
  const recRef = useRef(null);

  const toggle = () => {
    if (listening) {
      recRef.current?.stop();
      setListening(false);
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert("Aapka browser voice input support nahi karta. Chrome ya Edge use karein."); return; }
    const rec = new SR();
    rec.lang = "hi-IN";
    rec.interimResults = false;
    rec.continuous = false;
    rec.onresult = (e) => {
      const text = Array.from(e.results).map(r => r[0].transcript).join(" ");
      onResult(text);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recRef.current = rec;
    rec.start();
    setListening(true);
  };

  return (
    <button type="button" aria-label={listening ? "Stop voice input" : "Start voice input"} onClick={toggle}
      style={{
        position: "absolute", right: isTextarea ? 10 : 10, top: isTextarea ? 12 : "50%",
        transform: isTextarea ? "none" : "translateY(-50%)", zIndex: 2,
        width: 32, height: 32, borderRadius: "50%", border: "none", cursor: "pointer",
        background: listening ? "linear-gradient(135deg, #ef4444, #dc2626)" : "linear-gradient(135deg, #0d4f6b, #0891b2)",
        color: "white", display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: listening ? "0 0 0 4px rgba(239,68,68,0.25), 0 4px 12px rgba(239,68,68,0.3)" : "0 2px 8px rgba(13,79,107,0.25)",
        transition: "all 0.25s ease",
        animation: listening ? (isTextarea ? "micPulseTA 1s ease-in-out infinite" : "micPulse 1s ease-in-out infinite") : "none",
        flexShrink: 0, padding: 0,
      }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="1" width="6" height="11" rx="3" />
        <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    </button>
  );
}

function MedicineAutocomplete({ medicines, onMedicinesChange, error }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const updateQuery = (val) => {
    setQuery(val);
    setHighlightIdx(-1);
    if (val.trim().length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    const q = val.trim().toUpperCase();
    const matches = MEDICINE_LIST.filter(m => m.toUpperCase().includes(q)).slice(0, 12);
    setSuggestions(matches);
    setShowDropdown(matches.length > 0);
  };

  const addMedicine = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (!medicines.some(m => m.name.toLowerCase() === trimmed.toLowerCase())) {
      onMedicinesChange([...medicines, { name: trimmed, qty: 1 }]);
    }
    setQuery("");
    setSuggestions([]);
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  const removeMedicine = (idx) => {
    onMedicinesChange(medicines.filter((_, i) => i !== idx));
  };

  const updateQty = (idx, delta) => {
    onMedicinesChange(medicines.map((m, i) => i === idx ? { ...m, qty: Math.max(1, m.qty + delta) } : m));
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIdx(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIdx(prev => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIdx >= 0 && suggestions[highlightIdx]) {
        addMedicine(suggestions[highlightIdx]);
      } else if (query.trim()) {
        addMedicine(query);
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  return (
    <div>
      <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700, fontSize: 13, color: "#374151", marginBottom: 6 }}>
        <span><Icon name="pill" size={13} color="#374151" /></span> Medicines ki List *
      </label>
      <p style={{ fontSize: 11, color: "#94a3b8", marginBottom: 8, fontWeight: 500 }}>
        <Icon name="bulb" size={10} color="#94a3b8" /> Type 2+ letters to search from {MEDICINE_LIST.length.toLocaleString()} medicines. Press Enter or "+" to add.
      </p>

      {/* Input + Add Button */}
      <div ref={wrapperRef} style={{ position: "relative" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            ref={inputRef}
            type="text"
            aria-label="Search medicines"
            className={`inp ${error ? "inp-err" : ""}`}
            placeholder="Medicine ka naam likhein..."
            value={query}
            onChange={e => updateQuery(e.target.value)}
            onFocus={() => { if (suggestions.length > 0) setShowDropdown(true); }}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            style={{ flex: 1 }}
          />
          <button
            type="button"
            aria-label="Add medicine"
            onClick={() => addMedicine(query)}
            disabled={!query.trim()}
            style={{
              width: 44, height: 44, borderRadius: 12, border: "none",
              background: query.trim() ? "linear-gradient(135deg,var(--primary-color),var(--accent-color))" : "#e2e8f0",
              color: query.trim() ? "white" : "#94a3b8",
              fontSize: 22, fontWeight: 700, cursor: query.trim() ? "pointer" : "not-allowed",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s ease", flexShrink: 0,
              boxShadow: query.trim() ? "0 4px 12px rgba(13,79,107,0.2)" : "none"
            }}
          >+</button>
        </div>

        {/* Suggestions dropdown */}
        {showDropdown && (
          <div style={{
            position: "absolute", top: "100%", left: 0, right: 52, zIndex: 100,
            background: "white", border: "1px solid #e2e8f0", borderRadius: 12,
            boxShadow: "0 12px 36px rgba(0,0,0,0.12)", marginTop: 4,
            maxHeight: 220, overflowY: "auto",
          }}>
            {suggestions.map((s, idx) => (
              <button
                key={s + idx}
                type="button"
                onClick={() => addMedicine(s)}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "10px 14px", border: "none",
                  background: idx === highlightIdx ? "#f0f9ff" : "transparent",
                  cursor: "pointer", fontSize: 13, fontWeight: 600,
                  color: "#1e293b", fontFamily: "inherit",
                  borderBottom: idx < suggestions.length - 1 ? "1px solid #f1f5f9" : "none",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#f0f9ff"; setHighlightIdx(idx); }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              >
                <Icon name="pill" size={11} color="#94a3b8" /> {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <p style={{ fontSize: 12, color: "#ef4444", marginTop: 6, fontWeight: 600 }}><Icon name="warn" size={11} color="#ef4444" /> {error}</p>
      )}

      {/* Added medicines list */}
      {medicines.length > 0 && (
        <div style={{ marginTop: 10, border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ background: "#f8fafc", padding: "8px 14px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#64748b" }}><Icon name="clipboard" size={11} color="#64748b" /> {medicines.length} Medicine{medicines.length > 1 ? "s" : ""} added in Strips</span>
            <button type="button" onClick={() => onMedicinesChange([])} style={{ background: "none", border: "none", color: "#ef4444", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Clear All</button>
          </div>
          <div style={{ maxHeight: 200, overflowY: "auto" }}>
            {medicines.map((m, idx) => (
              <div key={m.name + idx} style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "7px 14px",
                borderBottom: idx < medicines.length - 1 ? "1px solid #f1f5f9" : "none",
                background: idx % 2 === 0 ? "white" : "#fafbfc",
              }}>
                <span style={{ width: 22, height: 22, borderRadius: 6, background: "#f0f9ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, fontWeight: 700, color: "var(--primary-color)" }}>{idx + 1}</span>
                <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: "#1e293b", minWidth: 0, wordBreak: "break-word", overflowWrap: "anywhere" }}>{m.name}</span>
                {/* Qty controls */}
                <div style={{ display: "flex", alignItems: "center", gap: 0, flexShrink: 0, border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden" }}>
                  <button type="button" aria-label="Decrease quantity" onClick={() => updateQty(idx, -1)}
                    style={{ width: 28, height: 28, border: "none", background: m.qty <= 1 ? "#f8fafc" : "#f0f9ff", color: m.qty <= 1 ? "#cbd5e1" : "var(--primary-color)", fontSize: 16, fontWeight: 700, cursor: m.qty <= 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit", transition: "all 0.15s" }}
                  >−</button>
                  <span style={{ width: 30, textAlign: "center", fontSize: 13, fontWeight: 800, color: "var(--primary-color)", background: "white", lineHeight: "28px", borderLeft: "1px solid #e2e8f0", borderRight: "1px solid #e2e8f0" }}>{m.qty}</span>
                  <button type="button" aria-label="Increase quantity" onClick={() => updateQty(idx, 1)}
                    style={{ width: 28, height: 28, border: "none", background: "#f0f9ff", color: "var(--primary-color)", fontSize: 16, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit", transition: "all 0.15s" }}
                  >+</button>
                </div>
                <button
                  type="button"
                  aria-label={"Remove " + m.name}
                  onClick={() => removeMedicine(idx)}
                  style={{ background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 6, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 13, fontWeight: 700, flexShrink: 0, transition: "all 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#fca5a5" }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#fee2e2" }}
                >✕</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PRESCRIPTION UPLOAD (Multiple Files) ────────────────────────────────────
function PrescriptionUpload({ files, onFilesChange }) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const MAX_SIZE = 5 * 1024 * 1024; // 5MB per file
  const MAX_FILES = 5;
  const ALLOWED = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];

  const validate = (f) => {
    if (!ALLOWED.includes(f.type)) {
      setError("Only JPG, PNG or PDF files allowed.");
      return false;
    }
    if (f.size > MAX_SIZE) {
      setError("File size 5MB se zyada nahi honi chahiye.");
      return false;
    }
    setError("");
    return true;
  };

  const addFiles = (fileList) => {
    if (!fileList || fileList.length === 0) return;
    const remaining = MAX_FILES - files.length;
    if (remaining <= 0) {
      setError(`Maximum ${MAX_FILES} prescriptions hi upload kar sakte hain.`);
      return;
    }
    const toAdd = Array.from(fileList).slice(0, remaining);
    let addedCount = 0;
    toAdd.forEach((f) => {
      if (!validate(f)) return;
      addedCount++;
      const reader = new FileReader();
      reader.onloadend = () => {
        onFilesChange((prev) => {
          if (prev.length >= MAX_FILES) return prev;
          return [...prev, { file: f, preview: reader.result, id: Date.now() + Math.random() }];
        });
      };
      reader.readAsDataURL(f);
    });
    if (addedCount > 0) setError("");
  };

  const removeFile = (id) => {
    onFilesChange((prev) => prev.filter((f) => f.id !== id));
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  return (
    <div>
      <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700, fontSize: 13, color: "#374151", marginBottom: 6 }}>
        <span><Icon name="clip" size={13} color="#374151" /></span> Prescription Upload <span style={{ color: "#94a3b8", fontWeight: 400, fontSize: 12 }}>(Optional • Max {MAX_FILES} files)</span>
      </label>

      {/* Uploaded files grid */}
      {files.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))", gap: 10, marginBottom: 10 }}>
          {files.map((f) => (
            <div key={f.id} style={{
              border: "2px solid #bbf7d0", background: "#f0fdf4", borderRadius: 12,
              padding: "10px 12px", display: "flex", alignItems: "center", gap: 10,
            }}>
              {f.file.type === "application/pdf" ? (
                <div style={{ width: 42, height: 42, background: "#fee2e2", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="fileText" size={20} color="#dc2626" /></div>
              ) : (
                <img src={f.preview} alt="Prescription"
                  style={{ width: 42, height: 42, objectFit: "cover", borderRadius: 10, border: "1px solid #e2e8f0", flexShrink: 0 }} />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, color: "#065f46", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {f.file.name}
                </div>
                <div style={{ color: "#16a34a", fontSize: 10, marginTop: 1 }}>
                  <Icon name="check" size={10} color="#16a34a" /> {(f.file.size / 1024).toFixed(0)} KB
                </div>
              </div>
              <button
                type="button"
                aria-label={"Remove " + f.file.name}
                onClick={() => removeFile(f.id)}
                style={{ background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 8, padding: "5px 9px", cursor: "pointer", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Drop zone — always shown if under max */}
      {files.length < MAX_FILES && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload prescription — click or drag and drop"
          onClick={() => inputRef.current?.click()}
          onKeyDown={e => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          style={{
            border: `2px dashed ${dragging ? "#0d4f6b" : "#cbd5e1"}`,
            borderRadius: 12,
            padding: files.length > 0 ? "clamp(12px,2vw,16px) 16px" : "clamp(18px,3vw,28px) 16px",
            textAlign: "center",
            cursor: "pointer",
            background: dragging ? "#f0f9ff" : "#f8fafc",
            transition: "all 0.2s ease",
            outline: "none",
          }}
        >
          <div style={{ marginBottom: files.length > 0 ? 4 : 8 }}>{dragging ? <Icon name="folderOpen" size={files.length > 0 ? 24 : 32} color="#0d4f6b" /> : <Icon name="upload" size={files.length > 0 ? 24 : 32} color="#94a3b8" />}</div>
          <div style={{ fontWeight: 600, color: dragging ? "#0d4f6b" : "#475569", fontSize: "clamp(12px,2vw,13px)", marginBottom: 4 }}>
            {dragging ? "Yahan drop karo!" : files.length > 0 ? "Aur prescription add karo (click ya drag)" : "Prescription ka photo yahan drag karo ya click karo"}
          </div>
          <div style={{ color: "#94a3b8", fontSize: 11 }}>JPG, PNG ya PDF • Max 5MB per file • {files.length}/{MAX_FILES} uploaded</div>
        </div>
      )}

      {files.length >= MAX_FILES && (
        <div style={{ background: "#fefce8", border: "1px solid #fde68a", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: "#92400e", fontWeight: 600, marginTop: 4 }}>
          <Icon name="warn" size={11} color="#92400e" /> Maximum {MAX_FILES} prescriptions upload ho chuki hain.
        </div>
      )}

      {/* Hidden multi-file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg,application/pdf"
        multiple
        style={{ display: "none" }}
        onChange={e => { addFiles(e.target.files); e.target.value = ""; }}
        aria-hidden="true"
      />

      {error && (
        <p style={{ fontSize: 12, color: "#ef4444", marginTop: 6, fontWeight: 600 }}><Icon name="warn" size={11} color="#ef4444" /> {error}</p>
      )}

      {files.length === 0 && (
        <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 6 }}>
          <Icon name="bulb" size={11} color="#94a3b8" /> Prescription images WhatsApp par automatically share ho jayengi
        </p>
      )}
    </div>
  );
}

// ─── ORDER PAGE ───────────────────────────────────────────────────────────────
function OrderPage({ orderRef, onSubmit, success, setSuccess }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "", pincode: "", note: "", paymentMode: "UPI", reminderDate: "", reminderNote: "" });
  const [medicinesList, setMedicinesList] = useState([]);
  const [errs, setErrs] = useState({});
  const [loading, setLoading] = useState(false);


  const v = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Naam likhna zaruri hai";
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Kripya valid 10-digit number likhein";
    if (!form.address.trim()) e.address = "Delivery address likhna zaruri hai";
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = "6-digit PIN code likhein";
    if (medicinesList.length === 0) e.medicines = "Kam se kam ek medicine add karein";
    return e;
  };

  const submit = async () => {
    const e = v();
    if (Object.keys(e).length) { setErrs(e); return; }
    setLoading(true);

    const medicinesText = medicinesList.map((m, i) => `${i + 1}. ${m.name} x ${m.qty}`).join("\n");
    const submittedForm = {
      ...form,
      medicines: medicinesText,
      reminderDate: form.reminderDate || "",
      reminderNote: form.reminderNote || "",
    };

    await onSubmit(submittedForm);

    setForm({ name: "", phone: "", address: "", pincode: "", note: "", paymentMode: "UPI", reminderDate: "", reminderNote: "" });
    setMedicinesList([]);
    setErrs({});
    setLoading(false);
  };

  return (
    <div style={{ paddingTop: 70 }}>
      <div style={{
        background: "radial-gradient(circle at 80% 20%, rgba(34,211,238,0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(13,79,107,0.3) 0%, transparent 60%), linear-gradient(135deg, #071e29 0%, #0d4f6b 50%, #0891b2 100%)",
        padding: "clamp(48px,6vw,72px) clamp(16px,4vw,32px) clamp(32px,4vw,48px)", textAlign: "center", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(28px,4vw,44px)", color: "white", fontWeight: 900, marginBottom: 10, letterSpacing: "-0.02em" }}><Icon name="building" size={28} color="white" /> Medicine Order Karo</h1>
          <p style={{ color: "#22d3ee", fontSize: 15, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>{CONFIG.deliveryTime} MEIN FAST DELIVERY • PRAYAGRAJ</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", marginTop: 24 }}>
            {[["rocket", "Fast Delivery"], ["pill", "Genuine Medicines"], ["lock", "Secure Payment"]].map(([i, t]) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 700, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", padding: "6px 14px", borderRadius: 20 }}><span><Icon name={i} size={14} color="rgba(255,255,255,0.85)" /></span><span>{t}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div ref={orderRef} style={{ maxWidth: 720, margin: "0 auto", padding: "clamp(24px,4vw,48px) clamp(12px,4vw,16px)" }}>
        {success ? (
          <div className="card" style={{ padding: "clamp(32px,5vw,56px) clamp(16px,4vw,40px)", textAlign: "center", animation: "fadeSlideIn 0.4s cubic-bezier(0.25, 1, 0.5, 1)", borderRadius: 28 }}>
            <div style={{ width: 88, height: 88, background: "linear-gradient(135deg,#10b981,#059669)", borderRadius: 28, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 12px 32px rgba(16,185,129,0.3)" }}><Icon name="sparkle" size={44} color="white" /></div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, color: "var(--primary-color)", fontWeight: 900, marginBottom: 10, letterSpacing: "-0.01em" }}>Order Place Ho Gaya!</h2>
            <p style={{ color: "var(--text-light)", fontSize: 14, marginBottom: 20, fontWeight: 500 }}>Aapka WhatsApp automatically open ho raha hai...</p>
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 20, padding: "20px 32px", marginBottom: 24, display: "inline-block", boxShadow: "0 10px 25px rgba(16,185,129,0.06)" }}>
              <div style={{ color: "#065f46", fontSize: 12, fontWeight: 800, marginBottom: 6, letterSpacing: "0.08em" }}><Icon name="clipboard" size={12} color="#065f46" /> AAPKA ORDER ID</div>
              <div style={{ fontFamily: "monospace", fontWeight: 800, fontSize: 24, color: "#059669", letterSpacing: "0.1em" }}>{success}</div>
              <div style={{ color: "#16a34a", fontSize: 12, marginTop: 6, fontWeight: 600 }}>Ise save karein — tracking ke liye zaruri hai!</div>
            </div>
            <div style={{ display: "grid", gap: 12, marginBottom: 28, maxWidth: 480, margin: "0 auto 28px" }}>
              <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 16, padding: "14px 18px", display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ display: "flex", alignItems: "center" }}><Icon name="bike" size={22} color="#c2410c" /></span>
                <div style={{ textAlign: "left" }}>
                  <div style={{ color: "#c2410c", fontWeight: 800, fontSize: 14, fontFamily: "'Outfit', sans-serif" }}>{CONFIG.deliveryTime} mein delivery!</div>
                  <div style={{ color: "#ea580c", fontSize: 12, fontWeight: 500, marginTop: 2 }}>Hamara delivery executive medicine lekar nikalne wala hai.</div>
                </div>
              </div>
            </div>
            <button aria-label="Place another order" className="btn-primary-lg" style={{ width: "100%", justifyContent: "center" }} onClick={() => setSuccess(null)}><Icon name="box" size={16} /> Naya Order Karo</button>
          </div>
        ) : (
          <div className="card order-card" style={{ padding: "clamp(24px,4vw,40px) clamp(20px,4vw,36px)", borderRadius: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "clamp(24px,3vw,36px)" }}>
              <div style={{ width: 48, height: 48, background: "linear-gradient(135deg,var(--primary-color),var(--accent-color))", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 8px 16px rgba(13,79,107,0.2)" }}><Icon name="clipboard" size={22} color="white" /></div>
              <div>
                <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(18px,3vw,22px)", color: "var(--primary-color)", fontWeight: 900, letterSpacing: "-0.01em" }}>Order Form</h2>
                <p style={{ fontSize: 12, color: "var(--text-light)", fontWeight: 500, marginTop: 2 }}>Sabhi details fill kijiye — fast delivery guaranteed!</p>
              </div>
            </div>
            <div style={{ display: "grid", gap: "clamp(16px,2.5vw,22px)" }}>
              <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(12px,2vw,18px)" }}>
                <F label="Aapka Naam *" error={errs.name} icon="user">
                  <div style={{ position: "relative" }}>
                    <input aria-label="Your name" className={`inp ${errs.name ? "inp-err" : ""}`} style={{ paddingRight: 48 }} placeholder="Ramesh Gupta" value={form.name} onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrs(p => ({ ...p, name: "" })) }} />
                    <MicButton onResult={(t) => { setForm(p => ({ ...p, name: p.name ? p.name + " " + t : t })); setErrs(p => ({ ...p, name: "" })); }} />
                  </div>
                </F>
                <F label="WhatsApp Number *" error={errs.phone} icon="phone">
                  <input aria-label="WhatsApp number" className={`inp ${errs.phone ? "inp-err" : ""}`} placeholder="9876543210" maxLength={10} value={form.phone} onChange={e => { setForm(p => ({ ...p, phone: e.target.value.replace(/\D/, "") })); setErrs(p => ({ ...p, phone: "" })) }} />
                </F>
              </div>
              <F label="Delivery Address *" error={errs.address} icon="mapPin">
                <div style={{ position: "relative" }}>
                  <textarea aria-label="Delivery address" className={`inp ${errs.address ? "inp-err" : ""}`} rows={3} style={{ paddingRight: 48 }} placeholder="Ghar number, gali, mohalla, landmark..." value={form.address} onChange={e => { setForm(p => ({ ...p, address: e.target.value })); setErrs(p => ({ ...p, address: "" })) }} />
                  <MicButton isTextarea onResult={(t) => { setForm(p => ({ ...p, address: p.address ? p.address + " " + t : t })); setErrs(p => ({ ...p, address: "" })); }} />
                </div>
              </F>
              <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(12px,2vw,18px)" }}>
                <F label="Pincode *" error={errs.pincode} icon="hash">
                  <input aria-label="Pincode" className={`inp ${errs.pincode ? "inp-err" : ""}`} placeholder="211001" maxLength={6} value={form.pincode} onChange={e => { setForm(p => ({ ...p, pincode: e.target.value.replace(/\D/, "") })); setErrs(p => ({ ...p, pincode: "" })) }} />
                </F>
                <F label="Payment Mode" icon="creditCard">
                  <select aria-label="Payment mode" className="inp" value={form.paymentMode} onChange={e => setForm(p => ({ ...p, paymentMode: e.target.value }))}>
                    <option value="UPI">UPI (GPay/PhonePe/Paytm)</option>
                    <option value="Cash">Cash on Delivery</option>
                  </select>
                </F>
              </div>
              <MedicineAutocomplete
                medicines={medicinesList}
                onMedicinesChange={(list) => { setMedicinesList(list); setErrs(p => ({ ...p, medicines: "" })); }}
                error={errs.medicines}
              />

              {/* Medicine Reminder */}
              <div style={{
                background: "linear-gradient(135deg, #fffbeb, #fef3c7)",
                border: "1px solid #fde68a", borderRadius: 16,
                padding: "clamp(14px,2.5vw,20px)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: "#fef3c7", border: "1px solid #fde68a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name="clock" size={16} color="#d97706" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 13, color: "#92400e", fontFamily: "'Outfit', sans-serif" }}>Medicine Reminder (Optional)</div>
                    <div style={{ fontSize: 11, color: "#b45309", fontWeight: 500 }}>Agle order ke liye kab dawa chahiye? Date aur note likh dijiye.</div>
                  </div>
                </div>
                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(10px,2vw,14px)" }}>
                  <div>
                    <label style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: 700, fontSize: 12, color: "#78350f", marginBottom: 5 }}>
                      <Icon name="clock" size={11} color="#78350f" /> Reminder Date
                    </label>
                    <input type="date" aria-label="Reminder date" className="inp"
                      value={form.reminderDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={e => setForm(p => ({ ...p, reminderDate: e.target.value }))}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: 700, fontSize: 12, color: "#78350f", marginBottom: 5 }}>
                      <Icon name="edit" size={11} color="#78350f" /> Reminder Note
                    </label>
                    <div style={{ position: "relative" }}>
                      <input type="text" aria-label="Reminder note" className="inp" style={{ paddingRight: 48 }}
                        placeholder="7-8 din baad fir chahiye or Ye dawaiyan mujhe roz chahiye"
                        value={form.reminderNote}
                        onChange={e => setForm(p => ({ ...p, reminderNote: e.target.value }))}
                      />
                      <MicButton onResult={(t) => setForm(p => ({ ...p, reminderNote: p.reminderNote ? p.reminderNote + " " + t : t }))} />
                    </div>
                  </div>
                </div>
              </div>
              <F label="Special Note (Optional)?" icon="edit">
                <div style={{ position: "relative" }}>
                  <input aria-label="Special delivery note" className="inp" style={{ paddingRight: 48 }} placeholder="Jaise: Sham ko 5 baje ke baad deliver karein, gate par bell bajayein..." value={form.note} onChange={e => setForm(p => ({ ...p, note: e.target.value }))} />
                  <MicButton onResult={(t) => setForm(p => ({ ...p, note: p.note ? p.note + " " + t : t }))} />
                </div>
              </F>

              {/* Prescription Info Note */}
              <div style={{
                background: "linear-gradient(135deg,#eff6ff,#f0f9ff)",
                border: "1px solid #bfdbfe", borderRadius: 16,
                padding: "16px 18px", display: "flex", gap: 12, alignItems: "flex-start",
              }}>
                <span style={{ flexShrink: 0, display: "flex", alignItems: "center", marginTop: 2 }}><Icon name="edit" size={20} color="#1d4ed8" /></span>
                <div style={{ color: "#1e40af", fontSize: 13, lineHeight: 1.7, fontWeight: 600 }}>
                  <strong>Note:</strong> Pehle form submit karein, uske baad apni Dawa ki Parchi (दवा की पर्ची) WhatsApp par share kar dijiye. Isse hum aapka order jaldi process kar payenge.
                </div>
              </div>
              <div style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", border: "1.5px solid #86efac", borderRadius: 18, padding: "clamp(14px,2vw,18px) clamp(16px,2vw,22px)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, boxShadow: "0 10px 20px rgba(16,185,129,0.04)" }}>
                <div>
                  <div style={{ fontWeight: 800, color: "#15803d", fontSize: "clamp(14px,2vw,16px)", fontFamily: "'Outfit', sans-serif" }}><Icon name="bike" size={16} color="#15803d" /> Delivery Charge</div>
                  <div style={{ fontSize: "clamp(11px,1.8vw,12px)", color: "#16a34a", marginTop: 2, fontWeight: 600 }}>₹500 se upar ke orders par delivery bilkul FREE!</div>
                </div>
                <div style={{ fontWeight: 900, fontSize: "clamp(20px,3vw,24px)", color: "#15803d", flexShrink: 0, fontFamily: "'Outfit', sans-serif" }}>₹{CONFIG.deliveryCharge}</div>
              </div>
              <button aria-label="Submit order via WhatsApp" className="btn-primary-lg" onClick={submit} disabled={loading}
                style={{ opacity: loading ? 0.75 : 1, cursor: loading ? "not-allowed" : "pointer", width: "100%", justifyContent: "center", padding: "clamp(14px,2.5vw,18px)", fontSize: "clamp(14.5px,2vw,16px)", boxShadow: "0 10px 25px rgba(13,79,107,0.25)" }}>
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 18, height: 18, border: "3px solid rgba(255,255,255,0.3)", borderTop: "3px solid white", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                    Firebase mein save ho raha hai...
                  </span>
                ) : <><Icon name="mobile" size={15} /> Order Karo via WhatsApp →</>}
              </button>
              <div style={{ textAlign: "center", padding: "clamp(12px,2vw,15px)", background: "#f8fafc", borderRadius: 14, border: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: "clamp(12.5px,1.8vw,13.5px)", color: "var(--text-light)", fontWeight: 600 }}>Ya direct call kijiye: </span>
                <a href={`tel:${CONFIG.phone}`} style={{ color: "var(--primary-color)", fontWeight: 800, fontSize: "clamp(13px,1.8vw,14px)", textDecoration: "none", borderBottom: "2px solid var(--accent-color)" }}>+91 {CONFIG.phone}</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── FLOATING WHATSAPP BUTTON ─────────────────────────────────────────────────
function FloatingWhatsApp({ page, mob }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Delay appearance by 3 seconds after mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Hide on Order page and when mobile menu is open
  if (page === "order" || mob || !visible) return null;

  const waMsg = `Namaste! Mujhe medicines order karni hain. Kripya help karein. ðŸ™`;

  return (
    <a
      href={`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(waMsg)}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Order on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: 24,
        right: 16,
        zIndex: 996,
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "#25d366",
        color: "white",
        borderRadius: hovered ? 14 : "50%",
        width: hovered ? "auto" : 56,
        height: 56,
        padding: hovered ? "0 20px 0 14px" : "0",
        justifyContent: "center",
        textDecoration: "none",
        fontWeight: 700,
        fontSize: 14,
        boxShadow: "0 4px 20px rgba(37,211,102,0.5)",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        animation: "waSlideIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
    >
      {/* Pulsing ring */}
      <span style={{
        position: "absolute",
        inset: -4,
        borderRadius: "50%",
        border: "3px solid rgba(37,211,102,0.45)",
        animation: "waPulse 2s ease-out infinite",
        pointerEvents: "none",
        borderRadius: hovered ? 18 : "50%",
        transition: "border-radius 0.3s",
      }} />
      {/* Icon */}
      <span style={{ lineHeight: 1, flexShrink: 0, display: "flex", alignItems: "center" }}><WhatsAppIcon size={28} color="white" /></span>
      {/* Expanded text */}
      {hovered && (
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.01em" }}>
          Order on WhatsApp
        </span>
      )}
    </a>
  );
}
function SkeletonCard() {
  return (
    <div className="card" style={{
      padding: "16px 20px",
      display: "flex", alignItems: "center", gap: 14,
      borderLeft: "4px solid #e2e8f0",
      overflow: "hidden",
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Row 1: order ID + badge + time */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div className="skeleton" style={{ width: 90, height: 20, borderRadius: 6 }} />
          <div className="skeleton" style={{ width: 80, height: 20, borderRadius: 20 }} />
          <div className="skeleton" style={{ width: 60, height: 16, borderRadius: 4, marginLeft: "auto" }} />
        </div>
        {/* Row 2: name + phone */}
        <div className="skeleton" style={{ width: "55%", height: 16, borderRadius: 4, marginBottom: 8 }} />
        {/* Row 3: address + medicines */}
        <div className="skeleton" style={{ width: "80%", height: 14, borderRadius: 4 }} />
      </div>
      <div style={{ flexShrink: 0, textAlign: "right" }}>
        <div className="skeleton" style={{ width: 36, height: 14, borderRadius: 4, marginBottom: 6 }} />
        <div className="skeleton" style={{ width: 16, height: 16, borderRadius: "50%" }} />
      </div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
function AdminPage({ stats, filtered, filter, setFilter, dateFilter, setDateFilter, search, setSearch, orders, selected, setSelected, updateStatus, sendWA, dbReady, onRefresh, playAlert, onLogout }) {

  const printFiltered = () => {
    const dateLabel = dateFilter === "today" ? "Today" : dateFilter === "week" ? "Last 7 Days" : "All Orders";
    const pw = window.open("", "_blank", "width=900,height=700");
    pw.document.write(`<html><head><title>Orders - ${dateLabel}</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',Arial,sans-serif;padding:28px;color:#1e293b}
h1{font-size:20px;margin-bottom:4px}p.sub{font-size:12px;color:#64748b;margin-bottom:18px}
table{width:100%;border-collapse:collapse;font-size:12px}th{background:#0d4f6b;color:#fff;padding:10px 8px;text-align:left;font-weight:700}
td{padding:9px 8px;border-bottom:1px solid #e2e8f0}tr:nth-child(even){background:#f8fafc}
.footer{margin-top:20px;font-size:11px;color:#94a3b8;text-align:center;border-top:1px solid #e2e8f0;padding-top:12px}
@media print{body{padding:12px}}</style></head><body>
<h1>Sarita Pharmacy — Order Report</h1>
<p class="sub">Filter: ${dateLabel} | ${filtered.length} orders | Generated: ${new Date().toLocaleString("en-IN")}</p>
<table><thead><tr><th>#</th><th>Order ID</th><th>Name</th><th>Phone</th><th>Medicines</th><th>Address</th><th>Payment</th><th>Status</th><th>Date</th></tr></thead><tbody>`);
    filtered.forEach((o, i) => {
      const sc = STATUS[o.status] || STATUS.new;
      const d = o.createdAt ? new Date(Number(o.createdAt)).toLocaleDateString("en-IN") : "—";
      pw.document.write(`<tr><td>${i + 1}</td><td>${o.orderId || o.id}</td><td>${o.name}</td><td>${o.phone}</td><td>${(o.medicines || "").replace(/\n/g, ", ").substring(0, 80)}</td><td>${(o.address || "").substring(0, 40)}, ${o.pincode || ""}</td><td>${o.paymentMode || "—"}</td><td>${sc.label}</td><td>${d}</td></tr>`);
    });
    pw.document.write(`</tbody></table><div class="footer">Sarita Pharmacy, Prayagraj | Auto-generated report</div></body></html>`);
    pw.document.close();
    setTimeout(() => pw.print(), 400);
  };
  const newOrders = orders.filter(o => o.status === "new").slice(0, 3);

  const [showDbWarning, setShowDbWarning] = useState(false);
  const [warnDismissed, setWarnDismissed] = useState(false);
  useEffect(() => {
    if (!dbReady) {
      const t = setTimeout(() => setShowDbWarning(true), 5000);
      return () => clearTimeout(t);
    } else {
      setShowDbWarning(false);
    }
  }, [dbReady]);
  return (
    <div style={{ paddingTop: 70 }}>
      <div style={{
        background: "radial-gradient(circle at 80% 20%, rgba(34,211,238,0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(13,79,107,0.3) 0%, transparent 60%), linear-gradient(135deg, #071e29 0%, #0d4f6b 50%, #0891b2 100%)",
        padding: "clamp(20px,4vw,36px) clamp(12px,3vw,24px) clamp(16px,3vw,28px)", position: "relative", overflow: "hidden",
        borderBottom: "1px solid rgba(255,255,255,0.08)"
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, position: "relative", zIndex: 1 }}>
          <div>
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, color: "white", fontWeight: 900, marginBottom: 4, letterSpacing: "-0.02em" }}><Icon name="clipboard" size={22} color="white" /> Order Dashboard</h1>
            <p style={{ color: "#22d3ee", fontSize: 13, fontWeight: 600, letterSpacing: "0.02em" }}>Sarita Pharmacy, Prayagraj <Icon name="flame" size={11} color="#22d3ee" /> Live Data</p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            {orders.filter(o => o.status === "new").length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 12, padding: "8px 14px" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block", animation: "blink 1s infinite" }} />
                <span style={{ color: "#fca5a5", fontSize: 13, fontWeight: 800 }}>{orders.filter(o => o.status === "new").length} New Order!</span>
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "8px 14px" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: dbReady ? "#22d3ee" : "#f59e0b", display: "inline-block", animation: dbReady ? "none" : "blink 1.5s infinite" }} />
              <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 13, fontWeight: 700 }}>{dbReady ? <><Icon name="flame" size={13} color="#22d3ee" /> Firebase Live</> : <><Icon name="timer" size={13} color="#f59e0b" /> Connecting...</>}</span>
            </div>
            <button aria-label="Refresh orders" onClick={() => { playAlert(); onRefresh(); }}
              style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "8px 18px", borderRadius: 12, cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "inherit", transition: "all 0.25s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}>
              <Icon name="zap" size={13} color="white" /> Refresh
            </button>
            <button aria-label="Logout from admin" onClick={onLogout}
              style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.25)", color: "#fca5a5", padding: "8px 18px", borderRadius: 12, cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "inherit", transition: "all 0.25s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.25)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.15)"}>
              <Icon name="lock" size={13} color="#fca5a5" /> Logout
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(16px,3vw,28px) clamp(10px,2vw,16px)", overflowX: "hidden" }}>

        {/* Firebase Warning Banner */}
        {showDbWarning && !warnDismissed && (
          <div style={{
            background: "linear-gradient(135deg,#fef2f2,#fff1f2)",
            border: "1.5px solid #fca5a5", borderRadius: 18,
            padding: "16px 20px", marginBottom: 24,
            display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
            animation: "fadeSlideIn 0.3s ease",
            boxShadow: "0 10px 25px rgba(239,68,68,0.05)"
          }}>
            <div style={{ fontSize: 22 }}><Icon name="warn" size={22} color="#dc2626" /></div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontWeight: 800, color: "#dc2626", fontSize: 14, fontFamily: "'Outfit', sans-serif" }}>Firebase Connected Nahi Ho Pa Raha</div>
              <div style={{ color: "#ef4444", fontSize: 13, marginTop: 2, fontWeight: 500 }}>
                Internet connection check karein ya Firebase Console mein security rules verify karein.
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <button onClick={onRefresh}
                style={{
                  padding: "8px 16px", background: "#dc2626", color: "white", border: "none",
                  borderRadius: 10, fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: "inherit"
                }}>
                <Icon name="zap" size={12} color="white" /> Retry
              </button>
              <button onClick={() => setWarnDismissed(true)}
                style={{
                  padding: "8px 12px", background: "white", color: "#dc2626", border: "1px solid #fca5a5",
                  borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit"
                }}>
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Date Filter Bar */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24, background: "white", borderRadius: 18, padding: "12px 18px", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(0,0,0,0.02)", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginRight: 4 }}><Icon name="timer" size={13} color="#94a3b8" /> Date:</span>
          {[["today", "Today"], ["week", "7 Days"], ["all", "All Orders"]].map(([v, l]) => (
            <button key={v} aria-label={`Filter by ${l}`} onClick={() => setDateFilter(v)}
              style={{
                padding: "8px 18px", borderRadius: 30, border: "1px solid", fontSize: 13, fontWeight: 700, cursor: "pointer",
                fontFamily: "inherit",
                borderColor: dateFilter === v ? "var(--primary-color)" : "#e2e8f0", background: dateFilter === v ? "var(--primary-color)" : "white",
                color: dateFilter === v ? "white" : "#64748b", transition: "all 0.2s ease",
                boxShadow: dateFilter === v ? "0 4px 12px rgba(13,79,107,0.12)" : "none"
              }}
              onMouseEnter={e => { if (dateFilter !== v) { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = "#cbd5e1" } }}
              onMouseLeave={e => { if (dateFilter !== v) { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#e2e8f0" } }}>
              {l}
            </button>
          ))}
          <button onClick={printFiltered} aria-label="Print filtered orders as PDF"
            style={{
              padding: "8px 18px", borderRadius: 30, border: "1px solid #e2e8f0", fontSize: 13, fontWeight: 700, cursor: "pointer",
              fontFamily: "inherit", background: "#0f172a", color: "white", transition: "all 0.2s ease",
              display: "flex", alignItems: "center", gap: 6,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#1e293b" }}
            onMouseLeave={e => { e.currentTarget.style.background = "#0f172a" }}>
            <Icon name="clipboard" size={12} color="white" /> Print PDF
          </button>
          <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--text-light)", fontWeight: 600 }}>{filtered.length} orders</span>
        </div>

        {/* Analytics Stats Grid */}
        <div className="admin-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
          {[{ l: "Total Orders", v: stats.total, icon: "box", c: "#0891b2" }, { l: "New Orders", v: stats.new, icon: "badgeNew", c: "#ef4444" }, { l: "On the Way", v: stats.out, icon: "bike", c: "#f97316" }, { l: "Delivered", v: stats.done, icon: "sparkle", c: "#10b981" }].map(s => (
            <div key={s.l} className="card" style={{
              padding: "22px 18px", textAlign: "center", borderRadius: 20, border: "1px solid #e2e8f0",
              boxShadow: "0 10px 20px rgba(0,0,0,0.03)", borderTop: `4px solid ${s.c}`,
              transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)" }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none" }}>
              <div style={{ fontSize: 28, marginBottom: 6, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.05))" }}><Icon name={s.icon} size={28} color={s.c} /></div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 30, fontWeight: 900, color: s.c, lineHeight: 1.1 }}>{s.v}</div>
              <div style={{ fontSize: 12, color: "#64748b", fontWeight: 700, marginTop: 6, letterSpacing: "0.01em" }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Quick Action Cards for New Orders */}
        {newOrders.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: "#334155", marginBottom: 12, display: "flex", alignItems: "center", gap: 8, textTransform: "uppercase", letterSpacing: "0.04em", fontFamily: "'Outfit', sans-serif" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block", animation: "blink 1s infinite" }} />
              <Icon name="zap" size={14} color="#ef4444" /> Action Required — New Orders
            </div>
            <div className="admin-quick" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(240px,100%),1fr))", gap: 16 }}>
              {newOrders.map(o => (
                <div key={o.id} style={{
                  background: "linear-gradient(135deg, #fff5f5, #fffcfc)", border: "1.5px solid #fecaca",
                  borderRadius: 20, padding: "clamp(14px,2.5vw,18px) clamp(14px,2.5vw,20px)", cursor: "pointer", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: "0 10px 25px rgba(239,68,68,0.03)", overflow: "hidden"
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 15px 30px rgba(239,68,68,0.08)" }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(239,68,68,0.03)" }}
                  onClick={() => setSelected(o)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div>
                      <div style={{ fontFamily: "monospace", fontSize: 11, color: "#dc2626", fontWeight: 800, background: "#fee2e2", padding: "3px 8px", borderRadius: 6, display: "inline-block", marginBottom: 4 }}>{o.orderId || o.id}</div>
                      <div style={{ fontWeight: 800, color: "#1e293b", fontSize: 15, fontFamily: "'Outfit', sans-serif" }}>{o.name}</div>
                    </div>
                    <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>{fmt(o.createdAt)}</div>
                  </div>
                  <div style={{ fontSize: 13, color: "#64748b", marginBottom: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: 500, minWidth: 0 }}><Icon name="pill" size={11} color="#64748b" /> {o.medicines}</div>
                  <button aria-label={`Confirm order for ${o.name}`}
                    onClick={e => { e.stopPropagation(); updateStatus(o.id, "confirmed"); }}
                    style={{ width: "100%", padding: "10px", background: "var(--primary-color)", color: "white", border: "none", borderRadius: 10, fontWeight: 800, fontSize: 12, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 12px rgba(13,79,107,0.15)", transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--accent-color)"}
                    onMouseLeave={e => e.currentTarget.style.background = "var(--primary-color)"}>
                    <Icon name="check" size={11} color="white" /> Confirm Order
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Status Filter Tabs */}
        <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
          {["all", ...Object.keys(STATUS)].map(s => (
            <button key={s} aria-label={`Filter by ${s === "all" ? "all" : STATUS[s].label}`} onClick={() => setFilter(s)}
              style={{
                padding: "8px 18px", borderRadius: 30, border: "1px solid", fontSize: 12, fontWeight: 700, cursor: "pointer",
                borderColor: filter === s ? "var(--primary-color)" : "#e2e8f0", background: filter === s ? "var(--primary-color)" : "white",
                color: filter === s ? "white" : "#64748b", transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: filter === s ? "0 4px 12px rgba(13,79,107,0.12)" : "none"
              }}
              onMouseEnter={e => { if (filter !== s) { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = "#cbd5e1" } }}
              onMouseLeave={e => { if (filter !== s) { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#e2e8f0" } }}>
              {s === "all" ? "All Orders" : `${STATUS[s].icon} ${STATUS[s].label}`}
              <span style={{
                marginLeft: 6, background: filter === s ? "rgba(255,255,255,0.2)" : "#f1f5f9",
                color: filter === s ? "white" : "#94a3b8", padding: "2px 8px", borderRadius: 20, fontSize: 11
              }}>
                {s === "all" ? orders.length : orders.filter(o => o.status === s).length}
              </span>
            </button>
          ))}
        </div>

        {/* Custom Glowing Search Bar */}
        <div style={{
          position: "relative", marginBottom: 20,
        }}>
          <div style={{
            display: "flex", alignItems: "center",
            background: "white", borderRadius: 16,
            border: "2px solid",
            borderColor: search ? "var(--primary-color)" : "#e2e8f0",
            boxShadow: search ? "0 0 0 4px rgba(13,79,107,0.1)" : "0 4px 15px rgba(0,0,0,0.02)",
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            overflow: "hidden",
          }}>
            <span style={{ padding: "0 16px", color: "#94a3b8", fontSize: 18, flexShrink: 0 }}><Icon name="search" size={18} color="#94a3b8" /></span>
            <input
              aria-label="Search orders by name, phone, order ID or medicine"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, phone, Order ID or medicine name..."
              style={{
                flex: 1, padding: "14px 4px", border: "none", outline: "none",
                fontSize: "clamp(13px,2vw,14.5px)", fontFamily: "inherit",
                background: "transparent", color: "#0f172a", fontWeight: 500
              }}
            />
            {search && (
              <button
                aria-label="Clear search"
                onClick={() => setSearch("")}
                style={{
                  padding: "0 16px", background: "none", border: "none",
                  color: "#cbd5e1", fontSize: 18, cursor: "pointer",
                  flexShrink: 0, lineHeight: 1,
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#ef4444"}
                onMouseLeave={e => e.currentTarget.style.color = "#cbd5e1"}
              >✕</button>
            )}
          </div>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginTop: 8, padding: "0 4px",
          }}>
            <div style={{ fontSize: 12, color: search ? "var(--primary-color)" : "#94a3b8", fontWeight: 600 }}>
              {search
                ? `${filtered.length} order${filtered.length !== 1 ? "s" : ""} found for "${search}"`
                : `${filtered.length} order${filtered.length !== 1 ? "s" : ""} total`}
            </div>
            {search && filtered.length === 0 && (
              <div style={{ fontSize: 12, color: "var(--danger-color)", fontWeight: 700 }}>
                No results — check spelling or try other words
              </div>
            )}
          </div>
        </div>

        {/* Orders List */}
        <div style={{ display: "grid", gap: 12 }}>
          {!dbReady && filtered.length === 0 ? (
            <>
              <div style={{
                fontSize: 13, fontWeight: 700, color: "#94a3b8",
                display: "flex", alignItems: "center", gap: 8, marginBottom: 4,
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: "50%", background: "#f59e0b",
                  display: "inline-block", animation: "blink 1.5s infinite"
                }} />
                Firebase connection checking, loading orders...
              </div>
              {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
            </>
          ) : filtered.length === 0 ? (
            <div className="card" style={{ padding: 64, textAlign: "center", color: "#94a3b8", borderStyle: "dashed" }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}><Icon name="clipboard" size={44} color="#94a3b8" /></div>
              <p style={{ fontWeight: 800, fontSize: 16, color: "#64748b", fontFamily: "'Outfit', sans-serif" }}>Koi order nahi mila</p>
              <p style={{ fontSize: 13, marginTop: 4, fontWeight: 500 }}>Filters check kijiye ya naye order ka wait kijiye.</p>
            </div>
          ) : filtered.map(order => {
            const sc = STATUS[order.status] || STATUS.new;
            return (
              <div key={order.id} className="card order-row admin-order-card" onClick={() => setSelected(order)}
                style={{ padding: "clamp(14px,2vw,18px) clamp(14px,2vw,22px)", display: "flex", alignItems: "center", gap: "clamp(10px,2vw,16px)", cursor: "pointer", borderLeft: `5px solid ${sc.color}`, borderRadius: 20, overflow: "hidden" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "monospace", fontSize: 12, color: "var(--primary-color)", fontWeight: 800, background: "#f0f9ff", padding: "3px 10px", borderRadius: 8 }}>{order.orderId || order.id}</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 12px", borderRadius: 20, background: sc.bg, color: sc.color, fontSize: 11, fontWeight: 800, border: `1px solid ${sc.color}15` }}>{sc.icon} {sc.label}</span>
                    <span style={{ fontSize: 11, color: "#94a3b8", marginLeft: "auto", fontWeight: 600 }}>{fmt(order.createdAt)}</span>
                  </div>
                  <div style={{ fontWeight: 800, color: "#1e293b", marginBottom: 4, fontSize: 14.5, fontFamily: "'Outfit', sans-serif" }}><Icon name="user" size={12} color="#64748b" /> {order.name} &nbsp;<Icon name="phone" size={11} color="#94a3b8" /> {order.phone}</div>
                  <div style={{ fontSize: 12.5, color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: 500 }}><Icon name="mapPin" size={11} color="#94a3b8" /> {order.address} &nbsp;<Icon name="pill" size={11} color="#94a3b8" /> {order.medicines}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 2, fontWeight: 700 }}>{order.paymentMode}</div>
                  <div style={{ color: "#cbd5e1", fontSize: 20, fontWeight: 800 }}>›</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── SaaS ORDER DETAIL MODAL ── */}
      {selected && createPortal(
        <div className="admin-modal-overlay" style={{ position: "fixed", inset: 0, background: "rgba(2,8,14,0.72)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 16, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", animation: "fadeIn 0.2s ease" }}
          onClick={() => setSelected(null)}>
          <div className="fade-in admin-modal-box" style={{ width: "100%", maxWidth: 860, maxHeight: "94vh", background: "white", borderRadius: 24, boxShadow: "0 32px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.06)", overflow: "hidden", display: "flex", flexDirection: "column" }} onClick={e => e.stopPropagation()}>

            {/* ─ Modal Header ─ */}
            <div className="admin-modal-header" style={{ padding: "22px 28px 18px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0, background: "linear-gradient(135deg,#f8fafc,#f0f9ff)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0, flex: 1 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: "linear-gradient(135deg,#0d4f6b,#0891b2)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(13,79,107,0.25)", flexShrink: 0 }}>
                  <span style={{ color: "white", fontWeight: 900, fontSize: 16, fontFamily: "'Outfit',sans-serif" }}>{(selected.name || "?")[0].toUpperCase()}</span>
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: "#0f172a", fontFamily: "'Outfit',sans-serif", letterSpacing: "-0.01em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{selected.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--primary-color)", fontWeight: 800, background: "#f0f9ff", padding: "2px 10px", borderRadius: 6, border: "1px solid #e0f2fe" }}>{selected.orderId || selected.id}</span>
                    <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>{fmtDate(selected.createdAt)}</span>
                    {(() => {
                      const sc = STATUS[selected.status] || STATUS.new; return (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 10px", borderRadius: 20, background: sc.bg, color: sc.color, fontSize: 10, fontWeight: 800, border: `1px solid ${sc.color}20` }}>
                          <Icon name={sc.icon} size={10} color={sc.color} /> {sc.label}
                        </span>
                      );
                    })()}
                  </div>
                </div>
              </div>
              <button aria-label="Close order details" onClick={() => setSelected(null)}
                style={{ background: "#f1f5f9", border: "none", width: 36, height: 36, borderRadius: 10, cursor: "pointer", fontSize: 15, color: "#64748b", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", marginLeft: 8 }}
                onMouseEnter={e => { e.currentTarget.style.background = "#e2e8f0"; e.currentTarget.style.color = "#0f172a" }}
                onMouseLeave={e => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#64748b" }}>{"\u2715"}</button>
            </div>

            {/* ─ Modal Body — 2 Column ─ */}
            <div className="admin-modal-body" style={{ flex: 1, overflowY: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 0 }}>

              {/* LEFT COLUMN — Order Details */}
              <div className="admin-modal-left" style={{ padding: "24px 28px", borderRight: "1px solid #f1f5f9" }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}><Icon name="clipboard" size={11} color="#94a3b8" /> Order Details</div>

                <div style={{ display: "grid", gap: 16 }}>
                  {[["phone", "Phone", selected.phone], ["mapPin", "Address", `${selected.address}, ${selected.pincode}`], ["pill", "Medicines", selected.medicines], ["creditCard", "Payment", selected.paymentMode], ...(selected.note ? [["edit", "Note", selected.note]] : [])].map(([icon, l, v]) => (
                    <div key={l} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 32, height: 32, borderRadius: 10, background: "#f0f9ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid #e0f2fe" }}>
                        <Icon name={icon} size={14} color="var(--primary-color)" />
                      </div>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>{l}</div>
                        <div style={{ fontSize: 13.5, color: "#0f172a", fontWeight: 600, lineHeight: 1.55, wordBreak: "break-word", overflowWrap: "anywhere", whiteSpace: l === "Medicines" ? "pre-line" : "normal" }}>{v}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Charge */}
                <div style={{ marginTop: 20, padding: "12px 16px", background: "#f0fdf4", borderRadius: 12, border: "1px solid #bbf7d0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#15803d" }}><Icon name="bike" size={12} color="#15803d" /> Delivery</span>
                  <span style={{ fontSize: 14, fontWeight: 900, color: "#15803d", fontFamily: "'Outfit',sans-serif" }}>Rs.{selected.deliveryCharge || CONFIG.deliveryCharge}</span>
                </div>
              </div>

              {/* RIGHT COLUMN — Progress + Actions */}
              <div className="admin-modal-right" style={{ padding: "24px 28px" }}>

                {/* Horizontal Progress */}
                <div style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}><Icon name="zap" size={11} color="#94a3b8" /> Progress</div>
                <div style={{ marginBottom: 24 }}>
                  <ProgressTimeline status={selected.status} />
                </div>

                {/* Status Update Buttons */}
                <div style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}><Icon name="zap" size={11} color="#94a3b8" /> Update Status</div>
                <div className="admin-status-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 24 }}>
                  {Object.entries(STATUS).map(([s, sc]) => (
                    <button key={s} aria-label={`Set status to ${sc.label}`} onClick={() => updateStatus(selected.id, s)}
                      style={{
                        padding: "10px 6px", borderRadius: 10, border: `1.5px solid ${selected.status === s ? sc.color : "#e2e8f0"}`,
                        background: selected.status === s ? sc.bg : "white", color: selected.status === s ? sc.color : "#64748b",
                        fontWeight: 700, cursor: "pointer", fontSize: 10.5, fontFamily: "inherit",
                        boxShadow: selected.status === s ? `0 2px 8px ${sc.color}25` : "none", transition: "all 0.15s",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                      }}
                      onMouseEnter={e => { if (selected.status !== s) { e.currentTarget.style.borderColor = sc.color; e.currentTarget.style.background = sc.bg } }}
                      onMouseLeave={e => { if (selected.status !== s) { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "white" } }}>
                      <Icon name={sc.icon} size={10} color={selected.status === s ? sc.color : "#94a3b8"} /> {sc.label}
                    </button>
                  ))}
                </div>

                {/* WhatsApp Actions */}
                <div style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}><Icon name="mobile" size={11} color="#94a3b8" /> WhatsApp</div>
                <div className="admin-wa-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <button aria-label="Send confirmation" className="wa-btn"
                    onClick={() => sendWA(selected, `\u2705 Namaste ${selected.name} ji!\n\nAapka order confirm ho gaya! \ud83c\udf89\n\n\ud83d\udccb Order ID: *${selected.orderId || selected.id}*\n\ud83d\udc8a ${selected.medicines}\n\n\ud83d\udd50 ${CONFIG.deliveryTime} mein deliver hoga.\n\ud83d\udcde ${CONFIG.phone}\n\n\u2014 *${CONFIG.name}*`)}>
                    <Icon name="check" size={11} /> Confirm
                  </button>
                  <button aria-label="Send on the way" className="wa-btn"
                    onClick={() => sendWA(selected, `\ud83d\udef5 Namaste ${selected.name} ji!\n\nAapki medicines *raste mein hain!*\n\n\ud83d\udccb Order ID: *${selected.orderId || selected.id}*\n\ud83d\udccd ${selected.address}\n\nThodi der mein pahunch jayenge! \ud83d\ude4f\n\n\u2014 *${CONFIG.name}*`)}>
                    <Icon name="bike" size={11} /> On the Way
                  </button>
                </div>
                <button aria-label="Send delivered" className="wa-btn" style={{ width: "100%", marginTop: 8 }}
                  onClick={() => sendWA(selected, `\ud83c\udf89 Namaste ${selected.name} ji!\n\nAapki medicines *deliver ho gayi hain!*\n\n\ud83d\udccb Order ID: *${selected.orderId || selected.id}*\n\ud83d\udcb3 Payment: ${selected.paymentMode}\n\n*${CONFIG.name}* choose karne ka bahut shukriya! \ud83d\ude4f\nAgle baar bhi humse zaroor order karein.\n\ud83d\udcde ${CONFIG.phone}`)}>
                  <Icon name="sparkle" size={11} /> Delivered \u2014 Thank You
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ setPage, scrollToOrder }) {
  return (
    <footer style={{ background: "#0f172a", color: "rgba(255,255,255,0.6)", padding: "clamp(36px,6vw,56px) clamp(16px,4vw,40px) clamp(20px,3vw,28px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "clamp(28px,5vw,52px)", marginBottom: "clamp(24px,4vw,40px)" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><BrandLogo size={42} /></div>
              <div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: "clamp(16px,2.5vw,19px)", color: "white" }}>Sarita Pharmacy</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Prayagraj · Home Delivery</div>
              </div>
            </div>
            <p style={{ fontSize: "clamp(12px,1.8vw,13px)", lineHeight: 1.8, maxWidth: 300, marginBottom: 16 }}>Genuine medicines, fast delivery, best prices. Aapki health hamaari zimmedari hai.</p>
            <a href={`https://wa.me/${CONFIG.whatsapp}?text=Namaste!`} target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25d366", color: "white", padding: "10px 16px", borderRadius: 10, fontSize: "clamp(12px,1.8vw,13px)", fontWeight: 700, textDecoration: "none" }}>
              <WhatsAppIcon size={16} color="white" /> WhatsApp Order Karo
            </a>
          </div>
          <div>
            <div style={{ color: "white", fontWeight: 700, marginBottom: 14, fontSize: "clamp(12px,2vw,14px)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Quick Links</div>
            {[["Home", () => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }], ["Order Karo", scrollToOrder], ["Doctors", () => { setPage("doctors"); window.scrollTo({ top: 0, behavior: "smooth" }); }], ["Dashboard", () => { setPage("admin"); window.scrollTo({ top: 0, behavior: "smooth" }); }]].map(([l, fn]) => (
              <div key={l} style={{ marginBottom: 10 }}>
                <button onClick={fn} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.55)", cursor: "pointer", fontSize: "clamp(13px,1.8vw,14px)", padding: 0, fontFamily: "inherit", fontWeight: 500, textAlign: "left" }}>{l}</button>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: "white", fontWeight: 700, marginBottom: 14, fontSize: "clamp(12px,2vw,14px)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Contact</div>
            {[[null, CONFIG.phone, `tel:${CONFIG.phone}`], [null, "WhatsApp", `https://wa.me/${CONFIG.whatsapp}`], [null, "Instagram", "https://www.instagram.com/madhokunj_clinic?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="], [null, CONFIG.address, null], [null, CONFIG.openTime, null]].map(([i, v, href]) => (
              <div key={v} style={{ marginBottom: 10, display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span style={{ fontSize: 14, flexShrink: 0, display: "flex", alignItems: "center" }}>{v === "WhatsApp" ? <WhatsAppIcon size={16} color="#25d366" /> : v === "Instagram" ? <InstagramIcon size={16} color="#E1306C" /> : v === CONFIG.phone ? <Icon name="phone" size={14} color="rgba(255,255,255,0.6)" /> : v === CONFIG.address ? <Icon name="mapPin" size={14} color="rgba(255,255,255,0.6)" /> : <Icon name="clock" size={14} color="rgba(255,255,255,0.6)" />}</span>
                {href
                  ? <a href={href} target={href.startsWith("tel") ? undefined : "_blank"} rel="noreferrer" style={{ color: "rgba(255,255,255,0.55)", fontSize: "clamp(12px,1.8vw,13px)", textDecoration: "none", fontWeight: 500, lineHeight: 1.4 }}>{v}</a>
                  : <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "clamp(12px,1.8vw,13px)", fontWeight: 500, lineHeight: 1.4 }}>{v}</span>}
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "clamp(14px,3vw,22px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div style={{ fontSize: "clamp(11px,1.8vw,12px)" }}>© 2026 Sarita Pharmacy, Prayagraj. All rights reserved.</div>

        </div>
      </div>
    </footer>
  );
}

// ─── SHARED ───────────────────────────────────────────────────────────────────
function SH({ badge, title, sub, dark }) {
  return (
    <div className="section-header" style={{ textAlign: "center", marginBottom: "clamp(32px,5vw,52px)" }}>
      <div style={{ display: "inline-block", background: dark ? "rgba(255,255,255,0.12)" : "linear-gradient(135deg,#e0f2fe,#bfdbfe)", color: dark ? "rgba(255,255,255,0.9)" : "#0369a1", padding: "5px 16px", borderRadius: 20, fontSize: "clamp(10px,1.5vw,11px)", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
        {badge}
      </div>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(22px,4vw,38px)", fontWeight: 800, color: dark ? "white" : "#0f172a", marginBottom: "clamp(8px,2vw,14px)", letterSpacing: "-0.01em", lineHeight: 1.15 }}>{title}</h2>
      <p style={{ fontSize: "clamp(13px,2vw,15px)", color: dark ? "rgba(255,255,255,0.65)" : "#64748b", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>{sub}</p>
    </div>
  );
}

function F({ label, error, hint, icon, children }) {
  return (
    <div>
      <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700, fontSize: 13, color: "#374151", marginBottom: 6 }}>
        {icon && <span><Icon name={icon} size={13} color="#374151" /></span>}{label}
      </label>
      {children}
      {hint && !error && <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>{hint}</p>}
      {error && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 4, fontWeight: 600 }}><Icon name="warn" size={11} color="#ef4444" /> {error}</p>}
    </div>
  );
}

function Styles() {
  return <style>{`
    :root {
      --primary-hsl: 201, 79%, 24%;
      --primary-color: #0d4f6b;
      --accent-hsl: 191, 91%, 37%;
      --accent-color: #0891b2;
      --success-hsl: 150, 84%, 37%;
      --success-color: #10b981;
      --warning-hsl: 35, 92%, 50%;
      --warning-color: #f59e0b;
      --danger-hsl: 348, 83%, 47%;
      --danger-color: #ef4444;
      --text-main: #334155;
      --text-light: #64748b;
      --bg-gradient-start: #0a3d52;
      --bg-gradient-end: #0891b2;
      --card-shadow: 0 10px 25px -5px rgba(13, 79, 107, 0.08), 0 8px 16px -6px rgba(13, 79, 107, 0.04);
      --card-shadow-hover: 0 25px 50px -12px rgba(13, 79, 107, 0.16), 0 0 0 2px rgba(8, 145, 178, 0.15);
      --glass-bg: rgba(255, 255, 255, 0.75);
      --glass-border: rgba(255, 255, 255, 0.35);
      --border-color: #e2e8f0;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    html {
      scroll-behavior: smooth;
    }
    
    body {
      overflow-x: hidden;
      background-color: #f8fafc;
      color: var(--text-main);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    input, textarea, select {
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    /* ── SCROLLBAR ── */
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 5px;
      border: 2px solid #f1f5f9;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }

    /* ── LAYOUT & CONTAINERS ── */
    .section-container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 clamp(16px, 4vw, 40px);
    }
    
    .section-pad {
      padding: clamp(48px, 8vw, 96px) clamp(16px, 4vw, 40px);
    }

    /* ── PREMIUM CARD ── */
    .card {
      background: white;
      border-radius: 20px;
      border: 1px solid var(--border-color);
      box-shadow: var(--card-shadow);
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .card:hover {
      box-shadow: 0 20px 35px -10px rgba(13, 79, 107, 0.12);
    }

    /* ── NAV PILLS ── */
    .nav-btn {
      background: none;
      border: 1px solid transparent;
      padding: 8px 16px;
      border-radius: 10px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.85);
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: inherit;
    }
    .nav-btn:hover {
      color: white;
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.15);
    }
    .nav-active {
      background: rgba(255, 255, 255, 0.18) !important;
      border-color: rgba(255, 255, 255, 0.3) !important;
      color: white !important;
      font-weight: 700 !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      backdrop-filter: blur(8px);
    }
    .cta-pill {
      background: white;
      color: var(--primary-color);
      border: none;
      padding: 10px 22px;
      border-radius: 30px;
      font-weight: 800;
      font-size: 13px;
      cursor: pointer;
      font-family: inherit;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .cta-pill:hover {
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
    }

    /* ── HERO BUTTONS ── */
    .btn-hero-primary {
      background: white;
      color: var(--primary-color);
      border: none;
      padding: clamp(12px, 2vw, 16px) clamp(24px, 3vw, 36px);
      border-radius: 16px;
      font-weight: 800;
      font-size: clamp(14px, 2vw, 16px);
      cursor: pointer;
      font-family: inherit;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      display: inline-flex;
      align-items: center;
      gap: 10px;
      white-space: nowrap;
    }
    .btn-hero-primary:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.22);
    }
    .btn-hero-wa {
      background: #25d366;
      color: white;
      border: none;
      padding: clamp(12px, 2vw, 16px) clamp(24px, 3vw, 36px);
      border-radius: 16px;
      font-weight: 800;
      font-size: clamp(14px, 2vw, 16px);
      cursor: pointer;
      font-family: inherit;
      box-shadow: 0 6px 20px rgba(37, 211, 102, 0.35);
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      display: inline-flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      white-space: nowrap;
    }
    .btn-hero-wa:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 12px 30px rgba(37, 211, 102, 0.45);
    }

    /* ── CTA BUTTONS ── */
    .btn-primary-lg {
      background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
      color: white;
      border: none;
      padding: clamp(12px, 2vw, 16px) clamp(24px, 3vw, 36px);
      border-radius: 14px;
      font-weight: 700;
      font-size: clamp(14px, 2vw, 16px);
      cursor: pointer;
      font-family: inherit;
      box-shadow: 0 4px 15px rgba(13, 79, 107, 0.25);
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      display: inline-flex;
      align-items: center;
      gap: 10px;
      white-space: nowrap;
    }
    .btn-primary-lg:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 8px 25px rgba(13, 79, 107, 0.35);
    }
    .btn-outline-lg {
      background: white;
      color: var(--primary-color);
      border: 2px solid var(--primary-color);
      padding: clamp(11px, 2vw, 14px) clamp(22px, 3vw, 28px);
      border-radius: 14px;
      font-weight: 700;
      font-size: clamp(14px, 2vw, 15px);
      cursor: pointer;
      font-family: inherit;
      transition: all 0.25s ease;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .btn-outline-lg:hover {
      background: #f0f9ff;
      border-color: var(--accent-color);
      color: var(--accent-color);
      transform: translateY(-1px);
    }

    /* ── MODERN FORM FIELDS ── */
    .inp {
      width: 100%;
      padding: clamp(12px, 2vw, 15px) clamp(14px, 2vw, 18px);
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      font-size: 16px;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      outline: none;
      resize: vertical;
      color: #0f172a;
      background: white;
    }
    .inp:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 4px rgba(13, 79, 107, 0.12);
      background: white;
    }
    .inp-err {
      border-color: var(--danger-color) !important;
      background: #fff8f8 !important;
      box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.08) !important;
    }

    /* ── SKELETON LOADER ── */
    .skeleton {
      background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s ease-in-out infinite;
      border-radius: 8px;
      display: block;
    }

    /* ── SERVICE CARDS ── */
    .service-card {
      background: white;
      border-radius: 20px;
      padding: clamp(20px, 3vw, 28px);
      border: 1px solid var(--border-color);
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: var(--card-shadow);
      position: relative;
      overflow: hidden;
    }
    .service-card::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: var(--accent);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .service-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--card-shadow-hover);
    }
    .service-card:hover::after {
      opacity: 1;
    }

    /* ── FLOAT CARDS ── */
    .float-card {
      background: rgba(255, 255, 255, 0.94);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      padding: 18px 20px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
      min-width: 165px;
      animation: floatAnim 4s ease-in-out infinite;
      border: 1px solid rgba(255, 255, 255, 0.6);
      transition: transform 0.3s ease;
    }
    .float-card:hover {
      transform: scale(1.05) !important;
    }

    /* ── ORDER ROW ── */
    .order-row {
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid var(--border-color);
    }
    .order-row:hover {
      box-shadow: 0 12px 28px rgba(13, 79, 107, 0.1);
      transform: translateY(-2px);
      border-color: rgba(13, 79, 107, 0.15);
    }

    /* ── WA BUTTON ── */
    .wa-btn {
      background: #25d366;
      color: white;
      border: none;
      padding: 12px 14px;
      border-radius: 12px;
      font-weight: 700;
      cursor: pointer;
      font-size: 13px;
      display: flex;
      align-items: center;
      gap: 8px;
      justify-content: center;
      transition: all 0.2s ease;
      font-family: inherit;
      box-shadow: 0 4px 12px rgba(37, 211, 102, 0.2);
    }
    .wa-btn:hover {
      background: #20ba5a;
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(37, 211, 102, 0.3);
    }

    /* ── HAMBURGER ── */
    .hamburger {
      display: none;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.25);
      font-size: 22px;
      cursor: pointer;
      color: white;
      padding: 4px;
      border-radius: 12px;
      width: 44px;
      height: 44px;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
    .hamburger:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.4);
    }

    /* ── FOCUS ── */
    button:focus-visible, input:focus-visible, textarea:focus-visible, select:focus-visible, a:focus-visible {
      outline: 3px solid var(--accent-color);
      outline-offset: 3px;
      border-radius: 8px;
    }

    /* ── ANIMATIONS ── */
    @keyframes waSlideIn {
      from { opacity: 0; transform: translateX(80px) scale(0.8); }
      to { opacity: 1; transform: translateX(0) scale(1); }
    }
    @keyframes waPulse {
      0% { transform: scale(1); opacity: 0.8; }
      70% { transform: scale(1.6); opacity: 0; }
      100% { transform: scale(1.6); opacity: 0; }
    }
    @keyframes floatAnim {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-12px); }
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.2; }
    }
    @keyframes micPulse {
      0%, 100% { transform: translateY(-50%) scale(1); box-shadow: 0 0 0 4px rgba(239,68,68,0.25), 0 4px 12px rgba(239,68,68,0.3); }
      50% { transform: translateY(-50%) scale(1.15); box-shadow: 0 0 0 8px rgba(239,68,68,0.15), 0 4px 16px rgba(239,68,68,0.4); }
    }
    @keyframes micPulseTA {
      0%, 100% { transform: scale(1); box-shadow: 0 0 0 4px rgba(239,68,68,0.25), 0 4px 12px rgba(239,68,68,0.3); }
      50% { transform: scale(1.15); box-shadow: 0 0 0 8px rgba(239,68,68,0.15), 0 4px 16px rgba(239,68,68,0.4); }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeSlideIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes splashFadeOut {
      from { opacity: 1; transform: scale(1); }
      to { opacity: 0; transform: scale(1.04); }
    }
    @keyframes splashPop {
      from { opacity: 0; transform: scale(0.85) translateY(20px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    @keyframes dotBounce {
      0%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    .fade-in {
      animation: fadeIn 0.35s ease;
    }

    /* ── APPOINTMENT MODAL ANIMATIONS ── */
    @keyframes apptOverlayIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes apptModalIn {
      from { opacity: 0; transform: scale(0.9) translateY(20px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes apptSuccessIn {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes apptSuccessBounce {
      0% { transform: scale(0); }
      50% { transform: scale(1.3); }
      70% { transform: scale(0.9); }
      100% { transform: scale(1); }
    }
    .appt-modal-box::-webkit-scrollbar { width: 6px; }
    .appt-modal-box::-webkit-scrollbar-track { background: transparent; }
    .appt-modal-box::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
    .appt-modal-box::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

    /* ── PHARMACY ANIMATED THEME ── */
    .pharma-float {
      animation: pharmaFloat linear infinite;
      will-change: transform;
    }
    @keyframes pharmaFloat {
      0% { transform: translateY(0) rotate(0deg) scale(1); }
      25% { transform: translateY(-30px) rotate(15deg) scale(1.1); }
      50% { transform: translateY(-10px) rotate(-10deg) scale(0.95); }
      75% { transform: translateY(-40px) rotate(20deg) scale(1.05); }
      100% { transform: translateY(0) rotate(0deg) scale(1); }
    }

    /* Gradient Orbs — animated ambient light */
    .gradient-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      will-change: transform;
    }
    .gradient-orb-1 {
      width: 600px; height: 600px;
      top: 10%; left: -5%;
      background: radial-gradient(circle, rgba(8,145,178,0.12) 0%, transparent 70%);
      animation: orbDrift1 20s ease-in-out infinite;
    }
    .gradient-orb-2 {
      width: 500px; height: 500px;
      top: 50%; right: -5%;
      background: radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%);
      animation: orbDrift2 25s ease-in-out infinite;
    }
    .gradient-orb-3 {
      width: 450px; height: 450px;
      bottom: 10%; left: 40%;
      background: radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 70%);
      animation: orbDrift3 22s ease-in-out infinite;
    }
    @keyframes orbDrift1 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(60px, -40px) scale(1.1); }
      66% { transform: translate(-30px, 30px) scale(0.95); }
    }
    @keyframes orbDrift2 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(-50px, 40px) scale(1.15); }
      66% { transform: translate(40px, -20px) scale(0.9); }
    }
    @keyframes orbDrift3 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(40px, 30px) scale(1.1); }
      66% { transform: translate(-60px, -40px) scale(0.95); }
    }

    /* Enhanced Card Effects */
    .card {
      position: relative;
      overflow: hidden;
    }
    .card::before {
      content: '';
      position: absolute;
      top: 0; left: -100%;
      width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(8,145,178,0.04), transparent);
      transition: left 0.6s ease;
    }
    .card:hover::before {
      left: 100%;
    }

    /* Section Separator — animated gradient line */
    section {
      position: relative;
    }
    section::after {
      content: '';
      position: absolute;
      bottom: 0; left: 50%;
      transform: translateX(-50%);
      width: min(80%, 800px); height: 1px;
      background: linear-gradient(90deg, transparent, rgba(8,145,178,0.15), rgba(139,92,246,0.1), transparent);
    }
    section:last-child::after { display: none; }

    /* Enhanced button glow */
    .btn-primary-lg, .btn-hero-primary, .cta-pill {
      position: relative;
      overflow: hidden;
    }
    .btn-primary-lg::after, .btn-hero-primary::after, .cta-pill::after {
      content: '';
      position: absolute;
      top: -50%; left: -50%;
      width: 200%; height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%);
      opacity: 0;
      transition: opacity 0.3s;
    }
    .btn-primary-lg:hover::after, .btn-hero-primary:hover::after, .cta-pill:hover::after {
      opacity: 1;
    }

    /* Stats counter glow on hover */
    .stats-grid > div > div:hover {
      box-shadow: 0 20px 40px -10px rgba(8,145,178,0.12), 0 0 0 1px rgba(8,145,178,0.08) !important;
    }

    /* Premium glass input focus */
    input:focus, textarea:focus, select:focus {
      box-shadow: 0 0 0 3px rgba(8,145,178,0.12), 0 4px 12px rgba(8,145,178,0.06) !important;
    }

    /* Animated underline for nav links */
    .nav-btn {
      position: relative;
    }
    .nav-btn::after {
      content: '';
      position: absolute;
      bottom: 4px; left: 50%; right: 50%;
      height: 2px;
      background: linear-gradient(90deg, #22d3ee, #38bdf8);
      border-radius: 2px;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .nav-btn:hover::after, .nav-active::after {
      left: 20%; right: 20%;
    }

    /* Floating card enhanced glow */
    .float-card {
      transition: all 0.3s ease;
    }
    .float-card:hover {
      transform: translateY(-4px) scale(1.03) !important;
      box-shadow: 0 16px 40px -8px rgba(13,79,107,0.2) !important;
    }
    ::placeholder {
      color: #94a3b8;
    }
    select option {
      color: #0f172a;
    }
    img {
      max-width: 100%;
      height: auto;
      display: block;
    }

    /* ═══════════════════════════════
       RESPONSIVE — TABLET (≤900px)
    ═══════════════════════════════ */
    @media(max-width:900px) {
      .nav-links { display: none !important; }
      .hamburger { display: flex !important; }
      .hero-cards { display: none !important; }

      .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
      .hero-grid .hero-badge { justify-content: center !important; }
      .hero-grid .hero-ctas { justify-content: center !important; }
      .hero-grid .hero-features { justify-content: center !important; }

      .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }

      .map-grid { grid-template-columns: 1fr !important; }

      .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
      .footer-grid > div:first-child { grid-column: 1 / -1; }

      .form-row { grid-template-columns: 1fr !important; }
      .offers-grid { grid-template-columns: 1fr !important; }
      .doctors-grid { grid-template-columns: repeat(2, 1fr) !important; }
    }

    /* ═══════════════════════════════
       RESPONSIVE — MOBILE (≤600px)
    ═══════════════════════════════ */
    @media(max-width:600px) {
      .hamburger { display: flex !important; }
      .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
      .services-grid { grid-template-columns: 1fr !important; }
      .reviews-grid { grid-template-columns: 1fr !important; }
      .order-card { padding: 20px 16px !important; }
      .form-row { grid-template-columns: 1fr !important; }

      .admin-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
      .admin-quick { grid-template-columns: 1fr !important; }
      .status-grid { grid-template-columns: 1fr 1fr !important; }
      .how-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
      .doctors-grid { grid-template-columns: 1fr !important; }

      .track-flex { flex-direction: column !important; gap: 10px !important; }
      .track-flex > div:first-child { min-width: unset !important; }

      .footer-grid { grid-template-columns: 1fr !important; }
      .hero-h1 { font-size: clamp(32px, 10vw, 44px) !important; }

      .cta-buttons { flex-direction: column !important; align-items: stretch !important; }
      .cta-buttons > * { width: 100%; justify-content: center; }

      .section-header p { font-size: 14px !important; }
      .modal-inner { margin: 8px !important; max-height: 95vh !important; }
      .modal-wa-grid { grid-template-columns: 1fr !important; }
      .appt-date-time-row { grid-template-columns: 1fr !important; }

      /* ── Admin Page Mobile ── */
      .admin-quick { grid-template-columns: 1fr !important; gap: 12px !important; }
      .admin-order-card { flex-direction: column !important; align-items: stretch !important; gap: 8px !important; }
      .admin-order-card > div:last-child { display: flex !important; justify-content: space-between !important; text-align: left !important; flex-direction: row !important; }

      /* ── Admin Order Modal Mobile ── */
      .admin-modal-overlay { padding: 6px !important; }
      .admin-modal-box { max-height: 96vh !important; border-radius: 16px !important; max-width: 100% !important; }
      .admin-modal-header { padding: 12px 14px 10px !important; gap: 6px !important; }
      .admin-modal-header > div:first-child { gap: 10px !important; }
      .admin-modal-header > div:first-child > div:first-child { width: 34px !important; height: 34px !important; min-width: 34px !important; border-radius: 10px !important; }
      .admin-modal-header > div:first-child > div:first-child > span { font-size: 13px !important; }
      .admin-modal-header > div:first-child > div:nth-child(2) > div:first-child { font-size: 14px !important; }
      .admin-modal-body { grid-template-columns: 1fr !important; }
      .admin-modal-left { padding: 14px 14px 10px !important; border-right: none !important; border-bottom: 1px solid #f1f5f9 !important; }
      .admin-modal-right { padding: 10px 14px 16px !important; }
      .admin-status-grid { grid-template-columns: 1fr 1fr !important; gap: 6px !important; }
      .admin-wa-grid { grid-template-columns: 1fr !important; }

      .track-progress { display: none !important; }
      .timeline-label { display: none !important; }
    }

    @media(max-width:380px) {
      .admin-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 8px !important; }
      .admin-stats .card { padding: 14px 10px !important; border-radius: 14px !important; }
      .btn-hero-primary, .btn-hero-wa { padding: 11px 18px !important; font-size: 13px !important; }
      .admin-modal-overlay { padding: 4px !important; }
      .admin-modal-box { border-radius: 14px !important; }
      .admin-modal-header { padding: 10px 12px 8px !important; }
      .admin-modal-left { padding: 12px 12px 8px !important; }
      .admin-modal-right { padding: 8px 12px 14px !important; }
    }
  `}</style>;
}
