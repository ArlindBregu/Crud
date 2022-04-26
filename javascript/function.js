var data=[];
var links;
var page=0;
var api = "http://localhost:8080/index.php?page="+page+"&size=20";
var nextId = 500000;
var last;

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
      page=msg['pages']['number'];
      last=msg['pages']['totalPages'];
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
    var payload = JSON.stringify({birth_date: birth, first_name: name, last_name: surname, gender: sex});

    if(name != '' && surname != ''){
      $.ajax({
        method: "POST",
        url: 'http://localhost:8080/index.php',
        contentType: "application/json",
        data: payload
      })
      .done(function(msg) {
        get();
      });

      $("#create-employee-form")[0].reset();
      $("#create-employee").modal('hide');
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
      var form_action = $("#edit-employee-form").attr("action");
      var idE = $("#id_edit").val();
      var nameE = $("#name_edit").val();
      var surnameE = $("#surname_edit").val();
      var birthE = $("#birth_edit").val();
      var sexE = $("#gender_edit").val()
      dysplay = "create";
      var payload2 = JSON.stringify({birth_date: birthE, first_name: nameE, last_name: surnameE, gender: sexE});

      if(firstName != '' && lastName != ''){
        
        $.ajax({
          method: "PUT",
          url: 'http://localhost:8080/index.php?id='+idE,
          contentType: "application/json",
          data: payload2
        })
        .done(function() {
          get();
        })

        $("#edit-employee").modal('hide');
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
      url: 'http://localhost:8080/index.php?id='+id
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
      rows= rows +'<td>' +value.first_name +'</td>';
      rows= rows +'<td>' +value.last_name +'</td>';
      rows= rows +'<td>' +value.birth_date +'</td>';
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
    if(page==0){
      document.getElementById('first-button').setAttribute("disabled", "disabled");
      document.getElementById('previous-button').setAttribute("disabled", "disabled");
    }else{
      document.getElementById('first-button').removeAttribute("disabled");
      document.getElementById('previous-button').removeAttribute("disabled");
    }
    code += '<button class="btn btn-secondary" disabled>'+page+'</button>';
    if(page==last){
      document.getElementById('next-button').setAttribute("disabled", "disabled");
      document.getElementById('last-button').setAttribute("disabled", "disabled");
    }else{
      document.getElementById('next-button').removeAttribute("disabled");
      document.getElementById('last-button').removeAttribute("disabled");
    }
    $("pagination").html(code);
  }

});