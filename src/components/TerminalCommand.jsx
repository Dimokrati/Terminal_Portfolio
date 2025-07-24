import React from 'react';
import { motion } from 'framer-motion';

const TerminalCommand = ({ entry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-1"
    >
      <div className="flex items-center gap-2 text-gray-300">
        <span className="text-[#c5df67]">h.dimokrati@portfolio:~$</span>
        <span>{entry.command}</span>
        <span className="text-xs text-[#93ce89] ml-auto">{entry.timestamp}</span>
      </div>
      
      {entry.output && entry.output.length > 0 && (
        <div className="ml-4 space-y-1">
          {entry.output.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              className={`${
                line.startsWith('  ') ? 'text-[#57b0f0ff]' :
                line.includes(':') && line.includes('=') ? 'text-yellow-400' :
                line.startsWith('→') ? 'text-blue-400 ml-2' :
                line === '' ? 'h-2' :
                'text-gray-300'
              }`}
            >
              {line === '' ? <div className="h-2" /> : line}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TerminalCommand;