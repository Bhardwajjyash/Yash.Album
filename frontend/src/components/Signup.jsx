"use client"

import { useEffect, useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import axios from "axios"
import { toast } from "sonner"
import { Link, useNavigate } from "react-router-dom"
import { Loader2, Sparkles, Lock, Mail, User } from "lucide-react"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const { user } = useSelector((store) => store.auth)
  const navigate = useNavigate()

  const particlesInit = async (engine) => {
    await loadSlim(engine)
  }

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const signupHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post("http://localhost:8000/api/v1/user/register", input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      if (res.data.success) {
        navigate("/login")
        toast.success(res.data.message)
        setInput({
          username: "",
          email: "",
          password: "",
        })
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <div className="relative flex items-center justify-center w-screen h-screen bg-gradient-to-br from-black via-slate-900 to-purple-950 overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.2,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-[0_0_15px_rgba(148,0,255,0.3)] p-8 w-full max-w-md mx-4"
      >
        <motion.form
          onSubmit={signupHandler}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <motion.div variants={itemVariants} className="my-4 text-center">
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10,
                delay: 0.2,
              }}
              className="inline-flex items-center gap-2 mb-2"
            >
              <Sparkles className="h-6 w-6 text-purple-400" />
              <h1 className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                Yash.Album
              </h1>
            </motion.div>
            <p className="text-sm text-gray-300">Signup to see photos & videos from your friends</p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <label className="font-medium text-gray-200 flex items-center gap-2">
              <User className="h-4 w-4 text-purple-400" />
              Username
            </label>
            <div className="relative group">
              <Input
                type="text"
                name="username"
                value={input.username}
                onChange={changeEventHandler}
                className="bg-black/30 border-white/10 focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-all pl-3 h-11 text-white"
                autoComplete="username"
              />
              <div className="absolute inset-0 rounded-md -z-10 group-hover:bg-purple-500/20 group-focus-within:bg-purple-500/20 transition-all duration-300"></div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <label className="font-medium text-gray-200 flex items-center gap-2">
              <Mail className="h-4 w-4 text-purple-400" />
              Email
            </label>
            <div className="relative group">
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                className="bg-black/30 border-white/10 focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-all pl-3 h-11 text-white"
              />
              <div className="absolute inset-0 rounded-md -z-10 group-hover:bg-purple-500/20 group-focus-within:bg-purple-500/20 transition-all duration-300"></div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <label className="font-medium text-gray-200 flex items-center gap-2">
              <Lock className="h-4 w-4 text-purple-400" />
              Password
            </label>
            <div className="relative group">
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                className="bg-black/30 border-white/10 focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-all pl-3 h-11 text-white"
              />
              <div className="absolute inset-0 rounded-md -z-10 group-hover:bg-purple-500/20 group-focus-within:bg-purple-500/20 transition-all duration-300"></div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            {loading ? (
              <Button className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 border-0 text-white font-medium">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 border-0 text-white font-medium relative overflow-hidden group"
              >
                <span className="relative z-10">Sign Up</span>
                <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Button>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
              Login
            </Link>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  )
}

export default Signup