
interface BlogCardProps {
    authorName: string,
    title :string,
    content:string,
    PublishedDate: string
}
export const BlogCard = ({authorName, title, content, PublishedDate} :BlogCardProps)=>{
    return <div className="border-b border-slate-200 pb-4 p-4">
        <div className="flex">
                <Avatar size = "small" authorName = {authorName}/>
            <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                {authorName} 
            </div> 
            <div className="flex justify-center flex-col pl-2 ">
                <Circle/>
            </div>
            <div className=" font-light pl-2 text-slate-400 flex justify-center flex-col">
                {PublishedDate}
            </div>
        </div>
        <div  className="text-xl font-semibold pt-2">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0,100) + ".... "}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
            {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>

    </div>
}

function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

export function Avatar({ authorName , size = "small" }:{ authorName : string ,size ?: "small" | "big" }) {
    let arr : string[] = authorName.split(' ');
    let temp :string = "";
    if(arr.length >1){
        temp = arr[0][0] + arr[1][0];
    }
    else{
        temp = arr[0][0];
    }
    return <div className= {` relative inline-flex items-center justify-center  ${size === "small" ? "w-6 h-6" : "w-10 h-10" } overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 `}>
        <span className={` ${size === "small" ? "text-sm" : "text-l" } text-xs text-gray-600 dark:text-gray-300 `}>{temp}</span>
    </div>
    
}