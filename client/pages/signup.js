import Head from "next/head";
import Link from "next/link";
import Button from "../components/ui/Button"; // Ensure this component is available
import Input from "../components/ui/Input"; // Ensure this component is available

export default function signup() {
  return (
    <>
      <Head>
        <title>Sign Up - IO Academy</title>
      </Head>
      <main className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
          {/* Background Image Section */}
          

          {/* Sign Up Form Section */}
          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <div className="flex justify-center mx-auto">
                  <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
                </div>
                <p className="mt-3 text-gray-500 dark:text-gray-300">Create your account</p>
              </div>

              <div className="mt-8">
                <form onSubmit={(e) => e.preventDefault()}>
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                    <Input
                      type="email"
                      required
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="example@example.com"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                    </div>
                    <Input
                      type="password"
                      required
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Your Password"
                    />
                  </div>

                  {/* Sign Up Button */}
                  <div className="mt-6">
                    <Button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Sign Up
                    </Button>
                  </div>
                </form>

                {/* Login Link */}
                <p className="mt-6 text-sm text-center text-gray-400">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-500 focus:outline-none focus:underline hover:underline">
                    Log in
                  </Link>.
                </p>
              </div>
            </div>
          </div>
          <div className="hidden bg-cover lg:block lg:w-2/3" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)" }}>
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">Meraki UI</h2>
                <p className="max-w-xl mt-3 text-gray-300">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus molestiae
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
