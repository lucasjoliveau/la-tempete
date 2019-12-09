class Jeu {
    constructor() {
        this.heros = null;
        this.panneauInstructions = null;
        this.titreJeu = null;
        this.boutonJouer = null;
        this.boutonRejouer = null;
        this.boutonInstructions = null;
        this.plat = null;

        this.parametres = {
            canevas: "canvas",
            cadence: 30,
            manifeste: "ressources/manifest.json"
        };

        this.vitesseNiveau = 20;

        this.charger();
    }

    // Chargement du manifeste et installation du plugin sonore
    charger() {
        this.chargeur = new createjs.LoadQueue();
        this.chargeur.installPlugin(createjs.Sound);
        this.chargeur.addEventListener("complete", this.initialiser.bind(this));
        this.chargeur.addEventListener('error', this.abandonner.bind(this));
        this.chargeur.loadManifest(this.parametres.manifeste);
    }

    // Indication d'une erreur de chargement
    abandonner() {
        alert("Une erreur de chargement est survenue!");
    }

    // Initialisation du stage
    initialiser(e) {
        this.stage = new createjs.StageGL(this.parametres.canevas, {antialias: true});
        createjs.Ticker.addEventListener("tick", e => this.stage.update(e));

        createjs.Ticker.framerate = this.parametres.cadence;
        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
        console.log("Initialisé");
        this.demarrer();

        this.animationIntro();
    }

    // Animation lorsque le jeu démarre
    animationIntro() {
        // Ajout du rectangle pour l'animation
        this.arrierePlanIntro = new createjs.Bitmap(this.chargeur.getResult("arrierePlanIntro"));
        this.stage.addChild(this.arrierePlanIntro);

        // Ajout et positionnement du titre
        this.titreJeu = new createjs.Bitmap(this.chargeur.getResult("titreJeu"));
        this.stage.addChild(this.titreJeu);
        this.titreJeu.x = this.stage.canvas.width / 2 - this.titreJeu.getBounds().width / 2;
        this.titreJeu.y = -413;

        // Animation pour le positionnement du titre
        createjs.Tween.get(this.titreJeu).to({y: this.stage.canvas.height / 8}, 500, createjs.Ease.sineInOut);

        // Ajout et positionnement de la vague 1
        this.vague_1 = new createjs.Bitmap(this.chargeur.getResult("vague_1"));
        this.stage.addChild(this.vague_1);
        this.vague_1.y = this.stage.canvas.height + this.vague_1.getBounds().height;

        // Animation pour le positionnement de la vague 1
        createjs.Tween.get(this.vague_1).to({y: this.stage.canvas.height - this.vague_1.getBounds().height}, 1000, createjs.Ease.sineInOut);

        // Ajout et positionnement de la vague 2
        this.vague_2 = new createjs.Bitmap(this.chargeur.getResult("vague_2"));
        this.stage.addChild(this.vague_2);
        this.vague_2.y = this.stage.canvas.height + this.vague_2.getBounds().height;

        // Animation pour le positionnement de la vague 2
        createjs.Tween.get(this.vague_2).to({y: this.stage.canvas.height - this.vague_2.getBounds().height}, 1500, createjs.Ease.sineInOut);

        // Ajout et positionnement de la vague 3
        this.vague_3 = new createjs.Bitmap(this.chargeur.getResult("vague_3"));
        this.stage.addChild(this.vague_3);
        this.vague_3.y = this.stage.canvas.height + this.vague_3.getBounds().height;

        // Animation pour le positionnement de la vague 3
        createjs.Tween.get(this.vague_3).to({y: this.stage.canvas.height - this.vague_3.getBounds().height}, 2000, createjs.Ease.sineInOut);

        // Effectue la fonction fléchée après un délai de 3 secondes
        setTimeout(() => {
            // Enlève le Bitmap de l'arrière plan de l'animation d'introduction
            createjs.Tween.get(this.arrierePlanIntro).to({alpha: 0}, 300).call(() => {
                this.stage.removeChild(this.arrierePlanIntro)
            });

            // Enlève le Bitmap de la vague 1 de l'animation d'introduction
            createjs.Tween.get(this.vague_1).to({alpha: 0}, 300).call(() => {
                this.stage.removeChild(this.vague_1)
            });


            // Enlève le Bitmap de la vague 2 de l'animation d'introduction
            createjs.Tween.get(this.vague_2).to({alpha: 0}, 300).call(() => {
                this.stage.removeChild(this.vague_2)
            });


            // Enlève le Bitmap de la vague 3 de l'animation d'introduction
            createjs.Tween.get(this.vague_3).to({alpha: 0}, 300).call(() => {
                this.stage.removeChild(this.vague_3)
            });
        }, 3000);
    }

    // Animation de fin
    animationOutro() {
        createjs.Sound.play("animationOutroSon"); // Jouer le son de l'animation d'outro
        this.arrierePlanOutro = new createjs.Bitmap(this.chargeur.getResult("arrierePlanIntro")); // Récupère l'arrière-plan pour l'animation
        this.stage.addChild(this.arrierePlanOutro); // Ajoute l'arrière-plan pour l'animation
        this.arrierePlanOutro.y = -2276;

        // Ajout et positionnement du titre
        this.titreJeu = new createjs.Bitmap(this.chargeur.getResult("titreJeu"));
        this.stage.addChild(this.titreJeu);
        this.titreJeu.x = this.stage.canvas.width / 2 - this.titreJeu.getBounds().width / 2;
        this.titreJeu.y = -413;

        // Animation pour le positionnement du titre
        createjs.Tween.get(this.titreJeu).to({y: this.stage.canvas.height / 2 - this.titreJeu.getBounds().height / 2}, 500, createjs.Ease.sineInOut);
        createjs.Tween.get(this.arrierePlanOutro).to({y: 0}, 500, createjs.Ease.sineInOut);

        // Exécution de la fonction anonyme après un délai de 1,5 secondes
        setTimeout(() => {
            // Animation pour le positionnement du titre
            createjs.Tween.get(this.titreJeu).to({y: -413}, 500, createjs.Ease.sineInOut);
            createjs.Tween.get(this.titreJeu).to({alpha: 0}, 300).call(() => {
                this.stage.removeChild(this.titreJeu)
            });

            // Animation pour le positionnement de l'arrière-plan
            createjs.Tween.get(this.arrierePlanOutro).to({y: -2276}, 500, createjs.Ease.sineInOut);
            createjs.Tween.get(this.arrierePlanOutro).to({alpha: 0}, 500).call(() => {
                this.stage.removeChild(this.arrierePlanOutro)
            });

        }, 1500);
    }

    // Contrôle pour l'ajout de points
    ajouterPoints() {
        this.pointage.text = parseInt(this.pointage.text) + 1; // Modifie le texte
        this.pointage.updateCache(); // Met à jour le cache
        createjs.Sound.play("sonPoint"); // Joue le son lorsqu'un plat est ramassé
    }

    // Ajout de l'interface et de la musique
    demarrer(e) {
        // Ajout du fond à la scène
        const fond = new createjs.Bitmap(this.chargeur.getResult("fond"));
        this.stage.addChild(fond);

        // Ajout du sol à la scène
        this.sol = new createjs.Bitmap(this.chargeur.getResult("sol"));
        this.sol.y = this.stage.canvas.height - this.sol.getBounds().height;
        this.stage.addChild(this.sol);

        // Ajout des nuages aléatoirement à la scène
        for (let i = 0; i < 2; i++) {

            // Indice permet de savoir à quel nuage se référer
            const indice = Math.floor(Math.random() * 2);
            const nuage = new createjs.Bitmap(this.chargeur.getResult("nuage" + indice));
            nuage.x = i * nuage.getBounds().width + Math.random() * 200;

            // Récupération des dimensions du nuage
            nuage.regY = nuage.getBounds().height;
            nuage.y = 300;
            this.stage.addChild(nuage);
        }

        // Ajout de la barre du niveau
        let barreNiveau = new createjs.Bitmap(this.chargeur.getResult("barreNiveau"));
        this.stage.addChild(barreNiveau);

        // Ajout du bouton d'instructions
        this.boutonInstructions = new createjs.Bitmap(this.chargeur.getResult("boutonInstructions"));
        this.stage.addChild(this.boutonInstructions);

        // Positionnement du bouton d'instructions
        this.boutonInstructions.x = this.stage.canvas.width / 2 - this.boutonInstructions.getBounds().width / 2; // Centre le bouton instructions horizontalement
        this.boutonInstructions.y = 700;

        this.boutonInstructions.addEventListener('click', this.panneauInstructionsJeu.bind(this));

        // Ajout du bouton jouer
        this.boutonJouer = new createjs.Bitmap(this.chargeur.getResult("boutonJouer"));
        this.stage.addChild(this.boutonJouer);
        // Positionnement du bouton jouer
        this.boutonJouer.x = this.stage.canvas.width / 2 - this.boutonJouer.getBounds().width / 2; // Centre le bouton jouer horizontalement
        this.boutonJouer.y = 600;

        this.boutonJouer.addEventListener('click', this.demarrerJeu.bind(this));

        // Ajout du bouton rejouer
        this.boutonRejouer = new createjs.Bitmap(this.chargeur.getResult("boutonRejouer"));
        //this.stage.addChild(this.boutonRejouer);
        // Positionnement du bouton jouer
        this.boutonRejouer.x = this.stage.canvas.width / 2 - this.boutonRejouer.getBounds().width / 2; // Centre le bouton rejouer horizontalement
        this.boutonRejouer.y = 700;


        this.ajouterHeros(); // Ajoute le héros au jeu

        // Ajout du texte pour le pointage des points
        this.pointage = new createjs.Text("0", "34px 'Comfortaa'", "#ffffff");
        this.pointage.cache(-5, -5, this.pointage.getBounds().width + 100, this.pointage.getBounds().height);
        this.pointage.x = 320;
        this.pointage.y = 20;
        this.stage.addChild(this.pointage);

        // Ajout du texte pour le niveau
        this.indicationNiveau = new createjs.Text("Niveau 1", "22px 'Comfortaa'", "#ffffff");
        this.indicationNiveau.cache(-5, -5, this.indicationNiveau.getBounds().width + 100, this.indicationNiveau.getBounds().height);
        this.indicationNiveau.x = 500;
        this.indicationNiveau.y = 26;
        this.stage.addChild(this.indicationNiveau);

        // Joue la musique
        this.musique = createjs.Sound.play("musique", {loop: -1, volume: 0});
        createjs.Tween.get(this.musique).to({volume: 0.2}, 1000); // Joue la musique graduellement

        // Récupère et positionne le message d'une victoire
        this.victoire = new createjs.Bitmap(this.chargeur.getResult("victoire"));
        this.victoire.x = this.stage.canvas.width / 2 - this.victoire.getBounds().width / 2;
        this.victoire.y = this.stage.canvas.height / 2 - this.victoire.getBounds().height / 2;


        // Récupère et positionne le message défaite
        this.defaite = new createjs.Bitmap(this.chargeur.getResult("defaite"));
        this.defaite.x = this.stage.canvas.width / 2 - this.defaite.getBounds().width / 2;
        this.defaite.y = this.stage.canvas.height / 2 - this.defaite.getBounds().height / 2;

        // Récupère et positionne le message du niveau 2
        this.messageNiveau2 = new createjs.Bitmap(this.chargeur.getResult("niveau2"));
        this.messageNiveau2.x = this.stage.canvas.width / 2 - this.messageNiveau2.getBounds().width / 2;
        this.messageNiveau2.y = this.stage.canvas.height / 2 - this.messageNiveau2.getBounds().height / 2;

        // Récupère et positionne le message du niveau 3
        this.messageNiveau3 = new createjs.Bitmap(this.chargeur.getResult("niveau3"));
        this.messageNiveau3.x = this.stage.canvas.width / 2 - this.messageNiveau3.getBounds().width / 2;
        this.messageNiveau3.y = this.stage.canvas.height / 2 - this.messageNiveau3.getBounds().height / 2;
    }

    // Ouvre le panneau d'instructions
    panneauInstructionsJeu(e) {
        // Récupération du panneau d'instructions du jeu
        this.panneauInstructions = new createjs.Bitmap(this.chargeur.getResult("panneauInstructions"));

        // Ajout du panneau d'instructions à la scène
        this.stage.addChild(this.panneauInstructions);

        this.panneauInstructions.addEventListener('click', () => {this.stage.removeChild(this.panneauInstructions); createjs.Sound.play("clicBouton");});
        createjs.Sound.play("clicBouton");
    }

    // Démarre le jeu
    demarrerJeu(e) {
        // Démarre le chronomètre pour le premier niveau
        this.chronometre = setTimeout(this.verifierNiveau.bind(this), 20000);
        createjs.Sound.play("clicBouton");

        // Ajout d'un plat chaque secondes
        this.idInterval = setInterval(this.ajouterPlat.bind(this), 1300);

        // Enlève le titre et les boutons du jeu
        createjs.Tween
            .get(this.titreJeu)
            .to({alpha: 0}, 500)
            .call(() => {
                this.stage.removeChild(this.titreJeu)
            }); // Réduit le canal alpha du message

        createjs.Tween
            .get(this.boutonJouer)
            .to({alpha: 0}, 500)
            .call(() => {
                this.stage.removeChild(this.boutonJouer)
            }); // Réduit le canal alpha du message

        createjs.Tween
            .get(this.boutonInstructions)
            .to({alpha: 0}, 500)
            .call(() => {
                this.stage.removeChild(this.boutonInstructions)
            }); // Réduit le canal alpha du message
    }

    // Ajoute les plats à la scène
    ajouterPlat() {
        // Ajoute un plat aléatoirement à la scène
        let index = Math.floor(Math.random() * (7 - 1)) + 1;

        this.plat = new Plat(this.heros, this.chargeur.getResult("plat_0" + index));
        this.plat.vitesse = this.vitesseNiveau;

        // Ajoute un plat
        this.stage.addChild(this.plat);
        this.plat.x = Math.random() * (this.stage.canvas.width - this.plat.getBounds().width);
    }

    // Ajoute le héros à la scène
    ajouterHeros() {
        setTimeout(() => {

            // Récupère et ajoute le héros à la scène
            this.heros = new Heros(this.chargeur.getResult("heros"));
            this.stage.addChild(this.heros);

            // Positionnement initial du héros
            this.heros.y = 875;
            this.heros.x = this.stage.canvas.width / 2;

            // Animation du héros
            this.heros.gotoAndStop("HerosMarcheDroite");
            this.heros.apparaitre();
        }, 3500);
    }

    // Vérifie le premier niveau
    verifierNiveau() {

        // Vérifie le nombre de points nécéssaire du premier niveau
        if (parseInt(this.pointage.text) >= 8) { // Le nombre représente le nombre de points à atteindre pour passer au prochain niveau
            this.niveauDeux();
        } else {
            // Si le niveau un n'est pas atteint, il joue l'animation d'outro et affiche le menu de la défaite
            this.animationOutro();
            this.afficherDefaite();
        }
    }

    // Configuration du niveau deux
    niveauDeux() {
        this.vitesseNiveau = 30; // Change la vitesse du niveau deux
        this.stage.addChild(this.messageNiveau2); // Ajoute le message pour indiquer le niveau deux

        createjs.Tween.get(this.messageNiveau2).to({alpha: 0}, 3000).call(() => {
            this.stage.removeChild(this.messageNiveau2)
        }); // Réduit le canal alpha du message
        this.indicationNiveau.text = "Niveau 2"; // Change le texte de la barre du niveau
        this.indicationNiveau.updateCache(); // Met à jour le cache du texte

        this.chronometre = setTimeout(this.verifierNiveauDeux.bind(this), 20000); // Redémarre le chronomètre de niveau
    }

    // Vérifie le deuxième niveau
    verifierNiveauDeux() {

        // Vérifie le nombre de points nécéssaire du deuxième niveau
        if (parseInt(this.pointage.text) >= 25) { // Le nombre représente le nombre de points à atteindre pour passer au prochain niveau
            this.niveauTrois();
        } else {
            // Si le niveau deux n'est pas atteint, il joue l'animation d'outro et affiche le menu de la défaite
            this.animationOutro();
            this.afficherDefaite();
        }
    }

    // Configuration du troisième niveau
    niveauTrois() {
        this.vitesseNiveau = 40; // Change la vitesse du niveau deux
        this.stage.addChild(this.messageNiveau3); // Ajoute le message pour indiquer le niveau deux

        createjs.Tween.get(this.messageNiveau3).to({alpha: 0}, 3000).call(() => {
            this.stage.removeChild(this.messageNiveau3)
        }); // Réduit le canal alpha du message
        this.indicationNiveau.text = "Niveau 3"; // Change le texte de la barre du niveau
        this.indicationNiveau.updateCache(); // Met à jour le cache du texte

        this.chronometre = setTimeout(this.verifierNiveauTrois.bind(this), 20000); // Redémarre le chronomètre de niveau
    }

    // Vérifie le troisième niveau
    verifierNiveauTrois() {

        // Vérifie le nombre de points nécéssaire du troisième
        if (parseInt(this.pointage.text) >= 45) { // Le nombre représente le nombre de points à atteindre pour la victoire
            this.animationOutro(); // Joue l'animation d'outro

            this.stage.addChild(this.victoire); // Ajoute le menu de la victoire

            clearInterval(this.idInterval);
            this.rejouer();
        } else {
            // Si le niveau trois n'est pas terminé, il y a l'animation d'outro et le menu défaite
            this.animationOutro();
            this.afficherDefaite();
        }
    }

    // Affiche la défaite et un bouton rejouer
    afficherDefaite() {
        // Exécution après 1,7 secondes
        setTimeout(() => {
            this.stage.addChild(this.defaite); // Ajoute le texte défaite
            createjs.Sound.play("musiqueDefaite");

            clearInterval(this.idInterval);
            this.rejouer();
        }, 1700);
    }

    // S'éxécute après un clic sur le bouton rejouer
    rejouer() {
        // Détruit tout les plats
        this.plat.detruire();
        // Ajoute le bouton rejouer à la scène
        this.stage.addChild(this.boutonRejouer);

        // Une fonction anonyme est déclenchée lors du clic sur le bouton rejouer
        this.boutonRejouer.addEventListener('click', () => {
            createjs.Sound.play("clicBouton");
            this.indicationNiveau.text = "Niveau 1";
            this.indicationNiveau.updateCache(); // Met à jour le cache

            createjs.Tween.get(this.defaite).to({alpha: 0}, 1000).call(() => {
                this.stage.removeChild(this.defaite)
            }); // Réduit le canal alpha du message

            createjs.Tween.get(this.victoire).to({alpha: 0}, 1000).call(() => {
                this.stage.removeChild(this.victoire)
            }); // Réduit le canal alpha du message

            createjs.Tween.get(this.boutonRejouer).to({alpha: 0}, 1000).call(() => {
                this.stage.removeChild(this.boutonRejouer)
            }); // Réduit le canal alpha du message

            this.vitesseNiveau = 20; // Change la vitesse
            this.demarrerJeu();
            this.pointage.text = "0"; // Modifie le texte
            this.pointage.updateCache(); // Met à jour le cache

        });
    }
}