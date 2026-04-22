import { useState } from "react";
import AnimationWrapper from "../common/page-animation";
import { Toaster, toast } from "react-hot-toast";

const NGODashboard = () => {
    
    // Mock data for applications
    const [applications, setApplications] = useState([
        { id: 1, volunteer: "Aditi Sharma", campaign: "Medical Support", date: "Oct 12, 2023", status: "pending" },
        { id: 2, volunteer: "Rahul Varma", campaign: "Education Drive", date: "Oct 11, 2023", status: "pending" },
        { id: 3, volunteer: "Sneha Patil", campaign: "Beach Cleanup", date: "Oct 10, 2023", status: "pending" },
    ]);

    // Mock data for active posts
    const [posts, setPosts] = useState([
        { id: 1, title: "Blood Donation Drive", applicants: 12, target: 16 },
        { id: 2, title: "Old Clothes Collection", applicants: 28, target: 50 },
    ]);

    const handleAction = (id, action) => {
        setApplications(prev => prev.filter(app => app.id !== id));
        toast.success(`Application ${action} successfully!`);
    };

    const handlePostNew = () => {
        // Just mock adding a new post
        const newPost = {
            id: Date.now(),
            title: "Community Outreach Program",
            applicants: 0,
            target: 10
        };
        setPosts([newPost, ...posts]);
        toast.success("New contribution posted successfully!");
    };

    return (
        <AnimationWrapper>
            <section className="h-cover py-10 bg-grey/20">
                <Toaster />
                
                <div className="flex items-center gap-4 mb-10">
                    <h1 className="text-4xl font-bold">NGO Dashboard</h1>
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-semibold">Test Mode</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white p-6 border border-grey rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl font-bold text-blue-600 mb-2">24</h2>
                            <p className="text-dark-grey font-medium">Active Campaigns</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 border border-grey rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-20 h-20 bg-green-50 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl font-bold text-green-600 mb-2">156</h2>
                            <p className="text-dark-grey font-medium">Volunteers Engaged</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 border border-grey rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-20 h-20 bg-purple-50 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl font-bold text-purple-600 mb-2">89%</h2>
                            <p className="text-dark-grey font-medium">Task Completion</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 border border-grey rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-20 h-20 bg-yellow-50 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl font-bold text-yellow-600 mb-2">{applications.length}</h2>
                            <p className="text-dark-grey font-medium">Pending Approvals</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <i className="fi fi-rr-users"></i> Recent Applications
                        </h2>
                        <div className="bg-white border border-grey rounded-2xl overflow-x-auto shadow-sm mb-10">
                            <table className="w-full text-left min-w-[600px] border-collapse">
                                <thead className="bg-grey/50 border-b border-grey text-dark-grey font-medium text-sm">
                                    <tr>
                                        <th className="p-5">Volunteer</th>
                                        <th className="p-5">Campaign</th>
                                        <th className="p-5">Date</th>
                                        <th className="p-5">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applications.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="p-8 text-center text-dark-grey">No pending applications left. Great job!</td>
                                        </tr>
                                    ) : (
                                        applications.map((app) => (
                                            <tr key={app.id} className="border-b border-grey last:border-0 hover:bg-grey/20 transition-colors">
                                                <td className="p-5 font-semibold text-black">{app.volunteer}</td>
                                                <td className="p-5 text-dark-grey">{app.campaign}</td>
                                                <td className="p-5 text-sm text-dark-grey">{app.date}</td>
                                                <td className="p-5 flex gap-2">
                                                    <button 
                                                        onClick={() => handleAction(app.id, 'approved')}
                                                        className="bg-green-100 text-green-700 hover:bg-green-200 hover:shadow font-medium px-4 py-1.5 rounded-lg text-sm transition-all active:scale-95"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button 
                                                        onClick={() => handleAction(app.id, 'rejected')}
                                                        className="bg-red-50 text-red-600 hover:bg-red-100 hover:shadow font-medium px-4 py-1.5 rounded-lg text-sm transition-all active:scale-95"
                                                    >
                                                        Reject
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <i className="fi fi-rr-chart-line-up"></i> Impact Overview
                        </h2>
                        <div className="bg-white border border-grey rounded-2xl p-8 shadow-sm">
                            <div className="flex items-end gap-4 h-48 border-b border-grey pt-4">
                                {[20, 35, 30, 50, 68].map((val, i) => (
                                    <div key={i} style={{ height: `${val}%` }} className="bg-gradient-to-t from-blue-600 to-blue-400 w-full rounded-t-lg relative group transition-all duration-500 hover:opacity-80 cursor-pointer">
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 text-sm font-bold bg-black shadow-lg text-white px-3 py-1 rounded-md z-10">
                                            {val}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 text-dark-grey text-sm font-medium">
                                <span>June</span>
                                <span>July</span>
                                <span>Aug</span>
                                <span>Sept</span>
                                <span>Oct</span>
                            </div>
                            <p className="mt-8 text-center text-dark-grey italic">Engagement level has improved by <span className="font-bold text-black">40%</span> since joining SevaConnect.</p>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <button 
                            onClick={handlePostNew}
                            className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl mb-8 flex items-center justify-center gap-2 shadow-md hover:shadow-blue-600/20 hover:bg-blue-700 active:scale-95 transition-all"
                        >
                           <i className="fi fi-rr-plus text-xl mt-1"></i>
                           Post New Contribution
                        </button>
                        
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <i className="fi fi-rr-list"></i> Active Posts
                        </h2>
                        <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                            {posts.map((post) => {
                                const percentage = Math.min((post.applicants / post.target) * 100, 100);
                                return (
                                    <div key={post.id} className="bg-white p-6 border border-grey rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer group">
                                        <h3 className="font-bold mb-2 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                                        <div className="flex justify-between items-end mb-3">
                                            <p className="text-dark-grey text-sm font-medium">{post.applicants} / {post.target} Applied</p>
                                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{Math.round(percentage)}%</span>
                                        </div>
                                        <div className="w-full bg-grey h-2 rounded-full overflow-hidden">
                                            <div 
                                                className="bg-blue-600 h-full transition-all duration-1000 ease-out" 
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </section>
        </AnimationWrapper>
    );
};

export default NGODashboard;
