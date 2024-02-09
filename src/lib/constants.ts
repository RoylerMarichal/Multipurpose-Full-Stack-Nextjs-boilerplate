export const constants = {
  appUrl: "https://hostingclan.com",
  appName: "The Hosting Clan",
  logoUrl: "/assets/img/logowhite.png",
  appResume: "El mejor hosting para Latam.",
};

export const sliderSettings = {
  dots: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  infinite: true,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 4000,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

export const sliderSettingsTestimonials = {
  dots: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  infinite: true,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 4000,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
