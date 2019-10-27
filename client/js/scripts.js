document.addEventListener("DOMContentLoaded", function(){

    window.setInterval(function(){
        get_data((input) => {
            let tbody = $("#data tbody")
            tbody.empty();
            for(let i = 0; i<input.length; i++) {
                let row = input[i];
                tbody.append(
                    "<tr>"+
                        "<td>"+row.id+"</td>"+
                        "<td>"+row.arduino_time+"</td>"+
                        "<td>"+row.arduino_distance+"</td>"+
                        "<td>"+row.created+"</td>"+
                    "</tr>"
                );
            }
            console.log("got data");
        });
    }, 1000);
});

function get_data(cb) {
    $.ajax({
        url:"http://localhost:3000/arduino",
        method:"GET",
        dataType:"json",
        contentType:"application/json",
        success: function (input) {
            cb(input);
        },
        error:function (xhr, status, error) {
            console.log(xhr, status, error);
        }
    });
}

//todo
function add_key_listeners() {

}