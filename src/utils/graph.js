export const time = (timeData) => {
    let data = [];
    timeData.forEach( values => {
        data.push({
            ...values
        })
    })
    return data
}
