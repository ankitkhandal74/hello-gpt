import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JsonDisplay from './JsonDisplay.jsx';

function ApiComponent() {
    const [question, setQuestion] = useState('');
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        // Load saved responses from local storage
        const savedResponses = JSON.parse(localStorage.getItem('responses')) || [];
        setResponses(savedResponses);
    }, []);

    useEffect(() => {
        // Save responses to local storage whenever they change
        localStorage.setItem('responses', JSON.stringify(responses));
    }, [responses]);

    const handleInputChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`https://chatgpt.apinepdev.workers.dev/`, {
                params: { question: question },
            });

            const newResponse = { question, answer: res.data.answer };

            // Save new response to state
            const updatedResponses = [newResponse, ...responses];
            setResponses(updatedResponses);

            setQuestion('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    className='ask'
                    type="text"
                    value={question}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your question"
                />
                <button type="submit" className='ask-btn'>Ask</button>
            </form>
            <div >
                {responses.map((response, index) => (
                    <div key={index} style={{ marginBottom: '20px' }} className='res'>
                        {response.question}
                        <br />
                        <JsonDisplay json={response.answer} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ApiComponent;
