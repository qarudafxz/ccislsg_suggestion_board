import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

//pages
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import UserDashboard from "./pages/suggestions/UserDashboard";

//components
import SideNavbar from "./components/side-navbar/SideNavbar";

function App() {
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
					path='/*'
					element={
						<div className='font-primary md:flex flex-row'>
							<SideNavbar />
							<Routes>
								<Route
									path='/dashboard'
									element={<UserDashboard />}
								/>
							</Routes>
						</div>
					}
				/>
			</Routes>
			<Analytics />
		</Router>
	);
}

export default App;
