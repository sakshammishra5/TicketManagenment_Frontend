import React from "react";
import { Link } from "react-router"; // <-- make sure it's react-router-dom
import styles from "./Home.module.css";
import ChatWidget from "../ChatWidget/ChatWidget";

const Home = () => {
    return (
        <div className={styles.home}>
            {/* NAVBAR */}
            <nav className={styles.nav}>
                <ul className={styles.list}>
                    <div className={styles.navLogo}>
                        <img src="/hubly.png" alt="Hubly Logo" />
                        <p>Hubly</p>
                    </div>

                    <div className={styles.navButtons}>
                        <Link to="login">
                            <button className={styles.loginBtn}>Login</button>
                        </Link>
                        <Link to="signup">
                            <button className={styles.signupBtn}>Signup</button>
                        </Link>
                    </div>
                </ul>
            </nav>

            {/* HERO */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <div className={styles.heroText}>
                        <p className={styles.heroTitle}>
                            Grow Your Business Faster <br />
                            with Hubly CRM
                        </p>
                        <p className={styles.heroSubtitle}>
                            Manage leads, automate workflows, and close deals effortlessly—all
                            in one powerful platform.
                        </p>
                        <div className={styles.heroButtons}>
                            <button className={styles.getStartedBtn}>Get started</button>
                            <button className={styles.watchVideoBtn}>
                                <span>▶</span> Watch Video
                            </button>
                        </div>
                    </div>
                    <ChatWidget />
                    <div className={styles.heroImage}>
                        <img src="/hero_image.jpg" alt="Dashboard Preview" />
                    </div>
                </div>

                <div className={styles.companyName}>
                    <p>Adobe</p>
                    <p>elastic</p>
                    <p>Opendoor</p>
                    <p>Airtable</p>
                    <p>elastic</p>
                    <p>Framer</p>
                </div>
            </section>

            {/* FEATURES */}
            <section className={styles.featuresSection}>
                <p className={styles.featuresTitle}>
                    At its core, Hubly is a robust CRM <br />
                    solution.
                </p>
                <p className={styles.featuresSubtitle}>
                    Hubly helps businesses streamline customer interactions, track leads,
                    and automate tasks—saving you time and maximizing revenue. Whether
                    you're a startup or an enterprise, Hubly adapts to your needs, giving
                    you the tools to scale efficiently.
                </p>

                <div className={styles.featuresGrid}>
                    <div className={styles.featureItem}>
                        <h3>MULTIPLE PLATFORMS TOGETHER!</h3>
                        <p>
                            Email communication is a breeze with our fully integrated, drag &
                            drop email builder.
                        </p>
                    </div>

                    <div className={styles.featureItem}>
                        <h3>CLOSE</h3>
                        <p>
                            Capture leads using our landing pages, surveys, forms, calendars,
                            inbound phone system & more!
                        </p>
                    </div>

                    <div className={styles.featureItem}>
                        <h3>NURTURE</h3>
                        <p>
                            Automatically message new leads via SMS, emails, phone calls, or
                            even Facebook messages. Create multi-channel campaigns to capture
                            attention and engage your leads.
                        </p>
                    </div>

                    <div className={styles.featureImage}>
                        <img src="/image_2.jpg" alt="CRM Dashboard" />
                    </div>
                </div>
            </section>

            {/* PRICING */}
            <section className={styles.pricingSection}>
                <h3 className={styles.pricingTitle}>We have plans for everyone!</h3>
                <p className={styles.pricingSubtitle}>
                    We started with a strong foundation, then simply built all of the
                    sales and marketing tools ALL businesses need under one platform.
                </p>

                <div className={styles.pricingCards}>
                    <div className={styles.pricingCard}>
                        <h3 className={styles.planName}>STARTER</h3>
                        <p className={styles.planDescription}>
                            Best for local businesses needing to improve their online
                            reputation.
                        </p>
                        <p className={styles.planPrice}>
                            $199<span>/monthly</span>
                        </p>

                        <h3 className={styles.planFeaturesTitle}>What's Included</h3>
                        <p className={styles.planFeature}>Unlimited Users</p>
                        <p className={styles.planFeature}>GMB Messaging</p>
                        <p className={styles.planFeature}>Reputation Management</p>
                        <p className={styles.planFeature}>GMB Call Tracking</p>
                        <p className={styles.planFeature}>24/7 Award Winning Support</p>

                        <button className={styles.planBtn}>SIGN UP FOR STARTER</button>
                    </div>

                    <div className={styles.pricingCard}>
                        <h3 className={styles.planName}>GROW</h3>
                        <p className={styles.planDescription}>
                            Best for all businesses that want to take full control of their
                            marketing automation and track their leads, click to close.
                        </p>
                        <p className={styles.planPrice}>
                            $399<span>/monthly</span>
                        </p>

                        <h3 className={styles.planFeaturesTitle}>What's Included</h3>
                        <p className={styles.planFeature}>Pipeline Management</p>
                        <p className={styles.planFeature}>
                            Marketing Automation Campaigns
                        </p>
                        <p className={styles.planFeature}>Live Call Transfer</p>
                        <p className={styles.planFeature}>GMB Messaging</p>
                        <p className={styles.planFeature}>Embed-able Form Builder</p>
                        <p className={styles.planFeature}>Reputation Management</p>
                        <p className={styles.planFeature}>24/7 Award Winning Support</p>

                        <button className={styles.planBtn}>SIGN UP FOR GROW</button>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerLogo}>
                        <img src="/logo.png" alt="Hubly Logo" />
                        <p>Hubly</p>
                    </div>

                    <div className={styles.footerLinks}>
                        <div className={styles.footerColumn}>
                            <h4>Product</h4>
                            <p>Live Chat widget</p>
                            <p>Payment and eStore</p>
                            <p>Observability</p>
                            <p>HelpBot</p>
                            <p>Apps & Integrations</p>
                        </div>

                        <div className={styles.footerColumn}>
                            <h4>Why Primer</h4>
                            <p>Switch from helpdesk</p>
                            <p>Boost payment success</p>
                            <p>Improve conversion rates</p>
                            <p>Reduce payments fraud</p>
                            <p>Recover revenue</p>
                        </div>

                        <div className={styles.footerColumn}>
                            <h4>Developers</h4>
                            <p>Primer Docs</p>
                            <p>API Reference</p>
                            <p>Payment methods guide</p>
                            <p>Service status</p>
                            <p>Community</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
