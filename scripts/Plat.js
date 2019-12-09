// Créez une classe nommée Personnage()
// Assure que cette classe hérite de l'objet Sprite de CreateJS.
class Plat extends createjs.Bitmap {

    constructor(heros, plat) { // Le constructeur accepte un paramètre qui est la direction à utiliser et la cible
        super(plat);

        this.vitesse = 20;
        this.heros = heros;

        this.ecouteur = this.actualiser.bind(this);
        createjs.Ticker.addEventListener("tick", this.ecouteur);
    }

    // Vérification de la position des plats et d'une colision
    actualiser() {
        if (this.y > this.stage.canvas.height || this.y < 0) {
            this.detruire();
        } else {
            this.y += this.vitesse;

            if (ndgmr.checkRectCollision(this, this.heros)) {
                this.detruire();
                jeu.ajouterPoints();
                console.log('Collision');
            }
        }
    }

    // Fonction pour détruire un plat lorsqu'il y a une collision
    detruire() {
        createjs.Ticker.removeEventListener("tick", this.ecouteur);
        if (this.parent) this.parent.removeChild(this);
    }
}