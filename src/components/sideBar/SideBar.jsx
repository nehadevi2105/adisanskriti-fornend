// react icons
import { MdDashboard, MdLock, MdError } from "react-icons/md";
import { FaAngleRight, FaProductHunt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaBell, FaMicroblog } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { BiFileBlank } from "react-icons/bi";
import { GrOverview } from "react-icons/gr";
import { CgFileDocument } from "react-icons/cg";
import { FaCartArrowDown } from "react-icons/fa";
import { IoAlertCircle } from "react-icons/io5";
import { FaTableCells } from "react-icons/fa6";
import { TbSoccerField } from "react-icons/tb";
import { FaHeading } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { FaMouse } from "react-icons/fa";
import { TbChartDonutFilled } from "react-icons/tb";
import { FaPalette } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useState } from "react";

import "./SideBar.css";

const SideBar = () => {
	const [activeTab, setActiveTab] = useState(0);
	const [isactiveTabToggle, setIsActiveTabToggle] = useState(false);

	const isOpenSubmenu = (index) => {
		setActiveTab(index);
		setIsActiveTabToggle(!isactiveTabToggle);
	};

	return (
		<>
			<div className="sideBar-wrapper">
				<div className="all-left-menu">
					<h4 className="mt-3"> MAIN PAGES </h4>
					<ul>
						<li>
							<Link to="/analytics">
								<button
									type="button"
									className={` ${activeTab === 0 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(5)}
								>
									<span className="icon">
										{" "}
										<MdDashboard />{" "}
									</span>
									Dashboard
									{/* <span className="angle-abc"> 3 </span> */}
								</button>
							</Link>
						</li>
						{/* <li>
							<button
								className={` ${activeTab === 0 ? "active" : ""} `}
								onClick={() => isOpenSubmenu(0)}
							>
								<span className="icon">
									{" "}
									<MdDashboard />{" "}
								</span>
								DashBoard
								<span className="angle">
									{" "}
									<FaAngleRight />{" "}
								</span>
							</button>
							<div
								className={`submenuWrapper ${activeTab === 0 && isactiveTabToggle === true ? "colapse" : "colapsed"}`}
							>
								<ul>
									<li>
										<Link to="/ecommerce"> Ecommerce </Link>
									</li>
									<li>
										<Link to="/analytics"> Analytics </Link>
									</li>
									<li>
										<Link to="/crm"> Crm </Link>
									</li>
								</ul>
							</div>
						</li> */}
						{/* <li>
							<button
								className={` ${activeTab === 1 ? "active" : ""} `}
								onClick={() => isOpenSubmenu(1)}
							>
								<span className="icon">
									{" "}
									<MdLock />{" "}
								</span>
								Authentication
								<span className="angle">
									{" "}
									<FaAngleRight />{" "}
								</span>
							</button>
							{/* <div className={`submenuWrapper ${activeTab === 1 && isactiveTabToggle === true ? "colapse" : "colapsed"}`}> 
                    <ul>
                        <li> <Link to="/login"> Login </Link></li>
                        <li> <Link to="/register"> Registation </Link></li>
                        <li> <Link to="/forget"> Forget Password  </Link></li>
                      </ul>
                  </div> 
						</li> */}

						{/* <li>
							<button
								className={` ${activeTab === 2 ? "active" : ""} `}
								onClick={() => isOpenSubmenu(2)}
							>
								<span className="icon">
									{" "}
									<FaRegCircleUser />{" "}
								</span>
								Users
								<span className="angle">
									{" "}
									<FaAngleRight />{" "}
								</span>
							</button>
							{/* <div className={`submenuWrapper ${activeTab === 2 && isactiveTabToggle === true ? "colapse" : "colapsed"}`}> 
                  <ul>
                      <li> <Link to="/user-list"> User List </Link></li>
                      <li> <Link to="/user-profile"> User Profile </Link></li>
                      <li> <Link to="/my-account"> My Account  </Link></li>
                    </ul>
                  </div> 
						</li> */}

						<li>
							<button
								className={` ${activeTab === 3 ? "active" : ""} `}
								onClick={() => isOpenSubmenu(3)}
							>
								<span className="icon">
									{" "}
									<FaProductHunt />{" "}
								</span>
								Upload Slider
								<span className="angle">
									{" "}
									<FaAngleRight />{" "}
								</span>
							</button>
							<div
								className={`submenuWrapper ${activeTab === 3 && isactiveTabToggle === true ? "colapse" : "colapsed"}`}
							>
								<ul>
									<li>
										<Link to="/slider-list"> Slider List </Link>
									</li>
									{/* <li><Link to="/slider-view"> Slider View  </Link></li> */}
									<li>
										<Link to="/slider-upload"> Slider Upload </Link>
									</li>
								</ul>
							</div>
						</li>
						{/* <li>
							<Link to="/upload-slider">
								<button
									className={` ${activeTab === 24 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(24)}
								>
									<span className="icon">
										{" "}
										<FaCartArrowDown />{" "}
									</span>
									Upload Slider
									<span className="angle-abc"> 3 </span>
								</button>
							</Link>
						</li> */}
						{/* <li>
							<button
								className={` ${activeTab === 4 ? "active" : ""} `}
								onClick={() => isOpenSubmenu(4)}
							>
								<span className="icon">
									{" "}
									<LiaFileInvoiceSolid />{" "}
								</span>
								Invoices
								<span className="angle">
									{" "}
									<FaAngleRight />{" "}
								</span>
							</button>
							{/* <div className={`submenuWrapper ${activeTab === 4 && isactiveTabToggle === true ? "colapse" : "colapsed"}`}> 
                        <ul>
                            <li> <Link to="/invoice-list"> Invoice List </Link></li>
                            <li> <Link to="/invoice-details"> Invoice Details </Link></li>
                          </ul>
                        </div> 
						</li>*/}
						<li>
							<Link to="/course-module">
								<button
									className={` ${activeTab === 4 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(4)}
								>
									<span className="icon">
										{" "}
										<IoMail />{" "}
									</span>
									Course Module
									<span className="angle-abc"> 4 </span>
								</button>
							</Link>
						</li>

						<li>
							<Link to="/AddCourseForm">
								<button
									type="button"
									className={` ${activeTab === 5 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(5)}
								>
									<span className="icon">
										{" "}
										<FaCartArrowDown />{" "}
									</span>
									Add Course Form
									{/* <span className="angle-abc"> 3 </span> */}
								</button>
							</Link>
						</li>
						<li>
							<Link to="/AddCourseList">
								<button
									type="button"
									className={` ${activeTab === 6 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(6)}
								>
									<span className="icon">
										{" "}
										<IoMail />{" "}
									</span>
									Courses List
									{/* <span className="angle-abc"> 3 </span> */}
								</button>
							</Link>
						</li>
						<li>
							<Link to="/CoreValuesForm">
								<button
									type="button"
									className={` ${activeTab === 7 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(7)}
								>
									<span className="icon">
										{" "}
										<FaBell />{" "}
									</span>
									Core Values Form
								</button>
							</Link>
						</li>

						<li>
							<Link to="/CoreValuesList">
								<button
									type="button"
									className={` ${activeTab === 8 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(8)}
								>
									<span className="icon">
										{" "}
										<IoIosSettings />{" "}
									</span>
									Core Value List
								</button>
							</Link>
						</li>

						<li>
							<Link to="/AdiSampadaSliderForm">
								<button
									type="button"
									className={` ${activeTab === 9 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(9)}
								>
									<span className="icon">
										{" "}
										<BiFileBlank />{" "}
									</span>
									Adi Sampada Form
								</button>
							</Link>
						</li>

						<li>
							<Link to="/AdiSampadaSliderList">
								<button
									type="button"
									className={` ${activeTab === 10 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(10)}
								>
									<span className="icon">
										{" "}
										<IoAlertCircle />{" "}
									</span>
									Adi Sampada List
								</button>
							</Link>
						</li>

						<li>
							<Link to="/AddRepoContentForm">
								<button
									type="button"
									className={` ${activeTab === 11 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(11)}
								>
									<span className="icon">
										{" "}
										<RxAvatar />{" "}
									</span>
									Repo Content Form
								</button>
							</Link>
						</li>

						<li>
							<Link to="/AddRepoContentList">
								<button
									type="button"
									className={` ${activeTab === 12 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(12)}
								>
									<span className="icon">
										<FaHeading />{" "}
									</span>
									Repo Content List
								</button>
							</Link>
						</li>

						<li>
							<Link to="/QuestionsForm">
								<button
									type="button"
									className={` ${activeTab === 13 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(13)}
								>
									<span className="icon">
										<FaMouse />
									</span>
									Questions
								</button>
							</Link>
						</li>

						<li>
							<Link to="/QuestionsList">
								<button
									type="button"
									className={` ${activeTab === 14 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(14)}
								>
									<span className="icon">
										{" "}
										<FaPalette />{" "}
									</span>
									Questions List
								</button>
							</Link>
						</li>

						<li>
							<Link to="/HomeSliderForm">
								<button
									type="button"
									className={` ${activeTab === 15 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(15)}
								>
									<span className="icon">
										{" "}
										<TbChartDonutFilled />{" "}
									</span>
									Home Slider Form
								</button>
							</Link>
						</li>

						<li>
							<Link to="/HomeSliderList">
								<button
									type="button"
									className={` ${activeTab === 16 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(16)}
								>
									<span className="icon">
										{" "}
										<TbSoccerField />{" "}
									</span>
									Home Slider List
								</button>
							</Link>
						</li>

						<li>
							<Link to="/AdiSanskritiForm">
								<button
									type="button"
									className={` ${activeTab === 17 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(17)}
								>
									<span className="icon">
										{" "}
										<FaTableCells />{" "}
									</span>
									AdiSanskriti Form
								</button>
							</Link>
						</li>

						<li>
							<Link to="/AdiSanskritiList">
								<button
									type="button"
									className={` ${activeTab === 18 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(18)}
								>
									<span className="icon">
										{" "}
										<GrOverview />{" "}
									</span>
									AdiSanskriti List
								</button>
							</Link>
						</li>

						{/* <li>
							<Link to="/documentation">
								<button
									type="button"
									className={` ${activeTab === 20 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(20)}
								>
									<span className="icon">
										{" "}
										<CgFileDocument />{" "}
									</span>
									documentation
								</button>
							</Link>
						</li> */}

						{/* <li>
							<Link to="/message">
								<button
									className={` ${activeTab === 6 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(6)}
								>
									<span className="icon">
										{" "}
										<IoMail />{" "}
									</span>
									Messages
									<span className="angle-abc"> 3 </span>
								</button>
							</Link>
						</li> */}
						{/* <li>
							<Link to="/notification">
								<button
									className={` ${activeTab === 7 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(7)}
								>
									<span className="icon">
										{" "}
										<FaBell />{" "}
									</span>
									Notifications
									<span className="angle-abc"> 8 </span>
								</button>
							</Link>
						</li>*/}

						{/* <li>
							<Link to="/blank-page">
								<button
									className={` ${activeTab === 9 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(9)}
								>
									<span className="icon">
										{" "}
										<BiFileBlank />{" "}
									</span>
									Blank Pages
								</button>
							</Link>
						</li> */}

						{/* <li>
							<Link to="/alert">
								<button 
									className={` ${activeTab === 10 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(10)}
								>
									<span className="icon">
										{" "}
										<IoAlertCircle />{" "}
									</span>
									Alert
								</button>
							</Link>
						</li> */}
						{/* <li>
							<Link to="/avaters">
								<button
									className={` ${activeTab === 11 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(11)}
								>
									<span className="icon">
										{" "}
										<RxAvatar />{" "}
									</span>
									Avater
								</button>
							</Link>
						</li> */}
						{/* <li>
							<Link to="/heading">
								<button
									className={` ${activeTab === 12 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(12)}
								>
									<span className="icon">
										<FaHeading />{" "}
									</span>
									Heading
								</button>
							</Link>
						</li> */}
						{/* <li>
							<Link to="/buttons">
								<button
									className={` ${activeTab === 13 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(13)}
								>
									<span className="icon">
										<FaMouse />
									</span>
									Buttons
								</button>
							</Link>
						</li> */}
						{/* <li>
							<Link to="/colors">
								<button
									className={` ${activeTab === 14 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(14)}
								>
									<span className="icon">
										{" "}
										<FaPalette />{" "}
									</span>
									colors
								</button>
							</Link>
						</li> */}
						{/* <li>
							<Link to="/charts">
								<button
									className={` ${activeTab === 15 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(15)}
								>
									<span className="icon">
										{" "}
										<TbChartDonutFilled />{" "}
									</span>
									Charts
								</button>
							</Link>
						</li> */}
						{/* <li>
							<Link to="/fields">
								<button
									className={` ${activeTab === 16 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(16)}
								>
									<span className="icon">
										{" "}
										<TbSoccerField />{" "}
									</span>
									Fields
								</button>
							</Link>
						</li> */}
						{/* <li>
							<Link to="/tables">
								<button
									className={` ${activeTab === 17 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(17)}
								>
									<span className="icon">
										{" "}
										<FaTableCells />{" "}
									</span>
									Tables
								</button>
							</Link>
						</li> */}
						{/* <li>
							<Link to="/overview">
								<button
									className={` ${activeTab === 18 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(18)}
								>
									<span className="icon">
										{" "}
										<GrOverview />{" "}
									</span>
									over view
								</button>
							</Link>
						</li> */}
						<li>
							<Link to="/CulturalHeritageForm">
								<button
									type="button"
									className={` ${activeTab === 19 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(19)}
								>
									<span className="icon">
										{" "}
										<MdError />{" "}
									</span>
									Cultural Heritage Form
								</button>
							</Link>
						</li>
						{/* <li>
							<Link to="/documentation">
								<button
									className={` ${activeTab === 20 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(20)}
								>
									<span className="icon">
										{" "}
										<CgFileDocument />{" "}
									</span>
									documentation
								</button>
							</Link>
						</li> */}
						{/* <li>
							<Link to="/change-log">
								<button
									className={` ${activeTab === 21 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(21)}
								>
									<span className="icon">
										{" "}
										<FaMicroblog />{" "}
									</span>
									change log
								</button>
							</Link>
						</li> */}
						<li>
							<Link to="/AadiVishvavidyalaForm">
								<button
									className={` ${activeTab === 22 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(22)}
								>
									<span className="icon">
										{" "}
										<FaMicroblog />{" "}
									</span>
									Aadi Vishwavidyalaya Form
								</button>
							</Link>
						</li>
						<li>
							<Link to="/CulturalHeritageList">
								<button
									className={` ${activeTab === 23 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(23)}
								>
									<span className="icon">
										{" "}
										<FaMicroblog />{" "}
									</span>
									Cultural Heritage List
								</button>
							</Link>
						</li>
						{/* <li>
							<Link to="/category-list">
								<button
									className={` ${activeTab === 23 ? "active" : ""} `}
									onClick={() => isOpenSubmenu(23)}
								>
									<span className="icon">
										{" "}
										<FaMicroblog />{" "}
									</span>
									Category List
								</button>
							</Link>
						</li> */}
					</ul>
					{/* <div className="logoutWrapper">
						<Link to="/login">
							<button>
								<span>
									{" "}
									<MdLock />
								</span>
								Logout
							</button>
						</Link>
					</div> */}
				</div>
			</div>
		</>
	);
};

export default SideBar;
