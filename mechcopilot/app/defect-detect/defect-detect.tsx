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
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setImageSize({
        width: event.currentTarget.naturalWidth,
        height: event.currentTarget.naturalHeight,
      });
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setImageFile(event.target.files[0]);
      }
    };

    const handlePredict = async () => {
        if (imageFile instanceof Blob) {
            try {
                const res = await predictor.detectImage(predictionProjectId, publishIterationName, imageFile);
                 
                // Filter out results that are not of tagName = 'defect'
                 let defectResults = res.predictions.filter(prediction => prediction.tagName === 'defect');                
                
                 // Append the index to the tagName
                 defectResults = defectResults.map((predictedResult, index) => ({
                      ...predictedResult,
                      tagName: `${predictedResult.tagName}-${index}`
                  }));

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
        if (predictedResult.tagName !== 'defect') {
            return null;
        }
        const boundingBox = predictedResult.boundingBox;
        const style = {
            position: 'relative',
            border: '42px solid red !important',
            left: `${boundingBox.left * 100}%`,
            top: `${boundingBox.top * 100}%`,
            width: `${boundingBox.width * 100}%`,
            height: `${boundingBox.height * 100}%`,
        };

        return <div key={`${predictedResult.tagName}`} style={style}></div>;    };
    
    return (
        <div className="w-[400px] bg-slate-800 rounded-lg overflow-hidden text-slate-400 p-5 gap-5 flex flex-col border border-blue-800/40 shadow-2xl shadow-blue-900/30">
          Select Image to Scan:
          <input type="file" onChange={handleFileChange} />
          <button onClick={handlePredict}>Scan Image</button>
          {imageFile && <img src={URL.createObjectURL(imageFile)} onLoad={handleImageLoad} />}
          {results && results.predictions && results.predictions.map((predictedResult, index) => renderPrediction(predictedResult, index))}
        </div>
      );
};