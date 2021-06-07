// React
import React from "react";

// React VIS
import { RadialChart } from 'react-vis';

// =========================== IMPORTS END ===========================

const PurchaseChart = ({ purchases }) => {
    let data = [];

    // Save the vendor and amount from each purchase object
    purchases.forEach(purchase => {
        let vendor = purchase.purchase.vendor.toLowerCase()
        let amount = purchase.purchase.totalCost
        data.push([vendor,amount])
    })

    // Combine vendors that are the same
    const combineArray = (data) => {
        const map = {};
        for(const index in data){
            const vendor = data[index][0];
            const amount = data[index][1];
            if(map[vendor]){
                map[vendor] += amount;
            }else{
                map[vendor] = amount;
            }
        }
        return Object.keys(map).map(key => [key, map[key]]);
    }

    // Save unique vendors and their amounts
    let combinedData = combineArray(data)

    // Get the total value of all purchases
    let totalValue = data.map(d => d[1]).flat().reduce((a, b) => a + b, 0);

    let dataToChart = [];

    combinedData.forEach(d => {
        let percentage = d[1]/totalValue*100
        let label = `${d[0]} ($${d[1]})`
        let obj = {
            angle: percentage,
            label: label,
            innerRadius: .80,        
        }
        dataToChart.push(obj)
    })
    return <RadialChart
        data={dataToChart} 
        width={400} 
        height={400}
        showLabels={true}
        padAngle={.05}
        labelsRadiusMultiplier={1.10}
        labelsStyle={{fontWeight: 700}}
    />
}

export default PurchaseChart;