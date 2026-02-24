import { Icon } from '../Icon';

interface OrgChartZoomProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  minZoom?: number;
  maxZoom?: number;
}

export function OrgChartZoom({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  minZoom = 0.5,
  maxZoom = 2,
}: OrgChartZoomProps) {
  const canZoomIn = zoomLevel < maxZoom;
  const canZoomOut = zoomLevel > minZoom;

  return (
    <div className="absolute right-6 top-6 flex flex-col gap-2 z-10">
      {/* Zoom In */}
      <button
        onClick={onZoomIn}
        disabled={!canZoomIn}
        className="w-12 h-12 rounded-full bg-white dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 flex items-center justify-center transition-all
                   shadow-sm hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Zoom in"
      >
        <Icon name="zoom-in" size={20} className="text-gray-700 dark:text-neutral-300" />
      </button>

      {/* Zoom Out */}
      <button
        onClick={onZoomOut}
        disabled={!canZoomOut}
        className="w-12 h-12 rounded-full bg-white dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 flex items-center justify-center transition-all
                   shadow-sm hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Zoom out"
      >
        <Icon name="zoom-out" size={20} className="text-gray-700 dark:text-neutral-300" />
      </button>
    </div>
  );
}
