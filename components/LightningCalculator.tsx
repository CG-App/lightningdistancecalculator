'use client'
import { useState } from 'react'

const M_PER_S = 343
const M_PER_MILE = 1609.344
const M_PER_KM = 1000

const toDist = (s: number, u: 'mi' | 'km') =>
  (s * M_PER_S) / (u === 'mi' ? M_PER_MILE : M_PER_KM)

export default function LightningCalculator() {
  const [t, setT] = useState(0)
  const [u, setU] = useState<'mi' | 'km'>('mi')

  return (
    <div className="grid gap-3 max-w-md">
      <label className="grid gap-1">
        <span className="text-sm text-gray-600">Elapsed Time (s)</span>
        <input
          type="number"
          step="0.1"
          value={t}
          onChange={(e) => setT(parseFloat(e.target.value) || 0)}
          className="w-full rounded-lg border px-3 py-2"
        />
      </label>

      <label className="grid gap-1">
        <span className="text-sm text-gray-600">Units</span>
        <select
          value={u}
          onChange={(e) => setU(e.target.value as any)}
          className="w-full rounded-lg border px-3 py-2"
        >
          <option value="mi">Miles</option>
          <option value="km">Kilometers</option>
        </select>
      </label>

      <div className="text-lg font-semibold">
        Estimated Distance: {toDist(t, u).toFixed(2)} {u.toUpperCase()}
      </div>

      <p className="text-xs text-gray-500">
        <strong>Disclaimer:</strong> Uses speed of sound (~343 m/s). Conditions vary; don’t
        use for safety-critical decisions.
      </p>
    </div>
  )
}
