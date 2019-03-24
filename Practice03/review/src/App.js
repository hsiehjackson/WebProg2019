import React, { Component } from 'react';
import './common/styles.css';
import './fonts/beyond_the_mountains-webfont.css';
import './fonts/ionicons.css';
import 'bootstrap/dist/css/bootstrap.css';

// <script src="plugin-frameworks/swiper.js"></script>

class Header extends Component {
	componentDidMount () {
		document.title = "Pizza"
	}
	
	render() {
		return (
			<header>
				<div class="container">
					<a class="logo" href="c"><img src={require('./images/logo-white.png')} alt="Logo"></img></a>

					<div class="right-area">
							<h6><a class="plr-20 color-white btn-fill-primary" href="c">ORDER: +34 685 778 8892</a></h6>
					</div>

					<a class="menu-nav-icon" data-menu="#main-menu" href="c"><i class="ion-navicon"></i></a>

					<ul class="main-menu font-mountainsre" id="main-menu">
							<li><a href="index.html">HOME</a></li>
							<li><a href="02_about_us.html">ABOUT US</a></li>
							<li><a href="03_menu.html">SERVICES</a></li>
							<li><a href="04_blog.html">NEWS</a></li>
							<li><a href="05_contact.html">CONTACT</a></li>
					</ul>
				
					<div class="clearfix"></div>
				</div>
			</header>
		);
	}
}

class MainSlider extends Component {
	render() {
		return (
			<section class="bg-1 h-900x main-slider pos-relative">
			<div class="triangle-up pos-bottom"></div>
			<div class="container h-100">
				<div class="dplay-tbl">
				<div class="dplay-tbl-cell center-text color-white">
					<h5><b>BEST IN TOWN</b></h5>
					<h1 class="mt-30 mb-15">Pizza & Pasta</h1>
					<h5><a href="c" class="btn-primaryc plr-25"><b>SEE TODAYS MENU</b></a></h5>
				</div>
				</div>
			</div>
			</section>
		);
	}
}

class StoryArea extends Component {
	render() {
		return (
			<section class="story-area left-text center-sm-text pos-relative">
				<div class="abs-tbl bg-2 w-20 z--1 dplay-md-none"></div>
				<div class="abs-tbr bg-3 w-20 z--1 dplay-md-none"></div>
				<div class="container">
					<div class="heading">
						<img class="heading-img" src={require('./images/heading_logo.png')} alt=""></img>
						<h2>Our Story</h2>
					</div>
					<div class="row">
						<div class="col-md-6">
							<p class="mb-30">Maecenas fermentum tortor id fringilla molestie. In hac habitasse
									platea dictumst. Morbi maximus
									lobortis ipsum, ut blandit augue ullamcorper vitae.
									Nulla dignissim leo felis, eget cursus elit aliquet ut. Curabitur vel convallis
									massa. Morbi tellus
									tortor, luctus et lacinia non, tincidunt in lacus.
									Vivamus sed ligula imperdiet, feugiat magna vitae, blandit ex. Vestibulum id
									dapibus dolor, ac
								cursus nulla. </p>
						</div>
						<div class="col-md-6">
							<p class="mb-30">Maecenas fermentum tortor id fringilla molestie. In hac habitasse platea
									dictumst.Morbi maximus lobortis ipsum, ut blandit augue ullamcorper vitae.
									Nulla dignissim leo felis, eget cursus elit aliquet ut. Curabitur vel
									convallismassa. Morbi tellus tortor, luctus et lacinia non, tincidunt in lacus.
									Vivamus sed ligula imperdiet, feugiat magna vitae, blandit ex. Vestibulumidda
								pibus dolor, accursus nulla. </p>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

class BestSeller extends Component{
	render() {
		return (
			<section class="story-area bg-seller color-white pos-relative">
				<div class="pos-bottom triangle-up"></div>
				<div class="pos-top triangle-bottom"></div>
				<div class="container">
					<div class="heading">
						<img class="heading-img" src={require('./images/heading_logo.png')} alt=""></img>
						<h2>Best Sellers</h2>
					</div>
					<div class="row">
						<BestSellerItem />
					</div>
					<h6 class="center-text mt-40 mt-sm-20 mb-30"><a href="c" class="btn-primaryc plr-25"><b>SEE TODAYS MENU</b></a></h6>
				</div>
			</section>
		);
	}
}

class BestSellerItem extends Component {
	render () {
		return (
			<div class="col-lg-3 col-md-4  col-sm-6 ">
				<div class="center-text mb-30">
					<div class="ïmg-200x mlr-auto pos-relative">
						<BestSellerItemTag />
						<img src={require('./images/seller-2-200x200.png')} alt=""></img>
					</div>
					<h5 class="mt-20">Pizza Margherita</h5>
					<h4 class="mt-5"><b>$11.90</b></h4>
					<h6 class="mt-20"><a href="c" class="btn-brdr-primary plr-25"><b>Order Now</b></a></h6>
				</div>
			</div>
		);
	}
}

function BestSellerItemTag(props) {
	if (props.tag === "offer")
		return <h6 class="ribbon-cont"><div class="ribbon primary"></div><b>OFFER</b></h6>;
	else if (props.tag === "speciality")
		return <h6 class="ribbon-cont"><div class="ribbon secondary"></div><b>SPECIALITY</b></h6>;
	else if (props.tag === "plus")
		return <h6 class="ribbon-cont color-black"><div class="ribbon white"></div><b>PLUS SIZE</b></h6>;
	else
		return null;
}

class Menu extends Component {
	render () {
		return (
			<section>
				<div class="container">
					<div class="heading">
						<img class="heading-img" src={require('./images/heading_logo.png')} alt=""></img>
						<h2>Our Menu</h2>
					</div>
					<div class="row">
						<div class="col-sm-12">
							<ul class="selecton brdr-b-primary mb-70">
								<li><a class="active" href="c" data-select="*"><b>ALL</b></a></li>
								<li><a href="c" data-select="pizza"><b>PIZZA</b></a></li>
								<li><a href="c" data-select="pasta"><b>PASTA</b></a></li>
								<li><a href="c" data-select="salads"><b>SALADS</b></a></li>
								<li><a href="c" data-select="deserts"><b>DESERTS</b></a></li>
							</ul>
						</div>
					</div>
					<div class="row">
						<MenuItem />
					</div>
					<h6 class="center-text mt-40 mt-sm-20 mb-30"><a href="c" class="btn-primaryc plr-25"><b>SEE TODAYS MENU</b></a></h6>
				</div>
			</section>
		);
	}
}

class MenuItem extends Component {
	render() {
		return (
			<div class="col-md-6 food-menu pizza">
				<div class="sided-90x mb-30 ">
					<div class="s-left"><img class="br-3" src={require('./images/menu-1-120x120.jpg')} alt="Menu"></img></div>
					<div class="s-right">
						<h5 class="mb-10"><b>Pizza Margherita</b><b class="color-primary float-right">$12.00</b></h5>
						<p class="pr-70">Maecenas fermentum tortor id fringilla molestie. In hac habitasse platea dictumst. </p>
					</div>
				</div>
			</div>
		);
	}
}

class Footer extends Component {
	render() {
		return (
			<footer class="pb-50  pt-70 pos-relative">
			<div class="pos-top triangle-bottom"></div>
				<div class="container-fluid">
					<a href="index.html"><img src={require('./images/logo-white.png')} alt="Logo"></img></a>

					<div class="pt-30">
							<p class="underline-secondary"><b>Address:</b></p>
							<p>481 Creekside Lane Avila Beach, CA 93424 </p>
					</div>

					<div class="pt-30">
							<p class="underline-secondary mb-10"><b>Phone:</b></p>
							<a href="tel:+53 345 7953 32453 ">+53 345 7953 32453 </a>
					</div>

					<div class="pt-30">
							<p class="underline-secondary mb-10"><b>Email:</b></p>
							<a href="mailto:yourmail@gmail.com"> yourmail@gmail.com</a>
					</div>

					<ul class="icon mt-30">
							<li><a href="c"><i class="ion-social-pinterest"></i></a></li>
							<li><a href="c"><i class="ion-social-facebook"></i></a></li>
							<li><a href="c"><i class="ion-social-twitter"></i></a></li>
							<li><a href="c"><i class="ion-social-dribbble-outline"></i></a></li>
							<li><a href="c"><i class="ion-social-linkedin"></i></a></li>
							<li><a href="c"><i class="ion-social-vimeo"></i></a></li>
					</ul>

					<p class="color-light font-9 mt-50 mt-sm-30">
					Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="ion-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a></p>
				</div>
			</footer>
		)
		
	}
}
// Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0.
					

export {
	Header,
	MainSlider,
	StoryArea,
	BestSeller,
	Menu, 
	Footer
};
