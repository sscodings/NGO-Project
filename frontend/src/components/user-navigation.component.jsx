import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";

const UserNavigationPanel = () => {

  return (
    <AnimationWrapper className="absolute right-0 z-50" transition={{ duration: 0.2 }}>
      <div className="bg-white absolute right-0 border border-grey w-60">

        <Link to="/profile" className="link pl-8 py-4">
          Profile
        </Link>

        <Link to="/dashboard" className="link pl-8 py-4">
          Dashboard
        </Link>

        <Link to="/settings" className="link pl-8 py-4">
          Settings
        </Link>

        <span className="absolute border-t border-grey w-full"></span>

        <button className="text-left p-4 hover:bg-grey w-full pl-8 py-4">
          <h1 className="font-bold text-xl">Sign Out</h1>
        </button>

      </div>
    </AnimationWrapper>
  );
};

export default UserNavigationPanel;