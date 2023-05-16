import { Formik, Form, Field, ErrorMessage } from 'formik'
import { usePosts } from '../context/postContext'
import { useNavigate, useParams, Link } from 'react-router-dom'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import WestIcon from '@mui/icons-material/West';

import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import RotateRightIcon from '@mui/icons-material/RotateRight';



export function PostForm() {
 

  const { createPost, getPost,updatePost } = usePosts()
  const [post, setPost] = useState({
    title: "",
    description: "",
    image:""
  })

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    (async () => {
      if (params.id) {
        const post = await getPost(params.id)
        setPost(post)
      }
    })()

  }, [params.id])



  return (
    <div className='card-form '>
      <div className=' flex items-center justify-center p-20 '>

        <div
          className=' bg-zinc-700 shadow-md shadow-black  p-5'>

          <Formik
            initialValues={post}
            validationSchema={Yup.object({
              title: Yup.string().required("Title is Required").max(10),
              description: Yup.string().required("Description is Required").max(33),
            })}
            onSubmit={async (values, actions) => {
            console.log(values)
            if(params.id){
              await updatePost(params.id, values);
              navigate('/')
            } else {
              await createPost(values);

            navigate('/')
            }
            actions.resetForm();
            actions.setSubmitting(false);
            }}

            enableReinitialize
          >
            {({ handleSubmit, setFieldValue,isSubmitting }) => (
              <motion.div   initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }} >
                <Form
                  onSubmit={handleSubmit}>
                  <header 
                    className='flex justify-between items-center py-4 card-form'>
                    <Link to='/' >
                      <motion.button animate={{
      scale: [1, 2, 2, 1, 1],
      rotate: [0, 0, 270, 270, 0],
      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    }} className=' button-cancel-form'>
                        <TwoWheelerIcon sx={{ fontSize: 100 }} style={{ color: 'red' }} />
                      </motion.button>
                    </Link>
                    <p  className='flex justify-center my-2  font-bold text-gray-300 shadow-md shadow-black px-3 py-3 '>Create Your Adventure!</p>
                    <header>
                      <Link to="/">
                        <h2  className='button-go shadow-md shadow-black '><WestIcon /> go back</h2>
                      </Link>
                    </header>

                  </header>

                  <label  htmlFor="title" className='text-sm my-2 block font-bold text-gray-300'>Title</label>
                  <Field name="title" placeholder="title" className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full" />
                  <ErrorMessage component="p" className='text-red-600' name="title" />

                  <label  htmlFor="description" className='text-sm my-2 block font-bold text-gray-300'>Description</label>
                  <Field name="description" component="textarea" placeholder="decription" className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full" rows={3} />
                  <ErrorMessage component="p" className='text-red-600' name="description" />

                  <label htmlFor='image' className='text-sm block font-bold text-gray-400 py-2'>Image</label>
                  <input type='file' name='image' className='px3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full'
                  onChange={(e) => setFieldValue('image',e.target.files[0])}

                  ></input>
                  <button 
                  type="submit" className='button-save shadow-md shadow-black'
                  desabled={isSubmitting}
                  >
                  {isSubmitting ? (
                  <RotateRightIcon  className='animate-spin'></RotateRightIcon>
                  ) : " Save" }
                   </button>

                </Form>
              </motion.div>

            )}

          </Formik>
        </div>

      </div>

    </div>







  )
}

