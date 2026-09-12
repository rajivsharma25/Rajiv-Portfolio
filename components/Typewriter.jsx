"use client";

import { useState, useEffect } from "react";

export default function Typewriter({
  words = [],
  typingSpeed = 90,
  deletingSpeed = 50,
  pauseDuration = 1500,
}) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;

    const currentWord = words[index];
    const delay = isDeleting
      ? deletingSpeed
      : text === currentWord
      ? pauseDuration
      : typingSpeed;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (text === currentWord) {
          setIsDeleting(true);
        } else {
          setText(currentWord.slice(0, text.length + 1));
        }
      } else {
        if (text === "") {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
        } else {
          setText(currentWord.slice(0, text.length - 1));
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, isDeleting, index, words, typingSpeed, deletingSpeed, pauseDuration]);

  return <span>{text}</span>;
}
