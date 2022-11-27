$(document).ready(()=>{
    $(".delete-book").on("click",(e)=>{
        $target = $(e.target)
        const id = $target.attr("data-id")
        //Send request to express with DELETE method
        $.ajax({
            type: "DELETE",
            url: `/recipes/${id}`,
            success: (response) =>{
                alert("Deleted Recipe")
                window.location.href="/"
            },
            error: (err) =>{
                console.log(err)
            }
        })
    })
})