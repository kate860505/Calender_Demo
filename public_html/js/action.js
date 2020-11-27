$(document).ready(function (e) {
    var source = $('#event-template').html();
    var eventTemplate= Handlebars.compile(source);
    $.each(events, function (index, event) { 
        var eventUI=eventTemplate(event);
        var date=event['date'];
        $('#calender').find('.date-block[data-date="'+date+'"]').find('.events').append(eventUI);
    });
    
    var panel={
        el:'#info-panel',
        selectedDateBlock:null,
        selectedEvent:null,
        init:function(isNew,e){
            panel.clear();

            panel.updateDate(e);

            if(isNew){
                $(panel.el).addClass('new').removeClass('update');
                panel.selectedDateBlock=$(e.currentTarget);
            }else{
                $(panel.el).addClass('update').removeClass('new');
                panel.selectedDateBlock=$(e.currentTarget).closest('.date-block');
            }
        },
        clear:function(){
            $(panel.el).find('input').val('');
            $(panel.el).find('textarea').val('');
        },
        open:function(isNew,e){
            panel.init(isNew,e);
            panel.hideError();
            $(panel.el).addClass('open').css({
                top: e.pageY +'px',
                left: e.pageX +'px',
            })
            .find('.title input').focus();
            // .find('.title [contenteditable]').focus();
        },
        close:function(e){
            $(panel.el).removeClass('open');
        },
        updateDate:function(e){
            //get date from date-block
            if($(e.currentTarget).is('.date-block')){
                var date=$(e.currentTarget).data('date');
            }else{
                var date=$(e.currentTarget).closest('.date-block').data('date');
            }
            //get year from #calender
            var year = $('#calender').data('year');
            var month = $('#calender').data('month');
            
            $(panel.el).find('.month').text(month);
            $(panel.el).find('.date').text(date);
            $(panel.el).find('[name="year"]').val(year);
            $(panel.el).find('[name="month"]').val(month);
            $(panel.el).find('[name="date"]').val(date);
        },
        showError:function(msg){
            $(panel.el).find('.error-msg').addClass('open').find('.alert').text(msg);
        },
        hideError:function(){
            $(panel.el).find('.error-msg').removeClass('open');
        }
    };

    $('.date-block').dblclick(function (e) { 
       panel.open(true,e);//if is new //+new class
    }).on('dblclick','.event', function (e) {
        e.stopPropagation();
        panel.open(false,e);//open panel //change update version

        panel.selectedEvent=$(e.currentTarget);
        var id=$(this).data('id');
        // todo
        //ajax call - get event detail
        //load detail back to panel
    });
    //else
        //+new class
    $(panel.el)
    .on('click','button',function (e) {
        if($(this).is('.create')){
            //搜集資料
            var data=$(panel.el).find('form').serialize();
            //ajax call-create api
            $.post("event/create.php", data).done(function (data, textStatus, jqXHR) {
                //插入資料
                var eventUI=eventTemplate(data);
                //todo:要排時間順序
                //eacho loop
                //比較大小
                //比較晚插入在前面結束
                //如果都沒有找到比我晚的，自己放在最後
                panel.selectedDateBlock.find('.event').each(function(index,event){
                    var eventFromTime=$(event).data('from').split(':');
                    var neweventFromTime=data.start_time.split(':');
                    if(eventFromTime[0]>neweventFromTime[0] || 
                        (eventFromTime[0]==neweventFromTime[0] && eventFromTime[1]>neweventFromTime[1])){
                        $(event).before(eventUI);
                        return false;
                    }
                });
                if(panel.selectedDateBlock.find('.event[data-id="'+data.id+'"]').length==0)
                panel.selectedDateBlock.find('.events').append(eventUI);
                panel.close();
            }).fail(function(jqXHR, textStatus,errorThrown){
                panel.showError(jqXHR.responseText);
            }); 
        }
        if($(this).is('.update')){
            //collect formdata
            //ajax call-uddate.php with data
            //更新event塞回去

        }
        if($(this).is('.cancel')){
            panel.close();
        }
        if($(this).is('.delete')){
            //id
            var id=panel.selectedEvent.data('id');
            //ajax call
            //remove event from calender
            panel.selectedEvent.remove();
            panel.close();

        }
    })
    $('#info-panel').on('click','.close',function (e) {
        $('button.cancel').click();
    });;
});