var data=[
    {
    "id": 10001,
    "birthDate": "1953-09-01",
    "firstName": "Georgi",
    "lastName": "Facello",
    "gender": "M",
  },
  {
    "id": 10002,
    "birthDate": "1964-06-01",
    "firstName": "Bezalel",
    "lastName": "Simmel",
    "gender": "F",
  },
  {
    "id": 10003,
    "birthDate": "1959-12-02",
    "firstName": "Parto",
    "lastName": "Bamford",
    "gender": "M",
  },
  {
    "id": 10004,
    "birthDate": "1954-04-30",
    "firstName": "Chirstian",
    "lastName": "Koblick",
    "gender": "M",
  },
  {
    "id": 10005,
    "birthDate": "1955-01-20",
    "firstName": "Kyoichi",
    "lastName": "Maliniak",
    "gender": "M",
  }
];
var nextId = 10006;

$(document).ready(function() {
  displayEmlpoyeeList();

  $("#create-employee-form").on('submit', function(e) {
    e.preventDefault();
    var form_action = $("#create-employee-form").attr("action");
    var name = $("#name").val();
    var surname = $("#surname").val();
    var birth = $("#birthdate").val();
    var sex = $("#gender").val()
    dysplay = "create";

    if(name != '' && surname != ''){
      data.push({id: nextId, birthDate: birth, firstName: name, lastName: surname, gender: sex});
      nextId++;
      displayEmlpoyeeList();
      $("#create-employee").modal('hide');
      toastr.success('Employee created successfully.', 'Success Alert', {timeOut:5000});
    }else{
      alert('All fields are required. Please make sure you fill out all fields correctly.')
    }
  });

  /*$("body").on("click", "edit-employee", function() {
    var id = $(this).parent("td").data('id');
    var birthDate = $(this).parent("td").prev("td").text();
    var firstName = $(this).parent("td").prev("td").prev("td").text();
    var lastName = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var gender = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();


  })*/

  $("body").on("click", ".delete-employee", function() {
    var id = $(this).parent("td").data('id');
    for(let i=0; i<data.length; i++){
      if(data[i].id==id){
        data.splice(i, 1);
      }
    }
    displayEmlpoyeeList();
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
      rows = rows +'<button class="btn btn-danger btn-sm delete-employee">Elimina</button>';
      rows = rows +'</td>';
      rows = rows +'</tr>';
    });
    $("tbody").html(rows);
  }

});

