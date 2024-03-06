import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs = ()=>{

    const {loading, blogs} = useBlogs();

    if(loading){
        return <div>
            loading.....
        </div>
    }
    return <div className="flex justify-center">
        <div>
        <Appbar/>
        <div className="max-w-xl">
            <BlogCard  
            authorName = {"dileep kumar"}
            title = {"title of the blog title of the blog title of the blog"}
            content = {"content of the blog content of the blog content of the blog content of the blog content of the blog content of the blog"}
            PublishedDate = {"2nd march 2024"}
            />
        </div>
        </div>
    </div>
    
} 