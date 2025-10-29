import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function DecryptedText({ text, speed = 50, className = 'text-white font-bold' }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let interval;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';
    const textArray = text.split('');

    interval = setInterval(() => {
      setDisplayText(prev => prev.split('').map((c, i) => Math.random() > 0.5 ? textArray[i] : chars[Math.floor(Math.random() * chars.length)]).join(''));
    }, speed);

    const timeout = setTimeout(() => {
      setDisplayText(text);
      clearInterval(interval);
    }, speed * 10);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, speed]);

  return (
    <motion.span className={className} whileHover={{ scale: 1.05 }}>
      {displayText}
    </motion.span>
  );
}
