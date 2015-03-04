function creationXHR()
{
    var resultat = null;
    try { //tous navigateurs
        resultat = new XMLHttpRequest();
    }
    catch (Error){
        try{//Internet Explorer > 5.0
            resultat = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (Error){
            try{ //Internet Explorer 5.0
                resultat = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(Error){
                resultat = null;
            }
        }
    }
    return resultat;
}