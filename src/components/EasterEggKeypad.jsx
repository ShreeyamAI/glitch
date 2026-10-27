import React, { useState } from 'react';
import { sound } from '../utils/sound';
import { Terminal, Gift, Check, Sparkles } from 'lucide-react';

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
    if (inputVal.toUpperCase() === 'GLITCH' || inputVal.toUpperCase() === 'REKKO') {
      triggerUnlock();
    } else {
      sound.playClick();
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);
    }
  };

  return (
    <div className="bg-[#fbf5e5] border-3 border-[#08090a] p-5 shadow-rekko max-w-sm w-full mx-auto flex flex-col gap-3">
      <div className="flex justify-between items-center border-b-2 border-[#08090a] pb-2 font-mono text-xs font-black">
        <span className="flex items-center gap-1.5 uppercase">
          <Terminal className="w-3.5 h-3.5 text-[#1838f7]" /> SECRET HACKER KEYPAD
        </span>
        <span className="bg-[#f8ff00] px-1.5 py-0.5 border border-[#08090a] text-[10px]">
          SPELL: "GLITCH"
        </span>
      </div>

      {unlocked ? (
        <div className="bg-[#00ea8d] border-2 border-[#08090a] p-4 text-center font-mono shadow-rekko-sm">
          <div className="flex items-center justify-center gap-1.5 font-black text-sm uppercase text-[#08090a] mb-1">
            <Gift className="w-4 h-4 text-[#08090a]" /> SECRET UNLOCKED!
          </div>
          <p className="text-xs text-[#08090a] font-bold">
            FREE WORLDWIDE EXPEDITED AIR DELIVERY + CUSTOM STICKER BOMB PACK INCLUDED AT CHECKOUT.
          </p>
        </div>
      ) : (
        <>
          {/* Display Output Screen */}
          <div
            className={`w-full h-11 bg-[#050c14] border-2 border-[#08090a] rounded px-3 flex items-center justify-between font-mono text-base font-black text-[#00f5ff] shadow-inner tracking-widest ${
              errorShake ? 'animate-bounce border-[#ff4732]' : ''
            }`}
          >
            <span>{inputVal || '_ _ _ _ _ _'}</span>
            <span className="text-[10px] text-gray-400 font-normal">TYPE CODE</span>
          </div>

          {/* Keypad Grid */}
          <div className="grid grid-cols-3 gap-2 font-mono text-xs font-black">
            {['G', 'L', 'I', 'T', 'C', 'H', 'R', 'E', 'K'].map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => handleKeyPress(key)}
                className="bg-white border-2 border-[#08090a] py-2.5 shadow-rekko-sm hover:bg-[#f8ff00] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all"
              >
                {key}
              </button>
            ))}
            <button
              type="button"
              onClick={handleBackspace}
              className="bg-[#ffd7e8] border-2 border-[#08090a] py-2.5 shadow-rekko-sm hover:bg-[#ff4732] hover:text-white"
            >
              ⌫ DEL
            </button>
            <button
              type="button"
              onClick={() => handleKeyPress('O')}
              className="bg-white border-2 border-[#08090a] py-2.5 shadow-rekko-sm hover:bg-[#f8ff00]"
            >
              O
            </button>
            <button
              type="button"
              onClick={handleTestSubmit}
              className="bg-[#00ea8d] border-2 border-[#08090a] py-2.5 shadow-rekko-sm hover:bg-[#f8ff00]"
            >
              ↵ ENTER
            </button>
          </div>
        </>
      )}
    </div>
  );
}
