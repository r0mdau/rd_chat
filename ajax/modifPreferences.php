<?php
    session_start();
    if(isset($_SESSION['id']) AND isset($_POST['notif']) AND isset($_POST['people']) AND isset($_POST['scroll']) AND isset($_POST['people'])){
        require('../autoload.php');
        $_POST = Secu::secuEntreeBDD($_POST);
        foreach($_POST as $t => $k){
            if($k < 0 OR $k > 1)
                $_POST[$t] = 0;
        }
        Db::query('UPDATE preferences SET notif='.$_POST['notif'].', people='.$_POST['people'].', scroll='.$_POST['scroll'].', pause='.$_POST['pause'].' WHERE id_etudiant='.$_SESSION['id']);
	sleep(0.5);
    }
?>
