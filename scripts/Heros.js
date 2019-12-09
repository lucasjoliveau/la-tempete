class Heros extends createjs.Sprite {

    constructor(atlas) {
        super(atlas);

        this.alpha = 0;
        this.addEventListener("tick", this.deplacer.bind(this));

        window.addEventListener("keydown", this.gererTouchePesee.bind(this));
        window.addEventListener("keyup", this.gererToucheLachee.bind(this));
        // Ajout de l'evenement pour les sensors
        window.addEventListener("devicemotion", e => {


            // Déplacement grâce a l'accéléromètre
            if (e.accelerationIncludingGravity.x < -1) {
                this.marcher("droite");
            } else if (e.accelerationIncludingGravity.x > 1) {
                this.marcher("gauche");
            } else {
                this.arreter();
            }

        });

    }

    // Animation d'apparition du héros
    apparaitre() {
        // Animation d'alpha
        createjs.Tween.get(this).to({alpha: 1}, 300);

        // Animation de position
        createjs.Tween.get(this).to({y: 975}, 500, createjs.Ease.bounceOut);
    }

    // Active la marche du héros
    marcher(direction) {
        if (direction === "droite") {
            if (this.paused) this.gotoAndPlay("HerosMarcheDroite");
        } else if (direction === "gauche") {
            if (this.paused) this.gotoAndPlay("HerosMarcheGauche");
        }
    }

    // Arrête la marche du héros
    arreter() {
        // Active l'arrêt du héros
        this.stop();
    }

    // Permettre le déplacement du héros
    deplacer() {
        // Si le héros est arrêté, rien ne se produit
        if (this.paused) return;

        // Déplacement dans la bonne direction
        if (this.currentAnimation === "HerosMarcheDroite") {
            this.x += 12;
        } else if (this.currentAnimation === "HerosMarcheGauche") {
            this.x -= 12;
        }

        // Empêche le héros de sortir de l'écran
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x > this.stage.canvas.width) {
            this.x = this.stage.canvas.width;
        }
    }

    // Gère la touche sur laquelle l'utilisateur appui
    gererTouchePesee(e) {
        if (e.key === "ArrowRight") {
            this.marcher("droite");
        } else if (e.key === "ArrowLeft") {
            this.marcher("gauche");
        }

    }

    // Action lorsque l'utilisateur relâche la touche appuyée
    gererToucheLachee(e) {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            this.arreter();
        }
    }
}