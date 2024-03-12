
import { Link } from "react-router-dom";
import MobileFooter from "./MobileFooter";
import { CurrencyExchange, Facebook, Instagram, LinkedIn, Man, Pinterest, Translate, Twitter } from "@mui/icons-material";

const Footer = () => {
    const footerLinks = [
        {
            id: "cat",
            title: "Categories",
            links: [
                {
                    to: "/",
                    text: "Graphics & Design",
                },
                {
                    to: "/",
                    text: "Digital Marketing",
                },
                {
                    to: "/",
                    text: "Writing & Translation",
                },
                {
                    to: "/",
                    text: "Video & Animation",
                },
                {
                    to: "/",
                    text: "Music & Audio",
                },
                {
                    to: "/",
                    text: "Programming & Tech",
                },
                {
                    to: "/",
                    text: "Data",
                },
                {
                    to: "/",
                    text: "Business",
                },
                {
                    to: "/",
                    text: "Lifestyle",
                },
                {
                    to: "/",
                    text: "Photography",
                },
                {
                    to: "/",
                    text: "Sitemap",
                },
            ],
        },
        {
            id: "abt",
            title: "About",
            links: [
                {
                    to: "/",
                    text: "Careers",
                },
                {
                    to: "/",
                    text: "Press & News",
                },
                {
                    to: "/",
                    text: "Partnerships",
                },
                {
                    to: "/",
                    text: "Privacy Policy",
                },
                {
                    to: "/",
                    text: "Terms of Service",
                },
                {
                    to: "/",
                    text: "Intellectual Property Claims",
                },
                {
                    to: "/",
                    text: "Investor Relations",
                },
            ],
        },
        {
            id: "sup",
            title: "Support",
            links: [
                {
                    to: "/",
                    text: "Help & Support",
                },
                {
                    to: "/",
                    text: "Trust & Safety",
                },
                {
                    to: "/",
                    text: "Selling on Fiverr",
                },
                {
                    to: "/",
                    text: "Buying on Fiverr",
                },
            ],
        },
        {
            id: "com",
            title: "Community",
            links: [
                {
                    to: "/",
                    text: "Customer Success Stories",
                },
                {
                    to: "/",
                    text: "Community hub",
                },
                {
                    to: "/",
                    text: "Forum",
                },
                {
                    to: "/",
                    text: "Events",
                },
                {
                    to: "/",
                    text: "Blog",
                },
                {
                    to: "/",
                    text: "Influencers",
                },
                {
                    to: "/",
                    text: "Affiliates",
                },
                {
                    to: "/",
                    text: "Podcast",
                },
                {
                    to: "/",
                    text: "Invite a Friend",
                },
                {
                    to: "/",
                    text: "Become a Seller",
                },
                {
                    to: "/",
                    text: "Community Standards",
                },
            ],
        },
        {
            id: "more",
            title: "More From Fiverr",
            links: [
                {
                    to: "/",
                    text: "Fiverr Business",
                },
                {
                    to: "/",
                    text: "Fiverr Pro",
                },
                {
                    to: "/",
                    text: "Fiverr Logo Maker",
                },
                {
                    to: "/",
                    text: "Fiverr Guides",
                },
                {
                    to: "/",
                    text: "Get Inspired",
                },
                {
                    to: "/",
                    text: "Fiverr Select",
                },
                {
                    to: "/",
                    text: "ClearVoice",
                },
                {
                    to: "/",
                    text: "Fiverr Workspace",
                },
                {
                    to: "/",
                    text: "Learn",
                },
                {
                    to: "/",
                    text: "Working Not Working",
                },
            ],
        },
    ];

    const date = new Date();
    const year = date.getFullYear();

    const socialIcons = [
        {
            to: "https://twitter.com/AsiughuE",
            icon: <Twitter/>,
        },
        {
            to: "https://web.facebook.com/?_rdc=1&_rdr",
            icon: <Facebook/>,
        },
        {
            to: "https://www.linkedin.com/in/efe-gift-109120241/",
            icon: <LinkedIn/>,
        },
        {
            to: "https://www.instagram.com/",
            icon: <Instagram/>,
        },
        {
            to: "https://www.pinterest.com/",
            icon: <Pinterest/>,
        },
    ];
    return (
        <footer className="border-t max-w-7xl w-11/12 mx-auto lg:py-14 lg:pb-5 pb-3">
            <div className="contain max-w-7xl mx-auto">
                <div className="w-full flex flex-col items-start justify-start gap-10">
                    <div className="w-full hidden sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-5 items-start justify-start">
                        {footerLinks.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-start justify-start flex-col w-full gap-5"
                            >
                                <h2 className="text-base font-semibold text-darkColor">
                                    {item.title}
                                </h2>
                                <div className="flex items-start justify-start flex-col gap-4">
                                    {item.links.map((item, i) => (
                                        <Link
                                            to={item.to}
                                            key={i}
                                            className="text-gray-500 hover:underline transition-all duration-300 hover:text-darkColor"
                                        >
                                            {item.text}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <MobileFooter data={footerLinks}/>
                    <div className="w-full flex items-center justify-between border-t pt-5 flex-col gap-2 sm:flex-row sm:gap-0">
                        <div className="flex items-center justify-start gap-4 flex-col md:flex-row">
                            <div className="flex items-end justify-end select-none">
                                <h2 className="text-3xl select-none font-black tracking-tighter text-gray-500">
                                    fivver
                                </h2>
                                <span className="border text-[6px] rounded-full w-3 h-3 flex items-center justify-center">
                                    R
                                </span>
                            </div>
                            <p className="text-sm font-medium text-gray-400">
                                © Fiverr International Ltd. {year}
                            </p>
                        </div>
                        <div className="flex items-center justify-end lg:gap-6 flex-col md:flex-row">
                            <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
                                {socialIcons.map((item, i) => (
                                    <a
                                        href={item.to}
                                        target="_blank"
                                        key={i}
                                        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-300 cursor-pointer" rel="noreferrer"
                                    >
                                        {item.icon}
                                    </a>
                                ))}
                            </div>
                            <div className="flex items-center gap-4 text-sm font-medium text-gray-400">
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <span>
                                        <Translate/>
                                    </span>
                                    English
                                </div>
                                <span className="flex items-center gap-2 cursor-pointer">
                                    <span>
                                        <CurrencyExchange/>
                                    </span>
                                    USD
                                </span>
                                <div className="w-10 h-10 border-2 rounded-full flex items-center justify-center hover:text-darkColor hover:border-none hover:bg-gray-200 transition-all duration-300 cursor-pointer">
                                    <Man/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;