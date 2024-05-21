import React, { useEffect, useState } from 'react';

const TypingEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prevText) => prevText + text[index]);
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(intervalId);
      }
    }, 50); // Faster typing speed

    return () => clearInterval(intervalId); // Cleanup function
  }, [index, text]);

  return <span>{displayText}</span>;
};

const JsonDisplay = ({ json }) => {
  const [isNewResponse, setIsNewResponse] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [previousJson, setPreviousJson] = useState('');

  useEffect(() => {
    if (json !== previousJson) {
      setIsNewResponse(true);
      setPreviousJson(json);
    }
  }, [json, previousJson]);

  useEffect(() => {
    if (isNewResponse) {
      setIsTyping(true);
      setIsNewResponse(false);
    }
  }, [isNewResponse]);

  useEffect(() => {
    if (!isTyping) {
      setPreviousJson('');
    }
  }, [isTyping]);

  return (
    <div>
      {isTyping ? <TypingEffect text={json} /> : <span>{json}</span>}
    </div>
  );
};

export default JsonDisplay;
