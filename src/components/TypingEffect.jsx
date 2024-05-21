import React, { useEffect, useState } from 'react';

const TypingEffect = ({ text }) => {
    const [displayText, setDisplayText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDisplayText((prevText) => prevText + text[index]);
            setIndex((prevIndex) => prevIndex + 1);
        }, 100); // Change the interval according to your preference

        return () => clearInterval(intervalId);
    }, [index, text]);

    return <span>{displayText}</span>;
};

export default TypingEffect;
