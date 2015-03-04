<?php
    session_start();
    if(isset($_SESSION['id'])){
        if(isset($_POST['message']) AND isset($_POST['salon'])){
            require('../autoload.php');
	    $_POST = Secu::secuEntreeBDD($_POST);
	    $message = $_POST['message'];
	    if(!in_array($_SESSION['username'], array('rdauby', 'tlorenzato')))
		$message = htmlspecialchars($message);
	    
            $taille=strlen($message);
	    $msgTest = '';
            for($i=0; $i<$taille; $i++) $msgTest.=" ";
	    $message = substr($message, 0, 250);	    	    
	    
	    $search = array(' ', '\_');
	    $replace = array('  &nbsp;', '_');
            if($message != $msgTest AND !empty($message)){
		$message = sautDeLignes($message);
		$message = str_replace($search, $replace, $message);
		$message = setLink($message);
		$message = str_replace('  ', '', $message);		
		Db::query('INSERT INTO big_chat (contenu, date, id_etudiant, salon, time) VALUES(\''.$message.'\', NOW(), '.$_SESSION['id'].', '.$_POST['salon'].', '.time().')');
            }
        }
	sleep(0.5);
    }
    
    function setLink($m){
	$final = '';
	if(preg_match_all("|([^\{]*)\{([^\}]+)\}([^\{]*)|i", $m, $tablo, PREG_SET_ORDER)){
            foreach($tablo as $cle){
                $final.=$cle[1];
                $final.='<a href="'.$cle[2].'" target="_blank">'.$cle[2].'</a>';
                $final.=$cle[3];
            }
        }else $final = $m;
	return $final;
    }
    
    function sautDeLignes($m){
	return strlen($m) > 200 ? substr($m, 0, 100).'<br>'.substr($m, 100, 200).'<br>'.substr($m, 200, strlen($m)) : (strlen($m) > 100 && strlen($m) < 200 ? substr($m, 0, 100).'<br>'.substr($m, 100, strlen($m)) : $m );
    }
?>
