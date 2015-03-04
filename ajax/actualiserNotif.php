<?php
session_start();
if(isset($_SESSION['id'])){
    require('../autoload.php');
    $_POST = Secu::secuEntreeBDD($_POST);
    $id_etudiant=$_POST['id_etudiant'];
    
    $rep = Db::querySingle('SELECT id_chat FROM compte_etudiant WHERE id='.$id_etudiant);
    $id_chat = (int)$rep->id_chat;
    
    $reponse = Db::querySingle('SELECT id FROM big_chat ORDER BY id DESC');
    $id_final_chat = (int)$reponse->id;
    
    $var = Db::queryObject('SELECT count(1) nb FROM big_chat b, compte_etudiant c
                           WHERE c.id < b.id
                           AND c.id = '.$_SESSION['id'].' 
                           GROUP BY salon');
    $notif = '';
    foreach($var as $f){
        $notif .= $f->nb.',';
    }
    echo $notif;
    sleep(0.5);
}
?>
