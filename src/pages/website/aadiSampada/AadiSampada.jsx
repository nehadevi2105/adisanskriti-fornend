import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const AadiSampada = () => {
	const dances = [
		{
			img: "/img/33_0.png",
			title: "Chaiti Dance",
			description: "It is an ancient tribal community",
			link: "/aadi-sampada/tribal-dance/chaiti-dance-0",
		},
		{
			img: "/img/Untitled-design-(3)_0.png",
			title: "BIHA DANCE",
			description: "The Kisan tribe is an agricultural community",
			link: "/aadi-sampada/tribal-dance/biha-dance-0",
		},
		{
			img: "/img/37_0.png",
			title: "Gonda Tribal Dance",
			description: "Rich cultural dance of Gonda tribal people",
			link: "/aadi-sampada/tribal-dance/gonda-tribal-dance-0",
		},
		{
			img: "/img/Birhor-Tribe.png",
			title: "Birhor Tribal Dance",
			description: "The Birhor are a tribal community in Jharkhand",
			link: "/aadi-sampada/tribal-dance/birhor-tribal-dance-0",
		},
		{
			img: "/img/32_0.png",
			title: "Bidesia Dance",
			description: "A folk dance from Bihar",
			link: "/aadi-sampada/tribal-dance/bidesia-dance-0",
		},
		{
			img: "/img/35_0.png",
			title: "Paika Dance",
			description: "Famous warrior dance of Eastern India",
			link: "/aadi-sampada/tribal-dance/paika-dance-0",
		},
	];

	return (
		<main className="page-main" id="main">
			<div className="row">
				<div className="col-lg-12">
					<div>
						<section id="sampada-firsts-new">
							<div className="Customized-container">
								<div className="options">
									<div
										className="option active"
										style={{
											backgroundImage: "url('./src/img/painting_filter.png')",
										}}
									>
										<div className="shadow"></div>
										<div className="label">
											<div className="icon">
												<i className="fi fi-ss-paint"></i>
											</div>
											<div className="info">
												<div className="main">Painting</div>
												<div className="sub">Omuke trughte a otufta</div>
											</div>
										</div>
									</div>

									<div
										className="option"
										style={{
											backgroundImage: "url('./src/img/dance_filter.png')",
										}}
									>
										<div className="shadow"></div>
										<div className="label">
											<div className="icon">
												<i className="fi fi-br-ballet-dance"></i>
											</div>
											<div className="info">
												<div className="main">Dance</div>
												<div className="sub">Omuke trughte a otufta</div>
											</div>
										</div>
									</div>
									<div
										className="option"
										style={{
											backgroundImage: "url('./src/img/clothing_filter.png')",
										}}
									>
										<div className="shadow"></div>
										<div className="label">
											<div className="icon">
												<i className="fi fi-ss-vest"></i>
											</div>
											<div className="info">
												<div className="main">Clothing & Textiles</div>
												<div className="sub">Omuke trughte a otufta</div>
											</div>
										</div>
									</div>
									<div
										className="option"
										style={{
											backgroundImage: "url('./src/img/artifact_filter.png')",
										}}
									>
										<div className="shadow"></div>
										<div className="label">
											<div className="icon">
												<i className="fi fi-ss-sculpture"></i>
											</div>
											<div className="info">
												<div className="main">Artefacts</div>
												<div className="sub">Omuke trughte a otufta</div>
											</div>
										</div>
									</div>
									<div
										className="option"
										style={{
											backgroundImage: "url('./src/img/livehood_filter.png')",
										}}
									>
										<div className="shadow"></div>
										<div className="label">
											<div className="icon">
												<i className="fi fi-rr-leadership-alt"></i>
											</div>
											<div className="info">
												<div className="main">Livelihood</div>
												<div className="sub">Omuke trughte a otufta</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>

					<div className="view view-sampda-sliders view-id-sampda_sliders view-display-id-block_1 js-view-dom-id-de49c75b3ed46a4b62fdebba8df3883f0680bdbb5ec2432d982677bdf49de638">
						<section className="sampdaPainting" id="sampadaPainting">
							<div className="container">
								<div className="sampada-container">
									<div className="row">
										<h1 className="sampadas-heads">Tribal Painting</h1>
										<a
											className="sampadas-heads-links"
											href="/aadi-sampada/categeory/tribal-paintings"
											title="click here to view more"
										>
											View more
										</a>
									</div>
									<div className="Painting-container">
										<div className="swiper-wrapper">
											{[
												{
													img: "src/img/28.png",
													alt: "Gujarat’s Warli painting",
													title: "Gujarat’s Warli painting",
													link: "/aadi-sampada/tribal-paintings/gujarats-warli-painting",
													caption:
														"The Warli paintings constitute a traditional art in Gujarat by the Warli tribes. Their style is quite simple yet highly expressive; their subjects include the usually mundane scenes in life, nature,…",
												},
												{
													img: "src/img/17.png",
													alt: "Warli  Painting",
													title: "Warli Painting",
													link: "/aadi-sampada/tribal-paintings/warli-painting-0",
													caption:
														"Warli paintings are painted on the walls within the houses of warli tribe people; on both sides of the door and on the outside walls of the huts. The walls of Warli houses consist of bamboo sticks…",
												},
												{
													img: "src/img/1066.png",
													alt: "Symbolism in Saval Dharmi Ghoda",
													title: "Symbolism in Saval Dharmi Ghoda",
													link: "/aadi-sampada/tribal-paintings/symbolism-saval-dharmi-ghoda",
													caption:
														"The Saval Dharmi Ghoda motif forms an important part of Pithora paintings that are a ritualistic form of art of the Rathwa tribe in Gujarat. These paintings are made as an offering to the deity, to…",
												},
												{
													img: "src/img/1064.png",
													alt: "Symbolism in Rani Kajal",
													title: "Symbolism in Rani Kajal",
													link: "/aadi-sampada/tribal-paintings/symbolism-rani-kajal",
													caption:
														"Rani Kajal is shown holding a comb for purification and care associated with her role of nurturing and protecting the community. This vision conveys the sense of devotion and maternal love and offers…",
												},
												{
													img: "src/img/1063.png",
													alt: "Symbolism in Raja Bhoj and his Elephant",
													title: "Symbolism in Raja Bhoj and his Elephant",
													link: "/aadi-sampada/tribal-paintings/symbolism-raja-bhoj-and-his-elephant",
													caption:
														"The Pithora paintings of the Rathwa tribe are closely knit into the cultural traditions of Gujarat. One of the very important motifs is Raja Bhoj and his Elephant, symbolizing Raja Bhoj's…",
												},
												{
													img: "src/img/1061.png",
													alt: "Symbolism in Rani Pithora",
													title: "Symbolism in Rani Pithora",
													link: "/aadi-sampada/tribal-paintings/symbolism-rani-pithora",
													caption:
														"The art of making the Rani Pithora motifs utilizes especially natural pigments derived from locally available materials like cow dung, lime, and natural dyes. The Rathwa artists, also termed Lakharas…",
												},
												{
													img: "src/img/1059.png",
													alt: "Symbolism in Lakhari and Jokhari",
													title: "Symbolism in Lakhari and Jokhari",
													link: "/aadi-sampada/tribal-paintings/symbolism-lakhari-and-jokhari",
													caption:
														"Lakhari and Jokhari are motifs that represent the cosmic reality of being a guardian and fertility. Lakhari symbolizes the celestial overseer of prosperity, while Jokhari evokes life cycles and the…",
												},
												{
													img: "src/img/1048.png",
													alt: "Symbolism in The Baba Ganeh",
													title: "Symbolism in The Baba Ganeh",
													link: "/aadi-sampada/tribal-paintings/symbolism-baba-ganeh",
													caption:
														"The Baba Ganeh motif epitomizes wisdom and initiation, one which keeps the past alive. Through its mythology and folklores around Pithora, Baba Ganeh stands for eliminating obstacles, quite like Lord…",
												},
												{
													img: "src/img/1047.png",
													alt: "Symbolism in The Baba Ind",
													title: "Symbolism in The Baba Ind",
													link: "/aadi-sampada/tribal-paintings/symbolism-baba-ind",
													caption:
														"Baba Ind is depicted as a symbol of protection and prosperity in Pithora art. His figure often incorporates elements of strength and divinity, representing blessings for crops, livestock, and family…",
												},
												{
													img: "src/img/252.png",
													alt: "J&K Wall Art Making",
													title: "J&K Wall Art Making",
													link: "/aadi-sampada/tribal-paintings/jk-wall-art-making",
													caption:
														"The tribal communities of Jammu & Kashmir, especially from far-off places, engage in wall art as a symbol of their cultural identity. It's usually passed through generations with old people…",
												},
											].map((slide, index) => (
												<div
													className="swiper-slide"
													key={index}
													style={{ backgroundImage: `url(${slide.img})` }}
												>
													<img
														src={slide.img}
														className="entity-img"
														alt={slide.alt}
													/>
													<div className="content">
														<a href={slide.link} title={slide.title}>
															<p
																className="title"
																// data-swiper-parallax="-30%"
																// data-swiper-parallax-scale=".7"
															>
																{slide.title}
															</p>
														</a>
														<span
															className="caption"
															// data-swiper-parallax="-20%"
														>
															{slide.caption}
														</span>
													</div>
												</div>
											))}
										</div>
										<div className="swiper-pagination"></div>
										<div className="swiper-button-prev swiper-button-white"></div>
										<div className="swiper-button-next swiper-button-white"></div>
									</div>
								</div>
							</div>
						</section>
					</div>

					<div className="view view-sampda-sliders">
						<section className="sampada-seconds-news" id="sampadaDance">
							<div className="sampada-container">
								<div className="row">
									<h1 className="sampadas-heads">Tribal Dance</h1>
									<a
										className="sampadas-heads-links"
										href="/aadi-sampada/categeory/tribal-dance"
										title="click here to view more"
									>
										View more
									</a>
								</div>

								<Swiper
									modules={[Navigation, Pagination, Autoplay]}
									navigation
									pagination={{ clickable: true }}
									autoplay={{ delay: 3000 }}
									spaceBetween={20}
									slidesPerView={1}
									breakpoints={{
										768: { slidesPerView: 2 },
										1024: { slidesPerView: 3 },
									}}
									className="swiperDance"
								>
									{dances.map((dance, index) => (
										<SwiperSlide key={index}>
											<div className="swiper-slide-img">
												<img src={dance.img} alt={dance.title} />
												<svg
													data-name="Layer 1"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 1200 120"
													preserveAspectRatio="none"
												>
													<path
														d="M0,0V46.29c47.79,22.2,103.5,52.47,186,69.58C314.21,138.91,441,130,576,104.54
                      c110.35-20.2,221.94-48.41,332-75.31C977.84,8,1089.07-10.53,1200,2.11V0Z"
														opacity=".25"
														className="shape-fill"
													/>
												</svg>
											</div>
											<div className="swiper-slide-content">
												<div>
													<h2>{dance.title}</h2>
													<p>{dance.description}</p>
													<a className="show-more" href={dance.link}>
														<svg
															fill="none"
															stroke="currentColor"
															strokeWidth="1.5"
															viewBox="0 0 24 24"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
															/>
														</svg>
													</a>
												</div>
											</div>
										</SwiperSlide>
									))}
								</Swiper>
							</div>
						</section>
					</div>
				</div>
			</div>
		</main>
	);
};

export default AadiSampada;
