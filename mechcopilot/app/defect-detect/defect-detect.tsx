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

export const DefectDetect = ({ containerRef }) => {
    const [results, setResults] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 }); // Store image dimensions

    const handleFileChange = (event) => {
        if (event.target.files) {
            setImageFile(event.target.files[0]);
        }
    };

    const handleImageLoad = (event) => {
        let containerWidth = containerRef.current ? containerRef.current.offsetWidth : 400; // Fallback to 400px if ref is not available
        const naturalWidth = event.target.naturalWidth;
        const naturalHeight = event.target.naturalHeight;
        const scalingFactor = containerWidth / naturalWidth;
        const displayedWidth = containerWidth;
        const displayedHeight = naturalHeight * scalingFactor;
    
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
            left: `${boundingBox.left * 100}%`,  // Calculate left as a pixel value
            top: `${boundingBox.top * 100}%`,  // Calculate top as a pixel value
            width: `${boundingBox.width * 100}%`,  // Calculate width as a pixel value
            height: `${boundingBox.height * 100}%`,  // Calculate height as a pixel value
        };

        return (
            <div key={predictedResult.tagName} style={style}>
              <img src="/red-arrow-down.svg" alt="defect arrow" style={{ width: '100%', height: '100%' }} />
            </div>
          );
    };
    
    return (
        <div className="w-full bg-slate-800 rounded-lg overflow-hidden text-slate-400 p-5 gap-5 flex flex-col border-0" style={{ position: 'relative', width: 'auto', height: 'auto', padding: 0,margin: 0 }}>

        <div className="p-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an Image to Scan:</label>
            <input className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" onChange={handleFileChange} type="file" />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
        </div>
        {imageFile && 
        (<button className="p-2 border-none rounded-lg bg-green-400 text-white self-center" onClick={handlePredict}>Scan Image</button>)
        }
           
            {imageFile && (
            <img src={URL.createObjectURL(imageFile)} alt="Preview" onLoad={handleImageLoad} style={{ width: '100%', display: 'block', margin: '0 auto' }} />            )}
            {imageSize.width > 0 && imageSize.height > 0 && results && results.map(renderPrediction)}
        </div>
    );
    
};