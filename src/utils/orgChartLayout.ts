import { hierarchy, tree } from 'd3-hierarchy';
import type { HierarchyPointNode } from 'd3-hierarchy';
import type { Employee } from '../data/employees';

// Node spacing constants
const NODE_WIDTH = 185;
const NODE_HEIGHT = 140; // Card + avatar total height
const HORIZONTAL_SPACING = 197; // Card width + 12px gap
const VERTICAL_SPACING = 200; // Space between levels (140 card height + 60px gap)

export interface TreeNode {
  employee: Employee;
  children: TreeNode[];
  x: number;
  y: number;
  level: number;
}

export interface LayoutResult {
  nodes: TreeNode[];
  width: number;
  height: number;
  root: TreeNode | null;
}

interface EmployeeHierarchyNode {
  employee: Employee;
  children?: EmployeeHierarchyNode[];
}

/**
 * Build a tree structure from flat employee data
 */
export function buildEmployeeTree(
  employees: Employee[],
  rootId: number | 'all'
): TreeNode | null {
  // Create a map of employee ID to employee
  const employeeMap = new Map<number, Employee>();
  employees.forEach((emp) => employeeMap.set(emp.id, emp));

  // Find the root employee
  let rootEmployee: Employee | undefined;
  if (rootId === 'all') {
    // Find the CEO (employee with no manager, reportsTo === null)
    rootEmployee = employees.find((emp) => emp.reportsTo === null);
  } else {
    rootEmployee = employeeMap.get(rootId);
  }

  if (!rootEmployee) return null;

  // Recursively build tree
  function buildNode(employee: Employee, level: number): TreeNode {
    const node: TreeNode = {
      employee,
      children: [],
      x: 0,
      y: level * (NODE_HEIGHT + VERTICAL_SPACING),
      level,
    };

    // Find all employees who report to this employee
    const reports = employees.filter((emp) => emp.reportsTo === employee.id);

    node.children = reports.map((emp) => buildNode(emp, level + 1));

    return node;
  }

  return buildNode(rootEmployee, 0);
}

/**
 * Build a tree structure with only visible nodes based on expanded state
 * This creates a tree where only expanded nodes have children included
 */
export function buildVisibleTree(
  employees: Employee[],
  rootId: number | 'all',
  expandedNodes: Set<number>
): TreeNode | null {
  // Create a map of employee ID to employee
  const employeeMap = new Map<number, Employee>();
  employees.forEach((emp) => employeeMap.set(emp.id, emp));

  // Find the root employee
  let rootEmployee: Employee | undefined;
  if (rootId === 'all') {
    rootEmployee = employees.find((emp) => emp.reportsTo === null);
  } else {
    rootEmployee = employeeMap.get(rootId);
  }

  if (!rootEmployee) return null;

  // Recursively build tree, only including children of expanded nodes
  function buildNode(employee: Employee, level: number): TreeNode {
    const node: TreeNode = {
      employee,
      children: [],
      x: 0,
      y: level * (NODE_HEIGHT + VERTICAL_SPACING),
      level,
    };

    // Only add children if this node is expanded
    if (expandedNodes.has(employee.id)) {
      const reports = employees.filter((emp) => emp.reportsTo === employee.id);
      node.children = reports.map((emp) => buildNode(emp, level + 1));
    }

    return node;
  }

  return buildNode(rootEmployee, 0);
}

/**
 * Calculate tree layout using d3-hierarchy's tree layout
 * This produces a tidy tree layout with no overlaps
 */
export function calculateTreeLayout(
  root: TreeNode | null,
  maxDepth: number | 'all' = 'all'
): LayoutResult {
  if (!root) {
    return { nodes: [], width: 0, height: 0, root: null };
  }

  // Convert TreeNode to d3 hierarchy format
  function convertToHierarchy(node: TreeNode): EmployeeHierarchyNode {
    return {
      employee: node.employee,
      children: node.children.length > 0
        ? node.children.map(convertToHierarchy)
        : undefined,
    };
  }

  const hierarchyData = convertToHierarchy(root);
  const rootHierarchy = hierarchy<EmployeeHierarchyNode>(hierarchyData);

  // Create d3 tree layout with very compact spacing
  // Pack siblings tightly (1.0x spacing) and keep subtrees reasonably close (1.3x)
  const treeLayout = tree<EmployeeHierarchyNode>()
    .nodeSize([HORIZONTAL_SPACING, VERTICAL_SPACING])
    .separation((a, b) => (a.parent === b.parent ? 1.0 : 1.3));

  // Calculate layout
  const layoutRoot = treeLayout(rootHierarchy);

  // Convert back to TreeNode format
  const nodes: TreeNode[] = [];
  let minX = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  function convertToTreeNode(
    d3Node: HierarchyPointNode<EmployeeHierarchyNode>,
    level: number
  ): TreeNode {
    const node: TreeNode = {
      employee: d3Node.data.employee,
      x: d3Node.x,
      y: d3Node.y,
      level,
      children: [],
    };

    // Track bounds
    minX = Math.min(minX, d3Node.x);
    maxX = Math.max(maxX, d3Node.x);
    maxY = Math.max(maxY, d3Node.y);

    // Apply depth filtering
    if (maxDepth === 'all' || level < maxDepth) {
      if (d3Node.children) {
        node.children = d3Node.children.map((child) =>
          convertToTreeNode(child, level + 1)
        );
      }
    }

    nodes.push(node);
    return node;
  }

  const newRoot = convertToTreeNode(layoutRoot, 0);

  // Normalize coordinates to start from (0, 0)
  const offsetX = -minX;
  nodes.forEach((node) => {
    node.x += offsetX;
  });

  const width = maxX - minX + NODE_WIDTH;
  const height = maxY + NODE_HEIGHT;

  return {
    nodes,
    width,
    height,
    root: newRoot,
  };
}

/**
 * Filter employees by department
 */
export function filterEmployeesByDepartment(
  employees: Employee[],
  department: string
): Employee[] {
  if (department === 'all') {
    return employees;
  }
  return employees.filter(
    (emp) => emp.department.toLowerCase() === department.toLowerCase()
  );
}

/**
 * Find all descendants of an employee up to a certain depth
 */
export function findDescendants(
  employee: Employee,
  allEmployees: Employee[],
  maxDepth: number | 'all' = 'all'
): Employee[] {
  const descendants: Employee[] = [employee];

  function traverse(emp: Employee, currentDepth: number) {
    if (maxDepth !== 'all' && currentDepth >= maxDepth) {
      return;
    }

    // Find direct reports
    const reports = allEmployees.filter((e) => e.reportsTo === emp.id);

    reports.forEach((report) => {
      descendants.push(report);
      traverse(report, currentDepth + 1);
    });
  }

  traverse(employee, 0);
  return descendants;
}

/**
 * Get the path from root to a specific employee
 */
export function getPathToEmployee(
  root: TreeNode,
  targetId: number
): TreeNode[] | null {
  const path: TreeNode[] = [];

  function search(node: TreeNode): boolean {
    path.push(node);

    if (node.employee.id === targetId) {
      return true;
    }

    for (const child of node.children) {
      if (search(child)) {
        return true;
      }
    }

    path.pop();
    return false;
  }

  return search(root) ? path : null;
}
