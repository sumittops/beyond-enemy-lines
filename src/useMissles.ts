import { FLAG_OFFSET_WINDOW, NO_OF_MISSLES } from "./constants";
import { useState } from "react";

export type MissileType = {
    position: number,
    started: boolean,
    reached: boolean
};

const getMissleData = () => {
    const border = [FLAG_OFFSET_WINDOW, window.innerWidth - FLAG_OFFSET_WINDOW];
    const missilesArr: Array<MissileType> = [];
    const sectionLength = (border[1] - border[0]) / NO_OF_MISSLES; 
    let lastSection = border[0];
	for (let i = 0; i < NO_OF_MISSLES; i++) {
        const position = lastSection + (sectionLength * Math.random());
		missilesArr.push({
			position, started: false, reached: false
        });
        lastSection += lastSection;
    }
    return missilesArr;
}

const missilesArr = getMissleData();

export default function useMissiles() {
    const [missiles, setMissiles] = useState(missilesArr);
    return { missiles, setMissiles }
}