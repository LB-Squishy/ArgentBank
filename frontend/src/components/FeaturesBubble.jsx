/**
 * Créer les features de la homepage
 * @returns {ReactElement}
 * @param {String} image - référence à l'image à afficher
 * @param {String} type - type d'image qui correspondra à l'alt
 * @param {String} title - titre de la bubble
 * @param {String} description - description de la bubble
 */

export default function FeaturesBubble({ image, type, title, description }) {
    return (
        <div className="feature-item">
            <img src={image} alt={type} className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>{description}</p>
        </div>
    );
}
