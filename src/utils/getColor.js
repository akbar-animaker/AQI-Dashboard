import { GOOD, MODERATE, POOR, SATISFACTORY, SEVERE, VERY_POOR } from "../constants"

export default function getColor(aqi) {
    if (aqi <= 50)
        return GOOD;
    else if (aqi <= 100)
        return SATISFACTORY;
    else if (aqi <= 200)
        return MODERATE
    else if (aqi <= 300)
        return POOR;
    else if (aqi <= 400)
        return VERY_POOR
    else
        return SEVERE;
}