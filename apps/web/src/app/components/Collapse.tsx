import type React from 'react';
import { useEffect, useRef, useState } from 'react';

function Collapse({
  children,
  isCollapsed,
  collapseContainerStyle,
  onClick,
}: {
  children: React.ReactNode;
  isCollapsed: boolean;
  collapseContainerStyle?: React.CSSProperties;
  onClick?: () => void;
}) {
  const [height, setHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.scrollHeight);
    }
  });

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        ...collapseContainerStyle,
        maxHeight: isCollapsed ? '0px' : `${height}px`,
        marginBottom: isCollapsed ? '0px' : undefined,
        transition: isCollapsed
          ? 'max-height 0.3s ease-in-out, margin-bottom 0.3s cubic-bezier(1,-0.13,1,-0.36)'
          : 'max-height 0.3s ease-in-out, margin-bottom 0.3s cubic-bezier(0,1.62,1,.68)',
      }}
      ref={containerRef}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Collapse;
