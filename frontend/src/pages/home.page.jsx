import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <AnimationWrapper>
            <section className="h-cover flex flex-col items-center justify-center text-center">
                
                <div className="max-w-[800px] mb-12">
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                        Bridge the Gap Between <span className="text-blue-600">Kindness</span> and <span className="text-blue-600">Action</span>
                    </h1>
                    
                    <p className="text-xl text-dark-grey mb-10 px-4">
                        Connect with NGOs looking for your skills. Join thousands of volunteers making a real difference in their communities everyday.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/signup" className="btn-dark">
                            Start Volunteering
                        </Link>
                        <Link to="/about" className="btn-light">
                            Learn More
                        </Link>
                    </div>
                </div>

                <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-grey">
                        <h2 className="text-4xl font-bold text-blue-600 mb-2">500+</h2>
                        <p className="text-dark-grey">Registered NGOs</p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-grey">
                        <h2 className="text-4xl font-bold text-blue-600 mb-2">12k+</h2>
                        <p className="text-dark-grey">Volunteers Connected</p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-grey">
                        <h2 className="text-4xl font-bold text-blue-600 mb-2">8k+</h2>
                        <p className="text-dark-grey">Jobs Completed</p>
                    </div>
                </div>

            </section>

            <section className="bg-white py-20 px-[5vw] md:px-[10vw]">
                <h1 className="text-center text-4xl font-bold mb-16">How SevaConnect Works</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fi fi-rr-search text-3xl text-blue-600"></i>
                        </div>
                        <h3 className="text-2xl font-semibold mb-4">Discover</h3>
                        <p className="text-dark-grey">NGOs post specific needs and contributions they require.</p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fi fi-rr-paper-plane text-3xl text-blue-600"></i>
                        </div>
                        <h3 className="text-2xl font-semibold mb-4">Apply</h3>
                        <p className="text-dark-grey">Volunteers apply for tasks that match their skills and interests.</p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fi fi-rr-check text-3xl text-blue-600"></i>
                        </div>
                        <h3 className="text-2xl font-semibold mb-4">Impact</h3>
                        <p className="text-dark-grey">NGOs approve applications and tasks are completed together.</p>
                    </div>
                </div>
            </section>
        </AnimationWrapper>
    );
};

export default HomePage;
