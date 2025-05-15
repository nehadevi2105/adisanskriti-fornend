import Layout from "../components/layout/Layout";
import LayoutOne from "../pages/website/components/layoutOne/LayoutOne";

// single page list
import Home from "../pages/home/Home";
import Message from "../pages/message/Message";
import Notification from "../pages/notification/Notification";
import Setting from "../pages/setting/Setting";
import OrderList from "../pages/order/OrderList";

// login &  register
import Login from "../pages/authPage/login/Login";
import Register from "../pages/authPage/register/Register";
import Forget from "../pages/authPage/forget/Forget";

//dashboard list all
import Ecommerce from "../pages/dashBoard/ecommerce/Ecommerce";
import Analyticks from "../pages/dashBoard/analytics/Analyticks";
import Crm from "../pages/dashBoard/crm/Crm";

// product list
// import SliderList from "../pages/productAll/sliderList/SliderList";
// import SliderUpload from "../pages/productAll/sliderUpload/SliderUpload";
// // import SliderUpload from "../pages/sliderAll/SliderUpload";
// import SliderView from "../pages/productAll/sliderView/SliderView";

// invoice list
import InvoiceList from "../pages/invoiceAll/invoiceList/InvoiceList";
import InvoiceDetails from "../pages/invoiceAll/invoiceDetails/InvoiceDetails";
// user list
import UserList from "../pages/userAll/userList/UserList";
import UserProfile from "../pages/userAll/userProfile/UserProfile";
import MyAccount from "../pages/userAll/myAccount/MyAccount";

// other page list
import OverView from "../pages/otherPage/overView/OverView";
import SiteError from "../pages/otherPage/siteError/SiteError";
import Documentation from "../pages/otherPage/documentation/Documentation";
import ChangeLog from "../pages/otherPage/changeLog/ChangeLog";
import BlankPage from "../pages/otherPage/blankPage/BlankPage";
import Alert from "../pages/uiPages/alert/Alert";
import Avater from "../pages/uiPages/avater/Avater";
import Heading from "../pages/uiPages/heading/Heading";
import Button from "../pages/uiPages/button/Button";
import Color from "../pages/uiPages/color/Color";
import ChartP from "../pages/uiPages/charts/ChartP";
import Fields from "../pages/otherPage/fields/Fields";
import Table from "../pages/uiPages/table/Table";
import NotFound from "../pages/notFound/NotFound";
import CategoryList from "../pages/category/categoryList/CategoryList";
import CategoryAdd from "../pages/category/categoryAdd/CategoryAdd";

// Use only these three (admin version)
import SliderList from "../pages/Admin/AadiVishwavidyalaya/sliderAll/sliderList/SliderList";
import SliderUpload from "../pages/Admin/AadiVishwavidyalaya/sliderAll/sliderUpload/SliderUpload";
import SliderView from "../pages/Admin/AadiVishwavidyalaya/sliderAll/sliderView/SliderView";
//import CourseModuleForm from "../pages/Admin/AadiVishwavidyalaya/CourseModule/CoursemoduleForm";

//Add Course
import AddCourseForm from "../pages/Admin/AadiVishwavidyalaya/addCourses/AddCourseForm";
import AddCourseList from "../pages/Admin/AadiVishwavidyalaya/addCourses/AddCourseList";
import EditCourse from "../pages/Admin/AadiVishwavidyalaya/addCourses/EditCourse";

// Core Value
import CoreValuesForm from "../pages/Admin/AadiVishwavidyalaya/coreValues/CoreValuesForm";
import CoreValuesList from "../pages/Admin/AadiVishwavidyalaya/coreValues/CoreValuesList";
import EditCoreValues from "../pages/Admin/AadiVishwavidyalaya/coreValues/EditCoreValues";

//AdiSampadaSlider
import AdiSampadaSliderForm from "../pages/Admin/AadiVishwavidyalaya/adiSampadaSlider/AdiSampadaSliderForm";
import AdiSampadaSliderList from "../pages/Admin/AadiVishwavidyalaya/adiSampadaSlider/AdiSampadaSliderList";

//RepoContent
import AddRepoContentForm from "../pages/Admin/AadiVishwavidyalaya/addRepoContent/AddRepoContentForm";
import RepoContentList from "../pages/Admin/AadiVishwavidyalaya/addRepoContent/RepoContentList";
import EditRepoContent from "../pages/Admin/AadiVishwavidyalaya/addRepoContent/EditRepoContent";

//Questions
import QuestionsForm from "../pages/Admin/AadiVishwavidyalaya/questions/QuestionsForm";
import QuestionsList from "../pages/Admin/AadiVishwavidyalaya/questions/QuestionsList";

//Home Slider
import HomeSliderForm from "../pages/Admin/AadiVishwavidyalaya/homeSlider/HomeSliderForm";
import HomeSliderList from "../pages/Admin/AadiVishwavidyalaya/homeSlider/HomeSliderList";

//Adisanskriti images
import AdiSanskritiForm from "../pages/Admin/AadiVishwavidyalaya/adisanskriti/AdiSanskritiForm";
import AdiSanskritiList from "../pages/Admin/AadiVishwavidyalaya/adisanskriti/AdiSanskritiList";
import EditAdiSanskriti from "../pages/Admin/AadiVishwavidyalaya/adisanskriti/EditAdiSanskriti";

//website
//website header
import Header from "../pages/website/components/Header";
import Footer from "../pages/website/components/Footer";
//Aadi VishwaVidyalaWeb
import AadiVishwaVidyalaWeb from "../pages/website/aadiVishwaVidyalaWeb/AadiVishwaVidyalaWeb";
//Aadi Sampada
import AadiSampada from "../pages/website/aadiSampada/AadiSampada";


//website
//website header
import Header from "../pages/website/components/Header";
import Footer from "../pages/website/components/Footer";
//Aadi VishwaVidyalaWeb
import AadiVishwaVidyalaWeb from "../pages/website/aadiVishwaVidyalaWeb/AadiVishwaVidyalaWeb";
//Aadi Sampada
import AadiSampada from "../pages/website/aadiSampada/AadiSampada";


//Cultural Heritage
import CulturalHeritageForm from "../pages/Admin/AadiVishwavidyalaya/culturalHeritage/CulturalHeritageForm";

// create private router
export const privateRoute = [
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
				children: [
					{
						index: true,
						element: <Ecommerce />,
					},
					{
						path: "/ecommerce",
						element: <Ecommerce />,
					},
					{
						path: "/analytics",
						element: <Analyticks />,
					},
					{
						path: "/crm",
						element: <Crm />,
					},
					{
						path: "/slider-list",
						element: <SliderList />,
					},
					{
						path: "/slider-view",
						element: <SliderView />,
					},
					{
						path: "/slider-upload",
						element: <SliderUpload />,
					},
					{
						path: "/order-list",
						element: <OrderList />,
					},
					{
						path: "/category-list",
						element: <CategoryList />,
					},
					{
						path: "/category-add",
						element: <CategoryAdd />,
					},
					{
						path: "/notification",
						element: <Notification />,
					},
					{
						path: "/setting",
						element: <Setting />,
					},
					{
						path: "/message",
						element: <Message />,
					},
					{
						path: "/blank-page",
						element: <BlankPage />,
					},
					{
						path: "/invoice-list",
						element: <InvoiceList />,
					},
					{
						path: "/invoice-details",
						element: <InvoiceDetails />,
					},
					{
						path: "/user-list",
						element: <UserList />,
					},
					{
						path: "/user-profile",
						element: <UserProfile />,
					},
					{
						path: "/login",
						element: <Login />,
					},
					{
						path: "/register",
						element: <Register />,
					},
					{
						path: "/forget",
						element: <Forget />,
					},
					{
						path: "/my-account",
						element: <MyAccount />,
					},
					{
						path: "/overview",
						element: <OverView />,
					},
					{
						path: "site-error",
						element: <SiteError />,
					},
					{
						path: "/documentation",
						element: <Documentation />,
					},
					{
						path: "/change-log",
						element: <ChangeLog />,
					},
					{
						path: "/alert",
						element: <Alert />,
					},
					{
						path: "/avaters",
						element: <Avater />,
					},
					{
						path: "/heading",
						element: <Heading />,
					},
					{
						path: "/buttons",
						element: <Button />,
					},
					{
						path: "/colors",
						element: <Color />,
					},
					{
						path: "/charts",
						element: <ChartP />,
					},
					{
						path: "/fields",
						element: <Fields />,
					},
					{
						path: "/tables",
						element: <Table />,
					},
					{
						path: "*",
						element: <NotFound />,
					},
					// {
					//   path : "/slider-upload",
					//   element : <SliderUpload />
					// },

					{
						path: "/AddCourseForm",
						element: <AddCourseForm />,
					},

					{
						path: "/AddCourseList",
						element: <AddCourseList />,
					},

					{
						path: "/EditCourse/:id",
						element: <EditCourse />,
					},
					{
						path: "/CoreValuesForm",
						element: <CoreValuesForm />,
					},
					{
						path: "/CoreValuesList",
						element: <CoreValuesList />,
					},
					{
						path: "/EditCoreValues/:id",
						element: <EditCoreValues />,
					},
					{
						path: "/AdiSampadaSliderForm",
						element: <AdiSampadaSliderForm />,
					},
					{
						path: "/AdiSampadaSliderList",
						element: <AdiSampadaSliderList />,
					},
					{
						path: "/AddRepoContentForm",
						element: <AddRepoContentForm />,
					},
					{
						path: "/AddRepoContentList",
						element: <RepoContentList />,
					},
					{
						path: "/EditRepoContent/:id",
						element: <EditRepoContent />,
					},
					{
						path: "/QuestionsForm",
						element: <QuestionsForm />,
					},
					{
						path: "/QuestionsList",
						element: <QuestionsList />,
					},
					{
						path: "/HomeSliderForm",
						element: <HomeSliderForm />,
					},
					{
						path: "/HomeSliderList",
						element: <HomeSliderList />,
					},
					{
						path: "/AdiSanskritiForm",
						element: <AdiSanskritiForm />,
					},
					{
						path: "/AdiSanskritiList",
						element: <AdiSanskritiList />,
					},
					{
						path: "/EditAdiSanskriti/:id",
						element: <EditAdiSanskriti />,
					},
					{
						path: "/CulturalHeritageForm",
						element: <CulturalHeritageForm />,
					},
				],
			},
		],
	},
	{
		element: <LayoutOne />,
		children: [
			{
				path: "/AadiVishwaVidyalaWeb",
				element: <AadiVishwaVidyalaWeb />,
			},
			{
				path: "/WebsiteHeader",
				element: <Header />,
			},
			{
				path: "/WebsiteFooter",
				element: <Footer />,
			},
			{
				path: "/AadiSampada",
				element: <AadiSampada />,
			},
		],
	},
];
