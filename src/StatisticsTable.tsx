import React, { useEffect, useState } from "react";
import { WineData } from "./wineData";

interface WineData {
  Alcohol: any;
  "Malic Acid": any;
  Ash: any;
  "Alcalinity of ash": any;
  Magnesium: any;
  "Total phenols": any;
  Flavanoids: any;
  Hue: any;
  // Add other properties
}

const wineData:WineData[] =WineData;
// const wineData: WineData[] = WineData;

const StatisticsTable: React.FC = () => {
  const [flavanoidsData, setFlavanoidsData] = useState<any[]>([]);
  const [gammaData, setGammaData] = useState<any[]>([]);

  useEffect(() => {
    // Calculate the "Gamma" property and create an array for "Flavanoids" and "Gamma" values.
    const flavanoidsArray: any[] = [];
    const gammaArray: any[] = [];

    for (const data of wineData) {
      // Calculate Gamma = (Ash * Hue) / Magnesium
      const gamma = (data.Ash * data.Hue) / data.Magnesium;

      flavanoidsArray.push(data.Flavanoids);
      gammaArray.push(gamma);
    }

    setFlavanoidsData(flavanoidsArray);
    setGammaData(gammaArray);
  }, []);

  // Utility function to calculate the mean of an array
  const calculateMean = (data: any[]) => {
    if (data.length === 0) return 0;
    const sum = data.reduce((acc, value) => parseInt(acc) + value, 0);
    let sum2 = sum / data.length;
    return sum2.toFixed(2);
  };

  // Utility function to calculate the median of an array
  const calculateMedian = (data: any[]) => {
    if (data.length === 0) return 0;
    const sortedData = [...data].sort((a, b) => a - b);
    const middle = Math.floor(sortedData.length / 2);

    if (sortedData.length % 2 === 0) {
      let sortmedian = (sortedData[middle - 1] + sortedData[middle]) / 2;

      return sortmedian.toFixed(2);
    } else {
      let sortmedianData = sortedData[middle];

      return sortmedianData.toFixed(2);
    }
  };

  // Utility function to calculate the mode of an array
  const calculateMode = (data: any[]) => {
    if (data.length === 0) return 0;
    const counts: Record<any, any> = {};
    let mode = data[0];
    let maxCount = 1;

    for (const value of data) {
      if (counts[value]) {
        counts[value]++;
      } else {
        counts[value] = 1;
      }

      if (counts[value] > maxCount) {
        mode = value;
        maxCount = counts[value];
      }
    }

    return mode.toFixed(2);
  };

  return (
   <div className="main-section">
     <div className="constainer">
      <h1 style={{marginBottom:'4rem'}}>Wine Data Analysis</h1>
      <h2>Class-wise Statistics for Flavanoids</h2>
      <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            {Array.from(
              new Set(wineData?.map((item) => item.Alcohol)).keys()
            ).map((classId) => {
              return <th key={classId}>Class {classId}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> Mean</td>
            {Array.from(
              new Set(wineData?.map((item) => item.Alcohol)).keys()
            ).map((classId) => {
              return <td key={classId}>{calculateMean(flavanoidsData)}</td>;
            })}
          </tr>
          <tr>
            <td>Median</td>
            {Array.from(
              new Set(wineData?.map((item) => item.Alcohol)).keys()
            ).map((classId) => {
              return <td key={classId}>{calculateMedian(flavanoidsData)}</td>;
            })}
          </tr>
          <tr>
            <td>Mode</td>
            {Array.from(
              new Set(wineData?.map((item) => item.Alcohol)).keys()
            ).map((classId) => {
              return <td key={classId}>{calculateMode(flavanoidsData)}</td>;
            })}
          </tr>
        </tbody>
      </table>
      </div>

      <h2 style={{marginTop:'4rem'}}>Class-wise Statistics for Gamma</h2>
      <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            {Array.from(
              new Set(wineData?.map((item) => item.Alcohol)).keys()
            ).map((classId) => {
              return <th key={classId}>Class {classId}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mean</td>
            {Array.from(
              new Set(wineData?.map((item) => item.Alcohol)).keys()
            ).map((classId) => {
              return <td key={classId}>{calculateMean(gammaData)}</td>;
            })}
          </tr>
          <tr>
            <td>Median</td>
            {Array.from(
              new Set(wineData?.map((item) => item.Alcohol)).keys()
            ).map((classId) => {
              return <td key={classId}>{calculateMedian(gammaData)}</td>;
            })}
          </tr>
          <tr>
            <td>Mode</td>
            {Array.from(
              new Set(wineData?.map((item) => item.Alcohol)).keys()
            ).map((classId) => {
              return <td key={classId}>{calculateMode(gammaData)}</td>;
            })}
          </tr>
        </tbody>
      </table>
      </div>
    </div>
   </div>
  );
};

export default StatisticsTable;
