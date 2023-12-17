/* eslint-disable react/prop-types */

import { Avatar, Button, CardHeader, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CommentCard from './CommentCard';
import useBlogCall from '../hooks/useBlogCall';



// eslint-disable-next-line react/prop-types
export default function BlogComment({ toggleDrawer, state, id, CommentArr }) {


  // eslint-disable-next-line react/prop-types
  const { userInfo } = useSelector(state => state.auth)
  const { createComment } = useBlogCall()

  const [comment, setComment] = useState({ post: id, content: "" })

  const formSubmit = (e) => {
    e.preventDefault()

    if (!comment?.content) {
      return;
    }

    createComment(comment, id)
    setComment({
      post: id,
      content: ""
    })

    e.target[0].value = ""

  }

  return (
    <div>
      <Drawer
        anchor={'right'}
        open={state}
        onClose={toggleDrawer(false)}
      >
        <Box sx={{ width: { xs: 350, md: 550 }, p: 2 }}>

          <form action="#" onSubmit={formSubmit}>
            <Box sx={{ boxShadow: 4, borderRadius: 4, p: 1, mb: 3, height: 'auto' }}>
              <CardHeader
                sx={{ p: 1 }}
                avatar={
                  <Avatar aria-label="recipe" src={userInfo?.image} />
                }
                title={<span style={{ fontWeight: 600, }}>{userInfo?.username}</span>}
              />

              <textarea
                onChange={(e) => setComment({ ...comment, content: e.target.value.trim() })}

                name="comment"
                id="comment"
                placeholder='Your Comment...'
                style={{ border: 'none', outline: 'none', padding: '10px', width: '100%', minHeight: '100px', fontSize: '1.1rem', fontStyle: "italic", resize: 'vertical' }}

              />
              <Stack >
                <Button disabled={!comment?.content} type='submit' sx={{ alignSelf: 'flex-end', borderRadius: 5 }} color='commentBtn' variant="outlined">Send</Button>
              </Stack>
            </Box>
          </form>


          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
          >

            {
              CommentArr.map(comment => <CommentCard key={comment._id} comment={comment} />)
            }

          </Stack>



        </Box>
      </Drawer>


    </div>
  );
}
