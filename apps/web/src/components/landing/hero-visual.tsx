"use client";

export function HeroVisual() {
  return (
    <div className="image-overlay flex items-center justify-center">
      <div className="gallery-grid" aria-hidden="true">
        <div className="gallery-grid__cell gallery-grid__cell--1" />
        <div className="gallery-grid__cell gallery-grid__cell--2" />
        <div className="gallery-grid__cell gallery-grid__cell--3" />
        <div className="gallery-grid__cell gallery-grid__cell--4" />
        <div className="gallery-grid__cell gallery-grid__cell--5" />
        <div className="gallery-grid__cell gallery-grid__cell--6" />
        <div className="gallery-grid__cell gallery-grid__cell--7" />
      </div>
    </div>
  );
}
