// Data Array Generate
const dateArrayGenerator = () => {
    let date = []
    for (let i = 1; i <= 31; i++) {
        date.push(i)
    }
    
    return date
}


//  Year Array From 
const yearGenerator = (startYearFrom) => {
    startYearFrom = !startYearFrom ? 1980 : startYearFrom
    let currntDate = new Date().getFullYear()
    let years = []
    for (let i = startYearFrom; i <= currntDate; i++) {
        years.push(i)
    }

    return years
}

export const dateArray = dateArrayGenerator()
export const yearArray = yearGenerator(1950)
export const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']