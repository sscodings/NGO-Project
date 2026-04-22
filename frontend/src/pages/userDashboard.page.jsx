import { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const UserDashboard = () => {
    const navigate = useNavigate();
    const [needs, setNeeds] = useState([]);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedNeed, setSelectedNeed] = useState(null); // For View Details modal

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            // Test User mode: bypass authentication and load mock data
            setNeeds([
                {
                    _id: "mock1",
                    title: "Food Distribution",
                    category: "Volunteer",
                    description: "City Shelter needs 5 volunteers for evening shift to help distribute food to the homeless.",
                    organisation: { name: "Helping Hands" },
                    location: { city: "Mumbai" },
                    skillsRequired: ["Management", "Empathy"],
                    applicants: [],
                    status: "Open"
                },
                {
                    _id: "mock2",
                    title: "Digital Literacy Program",
                    category: "Educator",
                    description: "Help elderly people learn how to use smartphones, video calls, and safe browsing.",
                    organisation: { name: "Tech for All" },
                    location: { city: "Delhi" },
                    skillsRequired: ["Teaching", "Patience", "Tech-savvy"],
                    applicants: [{ user: "mock-user-id", status: "pending" }],
                    status: "Open"
                },
                {
                    _id: "mock3",
                    title: "Beach Clean-up Drive",
                    category: "Volunteer",
                    description: "Join our weekend coastal cleanup to preserve marine life and keep our beaches beautiful.",
                    organisation: { name: "Green Earth" },
                    location: { city: "Goa" },
                    skillsRequired: ["Physical Labor", "Teamwork"],
                    applicants: [{ user: "mock-user-id", status: "accepted" }],
                    status: "Open"
                },
                {
                    _id: "mock4",
                    title: "Fundraiser Event Manager",
                    category: "Event",
                    description: "We need an experienced event manager to help coordinate our annual charity gala.",
                    organisation: { name: "Care & Share" },
                    location: { city: "Bangalore" },
                    skillsRequired: ["Event Planning", "Leadership", "Communication"],
                    applicants: [],
                    status: "Open"
                }
            ]);
            setUserId("mock-user-id");
            setLoading(false);
            return;
        }

        try {
            // Decode JWT to get userId
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const decoded = JSON.parse(jsonPayload);
            setUserId(decoded.id);
            fetchNeeds(token);
        } catch (err) {
            console.error("Invalid token", err);
            navigate("/signin");
        }
    }, [navigate]);

    const fetchNeeds = async (token) => {
        try {
            const { data } = await axios.get("http://localhost:3000/user/all", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setNeeds(data);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to fetch needs");
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async (needId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            // Test Mode interaction
            setNeeds(prev => prev.map(need => {
                if (need._id === needId) {
                    return { ...need, applicants: [...need.applicants, { user: userId, status: "pending" }] };
                }
                return need;
            }));
            toast.success("Test Apply successful!");
            return;
        }

        try {
            const { data } = await axios.post(`http://localhost:3000/user/apply/${needId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success(data.message || "Applied successfully");
            fetchNeeds(token); // Refresh data
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to apply");
        }
    };

    const myApplications = needs.filter(need => need.applicants.some(app => app.user === userId));
    const exploreNeeds = needs.filter(need => !need.applicants.some(app => app.user === userId) && need.status === "Open");

    const getStatusColor = (status) => {
        switch (status) {
            case "pending": return "bg-yellow-100 text-yellow-600";
            case "accepted": return "bg-green-100 text-green-600";
            case "rejected": return "bg-red-100 text-red-600";
            default: return "bg-grey text-dark-grey";
        }
    };

    return (
        <AnimationWrapper>
            <section className="h-cover py-10 bg-grey/20">
                <Toaster />
                <div className="flex items-center gap-4 mb-10">
                    <h1 className="text-4xl font-bold">Volunteer Dashboard</h1>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">Beta</span>
                </div>

                {loading ? (
                    <div className="text-center text-dark-grey">Loading data...</div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        {/* My Applications Section */}
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                                <i className="fi fi-rr-document"></i> My Applications
                            </h2>
                            <div className="bg-white border border-grey rounded-2xl overflow-x-auto shadow-sm hover:shadow-md transition-shadow">
                                <table className="w-full text-left min-w-[600px] border-collapse">
                                    <thead className="bg-grey/50 border-b border-grey text-dark-grey font-medium text-sm">
                                        <tr>
                                            <th className="p-4">NGO Name</th>
                                            <th className="p-4">Contribution</th>
                                            <th className="p-4">Status</th>
                                            <th className="p-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myApplications.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="p-8 text-center text-dark-grey">
                                                    You haven't applied to any needs yet.
                                                </td>
                                            </tr>
                                        ) : (
                                            myApplications.map((need, index) => {
                                                const applicantData = need.applicants.find(app => app.user === userId);
                                                return (
                                                    <tr key={index} className="border-b border-grey last:border-0 hover:bg-grey/20 transition-colors">
                                                        <td className="p-4">
                                                            <div className="font-semibold text-black">{need.organisation?.name || "Unknown NGO"}</div>
                                                            <div className="text-sm text-dark-grey mt-1"><i className="fi fi-rr-marker text-xs"></i> {need.location?.city || "Remote"}</div>
                                                        </td>
                                                        <td className="p-4">
                                                            <div className="font-medium">{need.title}</div>
                                                            <div className="text-xs text-blue-600 bg-blue-50 w-max px-2 py-1 rounded mt-1">{need.category}</div>
                                                        </td>
                                                        <td className="p-4">
                                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(applicantData?.status)} shadow-sm`}>
                                                                {applicantData?.status || "Unknown"}
                                                            </span>
                                                        </td>
                                                        <td className="p-4">
                                                            <button 
                                                                onClick={() => setSelectedNeed(need)}
                                                                className="text-blue-600 hover:text-blue-800 font-medium hover:underline flex items-center gap-1"
                                                            >
                                                                Details <i className="fi fi-rr-arrow-small-right"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Explore Needs Section */}
                        <div className="lg:col-span-1">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                                <i className="fi fi-rr-search"></i> Explore Needs
                            </h2>
                            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                {exploreNeeds.length === 0 ? (
                                    <div className="bg-white p-6 border border-grey rounded-2xl text-center text-dark-grey">
                                        No new opportunities available right now.
                                    </div>
                                ) : (
                                    exploreNeeds.map((need, index) => (
                                        <div key={index} className="bg-white p-6 border border-grey rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors">{need.title}</h3>
                                                <span className="bg-grey text-dark-grey text-xs px-2 py-1 rounded">{need.category}</span>
                                            </div>
                                            <p className="text-sm font-medium text-blue-600 mb-3 flex items-center gap-1">
                                                <i className="fi fi-rr-building"></i> {need.organisation?.name || "Unknown NGO"}
                                            </p>
                                            <p className="text-dark-grey text-sm mb-5 line-clamp-2 leading-relaxed">{need.description}</p>
                                            
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {need.skillsRequired && need.skillsRequired.map((skill, i) => (
                                                    <span key={i} className="text-xs bg-grey px-2 py-1 rounded-md">{skill}</span>
                                                ))}
                                            </div>

                                            <button
                                                onClick={() => handleApply(need._id)}
                                                className="bg-blue-600 text-white w-full py-3 rounded-xl font-medium hover:bg-blue-700 active:scale-95 transition-all shadow-md hover:shadow-blue-600/20"
                                            >
                                                Apply Now
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                    </div>
                )}
                
                {/* Details Modal */}
                {selectedNeed && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                        <div className="bg-white rounded-3xl p-8 max-w-[500px] w-full shadow-2xl relative animate-fadeIn">
                            <button 
                                onClick={() => setSelectedNeed(null)}
                                className="absolute top-6 right-6 w-10 h-10 bg-grey rounded-full flex items-center justify-center hover:bg-red-100 hover:text-red-600 transition-colors"
                            >
                                <i className="fi fi-rr-cross"></i>
                            </button>
                            
                            <h2 className="text-2xl font-bold mb-2 pr-10">{selectedNeed.title}</h2>
                            <p className="text-blue-600 font-semibold mb-6 flex items-center gap-2">
                                <i className="fi fi-rr-building"></i> {selectedNeed.organisation?.name}
                            </p>
                            
                            <div className="space-y-4 text-dark-grey">
                                <div>
                                    <h4 className="font-semibold text-black mb-1">Description</h4>
                                    <p className="leading-relaxed text-sm">{selectedNeed.description}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold text-black mb-1">Category</h4>
                                        <p className="text-sm">{selectedNeed.category}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-black mb-1">Location</h4>
                                        <p className="text-sm">{selectedNeed.location?.city || "Remote"}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-black mb-2">Skills Required</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedNeed.skillsRequired?.map((skill, i) => (
                                            <span key={i} className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => setSelectedNeed(null)}
                                className="mt-8 w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-opacity-80 transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </AnimationWrapper>
    );
};

export default UserDashboard;
