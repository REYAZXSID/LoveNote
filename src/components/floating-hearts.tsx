"use client";

import './floating-hearts.css';

export function FloatingHearts() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-1]">
        <div className="heart-container" aria-hidden="true">
        {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="heart"></div>
        ))}
        </div>
    </div>
  );
};
