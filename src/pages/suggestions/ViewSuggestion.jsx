import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { buildUrl } from "../../utils/buildUrl";

function ViewSuggestion() {
	const { id } = useParams();
	const [suggestion, setSuggestion] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	return <div>ViewSuggestion</div>;
}

export default ViewSuggestion;
