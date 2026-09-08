import { useState } from 'react';
import { ArrowUpRight, Bot, FileText, BarChart3, Play, RotateCcw, Check, Command } from 'lucide-react';
import type { ExperienceCopy } from '../../content/experience';
import { getWhatsAppUrl } from '../../lib/whatsapp';
import { useTranslation } from 'react-i18next';
import Glass from './Glass';

export default function Laboratory({ copy }: { copy: ExperienceCopy }) {
  const { i18n } = useTranslation();
  const [tab, setTab] = useState(0);
  const [scenario, setScenario] = useState(0);
  const [complete, setComplete] = useState(false);
  const options = [copy.agentOptions, copy.docOptions, copy.analyticsOptions][tab];
  const results = [copy.agentResults, copy.docResults, copy.analyticsResults][tab][scenario];
  const icons = [Bot, FileText, BarChart3];
  return <Glass className="lab-shell">
    <div className="lab-toolbar"><span><Command size={16} /> HUSAI / LAB</span><small>{copy.simulation}</small><span className="lab-dots">● ● ●</span></div>
    <div className="lab-tabs" role="tablist" aria-label="HusAI Lab">{copy.tabs.map((name, i) => {
      const Icon = icons[i];
      return <button key={name} id={`lab-tab-${i}`} role="tab" aria-selected={tab === i} aria-controls="lab-panel" tabIndex={tab === i ? 0 : -1}
        onKeyDown={e => { const next = e.key === 'ArrowRight' ? (i + 1) % 3 : e.key === 'ArrowLeft' ? (i + 2) % 3 : e.key === 'Home' ? 0 : e.key === 'End' ? 2 : null; if (next !== null) { e.preventDefault(); setTab(next); setScenario(0); setComplete(false); document.getElementById(`lab-tab-${next}`)?.focus(); } }}
        onClick={() => { setTab(i); setScenario(0); setComplete(false); }}><Icon size={18} />{name}<span>0{i + 1}</span></button>;
    })}</div>
    <div className="lab-workspace" id="lab-panel" role="tabpanel" aria-labelledby={`lab-tab-${tab}`}>
      <div className="lab-input"><label htmlFor="lab-scenario">{copy.input}</label><select id="lab-scenario" value={scenario} onChange={e => { setScenario(Number(e.target.value)); setComplete(false); }}>{options.map((option, i) => <option key={option} value={i}>{option}</option>)}</select>
        <div className="sample-sheet">{tab === 1 ? <><FileText size={26} /><pre>{copy.docSources[scenario]}</pre></> : tab === 0 ? <><Bot size={30} /><p>“{options[scenario]}”</p><span>DEMO #1042</span></> : <><BarChart3 size={30} /><div className="analytics-preview">{[38, 60, 48, 85, 72, 100].map((h, i) => <i key={i} style={{ height: `${scenario ? h * 0.48 : h}%` }} />)}</div><span>{options[scenario]}</span></>}</div>
        <div className="lab-actions"><button className="button-primary" onClick={() => setComplete(true)}><Play size={15} />{copy.run}</button><button className="icon-button" aria-label={copy.reset} onClick={() => { setScenario(0); setComplete(false); }}><RotateCcw size={17} /></button></div>
      </div>
      <div className="lab-output" aria-live="polite" aria-atomic="true">{complete ? <><span className="eyebrow">{copy.output}</span><ol>{results.map((line, i) => <li key={line}><span className="result-check">{i === results.length - 1 ? <ArrowUpRight size={14} /> : <Check size={14} />}</span><p>{line}</p></li>)}</ol><a className="text-link contact-link" href={getWhatsAppUrl(i18n.language, { kind: 'demo', name: `${copy.tabs[tab]} / ${options[scenario]}` })} target="_blank" rel="noopener noreferrer">{copy.cta}<ArrowUpRight size={16} /></a></> : <div className="lab-empty"><div className="empty-orbit"><Spark /></div><h3>{copy.ready}</h3><p>{copy.readyBody}</p></div>}</div>
    </div>
  </Glass>;
}
function Spark() { return <Command size={34} strokeWidth={1} />; }
