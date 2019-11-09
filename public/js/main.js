//ADD MEDICINES
$("#addMed").click(function(){
    var medField = document.getElementById("med").innerHTML;

    $("#meds").append('<div class="col-md-12 mb-3">'+ medField + '</div>');
});

//ADD CONSULTANT VISITS 
$("#addCon").click(function(){
    var conField = document.getElementById("con").innerHTML;

    $("#conVis").append('<div class="row mb-3">'+ conField + '</div>');
});

//ADD TESTS
$("#addTest").click(function(){
    var testField = document.getElementById("test").innerHTML;

    $("#tests").append('<div class="col-md-12 mb-3">'+ testField + '</div>');
});