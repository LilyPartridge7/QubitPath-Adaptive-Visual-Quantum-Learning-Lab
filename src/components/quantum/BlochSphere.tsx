import React from 'react';
import { Complex, magnitude, phase } from '../../lib/quantum/complex';

interface BlochSphereProps {
  alpha: Complex;
  beta: Complex;
  size?: number;
  interactive?: boolean;
  onStateChange?: (alpha: Complex, beta: Complex) => void;
}

export const BlochSphere: React.FC<BlochSphereProps> = ({
  alpha,
  beta,
  size = 280,
  interactive = false,
  onStateChange,
}) => {
  // Normalize if needed
  const norm = Math.sqrt(magnitude(alpha) ** 2 + magnitude(beta) ** 2) || 1;
  const aNorm = { re: alpha.re / norm, im: alpha.im / norm };
  const bNorm = { re: beta.re / norm, im: beta.im / norm };

  const magA = magnitude(aNorm);
  const magB = magnitude(bNorm);

  // θ is 2 * acos(|α|)
  const theta = 2 * Math.acos(Math.min(1, Math.max(0, magA)));
  // Relative phase φ = phase(β) - phase(α)
  const phi = phase(bNorm) - phase(aNorm);

  // 3D Cartesian coordinates on unit sphere
  const x3d = Math.sin(theta) * Math.cos(phi);
  const y3d = Math.sin(theta) * Math.sin(phi);
  const z3d = Math.cos(theta); // +1 at |0⟩, -1 at |1⟩

  // Isometric orthographic projection onto 2D SVG
  // Project (x, y, z) to (svgX, svgY)
  const radius = size * 0.38;
  const cx = size / 2;
  const cy = size / 2;

  // Projection angles
  const projX = cx + radius * (x3d * 0.85 - y3d * 0.45);
  const projY = cy - radius * (z3d * 0.85 - y3d * 0.25);

  const handleThetaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onStateChange) return;
    const newThetaDeg = parseFloat(e.target.value);
    const newThetaRad = (newThetaDeg * Math.PI) / 180;
    const newMagA = Math.cos(newThetaRad / 2);
    const newMagB = Math.sin(newThetaRad / 2);

    const newAlpha = { re: newMagA, im: 0 };
    const newBeta = { re: newMagB * Math.cos(phi), im: newMagB * Math.sin(phi) };
    onStateChange(newAlpha, newBeta);
  };

  const handlePhiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onStateChange) return;
    const newPhiDeg = parseFloat(e.target.value);
    const newPhiRad = (newPhiDeg * Math.PI) / 180;

    const newAlpha = { re: magA, im: 0 };
    const newBeta = { re: magB * Math.cos(newPhiRad), im: magB * Math.sin(newPhiRad) };
    onStateChange(newAlpha, newBeta);
  };

  return (
    <div className="flex flex-col items-center justify-center p-3 glass-panel rounded-xl">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <radialGradient id="sphereGrad" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0.15)" />
              <stop offset="100%" stopColor="rgba(17, 24, 39, 0.8)" />
            </radialGradient>
            <linearGradient id="vectorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>

          {/* Sphere Body */}
          <circle cx={cx} cy={cy} r={radius} fill="url(#sphereGrad)" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1.5" />

          {/* Equator Ellipse */}
          <ellipse cx={cx} cy={cy} rx={radius * 0.9} ry={radius * 0.3} fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="3,3" />

          {/* Z-Axis (Vertical |0⟩ to |1⟩) */}
          <line x1={cx} y1={cy - radius - 12} x2={cx} y2={cy + radius + 12} stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" />

          {/* Axis Labels */}
          <text x={cx} y={cy - radius - 16} fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">
            |0⟩ (+Z)
          </text>
          <text x={cx} y={cy + radius + 26} fill="#a855f7" fontSize="14" fontWeight="bold" textAnchor="middle">
            |1⟩ (-Z)
          </text>

          {/* Equator Labels (+X, -X, +Y) */}
          <text x={cx + radius * 0.9 + 12} y={cy + 4} fill="rgba(255, 255, 255, 0.6)" fontSize="11" textAnchor="start">
            |+⟩ (+X)
          </text>
          <text x={cx - radius * 0.9 - 12} y={cy + 4} fill="rgba(255, 255, 255, 0.6)" fontSize="11" textAnchor="end">
            |−⟩ (-X)
          </text>

          {/* State Vector Line */}
          <line x1={cx} y1={cy} x2={projX} y2={projY} stroke="url(#vectorGrad)" strokeWidth="3.5" strokeLinecap="round" />

          {/* State Vector Tip Marker */}
          <circle cx={projX} cy={projY} r="6" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />

          {/* Origin Point */}
          <circle cx={cx} cy={cy} r="3" fill="rgba(255,255,255,0.5)" />
        </svg>

        {/* State Label overlay */}
        <div className="absolute bottom-2 left-2 bg-gray-900/80 backdrop-blur px-2 py-1 rounded text-xs border border-cyan-500/30">
          <span className="text-cyan-400 font-mono">θ = {((theta * 180) / Math.PI).toFixed(1)}°</span>
          <span className="text-purple-400 font-mono ml-2">φ = {((((phi % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) * 180 / Math.PI).toFixed(1)}°</span>
        </div>
      </div>

      {interactive && (
        <div className="w-full mt-3 space-y-2 text-xs">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-300">Superposition Angle (θ):</span>
              <span className="text-cyan-400 font-mono">{((theta * 180) / Math.PI).toFixed(0)}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="180"
              value={(theta * 180) / Math.PI}
              onChange={handleThetaChange}
              className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-300">Relative Phase Angle (φ):</span>
              <span className="text-purple-400 font-mono">{((((phi % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) * 180 / Math.PI).toFixed(0)}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={((((phi % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) * 180) / Math.PI}
              onChange={handlePhiChange}
              className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-400"
            />
          </div>
        </div>
      )}
    </div>
  );
};
