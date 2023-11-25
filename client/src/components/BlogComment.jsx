
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';


// eslint-disable-next-line react/prop-types
export default function BlogComment({ toggleDrawer, state }) {




  return (
    <div>
      <Drawer
        anchor={'right'}
        open={state}
        onClose={toggleDrawer(false)}
      >
        <Box sx={{ width:{xs:350, md:550} }}>
          <h1>sdfasdfdasfsad</h1>
        </Box>
      </Drawer>


    </div>
  );
}
