import React from "react";
import { useNavigate } from "react-router-dom";
import background from "../assets/kanban.jpg";

function Welcome() {
  const navigate = useNavigate();
  return (
    <div
      className="hero h-full"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <div className="bg-base-100 opacity-75 px-12 py-4">
            <h1 className="mb-5 text-5xl text-primary font-bold">
              Welcome to Tabula!
            </h1>
            <p className="mb-5 text-primary">
              Organize your projects with ease, collaborate seamlessly, and
              boost your productivity with our intuitive project management tool
              inspired by Trello. Whether you&apos;re a solo entrepreneur, a
              small team, or a large organization, Tabula is here to simplify
              your workflow.
            </p>
          </div>
          <button
            onClick={() => navigate("/account/login/")}
            className="btn btn-primary mt-3"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
