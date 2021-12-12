import { Link } from 'react-router-dom';

export default function Error() {
    return (
        <div className="error flex flex-column align-center justify-center">
            <p>Oops! 404</p>
            <Link to="/">Back to homepage</Link>
        </div>
    );
}
