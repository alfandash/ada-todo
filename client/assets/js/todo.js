
$(document).ready(function(){
  if (localStorage.getItem('adatodotoken')) {
    loadTask()
  } else {
    window.location.href = "/"
  }
})


$('form.form-add-task').submit(eventHandler=>{
  var adatodotoken = {'token': localStorage.getItem('adatodotoken')}
  eventHandler.preventDefault()
  $.ajax({
    url: 'http://localhost:3000/todo/',
    type: 'POST',
    headers: adatodotoken,
    data: {
      task: $('#add-task').val()
    },
    success: function(response){
      console.log(response);
      $('#form-add-status').fadeOut('fast')
      $('#form-add-status').empty()
      $('#form-add-status').append(`Task baru berhasil di tambahkan`)
      $('#form-add-status').fadeIn('slow')
      loadTask()
    }
  })
})


function destroy(id){
  $.ajax({
    url: `http://localhost:3000/todo?id_task=${id}`,
    type: 'DELETE',
    headers: {'token':localStorage.getItem('adatodotoken')},
    success: function(response){
      loadTask()
    }
  })
}

function update_status(id){
  $.ajax({
    url: `http://localhost:3000/todo/status?id_task=${id}&status=${$(`#status_task_${id}`).val()}`,
    type: 'PUT',
    headers: {'token':localStorage.getItem('adatodotoken')},
    data: {
      task: $(`#status_task_${id}`).val()
    },
    success: function(response){
      console.log(response);
      loadTask()
    }
  })

}


function loadTask(){
  var adatodotoken = {'token': localStorage.getItem('adatodotoken')}
  $.ajax({
    url: 'http://localhost:3000/todo',
    type: 'GET',
    headers: adatodotoken,
    success: function(response) {
      console.log(`response get task`,response);
      $('#data-table').fadeOut('slow')
      $('#data-table').fadeIn('slow')
      $('#task-data').empty()
      response.forEach((task)=>{
        var created_at = new Date(task.created_at)
        var updated_at = new Date(task.updated_at)
        $('#task-data').append(`<tr>`)
        $('#task-data').append(`<td>${1}</td>`)
        $('#task-data').append(`<td>${task.task}</td>`)
        $('#task-data').append(`<td>${created_at}</td>`)
        $('#task-data').append(`<td>${updated_at}</td>`)
        if (task.status==='done') {
          $('#task-data').append(`
            <td>
              <form class="done" method="post" onsubmit="update_status('${task._id}');return false">
                 <input type="text" id='status_task_${task._id}' value="undone" style="display:none">
                 <button type="submit" name="submit" class="btn btn-primary">Done</button>
             </form>
            </td>
            `)
        } else {
          $('#task-data').append(`
            <td>
              <form class="done" method="post" onsubmit="update_status('${task._id}');return false">
                 <input type="text" id='status_task_${task._id}' value="done" style="display:none">
                 <button type="submit" name="submit" class="btn btn-danger">Undone</button>
             </form>
            </td>
            `)
        }
        $('#task-data').append(`
          <td>
            <form class="delete" method="post" onsubmit="destroy('${task._id}');return false">
               <button type="submit" name="submit" class="btn btn-danger"> delete</button>
           </form>
          </td>
          `)
        $('#task-data').append(`</tr>`)

      })
    }
  })
}


// Smooth scrolling using jQuery easing
$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, "easeInOutExpo");
      return false;
    }
  }
});
