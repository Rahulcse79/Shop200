import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import { useNavigate, Link } from 'react-router-dom';
import SellerOnBoarding from './SellerOnBoarding';
import MetaData from '../Layouts/MetaData';
import Loader from '../Layouts/Loader';

const SellerEditStoreInfo = () => { 

    const navigate = useNavigate();
    const { seller, loading, isAuthenticated, payloadSellerData } = useSelector(state => state.seller);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/seller/login")
        }
    }, [isAuthenticated, navigate]);

    const getLastName = () => {
        const nameArray = seller.name.split(" ");
        return nameArray[nameArray.length - 1];
    }

    return (
        <>
            <MetaData title="Seller Dashboard" />
            <>
                <MetaData title="My Profile" />

                {loading ? <Loader /> :
                    <>
                        {(payloadSellerData.onBoarding[5] !== 1) && <SellerOnBoarding steps={payloadSellerData.onBoarding} />}
                        <main className="w-full mt-12 sm:mt-24">
                            <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">
                                <Sidebar activeTab={"store"} /> 
                                <div className="flex-1 overflow-hidden shadow bg-white">
                                    <div className="flex flex-col gap-12 m-4 sm:mx-8 sm:my-6">
                                        <div className="flex flex-col gap-5 items-start">
                                            <span className="font-medium text-lg">Personal Information <Link to="/seller/dashboard/update" className="text-sm text-primary-blue font-medium ml-8 cursor-pointer">Edit</Link></span>

                                            <div className="flex flex-col sm:flex-row items-center gap-3" id="personalInputs">
                                                <div className="flex flex-col gap-0.5 w-64 px-3 py-1.5 rounded-sm border inputs cursor-not-allowed bg-gray-100 focus-within:border-primary-blue">
                                                    <label className="text-xs text-gray-500">First Name</label>
                                                    <input type="text" value={seller.name.split(" ", 1)} className="text-sm outline-none border-none cursor-not-allowed text-gray-500" disabled />
                                                </div>
                                                <div className="flex flex-col gap-0.5 w-64 px-3 py-1.5 rounded-sm border inputs cursor-not-allowed bg-gray-100 focus-within:border-primary-blue">
                                                    <label className="text-xs text-gray-500">Last Name</label>
                                                    <input type="text" value={getLastName()} className="text-sm outline-none border-none cursor-not-allowed text-gray-500" disabled />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <h2 className="text-sm">Your Gender</h2>
                                                <div className="flex items-center gap-8" id="radioInput">
                                                    <div className="flex items-center gap-4 inputs text-gray-500 cursor-not-allowed">
                                                        <input type="radio" name="gender" checked={seller.gender === "male"} id="male" className="h-4 w-4 cursor-not-allowed" disabled />
                                                        <label htmlFor="male" className="cursor-not-allowed">Male</label>
                                                    </div>
                                                    <div className="flex items-center gap-4 inputs text-gray-500 cursor-not-allowed">
                                                        <input type="radio" name="gender" checked={seller.gender === "female"} id="female" className="h-4 w-4 cursor-not-allowed" disabled />
                                                        <label htmlFor="female" className="cursor-not-allowed">Female</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-5 items-start">
                                            <span className="font-medium text-lg"> Email Address </span>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col gap-0.5 sm:w-64 px-3 py-1.5 rounded-sm border bg-gray-100 cursor-not-allowed focus-within:border-primary-blue">
                                                    <label className="text-xs text-gray-500">Email Address</label>
                                                    <input type="email" value={seller.email} className="text-sm outline-none border-none cursor-not-allowed text-gray-500" disabled />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-5 items-start">
                                            <span className="font-medium text-lg">Mobile Number
                                                <span className="text-sm text-primary-blue font-medium ml-3 sm:ml-8 cursor-pointer" id="mobEditBtn">Edit</span>
                                            </span>

                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col gap-0.5 sm:w-64 px-3 py-1.5 rounded-sm border bg-gray-100 cursor-not-allowed focus-within:border-primary-blue">
                                                    <label className="text-xs text-gray-500">Mobile Number</label>
                                                    <input type="tel" value="+919752079591" className="text-sm outline-none border-none text-gray-500 cursor-not-allowed" disabled />
                                                </div>
                                            </div>

                                        </div>

                                       </div>

                                    <img draggable="false" className="w-full object-contain" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/myProfileFooter_4e9fe2.png" alt="footer" />
                                </div>
                            </div>
                        </main>
                    </>
                }
            </>
        </>
    );
};

export default SellerEditStoreInfo