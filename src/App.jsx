import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

//pages
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AllSuggestions from "./pages/suggestions/AllSuggestions";
import YourSuggestions from "./pages/suggestions/YourSuggestions";
import ReportBug from "./pages/suggestions/ReportBug";

import Preloader from "./pages/Preloader";

//components
import SideNavbar from "./components/side-navbar/SideNavbar";
import Head from "./components/Head";
import ViewSuggestion from "./pages/suggestions/ViewSuggestion";

function App() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		preLoaderAsyncCall().then(() => setLoading(false));
	}, []);

	if (loading) {
		return <Preloader />;
	}

	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/about'
					element={<About />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/signup'
					element={<Signup />}
				/>
				<Route
					path='/*'
					element={
						<div>
							<Head />
							<div className='font-main md:flex flex-row gap-4'>
								<SideNavbar />
								<div className='xxxs:px-6 xxxs:px-8 xs:px-10 md:px-16'>
									<Routes>
										<Route
											path='/all'
											element={<AllSuggestions />}
										/>
										<Route
											path='/your-suggestions'
											element={<YourSuggestions />}
										/>
										<Route
											path='/report'
											element={<ReportBug />}
										/>
										<Route
											path='/suggestion/:id'
											element={<ViewSuggestion />}
										/>
									</Routes>
								</div>
							</div>
						</div>
					}
				/>
			</Routes>
			<Analytics />
		</Router>
	);
}

function preLoaderAsyncCall() {
	return new Promise((resolve) => setTimeout(resolve, 4000));
}

export default App;
