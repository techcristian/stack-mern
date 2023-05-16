import { Link } from "react-router-dom"
import { usePosts } from "../context/postContext.jsx"
import { motion } from "framer-motion"
import PostAddIcon from '@mui/icons-material/PostAdd';
import { PostCard } from "../components/PostCard.jsx";
import SportsMotorsportsOutlinedIcon from '@mui/icons-material/SportsMotorsportsOutlined';
import MopedIcon from '@mui/icons-material/Moped';
import FlagIcon from '@mui/icons-material/Flag';


export const HomePage = () => {
  
 
  
  const {posts} = usePosts()

if(posts.length === 0)
 
 return (
 <div 
 
 className="text-white flex flex-col justify-center items-center ">
  <Link to='/posts/new' >
<div >
<PostAddIcon sx={{ fontSize: 70 }}/>
</div>
  </Link>
 
   <h1
 
   >There are no posts
   </h1>
 </div>
 )
  
return (
  
<div 
className="text-white ">
  <motion.div  initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
           className="flex justify-between items-center  card-form" >
  
  <header className="flex justify-center items-center">
  <p >amount: {posts.length} <FlagIcon sx={{ fontSize: 20}}  style={{color:'red'}}/> </p>
  
</header>

<p  className="flex justify-center items-center"><SportsMotorsportsOutlinedIcon sx={{ fontSize: 200}}  style={{color:'red'}}/></p>
  
  <header className="flex justify-center items-center">
  <Link to='posts/new'className="  button-create ">
  <MopedIcon sx={{ fontSize: 50}}  style={{color:'red'}} />  <p>Create Post</p></Link>
 </header>

</motion.div >
 
 

<div className="cards">
  {posts.map(post => (
    
          <motion.div  initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }} >
          
          
         <PostCard post={post}   key={post.id}
         />
         
          </motion.div>  
   ))}

  </div>  

  </div>  
)
}


