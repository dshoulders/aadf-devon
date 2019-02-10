const createCount = (countData) => ({
    year: countData.AADFYear,
    count: countData.AllMotorVehicles,
    estimated: countData.Estimation_method === 'Estimated'
})

const createCountCollection = (countData) => ({
    easting: countData.Easting,
    northing: countData.Northing,
    road: countData.Road,
    startJunction: countData.StartJunction,
    endJunction: countData.EndJunction,
    counts: [
        createCount(countData)
    ]
})

export const createCountCollections = (data) =>  {

    // create a countCollection for each unique location    
    const groupedData = data.reduce((acc, countData) => {

        // concat easting + northing for object key to enable grouping
        const key = `${countData.Easting}${countData.Northing}`

        // when a countCollection already exists for a location add a count to the collection
        // otherwise create a countCollection with initial count
        acc.hasOwnProperty(key)
            ? acc[key].counts.push(createCount(countData))
            : acc[key] = createCountCollection(countData)
        
        return acc

    }, {})

    // we only need the values of the grouped data
    return  Object.values(groupedData)
}