import { Box, CardContent,Typography } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import imgNotAv from '../img/Image_not_available.png'

const News = () => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_NEWS_KEY}`

    const { blogs } = useSelector(state => state.blog)

    const [news, setNews] = useState([])

    const getNews = async () => {
        try {
            const { data } = await axios(url)
            setNews(data.articles)

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getNews()
    }, [])

    return (
        <Box mt={5} >
            <Typography pl={2} variant="body1" fontWeight={800} color="initial">News From Today</Typography>
            {
                news.splice(0, (blogs.length * 2)).map((haber, i) => (
                    <Box onClick={() => window.location.href = haber.url} key={i} sx={{ cursor: 'pointer', display: 'flex', borderBottom: '1px solid rgba(0, 0, 0, 0.12)', mb: 7 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent >
                                <Typography component="div" variant="subtitle2">
                                    {haber.title.slice(0, 50)}...
                                </Typography>
                                <Typography variant="caption" color="text.secondary" component="div">
                                    {new Date(haber.publishedAt).toDateString()}
                                </Typography>
                            </CardContent>
                        </Box>

                        <Box width={150} margin={'auto'}>
                            <img src={haber?.urlToImage ?? imgNotAv} alt="image" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                        </Box>

                    </Box>
                ))
            }

        </Box>
    )
}

export default News