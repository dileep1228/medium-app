
interface BlogCardProps {
    authorName: string,
    title :string,
    content:string,
    PublishedDate: string
}
export const BlogCard = ({authorName, title, content, PublishedDate} :BlogCardProps)=>{
    return <div className="border border-slate-200 pb-4">
        <div className="flex">
            <div className="flex justify-center flex-col">
                <Avatar authorName = {authorName}/>
            </div>
            <div className="font-extralight pl-2">
                {authorName} 
            </div> 
            <div className="flex justify-center flex-col pl-2">
                <Circle/>
            </div>
            <div className=" font-light pl-2 text-slate-400">
                {PublishedDate}
            </div>
        </div>
        <div  className="text-xl font-semibold">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0,100) + ".... "}
        </div>
        <div className="text-slate-500 text-sm font-thin">
            {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>

    </div>
}

function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

function Avatar({ authorName }:{ authorName : string }) {
    let arr : string[] = authorName.split(' ');
    let temp :string = "";
    if(arr.length >1){
        temp = arr[0][0] + arr[1][0];
    }
    else{
        temp = arr[0][0];
    }
    return <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="text-xs text-gray-600 dark:text-gray-300">{temp}</span>
    </div>
    
}