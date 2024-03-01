import React from 'react';
import background from "../assets/kanban.jpg";

function Welcome() {
    return (

        <div
            className="hero h-full"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="hero-overlay"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl text-white font-bold">
                        Welcome to Tabula!
                    </h1>
                    <p className="mb-5 text-white">
                        Organize your projects with ease, collaborate seamlessly,
                        and boost your productivity with our intuitive project
                        management tool inspired by Trello. Whether you&apos;re a solo
                        entrepreneur, a small team, or a large organization,
                        Tabula is here to simplify your workflow.
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>

    )
}

export default Welcome