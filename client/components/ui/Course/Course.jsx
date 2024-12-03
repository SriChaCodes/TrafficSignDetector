import Link from "next/link"
import SectionWrapper from "../../SectionWrapper"
import { LessonCardGrid } from "../LessonCard"
import lessonsExamples from "../../../lessonExamples/lessons.json";
import { motion } from "framer-motion";  // Import motion

const Course = () => {
    return (
        <SectionWrapper>
            <div className="custom-screen text-gray-600 dark:text-gray-300">
                <div className="max-w-xl space-y-3">
                    <motion.h2
                        className="text-gray-800 dark:text-gray-50 text-3xl font-semibold sm:text-4xl"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                    >
                        Get started 
                    </motion.h2>
                    <p>
                        The features we provide{" "}
                        <Link href="/tutorials/cs50" className="text-blue-600 hover:text-blue-400 dark:text-sky-500 dark:hover:text-sky-600 inline-flex items-center gap-x-1 duration-150">
                            here
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </p>
                </div>
                <div className="mt-12">
                    <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            lessonsExamples.map((item, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}  // Initial state
                                    whileInView={{ opacity: 1, y: 0 }}  // On scroll into view
                                    transition={{ duration: 0.5 }}  // Transition timing
                                >
                                    <LessonCardGrid idx={idx} item={item} />
                                </motion.li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default Course;
