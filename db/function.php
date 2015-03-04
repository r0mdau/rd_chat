<?php
    function getSalon(){
        if(isset($_GET['salon']) && $_GET['salon'] > 0 && $_GET['salon'] <= _SALON_){
            return $_GET['salon'];
        }else return 1;
    }
    
    function initialisationBDD(){
        $r = Db::querySingle('SELECT id FROM compte_etudiant WHERE id='.$_SESSION['id']);
        if(!isset($r->id)){
            Db::query('INSERT INTO compte_etudiant (id, pseudo) VALUES ('.$_SESSION['id'].', \''.$_SESSION['username'].'\')');
            Db::query('INSERT INTO en_ligne (id_etudiant) VALUES ('.$_SESSION['id'].')');
            Db::query('INSERT INTO preferences (id_etudiant) VALUES ('.$_SESSION['id'].')');
        }
        
        $rep = Db::querySingle('SELECT id_etudiant FROM preferences WHERE id_etudiant='.$_SESSION['id']);
        if(!isset($rep->id_etudiant)){
            Db::query('INSERT INTO en_ligne (id_etudiant) VALUES ('.$_SESSION['id'].')');
            Db::query('INSERT INTO preferences (id_etudiant) VALUES ('.$_SESSION['id'].')');
        }
        
        $salon = getSalon();
        Db::query('UPDATE en_ligne SET salon='.$salon.' WHERE id_etudiant='.$_SESSION['id']);
        
        //Db::query('UPDATE compte_etudiant SET id_chat = (SELECT id FROM big_chat ORDER BY id DESC LIMIT 1) WHERE id='.$_SESSION['id']);
    }
    
    function getPrefNotif($id){
        $r = Db::querySingle('SELECT notif FROM preferences WHERE id_etudiant='.$id);
        return isset($r->notif) ? $r->notif : 1;
    }
    
    function getPrefPeople($id){
        $r = Db::querySingle('SELECT people FROM preferences WHERE id_etudiant='.$id);
        return isset($r->people) ? $r->people : 0;
    }
    
    function getPrefScroll($id){
        $r = Db::querySingle('SELECT scroll FROM preferences WHERE id_etudiant='.$id);
        return isset($r->scroll) ? $r->scroll : 1;
    }
    
    function getPrefPause($id){
        $r = Db::querySingle('SELECT pause FROM preferences WHERE id_etudiant='.$id);
        return isset($r->pause) ? $r->pause : 0;
    }
    
    function getGoodName($mail){
        $toto = explode('@', $mail);
        $mail = $toto[0];
        $mail = str_replace('.', '-', $mail);
        return $mail;
    }
    
    function getIdByPseudo($pseudo){
        $rep = Db::querySingle('SELECT id FROM compte_etudiant WHERE pseudo = \''.$pseudo.'\'');
        return $rep->id;
    }
    
    function creerCompte($pseudo){
        if(Db::query('INSERT INTO compte_etudiant (pseudo) VALUES (\''.$pseudo.'\')')){
            $id = Db::querySingle('SELECT id FROM compte_etudiant WHERE pseudo=\''.$pseudo .'\'');
	    if(isset($id->id)){
                $_SESSION['id'] = $id->id;
                return true;
            }else
                return false;
        }
    }
