import { motion } from "framer-motion";
import Image from "next/image";
import NavLink from "../NavLink";
import trafficsignHero from "../../../public/images/trafficsignhero.png"; // Import your new image
import GradientWrapper from "../../GradientWrapper";

const Hero = () => {
    // Animation Variants
    const headingVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    };

    const paragraphVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 1, delay: 0.5 } },
    };

    return (
        <GradientWrapper>
            <section>
                <div className="custom-screen items-center gap-12 text-gray-600 flex flex-col sm:justify-center sm:text-center xl:flex-row xl:text-left">
                    {/* Left Section */}
                    <div className="flex-none space-y-5 max-w-4xl xl:max-w-2xl">
                        {/* Animated Heading */}
                        <motion.h1
                            className="text-4xl text-white font-extrabold sm:text-6xl"
                            initial="hidden"
                            animate="visible"
                            variants={headingVariants}
                        >
                            Empowering Safer Roads with AI
                        </motion.h1>

                        {/* Animated Paragraph */}
                        <motion.p
                            className="text-gray-300 max-w-xl sm:mx-auto xl:mx-0"
                            initial="hidden"
                            animate="visible"
                            variants={paragraphVariants}
                        >
                            Our AI-powered tool accurately detects traffic signs, ensuring safer navigation for autonomous vehicles and drivers.
                        </motion.p>

                        {/* Buttons */}
                        <div className="items-center gap-x-3 font-medium text-sm sm:flex sm:justify-center xl:justify-start">
                            <NavLink
                                href="/chatbot"
                                className="block text-white bg-sky-500 hover:bg-sky-600 active:bg-sky-700"
                                scroll={false}
                            >
                                Get started
                            </NavLink>
                            <NavLink
                                href="#cta"
                                className="block text-gray-100 bg-gray-700 hover:bg-gray-800 mt-3 sm:mt-0"
                                scroll={false}
                            >
                                Learn more
                            </NavLink>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex-1 w-full sm:max-w-2xl xl:max-w-xl">
                        {/* Animated Image */}
                        <motion.div
                            className="relative"
                            initial="hidden"
                            animate="visible"
                            variants={imageVariants}
                        >
                            <Image
                                src={trafficsignHero}
                                className="rounded-lg w-full"
                                alt="Traffic Sign Hero"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
        </GradientWrapper>
    );
};

export default Hero;
