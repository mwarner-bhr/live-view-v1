import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import type { Employee } from '../../data/employees';
import { OrgChartTree } from './OrgChartTree';
import { OrgChartControls } from './OrgChartControls';
import { OrgChartZoom } from './OrgChartZoom';
import { Card } from '../Card';

interface OrgChartViewProps {
  employees: Employee[];
}

export function OrgChartView({ employees }: OrgChartViewProps) {
  // Local state for UI
  const canvasRef = useRef<HTMLDivElement>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<number | undefined>();

  // Track the root of the visible tree (who appears at top)
  const [rootEmployee, setRootEmployee] = useState<number | 'all'>(() => {
    const ceo = employees.find((emp) => emp.reportsTo === null);
    return ceo ? ceo.id : 'all';
  });

  // Initialize expanded nodes to show CEO's direct reports
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(() => {
    const ceo = employees.find((emp) => emp.reportsTo === null);
    return new Set(ceo ? [ceo.id] : []);
  });

  // Helper: get direct reports of an employee
  const getDirectReports = useCallback((employeeId: number) => {
    return employees.filter(e => e.reportsTo === employeeId);
  }, [employees]);

  // Helper: expand all nodes to a given depth from root
  const expandToDepth = useCallback((rootId: number, targetDepth: number | 'all') => {
    const newExpanded = new Set<number>();

    const expandLevel = (id: number, currentDepth: number) => {
      const reports = getDirectReports(id);
      if (reports.length === 0) return;

      if (targetDepth === 'all' || currentDepth < targetDepth) {
        newExpanded.add(id);
        reports.forEach(report => {
          expandLevel(report.id, currentDepth + 1);
        });
      }
    };

    expandLevel(rootId, 0);
    return newExpanded;
  }, [getDirectReports]);

  // Calculate current visible depth from expanded nodes
  const currentDepth = useMemo(() => {
    if (typeof rootEmployee !== 'number') return 1;

    let maxDepth = 0;

    const measureDepth = (id: number, depth: number) => {
      if (!expandedNodes.has(id)) {
        maxDepth = Math.max(maxDepth, depth);
        return;
      }

      const reports = getDirectReports(id);
      if (reports.length === 0) {
        maxDepth = Math.max(maxDepth, depth);
        return;
      }

      reports.forEach(report => {
        measureDepth(report.id, depth + 1);
      });
    };

    measureDepth(rootEmployee, 0);
    return maxDepth || 1;
  }, [rootEmployee, expandedNodes, getDirectReports]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Center the tree on initial mount
  useEffect(() => {
    if (canvasRef.current && !isInitialized) {
      const rect = canvasRef.current.getBoundingClientRect();
      // Estimate tree width around 800px, center it
      const estimatedTreeWidth = 800;
      const centerX = (rect.width - estimatedTreeWidth) / 2;
      setPanX(Math.max(centerX, 50));
      setPanY(50);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Handle node expansion
  const handleNodeExpand = (id: number) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNodes(newExpanded);
  };

  // Handle node click: select the node and expand it to show direct reports
  // Keep ancestors open, close siblings (accordion behavior)
  const handleNodeClick = (id: number) => {
    setSelectedEmployee(id);

    // Build new expanded set
    const newExpanded = new Set<number>();

    // Get all ancestors of the clicked node (path from CEO to clicked node)
    const clickedEmployee = employees.find(e => e.id === id);
    if (clickedEmployee) {
      let currentId: number | null = clickedEmployee.reportsTo;
      while (currentId !== null) {
        newExpanded.add(currentId);
        const manager = employees.find((e) => e.id === currentId);
        currentId = manager?.reportsTo ?? null;
      }
    }

    // Expand the newly clicked node if it has direct reports
    if (clickedEmployee && clickedEmployee.directReports > 0) {
      newExpanded.add(id);
    }

    setExpandedNodes(newExpanded);
  };

  // Handle jump to employee - make them the root of the visible tree
  const handleEmployeeJump = (id: number) => {
    setSelectedEmployee(id);
    setRootEmployee(id);

    // Only expand the target employee to show their direct reports
    const newExpanded = new Set<number>();
    const targetEmployee = employees.find(e => e.id === id);

    if (targetEmployee && targetEmployee.directReports > 0) {
      newExpanded.add(id);
    }

    setExpandedNodes(newExpanded);

    // Center the view - employee will be at top center
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const estimatedTreeWidth = 185; // Single node width initially
      const centerX = (rect.width - estimatedTreeWidth) / 2;
      setPanX(Math.max(centerX, 50));
      setPanY(50);
    }
  };

  // Handle depth change - expand/collapse to match selected depth
  const handleDepthChange = (newDepth: number | 'all') => {
    if (typeof rootEmployee === 'number') {
      const newExpanded = expandToDepth(rootEmployee, newDepth);
      setExpandedNodes(newExpanded);
    }
  };

  // Handle go up (navigate to parent of current root)
  const handleGoUp = () => {
    if (typeof rootEmployee === 'number') {
      const currentRoot = employees.find(e => e.id === rootEmployee);
      if (currentRoot?.reportsTo) {
        handleEmployeeJump(currentRoot.reportsTo);
      }
    }
  };

  // Handle filter open (placeholder)
  const handleFilterOpen = () => {
    console.log('Filter menu opened');
    // Future: open filter modal/dropdown
  };

  // Handle export open (placeholder)
  const handleExportOpen = () => {
    console.log('Export menu opened');
    // Future: open export modal with PNG/PDF options
  };

  // Handle zoom
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.5));
  };

  // Handle pan
  const handlePanChange = (x: number, y: number) => {
    setPanX(x);
    setPanY(y);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Controls Bar */}
      <OrgChartControls
        employees={employees}
        depth={currentDepth}
        onDepthChange={handleDepthChange}
        onEmployeeJump={handleEmployeeJump}
        onGoUp={handleGoUp}
        onFilterOpen={handleFilterOpen}
        onExportOpen={handleExportOpen}
      />

      {/* Main Canvas */}
      <Card className="flex-1 relative overflow-hidden">
        <div
          ref={canvasRef}
          className="w-full h-full relative overflow-hidden"
        >
          <OrgChartTree
            employees={employees}
            rootEmployee={rootEmployee}
            depth="all"
            focusedEmployee={undefined}
            selectedEmployee={selectedEmployee}
            expandedNodes={expandedNodes}
            onNodeSelect={handleNodeClick}
            onNodeExpand={handleNodeExpand}
            onNodePin={() => {}} // No-op for pin functionality
            showPhotos={true}
            compact={false}
            zoomLevel={zoomLevel}
            panX={panX}
            panY={panY}
            onPanChange={handlePanChange}
            onZoomChange={setZoomLevel}
          />

          {/* Zoom Controls */}
          <OrgChartZoom
            zoomLevel={zoomLevel}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
          />
        </div>
      </Card>
    </div>
  );
}
