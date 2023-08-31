import { useState, useRef } from "react";
import { Form } from "../form/Form";
import Image from "next/image";
import "./infoCard.css";

export const InfoCard = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [data, setData] = useState('')

    const inputRef = useRef(null);
  const handleInput = (e) =>{
    setPrompt(e.target.value)
  }

  

  const generateInfo = async (prompt) => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      console.log(data.choices[0].text);
      setData(data.choices[0].text)
    } catch (error) { console.error(error)}
    setLoading(false);
    setPrompt("");
    inputRef.current.value = "";
  };

  const handleClick = (e) => {
    e.preventDefault();
    generateInfo(prompt);
  };

  return (
    <main>
      <header className="header-infocard-container">
        <Image
          src={"/images/logo-wmf.png"}
          alt="logo-wmf"
          width={70}
          height={70}
        />
      </header>
      <section className="text-card-container">
        <h1>Información nutricional</h1>
        <p>
          Ingresa el alimento del que desees obtener información nutricional
        </p>
      </section>
      <Form
        inputRef={inputRef}
        handleInput={handleInput}
        handleClick={handleClick}
        loading={loading}
      />
      {loading ? (
        <article className="esquelet">
         
        </article>
      ) : (
        <article>
          <p>{data}</p>
        </article>
      )}
    </main>
  );
};
