import React from "react";
import "./App.sass";
import Feed from "./Components/Feed/Feed";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>Hello World</h1>
				<Feed />
			</header>
		</div>
	);
}

export default App;
