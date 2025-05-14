const Footer = () => {
	return (
		<footer className="footer-bottom">
			<div className="copyright-sections">
				<div className="row para-copyright">
					<div className="col-lg-8 col-md-12 col-sm-12 align-left">
						<div className="copyright">
							<p className="para-copyright">
								Public Grievances | Website Policy | Copyright Policy | Feedback
							</p>
						</div>
						<div className="copyright">
							<p className="para-copyright">
								Copyright © 2024 | Website Content Owned by Ministry Of Tribal
								Affairs, Government of India
							</p>
						</div>
					</div>
					<div className="col-lg-4 col-md-12 col-sm-12 align-right">
						<h6 className="footer-haedsix">Follow Us</h6>
						<div className="anchor-footers">
							<p className="mr-5">
								<span
									className="fa-brands fa-instagram"
									style={{ marginRight: "10px" }}
								></span>
								<span
									className="fa-brands fa-facebook"
									style={{ marginRight: "10px" }}
								></span>
								<i
									className="fa-brands fa-youtube"
									style={{ marginRight: "10px" }}
								></i>
								<i className="fa-brands fa-x-twitter"></i>
							</p>
						</div>
					</div>
				</div>
				<div className="disclaimer">
					<p className="para-copyright">
						<strong>Disclaimer:</strong>
						<br />
						This is a beta version. <br />
						This work is an ongoing effort to bring the world of tribes to the
						global world and enable them to appreciate the richness that
						surrounds us, while respecting cultural sensitivities, promoting
						tribal culture, and accurately conveying meanings. We kindly request
						users to provide feedback for any corrections or improvements
						observed, as this is a work in progress. Any inaccuracies should not
						be seen as intentional but as part of the continuous development
						process. We value and welcome your insights to enhance the quality
						of this portal further.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
