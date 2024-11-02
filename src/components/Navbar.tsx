import { Link } from 'react-router-dom';

export function Navbar() {
    return (
        <div className="w-full flex items-center justify-between gap-5 font-Poppins text-black px-10 py-5 bg-[#1DD79B] text-1xl">
            <Link to="/" className="hover:text-gray-800 transition-colors">
                <h1>Ledger</h1>
            </Link>
            <div className="flex justify-between items-center gap-20">
                <Link to="/about" className="hover:text-gray-800 transition-colors">
                    <h3>About</h3>
                </Link>
                <Link to="/services" className="hover:text-gray-800 transition-colors">
                    <h3>Services</h3>
                </Link>
                <Link to="/transactions" className="hover:text-gray-800 transition-colors">
                    <h3>Transactions</h3>
                </Link>
                <div className="flex items-center gap-6">
                    <a 
                        href="https://github.com/nsvoriginals" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-gray-800 transition-colors"
                    >
                        <h3>GitHub</h3>
                    </a>
                    <a 
                        href="https://linkedin.com/in/shashivardhan34" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-gray-800 transition-colors"
                    >
                        <h3>LinkedIn</h3>
                    </a>
                </div>
            </div>
        </div>
    );
}