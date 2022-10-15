import React, { useState } from 'react';
import './App.css';
import quizBank from './QuizBank';
import Axios from 'axios';

function App() {

	// object creation

	// iterator used to traverse quizBank
	const [currentQuestion, setCurrentQuestion] = useState(0);

	// flag for loading weather on button click
	const [weatherLoaded, setWeatherLoaded] = useState(false)

	// object with weather data
	const [weatherProps, setWeatherProps] = useState(
		{
			desc: "",
			temp: 0,
			wind_speed: 0,
			min_temp: 0,
			max_temp: 0
		});

	// list of runs to take on run button click
	const [runList, setrunList] = useState([]);

	// runButton flag
	const [showRun, setShowRun] = useState(false);

	// params to pull from DB with api
	const [queryParams, setQueryParam] = useState({
		mountain: null,
		difficulty_rating: null,
		jumps: null,
		busy_usually: null,
		slow_zones: null,
		moguls: null,
	});

	// function definitions
	const getRuns = () => {
		// query parameter for api to database
		const param = `?mountain=${queryParams.mountain}
			&difficulty_rating=${queryParams.difficulty_rating}
			&jumps=${queryParams.jumps}
			&busy_usually=${queryParams.busy_usually}
			&slow_zones=${queryParams.slow_zones}
			&moguls=${queryParams.moguls}`;

		Axios.get(`http://localhost:3001/runs${param}`).then((response) => {
			// after quiz concludes, set the response from db to runList
			setrunList(response.data);
		});
	}

	const getWeather = () => {

		Axios.get(
			'https://api.openweathermap.org/data/2.5/weather?q=Brian%20Head&units=imperial&appid=51f1e50c055dfcfacfaf3c1cea691f7b'
		).then((response) => {
			// used for debugging
			console.log(response.data);
			// adjust objects
			setWeatherProps({
				desc: response.data.weather[0].main,
				temp: response.data.main.temp.toFixed(),
				wind_speed: response.data.wind.speed,
				min_temp: response.data.main.temp_min.toFixed(),
				max_temp: response.data.main.temp_max.toFixed()
			});
			setWeatherLoaded(true);
		});


	};

	const answerButtonClick = (properties) => {
		Object.entries(properties).forEach(property => {
			// set each key appropriately with response
			const key = property[0];
			const value = property[1];
			const newQueryParams = { ...queryParams, [key]: value };

			setQueryParam(newQueryParams);
			console.log(newQueryParams);
		});  // calls properties from quiz bank and sets product accordingly

		// iterate list, else show results page 
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < quizBank.length) {
			setCurrentQuestion(nextQuestion);
		}
		else {
			setShowRun(true);
		}
	}

	return (
		<div className='app'>
			{showRun ? (
				<div className='results'>
					<div>
						<button className="runButton" onClick={getRuns}>Show runs{getRuns}</button>

						{runList.map((val, key) => {
							return <div className="run">{val.trail_name} </div>
						})}

						<div className='weather'>
							<h2>Weather in Brianhead:</h2>
							<button onClick={getWeather}>Show weather</button>
							{weatherLoaded && (
								<div className='weatherData'>
									<h3>Conditions: {weatherProps.desc}</h3>
									<h3>Temperature: {weatherProps.temp}℉</h3>
									<h3>Wind speed: {weatherProps.wind_speed} MPH</h3>
									<h3>Low: {weatherProps.min_temp}℉</h3>
									<h3>High: {weatherProps.max_temp}℉</h3>
								</div>
							)}
						</div>

					</div>

				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{quizBank.length}
						</div>
						<div className='question-text'>{quizBank[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{quizBank[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => answerButtonClick(answerOption.properties)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
	);

}

export default App;
