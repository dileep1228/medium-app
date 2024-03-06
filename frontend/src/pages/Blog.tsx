import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

export const Blog = ()=>{
    const { id } = useParams();
    console.log(id);
    const {loading, blog} = useBlog({
        id : id || ""
    });
    if(loading){
        return <div>
            <Appbar/>
            <div className="h-screen flex flex-col justify-center">
                <div className=" flex justify-center" >
                    loading....
                </div>
            </div>
        </div>
    }
    return <div>
        <FullBlog blog = {blog}/>
    </div>
} 