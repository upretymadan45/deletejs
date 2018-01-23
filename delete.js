$((function(){
    var url;
    var redirectUrl;

    $('body').append(`
            <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Warning</h4>
                </div>
                <div class="modal-body delete-modal-body">
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal" id="cancel-delete">Cancel</button>
                    <button type="button" class="btn btn-danger" id="confirm-delete">Delete</button>
                </div>
                </div>
            </div>
            </div>`);

     //Delete Action
     $(".delete").on('click',(e)=>{
         e.preventDefault();

        var target = e.target;
        var Id = $(target).attr('data-Id');
        var controller = $(target).attr('data-controller');
        var action = $(target).attr('data-action');
        var bodyMessage = $(target).attr('data-body-message');
        redirectUrl = $(target).attr('data-redirect-url');

        url = "/"+controller+"/"+action+"?Id="+Id;
        $(".delete-modal-body").text(bodyMessage);
        $("#deleteModal").modal('show');
    });

    $("#confirm-delete").on('click',()=>{
        $.get(url)
            .done((result)=>{
                window.location.href = redirectUrl;                    
            })
            .fail((error)=>{              
                window.location.href = redirectUrl;
            }).always(()=>{
                $("#deleteModal").modal('hide');                    
            });
    });

    $("#deleteModal").on('hidden.bs.modal', function (e) {
        e.preventDefault();
    });

}()));
