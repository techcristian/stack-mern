import {HomePage, PostForm} from './pages/Index.jsx'
import {Routes, Route} from 'react-router-dom'
import { PostProvider } from './context/postContext.jsx';
import {Toaster} from 'react-hot-toast'

function App() {
  return (
    
    <div className='bg-neutral-900 min-h-screen flex items-center'>
   <div className='bg-neutral-900 m-auto'>
   <PostProvider>
   <Routes>
      <Route path='/' element={<HomePage/>}  />
      <Route path='/posts/new' element={<PostForm/>} />
      <Route path='/posts/:id' element={<PostForm/>}/>
  </Routes>
  <Toaster/>
   </PostProvider>
  
   </div>
  
    </div>
  )
}





export default App;
