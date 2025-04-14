"use client"

import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from "lucide-react"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { toast } from "sonner"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setAuthUser } from "@/redux/authSlice"
import CreatePost from "./CreatePost"
import { setPosts, setSelectedPost } from "@/redux/postSlice"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { motion } from "framer-motion"
import { setLikeNotification, clearLikeNotifications } from "@/redux/rtnSlice";

const LeftSidebar = () => {
  const navigate = useNavigate()
  const { user } = useSelector((store) => store.auth)
  const { likeNotification } = useSelector((store) => store.realTimeNotification)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("Home")
  

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", { withCredentials: true })
      if (res.data.success) {
        dispatch(setAuthUser(null))
        dispatch(setSelectedPost(null))
        dispatch(setPosts([]))
        navigate("/login")
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const sidebarHandler = (textType) => {
    setActiveItem(textType)
    if (textType === "Logout") {
      logoutHandler()
    } else if (textType === "Create") {
      setOpen(true)
    } else if (textType === "Profile") {
      navigate(`/profile/${user?._id}`)
    } else if (textType === "Home") {
      navigate("/")
    } else if (textType === "Messages") {
      navigate("/chat")
    }
   
  }

  const sidebarItems = [
    { icon: <Home className="text-white" />, text: "Home" },
    { icon: <Search className="text-white" />, text: "Search" },    
    { icon: <MessageCircle className="text-white" />, text: "Messages" },
    { icon: <Heart className="text-white" />, text: "Notifications" },
    { icon: <PlusSquare className="text-white" />, text: "Create" },
    {
      icon: (
        <Avatar className="w-6 h-6 border border-purple-500">
          <AvatarImage src={user?.profilePicture || "/placeholder.svg"} alt="profile" />
          <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-500 text-white text-xs">
            {user?.username?.substring(0, 2).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut className="text-white" />, text: "Logout" },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  }

  return (
    <div className="fixed top-0 z-10 left-0 px-4 border-r border-white/10 w-[16%] h-screen bg-gradient-to-b from-black via-slate-900 to-purple-950 backdrop-blur-md">
      <div className="flex flex-col">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="my-8 pl-3 font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400"
        >
          Yash.Album
        </motion.h1>
        <motion.div variants={container} initial="hidden" animate="show">
          {sidebarItems.map((item, index) => {
            const isActive = activeItem === item.text
            return (
              <motion.div
                variants={item}
                onClick={() => sidebarHandler(item.text)}
                key={index}
                className={`flex items-center gap-3 relative hover:bg-white/10 cursor-pointer rounded-lg p-3 my-3 transition-all duration-300 ${
                  isActive ? "bg-white/10 border-l-2 border-purple-500" : ""
                }`}
                whileHover={{
                  scale: 1.03,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 0 10px rgba(147, 51, 234, 0.3)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                <div className={`${isActive ? "text-purple-400" : "text-white"}`}>{item.icon}</div>
                <span className={`${isActive ? "text-purple-400" : "text-white"}`}>{item.text}</span>
                {item.text === "Notifications" && likeNotification.length > 0 && (
                  <Popover onOpenChange={(open) => {
                    if (open) {
                      setTimeout(() => {
                        dispatch(clearLikeNotifications());
                      }, 5000); // give it time to render popover
                    }
                  }}>
                    <PopoverTrigger asChild>
                      <Button
                        size="icon"
                        className="rounded-full h-5 w-5 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 absolute bottom-6 left-6 shadow-[0_0_10px_rgba(147,51,234,0.5)]"
                      >
                        {likeNotification.length}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="bg-slate-900/90 backdrop-blur-md border border-white/10 text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                      <div>
                        {likeNotification.length === 0 ? (
                          <p>No new notification</p>
                        ) : (
                          likeNotification.map((notification) => {
                            return (
                              <motion.div
                                key={notification.userId}
                                className="flex items-center gap-2 my-2"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <Avatar className="border border-purple-500/50">
                                  <AvatarImage src={notification.userDetails?.profilePicture || "/placeholder.svg"} />
                                  <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                                    {notification.userDetails?.username?.substring(0, 2).toUpperCase() || "U"}
                                  </AvatarFallback>
                                </Avatar>
                                <p className="text-sm">
                                  <span className="font-bold text-purple-400">
                                    {notification.userDetails?.username}
                                  </span>{" "}
                                  liked your post
                                </p>
                              </motion.div>
                            )
                          })
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <CreatePost open={open} setOpen={setOpen} />
    </div>
  )
}

export default LeftSidebar
