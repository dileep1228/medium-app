import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog= ({blog} : { blog:Blog  })=>{
    return <div>
        <Appbar/>
        <div className="flex justify-center">
            <div className="grid grid-cols-12 w-full px-10 pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-400 pt-2">
                        Posted on 30th april 2024
                    </div>
                    <div className="col-span-4 pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex">
                        <div className="flex flex-col pr-4 justify-center">
                            <Avatar authorName= {blog.author.name || "Anonymous"} size="big" />
                        </div >
                        <div>
                            <div className="text-xl font-bold">
                                { blog.author.name || "Anonymous" }
                            </div>
                            <div className="pt-2 text-slate-500">
                                Random catch Phrases about batman abilities he is one of the greatest man alive after him its me...
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
                
            </div>
        </div>
    </div>
}