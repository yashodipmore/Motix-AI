import React from 'react';

interface GaugeProps {
  value: number;
  min: number;
  max: number;
  label: string;
  unit: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Gauge: React.FC<GaugeProps> = ({ 
  value, 
  min, 
  max, 
  label, 
  unit, 
  color = '#3B82F6',
  size = 'md' 
}) => {
  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
  const angle = (percentage / 100) * 180 - 90;
  
  const sizes = {
    sm: { width: 120, height: 80, strokeWidth: 8, textSize: 'text-sm' },
    md: { width: 160, height: 100, strokeWidth: 10, textSize: 'text-base' },
    lg: { width: 200, height: 120, strokeWidth: 12, textSize: 'text-lg' }
  };

  const { width, height, strokeWidth, textSize } = sizes[size];
  const radius = (width - strokeWidth) / 2;
  const circumference = Math.PI * radius;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width, height }}>
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="transform rotate-180"
        >
          {/* Background arc */}
          <path
            d={`M ${strokeWidth/2} ${height - strokeWidth/2} A ${radius} ${radius} 0 0 1 ${width - strokeWidth/2} ${height - strokeWidth/2}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress arc */}
          <path
            d={`M ${strokeWidth/2} ${height - strokeWidth/2} A ${radius} ${radius} 0 0 1 ${width - strokeWidth/2} ${height - strokeWidth/2}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * percentage) / 100}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Value display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`font-bold text-gray-900 dark:text-white ${textSize}`}>
            {value.toFixed(1)}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{unit}</div>
        </div>
      </div>
      <div className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">{label}</div>
    </div>
  );
};

export default Gauge;