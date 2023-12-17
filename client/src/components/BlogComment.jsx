
import { Avatar, Button, CardHeader, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// import useBlogCall from '../hooks/useBlogCall';



// eslint-disable-next-line react/prop-types
export default function BlogComment({ toggleDrawer, state, id }) {


  // eslint-disable-next-line react/prop-types
  const { userInfo } = useSelector(state => state.auth)
  // const { createComment } = useBlogCall()

  const [comment, setComment] = useState({ post: id, content: "" })

  const formSubmit = (e) => {
    e.preventDefault()

    if (!comment?.content) {
      return;
    }

    console.log(comment);
    // createComment(comment, id)
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

            <Box sx={{ boxShadow: 4, borderRadius: 4, p: 1 }}>
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
                style={{ border: 'none', outline: 'none', padding: '10px', resize: 'none', width: '100%', height: '100px', fontSize: '1.3rem', fontStyle: "italic", overflow: 'auto' }}

              />
              <Stack >
                <Button disabled={!comment?.content} type='submit' sx={{ alignSelf: 'flex-end', borderRadius: 5 }} color='commentBtn' variant="outlined">Send</Button>
              </Stack>


            </Box>







          </form>




        </Box>
      </Drawer>


    </div>
  );
}
