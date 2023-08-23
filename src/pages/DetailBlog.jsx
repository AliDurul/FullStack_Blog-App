import { useEffect } from 'react'
import useBlog from '../hooks/useBlog'
import { useParams } from 'react-router-dom'

const DetailBlog = () => {
    const {id} = useParams()
    const { getBlogById } = useBlog()

    useEffect(() => {
        getBlogById(id)
    }, [])


    return (
        <div>DetailBlog</div>
    )
}

export default DetailBlog