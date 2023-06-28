const createModal = (modalType) => {
  let modal
  if (modalType === "registerTask") {
    modal = $('body').append(`
    <div class="modal fade" id="registerTask" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Nova tarefa</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3 ">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="titleTask" placeholder="00/00/0000 00:00">
                    <label for="viewStartTime">Título:</label>
                  </div>
                </div>
                <div class="row g-2">
                    <div class="col-md">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="startTime" placeholder="00/00/0000 00:00">
                            <label for="viewStartTime">Início:</label>
                        </div>
                    </div>
                    <div class="col-md">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="endTime" placeholder="00/00/0000 00:00">
                            <label for="viewEndTime">Término</label>
                        </div>
                    </div>
                </div>
                <div class="mb-3" style="margin: 0 auto">
                    <label for="colorTask">Adicione a cor desejada:</label>
                    <input id="colorTask" type="color" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                </div>
                <div class="form-floating mb-3">
                    <textarea class="form-control" id="floatingTextarea" style="min-height: 90px; max-height: 100px;"></textarea>
                    <label for="floatingTextarea">Descrição</label>
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" id="registerNewTask">Registrar nova tarefa</button>
            </div>
          </div>
        </div>
      </div>
    `)
    modal.on('hide.bs.modal', function () {
      $("#registerTask").remove()
    })
  }
  if (modalType === 'viewTask') {
    modal = $('Body').append(`
        <div class="modal fade" id="viewTask" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="viewTitle"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <div class="row g-2">
                      <div class="col-md">
                          <div class="form-floating">
                              <input type="text" class="form-control readonly-input" id="viewStartTime" placeholder="00/00/0000 00:00" readonly>
                              <label for="viewStartTime">Início:</label>
                          </div>
                          </div>
                          <div class="col-md">
                          <div class="form-floating">
                          <input type="text" class="form-control readonly-input" id="viewEndTime" placeholder="00/00/0000 00:00" readonly>
                          <label for="viewEndTime">Término</label>
                          </div>
                          </div>
                          <div class="form-floating mb-3">
                          <textarea class="form-control form-control readonly-input" placeholder="Leave a comment here" id="floatingTextarea" style="min-height: 90px; max-height: 90px;" readonly></textarea>
                          <label for="floatingTextarea">Descrição</label>
                          </div>
                          </div>
                          </div>
                          <div class="modal-footer">
                          <button type="button" class="btn btn-primary" disabled="true" id="alterTask">Salvar Mudanças</button>
                          <button type="button" class="btn btn-secondary" id="deleteTask">Excluir</button>
                          </div>
                          </div>
                          </div>
                          </div>
                          `)
    modal.on('hide.bs.modal', function () {
      $("#viewTask").remove()
    })
  }
}

async function returnTaskList() {
  const response = await fetch('http://localhost:5000/api/tasks')

  const data = await response.json()
  
  let taskList =[]

  await data.tasks.map((element)=>{
    taskList.push(element)
  })

  return taskList

};

const viewType = () => {
  if ($(window).width() <= 574) {
    return 'timeGridDay';
  } else if ($(window).width() <= 767) {
    return 'timeGridWeek';
  } else {
    return 'dayGridMonth';
  }
};

const toolbarType=()=>{
  if ($(window).width() <= 574) {
    return {
      left: "title",
      center: "",
      right: "prev, next"
    };
  } else if ($(window).width() <= 767) {
    return {
      left: "title",
      center: "",
      right: "prev, next today"
    };
  } else {
    return {
      left: "prev,next today",
      center: "title",
      right: "timeGridDay,timeGridWeek,dayGridMonth"
    };
  }
};

const contentNumber = ()=>{
  if ($(window).width() <= 767) {
    return 'auto';
  }else{
    return 1000;
  }
};

document.addEventListener('DOMContentLoaded', async function () {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: viewType(),
    headerToolbar: toolbarType(),
    locale: 'pt-br',
    timeZone: 'local',
    editable: true,
    contentHeight: contentNumber(),
    windowResize: function () {
      if ($(window).width() <= 574) {
        calendar.changeView('timeGridDay');
        calendar.setOption('contentHeight', 'auto')
        calendar.setOption('headerToolbar', {
            left: "title",
            center: "",
            right: "prev, next"
          }
        );
        $('.fc-toolbar-title').css('font-size', "1.25em")
        $('#calendar').css('margin-bottom', '1%')
      } else if ($(window).width() <= 767) {
        calendar.changeView('timeGridWeek');
        calendar.setOption('headerToolbar', {
            left: "title",
            center: "",
            right: "prev, next today"
          }
        )
        calendar.setOption('contentHeight', 'auto')

      }else if($(window).width() <= 334){
        $('.fc-toolbar-title').css('font-size', "1em")

      } else {
        calendar.changeView('dayGridMonth');
        calendar.setOption('headerToolbar', {
            left: "prev,next today",
            center: "title",
            right: "timeGridDay,timeGridWeek,dayGridMonth"
          }
        )
        calendar.setOption('contentHeight', 1000)
      }
    },
    eventResize: (info) => {
      const start = info.event.start.toLocaleString().split(',')
      const end = info.event.end.toLocaleString().split(',')
      $.ajax({
        url: 'http://localhost:5000/api/tasks',
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({
          id: info.event._def.publicId,
          start: start[0] + '' + start[1],
          end: end[0] + '' + end[1],
          description: info.event._def.extendedProps.description
        }),
      }).done(function () {
        console.log("evento alterado - RESIZE")
      }).fail(function () {
        let msg = 'Erro ao fazer a requisição, analise as datas'
        alert(msg)
        console.error(msg)
      })
    },
    eventDrop: (info) => {
      const start = info.event.start.toLocaleString().split(',')
      const end = info.event.end.toLocaleString().split(',')
      $.ajax({
        url: 'http://localhost:5000/api/tasks',
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({
          id: info.event._def.publicId,
          start: start[0] + '' + start[1],
          end: end[0] + '' + end[1],
          description: info.event._def.extendedProps.description
        }),
      }).done(function () {
        console.log("evento alterado - DROP")
      }).fail(function () {
        let msg = 'Erro ao fazer a requisição, analise as datas'
        alert(msg)
        console.error(msg)
      })
    },
    selectable: true,
    select: (info) => {
      createModal("registerTask")
      const titleNewTask = $('#registerTask #titleTask')

      const startNewTask = $('#registerTask #startTime')
      startNewTask.mask("99/99/9999 99:99:99", {
        placeholder: "dd/mm/yyyy HH:MM:SS"
      })
      const start = info.start.toLocaleString().split(',')
      startNewTask.val(start[0] + '' + start[1])

      const endNewTask = $('#registerTask #endTime')
      endNewTask.mask("99/99/9999 99:99:99", {
        placeholder: "dd/mm/yyyy HH:MM:SS"
      })
      const end = info.end.toLocaleString().split(',')
      endNewTask.val(end[0] + '' + end[1])

      const colorNewTask = $('#registerTask #colorTask')
      const descriptionNewTask = $('#registerTask #floatingTextarea')

      $('#registerTask #registerNewTask').on('click', () => {
        $.ajax({
          url: 'http://localhost:5000/api/tasks',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({
            title: titleNewTask.val(),
            start: startNewTask.val(),
            end: endNewTask.val(),
            color: colorNewTask.val(),
            description: descriptionNewTask.val()
          }),
        }).done(function () {
          $('#registerTask').modal('hide')
          location.reload()
        }).fail(function (data) {
          let msg = 'Erro na requisição, verifique as datas'
          alert(msg)
          console.error(msg)
        })
      })

      $('#registerTask').modal('show')
    },
    nowIndicator: true,
    buttonText: { today: "Hoje", month: "Mês", week: "Semana", day: "Dia" },
    dayMaxEvents: true,
    eventTimeFormat: { hour: "2-digit", minute: "2-digit", meridiem: true },
    eventClick: (info) => {
      createModal("viewTask")

      const viewTitle = $('#viewTask #viewTitle')
      const viewStart = $('#viewTask #viewStartTime')
      const viewEnd = $('#viewTask #viewEndTime')
      const viewDescription = $('#viewTask #floatingTextarea')

      viewTitle.text(info.event.title)

      const start = info.event.start.toLocaleString().split(',')
      const end = info.event.end.toLocaleString().split(',')
      viewStart.mask("99/99/9999 99:99:99", {
        placeholder: "dd/mm/yyyy HH:MM:SS"
      })
      viewEnd.mask("99/99/9999 99:99:99", {
        placeholder: "dd/mm/yyyy HH:MM:SS"
      })

      if (info.event._def.allDay == true) {
        viewStart.val(start[0] + ' 00:00:00')
        viewEnd.val(end[0] + ' 00:00:00')
      } else {
        viewStart.val(start[0] + '' + start[1])
        viewEnd.val(end[0] + '' + end[1])
      }


      viewDescription.val(info.event._def.extendedProps.description)
      console.log(info.event)

      $('.readonly-input').on('click', () => {
        $('.readonly-input').removeAttr('readonly')
        $('#alterTask').attr('disabled', false)
      })

      $('#viewTask #deleteTask').on('click', () => {
        $.ajax({
          url: 'http://localhost:5000/api/tasks',
          type: 'DELETE',
          contentType: 'application/json',
          data: JSON.stringify({
            id: info.event._def.publicId
          }),
        }).done(function () {
          $('#viewTask').modal('hide')
          location.reload()
        }).fail(function () {
          let msg = 'Erro ao fazer a requisição'
          alert(msg)
          console.error(msg)
        })
      })

      $('#viewTask #alterTask').on('click', () => {
        $.ajax({
          url: 'http://localhost:5000/api/tasks',
          type: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify({
            id: info.event._def.publicId,
            start: viewStart.val(),
            end: viewEnd.val(),
            description: viewDescription.val()
          }),
        }).done(function () {
          $('#viewTask').modal('hide')
          location.reload()
        }).fail(function () {
          let msg = 'Erro ao fazer a requisição, analise as datas'
          alert(msg)
          console.error(msg)
        })
      })

      $('#viewTask').modal('show')
    },
    events: returnTaskList,
  });
  calendar.render();

});
