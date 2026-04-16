import AnimationWrapper from "../common/page-animation";

const UserDashboard = () => {
    return (
        <AnimationWrapper>
            <section className="h-cover py-10">
                <h1 className="text-4xl font-bold mb-10">Volunteer Dashboard</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-semibold mb-6">My Applications</h2>
                        <div className="bg-white border border-grey rounded-2xl overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-grey/30 border-b border-grey font-medium">
                                    <tr>
                                        <th className="p-4">NGO Name</th>
                                        <th className="p-4">Contribution</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-grey">
                                        <td className="p-4">Helping Hands</td>
                                        <td className="p-4">Teaching Kids</td>
                                        <td className="p-4">
                                            <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">Pending</span>
                                        </td>
                                        <td className="p-4">
                                            <button className="text-blue-600 hover:underline">View Details</button>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-grey">
                                        <td className="p-4">Green Earth</td>
                                        <td className="p-4">Tree Plantation</td>
                                        <td className="p-4">
                                            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">Approved</span>
                                        </td>
                                        <td className="p-4">
                                            <button className="text-blue-600 hover:underline">Chat</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <h2 className="text-2xl font-semibold mb-6">Explore Needs</h2>
                        <div className="space-y-4">
                            <div className="bg-white p-6 border border-grey rounded-2xl">
                                <h3 className="font-bold mb-2">Food Distribution</h3>
                                <p className="text-dark-grey text-sm mb-4">City Shelter needs 5 volunteers for evening shift.</p>
                                <button className="bg-blue-600 text-white w-full py-2 rounded-lg font-medium">Apply Now</button>
                            </div>
                            <div className="bg-white p-6 border border-grey rounded-2xl">
                                <h3 className="font-bold mb-2">Digital Literacy</h3>
                                <p className="text-dark-grey text-sm mb-4">Help elderly people learn how to use smartphones.</p>
                                <button className="bg-blue-600 text-white w-full py-2 rounded-lg font-medium">Apply Now</button>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </AnimationWrapper>
    );
};

export default UserDashboard;
