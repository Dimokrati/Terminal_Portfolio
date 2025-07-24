
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import TerminalCommand from './TerminalCommand';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [currentPath, setCurrentPath] = useState('~');
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const socialLinks = [
      { icon: Github, url: "https://github.com/Dimokrati", label: "GitHub" },
      { icon: Linkedin, url: "https://linkedin.com/in/hdimokrati", label: "LinkedIn" },
    ];

  const commands = {
    help: {
      description: 'Show available commands',
      action: () => [
        'Available commands:',
        '  help     - Show this help message',
        '  about    - Learn about me',
        '  skills   - View my technical skills',
        '  projects - See my recent projects',
        '  contact  - Get my contact information',
        '  clear    - Clear the terminal',
        // '  resume   - Download my resume'
      ]
    },
    about: {
      description: 'Learn about me',
      action: () => [
        'About Me:',
        '=========',
        'I am a passionate Full Stack Developer with 5+ years of experience.',
        'I love creating innovative web applications and solving complex problems.',
        'Currently focused on React, Node.js, and cloud technologies.',
        '',
        'When I\'m not coding, you can find me exploring new technologies,',
        'contributing to open source projects, or enjoying outdoor activities.'
      ]
    },
    skills: {
      description: 'View technical skills',
      action: () => [
        'Technical Skills:',
        '================',
        'Frontend:  React, Vue.js, TypeScript, Tailwind CSS',
        'Backend:   Node.js, Python, Express.js, FastAPI',
        'Database:  MongoDB, PostgreSQL, Redis',
        'Cloud:     AWS, Docker, Kubernetes',
        'Tools:     Git, VS Code, Figma, Postman',
        'Other:     GraphQL, REST APIs, Microservices'
      ]
    },
    projects: {
      description: 'See recent projects',
      action: () => [
        'Recent Projects:',
        '===============',
        '1. E-Commerce Platform',
        '   → Full-stack React/Node.js application',
        '   → Features: Payment integration, admin panel',
        '',
        '2. Task Management App',
        '   → Real-time collaboration tool',
        '   → Tech: React, Socket.io, MongoDB',
        '',
        '3. Weather Dashboard',
        '   → Interactive weather visualization',
        '   → APIs: OpenWeather, Chart.js'
      ]
    },
    contact: {
      description: 'Get contact information',
      action: () => [
        'Contact Information:',
        '==================',
        'Email:    houssamdimokrati@gmail.com',
        'Phone:    +212702823722',
        'LinkedIn: linkedin.com/in/hdimokrati',
        'GitHub:   github.com/Dimokrati',
        // 'Website:  johndoe.dev'
      ]
    },
    clear: {
      description: 'Clear the terminal',
      action: () => {
        setHistory([]);
        return [];
      }
    },
    resume: {
      description: 'Download resume',
      action: () => [
        'Resume download initiated...',
        'File: john_doe_resume.pdf',
        'Status: Ready for download',
        '',
        'Note: This is a demo - no actual file will be downloaded.'
      ]
    }
  };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === '') return;

    const newEntry = {
      command: cmd,
      output: commands[trimmedCmd] ? commands[trimmedCmd].action() : [`Command not found: ${cmd}`, 'Type "help" for available commands.'],
      timestamp: new Date().toLocaleTimeString()
    };

    setHistory(prev => [...prev, newEntry]);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const welcomeMessage = {
      command: 'Welcome to H.Dimokrati\'s Portfolio Terminal',
      output: [
        'Welcome to my interactive portfolio!',
        'Type "help" to see available commands.',
        'Navigate through my profile using terminal commands.',
        ''
      ],
      timestamp: new Date().toLocaleTimeString()
    };
    setHistory([welcomeMessage]);
  }, []);

  return (
    <div className="h-full bg-black/60 text-[#c5df67] p-2 lg:p-4 font-mono text-xs lg:text-sm overflow-hidden flex flex-col">
      <div className="flex items-center justify-between gap-2 mb-2 lg:mb-4 border-b border-gray-700 pb-2">
        <div className='flex gap-2 '>
        <div className="flex gap-1">
          <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-red-500 "></div>
          <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-yellow-500 mr-1 ml-1"></div>
          <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-gray-400 text-xs">h.dimokrati@portfolio:~$</span>
        </div>
        <div className='flex gap-2'>
        {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-[#c5df67]"
            >
              <link.icon size={16} />
            </motion.a>))}
          </div>
      </div>

      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto space-y-1 lg:space-y-2 mb-2 lg:mb-4"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, index) => (
          <TerminalCommand key={index} entry={entry} />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[#c5df67]">h.dimokrati@portfolio:{currentPath}$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-transparent outline-none text-[#c5df67] caret-[#c5df67']"
          placeholder="Type a command..."
          autoFocus
        />
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-2 h-4 bg-[#c5df67]"
        />
      </div>
    </div>
  );
};

export default Terminal;
