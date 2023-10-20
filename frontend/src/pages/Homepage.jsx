import FeaturesBubble from "../components/FeaturesBubble";
import featureData from "../data/featureBubbleData.json";
import iconeChat from "../assets/icon-chat.webp";
import iconeMoney from "../assets/icon-money.webp";
import iconeSecurity from "../assets/icon-security.webp";

/**
 * Créer le contenu de la homepage
 */

export default function Homepage() {
    // recuperation des images
    const imageMap = {
        "icon-chat.webp": iconeChat,
        "icon-money.webp": iconeMoney,
        "icon-security.webp": iconeSecurity,
    };
    return (
        <main className="main">
            <div className="hero">
                <section className="hero-content">
                    <h2 className="sr-only">Promoted Content</h2>
                    <p className="subtitle">No fees.</p>
                    <p className="subtitle">No minimum deposit.</p>
                    <p className="subtitle">High interest rates.</p>
                    <p className="text">
                        Open a savings account with Argent Bank today!
                    </p>
                </section>
            </div>
            <section className="features">
                <h2 className="sr-only">Features</h2>
                {featureData.map((info) => (
                    <FeaturesBubble
                        key={info.id}
                        image={imageMap[info.image]}
                        type={info.type}
                        title={info.title}
                        description={info.description}
                    />
                ))}
            </section>
        </main>
    );
}
