import AnimationWrapper from "../common/page-animation";

const NGODashboard = () => {
    return (
        <AnimationWrapper>
            <section className="h-cover py-10">
                <h1 className="text-4xl font-bold mb-10">NGO Dashboard</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white p-6 border border-grey rounded-2xl shadow-sm text-center">
                        <h2 className="text-3xl font-bold text-blue-600 mb-2">24</h2>
                        <p className="text-dark-grey text-sm">Active Campaigns</p>
                    </div>
                    <div className="bg-white p-6 border border-grey rounded-2xl shadow-sm text-center">
                        <h2 className="text-3xl font-bold text-blue-600 mb-2">156</h2>
                        <p className="text-dark-grey text-sm">Volunteers Engaged</p>
                    </div>
                    <div className="bg-white p-6 border border-grey rounded-2xl shadow-sm text-center">
                        <h2 className="text-3xl font-bold text-blue-600 mb-2">89%</h2>
                        <p className="text-dark-grey text-sm">Task Completion</p>
                    </div>
                    <div className="bg-white p-6 border border-grey rounded-2xl shadow-sm text-center">
                        <h2 className="text-3xl font-bold text-blue-600 mb-2">4</h2>
                        <p className="text-dark-grey text-sm">Pending Approvals</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-semibold mb-6">Recent Applications</h2>
                        <div className="bg-white border border-grey rounded-2xl overflow-hidden mb-10">
                            <table className="w-full text-left">
                                <thead className="bg-grey/30 border-b border-grey font-medium">
                                    <tr>
                                        <th className="p-4">Volunteer</th>
                                        <th className="p-4">Campaign</th>
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-grey">
                                        <td className="p-4 font-medium">Aditi Sharma</td>
                                        <td className="p-4">Medical Support</td>
                                        <td className="p-4">Oct 12, 2023</td>
                                        <td className="p-4 flex gap-2">
                                            <button className="bg-green-600 text-white px-3 py-1 rounded-md text-sm">Approve</button>
                                            <button className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">Reject</button>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-grey">
                                        <td className="p-4 font-medium">Rahul Varma</td>
                                        <td className="p-4">Education Drive</td>
                                        <td className="p-4">Oct 11, 2023</td>
                                        <td className="p-4 flex gap-2">
                                            <button className="bg-green-600 text-white px-3 py-1 rounded-md text-sm">Approve</button>
                                            <button className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">Reject</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-semibold mb-6">Impact Overview</h2>
                        <div className="bg-white border border-grey rounded-2xl p-8">
                            <div className="flex items-end gap-4 h-48 border-b border-grey pt-4">
                                <div className="bg-blue-600/20 w-full h-[40%] rounded-t-lg relative group">
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-sm font-bold bg-black text-white px-2 py-1 rounded">20</div>
                                </div>
                                <div className="bg-blue-600/40 w-full h-[60%] rounded-t-lg relative group">
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-sm font-bold bg-black text-white px-2 py-1 rounded">35</div>
                                </div>
                                <div className="bg-blue-600/60 w-full h-[55%] rounded-t-lg relative group">
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-sm font-bold bg-black text-white px-2 py-1 rounded">30</div>
                                </div>
                                <div className="bg-blue-600/80 w-full h-[85%] rounded-t-lg relative group">
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-sm font-bold bg-black text-white px-2 py-1 rounded">50</div>
                                </div>
                                <div className="bg-blue-600 w-full h-[100%] rounded-t-lg relative group">
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-sm font-bold bg-black text-white px-2 py-1 rounded">68</div>
                                </div>
                            </div>
                            <div className="flex justify-between mt-4 text-dark-grey text-sm">
                                <span>June</span>
                                <span>July</span>
                                <span>Aug</span>
                                <span>Sept</span>
                                <span>Oct</span>
                            </div>
                            <p className="mt-8 text-center text-dark-grey italic">Engagement level has improved by 40% since joining SevaConnect.</p>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl mb-8 flex items-center justify-center gap-2">
                           <i className="fi fi-rr-plus text-xl mt-1"></i>
                           Post New Contribution
                        </button>
                        
                        <h2 className="text-2xl font-semibold mb-6">Active Posts</h2>
                        <div className="space-y-4">
                            <div className="bg-white p-6 border border-grey rounded-2xl">
                                <h3 className="font-bold mb-1">Blood Donation Drive</h3>
                                <p className="text-dark-grey text-sm mb-2">12 Applications received</p>
                                <div className="w-full bg-grey h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-blue-600 w-3/4 h-full"></div>
                                </div>
                            </div>
                            <div className="bg-white p-6 border border-grey rounded-2xl">
                                <h3 className="font-bold mb-1">Old Clothes Collection</h3>
                                <p className="text-dark-grey text-sm mb-2">28 Applications received</p>
                                <div className="w-full bg-grey h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-blue-600 w-1/2 h-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </AnimationWrapper>
    );
};

export default NGODashboard;
