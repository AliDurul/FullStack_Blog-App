/* eslint-disable react/prop-types */
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Badge, Box, Stack } from '@mui/material';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';


export default function CommentCard({ comment }) {


  return (
    <Box sx={{ width: '100%', borderBottom: '1px solid rgba(0, 0, 0, 0.075)' }}>
      <CardHeader
        avatar={
          <Avatar src={comment?.user?.image} aria-label="recipe" />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={comment?.user?.first_name + " " + comment?.user?.last_name}
        subheader={new Date(comment?.createdAt).toLocaleString('us-US')}
      />

      <CardContent sx={{ pt: 0 }}>
        <Typography variant="body2" color="text.secondary">
          {comment?.content}
        </Typography>

        <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <IconButton aria-label="like it"  >
            <Badge badgeContent={0} color="secondary">
              <ThumbUpOffAltOutlinedIcon />
            </Badge>
          </IconButton>

          <Typography variant="subtitle1" color="text.primry" sx={{textDecoration:'underline', cursor:'pointer', pr:3}}>
            Reply
          </Typography>
        </Stack>

      </CardContent>



    </Box>
  );
}
