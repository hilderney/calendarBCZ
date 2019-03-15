$(document).ready(function () {

    ObterCalendario();

});

function ObterCalendario() {
    $.ajax({
        url: '/Student/ObterCalendario',
        type: 'GET',
        dataType: 'json',
        data: {},
        success: function (data) {
            buildCalendar(data);
        },
        error: function (e) {
            debugger;
        }
    });
}

function ObterCalendarioMesAno(m, y) {
    $.ajax({
        url: '/Student/ObterCalendarioMesAno',
        type: 'POST',
        dataType: 'json',
        data: {
            mes: m
            , ano: y
        },
        success: function (data) {
            buildCalendar(data);
        },
        error: function (e) {
            debugger;
        }
    });
}

function ObterEventosDoDia(date) {
    $.ajax({
        url: '/Student/ObterEventosDoDia',
        type: 'POST',
        dataType: 'json',
        data: {
            data: date
        },
        success: function (data) {
            buildCalendarList(data);
        },
        error: function (e) {
            debugger;
        }
    });
}

function buildCalendar(d) {
    var calendar = $('#student-calendar');
    calendar.html('');

    // CRIAR CONTROLES
    var ctrl = $('<div class=" row bcz-controller">');
    var colBS = $('<div class="col-12 col-sm-12 col-md-12 col-lg-12">');
    var btnGroup = $('<div class="btn-group btn-group-full-fix" role="group" aria-label="Button group with nested dropdown">');

    var btnL = $('<button id="btnCalendarMoveLeft" class="btn btn-primary" type="button">');
    var iconL = $('<i class="fa fa-chevron-left" aria-hidden="true"> </i>');
    btnL.append(iconL);
    btnGroup.append(btnL);
    
    var btnC = $('<button id="btnCalendarToggle" class="btn btn-primary" data-m="' + d.mes.mesDoAno + '" data-y="' + d.ano + '"  type="button">');
    var itemC = $('<span> ' + d.mes.nome + '/' + d.ano + ' </span>');
    btnC.append(itemC);
    btnGroup.append(btnC);

    var btnR = $('<button id="btnCalendarMoveRight" class="btn btn-primary" type="button">');
    var iconR = $('<i class="fa fa-chevron-right" aria-hidden="true"> </i>');
    btnR.append(iconR);
    btnGroup.append(btnR);

    colBS.append(btnGroup);
    ctrl.append(colBS);

    calendar.append(ctrl);

    // CRIAR CONTEUDO DO CALENDAR
    var days = $('<div id="bcz-calendar-days" class="bcz-wrapper">');
    var header = $('<div class="bcz-heading"> <div class="bcz-col bcz-0wc bcz-c1"> <div class="bcz-day-header"> <span> DOM </span> </div> </div> <div class="bcz-col bcz-0wc bcz-c2"> <div class="bcz-day-header"> <span> SEG </span> </div> </div> <div class="bcz-col bcz-0wc bcz-c3"> <div class="bcz-day-header"> <span> TER </span> </div> </div> <div class="bcz-col bcz-0wc bcz-c4"> <div class="bcz-day-header"> <span> QUA </span> </div> </div> <div class="bcz-col bcz-0wc bcz-c5"> <div class="bcz-day-header"> <span> QUI </span> </div> </div> <div class="bcz-col bcz-0wc bcz-c6"> <div class="bcz-day-header"> <span> SEX </span> </div> </div> <div class="bcz-col bcz-0wc bcz-c7"> <div class="bcz-day-header"> <span> SAB </span> </div> </div> </div>');

    days.append(header);

    var firstWeek = $('<div class="bcz-first-week">');
    for (let i = 0; i < 7; i++) {
        var day = buildDay(d, i);
        firstWeek.append(day);
    }
    days.append(firstWeek);

    var secondWeek = $('<div class="bcz-second-week">');
    for (let i = 7; i < 14; i++) {
        var day = buildDay(d, i);
        secondWeek.append(day);
    }
    days.append(secondWeek);

    var thirdWeek = $('<div class="bcz-second-week">');
    for (let i = 14; i < 21; i++) {
        var day = buildDay(d, i);
        thirdWeek.append(day);
    }
    days.append(thirdWeek);

    var fourthWeek = $('<div class="bcz-second-week">');
    for (let i = 21; i < 28; i++) {
        var day = buildDay(d, i);
        fourthWeek.append(day);
    }
    days.append(fourthWeek);

    if (d.dias.length > 27) {
        var fifthWeek = $('<div class="bcz-second-week">');
        for (let i = 28; i < 35; i++) {
            var day = buildDay(d, i);
            fifthWeek.append(day);
        }
        days.append(fifthWeek);
    }

    if (d.dias.length > 35) {
        var sixthWeek = $('<div class="bcz-second-week">');
        for (let i = 35; i < 42; i++) {
            var day = buildDay(d, i);
            sixthWeek.append(day);
        }
        days.append(sixthWeek);
    }

    calendar.append(days);

    var calendarFooter = $('<div class="bcz-footer"> <div class="col-12 col-sm-12 col-md-12 col-lg-12"> ' + + ' </div> </div>')

    calendar.append(calendarFooter);

    createCalendarEventListener();
}

function buildDay(d, i) {
    var dayHeader = null;
    var notClass = '';
    var eventAlert = '';
    var todClass = '';
    if (d.dias[i] != null) {
        dayHeader = '<span> ' + d.dias[i].diaDoMes.toString() + ' </span>';
        d.dias[i].hoje ? todClass = 'today' : todClass = '';
        if (d.dias[i].quantidadeEventos != 0) {
            eventAlert = ' <span class="bcz-day-alert"> ' + d.dias[i].quantidadeEventos + ' </span> ';
            notClass = 'notification';
        } else
            eventAlert = '';
    } else {
        dayHeader = '&nbsp'
    }
    return $('<div class="btn-bcz-day bcz-col bcz-2wc bcz-c' + i + ' ' + todClass + ' ' + notClass + '"> <div class="bcz-day-header"> ' + dayHeader + eventAlert + ' </div> </div>');
}

function buildCalendarList(d) {
    console.log(d);
    // debugger;
    alert('montar a lista ');
}

function createCalendarEventListener() {

    $('#btnCalendarToggle').on('click', function() {
        console.log('mes');
    });

    $('.btn-bcz-day').on('click', function(e) {
        var hasEvents = false;
        $($(e.currentTarget).find('span')[1]).html() != undefined ? hasEvents = true : hasEvents = false;
        if (hasEvents) {
            console.log(e.currentTarget);
            var day = $($(e.currentTarget).find('span')[0]).html().trim();
            var month = $('#btnCalendarToggle').data().m;
            var year = $('#btnCalendarToggle').data().y;
            var dateEvents = day + '/' + month + '/' + year;
            ObterEventosDoDia(dateEvents);
        }
    });

    $('#btnCalendarMoveLeft').on('click', function() {
        console.log('left');
        var month = $('#btnCalendarToggle').data().m - 1;
        var year = $('#btnCalendarToggle').data().y;
        if (month <= 0) {
            month = 12;
            year--;
        }
        ObterCalendarioMesAno(month, year);
    });

    $('#btnCalendarMoveRight').on('click', function() {
        console.log('right');
        console.log('left');
        var month = $('#btnCalendarToggle').data().m + 1;
        var year = $('#btnCalendarToggle').data().y;
        if (month >= 13) {
            month = 1;
            year++;
        }
        ObterCalendarioMesAno(month, year);
    });
    
}