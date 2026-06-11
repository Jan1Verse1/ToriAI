import { useState, useEffect, useRef, Fragment } from "react";
import { useLocation } from "react-router-dom";
import {
  Link as LinkIcon, FileText, Newspaper, Globe, Mic, Play, Code, Share2,
  Check, ChevronRight, ChevronLeft, RefreshCw, Sparkles, Volume2, Copy,
  Languages, Clock, Headphones, Film, MessageCircle, Video, Camera, Music2,
  CheckCircle2, Loader2, Zap, Pencil, AlertCircle, Search,
} from "lucide-react";
import { LANGS, langById, SAMPLE, SUMMARIES, RECENT } from "../data.js";
import { StatusBar, ErrorBox } from "../components/StatusBar.jsx";
import useJob from "../components/useJob.js";
import AudioPlayer from "../components/AudioPlayer.jsx";
import VideoPreview from "../components/VideoPreview.jsx";
import Stepper from "../components/Stepper.jsx";
import Button from "../components/Button.jsx";
import GhostButton from "../components/GhostButton.jsx";

const STEPS = ["Input", "Summary", "Voice", "Preview", "Export"];

// shared Tailwind strings
const PANEL = "bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 animate-fade-up";
const TITLE = "font-news text-[18px] font-semibold tracking-tight";
const SUB = "text-[13px] text-[var(--muted)] mt-0.5 mb-5";
const FIELD = "w-full bg-[var(--surface-2)] border border-[var(--line)] rounded-xl px-3.5 py-3 text-sm transition focus:outline-none focus:border-[var(--clay)] focus:bg-white focus:ring-2 focus:ring-[var(--clay-soft)]";
const LABEL = "text-xs font-semibold text-[var(--ink-soft)] mb-2.5 flex items-center gap-1.5 uppercase tracking-wide";
const TIP = "inline-flex items-center gap-1.5 text-[11.5px] text-[var(--muted)] mt-3.5";

function Seg({ options, value, onChange }) {
  return (
    <div className="flex bg-[var(--surface-2)] border border-[var(--line)] rounded-[10px] p-[3px] gap-[3px]">
      {options.map((o) => {
        const val = typeof o === "string" ? o : o.value;
        const lbl = typeof o === "string" ? o : o.label;
        const on = value === val;
        return (
          <button
            key={val}
            onClick={() => onChange(val)}
            className={"flex-1 py-2 px-1.5 rounded-[7px] text-[12.5px] font-semibold transition " + (on ? "bg-[var(--surface)] text-[var(--clay-700)] shadow-[0_1px_4px_-1px_rgba(40,30,15,0.18)]" : "text-[var(--ink-soft)]")}
          >
            {lbl}
          </button>
        );
      })}
    </div>
  );
}

function LangPills({ value, onChange, withCount }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {LANGS.map((l) => {
        const sel = value === l.id;
        return (
          <button
            key={l.id}
            onClick={() => onChange(l.id)}
            className={"flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border transition min-w-[120px] " + (sel ? "border-[var(--clay)] bg-[var(--clay-tint)]" : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--line-strong)]")}
            style={{ borderWidth: 1.5 }}
          >
            <span className="w-[26px] h-[26px] shrink-0 rounded-lg grid place-items-center text-white font-news font-bold text-[12px]" style={{ background: l.color }}>{l.abbr}</span>
            <span className="text-left">
              <span className="block text-[13.5px] font-semibold">{l.name}</span>
              {withCount && <span className="text-[11px] text-[var(--muted)]">{l.voices.length} voices</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function Create() {
  const location = useLocation();
  const demoFlag = location.state?.demo;
  const demoConsumed = useRef(null);

  const [step, setStep] = useState(0);
  const [done, setDone] = useState([false, false, false, false, false]);

  // input
  const [tab, setTab] = useState("text");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [linked, setLinked] = useState(null);
  const [urlErr, setUrlErr] = useState(false);
  const [fetching, setFetching] = useState(false);

  // summary
  const [length, setLength] = useState("Short");
  const [tone, setTone] = useState("Neutral");
  const [lang, setLang] = useState("en");
  const [summary, setSummary] = useState("");
  const [editingSummary, setEditingSummary] = useState(false);

  // voice
  const [voiceLang, setVoiceLang] = useState("en");
  const [voice, setVoice] = useState(null);

  // export
  const [copied, setCopied] = useState(false);
  const [exported, setExported] = useState({});

  const [sumStatus, runSum] = useJob();
  const [genStatus, runGen] = useJob();
  const [genErr] = useState(false);
  const [generated, setGenerated] = useState(false);

  const accent = langById(voiceLang)?.color || "var(--clay)";

  // one-click Pidgin demo (from onboarding via router state)
  useEffect(() => {
    if (!demoFlag || demoConsumed.current === demoFlag) return;
    demoConsumed.current = demoFlag;
    setTab("text"); setText(SAMPLE.text);
    setLang("pcm"); setVoiceLang("pcm"); setVoice("Chidi");
    setSummary(SUMMARIES.pcm);
    setDone([true, true, true, false, false]);
    setStep(3);
    setGenerated(false);
    setTimeout(() => {
      runGen(
        ["Translating to Pidgin…", "Generating audio with Chidi…", "Rendering video & subtitles…"],
        () => { setGenerated(true); setDone((d) => { const n = [...d]; n[3] = true; return n; }); }
      );
    }, 350);
  }, [demoFlag]); // eslint-disable-line react-hooks/exhaustive-deps

  const markDone = (i) => setDone((d) => { const n = [...d]; n[i] = true; return n; });

  const inputReady =
    (tab === "text" && text.trim().length > 30) ||
    (tab === "url" && url.trim()) ||
    (tab === "linked" && linked !== null);

  const fetchUrl = () => {
    setUrlErr(false);
    if (!url.trim()) { setUrlErr(true); return; }
    setFetching(true);
    setTimeout(() => {
      setFetching(false);
      if (/paywall|broken|test\.fail/i.test(url) || !/^https?:\/\/.+\..+/.test(url.trim())) {
        setUrlErr(true);
      } else { setText(SAMPLE.text); setTab("text"); }
    }, 1100);
  };

  const goSummary = () => { if (tab === "linked" && linked !== null) setText(SAMPLE.text); markDone(0); setStep(1); };

  const generateSummary = () => {
    setEditingSummary(false);
    runSum(
      ["Reading the story…", length === "Short" ? "Writing a short summary…" : "Writing a medium summary…", `Setting a ${tone.toLowerCase()} tone…`],
      () => setSummary(SUMMARIES[lang] || SUMMARIES.en)
    );
  };

  const generateMedia = () => {
    setGenerated(false);
    const ln = langById(voiceLang).name;
    runGen(
      [`Translating to ${ln}…`, `Generating audio with ${voice}…`, "Rendering video & subtitles…"],
      () => { setGenerated(true); markDone(3); }
    );
  };

  const subs = (summary || SUMMARIES.en).split(/(?<=[.!?])\s+/).filter(Boolean).slice(0, 6);
  const copyEmbed = () => { setCopied(true); setTimeout(() => setCopied(false), 1800); };
  const doExport = (k) => setExported((e) => ({ ...e, [k]: true }));

  const TabBtn = ({ id, icon: Icon, children }) => (
    <button
      onClick={() => setTab(id)}
      className={"flex items-center gap-2 px-3.5 py-2.5 rounded-[10px] text-[13px] font-semibold border transition " + (tab === id ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]" : "bg-[var(--surface)] text-[var(--ink-soft)] border-[var(--line)] hover:bg-[var(--surface-2)]")}
    >
      <Icon size={15} /> {children}
    </button>
  );

  return (
    <div className="p-4 md:p-6">
      {demoFlag === undefined && step === 0 && (
        <div className="flex items-center flex-wrap gap-2.5 px-4 py-3.5 rounded-[13px] mb-[18px] text-white animate-fade-up" style={{ background: "linear-gradient(100deg,var(--clay),var(--clay-700))" }}>
          <Zap size={18} className="animate-pulse shrink-0" />
          <div className="min-w-0">
            <div className="text-[13.5px] font-semibold">Tip: try the one-click demo</div>
            <div className="text-[11.5px] opacity-90">Paste a story or load the sample to see the full flow.</div>
          </div>
          <button onClick={() => { setTab("text"); setText(SAMPLE.text); }} className="ml-auto shrink-0 bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">Load sample story</button>
        </div>
      )}

      <Stepper steps={STEPS} current={step} done={done} onJump={setStep} />

      {/* STEP 0 — INPUT */}
      {step === 0 && (
        <div className={PANEL}>
          <div className={TITLE}>Add a story</div>
          <div className={SUB}>Paste a link, drop in raw text, or pick from your linked articles.</div>
          <div className="flex gap-2 flex-wrap mb-[18px]">
            <TabBtn id="url" icon={LinkIcon}>Paste a URL</TabBtn>
            <TabBtn id="text" icon={FileText}>Paste text</TabBtn>
            <TabBtn id="linked" icon={Newspaper}>Linked articles</TabBtn>
          </div>

          {tab === "url" && (
            <div>
              <div className="flex gap-2.5">
                <input className={FIELD} placeholder="https://your-newsroom.com/article…" value={url} onChange={(e) => { setUrl(e.target.value); setUrlErr(false); }} />
                <Button variant="dark" onClick={fetchUrl} disabled={fetching}>
                  {fetching ? <><Loader2 size={16} className="animate-spin" /> Fetching…</> : <><Search size={16} /> Fetch</>}
                </Button>
              </div>
              {urlErr && (
                <div className="mt-3">
                  <ErrorBox
                    title="We couldn’t reach that link"
                    msg="The page may be paywalled, offline, or the address isn’t valid. You can paste the article text instead, or try a different URL."
                    onRetry={fetchUrl}
                    onAlt={() => { setTab("text"); setUrlErr(false); }}
                    altLabel="Paste text instead"
                  />
                </div>
              )}
              <div className={TIP}><AlertCircle size={13} /> We only read the article text — nothing is published until you approve it.</div>
            </div>
          )}

          {tab === "text" && (
            <div>
              <textarea className={FIELD + " min-h-[148px] leading-relaxed resize-y"} placeholder="Paste the full story here…" value={text} onChange={(e) => setText(e.target.value)} />
              <div className={TIP}><FileText size={13} /> {text.trim() ? `${text.trim().split(/\s+/).length} words ready` : "Minimum ~30 words for a good summary"}</div>
            </div>
          )}

          {tab === "linked" && (
            <div>
              {RECENT.map((r, i) => (
                <div key={i} onClick={() => setLinked(i)} className={"flex items-center gap-3 px-3 py-3 rounded-xl border mb-2 cursor-pointer transition " + (linked === i ? "border-[var(--clay)] bg-[var(--clay-tint)]" : "border-[var(--line)] hover:border-[var(--clay)] hover:bg-[var(--clay-tint)]")}>
                  <div className="w-[38px] h-[38px] shrink-0 rounded-[10px] grid place-items-center font-news font-semibold text-[15px]" style={{ background: r.c + "1A", color: r.c }}>{r.t[0]}</div>
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-semibold">{r.t}</div>
                    <div className="text-[11.5px] text-[var(--muted)]">{r.time}</div>
                  </div>
                  {linked === i && <Check size={18} className="ml-auto text-[var(--clay)]" />}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2.5 mt-2">
            <Button className="ml-auto" onClick={goSummary} disabled={!inputReady}>Continue <ChevronRight size={16} /></Button>
          </div>
        </div>
      )}

      {/* STEP 1 — SUMMARY */}
      {step === 1 && (
        <div className={PANEL}>
          <div className={TITLE}>Create the summary</div>
          <div className={SUB}>Set the length, tone and language — then let ToriAI write it. You can edit before moving on.</div>

          <div className="grid md:grid-cols-2 gap-[18px] mb-[22px]">
            <div>
              <div className={LABEL}><Clock size={13} /> Summary length</div>
              <Seg value={length} onChange={setLength} options={[{ value: "Short", label: "Short · 50–90w" }, { value: "Medium", label: "Medium · 90–120w" }]} />
            </div>
            <div>
              <div className={LABEL}><Volume2 size={13} /> Tone</div>
              <Seg value={tone} onChange={setTone} options={["Neutral", "Conversational", "Broadcast"]} />
            </div>
          </div>

          <div className={LABEL}><Globe size={13} /> Summary language</div>
          <div className="mb-[18px]"><LangPills value={lang} onChange={(id) => { setLang(id); setSummary(""); }} /></div>

          {sumStatus && <StatusBar msg={sumStatus} />}

          {!sumStatus && !summary && <Button onClick={generateSummary}><Sparkles size={16} /> Generate summary</Button>}

          {!sumStatus && summary && (
            <div className="bg-[var(--surface-2)] border border-[var(--line)] rounded-xl p-[18px]">
              <h4 className="text-[11.5px] uppercase tracking-wide text-[var(--muted)] font-semibold mb-2.5 flex items-center gap-1.5"><Sparkles size={13} /> {langById(lang).name} summary · {tone}</h4>
              {editingSummary ? (
                <textarea className="w-full border border-[var(--line-strong)] rounded-[10px] p-3 text-[14.5px] leading-relaxed font-news bg-white min-h-[120px] resize-y focus:outline-none focus:border-[var(--clay)] focus:ring-2 focus:ring-[var(--clay-soft)]" value={summary} onChange={(e) => setSummary(e.target.value)} />
              ) : (
                <div className="text-[14.5px] leading-relaxed font-news text-[var(--ink)]">{summary}</div>
              )}
              <div className="text-[11.5px] text-[var(--muted)] mt-2.5">{summary.trim().split(/\s+/).length} words</div>
              <div className="flex gap-2.5 mt-3.5">
                <GhostButton onClick={() => setEditingSummary((e) => !e)}><Pencil size={13} /> {editingSummary ? "Done editing" : "Edit text"}</GhostButton>
                <GhostButton onClick={generateSummary}><RefreshCw size={13} /> Regenerate</GhostButton>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2.5 mt-2">
            <GhostButton onClick={() => setStep(0)}><ChevronLeft size={14} /> Back</GhostButton>
            <Button className="ml-auto" disabled={!summary} onClick={() => { markDone(1); setVoiceLang(lang); setStep(2); }}>Choose voice <ChevronRight size={16} /></Button>
          </div>
        </div>
      )}

      {/* STEP 2 — VOICE */}
      {step === 2 && (
        <div className={PANEL}>
          <div className={TITLE}>Pick a language & voice</div>
          <div className={SUB}>Real, named voices for every language — choose the one that fits your audience.</div>

          <div className={LABEL}><Languages size={13} /> Output language</div>
          <div className="mb-[18px]"><LangPills value={voiceLang} onChange={(id) => { setVoiceLang(id); setVoice(null); }} withCount /></div>

          <div className={LABEL}><Mic size={13} /> Voice</div>
          <div className="grid md:grid-cols-2 gap-2.5">
            {langById(voiceLang).voices.map((v) => {
              const sel = voice === v.n;
              return (
                <button key={v.n} onClick={() => setVoice(v.n)} className={"flex items-center gap-3 p-3.5 rounded-[13px] border text-left transition " + (sel ? "border-[var(--clay)] bg-[var(--clay-tint)]" : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-2)]")} style={{ borderWidth: 1.5 }}>
                  <span className="w-[42px] h-[42px] shrink-0 rounded-full grid place-items-center text-white font-news font-semibold text-[17px]" style={{ background: accent }}>{v.n[0]}</span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{v.n}</span>
                    <span className="text-xs text-[var(--muted)]">{v.d}</span>
                  </span>
                  <span className={"ml-auto w-8 h-8 shrink-0 rounded-full grid place-items-center border " + (sel ? "bg-[var(--clay)] border-[var(--clay)] text-white" : "bg-[var(--surface)] border-[var(--line-strong)] text-[var(--ink-soft)]")}>
                    <Play size={13} style={{ marginLeft: 1 }} />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2.5 mt-5">
            <GhostButton onClick={() => setStep(1)}><ChevronLeft size={14} /> Back</GhostButton>
            <Button className="ml-auto" disabled={!voice} onClick={() => { markDone(2); setGenerated(false); setStep(3); }}>Generate preview <ChevronRight size={16} /></Button>
          </div>
        </div>
      )}

      {/* STEP 3 — PREVIEW */}
      {step === 3 && (
        <div className={PANEL}>
          <div className={TITLE}>Preview & refine</div>
          <div className={SUB}>{voice} reading in {langById(voiceLang).name}. Listen, watch, and edit the text before exporting.</div>

          {genStatus && <StatusBar msg={genStatus} />}
          {genErr && !genStatus && (
            <ErrorBox title="Audio generation didn’t complete" msg={`The ${langById(voiceLang).name} voice service timed out. Your text is saved — try again, or switch to another voice.`} onRetry={generateMedia} onAlt={() => setStep(2)} altLabel="Change voice" />
          )}

          {!genStatus && !generated && !genErr && <Button onClick={generateMedia}><Sparkles size={16} /> Generate audio & video</Button>}

          {!genStatus && generated && (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <AudioPlayer voice={voice} lang={langById(voiceLang).name} accent={accent} />
                <VideoPreview headline={SAMPLE.title} subs={subs} accent={accent} />
              </div>
              <div className="bg-[var(--surface-2)] border border-[var(--line)] rounded-xl p-[18px] mt-4">
                <h4 className="text-[11.5px] uppercase tracking-wide text-[var(--muted)] font-semibold mb-2.5 flex items-center gap-1.5"><Pencil size={13} /> Script — edit before export</h4>
                <textarea className="w-full border border-[var(--line-strong)] rounded-[10px] p-3 text-[14.5px] leading-relaxed font-news bg-white min-h-[120px] resize-y focus:outline-none focus:border-[var(--clay)] focus:ring-2 focus:ring-[var(--clay-soft)]" value={summary} onChange={(e) => setSummary(e.target.value)} />
                <div className="mt-3"><GhostButton onClick={generateMedia}><RefreshCw size={13} /> Regenerate with edits</GhostButton></div>
              </div>
            </>
          )}

          <div className="flex items-center gap-2.5 mt-5">
            <GhostButton onClick={() => setStep(2)}><ChevronLeft size={14} /> Back</GhostButton>
            <Button className="ml-auto" disabled={!generated} onClick={() => { markDone(3); setStep(4); }}>Export & share <ChevronRight size={16} /></Button>
          </div>
        </div>
      )}

      {/* STEP 4 — EXPORT */}
      {step === 4 && (
        <div className={PANEL}>
          <div className={TITLE}>Export & distribute</div>
          <div className={SUB}>Download the files or push straight to your channels. {langById(voiceLang).name} · {voice}.</div>

          <div className="grid md:grid-cols-3 gap-3">
            {[
              { k: "mp3", icon: Headphones, t: "Download audio", s: "MP3 · 38s · 0.9 MB", bg: "var(--clay-soft)", fg: "var(--clay-700)", action: () => doExport("mp3"), cta: "Tap to download" },
              { k: "mp4", icon: Film, t: "Download video", s: "MP4 · 9:16 · 4.2 MB", bg: "var(--gold-soft)", fg: "var(--gold)", action: () => doExport("mp4"), cta: "Tap to download" },
              { k: "embed", icon: Code, t: "Embed code", s: "Player for your site", bg: "#E6EEF2", fg: "var(--indigo)", action: copyEmbed, cta: "Tap to copy" },
            ].map((c) => {
              const Icon = c.icon;
              const isDone = c.k === "embed" ? copied : exported[c.k];
              return (
                <button key={c.k} onClick={c.action} className="flex flex-col items-start gap-2.5 p-4 rounded-[13px] border border-[var(--line)] bg-[var(--surface)] text-left transition hover:border-[var(--clay)] hover:shadow-[0_6px_18px_-12px_rgba(40,30,15,0.3)] hover:-translate-y-0.5">
                  <span className="w-[38px] h-[38px] rounded-[10px] grid place-items-center" style={{ background: c.bg, color: c.fg }}><Icon size={18} /></span>
                  <span className="text-sm font-semibold">{c.t}</span>
                  <span className="text-[11.5px] text-[var(--muted)]">{c.s}</span>
                  {isDone ? (
                    <span className="text-[11.5px] font-semibold text-[var(--green)] flex items-center gap-1"><CheckCircle2 size={13} /> {c.k === "embed" ? "Copied" : "Downloaded"}</span>
                  ) : (
                    <span className="text-[11.5px] font-semibold" style={{ color: c.fg }}>{c.cta}</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="relative bg-[#211C16] text-[#E9E0D2] rounded-xl px-3.5 py-3.5 text-xs font-mono-plex mt-3 overflow-x-auto">
            <button onClick={copyEmbed} className="absolute top-2.5 right-2.5 text-[#C9BBA7] flex items-center gap-1.5 text-[11.5px] font-semibold">{copied ? <Check size={12} /> : <Copy size={12} />} {copied ? "Copied" : "Copy"}</button>
            {`<iframe src="https://embed.toriai.ng/p/8fz2k" `}<br />{`  width="360" height="640" loading="lazy"></iframe>`}
          </div>

          <div className={LABEL + " mt-[22px]"}><Share2 size={13} /> Share to channels</div>
          <div className="flex gap-2.5 flex-wrap">
            {[
              { icon: MessageCircle, label: "WhatsApp", color: "#25923f" },
              { icon: Music2, label: "TikTok", color: "var(--ink)" },
              { icon: Video, label: "YouTube Shorts", color: "#c4302b" },
              { icon: Camera, label: "Instagram", color: "#c13584" },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <button key={c.label} className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold border border-[var(--line)] bg-[var(--surface)] text-[var(--ink-soft)] transition hover:border-[var(--ink)] hover:text-[var(--ink)] hover:-translate-y-px">
                  <Icon size={16} style={{ color: c.color }} /> {c.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl mt-[22px] bg-[var(--green-soft)] border border-[#C6E0D1]">
            <CheckCircle2 size={18} className="text-[var(--green)]" />
            <div>
              <div className="text-[13.5px] font-semibold text-[var(--green)]">Story ready for distribution</div>
              <div className="text-xs text-[var(--muted)]">Paste → Pidgin audio → download, done in well under 3 minutes.</div>
            </div>
          </div>

          <div className="mt-5"><GhostButton onClick={() => setStep(3)}><ChevronLeft size={14} /> Back to preview</GhostButton></div>
        </div>
      )}
    </div>
  );
}
