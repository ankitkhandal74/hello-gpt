import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JsonDisplay from './JsonDisplay.jsx';
import { marked } from 'marked';
import { GoogleGenerativeAI } from "@google/generative-ai";

import TextareaAutosize from 'react-textarea-autosize';

function ApiComponent() {
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const [responses, setResponses] = useState(() => {
        const savedResponses = localStorage.getItem('responses');
        return savedResponses ? JSON.parse(savedResponses) : [];
    });

    useEffect(() => {
        // Save responses to localStorage whenever they change
        localStorage.setItem('responses', JSON.stringify(responses));
    }, [responses]);

    // useEffect(() => {
    //     // Load saved responses from local storage
    //     const savedResponses = JSON.parse(localStorage.getItem('responses')) || [];
    //     setResponses(savedResponses);
    // }, []);

    // Removed the second useEffect that was overwriting the localStorage on every render

    const handleInputChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        } else if (e.key === 'Enter' && e.shiftKey) {
            // Allow default behavior (adding a new line)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const api_key = "AIzaSyC9Max8iTQZg2HB4hbry2Mg2msdiXn0Mgo"; // Remember to replace with your actual API key
        const genAI = new GoogleGenerativeAI(api_key);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        try {
            const prompt = `${question}`;
            const result = await model.generateContent(prompt);

            const newResponse = {
                question: prompt,
                answer: result.response,
            };

            // Update responses by adding the new one to the existing array
            const updatedResponses = [newResponse, ...responses];
            setResponses(updatedResponses);
            localStorage.setItem('responses', JSON.stringify(updatedResponses)); //Save to localStorage after updating
            setQuestion('');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const scrollToBottom = () => {
        const totalScrollHeight = document.body.scrollHeight;
        const startPosition = window.scrollY;
        const distance = totalScrollHeight - startPosition;
        const duration = 3000; // 3 seconds
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const ease = easeInOutQuad(progress);

            window.scrollTo(0, startPosition + distance * ease);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };

        const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

        requestAnimationFrame(animateScroll);
    };

    const handleDeleteAll = () => {
        setResponses([]); // Clear responses in the state
        localStorage.removeItem("responses"); // Remove responses from local storage
    };

    const renderMarkdown = (markdown) => {
        return { __html: marked(markdown) }; // Convert markdown to HTML
    };

    return (
        <div className='api'>
            <form onSubmit={handleSubmit}>
                <TextareaAutosize
                    className='ask'
                    type="text"
                    value={question}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    minRows={2}
                    placeholder="Enter your question"
                />
                <button disabled={loading} type="submit" className='ask-btn'>{loading ? (
                    <div className="flex items-center gap-2">
                        <svg
                            className="w-5 h-5 animate-spin text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#ffffffde"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="#ffffffde"
                                d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                        </svg>
                    </div>
                ) : (
                    "Ask"
                )}</button>
            </form>
            <div className='responses'>
                {responses.map((response, index) => (
                    <div key={index} className='res'>
                        <div className='quesBox'>
                            <div
                                className="ques"
                                dangerouslySetInnerHTML={renderMarkdown(response.question)}
                            />
                        </div>
                        <br />
                        <JsonDisplay json={response.answer} />
                    </div>
                ))}
            </div>
            <div className="content">
                <button className="scroll-button" onClick={scrollToBottom}>
                <img src="arrow.svg" className='deletesvg' />
                </button>
            </div>

            <div className="content">
                <button className="delete-button" onClick={handleDeleteAll}>
                    <img src="delete.svg" className='deletesvg' />
                </button>
            </div>

        </div>
    );
}

export default ApiComponent;
