import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import MetaData from '../../Layouts/MetaData';
import Loader from '../../Layouts/Loader';
import SellerOnBoarding from '../SellerOnBoarding';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

const SellerBankAccountADDForm = () => {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [holderName, setHolderName] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [logoFile, setLogoFile] = useState(null);
    const [previewLogo, setPreviewLogo] = useState(null);
    const [IFSCCode, setIFSCCode] = useState('');
    const [UPIID, setUPIID] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [accountType, setAccountType] = useState('');
    const [onboardingSteps, setOnboardingSteps] = useState([2, 1, 0, 0, 0, 0]);

    const { loading } = useSelector(state => state.seller);

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        setLogoFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewLogo(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const isValidPhoneNumber = (number) => {
        return /^[0-9]{10}$/.test(number);
    };

    const isValidIndianUPIID = (UPIID) => {
        return /^[1-9][0-9]{5}$/.test(UPIID);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isValidPhoneNumber(mobileNumber)) {
            enqueueSnackbar("Please enter a valid 10 digit phone number.", { variant: "error" });
            return;
        }
        if (!isValidIndianUPIID(UPIID)) {
            enqueueSnackbar("Please enter a valid india UPIID.", { variant: "error" });
            return;
        }

        if (!holderName || !bankName || !accountNumber || !logoFile || !IFSCCode ) {
            enqueueSnackbar("Please fill all the required fields.", { variant: "success" });
            return;
        }

        console.log("Form submitted with:", {
            holderName,
            bankName,
            accountNumber,
            logoFile,
            IFSCCode,
            UPIID,
            mobileNumber,
            accountType
        });
        enqueueSnackbar("Form submitted successfully!", { variant: "success" });
    };

    const getStatus = (step) => {
        switch (onboardingSteps[step]) {
            case 1:
                return (
                    <span className="text-green-600 font-medium border border-green-600 px-3 py-1 rounded-md text-sm">
                        APPROVED
                    </span>
                );
            case 2:
                return (
                    <span className="text-red-600 font-medium border border-red-600 px-3 py-1 rounded-md text-sm">
                        REJECTED
                    </span>
                );
            case 0:
                return (
                    <span className="text-yellow-600 font-medium border border-yellow-600 px-3 py-1 rounded-md text-sm">
                        STATE OF APPROVAL
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <MetaData title="Bank account setup" />

            {loading ? <Loader /> :
                <>
                    <SellerOnBoarding steps={onboardingSteps} />
                    <main className="w-full mt-12 sm:mt-0">
                        <form onSubmit={handleSubmit} className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">
                            <div className="flex-1 overflow-hidden shadow bg-white">
                                <div className="flex flex-col gap-5 m-4 sm:mx-8 sm:my-6">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-2xl font-semibold text-gray-800">Onboarding Step 2: Bank account setup</h2>
                                        {getStatus(1)}
                                    </div>
                                    <div className="flex gap-5 flex-col sm:flex-row">
                                        <InputField
                                            label="Account Holder Name"
                                            value={holderName}
                                            setValue={setHolderName}
                                            type="text"
                                            required
                                        />
                                        <InputField
                                            label="Bank Name"
                                            value={bankName}
                                            setValue={setBankName}
                                            type="text"
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-5 flex-col sm:flex-row">
                                        <InputField
                                            label="Bank Account Number"
                                            value={accountNumber}
                                            setValue={setAccountNumber}
                                            type="number"
                                            required
                                        />
                                        <InputField
                                            label="IFSC Code"
                                            value={IFSCCode}
                                            setValue={setIFSCCode}
                                            type="text"
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-5 flex-col sm:flex-row">
                                        <InputField
                                            label="UPI ID"
                                            value={UPIID}
                                            setValue={setUPIID}
                                            type="text"
                                            required
                                        />
                                        <InputField
                                            label="Account Type"
                                            value={accountType}
                                            setValue={setAccountType}
                                            type="text"
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-5 flex-col sm:flex-row">
                                        <InputField
                                            label="Mobile Number"
                                            value={mobileNumber}
                                            setValue={setMobileNumber}
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-start sm:gap-[50px] gap-5">
                                        <div className="flex flex-col gap-2 w-full sm:w-1/2">
                                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                                Upload bank account photo <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="file"
                                                accept=".png,.jpg,.jpeg"
                                                onChange={handleLogoChange}
                                                className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700"
                                                required
                                            />
                                            {previewLogo && (
                                                <img
                                                    src={previewLogo}
                                                    alt="Preview"
                                                    className="w-32 h-32 object-contain border mt-2"
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-center sm:gap-6 gap-3 mt-4">
                                        <button
                                            type="button"
                                            onClick={() => navigate("/seller/create-store")}
                                            className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-8 rounded-md shadow-md font-medium"
                                        >
                                            prev
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-md shadow-md font-medium"
                                        >
                                            Save
                                        </button>
                                        <button business-info
                                            type="button"
                                            onClick={() => navigate("/seller/business-info")}
                                            className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-8 rounded-md shadow-md font-medium"
                                        >
                                            Next
                                        </button>
                                    </div>

                                    <img
                                        draggable="false"
                                        className="w-full object-contain"
                                        src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/myProfileFooter_4e9fe2.png"
                                        alt="footer"
                                    />
                                </div>
                            </div>
                        </form>
                    </main>
                </>
            }
        </>
    );
};

const InputField = ({ label, value, setValue, type = "text", required = false }) => (
    <div className="w-full">
        <label className="block text-sm font-medium text-gray-600 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
            placeholder={`Enter ${label.toLowerCase()}`}
            required={required}
        />
    </div>
);

export default SellerBankAccountADDForm;
