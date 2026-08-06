import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MeasurementResult } from '../../types/quantum';

interface MeasurementHistogramProps {
  result: MeasurementResult;
}

export const MeasurementHistogram: React.FC<MeasurementHistogramProps> = ({ result }) => {
  const data = Object.keys(result.probabilities).map(label => ({
    basisState: `|${label}⟩`,
    Theoretical: Number((result.probabilities[label] * 100).toFixed(1)),
    Observed: Number(((result.frequencies[label] || 0) * 100).toFixed(1)),
    Count: result.counts[label] || 0,
  }));

  return (
    <div className="glass-panel p-4 rounded-xl flex flex-col space-y-3">
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">
          Measurement Sampling ({result.shots} Shot{result.shots > 1 ? 's' : ''})
        </h4>
        <span className="text-xs bg-purple-950 text-purple-300 border border-purple-800 px-2 py-0.5 rounded font-mono">
          Seedable PRNG Simulation
        </span>
      </div>

      <div className="h-56 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="basisState" stroke="#9ca3af" fontSize={12} tickLine={false} />
            <YAxis stroke="#9ca3af" fontSize={12} unit="%" domain={[0, 100]} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '0.5rem', color: '#fff' }}
              formatter={(value: any, name: any) => [`${value}%`, name]}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
            <Bar dataKey="Theoretical" fill="#38bdf8" radius={[4, 4, 0, 0]} name="Theoretical Prob (%)" />
            <Bar dataKey="Observed" fill="#a855f7" radius={[4, 4, 0, 0]} name="Observed Freq (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Counts Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono pt-1">
        {data.map(item => (
          <div key={item.basisState} className="bg-gray-900/80 p-2 rounded border border-gray-800 text-center">
            <span className="text-gray-400 block">{item.basisState} Count</span>
            <span className="text-cyan-300 text-sm font-bold">{item.Count}</span>
            <span className="text-gray-500 block text-[10px]">({item.Observed}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};
