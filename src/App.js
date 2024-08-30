import logo from './logo.svg';
import './App.css';
import './crt.css';
import CrtInput from './components/CrtInput';
import React from 'react';
import ReactTypingEffect from 'react-typing-effect';
import { ReactTyped } from "react-typed";
import { useState } from 'react';

function App() {
  const art = `
                                  ,;;;, 
                                ,;;;;;;;, 
             .;;;,            ,;;;;;;;;;;;, 
            .;;%%;;;,        ,;;;;;;;;;;;;;, 
            ;;%%%%%;;;;,.    ;;;;;;;;;;;;;;; 
            ;;%%%%%%%%;;;;;, ;;;;;;;;;;;;;;; 
            \`;;%%%%%%%%%;;;;;,;;;;;;;;;;;;;' 
             \`;;%%%%%%%%%%;;;;,;;;;;;;;;;;' 
               \`;;;%%%%%%%%;;;;,;;;;;;;;;' 
                  \`;;;%%%%%%;;;;.;;;.;;; 
                     \`;;;%%%;;;;;;.;;;,; .,;;' 
                         \`;;;;;;;;;;,;;;;;;'.,;;;, 
                          ;;;;;;;;;;;;;;;;;;;;;,. 
          .          ..,,;;;;;......;;;;;;;.... '; 
          ;;,..,;;;;;;;;;;;;..;;;;;;..;;;;.;;;;;. 
           ';;;;;;;;;;;;;;..;;;a@@@@a;;;;;;;a@@@@a, 
        .,;;;;;;;;;;;;;;;.;;;a@@@@@@@@;;;;;,@@@@@@@a, 
      .;;;,;;;;;;;;;;;;;;;;;@@@@@'  @@;;;;;;,@  \`@@@@;, 
     ;' ,;;;,;;;;;;;;;;;;;;;@@@@@aa@@;;;;,;;;,@aa@@@@;;;,.,; 
       ;;;,;;;;;;;;;;;;;;;;;;@@@@@@@;;;,;a@@'      \`;;;;;;;' 
       ' ;;;,;;;;;;;;;;;;;;;;;;;;;;;;,;a@@@       #  ;;,;;, 
.//////,,;,;;;;;;;;;;;;;;;,;;;;;;;;,;;a@@@a,        ,a;;;,;;, 
%,/////,;;;;;;;;;;;;;;;;;;;;,;,;,;;;;a@@@@@@aaaaaaa@@@;;;;;'; 
\`%%%%,/,;;;;;;;;;;;;;;;;;;;;;;;;;;;;;@@@@@@@@@@@;00@@;;;;;' 
  %%%%%%,;;;;;;;;;;;;;;;;;;;;;;;;;;;a@@@@@@@@@@;00@@;;;;;' 
   \`%%%%%%%%%%,;;;;;;;;;;;;;;;;;;;;a@@@@@@@@@;00@@;;;;;' 
     \`%%%%%%%%%%%%%%%,::::;;;;;;;;a@@@@@@@;00@@@::;;;%%%%%, 
       \`%%%%%%%%%%%%%%%,::::;;;;;@@@@@@' 0@@@@::;;%%%%%%%%' 
          Oo%%%%%%%%%%%%,::::;;a@@@@@'  ,@@@::;;%%%%%%%' 
           \`OOo%%%%%%%%%%,::::@@@@@'    @@;::;%%%%%%' 
             \`OOOo%%%%%%%%,:::@@@@,;;;,a@:;;%%%%%' 
               \`OOOOOo%%%%%,:::@@@aaaa@';;%%%%' 
                  \`OOOO;@@@@@@@@aa@@@@@@@@@' 
                      ;@@@@@@@@@@@@@@@@@@@' 
                       @@@@@@@@'\`@@@@@@@@' 
                       \`@@@@@'    @@@@@' 
                        \`@@'       @@'
`
  const text = [`Oi tudo bom? Que bom que você chegou! <br><br>Eu não sabia muito ao certo o que escrever aqui ou pra você, mas acho que
    você pode gostar bastante da ideia que tive.<br><br>Um coelho branco tão esquisito acabou de passar correndo por aqui, ele parecia atrasado!
    Por que você não segue ele?<br><br>Acredito que você pode gostar das coisas que vai achar no caminho.`];




  const [typing, setTyping] = useState(true);
  const [firstRoom, setFirstRoom] = useState(false);

  const handleTypingComplete = () => {
    setTyping(false);
    console.log('Typing complete:', typing);
  };




  return (
    <div className="App crt">
      <header className="App-header">
        <h2 className="Header-content">
          <ReactTyped strings={["> monospace dreams"]} typeSpeed={40} showCursor={false} />
        </h2>
      </header>
      <div className='App-body'>
        <div className='container'>
          <p className='inline'>
            <ReactTyped strings={text} typeSpeed={1} onComplete={handleTypingComplete} />
          </p>
          <p className='smallest-font'>
            {!typing ? <pre>{art}</pre> : <pre className="placeholder">{art}</pre>}
          </p>
        </div>
        {!typing && <AfterTyping setFirstRoom={setFirstRoom} />}
        {firstRoom && <RoomOne />}
      </div>
    </div>
  );
}

function AfterTyping({ setFirstRoom }) {
  const handleSubmit = (input) => {
    console.log('Input submitted:', input);
  };
  const handleClick = () => {
    setFirstRoom(true);
  }
  return (
    <div>
      <button onClick={handleClick} className='terminal-button'>down the hole...</button>
    </div>
  );
}

function RoomOne() {
  const [typing, setTyping] = useState(true);

  const text = [`Você seguiu então!<br><br>
    Fique tranquila que o caminho é curto, mesmo a jornada sendo a melhor parte. Você entrou na toca do Coelho e caiu em um mundo estranho. Tudo parece perder a cor e cheirar a raios catódicos.<br>O marrom da terra virou um preto fosco, o brilho do sol agora é tão estranhamente verde, as paredes tão estranhamente retas e você pode jurar que seus pensamentos agora são binários.<br><br>Numa mesa feita com 2 triângulos, repousa uma chave poligonal, nela, uma etiqueta indica:<br><br>
    Abro janelas bem estreitas!<br><br>
    Acho melhor que você começe a procurar essa janela se quiser continuar :)`];

  const handleTypingComplete = () => {
    setTyping(false);
    console.log('Typing complete:', typing);
  };

  const art = ` 
     8 8 8 8                     ,ooo.
     8a8 8a8                    oP   ?b
    d888a888zzzzzzzzzzzzzzzzzzzz8     8b
     \`""^""'                    ?o___oP'
`;
  return (
    <div>
      <div className='container'>
        <p className='inline'>
          <ReactTyped strings={text} typeSpeed={1} onComplete={handleTypingComplete} />
        </p>
        <p className='not-so-small-font'>
          {!typing ? <pre>{art}</pre> : <pre className="placeholder">{art}</pre>}
        </p>
      </div>
    </div>
  );
}

export default App;
