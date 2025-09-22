// file: components/LightningDistanceCalculator.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Lightning Distance Calculator – React Widget (lightweight)
 * Integration notes for Next.js App Router:
 * - Marked as a client component.
 * - No UI or calculation logic changed (apart from dark-mode card color you requested).
 */

// ---------------- Helpers (pure) ----------------
function formatSmart(val: number): string {
  if (!Number.isFinite(val)) return "-";
  if (val < 1000) return val.toFixed(2);
  return Math.round(val).toLocaleString();
}
function milesFromSeconds(seconds: number): number { return seconds / 5; }
function kmFromSeconds(seconds: number): number { return seconds / 3; }
function isValidSeconds(n: number): boolean { return Number.isFinite(n) && n > 0; }
function fixedWindowAverage(values: number[], windowSize = 3): number {
  if (!values.length) return NaN;
  const slice = values.slice(-windowSize);
  return slice.reduce((a, b) => a + b, 0) / slice.length;
}
function trendFromSeries(values: number[], deadbandMi = 0.1): "closer" | "further" | "steady" | "insufficient" {
  if (values.length < 2) return "insufficient";
  const a = values[values.length - 2];
  const b = values[values.length - 1];
  if (!Number.isFinite(a) || !Number.isFinite(b)) return "insufficient";
  if (b < a - deadbandMi) return "closer";
  if (b > a + deadbandMi) return "further";
  return "steady";
}

// ---------------- Unit metadata ----------------
export type UnitKey = "mi" | "km" | "m" | "yd" | "ft" | "in";
const UNIT_META: Record<UnitKey, { label: string; abbr: string; fromMiles: (mi: number) => number }> = {
  mi: { label: "Miles",      abbr: "mi", fromMiles: (mi) => mi },
  km: { label: "Kilometers", abbr: "km", fromMiles: (mi) => mi * 1.609344 },
  m:  { label: "Meters",     abbr: "m",  fromMiles: (mi) => mi * 1609.344 },
  yd: { label: "Yards",      abbr: "yd", fromMiles: (mi) => mi * 1760 },
  ft: { label: "Feet",       abbr: "ft", fromMiles: (mi) => mi * 5280 },
  in: { label: "Inches",     abbr: "in", fromMiles: (mi) => mi * 63360 },
};

export type LightningCalcProps = {
  defaultUnits?: UnitKey;
  trendDeadbandMi?: number;
};

export default function LightningDistanceCalculator({
  defaultUnits = "mi",
  trendDeadbandMi = 0.1,
}: LightningCalcProps) {
  // ---------------- State ----------------
  const [units, setUnits] = useState<UnitKey>(defaultUnits);
  const [secondsInput, setSecondsInput] = useState<string>("");
  const [isTiming, setIsTiming] = useState<boolean>(false);
  const [liveElapsed, setLiveElapsed] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [revealBanner, setRevealBanner] = useState<boolean>(false);
  const [runsMi, setRunsMi] = useState<number[]>([]);
  const [showCongrats, setShowCongrats] = useState<boolean>(false);
  const [hasShownCongrats, setHasShownCongrats] = useState<boolean>(false);
  const [showWhy, setShowWhy] = useState<boolean>(false);

  const lastLoggedSecondsRef = useRef<number | null>(null);
  const tickRef = useRef<number | null>(null);
  const t0Ref = useRef<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Scroll input into view on focus (mobile keyboards)
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    const handler = () => el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.addEventListener("focus", handler);
    return () => el.removeEventListener("focus", handler);
  }, []);

  // ---------------- Derived values ----------------
  const seconds = useMemo<number>(() => {
    const manual = parseFloat(secondsInput);
    if (!isNaN(manual)) return manual;
    return isTiming ? liveElapsed : NaN;
  }, [secondsInput, isTiming, liveElapsed]);

  const miles = useMemo<number>(() => (Number.isFinite(seconds) ? milesFromSeconds(seconds) : NaN), [seconds]);

  const display = useMemo<string>(() => {
    if (!Number.isFinite(miles)) return "-";
    const u = UNIT_META[units];
    const val = u.fromMiles(miles);
    return `${formatSmart(val)} ${u.label} Away`;
  }, [units, miles]);

  const avgMi = useMemo<number>(() => fixedWindowAverage(runsMi, 3), [runsMi]);
  const avgDisplay = useMemo<string>(() => {
    if (!Number.isFinite(avgMi)) return "-";
    const u = UNIT_META[units];
    return `${formatSmart(u.fromMiles(avgMi))} ${u.label} Away`;
  }, [avgMi, units]);

  const trend = useMemo(() => trendFromSeries(runsMi, trendDeadbandMi), [runsMi, trendDeadbandMi]);

  function classifySafety(mi: number): "danger" | "warning" | "caution" | "clear" {
    if (!Number.isFinite(mi)) return "clear";
    if (mi < 6) return "danger";
    if (mi < 10) return "warning";
    if (mi < 15) return "caution";
    return "clear";
  }
  const safety = useMemo(() => classifySafety(miles), [miles]);

  // ---------------- Effects ----------------
  useEffect(() => () => { if (tickRef.current) window.clearInterval(tickRef.current); }, []);

  useEffect(() => {
    if (secondsInput && !isTiming) {
      const v = parseFloat(secondsInput);
      if (isValidSeconds(v)) {
        setShowResult(true);
        logRunIfNeeded(v);
      }
    }
  }, [secondsInput, isTiming]);

  useEffect(() => {
    if (showResult) {
      const id = window.setTimeout(() => setRevealBanner(true), 120);
      return () => window.clearTimeout(id);
    } else {
      setRevealBanner(false);
    }
  }, [showResult]);

  // ---------------- Controls ----------------
  const onSecondsChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "") { setSecondsInput(""); setShowResult(false); return; }
    const v = parseFloat(raw);
    if (isValidSeconds(v)) { setSecondsInput(raw); if (!isTiming) setShowResult(true); }
    else { setSecondsInput(""); setShowResult(false); }
  }, [isTiming]);

  function startTimer() {
    if (tickRef.current) window.clearInterval(tickRef.current);
    if (runsMi.length >= 5 && !hasShownCongrats) {
      setShowCongrats(true);
      setHasShownCongrats(true);
      window.setTimeout(() => setShowCongrats(false), 6000);
    }
    setIsTiming(true);
    setShowResult(false);
    setSecondsInput("");
    t0Ref.current = performance.now();
    tickRef.current = window.setInterval(() => {
      const now = performance.now();
      setLiveElapsed((now - t0Ref.current) / 1000);
    }, 50);
  }

  function logRunIfNeeded(sec: number) {
    if (!isValidSeconds(sec)) return;
    if (lastLoggedSecondsRef.current !== null && Math.abs(sec - lastLoggedSecondsRef.current) < 1e-9) return;
    const dMi = milesFromSeconds(sec);
    setRunsMi((prev) => [...prev, dMi]);
    lastLoggedSecondsRef.current = sec;
  }

  function stopTimer() {
    if (tickRef.current) window.clearInterval(tickRef.current);
    tickRef.current = null;
    setIsTiming(false);
    const sec = Number(liveElapsed.toFixed(2));
    setSecondsInput(String(sec));
    setShowResult(true);
    logRunIfNeeded(sec);
  }

  function resetAll() {
    if (tickRef.current) window.clearInterval(tickRef.current);
    tickRef.current = null;
    setIsTiming(false);
    setLiveElapsed(0);
    setSecondsInput("");
    setShowResult(false);
    setRunsMi([]);
    lastLoggedSecondsRef.current = null;
    setShowCongrats(false);
  }

  function handleUnitSwitch(newUnit: UnitKey) {
    setUnits(newUnit);
    resetAll();
    setHasShownCongrats(false);
  }

  // ---------------- UI helpers ----------------
  const hasDistance = Number.isFinite(miles);
  const trendLabel = trend === "closer" ? "Getting Closer" : trend === "further" ? "Moving Away" : trend === "steady" ? "Holding Steady" : "Need More Data";
  const trendColor = trend === "closer" ? "text-red-700" : trend === "further" ? "text-green-700" : trend === "steady" ? "text-gray-700" : "text-gray-500";
  const trendIcon = (
    trend === "closer" ? (
      <svg viewBox='0 0 24 24' className='h-4 w-4' fill='none' aria-hidden>
        <path d='M4 14l6-6 4 4 6-6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      </svg>
    ) : trend === "further" ? (
      <svg viewBox='0 0 24 24' className='h-4 w-4' fill='none' aria-hidden>
        <path d='M4 10l6 6 4-4 6 6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      </svg>
    ) : (
      <svg viewBox='0 0 24 24' className='h-4 w-4' fill='none' aria-hidden>
        <path d='M4 12h16' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      </svg>
    )
  );

  // ---------------- Render ----------------
  return (
    <div className="min-h-screen flex items-start justify-center py-6 sm:py-12">
      <div className="mx-auto w-full max-w-xl p-5 sm:p-8 md:p-8 rounded-2xl border border-gray-200 shadow-xl bg-white/90 dark:bg-[#636363] text-gray-900 dark:text-white">
        {/* Title */}
        <div className='flex items-center justify-between gap-3'>
          <h2 className='mt-1 mb-5 m-0 text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2'><span aria-hidden>⚡</span><span>Lightning Distance Calculator</span></h2>
        </div>

        {/* Description or banner with fade+slide swap */}
        <div className='relative grid place-items-center min-h-[56px] sm:min-h-[64px]'>
          <div className={`absolute inset-0 flex items-center justify-center motion-safe:transition-all motion-safe:duration-300 ease-out ${showCongrats ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
            <div className='w-full inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-100 text-indigo-900 font-semibold shadow-sm text-center text-sm justify-center overflow-hidden whitespace-normal break-words'>
              <span className='truncate'>⭐ You&apos;re a Storm Watcher!</span>
              <button onClick={() => setShowCongrats(false)} className='ml-2 text-indigo-700 hover:underline text-xs flex-shrink-0' aria-label='Dismiss banner'>Dismiss</button>
            </div>
          </div>
          <p className={`text-sm sm:text-base text-gray-600 text-center motion-safe:transition-all motion-safe:duration-300 ease-out ${showCongrats ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
            Tap <strong>Start</strong> when you see lightning, <strong>Stop</strong> when you hear thunder. Repeat to track the storm&apos;s trend.
          </p>
        </div>

        {/* Controls row */}
        <div className='mt-4 flex flex-wrap items-center gap-2'>
          {!isTiming ? (
            <button onClick={startTimer} className='px-6 py-3 sm:px-5 sm:py-2.5 rounded-xl bg-emerald-600 text-white font-semibold shadow-sm active:scale-[.99] whitespace-nowrap'>Start</button>
          ) : (
            <button onClick={stopTimer} className='px-6 py-3 sm:px-5 sm:py-2.5 rounded-xl bg-rose-600 text-white font-semibold shadow-sm active:scale-[.99] whitespace-nowrap'>Stop</button>
          )}
          {/* Units dropdown */}
          <label className='ml-auto inline-flex items-center gap-2 max-[360px]:w-full max-[360px]:justify-end max-[360px]:mt-2'>
            <span className='sr-only'>Units</span>
            <select
              value={units}
              onChange={(e) => handleUnitSwitch(e.target.value as UnitKey)}
              className='px-3 py-1.5 rounded-xl border border-gray-900 bg-black text-white text-sm text-[16px] leading-[1.2] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black'
              aria-label='Units'
            >
              {Object.entries(UNIT_META).map(([key, u]) => (
                <option key={key} value={key} className='bg-black text-white'>{u.label}</option>
              ))}
            </select>
          </label>
        </div>

        {/* Manual input */}
        <label className='block mt-4'>
          <span className='block text-xs sm:text-sm text-gray-500 mb-1'>Or enter seconds (flash → boom)</span>
          <input
            ref={inputRef}
            type='number'
            inputMode='decimal'
            min={0.01}
            step='0.01'
            placeholder='e.g., 12.30'
            value={secondsInput}
            onChange={onSecondsChange}
            className='w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 truncate text-[16px]'
          />
        </label>

        {/* Output Card */}
        {hasDistance && (
          <div
            className={[
              'mt-4 p-4 rounded-2xl border motion-safe:transition-colors motion-safe:duration-300',
              safety === 'danger' && 'bg-red-50 border-red-200',
              safety === 'warning' && 'bg-orange-100 border-orange-200',
              safety === 'caution' && 'bg-yellow-50 border-yellow-200',
              safety === 'clear' && 'bg-green-50 border-green-200',
            ].filter(Boolean).join(' ')}
            aria-live='polite'
          >
            <div className='flex items-baseline justify-between gap-3'>
              <strong className='text-xl sm:text-2xl truncate w-full text-center block text-indigo-700'>Strike Distance</strong>
            </div>
            <div className='mt-1 font-semibold tabular-nums text-center w-full text-lg sm:text-xl text-indigo-700'>{display}</div>

            {/* Aggregates */}
            {runsMi.length >= 2 && (
              <div className='mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm'>
                <div className='rounded-xl border border-gray-200 bg-white/60 px-3 py-2 text-center'>
                  <div className='text-gray-500 text-center'>Recent Average</div>
                  <div className='font-semibold tabular-nums text-center text-[1rem] sm:text-[1.125rem]'>{avgDisplay}</div>
                </div>
                <div className='rounded-xl border border-gray-200 bg-white/60 px-3 py-2 text-center'>
                  <div className='text-gray-500 text-center'>Storm Trend</div>
                  <div className={['flex justify-center items-center gap-2 font-semibold text-center text-[1rem] sm:text-[1.125rem]', trendColor].join(' ')}>{trendIcon} {trendLabel}</div>
                </div>
              </div>
            )}

            {/* Advisory banner, revealed after confirmation */}
            <div
              className={[
                'mt-3 transform motion-safe:transition-all motion-safe:duration-300 ease-out',
                revealBanner ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none select-none',
              ].join(' ')}
              aria-hidden={!revealBanner}
            >
              {safety === 'danger' && (
                <div className='rounded-xl p-3 sm:p-3.5 bg-red-100 text-red-900 border border-red-200 font-semibold shadow-sm text-center'>
                  <div>⛈️ Danger: Lightning Detected Overhead</div>
                  <div className='text-xs sm:text-sm font-semibold mt-0.5'>🚨 Risk Score: <span className='font-bold'>Extreme (4/4)</span></div>
                </div>
              )}
              {safety === 'warning' && (
                <div className='rounded-xl p-3 sm:p-3.5 bg-orange-200 text-orange-900 border border-orange-300 font-semibold shadow-sm text-center'>
                  <div>🌩️ Warning: Lightning Detected Close</div>
                  <div className='text-xs sm:text-sm font-semibold mt-0.5'>🚨 Risk Score: <span className='font-bold'>High (3/4)</span></div>
                </div>
              )}
              {safety === 'caution' && (
                <div className='rounded-xl p-3 sm:p-3.5 bg-yellow-100 text-yellow-900 border border-yellow-200 font-semibold shadow-sm text-center'>
                  <div>🌦️ Caution: Lightning Detected Near</div>
                  <div className='text-xs sm:text-sm font-semibold mt-0.5'>⚠️ Risk Score: <span className='font-bold'>Moderate (2/4)</span></div>
                </div>
              )}
              {safety === 'clear' && (
                <div className='rounded-xl p-3 sm:p-3.5 bg-green-100 text-green-900 border border-green-200 font-semibold shadow-sm text-center'>
                  <div>⛅ Clear: Lightning Detected Far</div>
                  <div className='text-xs sm:text-sm font-semibold mt-0.5'>⚠️ Risk Score: <span className='font-bold'>Low (1/4)</span></div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Details Footer */}
        <div className='mt-3'>
          <div className='flex items-center justify-between'>
            <button
              type='button'
              onClick={() => setShowWhy((v) => !v)}
              aria-expanded={showWhy}
              aria-controls='why-content'
              className='cursor-pointer text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded'
            >
              Why this works (and limits) <span className='ml-1'>{showWhy ? '▲' : '▼'}</span>
            </button>
            <button onClick={resetAll} className='text-sm text-gray-700 underline focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded'>Reset All</button>
          </div>
          {showWhy && (
            <div id='why-content' className='mt-2 text-sm text-gray-700 space-y-3'>
              <p>
                Sound travels about 343 m/s at 20°C (68°F). That&apos;s roughly 1 km every ~3 seconds or 1 mile every ~5 seconds.
                Temperature, humidity, wind, and terrain can change this slightly. Treat this as an estimate.
              </p>
              <p><strong>Disclaimer:</strong> This tool provides an estimate based on sound travel time. Lightning can strike unpredictably. For informational purposes only — no guarantee of safety is implied. Always follow official weather advisories.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Lint-safe global window augmentation for the dev-time sanity flag */
declare global {
  interface Window {
    __LIGHTNING_CALC_TESTED__?: boolean;
  }
}

// ---------------- Dev-time sanity tests (console) ----------------
if (typeof window !== "undefined" && !window.__LIGHTNING_CALC_TESTED__) {
  window.__LIGHTNING_CALC_TESTED__ = true;
  const EPS = 1e-9;
  function approx(a: number, b: number, eps = EPS) {
    if (Math.abs(a - b) > eps) throw new Error(`Test failed: ${a} != ${b}`);
  }

  // Conversions
  approx(milesFromSeconds(5), 1);
  approx(milesFromSeconds(12.5), 2.5);
  approx(kmFromSeconds(3), 1);

  // formatSmart ranges
  if (formatSmart(3.456) !== "3.46") throw new Error("formatSmart 0-10 failed");
  if (formatSmart(123.45) !== "123.45") throw new Error("formatSmart <1000 two-decimals failed");
  if (formatSmart(1234.5) !== "1,235") throw new Error("formatSmart >1000 failed");

  // Validation
  if (!isValidSeconds(0.01)) throw new Error("validation failed: 0.01 should be valid");
  if (isValidSeconds(0)) throw new Error("validation failed: 0 should be invalid");
  if (isValidSeconds(-5)) throw new Error("validation failed: negative should be invalid");

  // Fixed-window average
  const f1 = fixedWindowAverage([10, 8, 6, 4], 3); if (Math.abs(f1 - 6) > 1e-9) throw new Error(`fixedWindowAverage failed: got ${f1}`);
  const f2 = fixedWindowAverage([5], 3); if (Math.abs(f2 - 5) > 1e-9) throw new Error("fixedWindowAverage single value failed");
  const f3 = fixedWindowAverage([9, 6], 3); if (Math.abs(f3 - 7.5) > 1e-9) throw new Error("fixedWindowAverage two values failed");

  // Trend
  if (trendFromSeries([5, 4], 0.1) !== "closer") throw new Error("trend closer failed");
  if (trendFromSeries([4, 5], 0.1) !== "further") throw new Error("trend further failed");
  if (trendFromSeries([5, 5.05], 0.1) !== "steady") throw new Error("trend steady failed");
  if (trendFromSeries([5], 0.1) !== "insufficient") throw new Error("trend insufficient failed");

  // eslint-disable-next-line no-console
  console.log("LightningDistanceCalculator tests: passed");
}
