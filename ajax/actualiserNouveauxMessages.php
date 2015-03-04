<?php
session_start();
if(isset($_SESSION['id'])){
	$id_etudiant=$_SESSION['id'];
    require('../autoload.php');
        
	$temps=time();
	Db::query("UPDATE en_ligne SET temps='$temps' WHERE id_etudiant='$id_etudiant'");

    $html = '';
    
    $dons = Db::queryObject('SELECT big_chat.contenu contenu, big_chat.time time, compte_etudiant.pseudo pseudo FROM big_chat, compte_etudiant 
			    WHERE big_chat.id_etudiant = compte_etudiant.id 
			    AND big_chat.salon = '.getSalon().' ORDER BY big_chat.id DESC
			    LIMIT 100');
    $tabFin = array();
    inverserTableau($dons, $tabFin);
    foreach($tabFin as $don){
        $html.='<p';
	if($don->pseudo == $_SESSION['username'])
		$html.= ' style="color:blue;"';
	$html.= ' title="'.date('d/m/Y', $don->time).' à '.date('H:i:s', $don->time).'"><b>'.$don->pseudo.'</b> : '.$don->contenu;
	$html .= '</p>';
    }
    
    echo $html;
    sleep(0.5);
}

function inverserTableau($tab, &$tabFin){
	$i = 0;
	foreach($tab as $d)
		++$i;
	--$i;
	for($y = $i; $y>=0; --$y)
		$tabFin[] = $tab[$y];	
}
?>
