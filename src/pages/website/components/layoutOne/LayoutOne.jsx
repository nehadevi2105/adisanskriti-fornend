import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
//import AadiVishwaVidyalaWeb from "../../aadiVishwaVidyalaWeb/AadiVishwaVidyalaWeb";

const LayoutOne = () => {
	return (
		<>
			<Header />
			<Outlet />
			{/* <AadiVishwaVidyalaWeb /> */}
			<Footer />
		</>
	);
};

export default LayoutOne;
