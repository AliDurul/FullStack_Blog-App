import { Button, Container, Grid, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { modal } from "../features/authSlice"

const Header = () => {
    const dispatch = useDispatch()

    const { token } = useSelector(state => state.auth)

    return (
        <Container maxWidth={"false"} sx={{ backgroundColor: '#FFC018' }} >

            <Container maxWidth={'xl'}>
                <Grid container rowSpacing={2} pb={3}>
                    <Grid item mt={10} md={6} >
                        <Typography pb={3} sx={{ fontSize: { xs: '3rem', md: '3rem', lg: '5rem' }, lineHeight: 1 }} color="initial">Stay curious.</Typography>
                        <Typography pb={3} variant="h5" color="initial">Discover stories, thinking, <br /> <span>and expertise from writers on any topic.</span></Typography>
                        {
                            !token && <Button onClick={() => dispatch(modal(true))} sx={{ color: 'black' }} variant="outlined">Start Reading</Button>
                        }
                    </Grid>
                    <Grid item md={6} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', maxHeight: '400px', paddingLeft: 20 }}>
                        <svg height="100%" viewBox="0 0 500 500">
                            <g id="R1" transform="translate(250 250)">
                                <ellipse rx="30" ry="0" opacity=".3">
                                    <animateTransform attributeName="transform" type="rotate" dur="7s" from="0" to="360" repeatCount="indefinite" />
                                    <animate attributeName="cx" dur="8s" values="-20; 220; -20" repeatCount="indefinite" />
                                    <animate attributeName="ry" dur="3s" values="10; 60; 10" repeatCount="indefinite" />
                                </ellipse>
                            </g>
                            <use transform="rotate(72 250 250)" xlinkHref="#R1" />
                            <use transform="rotate(144 250 250)" xlinkHref="#R1" />
                            <use transform="rotate(216 250 250)" xlinkHref="#R1" />
                            <use transform="rotate(288 250 250)" xlinkHref="#R1" />
                        </svg>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    )
}

export default Header