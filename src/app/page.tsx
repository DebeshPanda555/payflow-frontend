import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 text-white">

      {/* FLOATING BACKGROUND SHAPES */}

      <div className="absolute w-72 h-72 bg-purple-500 rounded-full opacity-30 blur-3xl top-20 left-20 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-blue-400 rounded-full opacity-30 blur-3xl bottom-20 right-20 animate-pulse"></div>


      {/* NAVBAR */}

      <nav className="relative z-10 flex justify-between items-center px-10 py-6">

        <h1 className="text-2xl font-bold tracking-wide">
          PayFlow
        </h1>

        <div className="flex gap-6 items-center">

          <Link
            href="/login"
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:scale-105 transition"
          >
            Login
          </Link>

        </div>

      </nav>


      {/* HERO SECTION */}

      <section className="relative z-10 flex flex-col md:flex-row items-center justify-between px-16 mt-20">

        {/* TEXT */}

        <div className="space-y-8 max-w-xl">

          <h1 className="text-6xl font-bold leading-tight">
            Send Money Instantly
          </h1>

          <p className="text-lg opacity-90">
            PayFlow helps you manage your digital wallet,
            track payments and send money instantly.
          </p>

          <div className="flex gap-6">

            <Link
              href="/login"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:scale-110 transition duration-200"
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition"
            >
              Learn More
            </Link>

          </div>

        </div>


        {/* ILLUSTRATION */}

        <div className="mt-16 md:mt-0">

          <img
            src="/hero.svg"
            alt="Fintech Illustration"
            className="w-[520px] animate-float"
          />

        </div>

      </section>


      {/* FEATURES */}

      <section className="relative z-10 grid md:grid-cols-3 gap-10 px-16 mt-40 text-center">

        <div className="bg-white/20 p-8 rounded-xl backdrop-blur-lg hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2">
            Instant Transfers
          </h3>
          <p className="opacity-80">
            Send money to anyone instantly with secure transactions.
          </p>
        </div>

        <div className="bg-white/20 p-8 rounded-xl backdrop-blur-lg hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2">
            Smart Wallet
          </h3>
          <p className="opacity-80">
            Manage your balance and track spending easily.
          </p>
        </div>

        <div className="bg-white/20 p-8 rounded-xl backdrop-blur-lg hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2">
            Secure Payments
          </h3>
          <p className="opacity-80">
            Built with encrypted and secure payment technology.
          </p>
        </div>

      </section>


      {/* CTA */}

      <section className="relative z-10 flex flex-col items-center text-center mt-32 pb-20 space-y-6">

        <h2 className="text-4xl font-bold">
          Ready to start using PayFlow?
        </h2>

        <Link
          href="/signup"
          className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:scale-110 transition"
        >
          Create Account
        </Link>

      </section>

      {/* TESTIMONIALS */}

<section className="relative z-10 mt-32 px-16 text-center">

<h2 className="text-4xl font-bold mb-12">
  What Users Say
</h2>

<div className="grid md:grid-cols-3 gap-10">

  <div className="bg-white/20 backdrop-blur-lg p-8 rounded-xl hover:scale-105 transition">
    <p className="italic opacity-90">
      "PayFlow makes sending money effortless.
      The interface is clean and super fast."
    </p>
    <p className="mt-4 font-semibold">
      — Alex Morgan
    </p>
  </div>

  <div className="bg-white/20 backdrop-blur-lg p-8 rounded-xl hover:scale-105 transition">
    <p className="italic opacity-90">
      "The best digital wallet experience I've used.
      Secure and simple."
    </p>
    <p className="mt-4 font-semibold">
      — Sarah Lee
    </p>
  </div>

  <div className="bg-white/20 backdrop-blur-lg p-8 rounded-xl hover:scale-105 transition">
    <p className="italic opacity-90">
      "Transactions are instant and tracking
      payments is very easy."
    </p>
    <p className="mt-4 font-semibold">
      — David Chen
    </p>
  </div>

</div>

</section>

{/* FOOTER */}

<footer className="mt-32 border-t border-white/20 py-10 px-16 flex flex-col md:flex-row justify-between items-center backdrop-blur-lg">

  {/* LOGO */}

  <h1 className="text-xl font-bold">
    PayFlow
  </h1>

  {/* FOOTER LINKS */}

  <div className="flex gap-8 mt-6 md:mt-0">
    <a
      href="https://www.linkedin.com/in/debesh-kumar-panda-4a299a273/"
      target="_blank"
      className="opacity-80 hover:opacity-100 transition"
    >
      Contact
    </a>

    <a
      href="https://github.com/DebeshPanda555/Payflow"
      target="_blank"
      className="opacity-80 hover:opacity-100 transition"
    >
      GitHub
    </a>

  </div>

</footer>


    </div>
  );
}