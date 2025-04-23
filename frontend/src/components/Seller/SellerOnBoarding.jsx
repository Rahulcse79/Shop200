import { Link } from 'react-router-dom';

const categories = [
    "Create store",
    "Bank Account Setup",
    "Business Information",
    "Document Upload",
    "Verification",
    "Ready to Sell"
]

const SellerOnBoarding = () => {
    return (
        <section className="hidden sm:block bg-white w-full px-2 sm:px-12 overflow-hidden border-b mt-14">
            <div className="flex items-center justify-between p-0.5">
                {categories.map((el, i) => (
                    <Link 
                        // to="/" 
                        key={i} 
                        className="text-sm p-2 text-red-500 font-medium hover:text-red-700"
                    >
                        {el}
                    </Link>
                ))}
            </div>
        </section>
    );
};


export default SellerOnBoarding;
