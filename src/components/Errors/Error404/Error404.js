import { Link } from "react-router-dom";

const Error404 = () => {
    return(
        <div>
            <h1 className="display3 text-center">404 ERROR</h1>
			<h1 className="display4 text-center">
				<Link to="/">Return to Home Page</Link>
			</h1>
        </div>
    )
} 

export default Error404;