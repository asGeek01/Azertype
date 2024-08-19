/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement du jeu. 
 * 
*********************************************************************************/

/**
 * Cette fonction affiche dans la console le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nombrePropositions : le nombre de mots/phrases proposés à l'utilisateur
*/
function afficherResultat(score, nombrePropositions) {
    let zoneScore = document.querySelector(".zoneScore span")

    let affichageScore = `${score} / ${nombrePropositions}`
    
    zoneScore.innerText = affichageScore
}

/**
 * Cette fonction demande à l'utilisateur de choisir entre "mots" et "phrases" et retourne le choix de l'utilisateur
 * @return {string} : le choix de l'utilisateur, ce choix est nécessairement "mots" ou "phrases
*/
/*
function choisirPhrasesOuMots() {
    // transcrire en condition de while, on fait !condition
    let choix = "Voulez vous la liste des mots ou la liste des phrases ?? \nmots || phrases"
    while (choix !== "mots" && choix !== "phrases"){
        choix = prompt("Vous devez choisir entre 'mots' et 'phrases'")
    }
    return choix
}*/

/**
 * Cette fonction lance la boucle de jeu, c'est à dire qu'elle demande à l'utilisateur de saisir tous les mots
 * contenus dans le tableau listePropositions. A chaque mot saisi, on incrémente le score de l'utilisateur
 * 
 * @param {array[string]} : listePropositions 
 * @return {number} : le score de l'utilisateur
*/
/*
function lancerBoucleDeJeu (listePropositions) {
    let score = 0
    listePropositions.forEach(element => {
        let donneeSaisie = prompt('Entrez le mot : ' + element)
        if (donneeSaisie === element) score++ // Si la donnee saisi par l'utilisateur est correcte, on incrémente le score
    });
    return score
}*/

/**
 * Cette fonction prends en parametre ${motAfficher}
 * et affiche le mot dans la div de zoneProposition
*/

function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition
}


/**
 * Cette fonction construit et affiche l'email. 
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score. 
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score AzerType&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'AzerType !`
    location.href = mailto
}

/**
 * Cette fonction lance le jeu. 
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
*/
function lancerJeu() {
    // initialisation
    initAddEventListenerPopup()
    let score = 0
    let i = 0
    let listePropositions = listeMots

     
    let btnValiderEcriture = document.getElementById("btnValiderEcriture")
    let inputEcriture = document.getElementById("inputEcriture")
    afficherProposition(listePropositions[i])

    btnValiderEcriture.addEventListener("click", () => {
        console.log(inputEcriture.value);
        
        if (inputEcriture.value === listePropositions[i]) {
            score++
        }
        i++

        afficherResultat(score, i)
         
        inputEcriture.value = ""
        if (listePropositions[i] === undefined) {
            afficherProposition("Le jeu est fini")
            btnValiderEcriture.disabled = true

        } else {
            afficherProposition(listePropositions[i])
        }  
    })

    let boutonsRadio = document.querySelectorAll('input[name="optionSource"]')
    boutonsRadio.forEach(boutonActuel => {
        boutonActuel.addEventListener("change", (event) => {
            console.log(event.target.value);

            if (event.target.value === "1") {
                listePropositions = listeMots
            } else {
                listePropositions = listePhrases
            }

            afficherProposition(listePropositions[i])
        })
    });


    // Ajout d'un ecouteur d'evenement sur le formulaire de partage de score
    let form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        // on empêche le comportement par defaut
        event.preventDefault()

        const baliseNom = document.getElementById("nom")
        const nom = baliseNom.value

        const baliseEmail = document.getElementById("email")
        const email = baliseEmail.value

        let scoreEmail = `${score} / ${i}`

        if (nom === "") {
            console.log("Le champs de nom est vide");
        } else {
            console.log("Le champs de nom est non vide");
            afficherEmail(nom, email, scoreEmail)
        }
        
        

        
        console.log(nom, email);


    })
let baliseNom = document.getElementById("nom")
baliseNom.addEventListener("change", (event) => {
            const valeurNom = event.target.value;
            if (valeurNom === "") {
                console.log('Le champ nom est vide');
            } else {
                console.log('Le champ nom est rempli');
            }
        })



    afficherResultat(score, i)

    
}