import React, { useState } from 'react';
import { sound } from '../utils/sound';
import { Terminal, Gift, Check, Sparkles, FileCode } from 'lucide-react';

export default function EasterEggKeypad({ onUnlock }) {
  const [inputVal, setInputVal] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [errorShake, setErrorShake] = useState(false);

  const handleKeyPress = (char) => {
    sound.playClick();
    if (inputVal.length < 8) {
      const next = inputVal + char;
      setInputVal(next);
      if (next.toUpperCase() === 'GLITCH') {
        triggerUnlock();
      }
    }
  };

  const handleBackspace = () => {
    sound.playClick();
    setInputVal(inputVal.slice(0, -1));
  };

  const triggerUnlock = () => {
    sound.playOledBlink();
    setUnlocked(true);
    if (onUnlock) onUnlock();
  };

  const handleTestSubmit = () => {
    if (inputVal.toUpperCase() === 'GLITCH') {
      triggerUnlock();
    } else {
      sound.playClick();
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);
    }
  };

  return (
    <div className="bg-[#ffffff] border-2 border-[#111215] p-6 rounded-2xl shadow-editorial max-w-sm w-full mx-auto flex flex-col gap-4">
      <div className="flex justify-between items-center border-b-2 border-[#111215] pb-3 font-mono text-xs font-bold">
        <span className="flex items-center gap-2 uppercase text-[#111215]">
          <Terminal className="w-3.5 h-3.5 text-[#1038cc]" /> XYZ TERMINAL
        </span>
        <span className="bg-[#f4efe4] text-[#111215] px-2 py-0.5 rounded-full border border-[#111215] text-[10px] uppercase font-bold">
          KEY: "GLITCH"
        </span>
      </div>

      {unlocked ? (
        <div className="bg-[#f4efe4] border-2 border-[#111215] p-5 rounded-xl text-center font-mono shadow-editorial-sm">
          <div className="flex items-center justify-center gap-1.5 font-bold text-sm uppercase text-[#111215] mb-2">
            <Sparkles className="w-4 h-4 text-[#1038cc]" /> ACCESS GRANTED
          </div>
          <p className="text-xs text-[#525866] leading-relaxed mb-3">
            VIP Batch 01 priority status activated. Open-source prototype pinout schematics and 1-bit bitmap character pack unlocked.
          </p>
          <span className="inline-flex items-center gap-1.5 bg-[#111215] text-[#fbf8f2] px-3 py-1 rounded-full text-[10px] font-bold uppercase">
            <Check className="w-3 h-3 text-[#00f5ff]" /> BATCH 01 VIP STATUS VERIFIED
          </span>
        </div>
      ) : (
        <>
          {/* Display Output Screen */}
          <div
            className={`w-full h-12 bg-[#050c14] border-2 border-[#111215] rounded-xl px-4 flex items-center justify-between font-mono text-base font-bold text-[#00f5ff] shadow-inner tracking-widest ${
              errorShake ? 'animate-bounce border-red-500' : ''
            }`}
          >
            <span>{inputVal || '_ _ _ _ _ _'}</span>
            <span className="text-[10px] text-gray-500 font-normal">ENTER CODE</span>
          </div>

          {/* Keypad Grid */}
          <div className="grid grid-cols-3 gap-2 font-mono text-xs font-bold">
            {['G', 'L', 'I', 'T', 'C', 'H', 'X', 'Y', 'Z'].map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => handleKeyPress(key)}
                className="bg-[#f4efe4] border border-[#111215] py-3 rounded-xl hover:bg-[#111215] hover:text-[#fbf8f2] active:translate-y-0.5 transition-all text-[#111215] font-bold"
              >
                {key}
              </button>
            ))}
            <button
              type="button"
              onClick={handleBackspace}
              className="bg-[#ffffff] border border-[#111215] py-3 rounded-xl hover:bg-gray-100 text-[#525866]"
            >
              ⌫ DEL
            </button>
            <button
              type="button"
              onClick={() => handleKeyPress('O')}
              className="bg-[#f4efe4] border border-[#111215] py-3 rounded-xl hover:bg-[#111215] hover:text-[#fbf8f2] text-[#111215]"
            >
              O
            </button>
            <button
              type="button"
              onClick={handleTestSubmit}
              className="bg-[#111215] text-[#fbf8f2] border border-[#111215] py-3 rounded-xl hover:bg-[#1038cc] transition-colors"
            >
              ↵ ENTER
            </button>
          </div>
        </>
      )}
    </div>
  );
}
