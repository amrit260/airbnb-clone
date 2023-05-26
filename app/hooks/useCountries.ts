import countries from 'world-countries'

const formattedCountires = countries.map((Country) => ({
    value: Country.cca2,
    label: Country.name.common,
    flag: Country.flag,
    latlng: Country.latlng,
    region: Country.region
}))

const useCountries = () => {
    const getAll = () => formattedCountires;
    const getByValue = (value: string) => formattedCountires.find(country => country.value === value)

    return { getAll, getByValue }
}

export default useCountries;