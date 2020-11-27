<?php include('header.php') ?>
<?php include('data.php')?>
<?php include('template.php')?>

<div id="calender" data-year="<?= date('Y')?>" data-month="<?= date('m')?>">
    <div id="wrap">
        <div class="banner">
            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/428efd73960257.5c1b5ab4ee4e7.jpg" alt="">
        </div>
        <div class="content">
            <div class="container">
                <div id="header">
                    <?= date('Y')?>_<?= date('m')?>
                    <a href="#"><i class="far fa-edit"></i></a>
                </div>
                <div id="days">
                    <div class="day">SUN</div>
                    <div class="day">MON</div>
                    <div class="day">TUE</div>
                    <div class="day">WEN</div>
                    <div class="day">THR</div>
                    <div class="day">FRI</div>
                    <div class="day">SAT</div>
                </div>
                <div id="dates">
                    <?php foreach ($dates as $key => $date):?>
                        <div class="date-block <?=(is_null($date))? 'empty' : ''?>" data-date="<?=$date?>" >
                            <div class="date"><?=$date?></div>
                            <div class="events">
                                <!-- <div class="event" data-id="" data-from="10:00">
                                    <div class="title">title</div>
                                    <div class="from">10:00</div>
                                </div> -->
                            </div>
                        </div>
                    <?php endforeach ?>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="info-panel" class="update">
    <form>
        <div class="title">
            <div class="close">x</div>
            <label>event</label>
            <input type="text" name="title">
        </div>
        <div class="error-msg">
            <div class="alert alert-danger">error</div>
        </div>
        <div class="time-picker">
            <div class="selected-date">
                <span class="month"></span> /<span class="date"></span>
                <input type="hidden" name="year">
                <input type="hidden" name="month">
                <input type="hidden" name="date">
            </div>
            <div class="from">
                <label for="from">from</label>
                <input id="from" type="time" name="start_time">
            </div>
            <div class="to">
                <label for="to">to</label>
                <input id="to" type="time" name="end_time">
            </div>
        </div>
        <div class="description">
            <label>description</label></br>
            <textarea name="description" id="description" cols="20" rows="2"></textarea>
            <!-- <div id="description" contenteditable="true"></div> -->
        </div>
    </form>
    
    
    <div class="buttons">
        <button class="create">create</button>
        <button class="update">update</button>
        <button class="cancel">cancel</button>
        <button class="delete">delete</button>
    </div>
</div>
    
<?php include('footer.php') ?>

