import React from "react";
import ReactTypingEffect from "react-typing-effect";
import { ReactTyped } from "react-typed";
import { useState } from "react";
import Grid from "./Grid";

function RoomTwo() {
  const [typing, setTyping] = useState(true);
  const [mazeSolved, setMazeSolved] = useState(false);

  const text = [
    `
      Parece que achou a janela não é? Era bem estreita mesmo. <br><br>
      Você passou por ela e agora está em um lugar bem diferente, um lugar que parece ter sido desenhado por um computador, ou talvez por um sonho de um computador. No caminho de 
      um grafo que você resolveu seguir, sem muito rumo, em busca do coelho branco e de repente, uma voz ecoa pelos canais da memória em que você viaja.<br><br>
      <span class="blue-text">\"Me alegra bastante que você tenha chegado até aqui! Espero que esteja gostando da aventura que preparei!\"</span><br><br>Você olha em volta, e no galho
      de uma das árvores binárias que cercam sua trilha, se pendura um Gato Azul com olhos cor-de-mel<br><br><span class="blue-text">\"Aqui em cima minha cara! Eu gostaria de me apresentar como um Gato
      de Cheshire, mas por aqui acho que estou mais para um Miauware...<br> Acho que não falamos de regras mas você está livre para seguir adiante da forma
      que desejar, quebre o que quiser mas só evite DDOS pra não me causar dor de cabeça!<br>No mais, boa sorte, e nos vemos ao fim do labirinto...\"</span><br><br>
      Da forma como surgiu, o gato sumiu, deixado uma trilha de bits e bytes no ar. Você olha para frente e vê um caminho que se bifurca e mais a frente, se bifurca de novo. <br>E mais uma vez
      <br>E de novo. <br>E de novo..<br><br>Recursivamente...
  
      `,
  ];

  const handleTypingComplete = () => {
    setTyping(false);
    console.log("Typing complete:", typing);
  };

  const art = ` 
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⢀⣀⠀⠀⠀⠀
  ⠀⠀⢰⠟⠀⠀⠀⠀⠀⠀⠜⣦⠘⢿⣿⡄⠈⣿⡇⢠⡀⠀
  ⠀⠀⠸⠀⢀⢀⠀⠀⢀⢀⢀⠾⠀⠀⠹⡇⠀⣿⠇⣾⡗⠀
  ⠀⠀⣀⠀⢺⠃⠀⠀⠁⢿⠀⠁⠀⠀⠀⡇⢀⠟⣼⠏⣠⡇
  ⠀⠀⠘⢷⣦⣤⣤⣥⣤⣴⣾⠇⠀⠀⠀⠀⠀⠈⠤⠞⣫⡄
  ⠀⠀⠀⠀⢈⠉⠉⠉⣭⣭⣤⠀⣀⡀⠀⠀⠀⠀⠒⠛⠛⠁
  ⠀⠀⢠⣾⣿⣷⣀⠀⠘⠿⠟⠀⠻⠿⡇⢰⣶⡔⠾⠟⠁⠀
  ⠀⣀⠀⠉⠛⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠁⠀⠀⠀⠀
  ⢸⣿⣿⣶⣶⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠈⠛⠛⠛⠋⣁⣼⣿⡶⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  `;

  const rows = 8; // Number of rows
  const columns = 12; // Number of columns
  const initialValue = true; // Value to fill
  const maze = Array.from({ length: rows }, () => Array(columns).fill(initialValue));

  function pathToList(matrix) {
    const list = [];
    for (let x = 0; x < matrix.length; x++) {
      for (let y = 0; y < matrix[x].length; y++) {
        list.push(matrix[x][y]);
      }
    }
    return list;
  }
  
  // Usage
  
  
  return (
    <div>
      <div className="container">
        <p className="inline">
          <ReactTyped
            strings={text}
            typeSpeed={1}
            onComplete={handleTypingComplete}
          />
        </p>
        <p className="not-so-small-font blue-text">
          {!typing ? (
            <pre>{art}</pre>
          ) : (
            <pre className="placeholder">{art}</pre>
          )}
        </p>
      </div>
      <div className="flex items-center justify-center py-10">
        <Grid rows={8} columns={12} initialStates={pathToList(maze)} onMazeSolved={setMazeSolved} />
      </div>
      {mazeSolved && (<div><button className="terminal-button">sair do labirinto</button></div>)}
      

    </div>
  );
}
export default RoomTwo;
