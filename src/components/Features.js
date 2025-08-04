import React from 'react';
import './Features.css';

function Features() {
    return (
        <section className="features-container">
            <div className="feature-card">
                <h2>لماذا يشعر الطلاب بالضياع؟</h2>
                <p>
                    المحاضرات النظرية وحدها لا تكفي لبناء مهندس حقيقي. أنت تحتاج إلى تطبيق ما تتعلمه لكي تفهمه بعمق.
                </p>
            </div>
            <div className="feature-card">
                <h2>الحل في iTalebTech</h2>
                <p>
                    نحن نحول النظريات إلى مشاريع عملية. معنا، ستتعلم عن طريق البناء، وتتخرج وبحوزتك خبرة حقيقية.
                </p>
            </div>
        </section>
    )
}

export default Features;