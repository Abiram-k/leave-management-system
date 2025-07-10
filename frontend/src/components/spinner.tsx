import { Waveform } from "ldrs/react";
import "ldrs/react/Waveform.css";

export const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-white/30">
      <Waveform size="45" stroke="3.5" speed="1" color="black" />
    </div>
  );
};

