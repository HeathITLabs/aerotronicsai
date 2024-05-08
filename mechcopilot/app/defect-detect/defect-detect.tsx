import React, { useState } from 'react';
import * as msRest from "@azure/ms-rest-js";
import * as PredictionApi from "@azure/cognitiveservices-customvision-prediction";

const predictionKey = process.env.NEXT_PUBLIC_VISION_PREDICTION_KEY;
const predictionResourceId = process.env.NEXT_PUBLIC_VISION_PREDICTION_RESOURCE_ID;
const predictionEndpoint = process.env.NEXT_PUBLIC_VISION_PREDICTION_ENDPOINT;
const predictionProjectId = process.env.NEXT_PUBLIC_VISION_PREDICTION_PROJECT_ID;
const publishIterationName = process.env.NEXT_PUBLIC_VISION_PREDICTION_PROJECT_NAME;
const predictor_credentials = new msRest.ApiKeyCredentials({ inHeader: { "Prediction-key": predictionKey } });
const predictor = new PredictionApi.PredictionAPIClient(predictor_credentials, predictionEndpoint);

export const DefectDetect = () => {
    const [results, setResults] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const handleImageUpload = event => {
        setImageFile(event.target.files[0]);
    };

    const handlePredict = async () => {
        try {
            const res = await predictor.classifyImage(predictionProjectId, publishIterationName, imageFile);
            setResults(res);
        } catch (error) {
            console.error('Error classifying image:', error);
        }
    };

    const renderPrediction = (predictedResult) => (
        <div key={predictedResult.tagName}>
            <p>{predictedResult.tagName}: {(predictedResult.probability * 100.0).toFixed(2)}%</p>
        </div>
    );

   // if (!results) {
   //     return <div>Loading...</div>;
   // }

    return (
        <div className="w-[400px] bg-slate-800 rounded-lg overflow-hidden text-slate-400 p-5 gap-5 flex flex-col border border-blue-800/40 shadow-2xl shadow-blue-900/30">
            <div className="text-slate-50 max-h-[50vh] overflow-y-auto">
            </div>
            Select Image to Scan:
            <input type="file" onChange={handleImageUpload} />
            <button onClick={handlePredict}>Predict</button>
        </div>
    );
};