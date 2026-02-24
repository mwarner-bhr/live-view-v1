import React, { useMemo, useState, useRef, useEffect } from 'react';
import type { Employee } from '../../data/employees';
import { OrgChartNode } from './OrgChartNode';
import { buildVisibleTree, calculateTreeLayout } from '../../utils/orgChartLayout';
import type { TreeNode } from '../../utils/orgChartLayout';

export interface OrgChartTreeProps {
  employees: Employee[];
  rootEmployee: number | 'all';
  depth: number | 'all';
  focusedEmployee?: number;
  selectedEmployee?: number;
  expandedNodes?: Set<number>;
  onNodeSelect?: (id: number) => void;
  onNodeExpand?: (id: number) => void;
  onNodePin?: (id: number) => void;
  showPhotos?: boolean;
  compact?: boolean;
  zoomLevel?: number;
  panX?: number;
  panY?: number;
  onPanChange?: (x: number, y: number) => void;
  onZoomChange?: (zoom: number) => void;
}

export function OrgChartTree({
  employees,
  rootEmployee,
  depth,
  focusedEmployee,
  selectedEmployee,
  expandedNodes = new Set(),
  onNodeSelect,
  onNodeExpand,
  onNodePin,
  showPhotos = true,
  compact = false,
  zoomLevel = 1,
  panX = 0,
  panY = 0,
  onPanChange,
  onZoomChange,
}: OrgChartTreeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Calculate tree layout based on visible (expanded) nodes only
  const layout = useMemo(() => {
    const tree = buildVisibleTree(employees, rootEmployee, expandedNodes);
    return calculateTreeLayout(tree, depth);
  }, [employees, rootEmployee, depth, expandedNodes]);

  // Handle mouse down for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left click
      setIsDragging(true);
      setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
    }
  };

  // Handle mouse move for panning
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      onPanChange?.(newX, newY);
    }
  };

  // Handle mouse up
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Handle wheel for zooming - zoom to cursor position
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    if (!containerRef.current) return;

    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(0.5, Math.min(2, zoomLevel + delta));

    // Get mouse position relative to container
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate the point in world coordinates before zoom
    const worldX = (mouseX - panX) / zoomLevel;
    const worldY = (mouseY - panY) / zoomLevel;

    // Calculate new pan to keep the world point under the mouse
    const newPanX = mouseX - worldX * newZoom;
    const newPanY = mouseY - worldY * newZoom;

    onZoomChange?.(newZoom);
    onPanChange?.(newPanX, newPanY);
  };

  // Update cursor based on dragging state
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.cursor = isDragging ? 'grabbing' : 'grab';
    }
  }, [isDragging]);

  // Render connecting lines between nodes
  const renderConnections = (_nodes: TreeNode[]) => {
    const lines: React.JSX.Element[] = [];

    // Detect dark mode
    const isDarkMode = typeof window !== 'undefined' &&
      document.documentElement.classList.contains('dark');
    const lineColor = isDarkMode ? '#737373' : '#cbd5e1'; // neutral-500 for dark, slate-200 for light

    const processNode = (node: TreeNode) => {
      // Only draw connections to children if this node is expanded
      if (!expandedNodes.has(node.employee.id)) {
        return;
      }

      node.children.forEach((child) => {
        // Line from parent bottom to child top
        const parentX = node.x;
        const parentY = node.y + 140; // NODE_HEIGHT (total card + avatar height)
        const childX = child.x;
        const childY = child.y;

        // Create path: vertical down from parent, then horizontal, then vertical down to child
        const midY = (parentY + childY) / 2;

        lines.push(
          <path
            key={`${node.employee.id}-${child.employee.id}`}
            d={`M ${parentX} ${parentY} L ${parentX} ${midY} L ${childX} ${midY} L ${childX} ${childY}`}
            stroke={lineColor}
            strokeWidth="1"
            fill="none"
          />
        );

        // Recursively process this child's connections
        processNode(child);
      });
    };

    if (layout.root) {
      processNode(layout.root);
    }

    return lines;
  };

  // Flatten tree nodes for rendering
  const flattenNodes = (node: TreeNode | null, result: TreeNode[] = []): TreeNode[] => {
    if (!node) return result;

    result.push(node);

    if (expandedNodes.has(node.employee.id)) {
      node.children.forEach((child) => flattenNodes(child, result));
    }

    return result;
  };

  const visibleNodes = layout.root ? flattenNodes(layout.root) : [];

  // Calculate view dimensions
  const viewWidth = Math.max(layout.width, 800);
  const viewHeight = Math.max(layout.height, 600);

  if (!layout.root) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <i className="fa-solid fa-users text-4xl mb-4"></i>
          <p>No org chart data available</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden relative"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div
        className="absolute"
        style={{
          transform: `translate(${panX}px, ${panY}px) scale(${zoomLevel})`,
          transformOrigin: '0 0',
          transition: isDragging ? 'none' : 'transform 0.2s ease-out',
        }}
      >
        {/* SVG for connecting lines */}
        <svg
          width={viewWidth}
          height={viewHeight}
          className="absolute top-0 left-0 pointer-events-none"
        >
          {renderConnections(visibleNodes)}
        </svg>

        {/* Render nodes */}
        <div className="relative" style={{ width: viewWidth, height: viewHeight }}>
          {visibleNodes.map((node) => (
            <div
              key={node.employee.id}
              className="absolute"
              style={{
                left: node.x - 92.5, // Half of card width (185 / 2)
                top: node.y,
                pointerEvents: 'auto',
              }}
            >
              <OrgChartNode
                employee={node.employee}
                isSelected={selectedEmployee === node.employee.id}
                isFocused={focusedEmployee === node.employee.id}
                onPinClick={onNodePin}
                onExpandClick={(id) => {
                  console.log('OrgChartTree onExpandClick called with id:', id);
                  onNodeExpand?.(id);
                }}
                onNodeClick={onNodeSelect}
                showPhoto={showPhotos}
                compact={compact}
                isExpanded={expandedNodes.has(node.employee.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
