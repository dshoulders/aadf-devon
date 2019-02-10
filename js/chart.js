const selectedSeries = []

export const addSeries = (series) => {
    selectedSeries.push(series)
} 

export const clearSeries = () => {
    selectedSeries.length = 0
} 

export const createSeries = (element) => ({
    name: `${element.road} - ${element.startJunction} ⟷ ${element.endJunction}`,
    data: element.counts.map(count => ({
        x: count.year,
        y: count.count,
        name: `${count.year} ${count.estimated ? "(estimated)" : "(counted)"}`,
        color: count.estimated ? "#ff4f67" : "#89ff4f"
    }))
})

export const createChart = (chartElement) => Highcharts.chart(chartElement, {
    chart: {                        
        type: 'line'
    },
    title: { text: 'Annual Average Daily Flow' },
    xAxis: {
        categories: [ 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017 ],
    },
    yAxis: {
        title: {
            text: 'Count'
        }
    },
    series: selectedSeries,
})