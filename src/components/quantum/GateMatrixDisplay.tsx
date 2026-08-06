import React from 'react';
import { GateType } from '../../types/quantum';
import { GATES } from '../../lib/quantum/simulator';
import { formatComplex } from '../../lib/quantum/complex';

interface GateMatrixDisplayProps {
  gateType: GateType;
  selected?: boolean;
  onClick?: () => void;
}

export const GateMatrixDisplay: React.FC<GateMatrixDisplayProps> = ({
  gateType,
  selected = false,
  onClick,
}) => {
  const gateInfo = GATES[gateType];

  return (
    <div
      onClick={onClick}
      className={`glass-panel-interactive p-3 rounded-xl flex flex-col space-y-2 cursor-pointer transition-all ${
        selected ? 'border-cyan-400 glow-cyan bg-cyan-950/30' : 'hover:border-gray-700'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-bold text-sm text-cyan-300">{gateInfo.name}</span>
        <span className="text-[10px] bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded font-mono">
          {gateType}
        </span>
      </div>

      {/* Matrix Box */}
      <div className="bg-gray-950 p-2 rounded border border-gray-800 flex items-center justify-center font-mono text-xs">
        <span className="text-gray-500 mr-2">[</span>
        <div className="flex flex-col space-y-1 text-center">
          {gateInfo.matrix.map((row, rIdx) => (
            <div key={rIdx} className="flex space-x-3 justify-center text-cyan-200">
              {row.map((cell, cIdx) => (
                <span key={cIdx} className="w-12 text-center">
                  {formatComplex(cell, 2)}
                </span>
              ))}
            </div>
          ))}
        </div>
        <span className="text-gray-500 ml-2">]</span>
      </div>

      <p className="text-[11px] text-gray-400 leading-snug">{gateInfo.description}</p>
    </div>
  );
};
