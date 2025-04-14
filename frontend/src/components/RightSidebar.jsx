"use client"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import SuggestedUsers from "./SuggestedUsers"
import { motion } from "framer-motion"

const RightSidebar = () => {
  const { user } = useSelector((store) => store.auth)

  return (
    <motion.div
      className="w-[450px] my-10 pr-32"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className=" w-full flex items-center gap-3 p-4 rounded-xl backdrop-blur-sm bg-white border border-white/10 shadow-[0_0_15px_rgba(120,58,240,0.2)] mb-6"
        whileHover={{ boxShadow: "0 0 20px rgba(120,58,240,0.3)" }}
      >
        <Link to={`/profile/${user?._id}`}>
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
            <Avatar className="border-2 border-purple-500 h-12 w-12">
              <AvatarImage src={user?.profilePicture || "/placeholder.svg"} alt="profile" />
              <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                {user?.username?.substring(0, 2).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </Link>
        <div>
          <h1 className="font-semibold text-white">
            <Link to={`/profile/${user?._id}`} className="text-purple-400 transition-colors">
              {user?.username}
            </Link>
          </h1>
          <span className="text-gray-400 text-sm">{user?.bio || "Bio here..."}</span>
        </div>
      </motion.div>

      <motion.div
        className="rounded-xl backdrop-blur-sm bg-white border border-white/10 shadow-[0_0_15px_rgba(120,58,240,0.2)] p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.h2
          className="text-lg font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Suggested For You
        </motion.h2>
        <SuggestedUsers />
      </motion.div>

      <motion.div
        className="mt-6 p-4 rounded-xl backdrop-blur-sm bg-white border border-white/10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Yash.Album • <span className="text-purple-400">Privacy</span> •{" "}
          <span className="text-purple-400">Terms</span>
        </p>
      </motion.div>
    </motion.div>
  )
}

export default RightSidebar
