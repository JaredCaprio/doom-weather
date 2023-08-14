export default async function FetchWeatherData(data: any) {
  const city = data;

  try {
    let weatherData = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}&aqi=no`
    );
    if (weatherData.ok) {
      return weatherData.json();
    } else {
      console.error("Poopy response, abort");
      return null;
    }
  } catch (error) {
    console.error("Error Fetching weather data:", error);
    return null;
  }
}
