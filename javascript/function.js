var data=[];
var links;
var page;
var api = "http://localhost:8080/employees?page="+page+"&size=20";
var nextId = 500000;

$(document).ready(function() {
  
  get();

  $("#first-button").on("click", function() {
    api=links['first']['href'];
    get();
  });

  $("#next-button").on("click", function() {
    api = links['next']['href'];
    get();
  });

  $("#previous-button").on("click", function() {
    api = links['prev']['href'];
    get();
  });

  $("#last-button").on("click", function() {
    api=links['last']['href'];
    get();
  })


  function get() {
    $.ajax({
      method: "GET",
      url: api
    })
    .done(function(msg) {
      console.log(msg['_embedded']['employees']);
      data=msg['_embedded']['employees'];
      links=msg['_links'];
      page=msg['page']['number'];
      displayEmlpoyeeList();
      dysplayPagination();
    });
  }
  

  //Add an employee
  $("#create-employee-form").on('submit', function(e) {
    e.preventDefault();
    var form_action = $("#create-employee-form").attr("action");
    var name = $("#name").val();
    var surname = $("#surname").val();
    var birth = $("#birthdate").val();
    var sex = $("#gender").val()
    dysplay = "create";
    var payload = JSON.stringify({birthDate: birth, firstName: name, lastName: surname, gender: sex});
    console.log(payload);

    if(name != '' && surname != ''){
      $.ajax({
        method: "POST",
        url: 'http://localhost:8080/employees',
        contentType: "application/json; charset=utf-8",
        body: payload
      })
      .done(function(msg) {
        get();
      });

      $("#create-employee-form")[0].reset();
      $("#create-employee").modal('hide');
      t//oastr.success('Employee created successfully.', 'Success Alert', {timeOut:5000});
    }else{
      alert('All fields are required. Please make sure you fill out all fields correctly.')
    }
  });

  //Edit an employee
  $("body").on("click", ".edit-employee", function() {
    var id = $(this).parent("td").data('id');
    var gender = $(this).parent("td").prev("td").text();
    var birthDate = $(this).parent("td").prev("td").prev("td").text();
    var lastName = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var firstName = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();

    $("#birth_edit").val(birthDate);
    $("#name_edit").val(firstName);
    $("#surname_edit").val(lastName);
    $("#gender_edit").val(gender);
    $("#edit-employee-form").find(".edit-id").val(id);

    $("#edit-employee-form").on('submit', function(e) {
      e.preventDefault();
      //var form_action = $("#edit-employee-form").attr("action");
      var idE = $("#id_edit").val();
      var name = $("#name_edit").val();
      var surname = $("#surname_edit").val();
      var birth = $("#birth_edit").val();
      var sex = $("#gender_edit").val()
      //dysplay = "create";

      if(firstName != '' && lastName != ''){
        for(let i=0; i<data.length; i++){
          if(data[i].id==idE){
            data[i].firstName= name;
            data[i].lastName= surname;
            data[i].birthDate = birth;
            data[i].gender = sex;
            break;
          }
        }
        displayEmlpoyeeList();
        $("#edit-employee").modal('hide');
        toastr.success('Employee created successfully.', 'Success Alert', {timeOut:5000});
      }else{
        alert('All fields are required. Please make sure you fill out all fields correctly.')
      }
    })
  })

  //Delete an employee
  $("body").on("click", ".delete-employee", function() {
    var id = $(this).parent("td").data('id');
    $.ajax({
      method: "DELETE",
      url: 'http://localhost:8080/employees/'+id
    })
    .done(function(msg) {
      get();
    });
  });

  function displayEmlpoyeeList() {
    var rows = '';
    $.each(data, function(index, value) {
      rows = rows + '<tr>';
      rows= rows +'<td>' +value.id +'</td>';
      rows= rows +'<td>' +value.firstName +'</td>';
      rows= rows +'<td>' +value.lastName +'</td>';
      rows= rows +'<td>' +value.birthDate +'</td>';
      rows= rows +'<td>' +value.gender +'</td>';
      rows= rows +'<td data-id="'+value.id+'">';
      rows = rows +'<button class="btn btn-danger btn-sm delete-employee"><i class="fa-solid fa-trash-can"></i></button>';
      rows = rows +'&nbsp&nbsp';
      rows = rows +'<button class="btn btn-secondary btn-sm edit-employee" data-toggle="modal" data-target="#edit-employee"><i class="fa-solid fa-pen"></i></button>';
      rows = rows +'</td>';
      rows = rows +'</tr>';
    });
    $("tbody").html(rows);
  }

  function dysplayPagination() {
    let code = '';
    code += '<button class="btn btn-secondary" disabled>'+page+'</button>';
    $("pagination").html(code);
  }

});