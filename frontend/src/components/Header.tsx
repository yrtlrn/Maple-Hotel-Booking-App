import { Link } from "react-router-dom";

const Header = () => {
    // e: React.MouseEvent<HTMLButtonElement, MouseEvent>

    return (
        <header className="navbar bg-base-300">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl ">
                    Maple Hotel Booking
                </Link>
            </div>
            <div className="flex-none dropdown dropdown-end dropdown-hover">
                <div tabIndex={0} role="button" className="btn btn-ghost m-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-5 h-5 stroke-current "
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        ></path>
                    </svg>
                </div>
                <ul
                    tabIndex={0}
                    className={`dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52 `}
                >
                    <li>
                        <Link to="/sign-up">Sign Up</Link>
                    </li>
                    <li>
                        <Link to="/log-in">Log In</Link>
                    </li>
                    <li>
                        <Link to="/">Item 3</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};
export default Header;
