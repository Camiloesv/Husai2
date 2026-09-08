import { useState } from 'react';
import type { ExperienceCopy } from '../../content/experience';
import { calculatePayback } from '../../lib/payback';
import Glass from './Glass';

export default function PaybackCalculator({ copy, language }: { copy: ExperienceCopy; language: string }) {
  const [values, setValues] = useState(['7000', '2000', '250']);
  const result = calculatePayback(...values.map(value => value.trim() === '' ? NaN : Number(value)) as [number, number, number]);
  const format = (value: number) => new Intl.NumberFormat(language, { maximumFractionDigits: 1 }).format(value);
  return <Glass className="payback"><div><span className="eyebrow">ROI / EXPLORER</span><h3>{copy.calcTitle}</h3><p>{copy.calcIntro}</p>
    <div className="calculator-fields">{copy.calcLabels.map((label, i) => <label key={label} htmlFor={`calc-${i}`}>{label}<input id={`calc-${i}`} type="number" min="0" step="any" inputMode="decimal" value={values[i]} onChange={e => setValues(values.map((v, index) => index === i ? e.target.value : v))} /></label>)}</div>
    <p className="fine-print">{copy.calcNote}</p></div>
    <div className="payback-result" aria-live="polite" aria-atomic="true"><span>{copy.recovery}</span>{!result.valid ? <p>{copy.invalid}</p> : result.months === null ? <p>{copy.noRecovery}</p> : <><strong>{format(result.months)}</strong><span>{copy.months}</span></>}{result.net !== null && <small>{copy.net}<br /><b>USD {format(result.net)}</b></small>}</div>
  </Glass>;
}
