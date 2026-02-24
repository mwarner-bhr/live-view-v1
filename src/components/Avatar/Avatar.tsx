interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large' | 40;
  className?: string;
}

const sizeMap = {
  small: 32,
  40: 40,
  medium: 48,
  large: 96,
};

const radiusMap = {
  small: 'var(--radius-xx-small)',
  40: 'var(--radius-xx-small)',
  medium: 'var(--radius-x-small)',
  large: 'var(--radius-medium)',
};

export function Avatar({ src, alt = '', size = 'medium', className = '' }: AvatarProps) {
  const pixelSize = sizeMap[size];
  const radius = radiusMap[size];

  // Default placeholder image
  const placeholderSrc = 'https://via.placeholder.com/96x96.png?text=User';

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{
        width: pixelSize,
        height: pixelSize,
        borderRadius: radius,
        boxShadow: 'var(--shadow-100)',
      }}
    >
      <img
        src={src || placeholderSrc}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ borderRadius: radius }}
      />
    </div>
  );
}

export default Avatar;
