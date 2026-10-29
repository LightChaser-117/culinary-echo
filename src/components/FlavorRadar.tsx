import React from 'react';
import { FlavorRadarData } from '../types';

interface FlavorRadarProps {
  data: FlavorRadarData;
  referenceData?: FlavorRadarData;
  size?: number;
  label?: string;
  referenceLabel?: string;
}

const AXES: { key: keyof FlavorRadarData; label: string }[] = [
  { key: 'umami', label: 'Umami' },
  { key: 'sweetness', label: 'Sweet' },
  { key: 'acidity', label: 'Acidity' },
  { key: 'salinity', label: 'Salinity' },
  { key: 'bitterness', label: 'Bitter' },
  { key: 'pungency', label: 'Pungency' },
  { key: 'aromaIntensity', label: 'Aroma' },
  { key: 'kokumi', label: 'Kokumi' },
];

export const FlavorRadar: React.FC<FlavorRadarProps> = ({
  data,
  referenceData,
  size = 280,
  label = 'Current Profile',
  referenceLabel = 'Ancestor Baseline',
}) => {
  const center = size / 2;
  const radius = size * 0.38;
  const totalAxes = AXES.length;

  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = (Math.min(Math.max(value, 0), 10) / 10) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const currentPoints = AXES.map((axis, i) => {
    const { x, y } = getCoordinates(data[axis.key], i);
    return `${x},${y}`;
  }).join(' ');

  const referencePoints = referenceData
    ? AXES.map((axis, i) => {
        const { x, y } = getCoordinates(referenceData[axis.key], i);
        return `${x},${y}`;
      }).join(' ')
    : null;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Concentric rings */}
        {[0.25, 0.5, 0.75, 1.0].map((level, ringIdx) => (
          <circle
            key={ringIdx}
            cx={center}
            cy={center}
            r={radius * level}
            fill="none"
            stroke="#E7E5E4"
            strokeWidth="1"
            strokeDasharray={level === 1.0 ? 'none' : '3 3'}
          />
        ))}

        {/* Axis spokes and text labels */}
        {AXES.map((axis, i) => {
          const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
          const outerX = center + radius * Math.cos(angle);
          const outerY = center + radius * Math.sin(angle);
          const labelDist = radius + 20;
          const labelX = center + labelDist * Math.cos(angle);
          const labelY = center + labelDist * Math.sin(angle);

          return (
            <g key={axis.key}>
              <line
                x1={center}
                y1={center}
                x2={outerX}
                y2={outerY}
                stroke="#E7E5E4"
                strokeWidth="1"
              />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[10px] font-mono uppercase tracking-wider fill-stone-500 select-none"
              >
                {axis.label}
              </text>
            </g>
          );
        })}

        {/* Reference polygon (if provided) */}
        {referencePoints && (
          <polygon
            points={referencePoints}
            fill="rgba(120, 113, 108, 0.12)"
            stroke="#78716C"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
        )}

        {/* Current profile polygon */}
        <polygon
          points={currentPoints}
          fill="rgba(180, 83, 9, 0.22)"
          stroke="#B45309"
          strokeWidth="2"
        />

        {/* Current profile dots */}
        {AXES.map((axis, i) => {
          const { x, y } = getCoordinates(data[axis.key], i);
          return (
            <circle
              key={axis.key}
              cx={x}
              cy={y}
              r="3.5"
              fill="#B45309"
              stroke="#FFF"
              strokeWidth="1"
            />
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-3 text-xs text-stone-600">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-amber-700" />
          <span>{label}</span>
        </div>
        {referenceData && (
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm border border-dashed border-stone-500 bg-stone-200" />
            <span>{referenceLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
};
