import { Link } from "react-router-dom";
import { useState } from "react";
//import fontawesome from "../../../../src/lib/fontawesome";

const AadiVishwaVidyalaWeb = () => {
	const [activeTab, setActiveTab] = useState("home");

	return (
		<main className="page-main" id="main">
			<div className="service-wrapper rbt-section-gap bg-color-white">
				<div>
					<div className="row mb--60">
						<div className="col-lg-12">
							<section className="vidSlider">
								<div className="slider-new">
									{/* Slides */}
									<div className="slider__slides">
										<div className="slide-vids s--active">
											<div
												className="slide__inner"
												style={{
													backgroundImage:
														"url(/sites/default/files/Thumbnail/2024-10/image-1920x1080.jpg)",
												}}
											>
												<video className="slide__video" autoPlay loop muted>
													<source
														src="src/img/Aadi-Vishwa-Vidyalaya-30th-Jan.mp4"
														type="video/mp4"
													/>
													Your browser does not support the video tag.
												</video>

												<div className="sound-option">
													<span className="unmute d-none">
														{/* Replace this with react-icons/fa if needed */}
														<svg
															className="svg-inline--fa fa-volume-high"
															aria-hidden="true"
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 640 512"
														>
															<path
																fill="currentColor"
																d="M533.6 32.5C598.5 85.2 ..."
															></path>
														</svg>
													</span>
													<span className="mute">
														<svg
															className="svg-inline--fa fa-volume-xmark"
															aria-hidden="true"
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 576 512"
														>
															<path
																fill="currentColor"
																d="M301.1 34.8C312.6 40 ..."
															></path>
														</svg>
													</span>
												</div>

												<div className="play-option">
													<span className="play d-none">
														<svg
															className="svg-inline--fa fa-play"
															aria-hidden="true"
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 384 512"
														>
															<path
																fill="currentColor"
																d="M73 39c-14.8-9.1 ..."
															></path>
														</svg>
													</span>
													<span className="pause">
														<svg
															className="svg-inline--fa fa-pause"
															aria-hidden="true"
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 320 512"
														>
															<path
																fill="currentColor"
																d="M48 64C21.5 64 ..."
															></path>
														</svg>
													</span>
												</div>
											</div>
										</div>

										<div className="slide-vids">
											<div
												className="slide__inner"
												style={{
													backgroundImage: "url('./src/img/slider1.jpg')",
												}}
											>
												<div className="slide__content">
													<h2 className="slide__heading">
														Aadi Vishwavidyalaya
													</h2>
												</div>
											</div>
										</div>

										<div className="slide-vids s--prev">
											<div
												className="slide__inner"
												style={{
													backgroundImage: "url('./src/img/slider2.jpg')",
												}}
											>
												<div className="slide__content">
													<h2 className="slide__heading">
														Aadi Vishwavidyalaya
													</h2>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="slider__control">
									<div className="slider__control-line"></div>
									<div className="slider__control-line"></div>
								</div>

								<div className="slider__control slider__control--right m--right">
									<div className="slider__control-line"></div>
									<div className="slider__control-line"></div>
								</div>
							</section>
						</div>
					</div>
					<section className="section-title text-center">
						<div className="container">
							<h2 className="title">Our Cultural Heritage</h2>
							<p className="description has-medium-font-size mt--20">
								At Aadi Vishwavidyalaya, we proudly offer courses that delve
								into and celebrate India's rich tribal art forms— each a vibrant
								reflection of the deep cultural heritage of diverse indigenous
								communities. Our platform provides a unique opportunity to
								learn, appreciate, and engage with these traditional art forms,
								guided by skilled tribal artists and experts.
							</p>
							<p className="description has-medium-font-size">
								Discover the beauty, symbolism, and techniques behind these
								indigenous art traditions as you embark on a journey to
								understand and preserve the artistic legacies of India’s tribes.
							</p>
							<div className="row justify-content-center">
								<div className="col-lg-12">
									<div className="row row--15 mt_dec--30 cat-box justify-content-center">
										{/* Tribal Dance */}
										<div className="col-lg-4 col-md-6 col-sm-6 col-12 mt--30">
											<div className="rbt-flipbox variation-2">
												<div className="rbt-flipbox-wrap rbt-service rbt-service-1 card-bg-1">
													<div className="rbt-flipbox-front rbt-flipbox-face inner">
														<div className="front-thumb w-100">
															<img
																alt="card-icon"
																src="img/tribal-dance.jpeg"
															/>
														</div>
														<div className="content">
															<h5 className="title">
																<a
																	href="/aadi-vishwavidyalaya/courses/dance"
																	target="_blank"
																	rel="noopener noreferrer"
																>
																	Tribal Dance
																</a>
															</h5>
															<p>
																Explore the rhythmic and expressive world of
																tribal dance, where each movement tells a story
																and celebrates cultural traditions...
															</p>
															<a
																className="rbt-btn-link stretched-link"
																href="/aadi-vishwavidyalaya/courses/dance"
																target="_blank"
																rel="noopener noreferrer"
															>
																Learn More
															</a>
														</div>
													</div>
													<div className="rbt-flipbox-back rbt-flipbox-face inner tri-dan">
														<div className="flip-back-top">
															<h2>Tribal Dance</h2>
														</div>
														<a
															className="rbt-btn rbt-switch-btn btn-white btn-sm"
															href="/aadi-vishwavidyalaya/courses/dance"
															target="_blank"
															rel="noopener noreferrer"
														>
															<span data-text="Learn More">Learn More</span>
														</a>
													</div>
												</div>
											</div>
										</div>

										{/* Repeat this pattern for other cards... */}

										{/* Tribal Painting */}
										<div className="col-lg-4 col-md-6 col-sm-6 col-12 mt--30">
											<div className="rbt-flipbox variation-2">
												<div className="rbt-flipbox-wrap rbt-service rbt-service-1 card-bg-2">
													<div className="rbt-flipbox-front rbt-flipbox-face inner">
														<div className="front-thumb w-100">
															<img alt="card-icon" src="img/course4.jpg" />
														</div>
														<div className="content">
															<h5 className="title">
																<a
																	href="/aadi-vishwavidyalaya/courses/painting"
																	target="_blank"
																	rel="noopener noreferrer"
																>
																	Tribal Painting
																</a>
															</h5>
															<p>
																Delve into the vibrant realm of tribal painting,
																featuring unique styles and symbolic motifs...
															</p>
															<a
																className="rbt-btn-link stretched-link"
																href="/aadi-vishwavidyalaya/courses/painting"
																target="_blank"
																rel="noopener noreferrer"
															>
																Learn More
															</a>
														</div>
													</div>
													<div className="rbt-flipbox-back rbt-flipbox-face inner tri-pan">
														<div className="flip-back-top">
															<h2>Tribal Painting</h2>
														</div>
														<a
															className="rbt-btn rbt-switch-btn btn-white btn-sm"
															href="/aadi-vishwavidyalaya/courses/painting"
															target="_blank"
															rel="noopener noreferrer"
														>
															<span data-text="Learn More">Learn More</span>
														</a>
													</div>
												</div>
											</div>
										</div>
										<div className="col-lg-4 col-md-6 col-sm-6 col-12 mt--30">
											<div className="rbt-flipbox variation-2">
												<div className="rbt-flipbox-wrap rbt-service rbt-service-1 card-bg-3">
													<div className="rbt-flipbox-front rbt-flipbox-face inner">
														<div className="front-thumb w-100">
															<img
																alt="card-icon"
																data-entity-type=""
																data-entity-uuid=""
																src="img/tribal-food.jpeg"
															/>
														</div>

														<div className="content">
															<h5 className="title">
																<a
																	href="/aadi-vishwavidyalaya/courses/cuisine"
																	target="_blank"
																>
																	Tribal Cuisine
																</a>
															</h5>
															<p>
																Discover the diverse flavors and culinary
																traditions of tribal cuisine. Our course
																introduces you to traditional cooking methods,
																indigenous ingredients, and the cultural
																significance of food in tribal life, offering a
																taste of authentic tribal flavors.
															</p>
															<a
																className="rbt-btn-link stretched-link"
																href="/aadi-vishwavidyalaya/courses/cuisine"
																target="_blank"
															>
																Learn More
															</a>
														</div>
													</div>
													<div className="rbt-flipbox-back rbt-flipbox-face inner tri-cui">
														<div className="flip-back-top">
															<div className="flip-back-top">
																<h2>Tribal Cuisine</h2>
															</div>
														</div>
														<a
															className="rbt-btn rbt-switch-btn btn-white btn-sm"
															href="/aadi-vishwavidyalaya/courses/cuisine"
															target="_blank"
														>
															<span data-text="Learn More">Learn More</span>
														</a>
													</div>
												</div>
											</div>
										</div>

										<div className="col-lg-4 col-md-6 col-sm-6 col-12 mt--30">
											<div className="rbt-flipbox variation-2">
												<div className="rbt-flipbox-wrap rbt-service rbt-service-1 card-bg-4">
													<div className="rbt-flipbox-front rbt-flipbox-face inner">
														<div className="front-thumb w-100">
															<img
																alt="card-icon"
																data-entity-type=""
																data-entity-uuid=""
																src="img/5_116.png"
															/>
														</div>
														<div className="content">
															<h5 className="title">
																<a
																	href="/aadi-vishwavidyalaya/courses/music"
																	target="_blank"
																>
																	Tribal Music &amp; Instruments
																</a>
															</h5>
															<p>
																Immerse yourself in the rich soundscape of
																tribal music and instruments. Explore
																traditional melodies, rhythms, and the
																craftsmanship behind indigenous instruments, and
																understand how music plays a vital role in
																ceremonies and daily life.
															</p>
															<a
																className="rbt-btn-link stretched-link"
																href="/aadi-vishwavidyalaya/courses/music"
																target="_blank"
															>
																Learn More
															</a>
														</div>
													</div>
													<div className="rbt-flipbox-back rbt-flipbox-face inner tri-mus">
														<div className="flip-back-top">
															<div className="flip-back-top">
																<h2>Tribal Music &amp; Instruments</h2>
															</div>
														</div>
														<a
															className="rbt-btn rbt-switch-btn btn-white btn-sm"
															href="/aadi-vishwavidyalaya/courses/music"
															target="_blank"
														>
															<span data-text="Learn More">Learn More</span>
														</a>
													</div>
												</div>
											</div>
										</div>
										<div className="col-lg-4 col-md-6 col-sm-6 col-12 mt--30">
											<div className="rbt-flipbox variation-2">
												<div className="rbt-flipbox-wrap rbt-service rbt-service-1 card-bg-4">
													<div className="rbt-flipbox-front rbt-flipbox-face inner">
														<div className="front-thumb w-100">
															<img
																alt="card-icon"
																data-entity-type=""
																data-entity-uuid=""
																src="img/planning.jpeg"
															/>
														</div>
														<div className="content">
															<h5 className="title">
																<a
																	href="/aadi-vishwavidyalaya/courses/artefact"
																	target="_blank"
																>
																	Tribal Artefact
																</a>
															</h5>
															<p>
																Discover the rich artistry of tribal artefacts,
																where tradition meets craftsmanship in forms
																like weaving, pottery, beadwork, and intricate
																wood carvings. These artefacts are not just
																objects; they are living expressions of
																indigenous culture, passed down through
																generations with deep-rooted symbolism and
																meaning.
															</p>
															<a
																className="rbt-btn-link stretched-link"
																href="/aadi-vishwavidyalaya/courses/artefact"
																target="_blank"
															>
																Learn More
															</a>
														</div>
													</div>
													<div className="rbt-flipbox-back rbt-flipbox-face inner tri-art">
														<div className="flip-back-top">
															<div className="flip-back-top">
																<h2>Tribal Artefact</h2>
															</div>
														</div>
														<a
															className="rbt-btn-link stretched-link"
															href="/aadi-vishwavidyalaya/courses/artefact"
															target="_blank"
														>
															Learn More
														</a>
													</div>
												</div>
											</div>
										</div>

										{/* Add the remaining 3 cards similarly: Tribal Cuisine, Tribal Music & Instruments, Tribal Artefact */}
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>

				<div className="views-element-container">
					<div className="view view-learning-path-front view-id-learning_path_front view-display-id-block_1 js-view-dom-id-59767e3b9b2d70dddfd40dfa9e215a54176c109b66289f0988f16f4ae39bc9ea">
						<div
							className="rbt-course-area rbt-section-gapTop bg-color-white"
							id="course"
						>
							<div className="container">
								<div className="row g-5 align-items-center">
									<div className="col-lg-6 col-md-12 col-12">
										<div className="section-title text-start">
											<h2 className="title">Our Courses</h2>
										</div>
									</div>
									<div className="col-lg-6 col-md-12 col-12">
										<div className="load-more-btn text-start text-lg-end">
											<Link
												className="rbt-btn-link"
												to="/aadi-vishwavidyalaya/courses"
												title="view all courses"
											>
												View All{" "}
												<i className="fa-solid fa-arrow-right-long ml-2" />
											</Link>
										</div>
									</div>
								</div>

								<div id="containercourse">
									<div id="slider-containercourse">
										<div id="slider" className="row owl-carousel owl-theme">
											{[
												{
													title: "Kurumba Painting",
													tribe: "kurumbas tribe",
													type: "tribal painting",
													link: "/aadi-vishwavidyalaya/course/30-min/kurumba-painting",
													img: "src/img/Thumb-sq-beg.jpg",
													description:
														"This beginner-friendly course explores Kurumba painting, its Nilgiri roots, and cultural depth.…",
												},
												{
													title: "Savara Art",
													tribe: "konda savara tribe",
													type: "tribal painting",
													link: "/aadi-vishwavidyalaya/course/30-min/savara-art",
													img: "src/img/Thumb-2-sq-beg.jpg",
													description:
														"The beginner’s course opens up the enchanted world of Savara Art to the learner. It is an ancient…",
												},
												{
													title: "Saila Dance",
													tribe: "gond tribe",
													type: "tribal dance",
													link: "/aadi-vishwavidyalaya/course/30-min/saila-dance",
													img: "src/img/beg-1.png",
													description:
														"This course offers a comprehensive understanding of Saila dance, beginning with its origin,…",
												},
												{
													title: "Karma Dance",
													tribe: "gond tribe",
													type: "tribal dance",
													link: "/aadi-vishwavidyalaya/course/30-min/karma-dance",
													img: "src/img/Main.png",
													description:
														"The course explores the origin, history, and cultural significance of Karma dance, primarily…",
												},
												{
													title: "Dhimsa Dance",
													tribe: "konda dora tribe",
													type: "tribal dance",
													link: "/aadi-vishwavidyalaya/course/30-min/dhimsa-dance",
													img: "src/img/thumb-sq1_2.jpg",
													description:
														"The Dhimsa Dance Beginner course provides a comprehensive understanding of this traditional tribal…",
												},
												{
													title: "GUMRAG DANCE",
													tribe: "Mishing tribe",
													type: "tribal dance",
													link: "/aadi-vishwavidyalaya/course/30-min/gumrag-dance",
													img: "src/img/BEG_THUMB.jpg",
													description:
														"This beginner’s module introduces Gumrag Dance, a traditional folk dance of the Mising tribe.…",
												},
											].map((course, idx) => (
												<div className="slide" key={idx}>
													<div className="vidhya-imgsnew">
														<Link
															className="vidhya-imgsnew-img"
															to={course.link}
														>
															<img src={course.img} alt={course.title} />
														</Link>
													</div>
													<div className="tribes-detials">
														<p className="tribes-dtls">
															<i className="fa-solid fa-user mr-2" />
															{course.tribe}
														</p>
														<p className="tribes-dtls">
															<i className="fa-solid fa-info mr-2"></i>
															{course.type}
														</p>
													</div>
													<div className="vidhyas-body">
														<h2 className="course-titless">
															<Link to={course.link}>{course.title}</Link>
														</h2>
														<p className="pra-vidhyas0title">
															{course.description}
														</p>
														<div className="given-bys">
															<img
																className="smalls-imgs"
																src="img/Dimple-Maheshwari-Artist.webp"
																alt="Sophia Jaymes"
															/>
														</div>
														<div className="right-btns-web">
															<button className="vids-btns-newss">
																<Link className="rbt-btn-link" to={course.link}>
																	Learn More{" "}
																	<i className="fa-solid fa-arrow-right-long ml-2"></i>
																</Link>
															</button>
														</div>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="rbt-advance-tab-area rbt-section-gapTop bg-color-white about-sec">
					<div className="container">
						<div className="row mb--60">
							<div className="col-lg-12">
								<div className="section-title text-center">
									<h2 className="title">
										Our Core <span style={{ color: "#bd153d" }}>Values</span>
									</h2>
									<p className="description mt--30">
										At Aadi Vishwavidyalaya, we are dedicated to the
										preservation, promotion, and celebration of tribal art,
										culture, and knowledge...
									</p>
								</div>
							</div>
						</div>

						<div className="row g-5">
							<div className="col-lg-4 col-md-12 mt_md--30 mt_sm--30 order-2 order-lg-1">
								<div className="advance-tab-button advance-tab-button-1">
									<ul
										className="nav nav-tabs tab-button-list"
										id="aboutmyTab"
										role="tablist"
									>
										{["home", "profile", "contact"].map((tab) => (
											<li key={tab} className="nav-item" role="presentation">
												<button
													className={`nav-link tab-button ${activeTab === tab ? "active" : ""}`}
													onClick={() => setActiveTab(tab)}
													type="button"
												>
													<div className="tab">
														<h4 className="title">
															{tab === "home" && "Our Vision"}
															{tab === "profile" && "Our Mission"}
															{tab === "contact" && "Our Planning"}
														</h4>
														<p className="description">
															{tab === "home" &&
																"We plan to continuously expand our course offerings, incorporating new art forms, traditions, and cultural practices. By collaborating with tribal experts and leveraging digital platforms, we aim to create a dynamic learning environment that reaches diverse learners globally, keeping tribal heritage alive for future generations."}
															{tab === "profile" &&
																"Our mission is to educate and empower individuals by providing expert-led courses on tribal cultures..."}
															{tab === "contact" &&
																"We plan to continuously expand our course offerings, incorporating new art forms and practices..."}
														</p>
													</div>
												</button>
											</li>
										))}
									</ul>
								</div>
							</div>

							<div className="col-lg-8 col-md-12 order-1 order-lg-2">
								<div className="tab-content">
									{activeTab === "home" && (
										<div
											className="tab-pane fade show active advance-tab-content-1"
											id="home"
										>
											<div className="thumbnail">
												<img src="src/img/vission.jpeg" alt="Vision" />
											</div>
										</div>
									)}
									{activeTab === "profile" && (
										<div
											className="tab-pane fade show active advance-tab-content-1"
											id="profile"
										>
											<div className="thumbnail">
												<img src="src/img/mission.jpeg" alt="Mission" />
											</div>
										</div>
									)}
									{activeTab === "contact" && (
										<div
											className="tab-pane fade show active advance-tab-content-1"
											id="contact"
										>
											<div className="thumbnail">
												<img src="src/img/planning.jpeg" alt="Planning" />
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default AadiVishwaVidyalaWeb;
