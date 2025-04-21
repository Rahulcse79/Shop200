import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MetaData from '../Layouts/MetaData';
import Loader from '../Layouts/Loader';
import MinCategory from '../Layouts/MinCategory';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';

const SellOnShop200 = () => {

    const { loading, isAuthenticated } = useSelector(state => state.user);
    const [showAll, setShowAll] = useState(false);

    const highlights = [
        { icon: "👥", title: "1k+ Shop200 Customers" },
        { icon: "📞", title: "One-Click Seller Support" },
        { icon: "🎉", title: "Festival Sales & More" }
    ];

    const sellerStories = [
        { name: "Vinay Garg, Activa & Digi Smart", quote: "Joining Shop200 boosted my business reach. The platform’s payment system and customer support are excellent!", image: "https://via.placeholder.com/80?text=Vinay" },
        { name: "Priya Sharma, Trendy Threads", quote: "Shop200 helped me turn my hobby into a real business. Sales are smooth and customer engagement is fantastic!", image: "https://via.placeholder.com/80?text=Priya" },
        { name: "Rohit Mehra, Home Essentials", quote: "Thanks to Shop200, my small home decor store now reaches customers all over India.", image: "https://via.placeholder.com/80?text=Rohit" },
        { name: "Anjali Patel, Craft Corner", quote: "I started with zero knowledge, but Shop200’s seller support made it easy to grow.", image: "https://via.placeholder.com/80?text=Anjali" },
        { name: "Aman Verma, TechBuzz", quote: "Tech sales skyrocketed after I joined Shop200. The interface is clean and seller-friendly.", image: "https://via.placeholder.com/80?text=Aman" },
        { name: "Sneha Jain, Ethnic Wears", quote: "My ethnic fashion brand found its audience faster than I imagined, thanks to Shop200.", image: "https://via.placeholder.com/80?text=Sneha" },
        { name: "Arjun Malhotra, GadgetHub", quote: "Highly recommended for gadget sellers! Timely payments and genuine buyers.", image: "https://via.placeholder.com/80?text=Arjun" },
        { name: "Pooja Kaur, Kitchen Karma", quote: "My kitchenware brand became a household name with the help of Shop200's wide reach.", image: "https://via.placeholder.com/80?text=Pooja" },
        { name: "Ramesh Bhatia, Daily Needs Mart", quote: "Shop200 made local delivery and customer management super easy for my grocery store.", image: "https://via.placeholder.com/80?text=Ramesh" },
        { name: "Neha Khanna, Decor Dreams", quote: "Decor Dreams scaled from 10 orders a month to 500+ after joining Shop200!", image: "https://via.placeholder.com/80?text=Neha" }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? sellerStories.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex === sellerStories.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex === sellerStories.length - 1 ? 0 : prevIndex + 1));
        }, 3000);

        return () => clearInterval(interval);
    }, [sellerStories.length]);

    return (
        <>
            <MetaData title="Sell on Shop200" />
            {loading ? <Loader /> : (
                <>
                    <MinCategory />

                    <main className="w-full mt-12 sm:mt-0 flex flex-col items-center bg-white">

                        <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 py-12 text-center text-white">
                            <img src={Logo} alt="Shop200 Logo" className="mx-auto mb-4 w-28 h-auto" />
                            <h1 className="text-4xl font-bold">Sell Online with Shop200</h1>
                            <p className="mt-2 text-lg">Reach thousands of customers and grow your business effortlessly!</p>
                            <div className="mt-6 space-x-4">
                                {!isAuthenticated ? (
                                    <>
                                        <Link to="/login" className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition">Login</Link>
                                        <Link to="/register" className="bg-yellow-400 text-gray-900 font-semibold px-6 py-2 rounded-full hover:bg-yellow-500 transition">Register</Link>
                                    </>
                                ) : (
                                    <Link to="/dashboard" className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition">Go to Dashboard</Link>
                                )}
                            </div>
                        </div>

                        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8 max-w-6xl w-full cursor-pointer">
                            {highlights.map((item, index) => (
                                <div key={index} className="flex flex-col items-center bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
                                    <div className="text-4xl mb-4">{item.icon}</div>
                                    <h3 className="font-semibold text-lg text-center text-gray-700">{item.title}</h3>
                                </div>
                            ))}
                        </section>

                        <section className="w-full p-8 max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Seller Success Stories</h2>
                            <div className="relative flex items-center justify-center">
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-0 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
                                >
                                    ◀
                                </button>

                                <div className="w-full flex justify-center">
                                    <div className="bg-white p-10 rounded-3xl shadow-2xl flex flex-col items-center max-w-2xl text-center transition-all duration-500">
                                        <img
                                            src={sellerStories[currentIndex].image}
                                            alt={sellerStories[currentIndex].name}
                                            className="w-24 h-24 rounded-full object-cover mb-6 shadow-lg"
                                        />
                                        <h3 className="font-semibold text-2xl text-gray-800">{sellerStories[currentIndex].name}</h3>
                                        <p className="text-gray-600 mt-4 text-lg italic">"{sellerStories[currentIndex].quote}"</p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleNext}
                                    className="absolute right-0 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
                                >
                                    ▶
                                </button>
                            </div>
                        </section>

                        <section className="bg-blue-50 py-10 text-center w-full">
                            <h3 className="text-2xl font-bold text-gray-800">Ready to start selling?</h3>
                            <p className="text-gray-600 mt-2">Join Shop200 today and unlock your business growth!</p>
                            <Link to="/register" className="mt-4 inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-700 transition">Register Now</Link>
                        </section>

                        <section className="p-8 text-center text-gray-500 text-sm">
                            <p>Shop200 is here to empower small and large businesses alike. Start your journey today!</p>
                        </section>

                    </main>
                </>
            )}
        </>
    );
};

export default SellOnShop200;
