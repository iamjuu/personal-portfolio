"use client";

import { useEffect, useRef } from "react";

const AnimatedMouse = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailingRef = useRef<HTMLDivElement>(null);
  const hoverTextRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const isClickingRef = useRef(false);

  useEffect(() => {
    let animationId: number;

    const updateMousePosition = (e: MouseEvent) => {
      if (!cursorRef.current || !trailingRef.current) return;

      // Direct DOM manipulation for maximum performance
      const x = e.clientX;
      const y = e.clientY;

      // Main cursor - instant positioning
      const baseTransform = `translate(${x - 8}px, ${y - 8}px)`;
      cursorRef.current.style.transform = baseTransform;
      
      // Trailing cursor - smooth follow
      if (trailingRef.current) {
        const trailingTransform = `translate(${x - 20}px, ${y - 20}px)`;
        trailingRef.current.style.transform = trailingTransform;
      }

      // Hover text positioning
      if (hoverTextRef.current && isHoveringRef.current) {
        hoverTextRef.current.style.transform = `translate(${x + 20}px, ${y - 20}px)`;
      }
    };

    const handleMouseDown = () => {
      isClickingRef.current = true;
      if (cursorRef.current) {
        cursorRef.current.style.transform += " scale(0.5)";
      }
      if (trailingRef.current) {
        trailingRef.current.style.transform += " scale(0.75)";
      }
    };

    const handleMouseUp = () => {
      isClickingRef.current = false;
      if (cursorRef.current) {
        cursorRef.current.style.transform = cursorRef.current.style.transform.replace(" scale(0.5)", "");
      }
      if (trailingRef.current) {
        trailingRef.current.style.transform = trailingRef.current.style.transform.replace(" scale(0.75)", "");
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // More comprehensive interactive element detection
      const isInteractive = 
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select") ||
        target.closest("[data-cursor-hover]") ||
        target.closest("[role='button']") ||
        target.closest("[role='link']") ||
        target.closest(".cursor-pointer") ||
        target.closest(".hover\\:cursor-pointer");
      
      isHoveringRef.current = isInteractive;
      
      if (cursorRef.current) {
        const currentTransform = cursorRef.current.style.transform;
        if (isInteractive && !currentTransform.includes("scale(1.5)")) {
          cursorRef.current.style.transform = currentTransform.replace(/scale\([^)]*\)/g, "") + " scale(1.5)";
        } else if (!isInteractive && currentTransform.includes("scale(1.5)")) {
          cursorRef.current.style.transform = currentTransform.replace(/scale\([^)]*\)/g, "");
        }
      }
      
      if (trailingRef.current) {
        const currentTransform = trailingRef.current.style.transform;
        if (isInteractive && !currentTransform.includes("scale(1.25)")) {
          trailingRef.current.style.transform = currentTransform.replace(/scale\([^)]*\)/g, "") + " scale(1.25)";
        } else if (!isInteractive && currentTransform.includes("scale(1.25)")) {
          trailingRef.current.style.transform = currentTransform.replace(/scale\([^)]*\)/g, "");
        }
      }

      // Show/hide hover text
      if (hoverTextRef.current) {
        hoverTextRef.current.style.display = isInteractive ? "block" : "none";
        hoverTextRef.current.style.opacity = isInteractive ? "1" : "0";
      }
    };

    // Add event listeners
    document.addEventListener("mousemove", updateMousePosition, { passive: true });
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseenter", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseOver, { passive: true });
    
    // Ensure cursor is always visible
    const ensureCursorVisible = () => {
      if (cursorRef.current) {
        cursorRef.current.style.display = "block";
        cursorRef.current.style.opacity = "1";
      }
      if (trailingRef.current) {
        trailingRef.current.style.display = "block";
        trailingRef.current.style.opacity = "1";
      }
    };
    
    // Initial visibility check
    ensureCursorVisible();
    
    // Periodic visibility check
    const visibilityInterval = setInterval(ensureCursorVisible, 1000);

    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseenter", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseOver);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (visibilityInterval) {
        clearInterval(visibilityInterval);
      }
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        data-cursor-element
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-4 h-4 rounded-full bg-white shadow-lg transition-transform duration-100 ease-out"
        style={{
          mixBlendMode: "difference",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />

      {/* Trailing cursor */}
      <div
        ref={trailingRef}
        data-cursor-element
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-10 h-10 rounded-full border-2 border-white/30 transition-transform duration-200 ease-out"
        style={{
          mixBlendMode: "difference",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />

      {/* Hover text */}
      <div
        ref={hoverTextRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] text-white text-sm font-medium opacity-0 transition-opacity duration-200"
        style={{
          display: "none",
          willChange: "transform, opacity",
        }}
      >
        <div className="bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md">
          Click me
        </div>
      </div>
    </>
  );
};

export default AnimatedMouse;
