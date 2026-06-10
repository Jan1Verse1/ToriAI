import { useState, useEffect, useRef } from "react";

// Simulates an async AI job that cycles through status messages.
// To wire a real backend: replace the setTimeout chain with fetch() calls,
// and keep calling setStatus(message) so the transparency UI keeps working.
export default function useJob() {
  const [status, setStatus] = useState(null);
  const timers = useRef([]);
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const run = (messages, onDone) => {
    clear();
    let t = 0;
    messages.forEach((m, i) => {
      timers.current.push(setTimeout(() => setStatus(m), t));
      t += 850 + i * 120;
    });
    timers.current.push(setTimeout(() => { setStatus(null); onDone && onDone(); }, t));
  };

  useEffect(() => clear, []);
  return [status, run];
}
