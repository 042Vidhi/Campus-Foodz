interface NestedCommentsProps{
    comments:Comment[];
    onSubmit:(content:string)=>void;
    onEdit:(content:string)=>void;
    onDelete:(commentId:number)=>void;
    onUpvote:(commentId:number)=>void;
    onDownvote:(commentId:number)=>void;
}