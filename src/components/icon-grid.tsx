import { useState, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import IconCard from "./icon-card";

interface IconGridProps {
  icons: Array<{
    name: string;
    Icon: React.ComponentType<any>;
    setName: string;
  }>;
  onIconClick: (icon: {
    name: string;
    Icon: React.ComponentType<any>;
    setName: string;
  }) => void;
}

export default function IconGrid({ icons, onIconClick }: IconGridProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const getColumnCount = (width: number) => {
    if (width >= 1024) return 6; // lg
    if (width >= 768) return 4; // md
    if (width >= 640) return 3; // sm
    return 2; // default
  };

  const columnCount = getColumnCount(dimensions.width);
  const rowCount = Math.ceil(icons.length / columnCount);

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => document.getElementById('icon-grid-container'),
    estimateSize: () => 100,
    overscan: 5,
  });

  return (
    <div id="icon-grid-container" style={{ height: dimensions.height, overflow: 'auto' }}>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <div style={{ display: 'flex' }}>
              {Array.from({ length: columnCount }).map((_, columnIndex) => {
                const index = virtualRow.index * columnCount + columnIndex;
                if (index >= icons.length) return null;
                const icon = icons[index];
                return (
                  <div key={`${icon.setName}-${icon.name}`} style={{ width: `${100 / columnCount}%` }}>
                    <IconCard icon={icon} onClick={() => onIconClick(icon)} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
