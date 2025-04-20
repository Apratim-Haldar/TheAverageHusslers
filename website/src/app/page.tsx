import { currentUser } from "@clerk/nextjs/server"
import redis from "@/lib/redis"
import { CheckCircle, Users, Brain, BarChartIcon as ChartBar, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import GetStartedButton from "@/components/get-started-button"
import FeatureCard from "@/components/feature-card"
import TestimonialCard from "@/components/testimonial-card"
import hr from "@/assets/hr_automation.png"
import Image from "next/image"

const Page = async () => {
  const user = await currentUser()
  console.log("User:", user)

  await redis.set("User", user?.id)
  const data = await redis.get("User")
  console.log(data)

  const features = [
    {
      title: "AI-Powered Shortlisting",
      description:
        "Our advanced AI algorithms analyze applications to identify the most qualified candidates, saving your team countless hours of manual review.",
      icon: <Brain className="h-10 w-10 text-primary" />,
    },
    {
      title: "Automated Screening",
      description:
        "Streamline your initial screening process with intelligent automation that evaluates candidates based on your specific requirements.",
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
    },
    {
      title: "Candidate Analytics",
      description: "Gain valuable insights into your candidate pool with comprehensive analytics and reporting tools.",
      icon: <ChartBar className="h-10 w-10 text-primary" />,
    },
    {
      title: "Time-Saving Workflows",
      description: "Reduce time-to-hire by up to 70% with optimized workflows and intelligent process automation.",
      icon: <Clock className="h-10 w-10 text-primary" />,
    },
    {
      title: "Team Collaboration",
      description:
        "Enable seamless collaboration among hiring teams with shared candidate profiles and integrated feedback systems.",
      icon: <Users className="h-10 w-10 text-primary" />,
    },
    {
      title: "Enterprise Security",
      description: "Rest easy knowing your data is protected with enterprise-grade security and compliance measures.",
      icon: <Shield className="h-10 w-10 text-primary" />,
    },
  ]

  const testimonials = [
    {
      quote:
        "This platform has revolutionized our hiring process. We've reduced our time-to-hire by 65% while improving the quality of our candidates.",
      author: "Sarah Johnson",
      position: "Head of HR, TechCorp Inc.",
    },
    {
      quote:
        "The AI-powered insights have been game-changing for our recruitment team. We're making better hiring decisions faster than ever before.",
      author: "Michael Chen",
      position: "Talent Acquisition Director, Global Enterprises",
    },
    {
      quote:
        "Implementation was seamless, and the ROI has been incredible. Our hiring managers can't imagine going back to our old process.",
      author: "Jessica Williams",
      position: "CHRO, Innovation Solutions",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Transform Your <span className="text-primary">Hiring Process</span> With AI
              </h1>
              <p className="mt-6 text-xl text-gray-600">
                Our enterprise HR automation platform uses advanced AI to streamline application processing, shortlist
                candidates, and accelerate your entire hiring workflow.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <GetStartedButton />
                <Button variant="outline" className="h-12 px-6">
                  Request Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src={hr}
                alt="HR Automation Platform Dashboard"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary">70%</p>
              <p className="mt-2 text-gray-600">Reduction in Time-to-Hire</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">85%</p>
              <p className="mt-2 text-gray-600">Increase in Quality Candidates</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">50%</p>
              <p className="mt-2 text-gray-600">Cost Savings in Recruitment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Powered by Advanced AI Technology</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform leverages cutting-edge artificial intelligence to transform every aspect of your hiring
              process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} title={feature.title} description={feature.description} icon={feature.icon} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform seamlessly integrates with your existing workflows to provide immediate value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect Your Systems</h3>
              <p className="text-gray-600">
                Integrate with your existing HR tools and job boards to centralize all applications.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI engine analyzes applications, identifying top candidates based on your criteria.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Streamlined Hiring</h3>
              <p className="text-gray-600">
                Make faster, data-driven decisions with AI-powered insights and recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Trusted by Leading Enterprises</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              See what our customers have to say about transforming their hiring process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                position={testimonial.position}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your Hiring Process?</h2>
          <p className="mt-4 text-xl max-w-3xl mx-auto opacity-90">
            Join hundreds of enterprises that have revolutionized their recruitment with our AI-powered platform.
          </p>
          <div className="mt-10">
            <GetStartedButton variant="secondary" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">HR AI Platform</h3>
              <p>Transforming enterprise hiring with advanced AI technology.</p>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p>&copy; {new Date().getFullYear()} HR AI Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Page
