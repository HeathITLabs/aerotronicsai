import React, { useState } from 'react';
import * as msRest from "@azure/ms-rest-js";
import * as PredictionApi from "@azure/cognitiveservices-customvision-prediction";

const predictionKey = process.env.NEXT_PUBLIC_VISION_PREDICTION_KEY;
const predictionResourceId = process.env.NEXT_PUBLIC_VISION_PREDICTION_RESOURCE_ID;
const predictionEndpoint = process.env.NEXT_PUBLIC_VISION_PREDICTION_ENDPOINT;
const predictionProjectId = process.env.NEXT_PUBLIC_VISION_PREDICTION_PROJECT_ID;
const publishIterationName = process.env.NEXT_PUBLIC_VISION_PREDICTION_ITERATION_NAME
const predictor_credentials = new msRest.ApiKeyCredentials({ inHeader: { "Prediction-key": predictionKey } });
const predictor = new PredictionApi.PredictionAPIClient(predictor_credentials, predictionEndpoint);

export const DefectDetect = () => {
    const [results, setResults] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 }); // Store image dimensions

    const handleFileChange = (event) => {
        if (event.target.files) {
            setImageFile(event.target.files[0]);
        }
    };

    const handleImageLoad = (event) => {
        const containerWidth = 400; // Adjust this based on your actual container width
        const naturalWidth = event.target.naturalWidth;
        const naturalHeight = event.target.naturalHeight;
        const scalingFactor = containerWidth / naturalWidth;
        const displayedWidth = containerWidth; // Full width of the container
        const displayedHeight = naturalHeight * scalingFactor; // Scaled height based on the width
    
        setImageSize({ width: displayedWidth, height: displayedHeight });
    };
    

    const handlePredict = async () => {
        if (imageFile instanceof Blob) {
            try {
                const res = await predictor.detectImage(predictionProjectId, publishIterationName, imageFile);
                const defectResults = res.predictions.filter(prediction => prediction.tagName === 'defect');
                setResults(defectResults);
                console.dir(defectResults);
            } catch (error) {
                console.error('Error classifying image:', error);
            }
        } else {
            console.error('No image file selected');
        }
    };

    const renderPrediction = (predictedResult, index) => {
        const boundingBox = predictedResult.boundingBox;
        const style = {
            position: 'absolute',
            border: '4px solid red',
            left: `${boundingBox.left * imageSize.width}px`,
            top: `${boundingBox.top * imageSize.height}px`,
            width: `${boundingBox.width * imageSize.width}px`,
            height: `${boundingBox.height * imageSize.height}px`,
        };
    
        return <div key={index} style={style}></div>;
    };
    
    return (
        <div style={{ position: 'relative', width: 'auto', height: 'auto' }}>
            Select Image to Scan:
            <input type="file" onChange={handleFileChange} />
            <button onClick={handlePredict}>Scan Image</button>
            {imageFile && (
                <img src={URL.createObjectURL(imageFile)} alt="Preview" onLoad={handleImageLoad}  />
            )}
            {imageSize.width > 0 && imageSize.height > 0 && results && results.map(renderPrediction)}
        </div>
    );
    
};