//import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Header = () => {
	return (
		<header className="navbar navbar-expand-lg nav-dnews">
			<div id="topbar" className="align-items-center fixed-top">
				<div className="container-fluid top-navs-newd">
					<div className="contact-info mr-auto text-dark small font-weight-bold pt-1 pb-1 d-none d-sm-none d-lg-block">
						<span className="mr-2">
							GOVERNMENT OF INDIA
							<span>
								&nbsp;&nbsp; | &nbsp;&nbsp;
								<span className="ml-2">MINISTRY OF TRIBAL AFFAIRS</span>
							</span>
						</span>
					</div>
					<div className="screen-tops">
						<ul className="rightLinks cf">
							<li>
								<a
									tabIndex="1"
									href=""
									className="skipContent"
									title="Skip to Main Content"
								>
									Skip to Main Content
								</a>
							</li>
							<li>
								<a
									href="https://adisanskriti.tribal.gov.in/screen-reader"
									title="Screen Reader Access"
								>
									Screen Reader Access
								</a>
							</li>
							<li className="fontResize">
								<div id="accessControl" className="textResizeWrapper">
									<div className="fontResizeInfo">
										<input
											type="button"
											name="font_normal"
											value="A-"
											id="fontScaler-down"
											title="Small Font Size"
											className="fontScaler small font-small"
										/>
										<input
											type="button"
											name="font_large"
											value="A"
											id="fontScaler-normal"
											title="Normal Font Size"
											className="fontScaler normal font-normal"
										/>
										<input
											type="button"
											name="font_larger"
											value="A+"
											id="fontScaler-up"
											title="Larger Font Size"
											className="fontScaler large font-large"
										/>
									</div>
									<input
										type="button"
										name="wob"
										value="High Contrast View"
										id="contrast_wob"
										title="High Contrast View"
										className="contrastChanger wob"
									/>
									<input
										type="button"
										name="normal"
										value="Standard View"
										id="contrast_normal"
										title="Standard View"
										className="contrastChanger normal"
									/>
								</div>
							</li>
							<li className="langDropDown"></li>
							<li className="search">
								<a href="#">
									<span className="fas fa-search"></span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="container-fluid fix-headers">
				<a
					href="https://adisanskriti.tribal.gov.in/"
					title="Home"
					className="logos-imgs navbar-brand d-flex align-items-center px-4 px-lg-5"
				>
					<img
						className="dnew-logos"
						src="/src/img/aadi.png"
						alt="logo adi-sanskriti"
					/>
				</a>

				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				{/* <nav className="navbar navbar-expand-lg navbar-light bg-light text-amber-900">
					<div
						className="collapse navbar-collapse show"
						id="navbarSupportedContent"
					>
						<div className="row align-items-center" style={{ color: "black" }}>
							<div className="col-lg-12 col-xxl-12 col-left">
								<div className="region-main-menu">
									<div className="container">
										<nav>
											<ul className="main-menu">
												<li
													className="main-menu__item"
													style={{ color: "black" }}
												>
													<a
														href="#"
														title="Home"
														className=""
														style={{ color: "black" }}
													>
														<span>Home</span>
													</a>
												</li>
												<li
													className="main-menu__item"
													style={{ color: "black" }}
												>
													<a
														href="vishwavidyalaya.html"
														className="vishwavidyalaya is-active"
														title="Aadi Vishwavidyalaya"
														style={{ color: "black" }}
													>
														<span>Aadi Vishwavidyalaya</span>
													</a>
												</li>
												<li className="main-menu__item">
													<a
														href="sampada.html"
														className="sampada"
														title="Aadi Sampada"
														style={{ color: "black" }}
													>
														<span>Aadi Sampada</span>
													</a>
												</li>
												<li className="main-menu__item">
													<a
														href="https://trifed.tribal.gov.in/"
														className="haat"
														title="Aadi Haat"
													>
														<span>Aadi Haat</span>
													</a>
												</li>
												<li
													className="main-menu__item"
													style={{ color: "black" }}
												>
													<a href="#nolink" className="joinus" title="Join Us">
														<span>Join Us</span>
													</a>
													<ul>
														<li className="main-menu__item">
															<a
																href="/contact/feedback"
																className="feedback"
																title="Feedback"
															>
																<span>Feedback</span>
															</a>
														</li>
														<li className="main-menu__item">
															<a
																href="/contact/volunteer"
																className="volunteer"
																title="volunteer"
															>
																<span>volunteer</span>
															</a>
														</li>
													</ul>
												</li>
											</ul>
										</nav>
									</div>
								</div>
							</div>
						</div>
					</div>
				</nav> */}

				<nav className="navbar navbar-expand-lg navbar-light">
					<div className="container-fluid">
						{/* <a className="navbar-brand" href="#">
							Navbar
						</a>
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button> */}
						<div
							className="collapse navbar-collapse"
							id="navbarSupportedContent"
						>
							<ul className="navbar-nav me-auto mb-2 mb-lg-0">
								<li className=" main-menu__item">
									<a
										className="nav-link active main-menu__link home"
										aria-current="page"
										href="#"
									>
										Home
									</a>
								</li>
								<li className="main-menu__item">
									<a
										className="nav-link active main-menu__link menu_link_content:8ff7fbd8-577c-4153-abe9-b910ffb3a251"
										aria-current="page"
										href="/AadiVishwaVidyalaWeb"
									>
										Aadi Vishwavidyalaya
									</a>
								</li>
								<li className="main-menu__item">
									<a
										className="nav-link active main-menu__link menu_link_content:5ce4b17b-2a2d-47d7-8383-7fb6fa53eed2"
										aria-current="page"
										href="/AadiSampada"
									>
										Aadi Sampada
									</a>
								</li>
								<li className="main-menu__item">
									<a
										className="nav-link active main-menu__link menu_link_content:e0d04de8-96e5-4b32-a56e-07065b50c122"
										aria-current="page"
										href="#"
									>
										Aadi Haat
									</a>
								</li>
								<li className="main-menu__item">
									<a
										className="nav-link active main-menu__link menu_link_content:21cba037-c729-4d1f-bf47-1ba7a030c40f"
										aria-current="page"
										href="#"
									>
										Join Us
									</a>
								</li>
								{/* <li className="nav-item dropdown">
									<a
										className="nav-link dropdown-toggle"
										href="#"
										id="navbarDropdown"
										role="button"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										Dropdown
									</a>
									<ul
										className="dropdown-menu"
										aria-labelledby="navbarDropdown"
									>
										<li>
											<a className="dropdown-item" href="#">
												Action
											</a>
										</li>
										<li>
											<a className="dropdown-item" href="#">
												Another action
											</a>
										</li>

										<li>
											<a className="dropdown-item" href="#">
												Something else here
											</a>
										</li>
									</ul>
								</li>
								<li className="nav-item">
									<a className="nav-link disabled">Disabled</a>
								</li> */}
							</ul>
							{/* <form className="d-flex">
								<input
									className="form-control me-2"
									type="search"
									placeholder="Search"
									aria-label="Search"
								/>
								<button className="btn btn-outline-success" type="submit">
									Search
								</button>
							</form> */}
						</div>
					</div>
				</nav>

				<div className="right-dnew-logo">
					<a
						href="https://tribal.nic.in/"
						title="Ministry of Tribal Affairs"
						className="logos-imgs navbar-brand d-flex align-items-center px-4 px-lg-5 external"
					>
						<img
							className="dright-logos"
							src="/src/img/Ministry_of_Tribal_Affairs.png"
							alt="logo Ministry_of_Tribal_Affairs"
						/>
					</a>
				</div>
			</div>
		</header>
	);
};

export default Header;
