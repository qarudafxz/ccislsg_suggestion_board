import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

//pages
import Home from "./pages/Home";

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
			</Routes>
			<Analytics />
		</Router>
	);
}

export default App;
