"use client";
import Image from "next/image";
// import { useState } from "react";
import "./form.css";

export const Form = ({ handleInput, loading, handleClick, inputRef }) => {
  let element = loading ? (
    <Image
      className="image"
      src={"/icons/load.gif"}
      alt="logo-wmf"
      width={30}
      height={30}
    />
  ) : (
    <Image
      className="image"
      src={"/images/send.png"}
      alt="logo-wmf"
      width={25}
      height={25}
    />
  );
  return (
    <section className="form-container">
      <form action="">
        <input
          ref={inputRef}
          onChange={(e) => handleInput(e)}
          type="text"
          placeholder="pan mantequilla"
        />
        <button onClick={handleClick} type="submit">
          {element}
        </button>
      </form>
    </section>
  );
};
